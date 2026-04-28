// Shared wedding event data for both Groom & Bride pages.
// Dates kept in ISO so .ics + countdowns remain unambiguous. IST is UTC+5:30.

const brideLocation = {
    label: "Hashim Nagar, Langar Houz, Hyderabad",
    address:
        "9-1-34/15/49, Shivalayam Rd, Hashim Nagar, Langar Houz, Hyderabad, Telangana 500008",
    maps: "https://www.google.co.in/maps/place/9-1-34%2F15%2F49,+Shivalayam+Rd,+Hashim+Nagar,+Langar+Houz,+Hyderabad,+Telangana+500008/@17.3742031,78.4202868,21z/data=!4m6!3m5!1s0x3bcb96570feae0a5:0x715a9bf13c14ff3e!8m2!3d17.374027!4d78.4204!16s%2Fg%2F11vyx9f076",
};

const groomLocation = {
    label: "LKV Abode, Hyderabad",
    address: "LKV Abode, Hyderabad, Telangana",
    maps: "https://www.google.co.in/maps/place/LKV+Abode/@17.3427657,78.5190213,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb99000bca3bb3:0x444e69b6f2133f8d!8m2!3d17.3427606!4d78.5215962!16s%2Fg%2F11y8yzlt2g",
};

const mantraVenue = {
    label: "Shree Mantra Convention, Hyderabad",
    address: "Shree Mantra Convention, Hyderabad, Telangana",
    maps: "https://www.google.co.in/maps/place/Shree+Mantra+convention/@17.2018176,78.3916126,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcbbb000a202957:0x949c9da035984a6d!8m2!3d17.2018125!4d78.3941875!16s%2Fg%2F11yf2nxnr1",
};

const gsrVenue = {
    label: "GSR Conventions, Hyderabad",
    address: "GSR Conventions, Hyderabad, Telangana",
    maps: "https://www.google.co.in/maps/place/GSR+Conventions/@17.3317692,78.5538788,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcba301e98091f7:0x76bbd05c63cd5bfe!8m2!3d17.3317692!4d78.5538788!16s%2Fg%2F11q3x47nk3",
};

// IST helper — builds a Date in UTC that corresponds to an IST wall time.
// 10:00 IST = 04:30 UTC, 18:00 IST = 12:30 UTC, 09:44 IST = 04:14 UTC, 19:00 IST = 13:30 UTC
const ist = (y, m, d, h, min) =>
    new Date(Date.UTC(y, m - 1, d, h - 5, min - 30));

export const weddingDate = ist(2026, 5, 8, 9, 44);

export const groomEvents = [
    {
        id: "haldi-groom",
        name: "Haldi",
        tagline: "A golden morning of blessings",
        date: ist(2026, 5, 3, 10, 0),
        dateLabel: "May 3, 2026",
        timeLabel: "10:00 AM",
        duration: 180,
        location: groomLocation,
        accent: "#f5c23e",
    },
    {
        id: "pelli-koduku",
        name: "Pelli Koduku",
        tagline: "The making of the groom",
        date: ist(2026, 5, 6, 18, 0),
        dateLabel: "May 6, 2026",
        timeLabel: "6:00 PM",
        duration: 180,
        location: groomLocation,
        accent: "#d4af37",
    },
    {
        id: "mehendi-groom",
        name: "Mehendi",
        tagline: "Tales written in henna",
        date: ist(2026, 5, 7, 10, 0),
        dateLabel: "May 7, 2026",
        timeLabel: "10:00 AM",
        duration: 240,
        location: groomLocation,
        accent: "#8a6b2e",
    },
    {
        id: "marriage",
        name: "Marriage",
        tagline: "Two souls, seven promises",
        date: ist(2026, 5, 8, 9, 44),
        dateLabel: "May 8, 2026",
        timeLabel: "9:44 AM",
        duration: 240,
        location: mantraVenue,
        accent: "#d4af37",
    },
    {
        id: "reception",
        name: "Reception",
        tagline: "Celebrate the new beginning",
        date: ist(2026, 5, 12, 19, 0),
        dateLabel: "May 12, 2026",
        timeLabel: "7:00 PM",
        duration: 240,
        location: gsrVenue,
        accent: "#780000",
    },
];

export const brideEvents = [
    {
        id: "haldi-bride",
        name: "Haldi",
        tagline: "A golden morning of blessings",
        date: ist(2026, 5, 6, 10, 0),
        dateLabel: "May 6, 2026",
        timeLabel: "10:00 AM",
        duration: 180,
        location: brideLocation,
        accent: "#f5c23e",
    },
    {
        id: "pelli-kuthuru",
        name: "Pelli Kuthuru",
        tagline: "The bride to be, adorned",
        date: ist(2026, 5, 6, 18, 0),
        dateLabel: "May 6, 2026",
        timeLabel: "6:00 PM",
        duration: 180,
        location: brideLocation,
        accent: "#c9a227",
    },
    {
        id: "mehendi-bride",
        name: "Mehendi",
        tagline: "Tales written in henna",
        date: ist(2026, 5, 7, 10, 0),
        dateLabel: "May 7, 2026",
        timeLabel: "10:00 AM",
        duration: 240,
        location: brideLocation,
        accent: "#8a6b2e",
    },
    {
        id: "marriage-bride",
        name: "Marriage",
        tagline: "Two souls, seven promises",
        date: ist(2026, 5, 8, 9, 44),
        dateLabel: "May 8, 2026",
        timeLabel: "9:44 AM",
        duration: 240,
        location: mantraVenue,
        accent: "#d4af37",
    },
    {
        id: "reception-bride",
        name: "Reception",
        tagline: "Celebrate the new beginning",
        date: ist(2026, 5, 12, 19, 0),
        dateLabel: "May 12, 2026",
        timeLabel: "7:00 PM",
        duration: 240,
        location: gsrVenue,
        accent: "#780000",
    },
];

export const groomProfile = {
    side: "groom",
    name: "Vishesh Kumar Vupputuri",
    shortName: "Vishesh",
    parentage: "S/o of Anantha Laxmi Vupputuri & Kalidas Vupputuri",
    accent: "#0b2b26",
    events: groomEvents,
};

export const brideProfile = {
    side: "bride",
    name: "Veeraja Rachamalla",
    shortName: "Veeraja",
    parentage: "D/o of Shailaja Rachamalla & Devender Rachamalla",
    accent: "#4a0404",
    events: brideEvents,
};
