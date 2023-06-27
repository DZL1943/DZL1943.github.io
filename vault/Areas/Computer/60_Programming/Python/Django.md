---
created: 2024-04-22T20:39
modified: 2024-05-21T16:59
---
## 入门

https://docs.djangoproject.com/zh-hans/4.2/

创建项目: `django-admin startproject mysite`

目录结构
- mysite: 项目名称(可随意修改)
    - manage.py
    - mysite: 默认应用
        - asgi.py
        - settings.py
        - urls.py
        - wsgi.py

运行: `python manage.py runserver`

创建应用: `python manage.py startapp appname`

## django-admin

```
    check
    compilemessages
    createcachetable
    dbshell
    diffsettings
    dumpdata
    flush
    inspectdb
    loaddata
    makemessages
    makemigrations
    migrate
    optimizemigration
    runserver
    sendtestemail
    shell
    showmigrations
    sqlflush
    sqlmigrate
    sqlsequencereset
    squashmigrations
    startapp
    startproject
    test
    testserver

manage.py 会在每个 Django 项目中自动创建。它做的事情和 django-admin 一样，但也设置了 DJANGO_SETTINGS_MODULE 环境变量，使其指向你的项目的 settings.py 文件。

一般来说，当你在一个 Django 项目中工作时，使用 manage.py 比使用 django-admin 更容易。如果你需要在多个 Django 配置文件之间切换，可以使用 django-admin 与 DJANGO_SETTINGS_MODULE 或 --settings 命令行选项。
```

## [DRF](https://www.django-rest-framework.org/)

## [django-ninja](https://django-ninja.rest-framework.com/)

```python
# api.py
from ninja import NinjaAPI

api = NinjaAPI()

@api.get("/hello")
def hello(request, name="world"):
    return f"Hello {name}"
```

```python
# urls.py
from django.contrib import admin
from django.urls import path
from .api import api

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api.urls),
]
```