import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), '0x665aABa468F47B0c34C9909009b11F190d002d46')

export default instance;