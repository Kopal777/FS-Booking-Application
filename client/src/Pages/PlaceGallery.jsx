import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { BsGrid3X3Gap } from "react-icons/bs";

function PlaceGallery({ addedPhotos, title }) {

    const [showAllPhotos, setshowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-black text-white min-h-screen'>
                <div className='bg-black grid gap-4 p-8'>
                    <div>
                        <h2 className='text-3xl my-2'>Photos of {title}</h2>
                        <button onClick={() => setshowAllPhotos(false)} className='bg-white my-2 fixed right-12 top-9 text-black rounded-2xl py-2 px-4 flex items-center'><RxCross2 style={{ marginTop: "3px", marginRight: "2px" }} />Close Photos</button>
                    </div>
                    {addedPhotos?.length > 0 && addedPhotos.map(photo => (

                        <div className='flex justify-center'>
                            <img className='w-[55%]' src={'https://fs-booking-application.vercel.app/uploads/' + photo} alt="" />
                        </div>

                    ))}
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='relative'>
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>
                        {addedPhotos?.[0] && (
                            <div>
                                <img className="aspect-square object-cover" src={'https://fs-booking-application.vercel.app/uploads/' + addedPhotos[0]} alt="" />
                            </div>
                        )}
                    </div>
                    <div className="grid">
                        {addedPhotos?.[1] && (
                            <img className="aspect-square object-cover" src={'https://fs-booking-application.vercel.app/uploads/' + addedPhotos[1]} alt="" />
                        )}
                        <div className="overflow-hidden">
                            {addedPhotos?.[2] && (
                                <img className="aspect-square object-cover relative top-2" src={'https://fs-booking-application.vercel.app/uploads/' + addedPhotos[2]} alt="" />
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={() => setshowAllPhotos(true)} className='absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl flex items-center shadow-black shadow-md'><BsGrid3X3Gap style={{ marginRight: "2px", marginTop: "1px" }} />Show more</button>
                </div>
            </div>
        </div>
    )
}

export default PlaceGallery
