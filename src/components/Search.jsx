import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <form id="search-container">
            <input
                type="text"
                onChange={handleChange}
                value={searchTerm}
                placeholder="Search..."
            />
            <button id="search-button" type="submit">
                <FaSearch id="search-icon" />
            </button>
        </form>
    );
}

export default Search;
