from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from index import load_documents, initialize_index, search_index

documents = load_documents()  # load scraped documents
index = initialize_index(documents)

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

@app.get("/search")
async def search(query: str):
    results = search_index(index, documents, query)
    return {"query": query, "results": results}
