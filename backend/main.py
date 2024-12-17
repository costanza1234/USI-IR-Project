from typing import List, Optional, Dict
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from index import load_data, load_documents, initialize_index, search_index, get_charities, filter_charities, update_query

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
data = load_data()
documents = load_documents(data)
index = initialize_index(documents)

# Store relevance feedback in memory
feedback = {}

@app.get("/search")
async def search(
    query: str,
    session_id: str,
    causes: Optional[List[str]] = None,
    countries: Optional[List[str]] = None,
    continents: Optional[List[str]] = None
):
    # Check if there is existing feedback for this session
    if session_id in feedback and feedback[session_id]["updated_query"]:
        query = feedback[session_id]["updated_query"]
    
    results = search_index(index, documents, query)
    charities = get_charities(results, data)
    charities = filter_charities(charities, causes, countries, continents)
    
    # Save results to feedback for later reference
    feedback[session_id] = feedback.get(session_id, {"original_query": query, "feedback": {}, "updated_query": query})
    feedback[session_id]["results"] = charities
    
    return {"query": query, "charities": charities}

search("cancer", "1", None, ["Hong Kong SAR"])

@app.post("/feedback/{session_id}/{docid}/{relevant}")
async def give_feedback(
    session_id: str,
    docid: str,
    relevant: bool
):
    if session_id not in feedback:
        return {"error": "Session not found"}
    
   # Update feedback for the session
    session_feedback = feedback[session_id]
    session_feedback["feedback"][docid] = relevant
    
    # Recompute the query using relevance feedback
    updated_query = update_query(session_feedback["original_query"], session_feedback["feedback"], documents)
    session_feedback["updated_query"] = updated_query

    return search(updated_query, session_id)