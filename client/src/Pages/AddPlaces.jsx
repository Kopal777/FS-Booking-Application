import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi";
import { IoMdCloudUpload } from "react-icons/io";
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Perks from '../Perks';

function AddPlaces() {

    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState();
    const [redirect, setRedirect] = useState(false);

    function inputHeader(header) {
        return (
            <h2 className='text-2xl mt-4'>{header}</h2>
        );
    }
    function inputDescription(description) {
        return (
            <p className='text-sm text-gray-500'>{description}</p>
        );
    }
    function headDesc(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    const iconStyle = {
        position: 'relative',
        top: 4
    };

    async function addPhotoByLink(ev) {                                                      //Adding photos by a link
        ev.preventDefault();
        const { data: filename } = await axios.post('/uploadByLink', { link: photoLink });
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    };

    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const { data: filename } = response;
            setAddedPhotos(prev => {
                return [...prev, filename];
            })
        })
    }

    async function addNewPlace(ev) {
        ev.preventDefault();
        await axios.post('/places', {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests,price
        })
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to='/Account/places' />
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link to={'/Account/addplace/new'} className=' inline-flex gap-2 bg-primary w-fit p-2 rounded-full text-white'>
                        <div className='relative top-1'><FiPlus /></div>
                        Add new place
                    </Link>
                </div>
            )}
            <div>
                {action === 'new' && (
                    <form action="" onSubmit={addNewPlace}>
                        {headDesc('Title', 'Title for the place')}
                        <input type="text" placeholder='Title, for example: My Lovely Apartment' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                        {headDesc('Address', 'Add the address for the place')}
                        <input type="text" placeholder='Address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                        {headDesc('Photos', 'More photos the better')}
                        <div className='flex gap-2'>
                            <input type="text" placeholder='Add using link....jpg' value={photoLink} onChange={(e) => { setPhotoLink(e.target.value) }} />
                            <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add Photo</button>
                        </div>
                        <div className='mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {addedPhotos.length > 0 && addedPhotos.map((link) => (
                                <div className='flex h-52'>
                                    <img className='rounded-2xl w-full' src={'https://fs-booking-application.vercel.app/uploads/' + link} alt="" />
                                </div>
                            ))}
                            <label className='cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl text-gray-600 p-8'>
                                <input multiple type="file" className='hidden' onChange={uploadPhoto} />
                                <div className='mr-1 text-2xl'><IoMdCloudUpload /></div>
                                Upload
                            </label>
                        </div>
                        {headDesc('Description', 'Description for the place')}
                        <textarea className='p-2 border-gray-300 border rounded-2xl w-full' cols="30" rows="4" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                        <Perks selected={perks} onChange={setPerks} />
                        {headDesc('Extra Info', 'Rules and other info, etc')}
                        <textarea className='p-2 border-gray-300 border rounded-2xl w-full' cols="30" rows="4" value={extraInfo} onChange={(e) => { setExtraInfo(e.target.value) }}></textarea>
                        {headDesc('Check in & out times', 'Add check in and check out  times, remember to have some time window for cleaning the room between guests')}
                        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-2'>
                            <div>
                                <h3 className='mt-2'>Check in</h3>
                                <input type="text" placeholder='' value={checkIn} onChange={(e) => { setCheckIn(e.target.value) }} />
                            </div>
                            <div>
                                <h3 className='mt-2'>Check out</h3>
                                <input type="text" placeholder='' value={checkOut} onChange={(e) => { setCheckOut(e.target.value) }} />
                            </div>
                            <div>
                                <h3 className='mt-2'>Max number of guests</h3>
                                <input className='w-full border my-1 py-2 px-3 rounded-2xl' type="number" placeholder='' value={maxGuests} onChange={(e) => { setMaxGuests(e.target.value) }} />
                            </div>
                            <div>
                                <h3 className='mt-2'>Price</h3>
                                <input className='w-full border my-1 py-2 px-3 rounded-2xl' type="number" placeholder='' value={price} onChange={(e) => { setPrice(e.target.value) }} />
                            </div>
                        </div>
                        <button className=' bg-primary w-full my-4 py-2 rounded-full text-white'>Save</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default AddPlaces
