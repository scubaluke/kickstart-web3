import React from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes'

export default function Show({minimumContribution, balance, requestsCount, approversCount, manager, address }) {
    function renderCards() {
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager that created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver',
            },
            {
                header: requestsCount,
                meta:'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers '
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of users who have already donated to this campaign'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Ballance (Ether)',
                description: 'The ballance is how much money this campaign has left to spend.'
            }
        ]
        return <Card.Group items={items} />
    }

    return (
        <Layout>
            <h3>campaign show</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10} >
                        {renderCards()}
                       
                    </Grid.Column>
                    <Grid.Column width={6} >
                        <ContributeForm address={address} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                         <Link route={`/campaigns/${address}/requests`} >
                            <a><Button primary >View Requests</Button></a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )

}


export const getServerSideProps = async (props) => {
    const campaign = Campaign(props.query.address)
    const summary = await campaign.methods.getSummary().call()
    return { props: { 
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
        address: props.query.address
     }}
  };