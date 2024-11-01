"use client";

import React, { useState, useEffect } from "react";
import Booking from "@/components/Booking";

interface BookingDetail {
  userName: string;
  userEmail: string;
  seats: number;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  seats: number;
  bookings: BookingDetail[]; 
}

const HomePage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
   
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    const initializedEvents = storedEvents.map((event: Event) => ({
      ...event,
      bookings: event.bookings || [], 
    }));

    setEvents(initializedEvents);
  }, []);

  const handleBooking = (id: number, bookingDetails: BookingDetail) => {
    const updatedEvents = events.map((event) => {
      if (event.id === id) {
        
        event.seats -= bookingDetails.seats; 
        
        event.bookings.push(bookingDetails); 
      }
      return event;
    });

    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">Available Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-4 shadow-md rounded">
            <h4 className="font-bold text-lg">{event.title}</h4>
            <p>{event.description}</p>
            <p className="text-gray-500">Date: {event.date}</p>
            <p className="text-gray-500">Available Seats: {event.seats}</p>
            <Booking event={event} onBooking={(details: BookingDetail) => handleBooking(event.id, details)} />

          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
