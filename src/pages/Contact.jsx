//REACT
import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"

//FIREBASE
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase.config"

//IMPORTS
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {

    //eslint-disable-next-line

    const [message, setMessage] = useState('');
    const [landlord, setLandlord] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams()

    useEffect(() => {
        const getLandlord = async () => {
            const docRef = doc(db, 'users', params.landlordId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setLandlord(docSnap.data());
            }
            else{
                toast.error('Could not get landlord data');
            }
        }

        getLandlord();

    }, [params.landlordId])


    const onChange = (e) => {
        setMessage(e.target.value);
    }


    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Contact Landlord</p>
            </header>
            {landlord !== null && (
                <main>
                    <div className="contactLandlord">
                        <p className="landlordName">Contact {landlord?.name}</p>
                    </div>
                    <form className="messageForm">
                        <div className="messageDiv">
                            <label htmlFor="message" className="messageLabel"></label>
                            <textarea name="message" id="message" className="textarea" value={message} onChange={onChange} />
                        </div>
                        <a href={`mailto:${landlord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                            <button type="button" className="primaryButton">Send message</button>
                        </a>
                    </form>
                </main>
            )}
        </div>
    )
}

export default Contact