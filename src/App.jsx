import React from "react";
import jobs from "./data";
import JobCards from "./components/JobCards";
import Nav from "./components/Nav";
import "./App.css";

function App() {
    return (
        <div>
            <Nav />
            <main>
                {jobs.map((job) => (
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
                <div>
                    <p>@copyright</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
