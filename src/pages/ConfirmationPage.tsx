import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Event, Registration } from "../types";

const ConfirmationPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [registration, setRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const eventResponse = await axios.get<Event>(
        `http://localhost:3001/events/${eventId}`
      );
      setEvent(eventResponse.data);

      const registrationsResponse = await axios.get<Registration[]>(
        `http://localhost:3001/registrations?eventId=${eventId}`
      );
      setRegistration(
        registrationsResponse.data[registrationsResponse.data.length - 1]
      );
    };
    fetchData();
  }, [eventId]);

  if (!event || !registration) return <div>Loading...</div>;

  return (
    <div className="container px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800">
        Registration Confirmation
      </h1>
      <div className="max-w-xl mx-auto">
        <div className="card p-4 md:p-8 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-gray-800">
            Event Details
          </h2>
          <p className="mb-1 md:mb-2">
            <span className="font-semibold">Name:</span> {event.name}
          </p>
          <p className="mb-1 md:mb-2">
            <span className="font-semibold">Date:</span> {event.date}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {event.location}
          </p>
        </div>
        <div className="card p-4 md:p-8 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-gray-800">
            Your Registration
          </h2>
          <p className="mb-1 md:mb-2">
            <span className="font-semibold">Name:</span> {registration.name}
          </p>
          <p className="mb-1 md:mb-2">
            <span className="font-semibold">Date of Birth:</span>{" "}
            {registration.dateOfBirth}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {registration.address}
          </p>
        </div>
        <Link to="/" className="btn btn-primary block text-center">
          Back to Events
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
