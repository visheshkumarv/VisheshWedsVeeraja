import React from "react";
import ProfilePage from "./ProfilePage";
import { groomProfile } from "../data/events";

export const GroomPage = () => (
    <ProfilePage
        profile={groomProfile}
        palette={{
            bg: "linear-gradient(180deg, #0b2b26 0%, #114b42 50%, #0b2b26 100%)",
        }}
    />
);

export default GroomPage;
