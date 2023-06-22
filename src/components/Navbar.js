import { useSelector } from 'react-redux';
import Styles from '../styles/navbar.module.css'

const Navbar = ()=>{

    const contactList = useSelector(state=> state)

    return(
        <div className={Styles.nav}>
            <div className={Styles.navLeft}>
                <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                <div className={Styles.contact}>Contacts ( {contactList.length} )</div>
            </div>
            {/* <div className={Styles.navRight}>
                <input className={Styles.searchbar} type="search"  placeholder="Search" />
                <button className={Styles.searchbtn}>
                    <i className="fa fa-search fa-2x" aria-hidden="true"></i>
                </button>       
            </div> */}
        </div>
    )
}

export default Navbar;