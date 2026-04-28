// Lightweight .ics file generator for calendar reminders.

const pad = (n) => String(n).padStart(2, "0");

const toICSDate = (date) => {
    const d = new Date(date);
    return (
        d.getUTCFullYear() +
        pad(d.getUTCMonth() + 1) +
        pad(d.getUTCDate()) +
        "T" +
        pad(d.getUTCHours()) +
        pad(d.getUTCMinutes()) +
        pad(d.getUTCSeconds()) +
        "Z"
    );
};

const escapeText = (s = "") =>
    s
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;");

export const buildICS = ({
    uid,
    title,
    description,
    location,
    start,
    durationMinutes = 180,
}) => {
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
    const stamp = toICSDate(new Date());
    const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Vupputuri Wedding//Invitation//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `UID:${uid}@vupputuri-wedding`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${toICSDate(start)}`,
        `DTEND:${toICSDate(end)}`,
        `SUMMARY:${escapeText(title)}`,
        `DESCRIPTION:${escapeText(description)}`,
        `LOCATION:${escapeText(location)}`,
        "BEGIN:VALARM",
        "TRIGGER:-PT1H",
        "ACTION:DISPLAY",
        `DESCRIPTION:${escapeText(title)}`,
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR",
    ];
    return lines.join("\r\n");
};

export const downloadICS = ({
    uid,
    title,
    description,
    location,
    start,
    durationMinutes,
    filename,
}) => {
    const ics = buildICS({
        uid,
        title,
        description,
        location,
        start,
        durationMinutes,
    });
    const blob = new Blob([ics], {
        type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || `${title.replace(/\s+/g, "_")}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 500);
};
