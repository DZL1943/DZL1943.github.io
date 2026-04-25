---
title: AI
created: 2026-03-25T23:05
modified: 2026-03-25T23:05
---

<!-- truncate -->

# AI

## 概念

- LLM: 大语言模型, 负责处理信息和下达操作命令
- Agent: 负责执行操作并上报结果, 本质是提示词工程
- RAG: 一种专用于知识库的 Agent
- MCP: 扩展 Agent 能做的操作, 本质是一个接口协议
- Skill: 本质是供 Agent 查阅的文档或脚本

## 工具

国内
- 字节跳动|豆包
- 阿里|千问
- 腾讯|元宝
- DeepSeek
- Kimi
- 智谱|GLM
- MiniMax

国外
- OpenAI|GPT
- Microsoft|Copilot
- Google|Gemini
- Anthropic|Claude
- xAI|Grok

其他
- OpenCode
- OpenClaw:即龙虾.主要能力为 agent+远程聊天,即让一个 agent 在电脑上自主运行,而你可以通过消息软件远程指挥它.

## 应用

- 办公
- 图片
- 视频
- 编程

国内多模态主要是豆包、千问、元宝.  
建议先用思维能力更强的 AI(DeepSeek、Kimi)生成提示词,再让这些工具进行内容创作.

传统应用接入 AI 的通用思路: 用 AI 生成扩展脚本, 在应用中加载运行.(前提是应用支持扩展)

## 进阶