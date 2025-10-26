import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { AnimatedBackground } from './components/AnimatedBackground';
import { PageTransition } from './components/PageTransition';
import { SeaCreatures } from './components/SeaCreatures';
import { Loader } from './components/Loader';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const SpecialsPage = lazy(() => import('./pages/SpecialsPage'));
const ReservationsPage = lazy(() => import('./pages/ReservationsPage'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Define routes to map paths to their lazy-loaded components
const pageRoutes = [
    { path: '/', component: <HomePage /> },
    { path: '/menu', component: <MenuPage /> },
    { path: '/specials', component: <SpecialsPage /> },
    { path: '/reservations', component: <ReservationsPage /> },
    { path: '/order', component: <OrderPage /> },
    { path: '/about', component: <AboutPage /> },
    { path: '/contact', component: <ContactPage /> },
];

const AppContent: React.FC = () => {
    const location = useLocation();

    return (
        <div className="relative min-h-screen w-full font-sans text-deep-navy overflow-x-hidden">
            <AnimatedBackground />
            <SeaCreatures />
            
            <Header />

            <main className="relative z-10 pt-24 pb-12">
                <AnimatePresence mode="wait">
                    <Suspense fallback={<Loader />}>
                        <Routes location={location} key={location.pathname}>
                            {pageRoutes.map(({ path, component }) => (
                                <Route 
                                    key={path} 
                                    path={path} 
                                    element={
                                        <PageTransition>
                                            {component}
                                        </PageTransition>
                                    } 
                                />
                            ))}
                        </Routes>
                    </Suspense>
                </AnimatePresence>
            </main>

            <footer className="relative z-10 text-center p-4 text-deep-navy/50 text-sm">
                <p>&copy; {new Date().getFullYear()} AquaGrill. All Rights Reserved.</p>
            </footer>
        </div>
    );
};


const App: React.FC = () => (
    <HashRouter>
        <AppContent />
    </HashRouter>
);

export default App;
