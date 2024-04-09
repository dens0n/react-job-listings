import React, { useState } from "react";
import regions from "../../regions/regions";
import { useDispatch, useSelector } from "react-redux";
import { setReduxMunicipality } from "../../store/slices/JobSlice";

export default function FilterRegion() {
    const dispatch = useDispatch();
    const [selectedRegion, setSelectedRegion] = useState("");
    const [municipalities, setMunicipalities] = useState([]);

    const handleFilterChange = (event) => {
        const selectedRegionValue = event.target.value;
        setSelectedRegion(selectedRegionValue);

        if (selectedRegionValue) {
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

    return (
        <div>
            <select name="location" onChange={handleFilterChange}>
                <option value="">Välj region</option>
                {Object.keys(regions).map((region) => (
                    <option value={region} key={region}>
                        {regions[region].name}
                    </option>
                ))}
            </select>
            <select
                name="municipalities"
                onChange={handleSelection}
                disabled={!selectedRegion}
            >
                <option value="">Välj kommun</option>
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
        </div>
    );
}
