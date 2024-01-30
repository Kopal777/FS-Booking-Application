import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { FaLocationDot } from "react-icons/fa6";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { BsGrid3X3Gap } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import Carousel from "nuka-carousel";
import {differenceInCalendarDays} from "date-fns";

function ViewPlace() {
    const { id } = useParams();
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
    const [showAllPhotos, setshowAllPhotos] = useState(false);
    const [checkInDay, setCheckInDay] = useState('');
    const [checkOutDay, setCheckOutDay] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');


    useEffect(() => {
        axios.get('/viewplace/' + id).then(response => {
            const { data } = response;
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

    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOutDay), new Date(checkInDay));
    }

    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-black text-white min-h-screen'>
                <div className='bg-black grid gap-4 p-8'>
                    <div>
                        <h2 className='text-3xl my-2'>Photos of {title}</h2>
                        <button onClick={() => setshowAllPhotos(false)} className='bg-white my-2 fixed right-12 top-9 text-black rounded-2xl py-2 px-4 flex items-center'><RxCross2 style={{ marginTop: "3px", marginRight: "2px" }} />Close Photos</button>
                    </div>
                    <Carousel
                        renderCenterLeftControls={({ previousSlide }) => (
                            <button onClick={previousSlide} className="custom-carousel-button">
                                {/* Custom content for the Prev button */}
                                <div className='ml-40 cursor-pointer'><AiFillLeftCircle size='30px' /></div>
                            </button>
                        )}
                        renderCenterRightControls={({ nextSlide }) => (
                            <button onClick={nextSlide} className="custom-carousel-button">
                                {/* Custom content for the Next button */}
                                <div className='mr-40 cursor-pointer'><AiFillRightCircle size='30px' /></div>
                            </button>
                        )}>
                        {addedPhotos?.length > 0 && addedPhotos.map(photo => (

                            <div className='flex justify-center'>
                                <img className='w-[55%]' src={'http://localhost:4000/uploads/' + photo} alt="" />
                            </div>

                        ))}
                    </Carousel>
                </div>
            </div>
        )
    }

    return (
        <div className='m-8'>
            <div className='text-4xl font-bold'>
                {title}
            </div>
            <div className='my-2 flex items-center'>
                <FaLocationDot />
                <a target="_blank" className="underline" href={'https://maps.google.com/?q=' + address}>{address}</a>
            </div>
            <div className='relative'>
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>
                        {addedPhotos?.[0] && (
                            <div>
                                <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/' + addedPhotos[0]} alt="" />
                            </div>
                        )}
                    </div>
                    <div className="grid">
                        {addedPhotos?.[1] && (
                            <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/' + addedPhotos[1]} alt="" />
                        )}
                        <div className="overflow-hidden">
                            {addedPhotos?.[2] && (
                                <img className="aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads/' + addedPhotos[2]} alt="" />
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={() => setshowAllPhotos(true)} className='absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl flex items-center shadow-black shadow-md'><BsGrid3X3Gap style={{ marginRight: "2px", marginTop: "1px" }} />Show more</button>
                </div>
            </div>
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
                                    <input className='bg-gray-200 cursor-pointer' type="date" value={checkOutDay} onChange={ev => setCheckOutDay(ev.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <div className=' px-4 py-4 border-b-2 border-gray-400'>
                                    <label>Number of Guests: <br /></label>
                                    <input value={maxGuests} type="number" onChange={ev => setMaxGuests(ev.currentTarget.value)}/>
                                </div>
                            </div>
                            <div>
                                <div className=' px-4 py-4 border-b-2 border-gray-400'>
                                    <label>Your full name: <br /></label>
                                    <input value={name} type="text" onChange={ev => setName(ev.currentTarget.value)}/>
                                </div>
                            </div>
                            <div>
                                <div className=' px-4 py-4 border-b-2 border-gray-400'>
                                    <label>Phone number: <br /></label>
                                    <input value={phone} type="number" onChange={ev => setPhone(ev.currentTarget.value)}/>
                                </div>
                            </div>
                        </div>
                        <button className='w-full rounded-xl bg-primary my-3 py-1.5 shadow-md shadow-gray-600 text-white'>
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
