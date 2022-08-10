export type Spec = {
  folderName: string;
  fileName: string;
  fileID: string;
  fileURL: string;
  index: string;
  title: string;
  status: string;
  authors: [string];
  type: string;
  created: Date;
  lastUpdated: Date;
  numberOfComments: number;
  openComments: number;
};

export type Metadata = {
  authors: Array<string>;
  created: Date;
  index: string;
  status: string;
  title: string;
  type: string;
};

export type SpecDetails = {
  html: string;
  metadata: Metadata;
  url: string;
};

export type MoreSpecDetails = {
  fileID: string;
  folderName: string;
  lastEdited: string;
};

export type Team = string;
