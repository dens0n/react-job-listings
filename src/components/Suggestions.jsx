import { useState, useEffect } from "react";
import "./Suggestions.css"

const Suggestions = ({ searchTerm, onSuggestionClick }) => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await fetch(
                    `https://jobsearch.api.jobtechdev.se/search?q=${searchTerm}&limit=20`
                );
                const data = await response.json();

                // Filtrera bort dubletter från listan med förslag
                const uniqueSuggestions = data.hits
                    .map((job) => job.occupation.label)
                    .filter((value, index, self) => {
                        return self.indexOf(value) === index;
                    });

                setSuggestions(uniqueSuggestions);
            } catch (err) {
                console.error("Error fetching suggestions:", err);
            }
        };

        if (searchTerm.trim() !== "") {
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    return (
        <ul id="suggestion-list">
            {suggestions.map((suggestion, index) => (
                <li
                    key={index}
                    onClick={() => onSuggestionClick(suggestion)}
                    className="suggestion"
                >
                    {suggestion}
                </li>
            ))}
        </ul>
    );
};

export default Suggestions;
