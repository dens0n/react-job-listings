import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { reduxSearch } from "../store/slices/JobSlice";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import "./Search2.css";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Using useNavigate hook
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedSearchTerm = searchTerm.split(" ").join(",");
        console.log(formattedSearchTerm);
        dispatch(reduxSearch(searchTerm));
        setSearchTerm("");
        navigate("/joblisting"); // Navigate to /joblisting route
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <main
            style={
                location.pathname === "/"
                    ? {
                          backgroundImage: "url('./assets/workplace.jpg')",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          height: "100vh",
                      }
                    : {}
            }
        >
            <form
                style={{
                    margin: "auto",
                }}
                id="search-container"
                onSubmit={handleSubmit}
            >
                <div id="input-container">
                    <input
                        className="search-input"
                        type="text"
                        onChange={handleChange}
                        value={searchTerm}
                        placeholder="Search..."
                    />
                    {/* Removed Link wrapper */}
                    <button id="search-button" type="submit">
                        <FaSearch id="search-icon" />
                    </button>
                </div>
            </form>
        </main>
    );
}
