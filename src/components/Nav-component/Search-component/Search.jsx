import { useState, useEffect } from "react";
import { reduxSearch } from "../../../store/slices/JobSlice";
import { useDispatch } from "react-redux";

import { FaSearch } from "react-icons/fa";
import "./Search.css";
import Suggestions from "./Suggestions-component/Suggestions";

function Search() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchSuggestions = async (inputValue) => {
            try {
                const response = await fetch(
                    `https://jobsearch.api.jobtechdev.se/search?q=${inputValue}&limit=5`
                );
                const data = await response.json();

                const uniqueSuggestions = data.hits
                    .map((job) =>
                        job.occupation_group.label.replace(/\s*m\.fl\.\s*$/, "")
                    )
                    .filter((value, index, self) => {
                        return self.indexOf(value) === index;
                    });

                if (isMounted) {
                    setSuggestions(uniqueSuggestions);
                }
            } catch (err) {
                console.error("Error fetching suggestions:", err);
            }
        };

        if (searchTerm.trim() !== "") {
            fetchSuggestions(searchTerm);
        } else {
            setSuggestions([]);
        }

        return () => {
            isMounted = false;
        };
    }, [searchTerm]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === "") setSuggestions([]);
    };

    const handleSuggestionClick = (suggestion) => {
        dispatch(reduxSearch(suggestion));
        setSearchTerm("");
        setSuggestions([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(reduxSearch(searchTerm));
        setSuggestions([]);
        setSearchTerm("");
    };

    return (
        <form id="search-container" onSubmit={handleSubmit}>
            <div id="input-container">
                <input
                    className="search-input"
                    type="text"
                    onChange={handleChange}
                    value={searchTerm}
                    placeholder="Search..."
                />
                <button id="search-button" type="submit">
                    <FaSearch id="search-icon" />
                </button>
            </div>
            {suggestions.length > 0 && (
                <Suggestions
                    suggestions={suggestions}
                    onSuggestionClick={handleSuggestionClick}
                />
            )}
        </form>
    );
}

export default Search;
