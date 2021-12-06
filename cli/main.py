# from typing import Optional
from fastapi import FastAPI
from tinydb import TinyDB, Query
import uvicorn
db = TinyDB('db.json')

# db.insert({'type': 'apple', 'count': 7})

# https://tinydb.readthedocs.io/en/latest/getting-started.html

# https://fastapi.tiangolo.com/tutorial/first-steps/

app = FastAPI()

@app.get("/")
def read_root():
    return {"text": "nothing at root "}


@app.get("/goals/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id, "more": "q"}


@app.get("/goals/")
def read_all():
    array = []
    return array


@app.post("/goals/new")
def create_new(name:str):
    goal = {}
    # goal.
    # db.insert()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
