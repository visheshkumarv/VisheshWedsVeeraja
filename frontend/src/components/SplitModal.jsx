import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Monogram from "./Monogram";

/**
 * Vertically split modal: Groom (left, emerald) | Bride (right, maroon).
 * Hovering a side expands its width; clicking navigates to that profile page.
 */
export const SplitModal = ({ open, onClose }) => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(null); // 'groom' | 'bride' | null

    const goGroom = () => navigate("/groom");
    const goBride = () => navigate("/bride");

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col sm:flex-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    data-testid="split-modal"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 z-20 rounded-full p-2 border border-white/20 hover:bg-white/10 transition"
                        aria-label="Close"
                        data-testid="split-modal-close"
                    >
                        <X className="w-5 h-5 text-ivory" color="#FDFBF7" />
                    </button>

                    {/* GROOM SIDE */}
                    <motion.button
                        onMouseEnter={() => setHover("groom")}
                        onMouseLeave={() => setHover(null)}
                        onClick={goGroom}
                        data-testid="choose-groom-side"
                        className="relative overflow-hidden flex-1 text-left"
                        animate={{
                            flexGrow:
                                hover === "groom"
                                    ? 1.3
                                    : hover === "bride"
                                      ? 0.7
                                      : 1,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            background:
                                "linear-gradient(135deg, #0b2b26 0%, #114b42 100%)",
                        }}
                    >
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at 20% 30%, rgba(212,175,55,0.18), transparent 50%)",
                            }}
                        />
                        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-10 text-center">
                            <Monogram size={64} color="#D4AF37" subtle />
                            <p
                                className="mt-6 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
                                style={{ color: "#D4AF37" }}
                            >
                                The Groom
                            </p>
                            <h2
                                className="mt-3 font-heading text-3xl sm:text-6xl md:text-7xl font-light gold-foil"
                                data-testid="groom-side-name"
                            >
                                Vishesh Kumar
                            </h2>
                            <p
                                className="mt-3 font-script text-xl sm:text-3xl"
                                style={{ color: "#F0E6D2" }}
                            >
                                Vupputuri
                            </p>
                            <span className="mt-8 sm:mt-12 btn-outline-gold inline-block text-[11px] sm:text-xs">
                                Enter Groom's Side
                            </span>
                        </div>
                    </motion.button>

                    {/* center divider with ornament */}
                    <div className="hidden sm:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-20 items-center pointer-events-none">
                        <div
                            className="h-full w-[1px]"
                            style={{
                                background:
                                    "linear-gradient(180deg, transparent, rgba(212,175,55,0.7), transparent)",
                            }}
                        />
                    </div>

                    {/* BRIDE SIDE */}
                    <motion.button
                        onMouseEnter={() => setHover("bride")}
                        onMouseLeave={() => setHover(null)}
                        onClick={goBride}
                        data-testid="choose-bride-side"
                        className="relative overflow-hidden flex-1 text-left"
                        animate={{
                            flexGrow:
                                hover === "bride"
                                    ? 1.3
                                    : hover === "groom"
                                      ? 0.7
                                      : 1,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            background:
                                "linear-gradient(135deg, #4a0404 0%, #780000 100%)",
                        }}
                    >
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at 80% 30%, rgba(240,230,210,0.2), transparent 50%)",
                            }}
                        />
                        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
                            <Monogram size={80} color="#F0E6D2" subtle />
                            <p
                                className="mt-8 text-[10px] sm:text-xs tracking-[0.4em] uppercase"
                                style={{ color: "#F0E6D2" }}
                            >
                                The Bride
                            </p>
                            <h2
                                className="mt-4 font-heading text-4xl sm:text-6xl md:text-7xl font-light gold-foil"
                                data-testid="bride-side-name"
                            >
                                Veeraja
                            </h2>
                            <p
                                className="mt-4 font-script text-2xl sm:text-3xl"
                                style={{ color: "#F0E6D2" }}
                            >
                                Rachamalla
                            </p>
                            <span className="mt-12 btn-outline-gold inline-block">
                                Enter Bride's Side
                            </span>
                        </div>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplitModal;
