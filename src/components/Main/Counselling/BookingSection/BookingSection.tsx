/* eslint-disable no-console */
/* eslint-disable max-len */
import Button from "components/Common/Button/Button";
import Modal from "components/Common/Modal/NormalModel/Modal";
import React, { useState } from "react";
import { IoMdTime } from "react-icons/io";
import RescheduleAppointment from "../RescheduleAppointment";
import { showToast } from "utils/toastUtils";
import CloseAppointment from "../CloseAppointment";
import yourBooking from "assets/yourbooking.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BookingSection: React.FC<{ bookings: any[] }> = ({ bookings }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCloseModelOpen, setIsCloseModelOpen] = useState<boolean>(false);

  const getRescheduleTime = (time: string[]) => {
    setIsModalOpen(true);

    console.log("time", time);
  };
  function handleConfirm(time: string): void {
    console.log("time", time);
  }

  const handleCancelAppointment = () => {
    showToast("success", "Appointment is cancel.");
  };

  const handleReschedule = (time: string) => {
    if (time) {
      showToast("success", `Appointment is rescheduled on ${time}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Your Bookings</h2>
      {bookings?.length > 0 ? (
        bookings.map((booking, index) => {
          return (
            <div key={index} className="border rounded-lg p-6 mb-4">
              <div className="flex gap-6 mb-3">
                <div>
                  <img src={booking.doctor.img} alt="" width={50} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{booking.doctor.name}</h3>
                  <p className="text-gray-500 text-sm">{booking.doctor.title}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center my-3 text-gray-600 font-medium">
                <IoMdTime className="text-xl" />
                <p className="text-gray-500">{booking.time}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <Button
                  onClick={() => alert("booking.")}
                  className="text-custom-secondary border hover:bg-transparent hover:border-custom-primary hover:text-custom-primary"
                >
                  Join
                </Button>
                <Button
                  onClick={() => getRescheduleTime(booking)}
                  className="text-custom-secondary bg-transparent border border-custom-secondary hover:bg-custom-white hover:border-custom-primary hover:text-custom-primary"
                >
                  Reschedule
                </Button>
                <Button
                  onClick={() => setIsCloseModelOpen(true)}
                  className="text-custom-dark-orange bg-transparent border border-custom-dark-orange hover:bg-custom-white hover:border-custom-primary hover:text-custom-primary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <div className="mb-6 text-center">
            <img src={yourBooking} alt="your booking" />
          </div>
          <p className="text-gray-600">No bookings found. Make a new on the right section</p>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm}>
        <RescheduleAppointment
          timing={["9.00 AM", "10.00 AM", "11.00 AM", "12.00 AM", "01.00 AM"]}
          onClose={() => setIsModalOpen(false)}
          onConfirm={(item: string) => handleReschedule(item)}
        />
      </Modal>

      <Modal
        isOpen={isCloseModelOpen}
        onClose={() => setIsCloseModelOpen(false)}
        onConfirm={handleConfirm}
      >
        <CloseAppointment
          onClose={() => setIsCloseModelOpen(false)}
          onConfirm={handleCancelAppointment}
        />
      </Modal>
    </div>
  );
};

export default BookingSection;
