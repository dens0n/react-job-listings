import "./App.css";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "./Context/AuthContext";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignupPage";
import SignInPage from "./pages/SignInPage";
import Favorites from "./pages/Favorites";
import Nav from "./components/Nav-component/Nav";

function ProtectedRoute() {
    const authContext = useContext(AuthContext);
    const isAuth = authContext && authContext.user !== null;

    return isAuth ? <Outlet /> : <Navigate to="/signin" replace />;
}

function App() {
    const [searchQuery, setSearchQuery] = useState("stockholm");

    const handleSearch = (searchTerm) => {
        setSearchQuery(searchTerm);
    };

    return (
        <BrowserRouter>
            <Nav handleSearch={handleSearch} />
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
