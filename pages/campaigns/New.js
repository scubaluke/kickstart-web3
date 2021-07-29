import React, { useState} from 'react'
import Layout from '../../components/Layout'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

export default function New() {
    const [minimumContribution, setMinimumContribution] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

   const onSubmit = async (e) => {
    e.preventDefault();
        try {
            setLoading(true)
            const accounts = await web3.eth.getAccounts()
            await factory.methods.createCampaign(minimumContribution).send({ from: accounts[0] })
        } catch (error) {
            setErrorMessage(error.message)
        }
        setLoading(false)
    }

    return (
        <Layout>
            <h3>Create a Campaign</h3>
            <hr />
            <Form onSubmit={onSubmit} error={!!errorMessage} >
                <Form.Field>
                    <label htmlFor="contribution">Minimum Contribution</label>
                    <Input 
                        label="wei" 
                        labelPosition='right' 
                        value={minimumContribution}
                        onChange={e => setMinimumContribution(e.target.value)}
                        type='number'
                    ></Input>
                    <Message error header='Oops!' content={errorMessage} />
                    <Button loading={loading} primary style={{ marginTop: '10px' }} >Create!</Button>
                </Form.Field>
            </Form>
        </Layout>
    )
}
