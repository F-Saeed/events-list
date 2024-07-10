import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RegistrationWithEvent } from "../types";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState<RegistrationWithEvent[]>(
    []
  );

  useEffect(() => {
    const fetchRegistrations = async () => {
      const response = await axios.get<RegistrationWithEvent[]>(
        "http://localhost:3001/registrations"
      );
      const eventPromises = response.data.map((reg) =>
        axios.get(`http://localhost:3001/events/${reg.eventId}`)
      );
      const events = await Promise.all(eventPromises);
      const registrationsWithEvents = response.data.map((reg, index) => ({
        ...reg,
        event: events[index].data,
      }));
      setRegistrations(registrationsWithEvents);
    };
    fetchRegistrations();
  }, []);

  return (
    <div className="container px-4">
      <Link
        to="/"
        className="inline-block mb-4 md:mb-6 text-blue-600 hover:underline"
      >
        &larr; Back to Events
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800">
        My Registrations
      </h1>
      {registrations.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't registered for any events yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {registrations.map((registration) => (
            <div key={registration.id} className="card p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 text-gray-800">
                {registration.event.name}
              </h2>
              <p className="text-gray-600 mb-1 md:mb-2">
                <span className="font-semibold">Date:</span>{" "}
                {registration.event.date}
              </p>
              <p className="text-gray-600 mb-1 md:mb-2">
                <span className="font-semibold">Location:</span>{" "}
                {registration.event.location}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Your name:</span>{" "}
                {registration.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;
