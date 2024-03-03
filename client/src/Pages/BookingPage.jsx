import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressLink from './AddressLink';
import PlaceGallery from './PlaceGallery';
import BookingDates from './BookingDates';

function BookingPage() {

  const [booking, setBooking] = useState(null);
  const { id } = useParams();

  useEffect(() => {

    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({ _id }) => _id === id)
        if (foundBooking) {
          setBooking(foundBooking);
        }
      })
    }
  }, [id])

  if (!booking) {
    return '';
  }

  return (
    <div className='m-8'>
      <div className='text-4xl font-bold'>{booking.place.title}</div>
      <AddressLink address={booking.place.address} />
      <div className='bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center'>
        <div>
          <h2 className='text-xl mb-2'> Your Booking Information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className='bg-primary p-3 text-white rounded-xl'>
          <div>Total Price:</div>
          <div className='text-3xl'>Rs {booking.price}</div>
        </div>
      </div>
      <PlaceGallery addedPhotos={booking.place.photos} />
    </div>
  )
}

export default BookingPage


// {bookings.length > 0 && bookings.map(booking => (
//   <div>
//     <div className='text-4xl font-bold'>
//       {booking.place.title}
//     </div>
//     {booking.checkIn} - {booking.checkOut}
//   </div>
// ))}
