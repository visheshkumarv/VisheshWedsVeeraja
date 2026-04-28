import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, CalendarPlus, Check, X, Clock } from "lucide-react";
import { toast } from "sonner";
import { downloadICS } from "../lib/ics";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const EventCard = ({ event, side, expanded, onToggle }) => {
    const navigate = useNavigate();
    const [guestName, setGuestName] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const sendRSVP = async (status) => {
        setSubmitting(true);
        try {
            await axios.post(`${API}/rsvp`, {
                guest_name: guestName.trim() || "Anonymous Guest",
                side,
                event_id: event.id,
                event_name: event.name,
                status,
            });
        } catch (e) {
            console.error("rsvp failed", e);
        } finally {
            setSubmitting(false);
        }
    };

    const handleAttend = async () => {
        await sendRSVP("attending");
        downloadICS({
            uid: event.id,
            title: `${event.name} — Vishesh & Veeraja`,
            description: `${event.tagline}. Vupputuri family warmly welcomes you.`,
            location: `${event.location.label} — ${event.location.address}`,
            start: event.date,
            durationMinutes: event.duration || 180,
            filename: `${event.name.replace(/\s+/g, "_")}-Vishesh_Veeraja.ics`,
        });
        toast.success("Added to your calendar", {
            description: `${event.name} reminder downloaded as .ics`,
            duration: 3500,
        });
    };

    const handleDecline = async () => {
        await sendRSVP("not_attending");
        navigate("/thank-you");
    };

    return (
        <motion.div
            layout
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden arched-top border border-[rgba(212,175,55,0.35)]"
            style={{
                background:
                    "linear-gradient(180deg, rgba(17,75,66,0.85) 0%, rgba(11,43,38,0.95) 100%)",
            }}
            data-testid={`event-card-${event.id}`}
        >
            {/* Top accent ornament */}
            <div
                className="absolute top-5 left-1/2 -translate-x-1/2 w-14 h-[1px]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                }}
            />
            <div
                className="absolute top-[30px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                style={{ background: "#D4AF37" }}
            />

            <button
                onClick={onToggle}
                data-testid={`event-toggle-${event.id}`}
                className="relative w-full text-center pt-16 pb-6 px-6 focus:outline-none"
            >
                <p
                    className="text-[10px] tracking-[0.4em] uppercase"
                    style={{ color: event.accent }}
                >
                    Ceremony
                </p>
                <h3 className="mt-3 font-heading text-3xl sm:text-4xl gold-foil">
                    {event.name}
                </h3>
                <p
                    className="mt-2 font-script text-xl"
                    style={{ color: "#F0E6D2" }}
                >
                    {event.tagline}
                </p>
                <div
                    className="mt-5 flex items-center justify-center gap-4 text-sm"
                    style={{ color: "#FDFBF7" }}
                >
                    <span className="tracking-widest">{event.dateLabel}</span>
                    <span className="opacity-50">•</span>
                    <span className="flex items-center gap-1.5">
                        <Clock
                            className="w-3.5 h-3.5"
                            style={{ color: "#D4AF37" }}
                        />
                        {event.timeLabel}
                    </span>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="expanded"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45 }}
                        className="overflow-hidden border-t border-[rgba(212,175,55,0.2)]"
                    >
                        <div className="px-6 py-6 space-y-5">
                            <div className="flex items-start gap-3">
                                <MapPin
                                    className="w-4 h-4 mt-1 shrink-0"
                                    style={{ color: "#D4AF37" }}
                                />
                                <div className="text-sm" style={{ color: "#FDFBF7" }}>
                                    <div className="font-semibold tracking-wide">
                                        {event.location.label}
                                    </div>
                                    <div
                                        className="opacity-80 mt-0.5"
                                        style={{ color: "#A3A3A3" }}
                                    >
                                        {event.location.address}
                                    </div>
                                </div>
                            </div>

                            <a
                                href={event.location.maps}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 btn-outline-gold text-xs"
                                data-testid={`event-maps-${event.id}`}
                            >
                                <MapPin className="w-4 h-4" />
                                Open in Google Maps
                            </a>

                            <div className="pt-2">
                                <label
                                    className="text-[10px] tracking-[0.3em] uppercase"
                                    style={{ color: "#D4AF37" }}
                                >
                                    Your Name (optional)
                                </label>
                                <input
                                    value={guestName}
                                    onChange={(e) =>
                                        setGuestName(e.target.value)
                                    }
                                    placeholder="So we can note your RSVP"
                                    className="mt-2 w-full bg-transparent border-b border-[rgba(212,175,55,0.4)] focus:border-[#D4AF37] outline-none py-2 font-body text-sm text-ivory placeholder:text-[#A3A3A3]/60"
                                    data-testid={`event-guest-name-${event.id}`}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    disabled={submitting}
                                    onClick={handleAttend}
                                    className="btn-gold flex items-center justify-center gap-2 flex-1 disabled:opacity-70"
                                    data-testid={`event-attend-${event.id}`}
                                >
                                    <Check className="w-4 h-4" />
                                    <span>Attend · Add to Calendar</span>
                                    <CalendarPlus className="w-4 h-4" />
                                </button>
                                <button
                                    disabled={submitting}
                                    onClick={handleDecline}
                                    className="btn-outline-gold flex items-center justify-center gap-2 flex-1 disabled:opacity-70"
                                    data-testid={`event-decline-${event.id}`}
                                    style={{
                                        borderColor: "rgba(240,230,210,0.4)",
                                    }}
                                >
                                    <X className="w-4 h-4" />
                                    <span>Not Attending</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default EventCard;
