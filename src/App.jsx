import "./App.css";
import React, { useState } from "react";
import Search from "./components/Search";
import jobData from "./data";
import JobCards from "./components/JobCards";

function App() {
    const [filteredJobs, setFilteredJobs] = useState(jobData);

    const handleSearch = (searchTerm) => {
        const filtered = jobData.filter((job) => {
            return (
                job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.contract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.postedAt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (job.languages &&
                    job.languages.some((language) =>
                        language
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    ))
            );
        });
        setFilteredJobs(filtered);
    };

    return (
        <>
            <nav>
                <img
                    src="./assets/JobChaser-logo.svg"
                    alt="JobChaser"
                    width={"100px"}
                />
                <Search onSearch={handleSearch} />
            </nav>
            <main>
                {filteredJobs.map((job) => (
                    <JobCards
                        key={job.id}
                        id={job.id}
                        company={job.company}
                        logo={job.logo}
                        position={job.position}
                        role={job.role}
                        level={job.level}
                        postedAt={job.postedAt}
                        contract={job.contract}
                        location={job.location}
                        languages={job.languages}
                        tools={job.tools}
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
