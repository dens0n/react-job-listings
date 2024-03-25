import { useState,useEffect } from "react";
import JobCards from "../components/JobCards-component/JobCards"

function Home({searchQuery}) {

    const [jobList, setJobList] = useState([]);
    const [noSearchResult, setNoSearchResult] = useState("");
    const limit = 20;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `https://jobsearch.api.jobtechdev.se/search?q=${searchQuery}&limit=${limit}`
                );
                const data = await res.json();
                setJobList(data.hits);
                if (data.hits[0] === undefined) {
                    setNoSearchResult("Inget sökresultat");
                } else {
                    setNoSearchResult("");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        if (searchQuery) {
            fetchData(searchQuery);
        }
    }, [searchQuery]);

    return (
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
    );
}

export default Home;
