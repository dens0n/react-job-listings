import "./Nav.css";

import { Link } from "react-router-dom";
import Search from "../Search-component/Search";

function Nav({ handleSearch }) {
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

            <Link to="/signin">
                <button>Log in</button>
            </Link>

            <Link to="/signup">
                <button>Sign up</button>
            </Link>
            <button>Sign out</button>
        </nav>
    );
}

export default Nav;
