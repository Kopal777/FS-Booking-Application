import React, { useContext, useState } from 'react';
import { FaRegUser, FaListUl } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AddPlaces from './AddPlaces';
import Places from './Places';

function Account() {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    setUser(null);
    setRedirect('/');
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user) {
    return <Navigate to={'/Login'} />
  }

  function linkClasses(type = null) {
    let classes = ' inline-flex rounded-full gap-1 px-6 py-2';
    if (type === subpage) {
      classes += ' bg-primary text-white';
    }
    else{ 
      classes += ' bg-gray-200';
    }
    return classes;
  }

  if (redirect) {
    <Navigate to={redirect} />
  }

  return (
    <div>
      <nav className='my-8 w-full gap-2 flex justify-center'>
        <Link className={linkClasses('profile')} to={'/Account'}><div className='relative top-1.5'><FaRegUser/></div>My Profile</Link>
        <Link className={linkClasses('bookings')} to={'/Account/bookings'}><div className='relative top-1.5'><FaListUl /></div>My Bookings</Link>
        <Link className={linkClasses('places')} to={'/Account/places'}><div className='relative top-1.5'><BsBuildings/></div> My Accomodations</Link>
        <Link className={linkClasses('addplace')} to={'/Account/addplace'}><div className='relative top-1.5'><IoMdAddCircleOutline/></div> Add new place</Link>
      </nav>
      {subpage === 'profile' && (
        <div className='text-center'>
          Logged in as {user.name} ({user.email})
          <br />
          <button onClick={logout} className='bg-primary mt-4 px-36 py-1 rounded-full text-white'>LogOut</button>
        </div>
      )}
      {subpage === 'places' && (
        <div>
          <Places/>
        </div>
      )}
      {subpage === 'addplace' && (
        <div>
          <AddPlaces />
        </div>
      )}
    </div>
  )
}

export default Account
