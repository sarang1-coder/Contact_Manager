import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { IconButton } from '@mui/material';


export default function NavBar() {
  return (
    <>
    <nav className='nav'>
        <div className="container">
            <Link to={'/'} className='nav-brand-name'>
                 <IconButton><ContactPhoneIcon/></IconButton>
                      Contact 
                      <span className='text-fname name'>Manager</span>
            </Link>
        </div>
    </nav>
    
    </>

  )
}
