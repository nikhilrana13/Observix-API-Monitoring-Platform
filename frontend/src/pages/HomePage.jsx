import React from 'react';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/pagesComponents/home/FeaturesSection';
import TrustedSection from '../components/pagesComponents/home/TrustedSection';
import MonitoringSection from '../components/pagesComponents/home/MonitoringSection';
import FeaturesSection from '../components/pagesComponents/home/FeaturesSection';
import Footer from '../components/common/Footer';


const HomePage = () => {
  return (
    <div className='w-full '>
      <Navbar />
      {/* hero section */}
      <HeroSection />
      <TrustedSection />
      <MonitoringSection />
      <FeaturesSection />
      <Footer />
     
    </div>
  );
}

export default HomePage;
