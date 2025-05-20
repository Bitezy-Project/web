import { Route, Routes } from "react-router-dom";
import { LocationsMap } from "./components/locations-map";
import {LocationsSearch} from "./components/locations-list";
import { LocationsDetails } from "./components/locations-details";
import { FeedbackCreate } from "./components/feedbacks-create";


export function Locations() {
    return (
        <div className="flex flex-col min-h-screen bg-white gap-4">
            <Routes>
                <Route path="/" element={< LocationsMap/>} />
                <Route path="/:categoria" element={<LocationsSearch />} />
                <Route path="/:categoria/:localId" element={<LocationsDetails />} />
                <Route path="/:categoria/:localId/feedbacks/create" element={<FeedbackCreate />} />
            </Routes>
        </div>
    );
}