function Nav() {
    return (
        <nav>
            <img
                src="./assets/JobChaser-logo.svg"
                alt="JobChaser"
                width={"100px"}
            />
            <form action="submit" className="search-container">
                <input type="text" placeholder="Search..." />
            </form>
        </nav>
    );
}

export default Nav;
