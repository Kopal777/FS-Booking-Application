import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import { Navigate, useParams } from 'react-router-dom';
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from '../UserContext';
import PlaceGallery from './PlaceGallery';
import AddressLink from './AddressLink';

function ViewPlace() {
    const { id } = useParams();
    const [identity, setIdentity] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [price, setPrice] = useState('');
    const [checkInDay, setCheckInDay] = useState('');
    const [checkOutDay, setCheckOutDay] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);


    useEffect(() => {
        axios.get('/viewplace/' + id).then(response => {
            const { data } = response;
            setIdentity(data._id);
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id])

    useEffect(()=>{
        if(user){
            setName(user.name);
        }
    })

    function bookThisPlace() {
        const response = axios.post('/bookings', {
            checkIn, checkOut, maxGuests, name, phone,
            place: identity,
            price: numberOfNights * price
        });
        const bookingId = identity;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOutDay), new Date(checkInDay));
    }
    return (
        <div className='m-8'>
            <div className='text-4xl font-bold'>
                {title}
            </div>
            <AddressLink address={address}/>
            <PlaceGallery addedPhotos={addedPhotos} title={title}/>
            <div className='mt-6 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] mb-5'>
                <div>
                    <div className='mb-5'>
                        <h2 className='font-bold text-lg'>Description</h2>
                        {description}
                    </div>
                    <h2 className='text-lg'>Check In: {checkIn}</h2>
                    <h2 className='text-lg'>Check Out: {checkOut}</h2>
                    <h2 className='text-lg'>Max number of guests: {maxGuests}</h2>
                </div>
                <div>
                    <div className='bg-gray-200 p-4 rounded-2xl shadow'>
                        <div className='text-2xl text-center'>
                            Price: Rs{price} per night
                        </div>
                        <div className='border-2 shadow-gray-600 shadow-md border-gray-400 my-2 rounded-xl'>
                            <div className='flex justify-center border-b-2 border-gray-400'>
                                <div className='px-4 py-3 border-r-2 border-gray-400'>
                                    <label>Check in: </label>
                                    <input className='bg-gray-200 cursor-pointer' type="date" value={checkInDay} onChange={ev => setCheckInDay(ev.target.value)} />
                                </div>
                                <div className='px-4 py-3'>
                                    <label>Check out: </label>
                                    <input className='bg-gray-200 cursor-pointer' type="date" value={checkOutDay} onChange={ev => setCheckOutDay(ev.target.value)} />
                                </div>
                            </div>
                            <div>
                                <div className=' px-4 py-4 border-b-2 border-gray-400'>
                                    <label>Number of Guests: <br /></label>
                                    <input value={maxGuests} type="number" onChange={ev => setMaxGuests(ev.currentTarget.value)} />
                                </div>
                            </div>
                            {numberOfNights > 0 && (
                                <div>
                                    <div>
                                        <div className=' px-4 py-4 border-b-2 border-gray-400'>
                                            <label>Your full name: <br /></label>
                                            <input value={name} type="text" onChange={ev => setName(ev.currentTarget.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className=' px-4 py-4 border-b-2 border-gray-400'>
                                            <label>Phone number: <br /></label>
                                            <input value={phone} type="number" onChange={ev => setPhone(ev.currentTarget.value)} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button onClick={bookThisPlace} className='w-full rounded-xl bg-primary my-3 py-1.5 shadow-md shadow-gray-600 text-white'>
                            Book This Place
                            {numberOfNights > 0 && (
                                <span> at Rs {numberOfNights * price}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className='mb-5'>
                <h2 className='font-bold text-lg'>Extra Info</h2>
                {extraInfo}
            </div>
            <div className='mb-5'>
                <h2 className='font-bold text-lg'>Perks</h2>
                {perks.map((perk, index) => (
                    <p className='flex items-center' key={index}><VscDebugBreakpointLogUnverified />{perk}</p>
                ))}
            </div>
        </div>
    )
}

export default ViewPlace
