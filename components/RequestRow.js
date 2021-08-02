import React, {useState} from 'react'
import { Table, Button, Message } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'

export default function RequestRow({ id, request, address, approversCount }) {
    const [approveLoading, setApproveLoading] = useState(false)
    const [finalizeLoading, setFinalizeLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { Row, Cell } = Table
    const readyToFinalize = request.apprvalCount > approversCount / 2;


    const onApprove = async () => {
        setApproveLoading(true)
        setErrorMessage('')
    try {
        const campaign = Campaign(address)
        const accounts = await web3.eth.getAccounts()
        await campaign.methods.aproveRequest(id).send({ from: accounts[0] })
    } catch (error) {
        setErrorMessage(error.message)
    }
        setApproveLoading(false)
    }

    const onFinalize = async () => {
        setFinalizeLoading(true)
        setErrorMessage('')
    try {
        const campaign = Campaign(address)
        const accounts = await web3.eth.getAccounts()
        await campaign.methods.finalizeRequest(id).send({ from: accounts[0] })
    } catch (error) {
        setErrorMessage(error.message)
    }
        setFinalizeLoading(false)
    }
    return (
        <>
        <Row disabled={request.complete} positive={readyToFinalize && !request.complete} >
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
            <Cell>{address}</Cell>
            <Cell>{request.apprvalCount}/{approversCount}</Cell>
            <Cell>{!request.complete && <Button loading={approveLoading} color='green' basic onClick={onApprove} >Approve</Button>}</Cell>
            <Cell>{!request.complete && <Button loading={finalizeLoading} color='teal' basic onClick={onFinalize} >Finalize</Button>}</Cell>
        </Row>
        <Row  >{errorMessage  && <Message error header='Opps!' content={errorMessage} />}
        </Row>
        </>
    )
}
