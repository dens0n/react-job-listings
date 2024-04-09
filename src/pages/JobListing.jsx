import { useEffect, useState } from "react";
import JobCards from "../components/JobCards-component/JobCards";
import { setJobs } from "../store/slices/JobSlice";
import { useDispatch, useSelector } from "react-redux";

function JobListing() {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.jobs.search);
    const [loading, setLoading] = useState(false);
    const limit = 20;
    const jobs = useSelector((state) => state.jobs.jobs);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Sätt loading till true när data laddas
            try {
                const res = await fetch(
                    `https://jobsearch.api.jobtechdev.se/search?q=${searchQuery}&limit=${limit}`
                );
                const data = await res.json();
                dispatch(setJobs(data.hits));
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false); // Sätt loading till false när data har laddats
            }
        };

        if (searchQuery) {
            fetchData(searchQuery);
        }
    }, [searchQuery, dispatch]);

    return (
        <main>
            {loading && <h1>Laddar...</h1>}{" "}
            {/* Visa Loading... medan data laddas */}
            {!loading && jobs.length === 0 && <h1>Inget sökresultat</h1>}{" "}
            {/* Visa "Inget sökresultat" om det inte finns någon data och laddningen är klar */}
            {/* Visa jobblistan om laddningen är klar och det finns data */}
            {!loading &&
                jobs.map((job, index) => (
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

export default JobListing;
