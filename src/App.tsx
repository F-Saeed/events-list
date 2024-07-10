import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventList from "./components/EventList";
import RegistrationForm from "./components/RegistrationForm";
import ConfirmationPage from "./pages/ConfirmationPage";
import MyRegistrations from "./pages/MyRegistrations";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white py-3 md:py-4 mb-6 md:mb-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <Link to="/" className="text-xl md:text-2xl font-bold mb-2 md:mb-0">
              Events App
            </Link>
            <Link
              to="/my-registrations"
              className="btn bg-white text-blue-600 hover:bg-blue-100"
            >
              My Registrations
            </Link>
          </div>
        </nav>
        <div className="py-6 md:py-8">
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/register/:eventId" element={<RegistrationForm />} />
            <Route
              path="/confirmation/:eventId"
              element={<ConfirmationPage />}
            />
            <Route path="/my-registrations" element={<MyRegistrations />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
