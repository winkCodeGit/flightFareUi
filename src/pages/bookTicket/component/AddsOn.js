import React, {useState, useEffect,  } from 'react'
import {Modal,Form,Row,Col, Select,DatePicker,Input,TimePicker,Button,Popover,Card,Table,Tabs,TabPane} from "antd";
import { CloseOutlined,MinusOutlined,PlusOutlined,RightOutlined } from '@ant-design/icons';
import './BookingConfirm.scss'
import { BsSquareFill } from 'react-icons/bs';
import { MdOutlineLuggage } from 'react-icons/md';
import { GiForkKnifeSpoon  } from 'react-icons/gi';
const {Option} = Select;

const AddsOn = (props) => {

const [clickedCol, setClickedCol] = useState(null);
const [clickedColLuggage, setClickedColLuggage] = useState(null);
const [open, setOpen] = useState(false);
// const [isModalOpen, setIsModalOpen] = useState(false);
const [isMealsModal, setIsMealsModal] = useState(false);
const [isLugageModal, setIsLugageModal] = useState(false);


// const hide = () => {
//     setOpen(false);
//   };

//   const handleOpenChange = (newOpen) => {
//     setOpen(newOpen);
//   };

  const handleColClick = (index) => {
    if (clickedCol === index) {
      // Col is already clicked, reset clickedCol to null
      setClickedCol(null);
    } else {
      // Col is not clicked yet, set clickedCol to the clicked index
      setClickedCol(index);
    }
  };

  const handleColClickLuggage = (index) => {
    if (clickedColLuggage === index) {
      // Col is already clicked, reset clickedCol to null
      setClickedColLuggage(null);
    } else {
      // Col is not clicked yet, set clickedCol to the clicked index
      setClickedColLuggage(index);
    }
  };


  const showMealModal = () => {
    setIsMealsModal(true);
  };
  
  const showLugageModal = () => {
    setIsLugageModal(true);
  };
  const handleMealOk = () => {
    setIsMealsModal(false);
  };
 
  const handleCancel = ()=>{
    setIsMealsModal(false);
    setIsLugageModal(false);
  }
    const seatDetails = ()=>{
        return(
          <>
          <Row>
            <Col span={24}>
              <div style={{fontSize:"22px",fontWeight:"700"}}> Choose add-ons</div>
              <div style={{fontSize:"18px",fontWeight:"600"}}>Need more legroom? Choose the seat you want</div>
              <p>Seats are cheaper when pre booked</p>
              <div style={{fontSize:"17px",fontWeight:"600"}}>Onward CCU -- DEL</div>
               
               <Card>
                 <div style={{display:"flex",gap:"20px"}}>
                  <div style={{fontSize:"18px"}}><BsSquareFill style={{color:"#D9F1E8"}}/> <span>Free</span> </div>
                  <div style={{fontSize:"18px"}}><BsSquareFill style={{color:"#DEE7F7"}} /> <span>₹200</span> </div>
                  <div style={{fontSize:"18px"}}><BsSquareFill style={{color:"#9DB6E6"}}/> <span>₹250</span> </div>
                  <div style={{fontSize:"18px"}}><BsSquareFill style={{color:"#5C85D6"}}/> <span>₹300</span> </div>
                  <div style={{fontSize:"18px"}}><BsSquareFill style={{color:"#985289"}}/> <span>₹350</span> </div>
                  <div style={{fontSize:"18px"}}><BsSquareFill style={{color:"#471D36"}}/> <span>₹400-₹1400</span> </div>
                 </div>
               </Card>
  
               <Card style={{borderTop:"1px solid #cfcfcf"}}>
               <div style={{display:"flex",gap:"20px",marginLeft:"2rem"}}>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#D9F1E8"}}/>  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#DEE7F7"}} />  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#9DB6E6"}}/>  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#5C85D6"}}/>  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#985289"}}/>  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#9DB6E6"}}/>  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#5C85D6"}}/>  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#985289"}}/>  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#9DB6E6"}}/>  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#5C85D6"}}/>  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#985289"}}/>  </div>
                  </div>
  
                  <div style={{display:"flex",gap:"20px",marginLeft:"2rem"}}>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#9DB6E6"}}/>  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#5C85D6"}}/>  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#985289"}}/>  </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#471D36"}}/> </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#471D36"}}/> </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#471D36"}}/> </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#471D36"}}/> </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#471D36"}}/> </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#471D36"}}/> </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#471D36"}}/> </div>
                  <div style={{fontSize:"25px"}}><BsSquareFill style={{color:"#471D36"}}/> </div>
                 </div>
               </Card>
            </Col>
          </Row>
          </>
        )
    }

    const mealsDetail = ()=>{
        return(
           <>
            <Row style={{marginTop:"3rem"}}>
                <Col span={24}>
                    <div style={{fontSize:"20px",fontWeight:"700"}}><GiForkKnifeSpoon /> Add a delicious meal for your flight</div>
                    <p>Meals are usually cheaper when pre-bopoked</p>
                    <div style={{fontSize:"17px",fontWeight:"600"}}>Onward CCU - DEL</div>
                </Col>
            </Row>
           <Card>
            <Row className='filter-container'>
            <Col className='border-active' style={{border:`1px solid ${clickedCol === 0 ? "blue" : "grey"}`
             ,background:`${clickedCol===0 ?"#d6e8fc":""}`,cursor:"pointer",borderRadius:"5px",height:"70px"}}
             span={2} onClick={() => handleColClick(0)}>
            <div style={{fontSize:"16px",fontWeight:"600",paddingLeft:"10px"}}>No Meal ₹0</div>
             
         </Col>
      
       {props.data.meal.map((item,indx)=>{
           return(
            <>
            {indx<=2 && <Col style={{border:`1px solid ${clickedCol === indx+1 ? "blue" : "grey"}`
            ,background:`${clickedCol===indx+1 ?"#d6e8fc":""}`,cursor:"pointer",borderRadius:"5px",height:"70px"}} span={5}
            onClick={() => handleColClick(indx+1)}>
              <Popover content ={item.desc} >
              <div style={{fontSize:"16px",fontWeight:"600",paddingLeft:"10px"}}>{(item.desc).substring(0, 18)+'...'}</div>
              </Popover>
              <div style={{fontSize:"16px",fontWeight:"600",paddingLeft:"10px"}}>₹{item.amount}</div>
                 </Col>}
                 </>
           )
       }) }

            <Col style={{border:"1px solid grey",borderRadius:"5px",height:"70px",cursor:"pointer"}} span={2}
              onClick={showMealModal} >
              +{props.data.meal.length-3} options
              </Col>
             </Row> 
     
           </Card>
      
           </>
        )
    }
   
    const extraLuggage = ()=>{
        return(
            <>
             <Row style={{marginTop:"3rem"}}>
                <Col span={24}>
                    <div style={{fontSize:"20px",fontWeight:"700"}}><MdOutlineLuggage /> Add extra luggage</div>
                    <p>Baggage is 20% cheaper when pre-bopoked</p>
                    <div style={{fontSize:"17px",fontWeight:"600"}}>Onward CCU - DEL</div>
                </Col>
            </Row>
          <Card>
          <Row className='filter-container'>
          <Col className='border-active' style={{border:`1px solid ${clickedColLuggage === 0 ? "blue" : "grey"}`
           ,background:`${clickedColLuggage===0 ?"#d6e8fc":""}`,cursor:"pointer",borderRadius:"5px",height:"70px"}}
           span={2} onClick={() => handleColClickLuggage(0)}>
          <div style={{fontSize:"16px",fontWeight:"600",paddingLeft:"10px"}}>Default ₹0</div>
           
       </Col>
    
    {props.data.baggage.map((item,ind)=>{
           return(
            <>
            {ind<=2 && <Col style={{border:`1px solid ${clickedCol === ind+1 ? "blue" : "grey"}`
            ,background:`${clickedCol===ind+1 ?"#d6e8fc":""}`,cursor:"pointer",borderRadius:"5px",height:"70px"}} span={5}
            onClick={() => handleColClick(ind+1)}>
              <div style={{fontSize:"15px",fontWeight:"600",paddingLeft:"10px"}}>{item.desc}</div>
              <div style={{fontSize:"16px",fontWeight:"600",paddingLeft:"10px"}}>₹{item.amount}</div>
                 </Col>}
                 </>
           )
       }) }

          
          <Col style={{border:"1px solid grey",borderRadius:"5px",height:"70px",cursor:"pointer"}} span={2}
            onClick={showLugageModal} >
            +{props.data.baggage.length-3} options
            </Col>

           </Row> 
   
         </Card>
            </>
        )
    }

    const mealsModal = ()=>{
      return(
        <>
        <Card>
           <Row>
            <Col span={6}>
              <div><span style={{marginLeft:"10px"}}> Onward</span></div>
              <div style={{background:"#E2DFE8",borderRadius:"4px",width:"90%"}}> <span style={{marginLeft:"10px"}}>CCU -- DEL</span></div>
            </Col>
            
            <Col span={18}>
               
              <Row style={{marginBottom:"20px"}}>
                <Col className='meals-filter' span={4}>
                  <div style={{fontSize:"18px",fontWeight:"600",marginLeft:"10px"}}>All</div>
                </Col>
                <Col className='meals-filter' style={{marginLeft:"15px"}} span={4}>
                  <div style={{fontSize:"18px",fontWeight:"600",marginLeft:"10px"}}>Veg</div>
                </Col>
                <Col className='meals-filter' style={{marginLeft:"15px"}} span={5}>
                  <div style={{fontSize:"18px",fontWeight:"600",marginLeft:"10px"}}>Non-veg</div>
                </Col>
              </Row>


              <Row style={{overflowY:"scroll",maxHeight:"250px"}}>
                <Col span={24}>
                {props.data.meal.map((item,indx)=>{
           return(
                <>
            {<Row style={{marginBottom:"10px"}}>
            <Col span={12}>
            <div style={{fontSize:"16px",fontWeight:"600"}}>{item.desc}</div>
            </Col>
            
            <Col span={6}>
            <div style={{marginLeft:"10px",marginTop:"10px"}}> ₹{item.amount}</div>
            </Col>

            <Col span={6}>
              <div>
            <Button shape="circle" icon={<MinusOutlined />} />
            <span style={{ margin: '0 8px' }}>1</span>
            <Button  shape="circle" icon={<PlusOutlined />} />
            </div>
            </Col>
          </Row>}
                </>
           )
         })
            }
                </Col>
              </Row>
       
            </Col>
           </Row>
           
        </Card>
         <Row>
          <Col span={16}>
             <div style={{color:"blue",marginTop:"20px"}}>Remove all meals</div>
          </Col>
         <Col span={8} style={{display:"flex",gap:"2.4rem",marginTop:"20px"}}>
           <div style={{fontSize:"24px",fontWeight:"700"}}>₹ </div>
           <div><Button style={{width:"93px"}} type='primary' htmlType='submit'>Done</Button> </div>
         </Col>
        </Row>
        </>
      )
    }
   const mealsTitle = ()=>{
     return(
     <>
      <div style={{fontSize:"24px",fontWeight:"700",paddingLeft:"10px"}}>Add in-flight meals to your journey</div>
      <div style={{fontSize:"17px",fontWeight:"600",paddingLeft:"10px",color:"grey"}}>
        Meals are ususally cheaper when pre-booked</div>
      </>
     )
   }

   const luggageModal = ()=>{
    return(
      <>
      <Card>
         <Row>
          <Col span={6}>
            <div > <span style={{marginLeft:"10px"}}>Onward</span></div>
            <div style={{background:"#E2DFE8",borderRadius:"4px",width:"90%"}}> <span style={{marginLeft:"10px"}}>CCU -- DEL</span> </div>
          </Col>
          
          <Col span={18}>
            
        
          <Row style={{overflowY:"scroll",maxHeight:"250px"}}>
             <Col span={24}>

            { props.data.baggage.map((elem,i)=>{
           return(
                <>
            {<Row style={{marginBottom:"20px"}} key={i}>
            <Col span={12}>
            <div style={{fontSize:"16px",fontWeight:"600"}}>{elem.desc}</div>
            </Col>
            
            <Col span={6}>
            <div style={{marginLeft:"10px",marginTop:"10px"}}> ₹{elem.amount}</div>
            </Col>

            <Col span={6}>
              <div>
            <Button shape="circle" icon={<MinusOutlined />} />
            <span style={{ margin: '0 8px' }}>1</span>
            <Button  shape="circle" icon={<PlusOutlined />} />
            </div>
            </Col>
          </Row>}
                </>
           )
         })
            }
         </Col>
          </Row>
    
          </Col>

         </Row>
         
      </Card>
       <Row>
        <Col span={16}>
           <div style={{color:"blue",marginTop:"20px"}}>Remove all baggage</div>
        </Col>
       <Col span={8} style={{display:"flex",gap:"2.4rem",marginTop:"20px"}}>
         <div style={{fontSize:"24px",fontWeight:"700"}}>₹ </div>
         <div><Button style={{width:"93px"}} type='primary' htmlType='submit'>Done</Button> </div>
       </Col>
      </Row>
      </>
    )
  }
 const luggageTitle = ()=>{
   return(
   <>
    <div style={{fontSize:"24px",fontWeight:"700",paddingLeft:"10px"}}>Add in-flight baggage to your journey</div>
    <div style={{fontSize:"17px",fontWeight:"600",paddingLeft:"10px",color:"grey"}}>
      Baggage are ususally cheaper when pre-booked</div>
    </>
   )
 }

  return (
    <>
    {seatDetails()}
    {mealsDetail()}
    <Modal style={{zIndex:2,marginTop:"-50px"}} className="meals-modal" title={mealsTitle()}
     width={800}  visible={isMealsModal} footer={null} onCancel={handleCancel}>
        {mealsModal()}
    </Modal>
    {extraLuggage()}
    <Modal style={{zIndex:2,marginTop:"-50px"}} className="luggage-modal" title={luggageTitle()}
     width={800}  visible={isLugageModal} footer={null} onCancel={handleCancel}>
        {luggageModal()}
    </Modal>
    </>
  )
}

export default AddsOn