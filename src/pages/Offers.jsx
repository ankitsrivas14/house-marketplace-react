//REACT
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

//FIREBASE
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore"
import { db } from '../firebase.config'

//COMPONENTS
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

//IMPORTS
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Offers() {

    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                //Get reference
                const listingsRef = collection(db, 'listings')
                const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(10));

                //Execute Query
                const querySnap = await getDocs(q);
                const listings = [];
                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setListings(listings);
                setLoading(false);
            } catch (error) {
                toast.error('Could not fetch listings')
            }
        }
        fetchListings();
    }, [])


    return (
        <div className="category">
            <header>
                <p className="pageHeader">Offer</p>
            </header>
            {loading ? <Spinner /> : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className="categoryListings">
                            {listings.map(listing =>(
                                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
                            ))}
                        </ul>
                    </main>
                </>
            ) : (
                <p>No listings on offers</p>
            )}
        </div>
    )
}

export default Offers