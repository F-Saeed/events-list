import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Event, Registration } from "../types";

const RegistrationForm = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<
    Omit<Registration, "id" | "eventId">
  >({
    name: "",
    dateOfBirth: "",
    address: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await axios.get<Event>(
        `http://localhost:3001/events/${eventId}`
      );
      setEvent(response.data);
    };
    fetchEvent();
  }, [eventId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registration: Registration = {
      ...formData,
      eventId: Number(eventId),
    };
    await axios.post<Registration>(
      "http://localhost:3001/registrations",
      registration
    );
    navigate(`/confirmation/${eventId}`);
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="container px-4">
      <Link
        to="/"
        className="inline-block mb-4 md:mb-6 text-blue-600 hover:underline"
      >
        &larr; Back to Events
      </Link>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-gray-800">
          Register for {event.name}
        </h1>
        <form onSubmit={handleSubmit} className="card p-4 md:p-8">
          <div className="mb-4 md:mb-6">
            <label
              htmlFor="name"
              className="block mb-1 md:mb-2 font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 md:mb-6">
            <label
              htmlFor="dateOfBirth"
              className="block mb-1 md:mb-2 font-semibold text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 md:mb-6">
            <label
              htmlFor="address"
              className="block mb-1 md:mb-2 font-semibold text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-secondary w-full">
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
