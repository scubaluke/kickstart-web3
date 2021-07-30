import React, { useState, useEffect } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from 'semantic-ui-react' 
import Layout from '../components/Layout';
import { Link } from '../routes'

function CampaignIndex({ campaigns }) {

    const renderCampaigns = () => {
        const items = campaigns.map(address => {
            return {
                header: address,
                description: (<Link route={`/campaigns/${address}`} ><a>View Campaign</a></Link>),
                fluid: true
            }
        })
        return <Card.Group items={items} />
    }
 
  return (
      <Layout>
          <div>
            <h3>Open Campings</h3>
            <Link route='/campaigns/new'>
                <a>
                    <Button
                        content='Create Campaign'
                        icon='add circle'
                        primary 
                        floated='right'
                    />
                </a>
             </Link>
                {renderCampaigns()}
            </div>
      </Layout>
  );
}
export default CampaignIndex;

export const getServerSideProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: {campaigns} };
};
 
