import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Styles from '../styles/addContact.module.css'

const AddContact = (props) =>{

    //state 
    const [name, setName]= useState();
    const [email, setEmail]= useState();
    const [phone, setPhone]= useState();

    //getting contacts from state
    const contacts = useSelector(state=> state)
    const dispatch = useDispatch();


    //handleing add contact submit
    const handleSubmit= (e)=>{
        e.preventDefault();

        //to check if the email or number already exists in the contacts list
        const checkEmail = contacts.find(contact => contact.email === email && email)
        const checkNumber = contacts.find(contact => contact.number === parseInt(phone) && phone)

        if(!name || !phone || !email){
            return toast.warning("Please fill in all fields!");
        }
        if (checkEmail) {
            return toast.error("This email already Exists!");
        }

        if (checkNumber) {
            return toast.error("This number already Exists!");
        }

        const data={
            id: contacts[contacts.length - 1].id + 1,
            name,
            email,
            phone
        }

        //dispatch data 
        dispatch({type: 'ADD_CONTACT', data});
         toast.success("Contact added successfully")
        console.log('data', data);
        props.handleClick();
    }
    return(
    <div className={Styles.container}>
        <div className={Styles.box}>
            <h1>Add Contact</h1>
        <form onSubmit={handleSubmit}>
            <div className={Styles.inputs}>
                <input 
                type="text" 
                placeholder="Name" 
                onChange={(e)=> setName(e.target.value)} 
                />
                <input 
                type="email" 
                placeholder="Email" 
                onChange={(e)=> setEmail(e.target.value)} 
                />
                <input 
                type="number" 
                placeholder="Phone Number"
                onChange={(e)=> setPhone(e.target.value)}  
                />
            </div>
            <div className={Styles.btn}>
                <input 
                type="submit"
                className={Styles.submitBtn} 
                value={'Submit'}  
                />
                <button 
                className={Styles.submitBtn}
                onClick={props.handleClick}
                >
                Cancel
                </button> 
            </div>
        </form>
        </div>
        </div>
    )
}

export default AddContact;