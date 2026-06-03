from fastapi import FastAPI
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langchain_openai.chat_models import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_pinecone import PineconeVectorStore
from langchain_core.output_parsers.string import StrOutputParser
from langchain_openai.embeddings import OpenAIEmbeddings

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS Setup
origins = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://samiur.dev",
    "https://www.samiur.dev",
    "https://personal-portfolio-otfvxqghf-samiur-rahmans-projects.vercel.app",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Request Body Model
class Item(BaseModel):
    query: str

# LangChain + Pinecone Setup
llm = ChatOpenAI(temperature=0.7, openai_api_key=os.getenv('OPENAI_API_KEY'))
embed = OpenAIEmbeddings(model='text-embedding-3-large', dimensions=1536)
vectstr = PineconeVectorStore(
    pinecone_api_key=os.getenv('PINECONE_API_KEY'),
    embedding=embed,
    index_name='my-site-index'
)

@app.get("/")
def health_check():
    return {'status': 200, 'message': 'Server is running!'}

@app.post("/search")
def search(item: Item):
    if not item.query:
        return {'status': 400, 'response': 'Query cannot be empty'}

    context = ",".join([d.page_content for d in vectstr.similarity_search(item.query, k=3)])
    prompt = PromptTemplate.from_template(
        "Pretend you're Samiur Rahman. Speak professionally. Answer in a few short sentences: {question}. Here's Samiur's relevant past: " + context
    )
    chain = prompt | llm | StrOutputParser()

    response = chain.invoke({
        "question": item.query
    })

    return {'status': 200, 'response': response}
