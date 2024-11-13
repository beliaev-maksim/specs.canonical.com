import re


def parse_authors(authors: str):
    """
    Get rid of email and other additional information
    in the authors name field.
    """
    authors = re.split(",|;", authors)
    parsed_authors = []
    for author in authors:
        # name <email>
        # name (canonical)
        author = re.sub("(\\(.*\\)|<.*>)", "", author).strip()
        parsed_authors.append(author)
    # filter out names with special characters: e.g. "(Author of", ")", ";"
    parsed_authors = [
        author
        for author in parsed_authors
        if re.match("^[a-zA-Z ]+$", normalize_name(author))
    ]
    return parsed_authors


def unify_authors(specs):
    """
    Remove duplicates where the cause is typo.
    example: García, Garcia and John, JOhN
    """
    unique_authors = {}
    for spec in specs:
        for author in spec["authors"]:
            # García -> Garcia
            normalized_name = normalize_name(author)
            unique_authors[normalized_name] = unique_authors.get(
                normalized_name, author
            )
    for spec in specs:
        authors = spec["authors"]
        new_authors = []
        for author in authors:
            new_authors.append(unique_authors[normalize_name(author)])
        spec["authors"] = new_authors
    return specs


def normalize_name(author):
    author = re.sub("[àáâãäå]", "a", author, flags=re.I)
    author = re.sub("[ç]", "c", author, flags=re.I)
    author = re.sub("[èéêë]", "e", author, flags=re.I)
    author = re.sub("[ìíîï]", "i", author, flags=re.I)
    author = re.sub("[òóôõö]", "o", author, flags=re.I)
    author = re.sub("[ùúûü]", "u", author, flags=re.I)
    author = re.sub("[ýÿ]", "y", author, flags=re.I)
    return author.lower()
