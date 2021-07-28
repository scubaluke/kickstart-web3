// import React, { useState, useEffect } from 'react'
// import factory from '../ethereum/factory'

// function CampaignIndex() {
//     const [campaigns, setCampaigns] = useState('initialState')

//     useEffect(async () => {
//       const  fetchedCampaigns = await factory.methods.getDeployedCampaigns().call()
//       setCampaigns(fetchedCampaigns)
//     }, [campaigns])
//     return (
//         <h1>
//             {campaigns[0]}
//         </h1>
//     )
// }

// export default CampaignIndex;

import React, { useState, useEffect } from "react";
import factory from "../ethereum/factory";
 
function CampaignIndex({ campaigns }) {
  console.log("campaigns", campaigns);
 
  return <h1>{campaigns[0]}</h1>;
}
 
//uses server side rendering to call the campaign contracts (so good for slow devices)
CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};
 
export default CampaignIndex;