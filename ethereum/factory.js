import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), '0x961E7bE0Edd8ec8F9Bb09684FBd5e00aA2078E57')

export default instance;