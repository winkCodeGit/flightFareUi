
import React from 'react'
import './CheckIn.scss'
import { Col, Image, Row } from 'antd'
import spicejet from '../../assets/icons/Spicejet.png'
import airIndia from '../../assets/icons/AirIndia.png'
import airAsia from '../../assets/icons/AirAsia.png'
import indigo from '../../assets/icons/Indigo.png'
import akashaAir from '../../assets/icons/AkashaAir.png'
import goFirst from '../../assets/icons/GoFirst.png'
import Vistara from '../../assets/icons/Vistara.png'
import allianceAir from '../../assets/icons/AllianceAir.png'
import checkinBackground from '../../assets/images/CheckinBackground.jpg'

const checkinBg={
  backgroundImage: `url(${checkinBackground})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


const CheckIn = () => {

  const myStyle ={

  }
  return (
    <>
    <Row >
      <Col style={checkinBg} span={24}>
     
    <Row style={{marginLeft:"23rem"}}>
       <Col span={24}>
         <h1 style={{marginTop:"15px", fontWeight:"700",textDecoration:"underline"}}>SELECT YOUR AIRLINES TO COMPLETE WEB CHECKIN:</h1>
       </Col>
    </Row>
    
    <Row style={{marginLeft:"11rem",marginTop:"3rem"}}>
      <Col span={6}>
        <Image src={spicejet} preview={false} className='checkin-image'
         style={{ transition: 'transform .2s' }}
         onMouseOver={(e) => { e.target.style.transform = 'scale(1.1)'; }}
         onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; }}
         />
      </Col>
      <Col span={6}>
       <Image src={airIndia} preview={false} className='checkin-image' 
        style={{ transition: 'transform .2s' }}
        onMouseOver={(e) => { e.target.style.transform = 'scale(1.1)'; }}
        onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; }}
       />
      </Col>
      <Col span={6}>
      <Image src={airAsia} preview={false} className='checkin-image' 
       style={{ transition: 'transform .2s' }}
       onMouseOver={(e) => { e.target.style.transform = 'scale(1.1)'; }}
       onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; }}
      />
      </Col>
      <Col span={6}>
      <Image src={indigo} preview={false} className='checkin-image'
       style={{ transition: 'transform .2s' }}
       onMouseOver={(e) => { e.target.style.transform = 'scale(1.1)'; }}
       onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; }}
      />
      </Col>
    </Row>

    <Row style={{marginLeft:"11rem",marginTop:"3rem"}}>
      <Col span={6}>
        <Image src={akashaAir} preview={false} className='checkin-image'
        style={{ transition: 'transform .2s' }}
        onMouseOver={(e) => { e.target.style.transform = 'scale(1.1)'; }}
        onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; }}
        />
      </Col>
      <Col span={6}>
       <Image src={goFirst} preview={false} className='checkin-image'
        style={{ transition: 'transform .2s' }}
        onMouseOver={(e) => { e.target.style.transform = 'scale(1.1)'; }}
        onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; }}
       />
      </Col>
      <Col span={6}>
      <Image src={Vistara} preview={false} className='checkin-image'
       style={{ transition: 'transform .2s', marginLeft:"-1.5rem" }}
       onMouseOver={(e) => { e.target.style.transform = 'scale(1.1)'; }}
       onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; }}
      />
      </Col>
      <Col span={6}>
      <Image src={allianceAir} preview={false} className='checkin-image'
       style={{ transition: 'transform .2s' }}
       onMouseOver={(e) => { e.target.style.transform = 'scale(1.1)'; }}
       onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; }}
      />
      </Col>
    </Row>

      <Row style={{marginLeft:"15rem"}}>
        <Col span={24}>
          <p style={{marginLeft:"7rem"}}>Boarding Pass is Available Only Before 6 hours of your Flight's Departure Timing</p>
          <p>Guests are required to report 3 hours prior to departure with sufficient time to complete all the formalities.</p>
          <p style={{marginLeft:"4rem"}}>Flight Status can be checked for flights on the previous day, same day and next day</p>
          <p style={{marginLeft:"19rem"}}>Check-in online and save time</p>
          <h1 style={{marginLeft:"21rem",fontWeight:"700"}}>HAPPY JOURNEY</h1>

        </Col>
      </Row>

      </Col>
    </Row>
    </>
  )
}

export default CheckIn