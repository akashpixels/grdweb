import React, { Suspense } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import { SavedEvents, UpcomingEvents } from "routes/routes";
import MyBookings from "../Events/MyBookings";
import { Loading } from "components/Common/Loader/Loading";

const MainContent = () => {
  return (
    <div className="h-full flex flex-col">
      <nav className="flex justify-start">
        <div className="py-4 flex justify-between">
          <div>
            <NavLink
              to="/networking/upcoming"
              className={({ isActive }) =>
                `mr-4 text-sm p-2   ${
                  isActive ? "rounded-lg bg-[#f3e2c2]  text-[#902D10] font-semibold shadow-sm" : ""
                }`
              }
            >
              Upcoming Events
            </NavLink>
            <NavLink
              to="/networking/saved"
              className={({ isActive }) =>
                `mr-4 text-sm p-2   ${
                  isActive ? "rounded-lg bg-[#f3e2c2] text-[#902D10] font-semibold shadow-sm" : ""
                }`
              }
            >
              Saved
            </NavLink>
            <NavLink
              to="/networking/bookings"
              className={({ isActive }) =>
                `mr-4 text-sm p-2 ${
                  isActive ? "rounded-lg font-semibold bg-[#f3e2c2] text-[#902D10] shadow-sm" : ""
                }`
              }
            >
              My Bookings
            </NavLink>
          </div>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/upcoming" element={<UpcomingEvents />} />
          <Route path="/saved" element={<SavedEvents />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/" element={<UpcomingEvents />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MainContent;
