//REACT
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


//FIREBASE
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "../firebase.config"

//COMPONENTS
import Spinner from "./Spinner"

//IMPORTS
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import '../assets/css/swiper-bundle.css'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])


function Slider() {

    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async() => {
            const listingsRef = collection(db, 'listings')
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
            const querySnap = await getDocs(q);
            const listings = [];
            querySnap.forEach(doc => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListings(listings);
            setLoading(false);
        }

        fetchListings();
    }, [])

    if(loading){
        return <Spinner/>
    }

    if(listings.length === 0){
        return <></>
    }

    return listings && (
        <>
            <p className="exploreHeading">Recommended</p>
            <Swiper
                slidesPerView={1}
                pagination={{clickable: true}}
            >
                {listings.map(({data, id}) => (
                    <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                        <div className="swiperSlideDiv" style={{background: `url(${data.imgUrls[0]}) center no-repeat`, backgroundSize: 'cover'}}>
                            <p className="swiperSlideText">{data.name}</p>
                            <p className="swiperSlidePrice">
                                ${data.discountedPrice ?? data.regularPrice}
                                {data.type === 'rent' && ' / month'}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Slider