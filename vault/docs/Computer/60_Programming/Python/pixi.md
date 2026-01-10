---
created: 2025-11-04T18:43
modified: 2025-11-04T18:43
url:
  - https://pixi.sh/
---

## 安装

`curl -fsSL https://pixi.sh/install.sh | sh`
or `wget -qO- https://pixi.sh/install.sh | sh`

```shell
autoload -Uz compinit && compinit  # redundant with Oh My Zsh
eval "$(pixi completion --shell zsh)"
```

卸载
```shell
pixi clean cache
cd path/to/workspace && pixi clean
rm -r ~/.pixi
# remove `~/.pixi/bin` from your `PATH` in your shell configuration file (e.g., `~/.bashrc`, `~/.zshrc`).
```

配置: https://pixi.sh/latest/reference/pixi_configuration/

## 概念

https://pixi.sh/latest/reference/pixi_manifest/

- workspace | 工作区可包含多个环境. 支持两种清单格式：`pyproject.toml` 和 `pixi.toml`
- environments | 环境是功能的集合. Pixi 始终为您的工作区创建一个 `default` 环境，其中包含您的依赖项并在其中运行您的任务。您还可以在一个工作区中包含多个环境 。这些环境位于工作区根目录的 `.pixi/envs` 目录中。环境由一个或多个功能构建。
- feature
- dependencies
- tasks
- activation
- target
- package
- system-requirements
- pypi-options

> [!NOTE]
> Conda has a base environment, which is the default environment when you start a new shell. **Pixi does not have a base environment**. And requires you to install the tools you need in the workspace or globally. Using `pixi global install bat` will install `bat` in a global environment, which is not the same as the `base` environment in conda.

> [!NOTE] Environment vs Workspace
> `Conda` and `mamba` focus on managing environments, while `pixi` emphasizes workspaces. In `pixi`, a workspace is a folder containing a [manifest](https://pixi.sh/latest/reference/pixi_manifest/) (`pixi.toml` / `pyproject.toml`) file that describes the workspace, a `pixi.lock` lock-file that describes the exact dependencies, and a `.pixi` folder that contains the environment.
> 
> This workspace-centric approach allows for easy sharing and collaboration, as the workspace folder contains all the necessary information to recreate the environment. It manages more than one environment for more than one platform in a single workspace, and allows for easy switching between them. (See [multiple environments](https://pixi.sh/latest/workspace/multi_environment/))

> [!NOTE] Global environments
> `conda` installs all environments in one global location. When this is important to you for filesystem reasons, you can use the [detached-environments](https://pixi.sh/latest/reference/pixi_configuration/#detached-environments) feature of pixi.
> 
> ```
> pixi config set detached-environments true
> # or a specific location
> pixi config set detached-environments /path/to/envs
> ```
> 
> This doesn't allow you to activate the environments using `pixi shell -n` but it will make the installation of the environments go to the same folder.
> 
> `pixi` does have the `pixi global` command to install tools on your machine. (See [global](https://pixi.sh/latest/reference/cli/pixi/global/)) This is not a replacement for `conda` but works the same as [`pipx`](https://pipx.pypa.io/stable/) and [`condax`](https://mariusvniekerk.github.io/condax/). It creates a single isolated environment for the given requirement and installs the binaries into the global path.

## 用法

https://pixi.sh/latest/getting_started/

| 命令                                                                    | 描述                                                                         |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`add`](https://pixi.sh/latest/reference/cli/pixi/add/)                 | 向工作区添加依赖项                                                           |
| [`auth`](https://pixi.sh/latest/reference/cli/pixi/auth/)               | 登录 prefix.dev 或 anaconda.org 服务器以访问私人频道                         |
| [`build`](https://pixi.sh/latest/reference/cli/pixi/build/)             | 工作区配置                                                                   |
| [`clean`](https://pixi.sh/latest/reference/cli/pixi/clean/)             | 清理环境                                                                     |
| [`completion`](https://pixi.sh/latest/reference/cli/pixi/completion/)   | 为 shell 生成完成脚本                                                        |
| [`config`](https://pixi.sh/latest/reference/cli/pixi/config/)           | 配置管理                                                                     |
| [`exec`](https://pixi.sh/latest/reference/cli/pixi/exec/)               | 运行命令并将其安装在临时环境中                                               |
| [`global`](https://pixi.sh/latest/reference/cli/pixi/global/)           | 用于全局包管理作的子命令                                                     |
| [`info`](https://pixi.sh/latest/reference/cli/pixi/info/)               | 有关当前计算机的系统、工作区和环境的信息                                     |
| [`init`](https://pixi.sh/latest/reference/cli/pixi/init/)               | 创建新工作区                                                                 |
| [`import`](https://pixi.sh/latest/reference/cli/pixi/import/)           | 将文件导入到现有工作区中的环境中。                                           |
| [`install`](https://pixi.sh/latest/reference/cli/pixi/install/)         | 安装环境，同时更新锁文件和安装环境                                           |
| [`list`](https://pixi.sh/latest/reference/cli/pixi/list/)               | 列出工作区的包                                                               |
| [`lock`](https://pixi.sh/latest/reference/cli/pixi/lock/)               | 在不安装环境的情况下解决环境并更新锁定文件                                   |
| [`reinstall`](https://pixi.sh/latest/reference/cli/pixi/reinstall/)     | 重新安装环境，更新锁文件和重新安装环境                                       |
| [`remove`](https://pixi.sh/latest/reference/cli/pixi/remove/)           | 从工作区中删除依赖项                                                         |
| [`run`](https://pixi.sh/latest/reference/cli/pixi/run/)                 | 在 pixi 环境中运行任务                                                       |
| [`search`](https://pixi.sh/latest/reference/cli/pixi/search/)           | 搜索 conda 包                                                                |
| [`self-update`](https://pixi.sh/latest/reference/cli/pixi/self-update/) | 将 pixi 更新到最新版本或特定版本                                             |
| [`shell`](https://pixi.sh/latest/reference/cli/pixi/shell/)             | 在 pixi 环境中启动 shell，运行 `exit` 离开 shell                             |
| [`shell-hook`](https://pixi.sh/latest/reference/cli/pixi/shell-hook/)   | 打印 pixi 环境激活脚本                                                       |
| [`task`](https://pixi.sh/latest/reference/cli/pixi/task/)               | 与工作区中的任务交互                                                         |
| [`tree`](https://pixi.sh/latest/reference/cli/pixi/tree/)               | 显示工作区依赖项树                                                           |
| [`update`](https://pixi.sh/latest/reference/cli/pixi/update/)           | `update` 命令检查是否有较新版本的依赖项，并相应地更新 `pixi.lock` 文件和环境 |
| [`upgrade`](https://pixi.sh/latest/reference/cli/pixi/upgrade/)         | 检查是否有较新版本的依赖项，并在锁定文件和清单文件中升级它们                 |
| [`upload`](https://pixi.sh/latest/reference/cli/pixi/upload/)           | 上传 conda 包                                                                |
| [`workspace`](https://pixi.sh/latest/reference/cli/pixi/workspace/)     | 通过命令行修改工作空间配置文件                                               |
