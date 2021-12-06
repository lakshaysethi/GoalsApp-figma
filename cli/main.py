from typing import Optional
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/goals/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id, "more": "q"}


@app.get("/goals/")
def read_all():
    array = []
    return array

