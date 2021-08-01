import React, { useState } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import  { Router } from '../routes'

export default function ContributeForm({address}) {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        setErrorMessage('')
        const campaign = Campaign(address)
        try {
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            })
            Router.replaceRoute(`/campaigns/${address}`)
        } catch (error) {
            setErrorMessage(error.message)
        }
        setLoading(false);
        setValue('')
    }

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label htmlFor="">Amount to Contribute</label>
                <Input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    label='ether'
                    labelPosition='right' 
                     
                />
                <Message error header='Opps!' content={errorMessage} />
                <Button primary  loading={loading}  >Contribute!</Button>
                
            </Form.Field>
        </Form>
    )
}
