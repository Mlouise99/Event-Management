import { useState } from 'react';

const Booking = ({ event, onBooking }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [seats, setSeats] = useState(1);
    const [message, setMessage] = useState('');

    const handleBooking = () => {

        if (!userName || !userEmail || seats <= 0) {
            setMessage('Please fill in all fields.');
            return;
        }


        if (seats > event.seats) {
            setMessage(`Not enough seats available. Only ${event.seats} seat(s) left.`);
            return;
        }


        const bookingDetails = { userName, userEmail, seats };
        onBooking(bookingDetails);
        setMessage(`Booking seat successful for ${userName}!`);
        setUserName('');
        setUserEmail('');
        setSeats(1);
    };

    return (
        <div className="mt-4 p-4 border rounded">
            <h4 className="font-semibold mb-2">Book Seats</h4>
            <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <input
                type="email"
                placeholder="Your Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <input
                type="number"
                min="1"
                placeholder="Number of Seats"
                value={seats}
                onChange={(e) => setSeats(parseInt(e.target.value) || 1)}
                className="border p-2 w-full mb-2"
            />
            <button onClick={handleBooking} className="bg-blue-600 text-white w-full py-2 rounded">
                Book Now
            </button>
            {message && <p className="mt-2 text-red-500">{message}</p>}
        </div>
    );
};

export default Booking;
