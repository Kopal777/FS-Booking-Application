import React from 'react'

function perks() {
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
    )
}

export default perks
