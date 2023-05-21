import { Avatar } from '@material-ui/core';
import React from 'react'
import {Link } from "react-router-dom";
import { useState , useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from 'material-ui-core';
import './contactlist.css';
import { useSelector ,useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




export default function ContactList() {


    const contacts=useSelector((state)=>state);

    const[seed,setSeed]=useState("");


    // Random Icon 
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    },[])

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const delay = imageUrl ? 2000 : 0;

    new Promise(resolve => setTimeout(resolve, delay)).then(() => {
      fetch("https://dog.ceo/api/breeds/image/random")
        .then(res => res.json())
        .then(data => setImageUrl(data.message))
        .catch(err => console.log("Problemino!", err))
    });
  }, [imageUrl]);
  


  const dispatch=useDispatch();


  // Delete contact Function 
  const deleteContact = (id) => {
    dispatch({type:'DELETE_CONTACT',payload:id});
    toast.success('Contact Deleted Successfully');
  }


  return (
    <>
      <section className='contact-search p-2'>
          <div className="container">
            <div className="grid">


              {/* Add Btn  */}
              <div className="row">
                <div className='col'>
                  <p className='h3'>Contact Manager
                      <Link to={'/contacts/add'} className='btn btn-primary ms-2'>
                        <i className='fa fa-plus-circle me-2'/>New</Link>
                  </p>
                </div>
              </div>


              {/* SearchBar */}
                <div className="row p-1">
                  <div className="col-md-6">
                    <form className='row'>
                      <div className="col">
                          <div className="mb-2">
                              <input type='text' className='form-control' placeholder='Search-Names'/>
                          </div>
                      </div>
                      <div className="col">
                            <div className="mb-2">
                                <input type='submit' className='btn btn-outline-dark' value='Search'/>
                            </div>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
          </div>
      </section>


      <section className='contact-list'>
          <div className="container">
              <div className="row">

                    {
                      contacts.map((contact,id)=>(

                    <div className="col-md-6" key={contact.id}>
                      <div className="card my-2">
                        <div className="card-body">
                          <div className="row">

                            
                          <div className="col-md-3">
                              <Avatar key={contact.id}
                              src={`https://api.dicebear.com/api/avataaars/${seed}.svg`} className='contact-img' 
                              style={{ height: '100px', width: '100px' }}/>
                        </div>
                        <div className="col-md-7 pt-4">
                            

                        <ul className='list-group'>
                             <li className='list-group-item list-group-item-action'>
                                Name: <span className='fw-bold'>{contact.name}</span>
                              </li>
                              <li className='list-group-item list-group-item-action'>
                                Mobile: <span className='fw-bold'>{contact.number}</span>
                              </li>
                              <li className='list-group-item list-group-item-action'>
                                Email: <span className='fw-bold'>{contact.email}</span>
                              </li>
                        </ul>                            
                        </div>


                        <div className="col-md-1 align-items-center">
                              <Link to={`/contacts/view/${contact.id}`}>
                                <IconButton><VisibilityIcon/></IconButton>
                              </Link>
                              <Link to={`/contacts/edit/${contact.id}`}>
                                <IconButton><EditIcon/></IconButton>
                              </Link>
                                <IconButton className='del-contact' onClick={()=>deleteContact(contact.id)}>
                                  <DeleteIcon/>
                                </IconButton>
                        </div>


                          </div>
                        </div>
                      </div>

                    </div>
                   ))
                }
         
              </div>
          </div>
      </section>

    </>
  )
}
