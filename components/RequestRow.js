import React from 'react'
import { Table } from 'semantic-ui-react'
import web3 from '../ethereum/web3'

export default function RequestRow({ id, request, address, approversCount }) {
    const { Row, Cell } = Table
    return (
        <Row>
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
            <Cell>{address}</Cell>
            <Cell>{request.apprvalCount}</Cell>
            <Cell>{request.apprvalCount}/{approversCount}</Cell>
        </Row>
    )
}
