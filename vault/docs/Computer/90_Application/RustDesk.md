---
created: 2025-06-18T21:19
modified: 2025-06-18T21:19
url:
  - https://rustdesk.com/
---

## Client

## Server

```yaml
version: '3'

services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs -r hbbr:21117  # 指向 hbbr 的内部端口
    volumes:
      - ./data:/root
    ports:
      - "21115:21115/tcp"
      - "21116:21116/tcp"
      - "21116:21116/udp"  # UDP 必须单独声明
      - "21118-21119:21118-21119/tcp"
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    ports:
      - "21170:21117/tcp"  # 修改外部端口为 21170
    restart: unless-stopped
```