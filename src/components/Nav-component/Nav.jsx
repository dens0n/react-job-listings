import "./Nav.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Search from "./Search-component/Search";
import JobChaserLogo from "./JobChaserLogo-component/JobChaserLogo";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { setReduxMunicipality, reduxSearch } from "../../store/slices/JobSlice";

export default function Nav() {
    const dispatch = useDispatch();
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

    useEffect(() => {
        //Återställer region om man lämnar /joblisting
        if (location.pathname !== "/joblisting") {
            dispatch(setReduxMunicipality(""));
            dispatch(reduxSearch(""));
        }
    }, [location, dispatch]);

    return (
        <nav
            style={
                location.pathname === "/"
                    ? {
                          position: "fixed",
                          backgroundColor: "transparent",
                      }
                    : {}
            }
        >
            <Link to="/">
                <JobChaserLogo />
            </Link>

            {location.pathname === "/joblisting" && <Search />}
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
