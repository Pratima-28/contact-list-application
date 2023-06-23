import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Styles from '../styles/home.module.css'
import AddContact from './AddContact';

const Home =()=>{

    const [isOpen, setIsOpen] = useState(false);
    
    // getting state 
    const contactList = useSelector(state=> state)

    //dispatch
    const dispatch = useDispatch();

    //to delete contact
    const deleteContact = (id) =>{
        dispatch({type:'DELETE_CONTACT', id});
        toast.success('Contact deleted successfully');
    }

    //to handle add contact Popup
    const togglePopup = () =>{
        setIsOpen(true);
    }

    const handleClick = () =>{
        setIsOpen(false);
    }
   
    return(
        //JSX
        <div className={Styles.list}>
            <div className={Styles.container}>
                    {isOpen &&
                    <AddContact 
                    handleClick={handleClick}
                    setIsOpen={setIsOpen}
                    />
                    }
                <button className={Styles.addConBtn} onClick={togglePopup}>
                    <i class="fa fa-user-plus" aria-hidden="true"></i>
                </button>
            
                <div>    
                {contactList.map((contacts, id)=>(
                    <ul key={id} className={Styles.contactList}>
                        
                        <div className={Styles.idNo}> <li>{id+1}</li></div>
                        <div className={Styles.liInner}>
                            <li className={Styles.name}>{contacts.name}</li>
                            <li>{contacts.phone}</li>
                            <li>{contacts.email}</li>
                        </div>

                        <li>          
                            <Link to={`/updateContact/${contacts.id}`} > 
                                <button><i className="fa fa-pencil" aria-hidden="true"></i></button>  
                            </Link>

                            <button  onClick={()=>deleteContact(contacts.id)} >
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                        </li>
                        
                    </ul>
                    ))}
                        
                </div>
            </div>
        </div>

    )

            }


export default Home;