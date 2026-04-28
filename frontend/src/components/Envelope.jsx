import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Monogram from "./Monogram";

/**
 * Full-screen envelope intro. Tap the seal to "open" the envelope:
 * - Wax seal shatters outward
 * - Top flap rotates open
 * - Stationery slides up and out
 * - onOpened() fires to transition into the landing hero.
 */
export const Envelope = ({ onOpened }) => {
    const [opened, setOpened] = useState(false);

    const handleOpen = () => {
        if (opened) return;
        setOpened(true);
        // Wait for animation to play, then notify parent.
        setTimeout(() => {
            onOpened && onOpened();
        }, 1800);
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{
                background:
                    "radial-gradient(circle at 50% 30%, #114b42 0%, #0b2b26 55%, #05201c 100%)",
            }}
            data-testid="envelope-screen"
        >
            <AnimatePresence>
                {!opened && (
                    <motion.p
                        key="instruction"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="absolute top-10 left-0 right-0 text-center text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold"
                        style={{ color: "#D4AF37" }}
                    >
                        An Invitation Awaits
                    </motion.p>
                )}
            </AnimatePresence>

            <motion.button
                onClick={handleOpen}
                initial={{ scale: 0.85, opacity: 0, y: 40 }}
                animate={{
                    scale: opened ? 1.15 : 1,
                    opacity: opened ? 0 : 1,
                    y: opened ? -80 : 0,
                }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative outline-none"
                style={{ width: "min(92vw, 520px)", aspectRatio: "1.6 / 1" }}
                data-testid="envelope-open-button"
                aria-label="Open the wedding invitation"
            >
                {/* envelope body */}
                <div
                    className="absolute inset-0 rounded-md envelope-shadow"
                    style={{
                        background:
                            "linear-gradient(180deg, #f4e6c8 0%, #e9d7a8 50%, #d6bf80 100%)",
                    }}
                />

                {/* decorative inner border */}
                <div
                    className="absolute inset-3 rounded-sm pointer-events-none"
                    style={{
                        border: "1px solid rgba(120, 0, 0, 0.35)",
                    }}
                />

                {/* bottom triangle (front pocket) */}
                <div
                    className="absolute inset-x-0 bottom-0 pointer-events-none"
                    style={{
                        height: "55%",
                        clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
                        background:
                            "linear-gradient(180deg, #e5cf94 0%, #c9ac5e 100%)",
                        transform: "translateY(0)",
                    }}
                />

                {/* left triangle */}
                <div
                    className="absolute inset-y-0 left-0 pointer-events-none"
                    style={{
                        width: "55%",
                        clipPath: "polygon(0 0, 0 100%, 100% 50%)",
                        background:
                            "linear-gradient(90deg, #e8d3a0 0%, #d1b573 100%)",
                        opacity: 0.75,
                    }}
                />
                {/* right triangle */}
                <div
                    className="absolute inset-y-0 right-0 pointer-events-none"
                    style={{
                        width: "55%",
                        clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                        background:
                            "linear-gradient(-90deg, #e8d3a0 0%, #d1b573 100%)",
                        opacity: 0.75,
                    }}
                />

                {/* top flap */}
                <motion.div
                    className="absolute inset-x-0 top-0 origin-top pointer-events-none"
                    style={{
                        height: "55%",
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        background:
                            "linear-gradient(180deg, #f4e6c8 0%, #d9c080 100%)",
                        transformOrigin: "50% 0%",
                        boxShadow: "0 2px 0 rgba(120,0,0,0.12) inset",
                    }}
                    animate={{
                        rotateX: opened ? 180 : 0,
                        y: opened ? -6 : 0,
                    }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* wax seal — absolutely centered in the envelope */}
                <div
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                >
                    <motion.div
                        className="rounded-full wax-seal flex items-center justify-center"
                        style={{ width: "24%", aspectRatio: "1 / 1" }}
                        animate={{
                            scale: opened ? 1.4 : 1,
                            opacity: opened ? 0 : 1,
                            rotate: opened ? -25 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <Monogram size={72} color="#F0E6D2" subtle />
                    </motion.div>
                </div>

                {/* shatter pieces */}
                {opened && (
                    <div
                        className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    >
                        <div className="relative">
                            {[...Array(8)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    className="absolute rounded-full"
                                    style={{
                                        width: 14,
                                        height: 14,
                                        left: -7,
                                        top: -7,
                                        background:
                                            "radial-gradient(circle at 30% 30%, #a31e1e, #4a0404)",
                                    }}
                                    initial={{ x: 0, y: 0, opacity: 1 }}
                                    animate={{
                                        x: Math.cos((i / 8) * Math.PI * 2) * 220,
                                        y: Math.sin((i / 8) * Math.PI * 2) * 220,
                                        opacity: 0,
                                        rotate: 360,
                                    }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <motion.p
                    className="absolute left-0 right-0 bottom-5 text-center text-[10px] sm:text-[11px] tracking-[0.4em] uppercase"
                    style={{ color: "#780000" }}
                    animate={{ opacity: opened ? 0 : 1 }}
                >
                    Tap to open
                </motion.p>
            </motion.button>
        </div>
    );
};

export default Envelope;
