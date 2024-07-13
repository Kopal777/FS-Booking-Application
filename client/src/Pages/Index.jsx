import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Index() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    })
  }, [])
  return (
    <div className='mt-7 grid gap-9 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {places.length > 0 && places.map(place => (
        <div>
          <Link to={'/viewplace/' + place._id} className='bg-gray-500 rounded-2xl'>
            {place.photos?.[0] && (
              <img className='rounded-2xl object-cover aspect-square' src={'https://fs-booking-application.vercel.app/uploads/' + place.photos[0]} alt="" />
            )}
          </Link>
          <h2 className='text-sm mt-2 font-bold'>{place.title}</h2>
          <h3 className='text-sm truncate'>{place.address}</h3>
          <div className='text-sm mt-1'>
            <span className='font-bold'>Rs {place.price}</span> per night
          </div>
        </div>
      ))}
    </div>
  )
}

export default Index



