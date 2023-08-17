import React from 'react'
import { Row, Col, Button,Card,Image,} from 'antd';

import { MdFlight } from "react-icons/md";
import { BsDot, BsShieldCheck } from "react-icons/bs";
import { IoIosPerson } from "react-icons/io";
import { TeamOutlined, CalendarOutlined, CloseCircleOutlined, CheckCircleOutlined, ArrowRightOutlined, CheckSquareOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import airAsia from '../../../assets/small/airasia.jpg'
import indigo from '../../../assets/small/indigo.jpg'
import vistara from '../../../assets/small/vistara.jpg'
import './UpComingFlight.scss'


const airlineIcon = {
    "Indigo":indigo,
    "Air Asia":airAsia,
    "Vistara":vistara
  }
  
const UpComingFlight = (manageBooking) => {

  return (
    <>
     <Row className='upcoming-flight-container'>
        
        <Col xs={{span:24}} md={{span:24}}>
         
        <Button className='back-btn' style={{float:"right"}} onClick={manageBooking}>Back</Button>
          
         <div className='text-size'> Your Flight booking is confirmed</div>
         <div className='text-size'>Booking Id MF27856458</div>
 
         <Row className='checklist-card'>
           <Col xs={{span:24}} md={{span:16}}>
             <Card >
                 <div> <span className='saftey-icon'><BsShieldCheck /></span>
                 <span className='text-size'>Your Checklist for a Safe Trip</span>
               </div>
 
               <div>Complete these steps for a hassle free experience at the airport</div>
 
               <Row>
                 <Col className='aarogya' xs={{span:24}} md={{span:6}}>
                   <h2>Arogya Setu App</h2>
                   <div>Download Aarogya Setu app:'Safe' status <br/>
                     is recommended to travel.
                   </div>
                 </Col>
 
                 <Col className='guideline' xs={{span:24}} md={{span:6}}>
                    <h2>Guidelines</h2>
                    <div>Check quarantine guidelines for <br/>
                      your destination state
                    </div>
                 </Col>
                 <Col className='important-info' xs={{span:24}} md={{span:12}}>
                    <h3>IMPORTANT INFORMATION</h3>
                    <div><BsDot />Valid ID proof needed: </div>
                      <p>Carry a valid photo identification proof(Driver License, Aadhar Card,Pan Card <br />
                       or any other govt. recognised identification)</p>
                   
                 </Col>
 
 
               </Row>
             </Card>
             </Col>
 
             <Col style={{marginLeft:"3rem"}} xs={{span:24}} md={{span:6}}>
              <Card className='change-plans'>
                <div><h3>Change in Plans</h3></div>
                 <div>Cancel Full Booking</div>
                 <div>Change Travel Dates</div>
              </Card>
              </Col>
           
         </Row>
 
         <Row className='flight-details'>
         <Col xs={{span:24}} md={{span:16}}>
           <Card>
            <div><h2>Kolkata <ArrowRightOutlined /> Mumbai <span> <CheckCircleOutlined /> Confirmed</span></h2></div> 
            <div> <span><CheckSquareOutlined /></span> <h3>Web Check-in confirmed</h3> </div>
             <p>We will initiate the web check in on your behalf and share your generated boarding <br />
              pass via email or WhatsApp 12-6 hours before the flight's departure.</p>
 
              <Row>
              <Col xs={{span:24}} md={{span:5}}>
              <div><Image src={vistara} preview={false}/></div>
               <div><span>UK-882 | </span><span>Vistara</span></div>
              </Col>
 
              <Col xs={{span:24}} md={{span:7}}>
                <div>Mumbai-BOM</div>
                <div>14:40, 20 May 2023</div>
              </Col>
 
              <Col xs={{span:24}} md={{span:3}}>
                 2 hour 30 min
              </Col>
 
              <Col xs={{span:24}} md={{span:7}}>
                <div>Delhi-DEL</div>
                <div>17:10, 20 May 2023</div>
              </Col>
              </Row>
         
              <Row className='traveller-info'>
              <Col xs={{span:24}} md={{span:6}}>
                <div>Traveller</div>
                <div><span style={{fontSize:"20px"}}><IoIosPerson /></span> <span style={{fontSize:"20px",fontWeight:"700"}}> Yash Agarwal </span> <span> Adult,Male</span> </div>
              </Col>
           
              <Col xs={{span:24}} md={{span:5}}>
                 <div>PNR</div>
                  <div>5CIX57</div>
              </Col>
 
              <Col xs={{span:24}} md={{span:5}}>
                <div>E-TICKET NUMBER</div>
                <div>228-9704504654</div>
              </Col>
 
              <Col xs={{span:24}} md={{span:4}}>
                <div>SEAT</div>
                <div>-</div>
              </Col>
              <Col xs={{span:24}} md={{span:4}}>
                <div>MEAL</div>
                <div>-</div>
              </Col>
              </Row>
 
           </Card>
         </Col>
 
          <Col style={{marginLeft:"3rem"}} xs={{span:24}} md={{span:6}}>
            <Card className='refund-request'>
             <div> <h3>Submit Refund Request</h3></div>
             <div> I directly cancelled with the airline</div>
             <div>My Flight was cancelled by the airline</div>
             <div>Flight rescheduled & did not travel</div>
            </Card>
            <Card style={{borderRadius:"0px"}} className='tickets'>
             <div> <h3>Ticket(s)</h3></div>
             <div>Download E-Ticket(s)</div>
             <div>Email E-Ticket(s)</div>
             <div>Download invoices</div>
             <div>Customer booking confirmation </div>
            </Card>
           <Card style={{marginTop:"15px"}}>
             <div><h2>Airline Contact</h2></div>
             <div><span><Image src={vistara} preview={false}/> Vistara</span></div>
              <div>9289228888</div>
           </Card>
          </Col>
         </Row>
  
         <Row className='cancellation-details'>
         <Col xs={{span:24}} md={{span:16}}>
           <Card>
             <Row>
             <Col xs={{span:24}} md={{span:24}}>
            <div> <h2 style={{fontWeight:"700"}}>CANCELLATION</h2>
            <div><Button style={{float:"right",marginBottom:"15px"}}> FULL CANCELLATON</Button></div>
             <p style={{fontWeight:"600",color:"red"}}>You can cancel full/partial journey as per airline rules.</p>
            </div>
            
            <div className='flight-dest'>
              Mumbai <span><ArrowRightOutlined /></span> Delhi 25May, VISTARA</div>
            </Col>
            </Row>
            <Row style={{marginTop:"20px"}}>
            <Col style={{padding:"8px"}} xs={{span:1}} md={{span:1}}>
            <div class="vertical-divider">
            <div class="circle top"></div>
           <div class="circle bottom"></div>
           </div>
            </Col>
            <Col xs={{span:11}} md={{span:11}}>
              <div style={{fontWeight:"600",color:"red"}}>Booking Date - 2Hr(s) to Departure</div>
              <div style={{fontWeight:"600"}}>Till Fri 25 12:40: IST 2023</div>
              <div style={{color:"lightGreen",marginTop:"32px"}}>2 Hr(s) - Departure time </div>
               <p style={{fontWeight:"600"}}>Till Fri May 25 14:40 IST 2023</p>
            </Col>
            <Col xs={{span:10}} md={{span:10}}>
              <div style={{fontWeight:"600",color:"red"}}>Cancellation Charges: ₹525/Adult</div>
              <div>we will charge an additional ₹50 per <br />
              traveller as the Bharat Fares cancellation fee</div>
              <div style={{color:"lightGreen",marginTop:"13px"}}>Non-Refundable</div>
              <div>The airline does not allow cancellation during<br />
               this time window</div>
            </Col>
            </Row>
 
            <Row style={{marginTop:"28px"}}>
            <Col xs={{span:24}} md={{span:24}}>
            
               <ul>
                <li>Airline charges a cancellation fees when you cancel in a particular time window.</li> 
               </ul>
               <ul><li>Ancillary like seat, meal and bagagge are fully refundable. </li> </ul>
               <ul> <li>Insurance, donation and convience fees are non-refundable. </li> </ul>
 
               <div style={{marginTop:"30px",fontSize:"18px"}}><span style={{transform: 'rotate(30deg)'}}><MdFlight />
               </span> If the airline cancelled your flight, or you cancelled your flight directly with  <br />
                   airline,please <span style={{color:"blue"}}>submit a request for refund.</span></div>   
            </Col>
            </Row>
           </Card>
         </Col>
 
         <Col style={{marginLeft:"3rem"}} xs={{span:24}} md={{span:6}}>
        
         </Col>
         </Row>
 
         <Row className='flightDate-change-container'>
         <Col xs={{span:24}} md={{span:16}}>
           <Card>
            
               <Row> 
             <Col xs={{span:24}} md={{span:24}}>
            <div> <h2 style={{fontWeight:"700"}}>CHANGE YOUR FLIGHT DATE</h2>
            <p style={{fontWeight:"600",color:"red"}}>Change your travel date or travel time.
            Date change charges along with price difference will be payable.Change <br/>
             of sector not allowed.</p>
            </div>
 
            <Row> 
             <Col xs={{span:24}} md={{span:21}}>
            <div className='flight-dest'>
              Mumbai <span><ArrowRightOutlined /></span> Delhi 25May, VISTARA</div>
              </Col>
 
             <Col xs={{span:24}} md={{span:3}}>
             <Button style={{float:"right"}}> CHANGE TRAVEL DATE</Button>
             </Col> 
            </Row>
 
             </Col> 
            </Row>
 
            <Row style={{marginTop:"20px"}}>
            <Col style={{padding:"8px"}} xs={{span:1}} md={{span:1}}>
            <div class="vertical-divider">
            <div class="circle top"></div>
           <div class="circle bottom"></div>
           </div>
            </Col>
            <Col xs={{span:11}} md={{span:11}}>
              <div style={{fontWeight:"600",color:"red"}}>Booking Date - 2Hr(s) to Departure</div>
              <div style={{fontWeight:"600"}}>Till Fri 25 12:40: IST 2023</div>
              <div style={{color:"lightGreen",marginTop:"32px"}}>2 Hr(s) - Departure time </div>
               <p style={{fontWeight:"600"}}>Till Fri May 25 14:40 IST 2023</p>
            </Col>
            <Col xs={{span:10}} md={{span:10}}>
              <div style={{fontWeight:"600",color:"red"}}>Date Change Charges: ₹0.00/Adult</div>
              <div>we will charge an additional ₹0.0 per <br />
              traveller as the Bharat Fares date change fee</div>
              <div style={{color:"lightGreen",marginTop:"13px"}}>Date Change not allowed</div>
              <div>The airline does not allow date change during<br />
               this time window</div>
            </Col>
            </Row>
 
            <Row style={{marginTop:"28px"}}>
            <Col xs={{span:24}} md={{span:24}}>
            
               <ul>
                <li>Date change charges displayed is only for same airline.</li> 
               </ul>
               <ul>
                <li>If a customer intends to choose a different airline than original on new dates,<br />
                 he/she will have to cancel the original ticket first and then book a fresh ticket.</li> 
               </ul>
               <ul><li>Airlines do not allow date change closer to departure usually between 0-4 hours. </li> </ul>
               <ul><li> Any seats, meals and bagagge purchased on old ticket will be no longer applicable on ammended <br/>
                 flight.The customer have to rebook ancillary services. </li> </ul> 
               
 
               <div style={{marginTop:"30px",fontSize:"18px"}}><span style={{transform: 'rotate(30deg)'}}><MdFlight />
               </span> If the airline cancelled your flight, or you cancelled your flight directly with  <br />
                   airline,please <span style={{color:"blue"}}>submit a request for refund.</span></div>   
            </Col>
            </Row>
           </Card>
         </Col>
 
         <Col style={{marginLeft:"3rem"}} xs={{span:24}} md={{span:6}}>
        
         </Col>
         </Row>
 
         <Row className='baggage-details-container'>
         <Col xs={{span:24}} md={{span:16}}>
           <Card>
            
               <Row> 
             <Col xs={{span:24}} md={{span:24}}>
            <div> <h2 style={{fontWeight:"700"}}>BAGGAGE DETAILS</h2>
            <h3 style={{fontWeight:"600",color:"green"}}>Baggage inclusion as per fare class booked .</h3>
            </div>
 
            <Row> 
             <Col xs={{span:24}} md={{span:18}}>
            <div className='flight-dest'>
              Mumbai <span><ArrowRightOutlined /></span> Delhi 25May, VISTARA</div>
              </Col>
 
             <Col xs={{span:24}} md={{span:6}}>
               <div style={{fontSize:"18px"}}><span><ExclamationCircleOutlined /> </span> 
               <span style={{color:"blue"}}>VISTARA Baggage Policy </span>
               </div>
             </Col> 
            </Row>
 
             </Col> 
            </Row>
 
            <Row style={{marginTop:"20px"}}>
            <Col xs={{span:6}} md={{span:6}}>
              <div></div>
              <div style={{fontSize:"20px",fontWeight:"700"}}>Check In baggage</div>
              <div style={{color:"green"}}>15 kg per adult</div>
            </Col>
            <Col xs={{span:6}} md={{span:6}}>
              <div></div>
              <div style={{fontSize:"20px",fontWeight:"700"}}>Carry on baggage</div>
              <div style={{color:"green"}}>7 kg per adult</div>
            </Col>
            </Row>
 
           </Card>
         </Col>
         </Row>
 
       </Col>
        </Row>
    </>
  )
}

export default UpComingFlight;