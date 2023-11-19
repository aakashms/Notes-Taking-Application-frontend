import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../config/global";
import axios from 'axios';

export default function Login() {
const[formdata, setformdata] = useState({
    email:"",
    password:""
})

const navigate = useNavigate();

const handleChange = (e)=>{
  const {name,value} = e.target;
  setformdata({...formdata,[name]:value});
}

const handleSubmit = async (e)=>{
  e.preventDefault();
  try{
    const response = await axios.post(`${API_URL}/account/login`,formdata);
    console.log(response);
    if(response.data === "Invalid username or password"){
      alert("Invalid username or password");
    }else if(response.data ==="server busy"){
      alert("Server busy")
    }else if(response?.status){
      localStorage.setItem("userInfo",JSON.stringify(response.data));
      navigate("/home");
    }
    
  
  }catch(err){
    console.log("Error during registeration",err);
  }
}

  return (
    <Container>
      <h1>Login Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formdata.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formdata.password} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit"> Login </Button>
      </Form>
    </Container>
  );
}
