import { Card, Row, Col,Collapse,Image, Button, Select, Space, Form, Input, Checkbox,Tag  } from 'antd'
import React from 'react'

const FareSection = (props) => {
   console.log(props)
  return (
    <>
       <Row className='fare-container'>
        <Col span={24}>
        <Card className='card-style' title="Fare Summary" >
        <div className='fare-div1'> <span>Base fare</span> <span style={{float:"right"}}>₹ {props.data[0]['flightFares'][0]?.fareAmount?.baseFare}</span>

        </div>
        <div className='fare-div1'><span>Taxes and fare</span> <span style={{float:"right"}}>₹ {Math.round(props.data[0]['flightFares'][0]?.fareAmount?.tax)}</span>

        </div>
        <div style={{background:"rgb(221, 221, 221)"}} className='fare-div1'><span>Total Fare </span> <span style={{float:"right"}}>₹ {Math.round(props.data[0]['flightFares'][0]?.fareAmount?.totalFare)}</span>

        </div>
       </Card>
        </Col>
       </Row>
      

    <Row>
       <Col style={{marginTop:"10px"}} className='promocode-container' span={24}>
     <Card className='card-style' title=" Have a Promocode">
           <Form>
      <Input style={{width:"76%"}} defaultValue="" />
      <Button type="primary">Apply</Button>
           <div className='promo-text'>Congratulation! Zero convience <br/>
            coupon has been applied successfully. <br/>
            You have saved Rs 300 per passengers <br/>
             on convenience fees.
            </div>
           </Form>
          </Card>
    </Col>
    </Row>

    </>
  )
}

export default FareSection