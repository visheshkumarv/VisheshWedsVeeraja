import React from "react";
import ProfilePage from "./ProfilePage";
import { brideProfile } from "../data/events";

export const BridePage = () => (
    <ProfilePage
        profile={brideProfile}
        palette={{
            bg: "linear-gradient(180deg, #4a0404 0%, #780000 50%, #4a0404 100%)",
        }}
    />
);

export default BridePage;
