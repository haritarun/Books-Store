import React,{useState,useEffect} from 'react'
import { MdOutlineMyLocation } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import axios from 'axios';
import {Link} from 'react-router-dom'
const DOMAIN = import.meta.env.VITE_SOCKET_DOMAIN


const Location = () => {
    const [area,setArea]=useState('')
    const [city,setCity]=useState('')
    const [state,setState]=useState('')
    const [pincode,setPincode]=useState('')

    useEffect(() => {
        console.log(area, city, state, pincode); 
    },);
    
    
        
    

    const getAddress = async (lat, lon) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
                params: { lat, lon, format: "json" },
            });
    
            if (response?.data) {
                const output = response.data.display_name.split(",").map(item => item.trim()); 
                console.log(output);
    
                
                const area = output[1] || "";
                const city = output[2] || "";
                const state = output[3] || "";
                const pincode = output[4] || "";
    
                setArea(area);
                setCity(city);
                setState(state);
                setPincode(pincode);
    
                
                const email = localStorage.getItem("email");
                const locationResponse = await axios.post(`${DOMAIN}/currentLocation`, {
                    email,
                    area,
                    city,
                    state,
                    pincode,
                });
    
                if (locationResponse.status === 200) {
                    console.log("successfully added")
                }
            }
        } catch (e) {
            console.log("Something went wrong", e);
        }
    };
    
    const getCurrentLocation =()=>{
    
        if(navigator.geolocation){
          navigator.geolocation.watchPosition(
            (position)=>{
              const newLocation = {
                lat:position.coords.latitude,
                lon:position.coords.longitude
              }
              
              getAddress(newLocation.lat,newLocation.lon)
            }
          )
          
        }
      }

    
    
  return (
    <div className='flex flex-col pt-2 pl-3 pr-3 pb-2 bg-green-100'  >
        <div className='flex items-center' onClick={getCurrentLocation}>
            <MdOutlineMyLocation size={30} color='green'/>
            <h1 className='ml-1 text-md text-green-800 hover:text-green-950'>Add Current Location</h1>
        </div>
        <p className='text-center text-[15px]'>Or</p>
        <Link to="/map" className='flex justify-center items-center' >
            <FaMapMarkedAlt size={20} color='green' />
            <h1 className='ml-1 text-md text-green-800 hover:text-green-950' >View Map</h1>
        </Link>
    </div>
  )
}

export default Location