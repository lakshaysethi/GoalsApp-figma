from typing import Optional, List
from fastapi import FastAPI
from tinydb import TinyDB, Query
import uvicorn
from pydantic import BaseModel

db = TinyDB('db.json')

# db.insert({'type': 'apple', 'count': 7})

# https://tinydb.readthedocs.io/en/latest/getting-started.html

# https://fastapi.tiangolo.com/tutorial/first-steps/

app = FastAPI()
class Goal(BaseModel):
    name: str
    description: Optional[str] = None
    price: float

@app.post("/items/", response_model=Goal)
async def create_item(item: Goal):
    return item

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


@app.post("/goals/new", response_model=Goal)
def create_new(goal:Goal):
    return goal


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=58585)
