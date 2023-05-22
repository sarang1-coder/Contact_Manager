import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import ContactList from './components/contacts/ContactList/ContactList';
import ViewContact from './components/contacts/ViewContact/ViewContact';
import EditContact from './components/contacts/EditContact/EditContact';
import AddContact from './components/contacts/AddContact/AddContact';
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import { useDispatch  } from "react-redux";

const App =() => {

    const dispatch=useDispatch();

    useEffect(() => {
      const data=[];
      const promise=async () => {
        await fetch('https://jsonplaceholder.typicode.com/users/')
        .then((response)=>response.json())
        .then((json)=>{
          json.map((contact) => {
            data.push({
              id:contact.id,
              name:contact.name,
              email:contact.email,
              number:contact.phone,
            });
          })
        });
        dispatch({type:'FETCH_DATA',payload:data});
      };
      promise();

    }, [])
    

  return (
    <>  
    <ToastContainer/>
    <NavBar/>
    <Routes> 
      <Route exact path={'/'} element={<Navigate to ={'/contacts/list'}/>}/>
      <Route path={'/contacts/list'} element={<ContactList/>}/>
      <Route path={'/contacts/add'} element={<AddContact/>}/>
      <Route path={'/contacts/view/:id'} element={<ViewContact/>}/>
      <Route path={'/contacts/edit/:id'} element={<EditContact/>}/>
    </Routes>
    
    </>
  );
}

export default App;
