---
created: 2024-04-22T20:39
modified: 2025-09-30T08:22
---

- 实例方法 `self` 只能由实例调用(或者手动把实例作为首个参数)
- 类方法 `@classmethod` 类方法可由类或实例调用(实际上都是类调用)
- 静态方法 `@staticmethod` 静态方法可以由类、实例调用, 也可以普通调用
- 普通函数

## 测试代码

```python
def debug(func):
    def wrapper(*args, **kwargs):
        try:
            print(f"begin {func.__name__}")
            result = func(*args, **kwargs)
            print(f"success: {result}")
        except Exception as e:
            print(f"failed: {e}")
        finally:
            print("end==========")

    return wrapper

class DemoClass:
    class_var = "class var"

    def __init__(self):
        self.instance_var = "instance var"

    @debug
    def instance_method(self, arg):
        print(locals())
        print(self.class_var)
        print(self.instance_var)

    @classmethod
    @debug
    def class_method(cls, arg):
        print(locals())
        print(cls.class_var)
        print(cls.instance_var)

    @staticmethod
    @debug
    def static_method(arg):
        print(locals())
        print(DemoClass.class_var)
        print(DemoClass.instance_var)

    @debug
    def ordinary_function(arg):
        print(locals())
        print(DemoClass.class_var)
        print(DemoClass.instance_var)

def main():
    obj = DemoClass()
    obj.instance_method("obj")
    obj.class_method("obj")
    obj.static_method("obj")
    obj.ordinary_function("obj")
    DemoClass.instance_method(obj, "class-obj")
    DemoClass.instance_method("class")
    DemoClass.class_method("class")
    DemoClass.static_method("class")
    DemoClass.ordinary_function("class")

main()

```

```
begin instance_method
{'self': <__main__.DemoClass object at 0x101830ce0>, 'arg': 'obj'}
class var
instance var
success: None
end==========
begin class_method
{'cls': <class '__main__.DemoClass'>, 'arg': 'obj'}
class var
failed: type object 'DemoClass' has no attribute 'instance_var'
end==========
begin static_method
{'arg': 'obj'}
class var
failed: type object 'DemoClass' has no attribute 'instance_var'
end==========
begin ordinary_function
failed: DemoClass.ordinary_function() takes 1 positional argument but 2 were given
end==========
begin instance_method
{'self': <__main__.DemoClass object at 0x101830ce0>, 'arg': 'class-obj'}
class var
instance var
success: None
end==========
begin instance_method
failed: DemoClass.instance_method() missing 1 required positional argument: 'arg'
end==========
begin class_method
{'cls': <class '__main__.DemoClass'>, 'arg': 'class'}
class var
failed: type object 'DemoClass' has no attribute 'instance_var'
end==========
begin static_method
{'arg': 'class'}
class var
failed: type object 'DemoClass' has no attribute 'instance_var'
end==========
begin ordinary_function
{'arg': 'class'}
class var
failed: type object 'DemoClass' has no attribute 'instance_var'
end==========
```

- 对象
    - [x] 实例方法
    - [x] 类方法: 无法访问实例属性
    - [x] 静态方法: 无法访问实例属性
    - [ ] 普通函数: 参数多了
- 类
    - [ ] 实例方法: 参数少了
    - [x] 类方法: 无法访问实例属性
    - [x] 静态方法: 无法访问实例属性
    - [x] 普通函数: 无法访问实例属性