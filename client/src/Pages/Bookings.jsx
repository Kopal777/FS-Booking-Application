import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegCreditCard } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import BookingDates from './BookingDates';

function Bookings() {

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    })
  }, [])


  return (
    <div>
      {bookings.length > 0 && bookings.map(booking => (
        <Link to={`/account/bookings/${booking._id}`}>
          <div className='bg-gray-200 rounded-md '>
            <div className='flex gap-3'>
              <img className='w-52 rounded-l-md' src={'http://localhost:4000/uploads/' + booking.place.photos[0]} alt="" />
              <div className='mt-5'>
                <div className='text-lg font-medium'>
                  {booking.place.title}
                </div>
                <BookingDates booking={booking} className='text-slate-500'/>
                <div className='text-xl flex items-center gap-1.5 font-semibold'>
                  <FaRegCreditCard />Total Price: Rs {booking.price}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Bookings
