import React, {useState, useEffect } from 'react'
import { Card, Row, Col,Collapse,Image, Button, Select, Space, Form, Input, Checkbox,Tag  } from 'antd'
import { MailOutlined, MobileOutlined, UserOutlined, CreditCardOutlined, BankOutlined, CheckOutlined } from '@ant-design/icons';
import qs from 'query-string';
import './BookingConfirm.scss'
import airAsia from '../../../assets/small/airasia.jpg'
import indigo from '../../../assets/small/indigo.jpg'
import vistara from '../../../assets/small/vistara.jpg'
import spicejet from '../../../assets/small/spicejet.jpg'
import airIndia from '../../../assets/small/airIndia.jpg'
import starAir from '../../../assets/small/starAir.jpg'
import akasaAir from '../../../assets/small/akasaAir.jpg'
import allianceAir from '../../../assets/small/allianceAir.jpg'
import { FaWallet, FaGooglePay } from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';

import moment from 'moment';
import AddsOn from './AddsOn';

const { Panel } = Collapse;
const { Option } = Select;

const airlineIcon = {
  "IndiGo":indigo,
  "AirAsia India":airAsia,
  "Vistara":vistara,
  "SpiceJet":spicejet,
  "AirIndia":airIndia,
  "Star Air":starAir,
  "Alliance Air":allianceAir,
  "Akasa Air":akasaAir,
}

