import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Event } from "../types";

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get<Event[]>("http://localhost:3001/events");
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="container px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800">
        Upcoming Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {events.map((event) => (
          <div key={event.id} className="card">
            <div className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 text-gray-800">
                {event.name}
              </h2>
              <p className="text-gray-600 mb-1 md:mb-2">
                <span className="font-semibold">Date:</span> {event.date}
              </p>
              <p className="text-gray-600 mb-3 md:mb-4">
                <span className="font-semibold">Location:</span>{" "}
                {event.location}
              </p>
              <Link
                to={`/register/${event.id}`}
                className="btn btn-primary block text-center"
              >
                Register
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
