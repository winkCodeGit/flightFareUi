import { Col, Row } from 'antd'
import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <>
    <Row className='footer-container'>
       <Col span={24}>
       <Row>
            <Col span={24}>
            <div style={{marginTop:"7px",textAlign: "center",fontSize: "16px",color: "darkcyan",fontWeight: "600"}}>
                copyright © 2021 All Right Reserved.</div>
            </Col>
        </Row>

        <Row style={{marginTop:"15px"}}>
            <Col span={4}>
                <div className='footer-text'style={{marginLeft:"24px"}}>Privacy Policy</div>
            </Col>
            <Col span={4}>
                <div className='footer-text'>Terms of Use</div>
            </Col>
            <Col span={4}>
                <div className='footer-text'>Cookies Policy</div>
            </Col>
            <Col span={4}>
                <div className='footer-text'>Disclaimer</div>
            </Col>
            <Col span={4}>
                <div className='footer-text'>Payment Security</div>
            </Col>
            <Col span={4}>
                <div className='footer-text'>Booking & Refund Policy</div>
            </Col>
        </Row>
       
        </Col>
    </Row>
    </>
  )
}

export default Footer