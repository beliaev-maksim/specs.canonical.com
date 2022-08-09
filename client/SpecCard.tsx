import { useState } from "react";
import clsx from "clsx";
import { Spec, ObtainedData, Metadata } from "./types";
import SpecsDetails from "./SpecsDetails";

const SpecCard = ({ spec }: { spec: Spec }) => {
  const [viewSpecsDetails, setViewSpecsDetails] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [obtainedData, setObtainedData] = useState<ObtainedData>({
    html: "",
    metadata: {} as Metadata,
    url: "",
  });
  const lastEdited = `Last edit: ${spec.lastUpdated.toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "short", year: "numeric" }
  )}`;

  const openSpecsDetails = (id: string) => {
    setViewSpecsDetails(true);
    fetchDocument(id);
  };

  const fetchDocument = async (id: string) => {
    setLoading(true);
    const response = await fetch(`${location.origin}/spec/${id}`);
    const obtainedData = await response.json();
    if (response.ok) {
      console.log(obtainedData);
      setObtainedData(obtainedData);
    } else {
      setError(obtainedData.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="l-fluid-breakout__item" data-js="grid-item">
        <div
          className={`spec-card spec-card--${spec.status.toLowerCase()} p-card col-4 u-no-padding`}
        >
          <div className="spec-card__content p-card__inner">
            <div className="spec-card__header">
              <small className="spec-card__metadata-list">
                <ul className="p-inline-list--middot u-no-margin--bottom">
                  <li className="p-inline-list__item">{spec.index}</li>
                  <li className="p-inline-list__item">{spec.folderName}</li>
                  <li className="p-inline-list__item">{spec.type}</li>
                </ul>
              </small>
              <div
                className={clsx("u-no-margin", {
                  "p-status-label--positive":
                    spec.status === "Approved" ||
                    spec.status === "Completed" ||
                    spec.status === "Active",
                  "p-status-label--caution": spec.status
                    .toLowerCase()
                    .startsWith("pending"),
                  "p-status-label":
                    spec.status === "Drafting" || spec.status === "Braindump",
                  "p-status-label--negative":
                    spec.status === "Rejected" ||
                    spec.status === "Obsolete" ||
                    spec.status === "Unknown",
                })}
              >
                {spec.status}
              </div>
            </div>
            <h3 className="p-heading--4 u-no-margin--bottom">
              <a onClick={() => openSpecsDetails(spec.fileID)}>{spec.title}</a>
            </h3>
            <small>
              <em>{spec.authors.join(", ")}</em>
            </small>
            <p className="p-card__content">
              <i className="p-icon--comments">Comments</i>
              <small className="u-text--muted">
                {` ${spec.numberOfComments} comments ${
                  spec.openComments > 0 ? `${spec.openComments} unresolved` : ""
                }`}
              </small>
            </p>
          </div>
          <div className="spec-card__footer p-card__inner">
            <em className="u-align--right">{lastEdited}</em>
          </div>
        </div>
      </div>
      {viewSpecsDetails && (
        <SpecsDetails
          loading={loading}
          obtainedData={obtainedData}
          viewSpecsDetails={viewSpecsDetails}
          setViewSpecsDetails={setViewSpecsDetails}
          error={error}
          folderName={spec.folderName}
          lastEdited={lastEdited}
        />
      )}
    </>
  );
};

export default SpecCard;
