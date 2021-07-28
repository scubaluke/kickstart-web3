import React, { useState, useEffect } from "react";
import factory from "../ethereum/factory";
 
function CampaignIndex({ campaigns }) {
 
  return <h1>{campaigns[0]}</h1>;
}
 
//uses server side rendering to call the campaign contracts (so good for slow devices)
CampaignIndex.getServerSideProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};
 
export default CampaignIndex;