import React from "react";

/**
 * Ornamental V&V monogram used on the wax seal & as a standalone crest.
 * Pure SVG so it scales crisply across devices.
 */
export const Monogram = ({ size = 120, color = "#F0E6D2", subtle = false }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            data-testid="vv-monogram"
            style={{ display: "block" }}
        >
            <defs>
                <radialGradient id="mg-glow" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#F4E6B8" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#F4E6B8" stopOpacity="0" />
                </radialGradient>
            </defs>
            {!subtle && (
                <circle cx="60" cy="60" r="56" fill="url(#mg-glow)" />
            )}
            {/* outer ornamental ring */}
            <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={color}
                strokeOpacity="0.85"
                strokeWidth="1.2"
            />
            <circle
                cx="60"
                cy="60"
                r="46"
                fill="none"
                stroke={color}
                strokeOpacity="0.55"
                strokeWidth="0.7"
                strokeDasharray="2 3"
            />

            {/* flourish top */}
            <path
                d="M30 32 Q60 14 90 32"
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeOpacity="0.8"
            />
            <circle cx="60" cy="19" r="1.8" fill={color} />

            {/* flourish bottom */}
            <path
                d="M30 88 Q60 106 90 88"
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeOpacity="0.8"
            />
            <circle cx="60" cy="101" r="1.8" fill={color} />

            {/* V & V letters — centered using text-anchor="middle" */}
            <g fill={color} textAnchor="middle">
                <text
                    x="38"
                    y="74"
                    fontFamily="Cormorant Garamond, serif"
                    fontSize="42"
                    fontWeight="500"
                >
                    V
                </text>
                <text
                    x="60"
                    y="70"
                    fontFamily="Great Vibes, cursive"
                    fontSize="28"
                >
                    &amp;
                </text>
                <text
                    x="82"
                    y="74"
                    fontFamily="Cormorant Garamond, serif"
                    fontSize="42"
                    fontWeight="500"
                >
                    V
                </text>
            </g>
        </svg>
    );
};

export default Monogram;
