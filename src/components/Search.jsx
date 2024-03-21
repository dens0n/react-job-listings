import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.css";
import Suggestions from "./Suggestions";
import Fuse from "fuse.js";

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async (inputValue) => {
            try {
                const response = await fetch(
                    `https://jobsearch.api.jobtechdev.se/search?q=${inputValue}&limit=100`
                );
                const data = await response.json();

                const fuse = (data) => {
                    const fusedData = new Fuse(data, {
                        keys: [
                            "occupation.label",
                            "workplace_address.municipality",
                        ],
                        threshold: 0.1,
                    });
                    const searchResults = fusedData.search(searchTerm);
                    console.log(searchResults);
                    console.log(fusedData)
                };
                fuse(data)
            } catch (err) {
                console.error("Error fetching suggestions:", err);
            }
        };

        if (searchTerm.trim() !== "") {
            fetchSuggestions(searchTerm);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === "") setSuggestions([]);
    };

    const handleSuggestionClick = (suggestion) => {
        onSearch(suggestion);
        setSuggestions([]);
        setSearchTerm("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        setSuggestions([]);
    };

    return (
        <form id="search-container" onSubmit={handleSubmit}>
            <div id="input-container">
                <input
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