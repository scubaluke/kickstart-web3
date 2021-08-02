import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
        console.log(requests);
    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
      console.log(this.props);
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  }
}

export default RequestIndex;




















// import React from 'react'
// import Layout from '../../../components/Layout'
// import { Button, Table } from 'semantic-ui-react'
// import  { Link } from '../../../routes'
// import Campaign from '../../../ethereum/campaign';
// import  RequestRow from '../../../components/RequestRow'

// function RequestIndex({ address, requests, requestCount  }) {
//     const {Header, Row, HeaderCell, Body} = Table
//     console.log('requests', requests);
//     // const RenderRow = () => {
//     //     requests.map((request, index) => {
//     //         return <RequestRow request={request} key={index} address={address} />
//     //     })
//     // }
//     return (
//         <Layout>
//             <h3>Requests</h3>
//             <Link route={`/campaigns/${address}/requests/new`} >
//                 <a>
//                     <Button primary >Add Request</Button>    
//                 </a>
//             </Link>
//             <Table>
//                 <Header>
//                     <Row>
//                         <HeaderCell>Id</HeaderCell>
//                         <HeaderCell>Description</HeaderCell>
//                         <HeaderCell>Amount</HeaderCell>
//                         <HeaderCell>Recipient</HeaderCell>
//                         <HeaderCell>Approval Count</HeaderCell>
//                         <HeaderCell>Approve</HeaderCell>
//                         <HeaderCell>Finalize</HeaderCell>
//                     </Row>
//                 </Header>
//                 <Body>
//                     {/* {RenderRow()} */}
//                 </Body>
//             </Table>
//         </Layout>
//     )
// }
 
// // export const getInitialProps = async (props) => {
// //     const { address } = props.query
// //     const  campaign = Campaign(address)
// //     const requestCount = await campaign.methods.getRequestsCount().call();    
// //     console.log('requestCount', requestCount);
// //     const requests = await Promise.all(
      
// //         Array(parseInt(requestCount)).fill().map((element, index) => {
// //             console.log('element', element);
// //             return campaign.methods.requests(index).call()
// //         })
// //     )
// //     console.log('requests', requests);
  
// //     return { props: { address, requests, requestCount}}
// // }

// RequestIndex.getInitialProps = async (props) => {
//     const { address } = props.query
//     const  campaign = Campaign(address)
//     const requestCount = await campaign.methods.getRequestsCount().call();    
//     console.log('requestCount', requestCount);
//     const requests = await Promise.all(
      
//         Array(parseInt(requestCount)).fill().map((element, index) => {
//             console.log('element', element);
//             return campaign.methods.requests(index).call()
//         })
//     )
//     console.log('requests1', requests);
  
//     return { props: { address, requests, requestCount}}
// }

// export default RequestIndex

