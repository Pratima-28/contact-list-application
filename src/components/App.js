import React from "react";
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import Navbar from "./Navbar";
import Home from "./Home";
import UpdateContacts from "./UpdateContacts";
import '../styles/index.css'


const App = () =>{

  //fetching contacts
  const dispatch = useDispatch();
  useEffect(()=>{
    const data=[];
    const promise = async ()=>{
      await fetch('https://jsonplaceholder.typicode.com/users')
      .then((res)=>res.json())
      .then((json)=>{
        json.map((contact)=>{
          return data.push({
            id: contact.id,
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            address: contact.address
          });
        })
      })
      dispatch({type:'FETCH_CONTACTS', data});
      console.log('data', data)
    }
    promise();
  }, [])

  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
      <div className="container">
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>     
          
          <Route exact path="/updateContact/:id" element={<UpdateContacts />}></Route>   
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
