from typing import List, Optional, Dict
import pyterrier as pt
import pandas as pd
import numpy as np
import json
import re
from sklearn.feature_extraction.text import TfidfVectorizer

# only keep the charities that have a name and a mission
def remove_incomplete(data):
    return [item for item in data if item["name"] and item["mission"]]


def load_data():
    # Load data
    with open('./global_giving.json', 'r', encoding='utf-8') as file1:
        data1 = json.load(file1)
    with open('./charity_navigator.json', 'r', encoding='utf-8') as file2:
        data2 = json.load(file2)
    return remove_incomplete(data1 + data2)

# the documents are returned in format idx, text
# idx: d1, d2, ...
# text: the text included in the mission field in the data AND the name field
def load_documents(data):
    texts = []
    for i in range(len(data)):
        mission = data[i]['mission']
        name = data[i]['name']
        texts.append(name + " " + mission)

    # Format doucuments
    idx = ['d' + str(i + 1) for i in range(len(texts))]
    return pd.DataFrame(np.column_stack((idx, texts)), columns = ['docno', 'text'])

def initialize_index(documents):
    # Initialize the index
    indexer = pt.terrier.IterDictIndexer("./index_docs", overwrite=True)
    index_ref = indexer.index(documents.to_dict(orient="records"))
    index = pt.IndexFactory.of(index_ref)  # of type jnius.reflect.org.terrier.structures.Index
    return index

def search_index(index, documents, query):
    retriever = pt.terrier.Retriever(index, wmodel="BM25")  # Alternative Models: "TF_IDF", "Tf"
    results = retriever.search(query)
    joined = results.join(documents.set_index('docno'), on='docno')
    return joined

# convert from terrier results (pandas data frame) to charities with rank
def get_charities(results, data):
    charities = []
    for idx, row in results.iterrows():
        docid = row['docid']
        score = row['score']
        
        charity = data[docid]    
        charities.append({
            "score": score,
            "charity": charity,
            "docid": docid
        })
    return charities

def filter_charities(
        charities, 
        q_causes: Optional[List[str]] = None,
        q_countries: Optional[List[str]] = None,
        q_continents: Optional[List[str]] = None
):
    i = 0
    filtered_charities = []
    for item in charities:
        i = i + 1
        charity = item.get("charity")
        # get the cause
        causes = charity.get("cause", [])
        if isinstance(causes, str):
            causes = [{"name": causes}]  # if it's only one cause transform into a list
        # get countries of operation
        countries = charity.get("country", [])
        if isinstance(countries, str):
            countries = [{"name": countries}]  # if it's only one transform into a list
        # get the continent
        continent = charity.get("continent")

        if q_causes is not None:
            matches = [q for q in q_causes if any(q == cause['name'] for cause in causes)]
            if len(matches) == 0:
                continue
        if q_countries is not None:
            matches = [q for q in q_countries if any(q == country['name'] for country in countries)]
            if len(matches) == 0:
                continue
        if q_continents is not None and not any(q == continent for q in q_continents):
            continue
        
        # If all conditions passed, append item to filtered_data
        filtered_charities.append(item)
    return filtered_charities

def retrieve_document_by_id(docid, documents):
    i = 0
    for idx, row in documents.iterrows():
        if int(docid) == i: return row['text']
        i += 1
    return None

# remove special characters from the terms to make them safe for queries
def sanitize_terms(terms):
    sanitized_terms = set()
    for term in terms:
        # Remove characters like ', ", `, \, etc., and ensure no empty strings remain
        sanitized_term = re.sub(r"[\(\)\-\'\"`\\]", "", term).strip()
        if sanitized_term:  # Only include non-empty terms
            sanitized_terms.add(sanitized_term)
    return sanitized_terms

# Update the query based on relevance feedback
# original_query (str): The original user query
# feedback (Dict[str, bool]): Feedback where keys are document IDs and values are relevance (True/False).
# documents: the documents
# RETURNS: str: Updated query.
def update_query(original_query: str, feedback: Dict[str, bool], documents) -> str:
    relevant_docs = [retrieve_document_by_id(doc_id, documents) for doc_id, is_relevant in feedback.items() if is_relevant]
    non_relevant_docs = [retrieve_document_by_id(doc_id, documents) for doc_id, is_relevant in feedback.items() if not is_relevant]
    
    # Filter out None (invalid doc IDs)
    relevant_docs = [doc for doc in relevant_docs if doc]
    non_relevant_docs = [doc for doc in non_relevant_docs if doc]
    
    # Combine documents into corpora for TF-IDF vectorization
    corpus = relevant_docs + non_relevant_docs
    labels = [1] * len(relevant_docs) + [0] * len(non_relevant_docs)  # 1 for relevant, 0 for non-relevant
    
    # Initialize TF-IDF vectorizer with tokenization and stopword removal
    vectorizer = TfidfVectorizer(stop_words='english', token_pattern=r'\b[a-zA-Z]{2,}\b')
    X = vectorizer.fit_transform(corpus)  # Calculate TF-IDF matrix
    
    # Extract feature names (terms)
    terms = vectorizer.get_feature_names_out()
    
    # Compute term scores: sum TF-IDF scores for relevant and subtract non-relevant
    scores = X.toarray()
    term_weights = {}
    for idx, term in enumerate(terms):
        relevant_score = sum(scores[i][idx] for i in range(len(relevant_docs)))  # Sum over relevant docs
        non_relevant_score = sum(scores[i + len(relevant_docs)][idx] for i in range(len(non_relevant_docs)))  # Sum over non-relevant docs
        term_weights[term] = relevant_score - non_relevant_score  # Emphasize relevant terms
    
    # Sort terms by weight (descending)
    sorted_terms = sorted(term_weights.items(), key=lambda x: x[1], reverse=True)
    
    # Combine with original query terms
    original_terms = set(original_query.split())
    updated_terms = set()
    for term, weight in sorted_terms:
        if weight > 0:  # Only include positively weighted terms
            updated_terms.add(term)
    
    # Final updated query
    updated_terms |= original_terms  # Retain original terms
    updated_query = " ".join(sanitize_terms(updated_terms))
    return updated_query
