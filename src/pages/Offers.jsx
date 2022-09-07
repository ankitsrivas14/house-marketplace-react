//REACT
import { useEffect, useState } from "react"

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
    const [lastFetchedListing, setLastFetchedListing] = useState(null);


    useEffect(() => {
        const fetchListings = async () => {
            try {
                //Get reference
                const listingsRef = collection(db, 'listings')
                const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(10));

                //Execute Query
                const querySnap = await getDocs(q);
                const lastVisible = querySnap.docs[querySnap.docs.length-1]
                setLastFetchedListing(lastVisible);
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

    //Pagination / Load More
    const onFetchMoreListings = async () => {
        try {
            //Get reference
            const listingsRef = collection(db, 'listings')
            const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), startAfter(lastFetchedListing), limit(10));

            //Execute Query
            const querySnap = await getDocs(q);
            const lastVisible = querySnap.docs[querySnap.docs.length-1]
            setLastFetchedListing(lastVisible);
            const listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListings((prev) => {
                return [...prev, ...listings]
            });
            setLoading(false);
        } catch (error) {
            toast.error('Could not fetch listings')
        }
    }


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
                    <br />
                    <br />
                    {lastFetchedListing && (
                        <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
                    )}
                </>
            ) : (
                <p>No listings on offers</p>
            )}
        </div>
    )
}

export default Offers