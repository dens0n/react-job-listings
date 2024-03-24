import "./App.css";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate,
    Outlet,
} from "react-router-dom";
import React, { useContext, useState } from "react";
import Search from "./components/Search";
import Home from "./components/pages/Home";
import SignUpPage from "./components/pages/SignupPage";
import SignInPage from "./components/pages/SignInPage";
import Favorites from "./components/pages/Favorites";
import { AuthContext } from "./Context/AuthContext";

function ProtectedRoute() {
    const authContext = useContext(AuthContext);
    const isAuth = authContext && authContext.user !== null;
    console.log(isAuth);

    return isAuth ? <Outlet /> : <Navigate to="/signin" replace />;
}

function App() {
    const [searchQuery, setSearchQuery] = useState("stockholm");

    const handleSearch = (searchTerm) => {
        setSearchQuery(searchTerm);
    };

    return (
        <BrowserRouter>
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

                <Link to="/signin">
                    <button>Log in</button>
                </Link>

                <Link to="/signup">
                    <button>Sign up</button>
                </Link>
                <button>Sign out</button>
            </nav>

            <Routes>
                <Route path="/" element={<Home searchQuery={searchQuery} />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/favorites" element={<ProtectedRoute />}>
                    <Route path="/favorites" element={<Favorites />} />
                </Route>
            </Routes>

            <footer>
                <p>@copyright</p>
            </footer>
        </BrowserRouter>
    );
}

export default App;
