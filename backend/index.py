import pyterrier as pt
import pandas as pd
import numpy as np
import json

def load_data():
    # Load data
    with open('./global_giving.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

# the documents are returned in format idx, text
# idx: d1, d2, ...
# mission: the text included in the mission field in the data
def load_documents():  
    filtered_data = load_data()

    # Get mission field
    missions = [item['mission'] for item in filtered_data]

    # Format doucuments
    idx = ['d' + str(i + 1) for i in range(len(missions))]
    return pd.DataFrame(np.column_stack((idx, missions)), columns = ['docno', 'text'])

def initialize_index(documents):
    # Initialize the index
    indexer = pt.terrier.IterDictIndexer("./backend/index_docs", overwrite=True)
    index_ref = indexer.index(documents.to_dict(orient="records"))
    index = pt.IndexFactory.of(index_ref)  # of type jnius.reflect.org.terrier.structures.Index
    return index

def search_index(index, documents, query):
    retriever = pt.terrier.Retriever(index, wmodel="BM25")  # Alternative Models: "TF_IDF", "Tf"
    results = retriever.search(query)
    joined = results.join(documents.set_index('docno'), on='docno')
    return joined

def get_statistics(index):
    return index.getCollectionStatistics().toString()

# Nt is the number of unique documents that each term occurs in – this is useful for calculating IDF.
# TF is the total number of occurrences – some weighting models use this instead of Nt.
# The numbers in the @{} are a pointer – they tell Terrier where the postings are for that term in the inverted index data structure.
def print_lexicon(index):
    for kv in index.getLexicon():
        print("%s  -> %s " % (kv.getKey(), kv.getValue().toString()  ))

# Look up a term in the Lexicon
# print(index.getLexicon()["document"].toString())

# Running multiple queries
# queries = pd.DataFrame([["q1", "document"], ["q2", "unkown topic"]], columns=["qid", "query"])
# retriever.transform(queries)

# Saving the results in trec_format
# pt.io.write_results(joined, "backend/results.txt", format='trec')

# convert from terrier results (pandas data frame) to charities with rank
def get_charities(results):
    data = load_data()
    charities = []
    for idx, row in results.iterrows():
        docid = row['docid']
        score = row['score'] # HKCF
        
        charity = data[docid]
        
        charities.append({
            "score": score,
            "charity": charity
        })
    return charities

def filter_charities(charities, cause: str, country: str, projects: int):
    filtered_charities = []
    for item in charities:
        charity = item.get("charity")
        countries_of_operation = charity.get("countries_of_operation", [])
        causes = charity.get("cause", [])
        total_projects = charity.get("total_projects")
        if total_projects is not None:
            total_projects = int(total_projects)
        
        if total_projects is not None and total_projects < projects:
            continue
        if cause is not None and not any(c.get("name") == cause for c in causes):
            continue
        if country is not None and not any(c.get("name") == country for c in countries_of_operation):
            continue
        
        # If all conditions passed, append item to filtered_data
        filtered_charities.append(item)
    return filtered_charities