import React from 'react';
import './viewcontact.css';
import { useState , useEffect } from "react";
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const ViewContact=()=> {


  const[seed,setSeed]=useState("");

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




  return (
    <>
      <div className="main">
        <div className="info">


          <div className="user-img">
              <Avatar src={`https://api.dicebear.com/api/avataaars/${seed}.svg`} className='contact-img' 
                style={{ height: '100px', width: '100px' }}/>
          </div>


          <div className="user-info">


                  <ul className='list-group lst'>

                  <li className='list-group-item list-group-item-action'>
                       Name: <span className='fw-bold'>Name</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                        Mobile: <span className='fw-bold'>Mobileno</span>
                  </li>
                  <li className='list-group-item list-group-item-action'>
                        Email: <span className='fw-bold'>Email</span>
                  </li>
                </ul>

          </div>
        </div>
      </div>
    </>
  )
}


export default ViewContact;