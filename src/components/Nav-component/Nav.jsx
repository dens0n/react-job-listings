import "./Nav.css";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search-component/Search";
import { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import JobChaserLogo from "./JobChaserLogo-component/JobChaserLogo";

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
                <JobChaserLogo />
                {/*  <img
                    src={"./assets/JobChaser-logo.svg"}
                    alt="JobChaser Logo"
                    width={100}
                    className="logo"
                    draggable={false}
                /> */}
            </Link>

            {/* Conditionally render the Search component based on the current location */}
            {location.pathname === "/" && <Search onSearch={handleSearch} />}
            <div className="button-container">
                {user ? (
                    <Link to="/favorites">
                        <button className="signin-signout-favorites-btn">
                            Favorites
                        </button>
                    </Link>
                ) : (
                    ""
                )}

                {user ? (
                    <button
                        onClick={handleSignOut}
                        className="signin-signout-favorites-btn"
                    >
                        Sign out
                    </button>
                ) : (
                    <>
                        {location.pathname !== "/signin" && (
                            <Link to="/signin">
                                <button className="signin-signout-favorites-btn">
                                    Log in
                                </button>
                            </Link>
                        )}
                        {location.pathname !== "/signup" && (
                            <Link to="/signup">
                                <button className="signin-signout-favorites-btn">
                                    Sign up
                                </button>
                            </Link>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
}

export default Nav;
