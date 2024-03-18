import "./App.css";
import React, { useState, useEffect } from "react";
import Search from "./components/Search";

import JobCards from "./components/JobCards";

function App() {
    const [jobList, setJobList] = useState([]);
    const [query, setQuery] = useState("stockholm");
    const [noSearchResult, setNoSearchResult] = useState("");
    const limit = 20

    const handleSearch = (searchTerm) => {
        setQuery(searchTerm);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `https://jobsearch.api.jobtechdev.se/search?q=${query}&limit=${limit}`
                );
                const data = await res.json();
                setJobList(data.hits);
                console.log(data.hits[0]);
                if (data.hits[0] === undefined) {
                    setNoSearchResult("Inget sökresultat");
                } else {
                    setNoSearchResult("");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        if (query) {
            fetchData(query);
        }
    }, [query]);

    return (
        <>
            <nav>
                <img
                    src="./assets/JobChaser-logo.svg"
                    alt="JobChaser Logo" // Provide a meaningful alt attribute
                    width={"100px"}
                />
                <Search onSearch={handleSearch} />
            </nav>
            <main>
                {noSearchResult ? <h1>{noSearchResult}</h1> : ""}
                {jobList.map((job, index) => (
                    <JobCards
                        id={index}
                        key={job.id}
                        employer={job.employer.name}
                        logo={job.logo_url}
                        city={job.workplace_address.municipality}
                        occupation={job.occupation.label}
                        url={job.application_details.url}
                        backupURL={job.webpage_url}
                        headline={job.headline}
                        postedAt={job.publication_date.slice(0, 10)}
                        description={job.description.text_formatted}
                    />
                ))}
            </main>
            <footer>
                <p>@copyright</p>
            </footer>
        </>
    );
}

export default App;
