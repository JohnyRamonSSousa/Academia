
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Modalities from '../components/home/Modalities';
import Plans from '../components/home/Plans';
import Footer from '../components/layout/Footer';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';
import BackToTop from '../components/ui/BackToTop';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-dark text-light overflow-x-hidden relative">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Modalities />
                <Plans />
            </main>
            <Footer />
            <FloatingWhatsApp />
            <BackToTop />
        </div>
    );
};

export default Home;
