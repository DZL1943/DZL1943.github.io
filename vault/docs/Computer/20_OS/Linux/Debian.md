---
created: 2024-04-22T20:39
modified: 2024-05-21T16:59
---

## Tips

- 密码
    - user/live
    - `sudo passwd root`
- 找不到命令
    - 可能是没有添加到环境变量, 用 `whereis` 查找一下
- 重启和关机
    - `sudo systemctl reboot`
    - `sudo systemctl poweroff`
- locale 问题
    - /etc/default/locale
    - `locale-gen en_US.UTF-8` 找不到命令参考上一条
- 时间
    - timedatectl
    - ntp
- 网络
    - `/etc/network/interfaces`
    - `/etc/resolv.conf`
- 软件源 `/etc/apt/sources.list`
    - 清华源
        ```
        # 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
        deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm main contrib non-free non-free-firmware
        # deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm main contrib non-free non-free-firmware

        deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware
        # deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-updates main contrib non-free non-free-firmware

        deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware
        # deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bookworm-backports main contrib non-free non-free-firmware

        # deb https://mirrors.tuna.tsinghua.edu.cn/debian-security bookworm-security main contrib non-free non-free-firmware
        # # deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security bookworm-security main contrib non-free non-free-firmware

        deb https://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware
        # deb-src https://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware
        ```
    - USTC
        ```
        deb http://mirrors.ustc.edu.cn/debian stable main contrib non-free non-free-firmware
        # deb-src http://mirrors.ustc.edu.cn/debian stable main contrib non-free non-free-firmware
        deb http://mirrors.ustc.edu.cn/debian stable-updates main contrib non-free non-free-firmware
        # deb-src http://mirrors.ustc.edu.cn/debian stable-updates main contrib non-free non-free-firmware

        # deb http://mirrors.ustc.edu.cn/debian stable-proposed-updates main contrib non-free non-free-firmware
        # deb-src http://mirrors.ustc.edu.cn/debian stable-proposed-updates main contrib non-free non-free-firmware
        ```
- sudo
    ```shell
    user=x
    echo "$user ALL=(ALL) ALL" >> /etc/sudoers.d/$user  # visudo -f
    sudo -l -U $user
    getent group sudo
    # sudo usermod -aG sudo $user
    ```
- vim `apt-get install vim`
- ssh `apt-get install openssh-server`
- curl
- zsh
    ```shell
    sudo apt-get install zsh
    sudo chsh -s /bin/zsh
    sh -c "$(curl -fsSL https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh)"
    ```