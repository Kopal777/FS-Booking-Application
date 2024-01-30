import React, { useContext } from 'react'
import { PiPaperPlaneRightLight } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
    const {user} = useContext(UserContext);
    return (
        <div>
            <div>
                <header className='flex items-center justify-between'>
                    <Link to={'/'} href="" className='flex items-center'>
                        <span style={{ fontSize: '38px', transform: 'rotate(-90deg)' }}><PiPaperPlaneRightLight /></span>
                        <span className='font-bold text-xl'>Airbnb</span>
                    </Link>
                    <div className='flex border-2 shadow-lg shadow-slate-300 rounded-full p-2'>
                        <div className='mx-2'>Anywhere</div>
                        <div className='border border-slate-300'></div>
                        <div className='mx-2'>Any Week</div>
                        <div className='border border-slate-300'></div>
                        <div className='flex items-center mx-2'>Add Guests
                            <div className='text-white p-1 bg-primary rounded-xl ml-2'><IoSearch /></div>
                        </div>
                    </div>
                    <Link to={user?'/Account':'/Login'} className='flex text-2xl border-2 shadow-lg shadow-slate-300 rounded-full p-2 items-center'>
                        <div className='mx-2'><RxHamburgerMenu /></div>
                        <div className='mx-2 text-slate-600'><FaUserCircle /></div>
                        {!!user &&(
                            <div className='text-xl'>
                                {user.name}
                            </div>
                        )}
                    </Link>
                </header>
            </div>
        </div>
    )
}
