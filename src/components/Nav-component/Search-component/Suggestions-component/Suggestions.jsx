import React from "react";
import "./Suggestions.css";

const Suggestions = ({ suggestions, onSuggestionClick }) => {
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
