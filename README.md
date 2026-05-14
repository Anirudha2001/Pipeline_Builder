# Pipeline Builder

A visual drag-and-drop pipeline editor. Build workflow graphs by connecting typed nodes, then submit to the backend for structural analysis.

## Stack

- **Frontend** — React 18, React Flow, Tailwind CSS, Zustand
- **Backend** — Python 3.11, FastAPI, Pydantic v2

## Getting started

**Backend** (port 8000)

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Frontend** (port 3000)

```bash
cd frontend
npm install
npm start
```

## Node types

| Node | Color | Purpose |
|---|---|---|
| Input | Emerald | Pipeline entry point |
| Output | Fuchsia | Pipeline exit point |
| LLM | Violet | AI response generation |
| Text | Amber | Template text with `{{variable}}` interpolation |
| Math | Rose | Arithmetic on two inputs |
| API Request | Cyan | HTTP request (GET/POST/PUT/DELETE) |
| Condition | Orange | True/false branching |
| Delay | Slate | Timed pause |
| Logger | Teal | Debug logging |

The **Text** node parses `{{variable}}` patterns from its content and auto-generates input handles for each one.

## Backend API

`POST /pipelines/parse`

```json
// request
{ "nodes": [...], "edges": [...] }

// response
{ "num_nodes": 3, "num_edges": 2, "is_dag": true }
```

DAG detection uses Kahn's algorithm (topological sort). The `is_dag` field is `false` if the graph contains a cycle.

## Persistence

The canvas state is saved to `localStorage` automatically. Refreshing the page restores the last session.
