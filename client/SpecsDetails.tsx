import React, { useEffect } from "react";
import clsx from "clsx";
import { ObtainedData } from "./types";
import Loader from "./Loader";
import { ErrorComponent } from "./Error";

interface SpecDetailsProps {
  obtainedData: ObtainedData;
  loading: boolean;
  viewSpecsDetails: boolean;
  setViewSpecsDetails: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  folderName: string;
  lastEdited: string;
}

const SpecsDetails: React.FC<SpecDetailsProps> = ({
  loading,
  obtainedData,
  viewSpecsDetails,
  setViewSpecsDetails,
  error,
  folderName,
  lastEdited,
}) => {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.classList.add("side-drawer-open");

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
            <Loader />
          ) : (
            <>
              <section className="p-strip is-bordered is-shallow">
                <small className="spec-card__metadata-list">
                  <ul className="header p-inline-list--middot u-no-margin--bottom">
                    <li className="p-inline-list__item">
                      {obtainedData.metadata.index}
                    </li>
                    <li className="p-inline-list__item">{folderName}</li>
                    <li className="p-inline-list__item metadata-type">
                      {obtainedData.metadata.type}
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
                    {obtainedData.metadata.title}
                  </h3>
                  <div
                    className={clsx("spec__metadata u-no-margin", {
                      "p-status-label--positive":
                        obtainedData.metadata.status === "approved" ||
                        obtainedData.metadata.status === "completed" ||
                        obtainedData.metadata.status === "active",
                      "p-status-label--caution": obtainedData.metadata.status
                        ?.toLowerCase()
                        ?.startsWith("pending"),
                      "p-status-label":
                        obtainedData.metadata.status === "drafting" ||
                        obtainedData.metadata.status === "braindump",
                      "p-status-label--negative":
                        obtainedData.metadata.status === "rejected" ||
                        obtainedData.metadata.status === "obsolete" ||
                        obtainedData.metadata.status === "unknown",
                    })}
                  >
                    {obtainedData.metadata.status}
                  </div>
                </p>
                <p className="u-no-padding--top">
                  Authors:{" "}
                  <em className="authors">
                    {obtainedData.metadata.authors?.join(", ")}
                  </em>
                </p>
                <ul className="p-inline-list--middot u-no-padding--top">
                  <li className="p-inline-list__item">
                    <em className="edited">{lastEdited}</em>
                  </li>
                  <li className="p-inline-list__item">
                    <em className="created">
                      Created:{" "}
                      {new Date(obtainedData.metadata.created)?.toLocaleString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" }
                      )}
                    </em>
                  </li>
                </ul>
                {/* The get notifications feature isn't functional yet */}
                <p className="get-notifications u-no-padding--top">
                  <label className="switch u-vertically-center">
                    <input type="checkbox" />
                    <span className="slider" />
                  </label>
                  <span>Get Notifications</span>
                </p>
              </section>
              <section className="spec-preview">
                <div dangerouslySetInnerHTML={{ __html: obtainedData.html }} />
              </section>
              <section className="l-status u-align--right">
                <a
                  className="p-button--positive spec-link"
                  href={obtainedData.url}
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
