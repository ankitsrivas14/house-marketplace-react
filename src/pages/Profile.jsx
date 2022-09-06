//REACT
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

//FIREBASE
import {getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore';
import {db} from '../firebase.config'

//IMPORTS
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//ICONS
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {

    const auth = getAuth();

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    const [changeDetails, setChangeDetails] = useState(false);

    const {name, email} = formData;

    const navigate = useNavigate();

    const onLogout = () => {
        auth.signOut();
        navigate('/');
    }

    const handleChangeDetails = () => {
        if(changeDetails){
            onSubmit();
        }
        setChangeDetails((prev) => {
            return !prev;
        })
    }

    const onChange = (e) => {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.id]: e.target.value
            }
        })
    }

    const onSubmit = async () => {
        try {
            if(auth.currentUser.displayName !== name){
                await updateProfile(auth.currentUser, {
                    displayName: name
                });
                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    name
                })
            }
        } catch (error) {
            toast.error('Could not update profile details')
        }
    }


    return (
       <div className='profile'>
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button type='button' className='logOut' onClick={onLogout}>Logout</button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal Details</p>
                    <p className="changePersonalDetails" onClick={handleChangeDetails}>{changeDetails ? 'Done' : 'Change'}</p>
                </div>
                <div className="profileCard">
                    <form action="">
                        <input 
                            type="text" 
                            id="name" 
                            className={!changeDetails ? 'profileName' : 'profileNameActive'} 
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChange}
                        />
                        <input 
                            type="text" 
                            id="email" 
                            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
                            disabled={!changeDetails}
                            value={email}
                            onChange={onChange}
                        />
                    </form>
                </div>
                <Link to='/create-listing' className='createListing'>
                    <img src={homeIcon} alt="home" />
                    <p>Sell or rent your home</p>
                    <img src={arrowRight} alt="arrow right" />
                </Link>
            </main>
       </div>
    )
}

export default Profile