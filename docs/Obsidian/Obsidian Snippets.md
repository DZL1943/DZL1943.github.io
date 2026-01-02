
```css
body {
  --h1-color: var(--color-red);
  --h2-color: var(--color-orange);
  --h3-color: var(--color-yellow);
  --h4-color: var(--color-green);
  --h5-color: var(--color-blue);
  --h6-color: var(--color-purple);
  --bold-color: var(--color-red);
  --italic-color: var(--color-orange);
  --heading-spacing: calc(1rem * 1.5);
  --p-spacing: 1rem;
}

:is(.markdown-preview-view, .markdown-rendered) p {
  margin-block-end: 0.5em;
}

.cm-strikethrough,
del {
  color: var(--text-faint);
}
u,ins {
  text-decoration: none;
  border-bottom: 3px solid var(--color-green);
  text-decoration-color: var(--color-green);
  text-decoration-thickness: 3px;
}

/* list */
ul>li.task-list-item[data-task="x"],
ul>li.task-list-item[data-task="X"] {
  text-decoration: none;
}
.markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="x"],
.markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="X"] {
  text-decoration: none;
}

.cm-formatting.cm-formatting-list.cm-formatting-list-ul {
  padding-left: 0;
}
.cm-formatting.cm-formatting-list.cm-formatting-list-ol {
  padding-left: 0;
}

.markdown-rendered ul, .markdown-rendered ol {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}

/* code */
.cm-s-obsidian .cm-inline-code:not(.cm-formatting),
.markdown-rendered :not(pre) > code {
  color: var(--color-pink) !important;
}
.markdown-rendered pre:not([class*="language-"]) code {
  color: var(--color-pink) !important;
}

/* table */
.markdown-preview-view tr,
.markdown-rendered tr {
  &:nth-child(odd) {
    background-color: var(--background-primary);
  }

  &:nth-child(even) {
    background-color: var(--background-secondary);
  }
}

/* ui */
body {
  --file-line-width: min(85vw, 1200px);
  /* --file-margins: var(--size-4-8) 10%; */
  --caret-color: var(--text-accent);
  --embed-max-height: unset;
  --header-height: 34px;
}

.workspace-tab-header:has(.mod-pinned) {
  /* shrink if pinned */
  max-width: 60px !important;
}

.nav-folder-title-content,.nav-file-title-content {
  font-size: 15px;
}

.cm-active.cm-line{
  background-color: hsla(var(--accent-h, 254), var(--accent-s, 80%), var(--accent-l, 68%), 0.1);
}

.cm-scroller,
.markdown-preview-view {
  padding-top: 10px !important;
}

.view-header:not(:hover) {
  opacity: 0;
}

.status-bar:not(:hover) {
  opacity: 0;
  min-height: 6px;
  height: 0;
  padding: 0;
  margin: 0;
  border: 0;
}
```