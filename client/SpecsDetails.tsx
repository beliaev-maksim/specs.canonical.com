import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { SpecDetails, Metadata, MoreSpecDetails } from "./types";
import { Spinner, Switch } from "@canonical/react-components";
import ErrorComponent from "./Error";

interface SpecDetailsProps {
  moreSpecDetails: MoreSpecDetails;
  setViewSpecsDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpecsDetails: React.FC<SpecDetailsProps> = ({
  moreSpecDetails,
  setViewSpecsDetails,
}) => {
  const { fileID, folderName, lastEdited } = moreSpecDetails;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [specDetails, setSpecDetails] = useState<SpecDetails>({
    html: "",
    metadata: {} as Metadata,
    url: "",
  });

  useEffect(() => {
    // fetch document with respective ID
    const fetchDocument = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${location.origin}/spec/${fileID}`);
        const specDetails = await response.json();
        if (response.ok) {
          setSpecDetails(specDetails);
        } else {
          setError(specDetails.message);
        }
      } catch {
        setError("Error. Something went wrong.");
      }
      setLoading(false);
    };

    fetchDocument();

    // add class name to body when component mounts
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("side-drawer-open");

    // remove class name from body when component unmounts
    return () => {
      body.classList.remove("side-drawer-open");
    };
  }, []);

  return (
    <>
      <div
        className="spec-aside-backdrop"
        onClick={() => setViewSpecsDetails(false)}
      />
      <aside className="spec-aside l-aside is-wide">
        <div className="spec-container">
          {error ? (
            <ErrorComponent error={error} />
          ) : loading ? (
            <div className="spinner-container">
              <Spinner text="Loading..." />
            </div>
          ) : (
            <>
              <section className="p-strip is-bordered is-shallow">
                <small className="spec-card__metadata-list">
                  <ul className="header p-inline-list--middot u-no-margin--bottom">
                    <li className="p-inline-list__item">
                      {specDetails.metadata.index}
                    </li>
                    <li className="p-inline-list__item">{folderName}</li>
                    <li className="p-inline-list__item metadata-type">
                      {specDetails.metadata.type}
                    </li>
                  </ul>
                </small>
                <button
                  className="p-modal__close"
                  aria-label="Close spec preview"
                  onClick={() => setViewSpecsDetails(false)}
                >
                  Close
                </button>
              </section>
              <section className="p-strip is-bordered is-shallow">
                <p className="spec__title-container u-no-padding--top">
                  <h3 className="u-no-margin--bottom u-no-padding--top">
                    {specDetails.metadata.title}
                  </h3>
                  <div
                    className={clsx("spec__metadata u-no-margin", {
                      "p-status-label--positive":
                        specDetails.metadata.status === "approved" ||
                        specDetails.metadata.status === "completed" ||
                        specDetails.metadata.status === "active",
                      "p-status-label--caution": specDetails.metadata.status
                        ?.toLowerCase()
                        ?.startsWith("pending"),
                      "p-status-label":
                        specDetails.metadata.status === "drafting" ||
                        specDetails.metadata.status === "braindump",
                      "p-status-label--negative":
                        specDetails.metadata.status === "rejected" ||
                        specDetails.metadata.status === "obsolete" ||
                        specDetails.metadata.status === "unknown",
                    })}
                  >
                    {specDetails.metadata.status}
                  </div>
                </p>
                <p className="u-no-padding--top">
                  Authors:{" "}
                  <em className="authors">
                    {specDetails.metadata.authors?.join(", ")}
                  </em>
                </p>
                <ul className="p-inline-list--middot u-no-padding--top">
                  <li className="p-inline-list__item">
                    <em className="edited">{lastEdited}</em>
                  </li>
                  <li className="p-inline-list__item">
                    <em className="created">
                      Created:{" "}
                      {new Date(specDetails.metadata.created)?.toLocaleString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" }
                      )}
                    </em>
                  </li>
                </ul>
                {/* The get notifications feature isn't functional yet */}
                <p className="get-notifications u-no-margin u-no-padding--top">
                  <Switch label="Get Notifications" />
                </p>
              </section>
              <section className="spec-preview">
                <div dangerouslySetInnerHTML={{ __html: specDetails.html }} />
              </section>
              <section className="l-status u-align--right">
                <a
                  className="p-button--positive spec-link"
                  href={specDetails.url}
                  role="button"
                  target="blank"
                >
                  Open in Google Docs
                </a>
              </section>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default SpecsDetails;
