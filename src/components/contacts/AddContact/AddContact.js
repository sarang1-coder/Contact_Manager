import React from 'react'
import "./addcontact.css";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { IconButton } from 'material-ui-core';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const AddContact=()=>{


  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  

  const contacts=useSelector((state) => state);

  const dispatch=useDispatch();

  const navigate=useNavigate();

  
  const handleSubmit=(e)=>{
    e.preventDefault();

    // Check Email in Contact List 
    const checkEmail=contacts.find(
      (contact) => contact.email === email && email
    );
    
      // Check Number in Contact List 
    const checkNumber=contacts.find(
      (contact) => contact.number === number && parseInt(number)
    );


    // if Text is Null
    if(!email || !number || !name){
      return toast.warning('Please Enter Valid Text');
    }
    

    // If email Already exist 
    if(checkEmail){
      return toast.error('Email Already Exist');
    }

    // If number Already exist 
    if(checkNumber){
      return toast.error('Number Already Exist');
    }

    const data = {
      id:contacts[contacts.length-1].id+1,
      email,
      number,
      name
    }

    dispatch({type:'ADD_CONTACT',payload:data});
    toast.success('Student Data Added');
    navigate('/');

    }

  



//     async function logJSONData() {
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify({
//     name: name,
//     phone: mobileno,
//     email: email,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
//   }}


  return (
    <>
    <div className="main">
        <div className="heading-container">

          {/* Heading  */}
          <div className="heading">
          <IconButton>
            <ContactMailIcon/>
          </IconButton>
          Add to Contact
          </div>
        </div>

        {/* Add to Contact Form  */}
        <form className="info" onSubmit={handleSubmit} >
          <input type='text' className='Name' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
          <input type='email'className='Email'  placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type='number' className='Phno' placeholder='Phone Number' value={number} onChange={(e)=>setNumber(e.target.value)}/>
          <div>
          <input type='submit' className='Submit' placeholder='Submit'/>
          <Link to={`/contacts/list`}>
              <button className='Submit cancel'>Cancel</button>
          </Link>
          </div>
        </form>
    </div>
    </>
  )
}


export default  AddContact;