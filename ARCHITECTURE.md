# specs.canonical.com application architecture

Specs is a Flask + React application that displays engineering specifications. In practice, specifications are documents stored in a [Google Drive folder](https://drive.google.com/drive/folders/19jxxVn_3n6ZAmFl3DReEVgZjxZnlky4X) under the Engineering drive.

## Data source

There is a cronjob (deployed independently) that parses these documents periodically, using the Google API. The code is located on `webapp/update.py` and the schedule on `cronjob-update.yaml`. As a result, the specs metadata (name, author, status...) is collected in a [spreadsheet](https://docs.google.com/spreadsheets/d/1aKH6petyrzjzw0mgUNQscDhFSfVkbAIEjfH7YBS-bDA), which contains a snapshot of the data to be shown in the UI.

## Deployment

A Jenkins job builds and deploys specs.canonical.com periodically, at a similar frequency that the cronjob updates the spreadsheet (around 4 hours). When the applications is rolled out we build a `json` file with the same records that are stored in the sheet (see `webapp/build_specs.py`). This `json` file is accessed on the application startup, and served on demand, so there is no need to query the spreadsheet at runtime.
