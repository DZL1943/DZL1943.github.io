---
created: 2026-01-11T21:02
modified: 2026-01-11T21:47
aliases:
  - OSI模型
  - TCP/IP
sidebar_position: 1
---

## 接口层

### 物理层 Physical

%% 比特 Bit %%
- 有线
    - IEEE 802.3:以太网系列(10BASE-T, 100BASE-TX, 1000BASE-T等)
    - RS-232:串行通信接口标准
    - USB:通用串行总线
    - 光纤通道:光纤通信标准
    - 同轴电缆:DOCSIS(有线电视网络)
- 无线
    - IEEE 802.11:Wi-Fi系列(a/b/g/n/ac/ax/be)
    - IEEE 802.15.1:蓝牙
    - IEEE 802.15.4:ZigBee
    - IEEE 802.16:WiMAX
    - 蜂窝物理层:GSM/CDMA/4G LTE/5G NR

### 数据链路层 Data Link

%% 帧 Frame %%
- 逻辑链路控制(LLC):
    - IEEE 802.2:提供统一的接口给网络层
- 介质访问控制(MAC):
    - 以太网 (802.3): CSMA/CD(有线局域网主流)
    - Wi-Fi (802.11): CSMA/CA(无线局域网主流)
    - PPP (RFC 1661): 点对点协议(拨号、PPPoE)
    - HDLC: 高级数据链路控制(路由器串行链路)
    - 帧中继: 广域网帧交换(传统企业网)
- 二层隧道协议:
    - L2TP (RFC 2661): 二层隧道协议(常与IPsec结合)
- 二层交换协议:
    - STP/RSTP/MSTP (802.1D/w/s): 生成树协议(防环)
    - VLAN (802.1Q): 虚拟局域网(逻辑隔离)
    - LLDP (802.1AB): 链路层发现协议(邻居发现)
- 地址解析协议(网络层辅助,工作在链路层)
    - ARP: 地址解析协议(IP -> MAC)
    - RARP: 反向地址解析协议(MAC -> IP,已被DHCP取代)

## 网络层 Network

%% 包 Packet %%
- 核心协议
    - IPv4 (RFC 791): 互联网协议版本4(32位地址)
    - IPv6 (RFC 8200): 互联网协议版本6(128位地址)
    - ICMP (RFC 792): 互联网控制报文协议(Ping、差错报告)
    - IGMP: 互联网组管理协议(组播成员管理)
- 路由协议
    - RIP (RFC 2453): 距离矢量路由协议(小型网络)
    - OSPF (RFC 2328): 链路状态内部网关协议(大中型企业网)
    - IS-IS: 中间系统到中间系统(ISP骨干网常用)
    - BGP (RFC 4271): 路径矢量外部网关协议(互联网核心)
    - EIGRP: 增强型内部网关路由协议(思科私有高级协议
- 地址转换
    - NAT: 网络地址转换(私有地址与公有地址转换)

## 传输层 Transport

%% 段 Segment %%
- TCP (RFC 793): 传输控制协议(面向连接、可靠、有序)
- 关键机制:三次握手、流量控制、拥塞控制
- UDP (RFC 768): 用户数据报协议(无连接、尽力而为、低延迟)
- QUIC (RFC 9000): 基于UDP,集成TLS,减少握手延迟(HTTP/3基础)
- SCTP (RFC 4960): 流控制传输协议(多宿主、多流,用于电信信令)
- RTP (RFC 3550): 实时传输协议(承载音视频流,通常基于UDP)
- RTCP (RFC 3550): RTP控制协议(质量反馈、同步)

## 应用层

### 会话层 Session

- SSH/TLS握手: 建立安全会话连接
- RPC: 远程过程调用
- NetBIOS: 网络基本输入输出系统(传统Windows网络)

### 表示层 Presentation

- TLS/SSL:传输层安全(加密、认证)
- 数据格式:
    - JPEG/PNG/GIF:图像格式
    - MPEG/AVI:视频格式
    - ASCII/Unicode:字符编码
    - XML/JSON:数据交换格式
- 加密算法:AES、DES、RSA
- 压缩算法:gzip、deflate、LZ77

### 应用层 Application

%% 报文 Message %%
- Web协议:
    - HTTP/HTTPS (RFC 7230, 2818): 超文本传输(安全)协议
    - WebSocket (RFC 6455): 全双工通信协议
- 文件传输:
    - FTP (RFC 959): 文件传输协议
    - SFTP/SCP: 基于SSH的安全文件传输
    - TFTP: 简单文件传输协议(无认证)
- 电子邮件:
    - SMTP (RFC 5321): 简单邮件传输协议(发送)
    - POP3 (RFC 1939)/IMAP (RFC 3501): 邮件接收协议
    - NNTP: 网络新闻传输协议(新闻组服务)
- 域名系统:
    - DNS (RFC 1034/1035): 域名系统(核心服务:域名与IP地址映射)
    - DHCP (RFC 2131): 动态主机配置协议(自动分配IP)
- 网络管理:
    - SNMP (RFC 1157): 简单网络管理协议
    - NTP (RFC 5905): 网络时间协议(时间同步)
- 远程访问:
    - SSH (RFC 4251): 安全外壳协议(加密命令行访问)
    - Telnet (RFC 854): 远程终端协议(明文,不安全)
- 目录服务:
    - LDAP (RFC 4511): 轻量级目录访问协议