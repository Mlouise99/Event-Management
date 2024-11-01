"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  seats: number;
}

const AdminDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('adminAuthenticated')) {
      router.push('/admin/login');
    }
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    setEvents(storedEvents);
  }, [router]);

  const saveEvents = (updatedEvents: Event[]) => {
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const handleAddOrUpdateEvent = () => {
    if (editMode && editEventId !== null) {
      const updatedEvents = events.map(event => 
        event.id === editEventId 
          ? { ...event, title, description, date, seats: parseInt(seats, 10) }
          : event
      );
      saveEvents(updatedEvents);
      setEditMode(false);
      setEditEventId(null);
    } else {
      const newEvent: Event = {
        id: Date.now(),
        title,
        description,
        date,
        seats: parseInt(seats, 10),
      };
      const updatedEvents = [...events, newEvent];
      saveEvents(updatedEvents);
    }

    
    setTitle('');
    setDescription('');
    setDate('');
    setSeats('');
  };

  const handleDeleteEvent = (id: number) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    saveEvents(updatedEvents);
  };

  const handleEditEvent = (event: Event) => {
    setEditMode(true);
    setEditEventId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date);
    setSeats(event.seats.toString());
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-6 p-4 bg-white shadow-md rounded">
        <h3 className="text-xl font-semibold mb-4">{editMode ? 'Edit Event' : 'Add Event'}</h3>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="number"
          placeholder="Available Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button onClick={handleAddOrUpdateEvent} className="bg-blue-600 text-white w-full py-2 rounded">
          {editMode ? 'Update Event' : 'Add Event'}
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Existing Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-4 shadow-md rounded">
            <h4 className="font-bold text-lg">{event.title}</h4>
            <p>{event.description}</p>
            <p className="text-gray-500">Date: {event.date}</p>
            <p className="text-gray-500">Seats: {event.seats}</p>
            <button onClick={() => handleEditEvent(event)} className="bg-yellow-500 text-white w-full mt-2 py-2 rounded">
              Edit
            </button>
            <button
              onClick={() => handleDeleteEvent(event.id)}
              className="bg-red-500 text-white w-full mt-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
