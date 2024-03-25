import "./Nav.css";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search-component/Search";
import { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

function Nav({ handleSearch }) {
    const [user, setUser] = useState(null);
    const location = useLocation(); // Get the current location using useLocation hook

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
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

            {/* Conditionally render the Search component based on the current location */}
            {location.pathname === "/" && <Search onSearch={handleSearch} />}

            {user ? (
                <Link to="/favorites">
                    <button>Favorites</button>
                </Link>
            ) : (
                ""
            )}

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
