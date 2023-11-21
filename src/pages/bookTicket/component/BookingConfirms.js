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
  const[hidePassengerinfo, setHidePassengerinfo] = useState(false)
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
  const [activeKey, setActiveKey] = useState(['1']);
  const [completedPanels, setCompletedPanels] = useState([]);

  const handlePanelChange = (key) => {
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
    setCompletedPanels([...completedPanels, currentActiveKey]);
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


  return (
    <>
    <Row>
        <Col span={16}>
                <Space className='bookTicket-container' style={{width:"100%",paddingLeft:"20px",minHeight:"390px",paddingBottom:"30px"}} direction="vertical">
                <Collapse activeKey={activeKey}
                onChange={handlePanelChange}
                accordion={true}
                expandIconPosition="right"
                >
                <Panel
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
                   
                    <Button type="primary" onClick={handleContinue}>
                    Continue
                    </Button>
                </Panel>
                <Panel
                    header={
                    <span>
                        Panel 2 {isPanelCompleted('2') && <FaCheckCircle style={{ color: 'green' }} />}
                    </span>
                    }
                    key="2"
                >
                    <p>Content of panel 2</p>
                    <Button type="primary" onClick={handleContinue}>
                    Continue
                    </Button>
                </Panel>
                <Panel
                    header={
                    <span>
                        Panel 3 {isPanelCompleted('3') && <FaCheckCircle style={{ color: 'green' }} />}
                    </span>
                    }
                    key="3"
                >
                    <p>Content of panel 3</p>
                    <Button type="primary" onClick={handleContinue}>
                    Continue
                    </Button>
                </Panel>
                <Panel
                    header={
                    <span>
                        Panel 4 {isPanelCompleted('4') && <FaCheckCircle style={{ color: 'green' }} />}
                    </span>
                    }
                    key="4"
                >
                    <p>Content of panel 4</p>
                    <Button type="primary" onClick={handleContinue}>
                    Continue
                    </Button>
                </Panel>
                </Collapse>
                    </Space>
        </Col>
        
        <Col span={8}>Payment calculation

        </Col>
    </Row>
    
    </>
      );
};

export default BookingConfirms;
