---
created: 2024-04-22T20:39
modified: 2024-05-21T16:59
---
## 命令

- `-l`: 查看
- `-e`: 编辑

## 格式

```
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * <command to execute>
```

注意事项
- 绝对路径
- `%`
- 环境变量
- 日志

## 调试

默认日志在 `/var/mail/$user`

## 例子

```
# 每分钟写入时间
* * * * * /bin/date '+%F %T' >> /tmp/testfile 2>&1
```