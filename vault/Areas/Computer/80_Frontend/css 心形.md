
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>CSS Heart</title>
    <style>
      .root {
        --size: 100px;
        width: calc(var(--size) * 2);
        height: calc(var(--size) * 2);
        border: 3px solid red;
        background-color: white;
      }
      .heart {
        --color: red;
        position: relative;
        margin: auto;
        top: 25%;
        background-color: var(--color);
        height: var(--size);
        width: var(--size);
        transform: rotate(-45deg);
        border: 3px dashed pink;
      }
      .heart::before,
      .heart::after {
        content: "'";
        position: absolute;
        top: calc(var(--size) / -2);
        left: 0px;
        width: var(--size);
        height: var(--size);
        background-color: var(--color);
        border-radius: 50%;
        border: 3px solid orange;
      }
      .heart::after {
         top: 0px;
        left: calc(var(--size) / 2);
        border: 3px dotted white;
      }
    </style>
  </head>
  <body>
    <div class="root" style="--size: 100px">
      <div class="heart"></div>
    </div>
  </body>
</html>
```