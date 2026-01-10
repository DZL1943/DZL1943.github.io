---
created: 2024-04-22T20:39
modified: 2026-01-10T19:44
---

## 函数装饰器

```Python
import functools

def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper
```

## 带参装饰器

## 类装饰器

## 装饰类的装饰器

## 内置装饰器

## 实战

## 参考

https://python3-cookbook.readthedocs.io/zh_CN/latest/chapters/p09_meta_programming.html