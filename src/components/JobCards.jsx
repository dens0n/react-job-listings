function JobCards(props) {
    const {
        id,
        company,
        logo,
        position,
        role,
        level,
        postedAt,
        contract,
        location,
        languages,
        tools,
    } = props;

    return (
        <div className="card" key={id}>
            <div className="job-info-container">
                <div className="job-info-text">
                    <h3>{position}</h3>
                    <p>
                        {company} - {location}
                    </p>
                    <p>{contract}</p>
                    <p>Publiched: {postedAt}</p>
                </div>
                <div className="job-role-text">
                    <p>
                        {level} {role.toLowerCase()} developer
                    </p>
                    <p>{languages.join(", ")}</p>
                </div>
            </div>
            <div className="company-logo-container">
                <img className="logo" src={logo} alt={company} />
            </div>
        </div>
    );
}

export default JobCards;
