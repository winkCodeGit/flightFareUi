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
import { BsArrowRight } from 'react-icons/bs';

import moment from 'moment';
import AddsOn from './AddsOn';
import { getMeals_Baggage } from '../../../Api/LandingPage';
import { getFareRules } from '../../../Api/LandingPage';
const { Panel } = Collapse;
const { Option } = Select;

const airlineIcon = {
  "IndiGo":indigo,
  "Air India Express":airAsia,
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
  const [additionalDetails, setAdditionalDetails] = useState({
    meals:[],
    baggage:[]
  })
  const [isAddsOn, setIsAddsOn] = useState(false);
  const [earlyCancellation, setEarlyCancellation] = useState("");
  const [lateCancellation, setLateCancellation] = useState("");
  const [earlyDateChangeFee, setEarlyDateChangeFee] = useState("");
  const [secondDateChangeFee, setSecondDateChangeFee] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [showContactClose, setShowContactClose] = useState(false);
  const [showTravellerInfo, setShowTravellerInfo] = useState(false);
  const [showTrvallerClose, setShowTravellerClose] = useState(false);
  const [showAddsonInfo, setShowAddsonInfo] = useState(false);
  const [dateChange, setDateChange] = useState(null);
  const[airlinesData, setAirlinesData] = useState(JSON.parse(localStorage.getItem('airlinesData')));
  const [contactInfo, setContactInfo] = useState({
    mobile:"",
    email:""
  })
  // const [mobNo, setMobNo] = useState();
  // const [email,setEmail] = useState();
  if (flightDetails.departureTime && /^\d{2}:\d{2}$/.test(flightDetails.departureTime)) {
    const newDepartureTime = flightDetails.departureTime;
    const [hours, minutes] = newDepartureTime.split(':').map(Number);
  

// Subtract 4 hours
const newHours = hours - 4;

// Ensure the new hours are within the valid range (0 to 23)
if (newHours < 0) {
  newHours += 24; // Add 24 hours to wrap around to the previous day
}

// Format the result as "HH:mm"
var resultTime = `${String(newHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

console.log("New time:", resultTime);
  }else{
    console.log("invalid time");
  }

  const addsOnData = async(key)=>{
  
    try {
      const res = await getMeals_Baggage(key);
      setAdditionalDetails(res);
      if( res?.meals?.length >0 || res?.baggage?.length >0){
        setIsAddsOn(true);
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  console.log(additionalDetails);
  
 useEffect(() => {

 console.log(airlinesData)
  const parsed = qs.parse(location.search);
  setFlightDetails(parsed);
  addsOnData(parsed.fareRuleKey);
  
  console.log(flightDetails)
  fareRules(parsed.fareRuleKey);
 
 }, [])

 const fareRules = async(key)=>{
       
  try {
      const res = await getFareRules(key);
     
      console.log(res);
    
      if(res?.fareRules[0]?.fareRule?.dateChangeFee?.isChangePermitted){
        setDateChange(res?.fareRules[0]?.fareRule.dateChangeFee?.dateChangeRange[0]?.range?.end)
        setEarlyDateChangeFee(res?.fareRules[0]?.fareRule.dateChangeFee?.dateChangeRange[1].Value.toString());
        setSecondDateChangeFee (res?.fareRules[0]?.fareRule.dateChangeFee?.dateChangeRange[0].Value.toString());
          
      }else{
        setEarlyDateChangeFee("");
        setSecondDateChangeFee("");
      }

      if(res?.fareRules[0]?.fareRule?.cancellationFee?.isRefundable){
        setEarlyCancellation(res?.fareRules[0]?.fareRule.cancellationFee?.cancellationRange[1]?.Value.toString());
        setLateCancellation(res?.fareRules[0]?.fareRule.cancellationFee?.cancellationRange[0]?.Value.toString());
      }else{
        setEarlyCancellation("");
        setLateCancellation("");
      }

  } catch (error) {
      console.log(error)
  }
}

console.log(dateChange)
 console.log(contactInfo)
 const onPanelCollapse = (key) => {
  setActivePanels(key);
};

const handleContinue = () => {
   // setActivePanels([]); // Set an empty array to close all panels
   setShowItineary(false);
   setShowTicketHeader(true);
   setShowContactForm(true)
   setShowContactClose(false)
   
   
};

const handleContact = ()=>{
  setShowContactForm(false)
  setShowTravellerInfo(true);
  setShowContactClose(true)
  setShowTravellerClose(false)

}

const handleTravellerInfo = ()=>{
  
  setShowAddsonInfo(true)
  setShowTravellerInfo(false);
  setShowTravellerClose(true)

}
// const contactDetails = (value)=>{
   
//    console.log(value)
// }

const rowStyle = showItineary ? { marginTop: '-29rem' } : {};
// const rowStyle = showItineary ? { marginTop: '-29rem' } : {};

const emailValidator = {
  type: 'email',
  message: 'Invalid email address',
};

const phoneValidator = {
  pattern: /^[0-9]*$/,
  message: 'Invalid phone number',
};


const onFinish = (values) => {
  console.log(values);
};


const contactInformation=()=>{
    return(
     <>
      <Row className='contact-info'>
                <div>
                      <h1>Contact Information </h1>
                </div>

           <Col className='contact-nfo-inner' span={24}>
              <div>Your ticket and flight info will be sent here</div>
         <Row>
          <Form 
           name="travellerForm"
           onFinish={onFinish}
           layout="inline"
           
          >
       
                <Input 
                  defaultValue="+91"
                  style={{width:"8%",height:"34px",marginRight:"4px"}}
                 />
                
                 <Form.Item
                 
                 name="mobile"
                 rules={[
                   { required: true, message: 'Please enter your mobile number!' },
                   phoneValidator,
                   { min: 10, message: 'Mobile number must be at least 10 digits.' },
                   { max: 10, message: 'Mobile number cannot exceed 10 digits.' },
                 ]}
               >
                 <Input 
                  prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="Mobile Number"
                  style={{width:"100%"}}
                  onChange={(e)=>setContactInfo({...contactInfo, mobile:e.target.value})}
                 />
                </Form.Item>
               
                  <Form.Item
                      
                       name="email"
                       rules={[
                         { required: true, message: 'Please enter your email!' },
                         emailValidator,
                       ]}
                     >
                  <Input
                    style={{width:"100%"}}
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Email Id"
                    onChange={(e)=>setContactInfo({...contactInfo, email:e.target.value})}
                />
                  </Form.Item>
                 
                 
              </Form>
              <div>
                  <Checkbox>Update me on order status, news, and exclusive offers via sms, whatsapp and email</Checkbox>
                </div>
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

function ticketData(){
   return(
    <>
    
    {airlinesData[0]['flight_details'] && airlinesData[0]['flight_details'].length>0 && airlinesData[0]['flight_details']?.map((elem,indx)=>{
              
              return(
              <>
                  <Row key={indx}>
                  <Col span={4}>
                  <div>{<Image style={{width:"20%",marginTop:"10px"}} src={airlineIcon[elem.airlines]} preview={false}/>}</div>
                      <div style={{fontSize:"16px",fontWeight:"650",marginLeft:"17px"}}>{elem.airlines}</div>
                      <div style={{fontSize:"14px",fontWeight:"600",color:"grey",marginLeft:"17px"}}>{elem.flightNo}</div>
                  
                  </Col>
  
                  <Col span={4}>
                  <div style={{fontSize:"16px",fontWeight:"600",marginTop:"13px"}}>{elem.departureTime}</div>
                  <div style={{fontSize:"14px",color:"grey"}}>{elem.departureFrom}</div>
                  <div style={{fontSize:"14px",color:"grey"}}>
                  {moment(elem.departureDate).format('Do MMMM, YYYY')}</div>
                  </Col>
                  
              <Col span={6}>
                  <div style={{fontSize:"15px",fontWeight:"600",marginLeft:"46px",color:"grey",marginTop:"41px"}}>
                      {`${Math.floor((elem.duration)/60)} HRS ${(elem.duration)%60} MINS`}</div>
  
               <div style={{marginTop:"31px"}}>
                   {elem.layover_time !== null ? (
                      <>
                       <div className='layover-time' style={{ fontSize: "18px", color: "grey",fontWeight:"750",marginLeft:"-50px" }}>
                          <div></div>
                          <div className='layover-text'>
                             Lay Over {`${Math.floor(elem.layover_time / 60)} HRS ${elem.layover_time % 60} MINS`}
                          </div>
                         <div></div>
                      </div>
                      </>
                      
                      
                  ) : null}
                   </div>
                  
              </Col>
  
              <Col span={6}>
                  <div style={{fontSize:"16px",fontWeight:"600",marginTop:"13px",marginLeft:"6rem"}}>{elem.arrivalTime}</div>
                  <div style={{fontSize:"14px",color:"grey",marginLeft:"6rem"}}>{elem.arrival}</div>
                  <div style={{fontSize:"14px",color:"grey",marginLeft:"6rem"}}>
                  {moment(elem.arrivalDate).format('Do MMMM, YYYY')}</div>
                  </Col>
                  </Row>
  
              </>
                      )
                  })}
           </>
   )
}

  function headerDesign(){
    // debugger
    return(
      <>
      <Col span={16}>
       <Card className='header-card' style={{borderTop:"1px solid #cfcfcf"}}>
        <Row style={{cursor:"pointer"}} onClick={()=>{setShowTicketHeader(false),
          setShowItineary(true),setShowTravellerInfo(false),setShowAddsonInfo(false)}}>
          <Col span={2}>
          <div style={{marginTop:"10px",cursor:"pointer"}} ><CheckOutlined style={{ color:"green",fontSize:"30px"}}/></div> 
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

         </Card>
          
        
      </Col>
      
      </>
    )
  }

  const contactInfoClose = ()=>{
    return(
      <Card className='header-card' style={{borderTop:"1px solid #cfcfcf",marginTop:"10px",cursor:"pointer"}}
       onClick={()=>{setShowContactForm(true),setShowContactClose(false),
       setShowTravellerInfo(false),setShowAddsonInfo(false)}}>
      <Row>
        <Col span={2}>
          <div style={{marginTop:"10px"}}><CheckOutlined style={{ color:"green",fontSize:"30px"}}/></div> 
          </Col>
        <Col span={20}>
          <div style={{fontSize:"20px",fontWeight:"700"}}><span> {contactInfo.email} ,</span>
           <span>{contactInfo.mobile} </span> </div>
          <div>E ticket will be sent here. Booking for someone else?
             <span style={{color:"blue",cursor:"pointer"}} >enter their phone number here</span> </div>
        </Col>
      </Row> 
      </Card>
    )
  }
  
  const travellerInfoClose = ()=>{
    return(
      

      <Card className='header-card' style={{borderTop:"1px solid #cfcfcf",cursor:"pointer"}}
       onClick={()=>{setShowTravellerInfo(true),setShowTravellerClose(false),setShowAddsonInfo(false)}}>
      <Row>
        <Col span={2}>
          <div style={{marginTop:"10px"}}><CheckOutlined style={{ color:"green",fontSize:"30px"}}/></div> 
          </Col>
        <Col span={20}>
          <div style={{fontSize:"20px",fontWeight:"700",color:"blue"}}>
                 Traveller's details saved
           </div>
        </Col>
      </Row> 
      </Card>
      
    )
  }

  // const addsOnInfoClose = ()=>{
  //   return(
      
  //     <Card className='header-card' style={{borderTop:"1px solid #cfcfcf",cursor:"pointer"}}
  //      onClick={()=>{}}>
  //     <Row>
  //       <Col span={2}>
  //         <div style={{marginTop:"10px"}}><CheckOutlined style={{ color:"green",fontSize:"30px"}}/></div> 
  //         </Col>
  //       <Col span={20}>
  //         <div style={{fontSize:"18px",fontWeight:"700",color:"blue"}}>
  //                meals,check-in baggages selected
  //          </div>
  //       </Col>
  //     </Row> 
  //     </Card>
      
  //   )
  // }



  return (
     <>
     
     <Space className='bookTicket-container' style={{width:"100%",paddingLeft:"20px",minHeight:"390px"}} direction="vertical">
     
      <Row style={{marginTop:"35px"}}>
      {showItineary && showItineary?

      ( <Col span={16}>
        
      <Row>
         <Col span={24}>
          <div style={{fontSize:"25px",fontWeight:"700",marginBottom:"10px",cursor:"pointer"}}>Review Your Itinerary</div>

         {/* <Card className='flight-details'>
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
        </Card> */}

      <Card className='flight-details-body' style={{borderTop:"1px solid #cfcfcf"}}>

            {ticketData()}
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
           <div className='fare-div1'> <span>Base fare</span> <span style={{float:"right"}}>₹ {airlinesData[0]['flightFares'][0]?.fareAmount?.baseFare}</span>

           </div>
           <div className='fare-div1'><span>Taxes and fare</span> <span style={{float:"right"}}>₹ {Math.round(airlinesData[0]['flightFares'][0]?.fareAmount?.tax)}</span>

           </div>
           <div style={{background:"rgb(221, 221, 221)"}} className='fare-div1'><span>Total Fare </span> <span style={{float:"right"}}>₹ {Math.round(airlinesData[0]['flightFares'][0]?.fareAmount?.totalFare)}</span>

           </div>
          </Card> 
       
    </Col>
    </Row>

     <Row className='date_cancelPolicy' style={{marginTop:"2rem"}}>

      <Col span={16}>

      {showItineary &&  <Collapse bordered={false}  defaultActiveKey={['2']}>
      
        <Card className='date_cancel-card' title={`${flightDetails.airprot_from} - ${airlinesData[0]['flight_details']?.slice(-1)[0]?.arrival}`}>
         
          </Card>
         <Panel showArrow={true} header="Date Change Policy" key="2">

           {(earlyDateChangeFee || secondDateChangeFee) ?( <Row style={{marginTop:"20px",gap:"20px"}}>
                <Col span={5}>
                  <div>Change between</div>
                  <div style={{marginTop:"10px"}}>Date change charges</div>
                </Col>

                <Col span={4}>
                  <div>Now</div>
                  <div style={{height:"6px",borderRadius:"3px",marginTop:"10px",background:"rgb(88, 166, 92)"}}></div>
                  <div>₹ {earlyDateChangeFee}</div>
                </Col>

                <Col span={4}>
                <div>{moment(flightDetails.departureDate).subtract(dateChange,'days').format('Do MMMM')}, {flightDetails.departureTime}</div>
                <div style={{height:"6px",borderRadius:"3px",marginTop:"10px",background:"rgb(242, 191, 66)"}}></div>
                <div>₹ {secondDateChangeFee}</div>
                </Col>
            
                <Col span={4}>
                <div>{moment(flightDetails.departureDate).format('Do MMMM')}, {resultTime}</div>
                <div style={{height:"6px",borderRadius:"3px",marginTop:"10px",background:"rgb(216, 80, 64)"}}></div>
                 <div style={{color:"red"}}>Not Allowed</div>
                </Col>

            </Row>
         ):
         (
          <div style={{color:"red"}}> Date Change Not Allowed</div>
        )}
            </Panel>


            <Panel showArrow={true} header="Cancellation Policy" key="3">

           {(earlyCancellation || lateCancellation) ? (<Row style={{marginTop:"20px",gap:"20px"}}>
                <Col span={5}>
                  <div>Cancel between</div>
                  <div style={{marginTop:"10px"}}>cancellation Charges</div>
                </Col>
               { earlyCancellation ?( <Col span={4}>
                  <div>Now</div>
                  <div style={{height:"6px",borderRadius:"3px",marginTop:"10px",background:"rgb(88, 166, 92)"}}></div>
                  <div>₹ {earlyCancellation}</div>
                </Col>):

                   ( <Col span={4}>
                    <div>Now</div>
                    <div style={{height:"6px",borderRadius:"3px",marginTop:"10px",background:"rgb(88, 166, 92)"}}></div>
                    <div>₹ {lateCancellation}</div>
                  </Col>)
                 
                }

               { earlyCancellation && <Col span={4}>
               
                <div>{moment(flightDetails.departureDate).subtract(dateChange,'days').format('Do MMMM')}, {flightDetails.departureTime}</div>
                <div style={{height:"6px",borderRadius:"3px",marginTop:"10px",background:"rgb(242, 191, 66)"}}></div>
                <div>₹ {lateCancellation} </div>
                </Col>}
            
                <Col span={4}>
                <div>{moment(flightDetails.departureDate).format('Do MMMM')}, {resultTime}</div>
                <div style={{height:"6px",borderRadius:"3px",marginTop:"10px",background:"rgb(216, 80, 64)"}}></div>
                <div style={{color:"red"}}>Full Amount</div>
                </Col>
            </Row>):
               (
                <div style={{color:"red"}}>Full Amount will be charged for cancellation</div>
               )
            }

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
 
       {showItineary && <Row style={{ marginTop: '10px'}} className='ticket-details'>
        <Col span={16}>
           <div>
           <Button className='continue-btn' htmlType="submit" type="primary"
            float='right' onClick={handleContinue}>Continue</Button>
           </div>
        </Col>
      </Row> }      
       
     
       <Row style={{marginTop: !showItineary ? '-27rem' : ''}}>
        <Col span={16}>

        {  showContactForm && 
      <Collapse activeKey={activePanels} defaultActiveKey={['1']} onChange={onPanelCollapse}>
      <Panel showArrow={true} header="Contact Details" key="1">

          {contactInformation()}

      </Panel>
    </Collapse>
    }
        { showContactClose && contactInfoClose()} 
    </Col> 
    </Row> 

    { showContactForm &&
    <Row style={{ marginTop: !showItineary ? '-11rem' : '5px'}} className='ticket-details'>
        <Col span={16}>
           <div>
           <Button className='continue-btn' htmlType="submit" type="primary"
            float='right' onClick={handleContact}>Continue</Button>
           </div>
        </Col>
      </Row>}

       

      {showTravellerInfo &&
      
      <Row style={{ marginTop: showContactForm ? '-6rem' : '-18rem'}}>
        <Col span={16}>

      <Collapse defaultActiveKey={['1']} onChange={onPanelCollapse}>
      <Panel showArrow={false} header="Travellers Details" key="1">

          {[1,2].map((i)=>{

            return travelerDetails()
              
          })}
      </Panel>
    </Collapse>
  
    </Col> 
    </Row> }

    {showTravellerInfo && <Row>
        <Col span={16}>
           <div>
           <Button className='continue-btn' type="primary"
            float='right' onClick={handleTravellerInfo}>Continue</Button>
           </div>
        </Col>
      </Row>
        
      }

       {showTrvallerClose && <Row style={{marginTop: showContactForm ? '-6rem' : (showItineary ? '0' : '-18rem') }}>
        <Col span={16}>
         {travellerInfoClose()} 
      </Col>
      </Row>}

   { isAddsOn && showAddsonInfo &&
   
   <Row className='adds-on' style={{ marginTop: showTravellerInfo ? '-6rem' : "-5rem"}}>
      <Col span={16}>
      <AddsOn data={additionalDetails} />
      </Col>
    </Row>
    }

   {showTrvallerClose && <Row style={{marginBottom:"20px "}}>
        <Col span={16}>
           <div>
           <Button className='continue-btn' htmlType="submit" type="primary"
            float='right'>Continue to Payment</Button>
           </div>
        </Col>
      </Row>} 
        
      
        
       {/* {ticketPayment()} */}
       
    </Space>
     </>
  )
}

export default BookingConfirm