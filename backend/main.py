from typing import Union
from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from index import load_documents, initialize_index, search_index

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


# search the index for the query.
# only include results with specified cause, location, and number of total projects bigger than given projects
# cause: string defining a cause
# country: the country of operation of the charity
# projects: the minimum number of total projects done by the charity
@app.get("/search")
async def search(query: str, cause: Optional[str]=None, country: Optional[str]=None, projects: Optional[int]=None):
    documents = load_documents(cause, country, projects)  # load scraped documents
    index = initialize_index(documents)
    results = search_index(index, documents, query)
    print(results)
    return {"query": query, "results": results}
