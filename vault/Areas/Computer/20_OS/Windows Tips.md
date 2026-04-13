## 剪切板

win+v

## 截屏

win+shift+s

## 图片压缩

## 查看 ip

## 更改主机名

`Rename-Computer -NewName "desktop-newname" -Restart`

## 进程管理

查找：`tasklist | findstr xxx`

停止：`taskkill /PID xxx`

## 后台运行

`Start-Process .\filebrowser.exe -ArgumentList "-c config.yaml" -WindowStyle Hidden`

## wsl

查询 `wsl -l -v`

安装 `wsl --install`

运行 `wsl`

停止：`wsl --shutdown`