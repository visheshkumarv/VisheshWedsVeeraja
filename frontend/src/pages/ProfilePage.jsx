import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home as HomeIcon } from "lucide-react";
import EventCard from "../components/EventCard";
import Monogram from "../components/Monogram";

/**
 * Shared profile page component used by both Groom & Bride pages.
 * Renders events as a responsive grid where only one card can be expanded at a time.
 */
export const ProfilePage = ({ profile, palette }) => {
    const [expandedId, setExpandedId] = useState(null);

    return (
        <div
            className="min-h-screen w-full relative overflow-hidden"
            style={{
                background: palette.bg,
            }}
            data-testid={`${profile.side}-page`}
        >
            {/* decorative bg */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 15% 10%, rgba(212,175,55,0.15), transparent 50%), radial-gradient(circle at 85% 90%, rgba(212,175,55,0.1), transparent 50%)",
                }}
            />

            <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase hover:opacity-80"
                    style={{ color: "#D4AF37" }}
                    data-testid="back-home-link"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Home
                </Link>
                <Monogram size={50} color="#D4AF37" subtle />
            </nav>

            <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-8 pb-20 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    className="text-[10px] sm:text-xs tracking-[0.45em] uppercase"
                    style={{ color: "#D4AF37" }}
                >
                    {profile.side === "groom" ? "The Groom" : "The Bride"}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="mt-4 font-heading text-5xl sm:text-6xl md:text-7xl font-light gold-foil"
                    data-testid={`${profile.side}-name-heading`}
                >
                    {profile.name}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mt-4 font-script text-xl sm:text-2xl"
                    style={{ color: "#F0E6D2" }}
                    data-testid={`${profile.side}-parentage`}
                >
                    {profile.parentage}
                </motion.p>

                <div className="ornamental-divider mt-8 max-w-xs mx-auto">
                    <span
                        className="text-[10px] tracking-[0.4em] uppercase"
                        style={{ color: "#D4AF37" }}
                    >
                        Festivities
                    </span>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-6 text-sm sm:text-base max-w-xl mx-auto"
                    style={{ color: "#FDFBF7", opacity: 0.8 }}
                >
                    Tap a ceremony below to see the venue, RSVP, and add the
                    date to your calendar. We can't wait to celebrate with you.
                </motion.p>
            </section>

            <section className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 pb-24">
                <div
                    className="flex flex-col gap-6 sm:gap-8"
                    data-testid={`${profile.side}-events-grid`}
                >
                    {profile.events.map((ev) => (
                        <EventCard
                            key={ev.id}
                            event={ev}
                            side={profile.side}
                            expanded={expandedId === ev.id}
                            onToggle={() =>
                                setExpandedId((prev) =>
                                    prev === ev.id ? null : ev.id,
                                )
                            }
                        />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        to="/"
                        className="btn-outline-gold inline-flex items-center gap-2"
                        data-testid="return-home-btn"
                    >
                        <HomeIcon className="w-4 h-4" />
                        Return to Invitation
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;
