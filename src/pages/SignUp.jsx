import React, { useState } from "react";

import { Container, Form, Button } from "react-bootstrap";
import "../styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../config/global";
import axios from 'axios';

export default function SignUp() {
const[formdata, setformdata] = useState({
    name:"",
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
      const response = await axios.post(`${API_URL}/account/signup`,formdata);
      console.log(response)
      if(response.data === true){
        alert("Account created for you....Now you can Login")
        navigate("/Login")
      }else if(response.data === false){
        alert("You are already having account");
      }

    }catch(err){
      console.log("Error during registeration",err);
    }
}

  return (
    <Container>
      <h1>SignUp Form</h1>
      <Form onSubmit={handleSubmit} >
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formdata.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formdata.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formdata.password} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit"> Register </Button>
        <p>Already have an account? <Link to='/login'>Login</Link> </p>
      </Form>
    </Container>
  );
}
