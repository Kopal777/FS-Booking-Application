import React, { useState } from 'react'
import { IoMdCloudUpload } from "react-icons/io";
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

function uploadPhoto() {

    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');

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

    return (
        <div>
            <div className='flex gap-2'>
                <input type="text" placeholder='Add using link....jpg' value={photoLink} onChange={(e) => { setPhotoLink(e.target.value) }} />
                <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add Photo</button>
            </div>
            <div className='mt-2 gap-2 grid grid-cols-3 md:grid-cols4 lg:grid-cols-6'>
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className='flex h-48'>
                        <img className='rounded-2xl w-full' src={'http://localhost:4000/uploads/' + link} alt="" />
                    </div>
                ))}
                <label className='cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl text-gray-600 p-8'>
                    <input multiple type="file" className='hidden' onChange={uploadPhoto} />
                    <div className='mr-1 text-2xl'><IoMdCloudUpload /></div>
                    Upload
                </label>
            </div>
        </div>
    )
}

export default uploadPhoto
