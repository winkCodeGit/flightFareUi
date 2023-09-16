import { BASE_URL } from "../constants/apiBaseUrl";
import { AjaxService } from "../utils/AjaxServices";


export const getAirportName = ()=>{
    return AjaxService.get(
        BASE_URL+"/airportName",
        {},
        {}
    ).then(
        (res)=>res.data,
        (err)=>{
            if(err.response){
                throw err.response.data;
            }else{
                throw 'Service Failed'
            }
        }
    )
}

export const getFareRules = (fareKey)=>{
    return AjaxService.get(
        BASE_URL+"/fare_rules?fare_key="+fareKey,
        {},
        {}
    ).then(
        (res)=>res.data,
        (err)=>{
            if(err.response){
                throw err.response.data;
            }else{
                throw 'Service Failed'
            }
        }
    )
}

export const getMeals_Baggage = (fareRuleKey)=>{
    return AjaxService.post(
        BASE_URL+"/additional_info?fare_rule_key="+fareRuleKey,
        {},
        {}
    ).then(
        (res)=>res.data,
        (err)=>{
            if(err.response){
                throw err.response.data;
            }else{
                throw 'Service Failed'
            }
        }
    )
}

export const getSerachData = (params)=>{
    var url = "";
    if(params.tripType=="oneWay"){
        url = `/search_flights?airport_from=${params.airport_from}&airport_to=${params.airport_to}&departureDate=${params.departureDate}&adult=${params.adult}&child=${params.child}&infant=${params.infant}&tripType=${params.tripType}`
    }else{
        url = `/search_flights?airport_from=${params.airport_from}&airport_to=${params.airport_to}&departureDate=${params.departureDate}&returnDate=${params?.returnDate}&adult=${params.adult}&child=${params.child}&infant=${params.infant}&tripType=${params.tripType}`
    }
    return AjaxService.post(
        BASE_URL+url,
        {},
        {}
    ).then(
        (res)=>res.data,
        (err)=>{
            if(err.response){
                throw err.response.data;
            }else{
                throw 'Service Failed'
            }
        }
    )
}