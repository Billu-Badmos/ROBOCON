from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Simple Todo API")

# ✅ Allow frontend (port 3000) to access backend (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict later: ["http://127.0.0.1:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Todo(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False

todos = []

@app.get("/todolist")
def get_todos():
    return todos

@app.post("/todolist")
def add_todo(todo: Todo):
    todos.append(todo)
    return todo

@app.delete("/todolist/{todo_id}")
def delete_todo(todo_id: int):
    global todos
    todos = [t for t in todos if t.id != todo_id]
    return {"message": f"Todo {todo_id} deleted"}
