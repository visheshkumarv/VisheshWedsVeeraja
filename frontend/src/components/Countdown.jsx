import React, { useEffect, useState } from "react";
import { weddingDate } from "../data/events";

const calc = () => {
    const now = Date.now();
    const diff = Math.max(weddingDate.getTime() - now, 0);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
};

const Tile = ({ label, value }) => (
    <div
        className="countdown-tile flex flex-col items-center justify-center py-4 px-3 sm:px-5 min-w-[68px] sm:min-w-[96px]"
        data-testid={`countdown-${label.toLowerCase()}`}
    >
        <div
            className="font-heading text-3xl sm:text-5xl leading-none"
            style={{ color: "#FDFBF7" }}
        >
            {String(value).padStart(2, "0")}
        </div>
        <div
            className="mt-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase"
            style={{ color: "#D4AF37" }}
        >
            {label}
        </div>
    </div>
);

export const Countdown = () => {
    const [t, setT] = useState(calc());
    useEffect(() => {
        const id = setInterval(() => setT(calc()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div
            className="flex items-center justify-center gap-3 sm:gap-5"
            data-testid="countdown-timer"
        >
            <Tile label="Days" value={t.days} />
            <Tile label="Hrs" value={t.hours} />
            <Tile label="Mins" value={t.minutes} />
            <Tile label="Secs" value={t.seconds} />
        </div>
    );
};

export default Countdown;
