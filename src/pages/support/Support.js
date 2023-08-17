import React from 'react'
import './Support.scss'
import { Col, Image, Row } from 'antd'
import cancelTicket from '../../assets/icons/cancelTicket.png'
import claimRefund from '../../assets/icons/claim_refund.png'
import nameCorrection from '../../assets/icons/nameCorrection.png'
import rescheduleFlight from '../../assets/icons/rescheduleFlight.png'
import webCheckin from '../../assets/icons/webCheckin.png'
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { CiLocationOn } from "react-icons/ci";

const Support = () => {
  return (
  <>
  <Row style={{marginTop:"5rem"}}>
    <Col span={24} style={{display:"flex",justifyContent:"center"}}>
      <h1>CONTACT US:</h1>
    </Col>
  </Row>
  
   <Row style={{margin:"18px"}}>
      <Col className='list-items' span={8}>
       <div><Image src={cancelTicket} style={{width:"55%"}} preview={false} /> </div>
       <div>
         <h2>Cancel Ticket</h2>
          <p>Want to cancel your <br/>
          booking? To cancel, enter <br/>
          your PNR No, or Booking <br/>
          ref. number and email id <br/>
          or last name.</p>
       </div>
      </Col>
      <Col className='list-items' span={8}>
      <div><Image src={rescheduleFlight} style={{width:"55%"}} preview={false}/> </div>
       <div>
         <h2>Reschedule Flight</h2>
           <p>Want to reschedule your flight <br/>
             booking? Customize your Flight  <br/>
             ticket according to your travel <br/>
             needs.
           </p>
       </div>
      </Col>
      <Col className='list-items' style={{gap:"17px"}} span={8}>
      <div><Image src={claimRefund} style={{width:"60%",marginTop:"-2.3rem"}} preview={false}/> </div>
       <div>
         <h2>Claim Refund</h2>
           <p>Claim Refund if you have <br/>
              Cancelled Directly through <br/>
              the Airline.</p>
       </div>
      </Col>
   </Row>

   <Row style={{marginLeft:"23rem",marginTop:"3rem"}}>
      <Col className='list-items' span={8}>
      <div><Image src={nameCorrection} style={{width:"55%"}} preview={false}/> </div>
       <div>
         <h2>Name Correction</h2>
           <p>FlightFares will <br/>
              communicate your request <br/>
              with the respective airline <br/>
              your behalf.</p>
       </div>
      </Col>

      <Col className='list-items' style={{marginLeft:"3rem",gap:"5px"}} span={8}>
      <div><Image src={webCheckin} style={{width:"55%"}} preview={false}/> </div>
       <div>
         <h2>Web Check In</h2>
           <p>FlightFares will communicate <br/>
             your request with the respective <br/>
             airline on your behalf.</p>
      </div>
      </Col>
      
   </Row>
    
   <Row style={{background:"#e6e6e6"}}>
      <Col style={{display:"flex",justifyContent:"center"}} span={8}>
      <div style={{marginLeft:"5rem", marginTop:"1rem"}}>
        <div>
         <CiLocationOn style={{fontSize:"50px",marginLeft:"2rem"}}/>
        </div>
        <div>
          <p style={{fontSize:"15px" ,color: "#1677ff"}}>FLIGHT FARES <br/>
             18 RABINDRA SARANI <br/>
             GATE NO:
          </p>
        </div>
      </div>
      </Col>

    <Col style={{display:"flex",justifyContent:"center"}} span={8}>
      <div>
       <div style={{marginLeft:"1.5rem", marginTop:"1rem"}}>
       <PhoneOutlined style={{fontSize:"50px",marginLeft:"2rem"}}/>
       </div>
       <div>
       <a  style={{cursor: "pointer",fontSize:"20px" ,color: "#3ad93a"}} 
         href="tel:+8100453902"> Phone No: 8100453902</a> 
       </div>
      </div>
      </Col>

    <Col style={{display:"flex",justifyContent:"center"}} span={8}>
      <div>
       <div style={{marginLeft:"1.5rem", marginTop:"1rem"}}>
       <MailOutlined style={{fontSize:"50px",marginLeft:"2rem"}}/>
       </div>
       <div>
       <a style={{fontSize:"20px" ,color: "#1677ff"}} href="mailto:support@flydreamzz.in">Email: support@flydreamzz.in</a> 
       </div>
      </div>
      </Col>
   </Row>

  </>
  )
}

export default Support