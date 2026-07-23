import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Destinations from './components/Destinations';
import Vehicles from './components/Vehicles';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import WhyKerala from './components/WhyKerala';
import Footer from './components/Footer';
import AdminIcon from './components/AdminIcon';

interface AuthUser {
  name: string;
  email: string;
}

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Lazy initializer — reads localStorage synchronously on first render
  // This prevents the scroll detector from showing the modal to already-logged-in users
  const [loggedInUser, setLoggedInUser] = useState<AuthUser | null>(() => {
    const token = localStorage.getItem('userToken');
    const stored = localStorage.getItem('userData');
    if (token && stored) {
      try {
        return JSON.parse(stored) as AuthUser;
      } catch {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
      }
    }
    return null;
  });

  const handleUserLoggedIn = (user: AuthUser) => {
    setLoggedInUser(user);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setLoggedInUser(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar
        onJoinClick={() => setShowLoginModal(true)}
        loggedInUser={loggedInUser}
        onLogout={handleLogout}
      />
      <Hero />
      <WhyKerala />
      <Services />
      <Destinations
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        showForgotPassword={showForgotPassword}
        setShowForgotPassword={setShowForgotPassword}
        loggedInUser={loggedInUser}
        onUserLoggedIn={handleUserLoggedIn}
      />
      <Vehicles />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
      <AdminIcon />
    </div>
  );
}

export default App;