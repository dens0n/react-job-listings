import "./App.css";
import React, { useState } from "react";
import Search from "./components/Search";
import Home from "./components/pages/Home";
import SignUpPage from "./components/pages/SignUpPage";
import { auth } from "./firebase/firebase-config";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [searchQuery, setSearchQuery] = useState("stockholm");

    const handleSearch = (searchTerm) => {
        setSearchQuery(searchTerm);
    };

    return (
        <>
            <nav>
                <a href="#" onClick={() => window.location.reload()}>
                    <img
                        src="./assets/JobChaser-logo.svg"
                        alt="JobChaser Logo" // Provide a meaningful alt attribute
                        width={"100px"}
                    />
                </a>

                <Search onSearch={handleSearch} />
                <button>Log in</button>
                <button>Sign up</button>
            </nav>
            <Home searchQuery={searchQuery} />
            <SignUpPage />
            <footer>
                <p>@copyright</p>
            </footer>
        </>
    );
}

export default App;
