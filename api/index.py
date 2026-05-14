from collections import defaultdict, deque
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelinePayload(BaseModel):
    nodes: list[dict[str, Any]]
    edges: list[dict[str, Any]]


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelinePayload):
    nodes = payload.nodes
    edges = payload.edges
    num_nodes = len(nodes)
    num_edges = len(edges)

    node_ids = {node.get("id") for node in nodes}
    indegree = {node_id: 0 for node_id in node_ids}
    graph = defaultdict(list)

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        if source in node_ids and target in node_ids:
            graph[source].append(target)
            indegree[target] += 1

    queue = deque([node_id for node_id in node_ids if indegree[node_id] == 0])
    visited = 0

    while queue:
        node_id = queue.popleft()
        visited += 1
        for neighbor in graph[node_id]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    is_dag = visited == len(node_ids)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}


handler = Mangum(app, lifespan="off")
