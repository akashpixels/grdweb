/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { AppointmentSection, BookingSection } from "routes/routes";

const MainContent = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  const addBooking = (booking: any) => {
    setBookings([...bookings, booking]);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 pt-6 gap-8 h-full">
      <div className=" bg-white p-8 shadow-lg rounded-2xl">
        <BookingSection bookings={bookings} />
      </div>
      <div className="flex-grow ">
        <div className="p-8 shadow-lg bg-white rounded-2xl h-full">
          <AppointmentSection addBooking={addBooking} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
