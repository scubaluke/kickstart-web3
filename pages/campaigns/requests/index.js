import React from 'react'
import Layout from '../../../components/Layout'
import { Button } from 'semantic-ui-react'
import  { Link } from '../../../routes'

export default function RequestIndex({ address }) {
    return (
        <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${address}/requests/new`} >
                <a>
                    <Button primary >Add Request</Button>    
                </a>
            </Link>
        </Layout>
    )
}
 
export const getServerSideProps = async (props) => {
    const { address } = props.query
    return { props: { address }}
}
