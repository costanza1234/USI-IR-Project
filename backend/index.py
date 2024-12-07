import pyterrier as pt
import pandas as pd
import numpy as np
import json

# Initialize python terrier
if not pt.started():
    pt.init()


# Load data
with open('global_giving.json', 'r') as file:
    data = json.load(file)

# Get mission field
missions = [item['mission'] for item in data]
idx = ['d' + str(i + 1) for i in range(len(missions))]

docs_df = pd.DataFrame(np.column_stack((idx, missions)), columns = ['docno', 'text'])

# Initialize the index
indexer = pt.terrier.IterDictIndexer("./backend/index_docs", overwrite=True)
index_ref = indexer.index(docs_df.to_dict(orient="records"))
index = pt.IndexFactory.of(index_ref)  # of type jnius.reflect.org.terrier.structures.Index

# Get statistics on the index
# print(index.getCollectionStatistics().toString())

# Get the Lexicon
# for kv in index.getLexicon():
    # print("%s  -> %s " % (kv.getKey(), kv.getValue().toString()  ))
# Nt is the number of unique documents that each term occurs in – this is useful for calculating IDF.
# TF is the total number of occurrences – some weighting models use this instead of Nt.
# The numbers in the @{} are a pointer – they tell Terrier where the postings are for that term in the inverted index data structure.

# Look up a term in the Lexicon
# print(index.getLexicon()["document"].toString())

# Searching an index
retriever = pt.terrier.Retriever(index, wmodel="BM25") # Alternative Models: "TF_IDF", "Tf"
results = retriever.search("cancer")  # INSERT QUERY HERE
joined = results.join(docs_df.set_index('docno'), on='docno')
print(joined)

# Running multiple queries
# queries = pd.DataFrame([["q1", "document"], ["q2", "unkown topic"]], columns=["qid", "query"])
# retriever.transform(queries)

# Saving the results in trec_format
pt.io.write_results(joined, "backend/results.txt", format='trec')


