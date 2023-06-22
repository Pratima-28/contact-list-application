import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Styles from '../styles/updateContact.module.css'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateContacts = (props) =>{

    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [phone, setPhone]= useState('');

    const {id} = useParams();

    const contacts = useSelector(state=> state)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentContact = contacts.find(contact => contact.id === parseInt(id));

    useEffect(()=>{
        if(currentContact){
            console.log('currentContact', currentContact)
            setName(currentContact.name);
            setEmail(currentContact.email);
            setPhone(currentContact.phone);
        }
    }, [currentContact])

    const handleSubmit= (e)=>{
        e.preventDefault();

        const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email);
        const checkNumber = contacts.find(contact => contact.id !== parseInt(id) && contact.phone === parseInt(phone));

        if (!email || !phone || !name) {
            return toast.warning("Please fill in all fields!");
        }

        if (checkEmail) {
            return toast.error("This email already Exists!");
        }

        if (checkNumber) {
            return toast.error("This number already Exists!");
        }

        const data={
            id: parseInt(id),
            name,
            email,
            phone
        }

        dispatch({type: 'EDIT_CONTACT',data});
        toast.success('Contact updated successfully')
        console.log('data', data);
        navigate('/');
    }

    const hanvleNavigate = ()=>{
        navigate('/');
    }

    return(
        <div className={Styles.container}>
        {
        currentContact? (
        <div className={Styles.box}>
            <h1>Edit Contact</h1>
        <form onSubmit={handleSubmit}>
            <div className={Styles.inputs}>
                <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={(e)=> setName(e.target.value)} 
                />
                <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e)=> setEmail(e.target.value)} 
                />
                <input 
                type="number" 
                placeholder="Phone Number"
                value={phone}
                onChange={(e)=> setPhone(e.target.value)}  
                />
            </div>
            <div className={Styles.btn}>
                <input 
                type="submit"
                className={Styles.submitBtn} 
                value={'Update'}  
                />
                <button 
                className={Styles.submitBtn}
                onClick={()=> hanvleNavigate()}
                >
                Back
                </button> 
            </div>
        </form>
        </div>
        ):(
            <h1 className='display-3 my-5 text-center fw-bold'>Contact with id {id} does not exists!!</h1>
        )
        }
        </div>
    )
}

export default UpdateContacts;