import React from 'react'
import { IoMoonOutline } from "react-icons/io5";
import { differenceInCalendarDays } from "date-fns";
import { IoCalendarOutline } from "react-icons/io5";
import { format } from 'date-fns';

function BookingDates({booking, className}) {
    return (
        <div>
            <div className={'flex gap-1.5 items-center my-1.5'+className}>
                <IoMoonOutline /> {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights: <IoCalendarOutline /> {format(new Date(booking.checkIn), 'yyyy-MM-dd')} <IoCalendarOutline /> {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
            </div>
        </div>
    )
}

export default BookingDates
