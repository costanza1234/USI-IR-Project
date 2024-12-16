from typing import List, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from index import load_documents, initialize_index, search_index, get_charities, filter_charities

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load documents and initialize index once
documents = load_documents()
index = initialize_index(documents)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# search the index for the query.
# only include results with specified causes, countries, and continents
# causes: a list of string defining a causes
# countries: the countries of operation of the charities
# continents: the continents of operation of the charities

# example : /search?query=help&causes=health&causes=education&countries=USA&countries=Canada&continents=North America

@app.get("/search")
async def search(
    query: str,
    causes: Optional[List[str]] = None,
    countries: Optional[List[str]] = None,
    continents: Optional[List[str]] = None
):
    results = search_index(index, documents, query)
    charities = get_charities(results)
    charities = filter_charities(charities, causes, countries, continents)
    return {"query": query, "charities": charities}