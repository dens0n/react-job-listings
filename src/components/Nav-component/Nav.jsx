import "./Nav.css";

import { Link } from "react-router-dom";
import Search from "./Search-component/Search";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { signOut, onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged
import { auth } from "../../firebase/firebase-config";

function Nav({ handleSearch }) {
    const [user, setUser] = useState(null); // State to hold the user authentication status

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Update the user state when the authentication state changes
        });

        return () => unsubscribe(); // Unsubscribe from the authentication state listener when component unmounts
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
                // Additional actions after sign out, such as redirecting to another page
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    return (
        <nav>
            <Link to="/">
                <img
                    src="./assets/JobChaser-logo.svg"
                    alt="JobChaser Logo"
                    width={"100px"}
                    draggable="false"
                />
            </Link>

            <Search onSearch={handleSearch} />

            <Link to="/favorites">
                <button>Favorites</button>
            </Link>

            {/* Conditionally render the Log in button based on user authentication state */}
            {user ? (
                <button onClick={handleSignOut}>Sign out</button>
            ) : (
                <>
                    <Link to="/signin">
                        <button>Log in</button>
                    </Link>
                    <Link to="/signup">
                        <button>Sign up</button>
                    </Link>
                </>
            )}
        </nav>
    );
}

export default Nav;