const BookingConfirm = () => {

  const[flightDetails, setFlightDetails] = useState({});
  const[hidePassengerinfo, setHidePassengerinfo] = useState(false)
  const [activePanels, setActivePanels] = useState();
  const [showItineary, setShowItineary] = useState(true);
  const [showTicketHeader, setShowTicketHeader] = useState(false)
  const [contactInfo, setContactInfo] = useState({
    mobile:"",
    email:""
  })
  // const [mobNo, setMobNo] = useState();
  // const [email,setEmail] = useState();

 useEffect(() => {
  
  const parsed = qs.parse(location.search);
  setFlightDetails(parsed);
  console.log(parsed)
  console.log(flightDetails)
  
 
 }, [])

 console.log(contactInfo)
 const onPanelCollapse = (key) => {
  setActivePanels(key);
};

const handleContinue = () => {
   // setActivePanels([]); // Set an empty array to close all panels
   setShowItineary(false);
   setShowTicketHeader(true);
};

const contactDetails = (value)=>{
   
   console.log(value)
}

const rowStyle = showItineary ? { marginTop: '-29rem' } : {};

const contactInformation=()=>{
    return(
     <>
      <Row className='contact-info'>
          <Col span={24}>
            <Row>
                <div>
                      <h1>Contact Information </h1>
                </div>

                <Col className='contact-nfo-inner' span={24}>
              <div>Your ticket and flight info will be sent here</div>
              
                
                <Row>
                <Col span={10}>
                <Input 
                  defaultValue="+91"
                  style={{width:"20%"}}
                 />
                 <Input 
                  prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="Mobile Number"
                  style={{width:"80%"}}
                  onChange={(e)=>setContactInfo({...contactInfo, mobile:e.target.value})}
                 />
                 </Col>
                  
                  <Col span={10} style={{marginLeft:"20px"}}>
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Email Id"
                    onChange={(e)=>setContactInfo({...contactInfo, email:e.target.value})}
                />
                  </Col>
                  <div>
                
                  <Checkbox>Update me on order status, news, and exclusive offers via sms, whatsapp and email</Checkbox>
                
                </div>
              </Row>

            </Col> 
              </Row>
          </Col>
        </Row>
        </>
    )
}

const travelerDetails=()=>{
  return(
      <>
        <Row className='traveler-info'>
            <Col span={24}>
              <Row>
                  <div>
                  <h2>Enter traveller details <span>(Name must be entered as shown on Passport/ Id Proof)</span></h2> 
                  </div>

                  <Col className='contact-nfo-inner' span={24}>
                      <div>Adult 1</div>
                      
                          <Form colon={false} style={{width:"100%"}} name="contact_info" layout="inline" >
                            <Row>
                              <Col span={4}>
                                <Form.Item label={<label style={{ color: "black" }}>Title</label>}>
                                    <Select defaultValue="Select"
                                    style={{
                                      width: 90,
                                    }}
                                  >
                                    <Option value="Mr">Mr</Option>
                                    <Option value="Ms">Ms</Option>
                                    <Option value="Mrs">Mrs</Option>
                                    <Option value="Master">Master</Option>
                                  </Select>
                                </Form.Item>
                            </Col>
                          <Col span={10}>
                              <Form.Item
                                style={{width:"80%"}}
                                name="firstname"
                                label={<label style={{ color: "black" }}>First Name</label>}
                                rules={[{ required: true, message: 'Please enter your first name!' }]}
                              >
                                <Input prefix={<UserOutlined  className="site-form-item-icon" />} placeholder="First Name" />
                              </Form.Item>

                            </Col>

                
                            <Col span={10}>
                              <Form.Item
                                style={{width:"80%"}}
                                name="lastname"
                                label={<label style={{ color: "black" }}>Last Name</label>}
                                rules={[{ required: true, message: 'Please enter your last name!' }]}
                              >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
                              </Form.Item>

                            </Col>
                      
                      </Row>
                      </Form>
                  </Col> 
            </Row>
        </Col>
      </Row>
      </>
  )
}

     const ticketPayment = ()=>{

         return(
          <>
          <Row className='payment-container'>
          <Col span={16}>
        
        <Collapse defaultActiveKey={['1']} onChange={onPanelCollapse}>
        <Panel showArrow={false} header="Select Payment Method" key="1">
        <Row>
          <Col span={8}>
          <div className='credit-card-container'>
          <Card className='pay-card' bordered={false}>
          <div className='card-items'><span><CreditCardOutlined /></span> 
          <span style={{fontSize:"25px"}}> <Checkbox className="circle-checkbox"></Checkbox></span> <span>Credit Card</span>
          </div> 
        </Card>

        </div>

        <div>
          <Card className='pay-card' bordered={false}>
          <div className='card-items'><span><CreditCardOutlined /></span> <span><Checkbox className="circle-checkbox"></Checkbox></span> <span>Debit Card</span></div> 
        </Card>
        </div>

          <div>
          <Card className='pay-card' bordered={false}>
          <div className='card-items'> <span><BankOutlined /> </span> <span><Checkbox className="circle-checkbox"></Checkbox></span> <span>Net Banking</span></div> 
        </Card>
        </div>

            <div>
          <Card className='pay-card' bordered={false}>
          <div className='card-items'> <span><FaWallet /> </span> <span><Checkbox className="circle-checkbox"></Checkbox></span> <span>Wallets </span></div> 
        </Card>
        </div>

        <div>
          <Card className='pay-card' bordered={false}>
          <div className='card-items'> <span><MobileOutlined /> </span> <span><Checkbox className="circle-checkbox"></Checkbox></span> <span>Upi</span></div> 
        </Card>
        </div>
          
        </Col>

        <Col span={16} className='payment-info-section'>
          <div className='info-container'>
          <div style={{float:"right"}}><Button className='btn-proceed'> Proceed</Button></div>
          <div> <h2> You are paying <span>₹ 6325.00</span></h2></div>
          <div><h4> <b>Convenience Fees (Non-Refundable)</b></h4>
   
     <p>This is a Payment processing Charge and is not part of Airline Fare<br/>
        Component. This fee includes the charges paid by us to the concerned Bank<br/>
        (varies from one bank to another) for availing of such facilities. this is a<br/>
        <b>completely non refundable amount</b> and won't be refunded in case of<br/>
        Flight Cancellation (Canceled by you or by the airline) and is over and <br/>
        above Airline Cancel fee, Budget Ticket Service Fee.</p>
  </div>

  </div>
  </Col>  

        </Row>
        </Panel>
        </Collapse>

        </Col>   

        </Row>
       </>
         )
       
      }


  function headerDesign(){
    return(
      <>
      <Col span={16}>
       <Card className='header-card' style={{borderTop:"1px solid #cfcfcf"}}>
        <Row>
          <Col span={2}>
          <div style={{marginTop:"10px",cursor:"pointer"}} onClick={()=>{setShowTicketHeader(false),
          setShowItineary(true)}}><CheckOutlined style={{ color:"green",fontSize:"30px"}}/></div> 
          </Col>
          <Col span={6} style={{display:"flex"}}>
             <div><Image style={{width:"3.5rem"}} src={airlineIcon[flightDetails.airlines]} preview={false}></Image> </div>
             <div style={{marginLeft:"10px"}}>
             <div style={{fontSize:"17px",fontWeight:"650",marginTop:"10px"}}>{flightDetails.airlines}</div>
              <div style={{fontSize:"14px",fontWeight:"600",color:"grey"}}>{flightDetails.flightNo}</div>
            
              </div>
            
          </Col>

           <Col span={6}>
             <div style={{fontSize:"16px",fontWeight:"600"}}>{flightDetails.departureTime}</div>
             <div style={{fontSize:"16px",fontWeight:"600"}}>{flightDetails.airprot_from}</div>
             <div style={{fontSize:"16px",fontWeight:"600"}}>{moment(flightDetails.departureDate).format('Do MMMM, YYYY')}</div>
           </Col>

           <Col span={4}>
            <div style={{fontSize:"16px",fontWeight:"600",marginTop:"15px"}}>{`${Math.floor((flightDetails.duration)/60)} HRS ${(flightDetails.duration)%60} MINS`}</div>
           </Col>

           <Col span={6}>
             <div style={{fontSize:"16px",fontWeight:"600"}}>{flightDetails.arrivalTime}</div>
             <div style={{fontSize:"16px",fontWeight:"600"}}>{flightDetails.airprot_to}</div>
             <div style={{fontSize:"16px",fontWeight:"600"}}>{moment(flightDetails.arrivalDate).format('Do MMMM, YYYY')}</div>
           </Col>
         </Row>

         <Row style={{borderTop:"1px solid grey",marginTop:"10px"}}>
        <Col span={2}>
          <div style={{marginTop:"10px"}}><CheckOutlined style={{ color:"green",fontSize:"30px"}}/></div> 
          </Col>
        <Col span={20}>
          <div style={{fontSize:"20px",fontWeight:"700"}}><span> {contactInfo.email} ,</span>
           <span>{contactInfo.mobile} </span> </div>
          <div>E ticket will be sent here. Booking for someone else? <span>enter their phone number here</span> </div>
        </Col>
      </Row>
         </Card>
          
        
      </Col>
      
      </>
    )
  }

  return (
     <>
     
     <Space className='bookTicket-container' style={{width:"100%",paddingLeft:"20px",minHeight:"390px"}} direction="vertical">
     
      <Row style={{marginTop:"35px"}}>
      {showItineary && showItineary?

      ( <Col span={16}>
        
      <Row>
         <Col span={24}>
          <div style={{fontSize:"25px",fontWeight:"700",cursor:"pointer"}}>Review Your Itinerary</div>
         <Card className='flight-details'>
            <Row >
                <Col span={6}>
                    <div style={{fontSize:"20px",fontWeight:"600"}}>Airline</div> 
                </Col>
                <Col span={6}>
                    <div style={{fontSize:"20px",fontWeight:"600"}}>Depart</div> 
                </Col>
                <Col span={6}>
                    <div style={{fontSize:"20px",fontWeight:"600"}}>Duration</div> 
                </Col>
                <Col span={6}>
                    <div style={{fontSize:"20px",fontWeight:"600"}}>Arrive</div> 
                </Col>
                
            </Row>
        </Card>

      <Card className='flight-details-body' style={{borderTop:"1px solid #cfcfcf"}}>
        <Row>
          <Col span={6} style={{display:"flex"}}>
             <div style={{marginLeft:"-40px"}}><Image src={airlineIcon[flightDetails.airlines]} preview={false}></Image> </div>
             <div style={{marginLeft:"10px"}}>
             <div style={{fontSize:"20px",fontWeight:"750",marginTop:"12px"}}>{flightDetails.airlines}</div>
              <div style={{fontSize:"14px",fontWeight:"600",color:"grey"}}>{flightDetails.flightNo}</div>
            
              </div>
            
          </Col>

           <Col span={6}>
             <div style={{fontSize:"18px",fontWeight:"600"}}>{flightDetails.departureTime}</div>
             <div style={{fontSize:"18px",fontWeight:"600"}}>{flightDetails.airprot_from}</div>
             <div style={{fontSize:"18px",fontWeight:"600"}}>{moment(flightDetails.departureDate).format('Do MMMM, YYYY')}</div>
           </Col>

           <Col span={6}>
            <div style={{fontSize:"18px",fontWeight:"600",marginTop:"16px"}}>{`${Math.floor((flightDetails.duration)/60)} HRS ${(flightDetails.duration)%60} MINS`}</div>
           </Col>

           <Col span={6}>
             <div style={{fontSize:"18px",fontWeight:"600"}}>{flightDetails.arrivalTime}</div>
             <div style={{fontSize:"18px",fontWeight:"600"}}>{flightDetails.airprot_to}</div>
             <div style={{fontSize:"18px",fontWeight:"600"}}>{moment(flightDetails.arrivalDate).format('Do MMMM, YYYY')}</div>
           </Col>
         </Row>
         </Card>

      </Col>
     </Row>
{/* 
      </Panel>

    </Collapse> */}

   <Card style={{marginTop:"20px"}}>
    <Row style={{marginTop:"20px"}}>
          <Col className='baggage-details' span={24}>
              <div className='baggage'>Baggage:<span style={{marginLeft:"20px"}}> Hand Baggage: {flightDetails.cabin_baggage} </span>
                <span style={{marginLeft:"20px"}}>Check-in: {flightDetails.checkin_baggage} </span></div>
              <div className='meals'>Meals: Free Meals</div>  
          </Col>
        </Row>
        </Card>

      </Col>):headerDesign()
      }

    <Col className='fare-container' span={8}>
      
         <Card className='card-style' title="Fare Summary" >
           <div className='fare-div1'> <span>Base fare</span> <span style={{float:"right"}}>₹ 6050</span>

           </div>
           <div className='fare-div1'><span>Taxes and fare</span> <span style={{float:"right"}}>₹ 600</span>

           </div>
           <div style={{background:"rgb(221, 221, 221)"}} className='fare-div1'><span>Total Fare </span> <span style={{float:"right"}}>₹ 6650</span>

           </div>
          </Card> 
       
    </Col>
    </Row>

     <Row style={{marginTop:"2rem"}}>

      <Col span={16}>

      {showItineary &&  <Collapse defaultActiveKey={['2']}>
      
         <Panel showArrow={true} header="Date Change Policy" key="2">

            <Row style={{marginTop:"20px"}}>
            <Col span={16}>
              <Row>
                <Col span={16}>
                  <div>Date Change Fess starts from 2700</div>
                </Col>
              </Row>
            </Col>
            </Row>

            </Panel>

            <Panel showArrow={true} header="Cancellation Policy" key="3">

            <Row style={{marginTop:"20px"}}>
            <Col span={16}>
                      <Row>
                <Col span={16}>
                  <div>Cancellation Fess starts from 3200</div>
                </Col>
              </Row>
            </Col>
            </Row>

            </Panel>

         </Collapse>}

         </Col> 

         <Col style={{marginTop:"10px"}} className='promocode-container' span={8}>
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

       
     {showItineary && <Row style={{ marginTop: !showItineary ? '-20rem' : ''}}>
        <Col span={16}>
      <Collapse activeKey={activePanels} defaultActiveKey={['1']} onChange={onPanelCollapse}>
      <Panel showArrow={true} header="Contact Details" key="1">

          {contactInformation()}

      </Panel>
    </Collapse>
  
    </Col> 
    </Row>}

    
      {showItineary && <Row style={{ marginTop: '10px'}} className='ticket-details'>
        <Col span={16}>
           <div>
           <Button className='continue-btn' htmlType="submit" type="primary"
            float='right' onClick={handleContinue}>Continue</Button>
           </div>
        </Col>
      </Row> }

        <Row style={{ marginTop: !showItineary ? '-27rem' : '1rem',marginBottom:"3rem"}}>
        <Col span={16}>
      <Collapse defaultActiveKey={['1']} onChange={onPanelCollapse}>
      <Panel showArrow={false} header="Travellers Details" key="1">

         

          {[1,2].map((i)=>{

            return travelerDetails()
              
          })}

      </Panel>
    </Collapse>
  
    </Col> 
    </Row>

    <Row>
        <Col span={16}>
           <div>
           <Button className='continue-btn' htmlType="submit" type="primary"
            float='right'>Continue</Button>
           </div>
        </Col>
      </Row>

    <Row className='adds-on'>
      <Col span={16}>
      <AddsOn />
      </Col>
    </Row>

   
    <Row>
        <Col span={16}>
           <div>
           <Button className='continue-btn' htmlType="submit" type="primary"
            float='right'>Continue</Button>
           </div>
        </Col>
      </Row>

       {/* {ticketPayment()} */}
       
    </Space>
     </>
  )
}

export default BookingConfirm