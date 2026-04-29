import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "../components/Envelope";
import Countdown from "../components/Countdown";
import SplitModal from "../components/SplitModal";
import Monogram from "../components/Monogram";

const HERO_IMG = `${process.env.PUBLIC_URL}/DSC07099.jpg`;

const Petals = () => {
    const petals = Array.from({ length: 14 });
    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden
        >
            {petals.map((_, i) => {
                const left = Math.random() * 100;
                const delay = Math.random() * 8;
                const duration = 10 + Math.random() * 10;
                const size = 10 + Math.random() * 12;
                return (
                    <span
                        key={i}
                        className="petal"
                        style={{
                            left: `${left}%`,
                            width: size,
                            height: size,
                            animationDelay: `${delay}s`,
                            animationDuration: `${duration}s`,
                        }}
                    />
                );
            })}
        </div>
    );
};

export const Home = () => {
    // If the envelope has been opened in this session (user came back from
    // thank-you page or refreshed), skip the envelope intro.
    const [opened, setOpened] = useState(() => {
        try {
            return sessionStorage.getItem("envelopeOpened") === "true";
        } catch (_) {
            return false;
        }
    });
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (opened) {
            try {
                sessionStorage.setItem("envelopeOpened", "true");
            } catch (_) {}
        }
    }, [opened]);

    return (
        <div className="relative min-h-screen w-full overflow-hidden" data-testid="home-page">
            <AnimatePresence mode="wait">
                {!opened && (
                    <motion.div
                        key="env"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 z-40"
                    >
                        <Envelope onOpened={() => setOpened(true)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {opened && (
                    <motion.section
                        key="landing"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative min-h-screen w-full"
                        data-testid="landing-hero"
                    >
                        {/* Background image (responsive: cover + center on all sizes, with parallax-safe height) */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${HERO_IMG})`,
                                backgroundAttachment: "scroll",
                            }}
                        />
                        {/* Overlays — stronger at bottom for mobile legibility */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    "linear-gradient(180deg, rgba(5,32,28,0.78) 0%, rgba(11,43,38,0.86) 50%, rgba(5,32,28,0.96) 100%)",
                            }}
                        />
                        <Petals />

                        {/* Content */}
                        <div className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center px-5 sm:px-6 py-16 sm:py-20 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 1 }}
                            >
                                <Monogram size={120} color="#F0E6D2" />
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 1 }}
                                className="mt-8 text-[11px] sm:text-xs tracking-[0.45em] uppercase"
                                style={{ color: "#D4AF37" }}
                                data-testid="welcome-overline"
                            >
                                Vupputuri family welcomes you
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="mt-6 font-heading font-light leading-[0.95] text-[40px] sm:text-7xl md:text-8xl flex flex-wrap items-center justify-center gap-x-3 gap-y-2 max-w-full break-words"
                                data-testid="couple-name-heading"
                            >
                                <span className="gold-foil">Vishesh</span>
                                <span
                                    className="font-script text-3xl sm:text-6xl align-middle"
                                    style={{ color: "#F0E6D2" }}
                                >
                                    &amp;
                                </span>
                                <span className="gold-foil">Veeraja</span>
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="ornamental-divider mt-6 max-w-sm mx-auto w-full"
                            >
                                <span className="text-xs tracking-[0.4em] uppercase">
                                    May 8, 2026
                                </span>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.1, duration: 1 }}
                                className="mt-4 text-sm sm:text-base max-w-lg"
                                style={{ color: "#FDFBF7", opacity: 0.82 }}
                            >
                                Two families. Seven vows. A lifetime of celebration — we
                                would be honoured to have you with us.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.3, duration: 1 }}
                                className="mt-12"
                            >
                                <Countdown />
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.6, duration: 1 }}
                                onClick={() => setModalOpen(true)}
                                className="btn-gold mt-14"
                                data-testid="lets-celebrate-button"
                            >
                                Let's Celebrate
                            </motion.button>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.9, duration: 1 }}
                                className="mt-8 text-[10px] tracking-[0.35em] uppercase"
                                style={{ color: "#D4AF37", opacity: 0.8 }}
                            >
                                Hyderabad · India
                            </motion.p>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            <SplitModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
};

export default Home;
