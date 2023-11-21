import React, {useState, useEffect } from 'react'
import { Card, Row, Col,Collapse,Image, Button, Select, Space, Form, Input, Checkbox,Tag  } from 'antd'
import { MailOutlined, MobileOutlined, UserOutlined, CreditCardOutlined, BankOutlined, CheckOutlined } from '@ant-design/icons';
import qs from 'query-string';
import './BookingConfirms.scss'
import airAsia from '../../../assets/small/airasia.jpg'
import indigo from '../../../assets/small/indigo.jpg'
import vistara from '../../../assets/small/vistara.jpg'
import spicejet from '../../../assets/small/spicejet.jpg'
import airIndia from '../../../assets/small/airIndia.jpg'
import starAir from '../../../assets/small/starAir.jpg'
import akasaAir from '../../../assets/small/akasaAir.jpg'
import allianceAir from '../../../assets/small/allianceAir.jpg'
import { FaWallet, FaGooglePay,FaPlaneDeparture ,FaPlaneArrival, FaCheckCircle   } from 'react-icons/fa';
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosAirplane,IoMdCheckmarkCircle  } from "react-icons/io";
import { PiNumberCircleOneLight,PiNumberCircleFourLight,PiNumberCircleThreeLight,PiNumberCircleTwoLight } from "react-icons/pi";
import { SiRazorpay } from 'react-icons/si';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';

import moment from 'moment';
import AddsOn from './AddsOn';
import { getMeals_Baggage } from '../../../Api/LandingPage';
import { getFareRules } from '../../../Api/LandingPage';
import FareSection from './FareSection';
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

