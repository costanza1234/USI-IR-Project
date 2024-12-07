from typing import Union, Optional
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
# only include results with specified cause, location, and number of total projects bigger than given projects
# cause: string defining a cause
# country: the country of operation of the charity
# projects: the minimum number of total projects done by the charity
@app.get("/search")
async def search(query: str, cause: Optional[str] = None, country: Optional[str] = None, projects: Optional[int] = None):
    results = search_index(index, documents, query)
    # print found number of results
    print(f"Found {len(results)} results for query '{query}'")
    charities = get_charities(results)
    charities = filter_charities(charities, cause, country, projects)
    # print found number of charities after filtering
    print(f"Found {len(charities)} charities for query '{query}' after filtering")
    return {"query": query, "charities": charities}