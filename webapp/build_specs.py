import json
import logging
from datetime import datetime
from typing import Dict, List

from webapp.google import Sheets
from webapp.settings import SPECS_FILE, SPECS_SHEET_TITLE, TRACKER_SPREADSHEET_ID

logger = logging.getLogger(__name__)


def get_value_row(row, type):
    if row:
        if type == datetime:
            if "formattedValue" in row:
                return datetime.strptime(
                    row["formattedValue"], "%Y-%m-%dT%H:%M:%S.%fZ"
                ).strftime("%d %b %Y %H:%M")
        elif "userEnteredValue" in row:
            if "stringValue" in row["userEnteredValue"]:
                return type(row["userEnteredValue"]["stringValue"])
            if "numberValue" in row["userEnteredValue"]:
                return type(row["userEnteredValue"]["numberValue"])

    return ""


def index_in_list(a_list, index):
    return index < len(a_list)


def is_spec(row):
    """Check that file name exists."""

    return "userEnteredValue" in row[1]


def generate_specs(sheet):
    COLUMNS = [
        ("folderName", str),
        ("fileName", str),
        ("fileID", str),
        ("fileURL", str),
        ("index", str),
        ("title", str),
        ("status", str),
        ("authors", str),
        ("type", str),
        ("created", datetime),
        ("lastUpdated", datetime),
        ("numberOfComments", int),
        ("openComments", int),
    ]

    for row in sheet["data"][0]["rowData"]:
        if "values" in row and is_spec(row["values"]):
            spec = {}
            for column_index in range(len(COLUMNS)):
                (column, type) = COLUMNS[column_index]
                spec[column] = get_value_row(
                    (
                        row["values"][column_index]
                        if index_in_list(row["values"], column_index)
                        else None
                    ),
                    type,
                )
            yield spec


def save_specs(specs):
    with open(SPECS_FILE, "w") as f:
        logger.info("Saved %s specs to specs.json", len(specs))
        json.dump(specs, f, indent=4)


def load_sheet():
    spreadsheet = Sheets(spreadsheet_id=TRACKER_SPREADSHEET_ID)

    RANGE = "A2:M"
    sheet = spreadsheet.get_sheet_by_title(
        title=SPECS_SHEET_TITLE, ranges=[f"{SPECS_SHEET_TITLE}!{RANGE}"]
    )

    return sheet


def save_specs_locally() -> List[Dict]:
    """
    Fetch already parsed specs from Google Sheets and save them locally.

    :return: List of specs objects
    """
    logger.info("Fetching specs from Google Sheets")
    sheet = load_sheet()
    specs = list(generate_specs(sheet))
    save_specs(specs)
    print(specs[0])
    return specs


if __name__ == "__main__":
    save_specs_locally()
