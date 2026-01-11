create-tauri-app (这种方式无需再手动运行 tauri init)

```shell
cargo install create-tauri-app --locked
cargo create-tauri-app
# or npm/yarn/pnpm create tauri-app

cd tauri-app
npm install
npm run tauri dev
```

choose which language to use for frontend
- ts/js: 紧接着会让选包管理工具 npm/pnpm/yarn/bun, 然后选 UI template, 最后选 js/ts
    - Vanilla
    - Vue
    - Svelte
    - React
    - Solid
    - Angular
    - Preact
- rust
- .net