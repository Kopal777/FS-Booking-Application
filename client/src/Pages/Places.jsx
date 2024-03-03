import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { TiDelete } from "react-icons/ti";

function Places() {

  const { placeid } = useParams();
  const [places, setPlaces] = useState([]);

  function getData(){
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    })
  }
  
  useEffect(() => {
    getData();
    }, [])

  function deletePlace(id) {
    axios.delete(`/deletePlace/${id}`).then((response) => {
      console.log(response);
    });
    getData();
  }

  return (
    <div>
      <div className='mt-4'>
        {places.length > 0 && places.map(place => (
          <div className='mt-3'>
            <div className='bg-gray-100 gap-4 p-4 rounded-2xl flex'>
              <Link to={'/Account/places/'+ place._id} className='w-44 grow shrink-0'>
                {place.photos.length > 0 && (
                  <img className='object-cover' src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
                )}
              </Link>
              <div className='grow-0 shrink'>
                <div className='flex items-center justify-between'>
                  <Link to={'/Account/places/'+ place._id} className='text-xl font-semibold'>{place.title}</Link>
                  <TiDelete style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => deletePlace(place._id)} />
                </div>
                <p className='text-sm mt-2 '>{place.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Places
