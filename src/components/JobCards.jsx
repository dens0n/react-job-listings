import { FaStar, FaRegStar, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useState } from "react";

function JobCards(props) {
    const {
        id,
        employer,
        logo,
        city,
        occupation,
        url,
        backupURL,
        headline,
        postedAt,
        description,
    } = props;

    const [isFavorite, setIsFavorite] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    function isHTML(str) {
        const doc = new DOMParser().parseFromString(str, "text/html");
        return Array.from(doc.body.childNodes).some(
            (node) => node.nodeType === 1
        );
    }

    // Funktion för att göra länkar klickbara
    const makeLinksClickable = (text) => {
        return text.replace(
            /((https?|ftp):\/\/[^\s/$.?#].[^\s]*)/g,
            ' <a class="regular-url" href="$1" target="_blank">$1</a>'
        );
    };

    return (
        <>
            <div className="card-container" id={id}>
                <div className="basic-info-container">
                    <div className="job-info-container">
                        <a
                            className="headline-url"
                            href={url ? url : backupURL}
                        >
                            {headline ? headline : ""}
                        </a>
                        <p className="employer-name">
                            {employer} - {city}
                        </p>
                        <p>{occupation ? occupation : ""}</p>
                        <p>{postedAt ? `Publicerad: ${postedAt}` : ""}</p>
                    </div>
                    <div className="favorite-show-more-container">
                        {isFavorite ? (
                            <FaStar
                                onClick={toggleFavorite}
                                size={24}
                                color="blue"
                            />
                        ) : (
                            <FaRegStar
                                onClick={toggleFavorite}
                                size={24}
                                color="blue"
                            />
                        )}
                        <button
                            className="show-more-button"
                            onClick={toggleShowMore}
                        >
                            {showMore ? "Visa mindre" : "Visa mer"}{" "}
                            {showMore ? (
                                <FaAngleUp size={24} />
                            ) : (
                                <FaAngleDown size={24} />
                            )}
                        </button>
                    </div>
                </div>
                {showMore && description && (
                    <div className="description-container">
                        <strong>Beskrivning:</strong>
                        <br />
                        <br />
                        {isHTML(description) ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            />
                        ) : (
                            <p
                                style={{ whiteSpace: "pre-line" }}
                                dangerouslySetInnerHTML={{
                                    __html: makeLinksClickable(description),
                                }}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default JobCards;