const BookingConfirms = () => {

  const[flightDetails, setFlightDetails] = useState({});
  const [additionalDetails, setAdditionalDetails] = useState({
    meals:[],
    baggage:[]
  })
  const [earlyCancellation, setEarlyCancellation] = useState("");
  const [lateCancellation, setLateCancellation] = useState("");
  const [earlyDateChangeFee, setEarlyDateChangeFee] = useState("");
  const [secondDateChangeFee, setSecondDateChangeFee] = useState("");
  const [dateChange, setDateChange] = useState(null);
  const[airlinesData, setAirlinesData] = useState(JSON.parse(localStorage.getItem('airlinesData')));
  const [contactInfo, setContactInfo] = useState({
    mobile:"",
    email:""
  })
  const [activeKey, setActiveKey] = useState(['1']);
  const [completedPanels, setCompletedPanels] = useState([]);

  const handlePanelChange = (key) => {
    setCompletedPanels((prevVal) => {
        const indexToRemove = prevVal.indexOf(key[0]);
        if (indexToRemove !== -1) {
          const updatedArray = [...prevVal.slice(0, indexToRemove), ...prevVal.slice(indexToRemove + 1)];
          return updatedArray;
        } else {
          return prevVal;
        }
      }); 
    setActiveKey(key);
  };

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
  const parsed = qs.parse(location.search);
  setFlightDetails(parsed);
  addsOnData(parsed.fareRuleKey);
  fareRules(parsed.fareRuleKey);
 
 }, [])

 useEffect(()=>{

 },[completedPanels])

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

  const handleContinue = () => {
    const currentActiveKey = activeKey[0];
    const nextKey = (parseInt(currentActiveKey, 10) + 1).toString();
    setActiveKey([nextKey]);
    setCompletedPanels([...completedPanels, currentActiveKey])
  };

  const isPanelCompleted = (key) => {
    return completedPanels.includes(key);
  };


  function ticketData(){
    return(
     <>
     
     {airlinesData[0]['flight_details'] && airlinesData[0]['flight_details'].length>0 && airlinesData[0]['flight_details']?.map((elem,indx)=>{
               
               return(
               <>
                   <Row key={indx}>
                   <Col span={5}>
                   <div>{<Image style={{width:"35%",marginTop:"10px"}} src={airlineIcon[elem.airlines]} preview={false}/>}</div>
                       <div style={{fontSize:"18px",fontWeight:"750",marginLeft:"24px"}}>{elem.airlines}</div>
                       <div style={{fontSize:"16px",fontWeight:"700",color:"grey",marginLeft:"24px",marginBottom:"9px"}}>
                         {elem.flightNo}</div>
                   
                   </Col>
   
                   <Col span={5}>
                   <div style={{fontSize:"24px",fontWeight:"800",marginTop:"13px"}}>{elem.departureTime}</div>
                   <div style={{fontSize:"16px",color:"grey",fontWeight:"700"}}>{elem.departureFrom}</div>
                   <div style={{fontSize:"16px",color:"grey",fontWeight:"800"}}>
                   {moment(elem.departureDate).format('Do MMMM, YYYY')}</div>
                   </Col>
                   
               <Col span={6}>
                   <div style={{fontSize:"18px",fontWeight:"800",marginLeft:"46px",color:"grey",marginTop:"41px"}}>
                       {`${Math.floor((elem.duration)/60)} HRS ${(elem.duration)%60} MINS`}</div>
 
                    <div className='flight-icon-container'>
                        <div><FaPlaneDeparture style={{fontSize:"26px"}}/></div>
                        <div><IoIosAirplane style={{fontSize:"28px"}}/></div>
                        <div><IoIosAirplane style={{fontSize:"28px"}}/></div>
                        <div><IoIosAirplane style={{fontSize:"28px"}}/></div>
                        <div><FaPlaneArrival style={{fontSize:"26px"}}/></div>
                     </div>   
   
                <div style={{marginTop:"11px"}}>
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
   
               <Col span={8}>
                   <div style={{fontSize:"24px",fontWeight:"800",marginTop:"13px",marginLeft:"6rem"}}>{elem.arrivalTime}</div>
                   <div style={{fontSize:"16px",color:"grey",fontWeight:"700",marginLeft:"6rem"}}>{elem.arrival}</div>
                   <div style={{fontSize:"16px",color:"grey",fontWeight:"700",marginLeft:"6rem"}}>
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
    return(
      <>

        <Row onClick={()=>{setShowTicketHeader(false),
          setShowItineary(true),setShowTravellerInfo(false),setShowAddsonInfo(false)}}>
          
          <Col span={6} style={{display:"flex"}}>
           <div style={{marginTop:"10px",cursor:"pointer"}} ><IoMdCheckmarkCircle style={{ color:"green",fontSize:"40px"}}/></div> 
             <div><Image style={{width:"2.7rem",marginTop:"10px",marginLeft:"10px"}} src={airlineIcon[flightDetails.airlines]} preview={false}></Image> </div>
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
      </>
    )
  }

function cancellationData(){
    return(
        <>

            <Row className='date_cancelPolicy' style={{marginTop:"2rem"}}>
            <Col span={24}>

        {<Collapse defaultActiveKey={['2']} >

        {/* <Card className='date_cancel-card' title={`${flightDetails.airprot_from} - ${airlinesData[0]['flight_details']?.slice(-1)[0]?.arrival}`}>
        
            </Card> */}
            <div style={{fontSize:"25px",fontWeight:"700",marginBottom:"10px",marginTop:"5px",marginLeft:"10px"}}>
            {flightDetails.airprot_from} - {airlinesData[0]['flight_details']?.slice(-1)[0]?.arrival}
            </div>
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

            <Panel showArrow={true} style={{marginTop:"15px"}} header="Cancellation Policy" key="3">

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
            </Row>

        </>
    )
}

const contactInfoClose = ()=>{
    return(
     
      <Row style={{paddingBottom:"10px"}}>
        <Col span={1}>
        <div ><IoMdCheckmarkCircle style={{ color:"green",fontSize:"40px"}}/></div>
          </Col>
        <Col span={20} style={{marginLeft:"17px"}}>
         
          <div style={{fontSize:"20px",fontWeight:"700"}}><span> {contactInfo.email} ,</span>
           <span>{contactInfo.mobile} </span> </div>
          <div style={{marginTop:"5px"}}>E ticket will be sent here. Booking for someone else?
             <span style={{color:"blue",cursor:"pointer"}} >enter their phone number here</span> </div>
        </Col>
      </Row> 
      // </Card>
    )
  }

 

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
       <Card>
        <Row className='contact-info'> 
           <Col className='contact-nfo-inner' span={24}>
              <div style={{fontSize:"18px",fontWeight:"600",paddingBottom:"10px"}}>Your ticket and flight info will be sent here</div>
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
          </Col>
        </Row>
    </Card>
        </>
    )
}

const travellerInfoClose = ()=>{
    return(
      
      <Row style={{paddingBottom:"10px"}}
       onClick={()=>{setShowTravellerInfo(true),setShowTravellerClose(false),setShowAddsonInfo(false)}}>
        <Col span={1}>
          <div ><IoMdCheckmarkCircle style={{ color:"green",fontSize:"40px"}}/></div> 
          </Col>
          
        <Col span={20} style={{marginLeft:"17px"}}>
          <div style={{fontSize:"20px",fontWeight:"700",color:"blue",marginTop:"5px"}}>
                 Traveller's details saved
           </div>
        </Col>
      </Row> 
      // </Card>
      
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
                                  <Form.Item label={<label style={{ color: "black",paddingRight:"7px" }}>Title</label>}>
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

  const handlePayment = ()=>{
    console.log('payment page')
  }

  return (
    <>
    <Row style={{marginTop:"30px"}}>
        <Col span={16}>
                <Space className='bookTicket-container' style={{width:"100%",paddingLeft:"20px",minHeight:"390px",paddingBottom:"30px"}} direction="vertical">
                <Collapse activeKey={activeKey}
                onChange={handlePanelChange}
                accordion={true}
                expandIconPosition="right"
                >
                <Panel
                    showArrow={false}
                    header={
                        isPanelCompleted('1')?
                        <span>
                        {headerDesign()}
                      </span> :
                     ( <span>
           <div style={{display:"flex"}}>
            <div style={{marginBottom:"10px",marginRight:"10px"}}><PiNumberCircleOneLight style={{fontSize:"35px",marginTop:"10px"}}/> </div>
            <div style={{fontSize:"25px",fontWeight:"700",marginBottom:"10px",cursor:"pointer",marginTop:"5px"}}
            >Review Your Itinerary</div>
            </div>
            </span>) 
            
                    }
                    key="1"
                >

            {ticketData()}
              <Row >
              <Col className='baggage-details' span={14}>
              <div className='baggage'><span style={{marginLeft:"20px"}}> Hand Baggage: {flightDetails.cabin_baggage} </span>
                <span style={{marginLeft:"20px"}}>Check-in: {flightDetails.checkin_baggage} </span></div>
              
             </Col>
               </Row>

             {cancellationData()}
                   
                   <div style={{padding:"10px"}}>
                    <Row>
                        <Col span={5} offset={19}>
                        <Button className='continue-btn' type='primary' onClick={handleContinue}>
                    Continue
                    </Button>
                        </Col>
                    </Row>
                   </div>
                    
                </Panel>

                <Panel
                    showArrow={false}
                    header={
                        isPanelCompleted('2')?
                        <span>
                     {contactInfoClose()}
                        </span>:

           ( <span>
            <Row>
          <Col span={20}>
          <div style={{display:"flex"}}>
            <div style={{marginBottom:"10px",marginRight:"10px"}}><PiNumberCircleTwoLight style={{fontSize:"42px"}}/> </div>
            <div style={{fontSize:"25px",fontWeight:"700",marginBottom:"10px",cursor:"pointer",marginTop:"5px"}}
            >Add Contact Details</div>
          </div>
         
          </Col>
        </Row> 
         </span>)
                    }
                    key="2"
                >
                     {contactInformation()}

                     <div style={{padding:"10px"}}>
                    <Row>
                        <Col span={5} offset={19}>
                        <Button className='continue-btn' type='primary' onClick={handleContinue}>
                    Continue
                    </Button>
                        </Col>
                    </Row>
                   </div>

                </Panel>


                <Panel
                    showArrow={false}
                    header={
                        isPanelCompleted('3')?
                    <span>
                       {travellerInfoClose()} 
                    </span>:
                    
                    (<span>

           <div style={{display:"flex"}}>
            <div style={{marginBottom:"10px",marginRight:"10px"}}><PiNumberCircleThreeLight style={{fontSize:"42px"}}/> </div>
            <div style={{fontSize:"25px",fontWeight:"700",marginBottom:"10px",cursor:"pointer",marginTop:"5px"}}
            >Add Traveller Details</div>
          </div>
                        </span>)

                    }
                   
                    key="3"
                >
                     {[1,2].map((i)=>{

                        return travelerDetails()
                        })}

                    <div style={{padding:"10px"}}>
                    <Row>
                        <Col span={5} offset={19}>
                        <Button className='continue-btn' type='primary' onClick={handleContinue}>
                    Continue
                    </Button>
                        </Col>
                    </Row>
                   </div>

                </Panel>

                <Panel
                    showArrow={false}
                    header={
                    <span>
            <div style={{display:"flex"}}>
            <div style={{marginBottom:"10px",marginRight:"10px"}}><PiNumberCircleFourLight style={{fontSize:"42px"}}/> </div>
            <div style={{fontSize:"25px",fontWeight:"700",marginBottom:"10px",cursor:"pointer",marginTop:"5px"}}
            >Choose add-ons</div>
          </div>
                    </span>
                    }
                    key="4"
                >
                     <Row className='adds-on'>
                        <Col span={24}>
                        <AddsOn data={additionalDetails} />
                        </Col>
                        </Row>
                        <div style={{padding:"10px"}}>
                    <Row>
                        <Col span={5} offset={19}>
                        <Button className='continue-btn' type='primary' onClick={handlePayment}>
                    Continue to Payment
                    </Button>
                        </Col>
                    </Row>
                   </div>

                </Panel>
                </Collapse>
                    </Space>
        </Col>

        <Col span={8}>
             <FareSection data={airlinesData}/>
        </Col>
    </Row>
    
    </>
      );
};

export default BookingConfirms;
