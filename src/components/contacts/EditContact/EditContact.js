import React, { useState } from 'react'
import '../AddContact/addcontact.css'
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { IconButton } from 'material-ui-core';
import { Link } from 'react-router-dom'
import { useParams ,useNavigate} from "react-router-dom";
import { useSelector,useDispatch} from 'react-redux';
import './editContact.css';
import { useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function EditContact() {


  // Get id from URL 
  const{id}= useParams();

  const dispatch=useDispatch();

  const navigate=useNavigate();

  // get contacts 
  const contacts=useSelector(state=>state);
  
  // Find Contact 
  const currentContact=contacts.find(contact=>contact.id===parseInt(id))


      const [name, setName] = useState('');
      const [number, setNumber] = useState('');
      const [email, setEmail] = useState('');


  useEffect(() => {
    if(currentContact){
        setName(currentContact.name);
         setNumber(currentContact.number);
          setEmail(currentContact.email);
    }
  }, [currentContact]);
  


  const handleSubmit=(e)=>{
    e.preventDefault();

    // Check Email in Contact List 
    const checkEmail=contacts.find(
      (contact) => contact.id!==parseInt(id) && contact.email === email && email
    );
    
      // Check Number in Contact List 
    const checkNumber=contacts.find(
      (contact) => contact.id!==parseInt(id) && contact.number === number && parseInt(number) 
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
      id:parseInt(id),
      email,
      number,
      name
    }
    
    dispatch({type:'UPDATE_CONTACT',payload:data});
    toast.success('Student Data Updated');
    navigate('/');

    }



  return (
        
    <div className="main">

        {
          currentContact ?
            (          
            <>
          <div className="heading-container">
          <div className="heading">
          <IconButton>
            <ContactMailIcon/>
          </IconButton>
          Edit Contact 
          </div>
        </div>
        <form className="info"  onSubmit={handleSubmit}>
          <input type='text' className='Name' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
          <input type='email'className='Email'  placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type='number' className='Phno' placeholder='Phone Number' value={number} onChange={(e)=>setNumber(e.target.value)}/>
          <div>
          <input type='submit' className='Submit' value='update' placeholder='Update'/>
          <Link to={`/contacts/list`}>
              <button className='Submit cancel'>Cancel</button>
          </Link>
          </div>
        </form>
          </>
          ) : (
            <div className='heading notExist'>
                Contact Number Does Not Exist 
            </div>  
          )
        }
    </div>
    
  )
}
