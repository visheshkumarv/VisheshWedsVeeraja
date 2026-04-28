import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Monogram from "../components/Monogram";

const REDIRECT_MS = 6000;

export const ThankYou = () => {
    const navigate = useNavigate();
    const [remaining, setRemaining] = useState(
        Math.ceil(REDIRECT_MS / 1000),
    );

    const goCelebrate = () => {
        // Mark envelope as already opened so Home skips straight to the
        // "Let's Celebrate" landing instead of showing the envelope again.
        try {
            sessionStorage.setItem("envelopeOpened", "true");
        } catch (_) {}
        navigate("/");
    };

    useEffect(() => {
        const tick = setInterval(() => {
            setRemaining((r) => (r > 0 ? r - 1 : 0));
        }, 1000);
        const redirect = setTimeout(() => {
            goCelebrate();
        }, REDIRECT_MS);
        return () => {
            clearInterval(tick);
            clearTimeout(redirect);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center px-6 text-center"
            style={{
                background:
                    "radial-gradient(circle at 50% 30%, #114b42 0%, #0b2b26 55%, #05201c 100%)",
            }}
            data-testid="thank-you-page"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-xl mx-auto flex flex-col items-center"
            >
                <Monogram size={110} color="#F0E6D2" />
                <p
                    className="mt-8 text-[11px] tracking-[0.45em] uppercase"
                    style={{ color: "#D4AF37" }}
                >
                    With Gratitude
                </p>
                <h1
                    className="mt-5 font-heading font-light text-5xl sm:text-6xl gold-foil"
                    data-testid="thank-you-heading"
                >
                    Thank You
                </h1>
                <p
                    className="mt-4 font-script text-2xl sm:text-3xl"
                    style={{ color: "#F0E6D2" }}
                >
                    for letting us know
                </p>
                <p
                    className="mt-6 text-sm sm:text-base max-w-md mx-auto"
                    style={{ color: "#FDFBF7", opacity: 0.85 }}
                >
                    We'll miss your presence, but you'll be in our hearts on
                    our special day. You will be redirected to the invitation
                    in a moment.
                </p>

                <div
                    className="ornamental-divider mt-8 max-w-xs mx-auto"
                    data-testid="redirect-counter"
                >
                    <span
                        className="text-[10px] tracking-[0.4em] uppercase"
                        style={{ color: "#D4AF37" }}
                    >
                        Returning in {remaining}s
                    </span>
                </div>

                <button
                    onClick={goCelebrate}
                    className="btn-outline-gold mt-10"
                    data-testid="thank-you-home-btn"
                >
                    Return to Celebration
                </button>
            </motion.div>
        </div>
    );
};

export default ThankYou;
