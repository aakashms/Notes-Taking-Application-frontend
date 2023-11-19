import {React,useEffect,useState} from 'react'
import { Link, useNavigate } from "react-router-dom";

import axios from 'axios'
import API_URL from '../../config/global'


function Home() {
  const[res,setRes]= useState({})
  const navigate = useNavigate();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user && user.token){
    getData(user.token);
    }
  },[]);

  const getData = async(token)=>{
    try{
      const config = {
        headers:{
          Authorization : token,
        }
      }
      const response = await axios.get(`${API_URL}/home`, config);
      console.log(response);

      if(response.data ==="Invalid Token"){
        alert("Login again")
      } else if(response.data === "Server Busy"){
        alert("Unauthorized access");
      }else if(response?.status){
          setRes(response.data);
      }
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <div>
        Hello {res.name}
      </div>
      <div>Welcome to Notes-Taking Application</div>
      <div>Click the Button to continue</div>

      <Link to="/notes"> 
        <button>Start from here</button>
      </Link>
      
    </>
    
  )
}

export default Home