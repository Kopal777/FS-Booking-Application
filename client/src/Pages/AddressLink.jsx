import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

function AddressLink({address}) {
    return (
        <div>
            <div className='my-2 flex items-center'>
                <FaLocationDot />
                <a target="_blank" className="underline" href={'https://maps.google.com/?q=' + address}>{address}</a>
            </div>
        </div>
    )
}

export default AddressLink
