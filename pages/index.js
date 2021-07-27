import React, { useState, useEffect } from 'react'
import factory from '../ethereum/factory'

export default function CampaignIndex() {
    useEffect(async () => {
      const  campaigns = await factory.methods.getDeployedCampaigns().call()
     console.log(campaigns);
    }, [])
    return (
        <h1>
            this is the new campaign list page
        </h1>
    )
}
