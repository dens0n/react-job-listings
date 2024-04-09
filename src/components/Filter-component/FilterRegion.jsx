import "./FilterRegion.css";
import React, { useState } from "react";
import regions from "../../regions/regions";
import { useDispatch } from "react-redux";
import {
    setReduxMunicipality,
    setEmploymentTypeFilter,
} from "../../store/slices/JobSlice";

export default function FilterRegion() {
    const dispatch = useDispatch();
    const [selectedRegion, setSelectedRegion] = useState("");
    const [municipalities, setMunicipalities] = useState([]);
    const [employmentType, setEmploymentType] = useState("");

    const handleFilterChange = (event) => {
        const selectedRegionValue = event.target.value;
        setSelectedRegion(selectedRegionValue);

        if (selectedRegionValue === "all") {
            setMunicipalities([]);
            dispatch(setReduxMunicipality("")); // Nollställ municipality
        } else if (selectedRegionValue) {
            const municipalitiesArray = Object.keys(
                regions[selectedRegionValue].municipalities
            );
            setMunicipalities(municipalitiesArray);
        } else {
            setMunicipalities([]);
        }
    };

    const handleSelection = (e) => {
        const selectedMunicipalityValue = e.target.value;
        dispatch(setReduxMunicipality(selectedMunicipalityValue));
    };

    const handleEmploymentTypeChange = (event) => {
        const { value } = event.target;
        setEmploymentType(value);
        dispatch(setEmploymentTypeFilter(value)); // Skicka den valda filtreringsstatusen till Redux store
    };

    return (
        <div className="selection-container">
            <select
                className="location-selection"
                name="region"
                onChange={handleFilterChange}
            >
                <option disabled value="">
                    Välj region
                </option>
                <option value="all">Alla ragioner</option>
                {Object.keys(regions).map((region) => (
                    <option value={region} key={region}>
                        {regions[region].name}
                    </option>
                ))}
            </select>
            <select
                className="location-selection"
                name="municipalities"
                onChange={handleSelection}
                disabled={!selectedRegion}
            >
                <option disabled value="">
                    Välj kommun
                </option>
                {municipalities.length > 0 ? (
                    municipalities.map((municipality) => (
                        <option value={municipality} key={municipality}>
                            {
                                regions[selectedRegion].municipalities[
                                    municipality
                                ]
                            }
                        </option>
                    ))
                ) : (
                    <option disabled>Inga tillgängliga kommuner</option>
                )}
            </select>
            {location.pathname === "/" ? (
                ""
            ) : (
                <select
                    className="location-selection"
                    id="employment-type"
                    value={employmentType}
                    onChange={handleEmploymentTypeChange}
                >
                    <option disabled value="">
                        Anställningstyp
                    </option>
                    <option value="">Alla</option>
                    <option value="heltid">Heltid</option>
                    <option value="deltid">Deltid</option>
                </select>
            )}
        </div>
    );
}
