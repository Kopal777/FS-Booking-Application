import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi";
import { IoMdCloudUpload } from "react-icons/io";
import { FaWifi } from "react-icons/fa6";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { IoEnter } from "react-icons/io5";
import { FaRadio } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { Link, useParams } from 'react-router-dom'
export default function Perks() {
    return (
        <>
            <label className='flex gap-2 border rounded-2xl p-4'>
                <input type="checkbox" />
                <FaWifi style={iconStyle} />
                <span>Wifi</span>
            </label>
            <label className='flex gap-2 border rounded-2xl p-4'>
                <input type="checkbox" />
                <PiTelevisionSimpleBold style={iconStyle} />
                <span>TV</span>
            </label>
            <label className='flex gap-2 border rounded-2xl p-4'>                                    <input type="checkbox" />
                <FaRadio style={iconStyle} />
                <span>Radio</span>
            </label>
            <label className='flex gap-2 border rounded-2xl p-4'>                                    <input type="checkbox" />
                <FaCar style={iconStyle} />
                <span>Free parking spot</span>
            </label>
            <label className='flex gap-2 border rounded-2xl p-4'>                                    <input type="checkbox" />
                <MdPets style={iconStyle} />
                <span>Pets</span>
            </label>
            <label className='flex gap-2 border rounded-2xl p-4'>                                    <input type="checkbox" />
                <IoEnter style={iconStyle} />
                <span>Private entrance</span>
            </label>

        </>
    );
}
