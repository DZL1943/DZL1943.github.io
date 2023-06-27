---
created: 2026-01-06T20:27
modified: 2026-01-11T20:37
---

# Mermaid

- flowchart
- sequenceDiagram
- classDiagram
- stateDiagram-v2
- erDiagram
- journey
- gantt
- pie
- quadrantChart
- requirementDiagram
- gitGraph
- C4Context
    - System Context (C4Context)
    - Container diagram (C4Container)
    - Component diagram (C4Component)
    - Dynamic diagram (C4Dynamic)
    - Deployment diagram (C4Deployment)
- mindmap
- timeline
- zenuml
- sankey-beta
- xychart-beta
- block-beta
- packet-beta
- kanban
- architecture-beta
- radar-beta

## Flowchart

direction

- TB - Top to bottom
- TD - Top-down/ same as top to bottom
- BT - Bottom to top
- RL - Right to left
- LR - Left to right

### Node

### Link

```mermaid
flowchart LR
A1 --- B1 <--> C1 <-.-> D1 <==> E1 o--o F1 x--x G1
A2 --text--> B2
A3 --> B3 & C3--> D3
A4 & B4--> C4 & D4
```

### subgraph