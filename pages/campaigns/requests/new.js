import React, {useState} from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'

export default function RequestNew({ address }) {
    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')
    const [recipient, setRecipient] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage('')
        const campaign = Campaign(address)
        
        try {
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({ from: accounts[0] })

            Router.pushRoute(`/campaigns/${address}/requests`)
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message)
        }
        setLoading(false)
    }

    return (
        <Layout>
            <Link route={`/campaigns/${address}/requests`} >
                <a>
                    Back
                </a>
            </Link>
            <h3>Create a Request</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage} >
            <Form.Field>
                <label>Description</label>
                <Input 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
            </Form.Field>

            <Form.Field>
                <label>Value in Ether</label>
                <Input
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </Form.Field>           

            <Form.Field>
                <label>Recipient</label>
                <Input
                    value={recipient}
                    onChange={e => setRecipient(e.target.value)}
                />
            </Form.Field>
            <Message error header='Opps!' content={errorMessage} />
                <Button primary loading={loading} >Create!</Button>
            </Form>
        </Layout>
    )
}
 
export const getServerSideProps = async (props) => {
    const { address } = props.query
    return { props: { address }}
}