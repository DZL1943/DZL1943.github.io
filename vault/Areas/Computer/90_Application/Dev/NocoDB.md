# NocoDB

https://nocodb.com/docs/product-docs

## Install

```yaml
docker run -d \
  --name noco \
  -v "$(pwd)"/nocodb:/usr/app/data/ \
  -p 8080:8080 \
  nocodb/nocodb:latest
```

```yaml
docker run -d \
  --name noco \
  -v "$(pwd)"/nocodb:/usr/app/data/ \
  -p 8080:8080 \
  -e NC_DB="pg://host.docker.internal:5432?u=root&p=password&d=d1" \
  -e NC_AUTH_JWT_SECRET="569a1821-0a93-45e8-87ab-eb857f20a010" \
  nocodb/nocodb:latest
```

### docker-compose

```yaml
version: '2.1'
services: 
  nocodb: 
    depends_on: 
      root_db: 
        condition: service_healthy
    environment: 
      NC_DB: "pg://root_db:5432?u=postgres&p=password&d=root_db"
    image: "nocodb/nocodb:latest"
    ports: 
      - "8080:8080"
    restart: always
    volumes: 
      - "nc_data:/usr/app/data"
  root_db: 
    environment: 
      POSTGRES_DB: root_db
      POSTGRES_PASSWORD: password
      POSTGRES_USER: postgres
    healthcheck: 
      interval: 10s
      retries: 10
      test: "pg_isready -U \"$$POSTGRES_USER\" -d \"$$POSTGRES_DB\""
      timeout: 2s
    image: postgres:16.6
    restart: always
    volumes: 
      - "db_data:/var/lib/postgresql/data"
volumes: 
  db_data: {}
  nc_data: {}
```

## Concepts

- Bases
- Tables
- [Fields](https://nocodb.com/docs/product-docs/fields#field-types)
    - text
    - numerical
    - select
    - **link**
    - custom
    - id
    - formula
    - datetime
    - user
- Records
- View
    - Grid
    - Form
    - Gallery
    - Kanban
    - Calendar

## Tips

### 从身份证计算年龄

```
DATETIME_DIFF(
  NOW(), 
  SUBSTR({公民身份号码}, 7, 4) & "-" & SUBSTR({公民身份号码}, 11, 2) & "-" & SUBSTR({公民身份号码}, 13, 2), 
  "y"
)
```
