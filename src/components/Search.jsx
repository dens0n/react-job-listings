import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.css"
import Suggestions from "./Suggestions";

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = (suggestion) => {
        setSearchTerm(suggestion);
        onSearch(suggestion);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form id="search-container" onSubmit={handleSubmit}>
            <div id="input-container">
                <input
                    type="text"
                    onChange={handleInputChange}
                    value={searchTerm}
                    placeholder="Search..."
                />
                <button id="search-button" type="submit">
                    <FaSearch id="search-icon" />
                </button>
            </div>
            {searchTerm && (
                <Suggestions
                    searchTerm={searchTerm}
                    onSuggestionClick={handleSearch}
                />
            )}
        </form>
    );
}

export default Search;
