import React, { useState } from 'react';
import { FaWifi } from "react-icons/fa6";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { IoEnter } from "react-icons/io5";
import { FaRadio } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { MdPets } from "react-icons/md";

function Perks({selected, onChange}) {

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

    function handleCbClick(ev){
        const {checked, name} = ev.target;
        if(checked){
            onChange([...selected, name])
        }
        else{
            onChange([...selected.filter(selectedName => selectedName !== name)])
        }
    }

    return (
        <div>
            {headDesc('Perks', 'Select all the perks of your place')}
            <div className='mt-2 gap-3 md:grid-cols-3 grid grid-cols-2 lg:grid-cols-4'>
                <label className='flex gap-2 border rounded-2xl p-4'>
                    <input type="checkbox" name='Wifi' onChange={handleCbClick}/>
                    <FaWifi style={iconStyle} />
                    <span>Wifi</span>
                </label>
                <label className='flex gap-2 border rounded-2xl p-4'>
                    <input type="checkbox" name='TV' onChange={handleCbClick}/>
                    <PiTelevisionSimpleBold style={iconStyle} />
                    <span>TV</span>
                </label>
                <label className='flex gap-2 border rounded-2xl p-4'>
                    <input type="checkbox" name='Radio' onChange={handleCbClick}/>
                    <FaRadio style={iconStyle} />
                    <span>Radio</span>
                </label>
                <label className='flex gap-2 border rounded-2xl p-4'>
                    <input type="checkbox" name='Parking' onChange={handleCbClick}/>
                    <FaCar style={iconStyle} />
                    <span>Free parking spot</span>
                </label>
                <label className='flex gap-2 border rounded-2xl p-4'>
                    <input type="checkbox" name='Pets' onChange={handleCbClick}/>
                    <MdPets style={iconStyle} />
                    <span>Pets</span>
                </label>
                <label className='flex gap-2 border rounded-2xl p-4'>
                    <input type="checkbox" name='Entrance' onChange={handleCbClick}/>
                    <IoEnter style={iconStyle} />
                    <span>Private entrance</span>
                </label>
            </div>
        </div>
    )
}

export default Perks
