import { Metadata, MoreSpecDetails, Spec, SpecDetails } from "../../types";

export const moreSpecTestDetails: MoreSpecDetails = {
  fileID: "test_fileID",
  folderName: "test_folder",
  lastEdited: "today",
};

const testMetadata: Metadata = {
  authors: ["test_author"],
  created: new Date(),
  index: "index",
  status: "active",
  title: "test_title",
  type: "Process",
};

export const testSpecDetails: SpecDetails = {
  html: "<div>test html content</div>",
  metadata: testMetadata,
  url: "https://www.test.test",
};

export const testSpec: Spec = {
  folderName: moreSpecTestDetails.folderName,
  fileName: "test_file",
  fileID: moreSpecTestDetails.fileID,
  fileURL: testSpecDetails.url,
  index: testMetadata.index,
  title: testMetadata.title,
  status: testMetadata.status,
  authors: testMetadata.authors,
  type: testMetadata.type,
  created: testMetadata.created,
  lastUpdated: new Date(),
  numberOfComments: 10,
  openComments: 5,
};

export const emptyTestSpec: Spec = {
  folderName: "",
  fileName: "",
  fileID: "",
  fileURL: "",
  index: "",
  title: "",
  status: "",
  authors: [""],
  type: "",
  created: new Date(0),
  lastUpdated: new Date(0),
  numberOfComments: 0,
  openComments: 0,
};

export const testTeams = ["test_team_1", "test_team_2"];
