[axum - Rust](https://docs.rs/axum/latest/axum/)

## hello-world

```toml title:"Cargo.toml"
[package]
name = "axum-hello"
version = "0.1.0"
edition = "2021"

[dependencies]
axum = "*"
tokio = { version = "*", features = ["full"] }
tower = "*"
```

```rust title:"src/main.rs"
use axum::{
    routing::get,
    Router,
};

#[tokio::main]
async fn main() {
    // build our application with a single route
    let app = Router::new().route("/", get(|| async { "Hello, World!" }));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

```
在浏览器中访问 localhost:3000 即可