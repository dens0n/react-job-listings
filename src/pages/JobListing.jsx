import { useEffect, useState } from "react";
import JobCards from "../components/JobCards-component/JobCards";
import { setJobs } from "../store/slices/JobSlice";
import { useDispatch, useSelector } from "react-redux";

function JobListing() {
    const limit = 100;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const searchQuery = useSelector((state) => state.jobs.search);
    const jobs = useSelector((state) => state.jobs.jobs);
    const [openCardId, setOpenCardId] = useState(null); // Tillstånd för att hålla reda på ID:t för det öppna kortet

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://jobsearch.api.jobtechdev.se/search?q=${searchQuery}&limit=${limit}`
                );
                const data = await res.json();
                dispatch(setJobs(data.hits));
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery) {
            fetchData(searchQuery);
        }
    }, [searchQuery, dispatch]);

    const handleOpenCard = (id) => {
        setOpenCardId(openCardId === id ? null : id); // Uppdatera ID:t för det öppna kortet
    };

    return (
        <main>
            {loading && <h1>Laddar...</h1>}
            {!loading && jobs.length === 0 && <h1>Inget sökresultat</h1>}
            {!loading &&
                jobs.map((job, index) => (
                    <JobCards
                        handleOpenCard={handleOpenCard}
                        isOpen={openCardId === index}
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
