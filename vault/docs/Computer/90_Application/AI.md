---
created: 2024-11-06T20:56
modified: 2025-08-29T18:18
draft: true
tags: [AI]
aliases: [LLM, 大模型]
---

# AI

## 概念

%% 需包括所有重要概念, 按发展脉络顺序介绍, 例如 Prompt、RAG、Agent、MCP. %%

- 机器学习(ML)：AI 的一个子集，使系统能够无需显式编程，而是使用算法和统计模型从数据中学习模式。
- 深度学习(DL)：ML 的一个子领域，使用多层神经网络来建模图像、文本和语音等数据中的复杂模式。
- Transformer 架构：2017 年引入的革命性神经网络架构。它使用一种称为"自注意力(Self-Attention)"的机制来理解序列数据中的上下文关系，构成了几乎所有现代大语言模型(LLM)的基础。
- 大语言模型(LLM)：基于 Transformer 架构、在海量文本数据集上预训练的非常大(通常具有数十亿参数)的深度学习模型。它们表现出强大的通用语言理解和生成能力。
- 提示工程(Prompt Engineering)：精心设计输入文本(提示)以有效引导 LLM 产生所需输出的实践。这是与基础模型交互的关键技能。
- 检索增强生成(RAG)：一种通过从外部数据库或知识库检索相关信息来增强 LLM 知识的技术，然后再生成响应，从而提高准确性并减少幻觉。
- AI 智能体(Agent)：一个使用 LLM 作为"大脑"的系统，可以感知环境、做出决策并通过规划和利用工具(如 API、数据库等)执行操作以自主实现给定目标。
- 模型上下文协议(MCP)：由 Anthropic 开创的一种开放协议，旨在标准化 AI 模型(智能体)与外部工具、数据源和服务的交互方式。它通过提供通用标准，旨在解决 M 个客户端与 N 个服务之间的 O(M×N)集成复杂度问题，将其降低到 O(M+N)。

## 模型

%% 用表格完整列举国内国外、开源闭源模型及应用. %%

%% 字段参考: 名称(直接附上链接)、厂商、用途、备注 %%

### 通用

| 名称                                      | 机构            | 用途                                   | 备注                                 |
| ----------------------------------------- | --------------- | -------------------------------------- | ------------------------------------ |
| [ChatGPT](https://chatgpt.com)            | OpenAI          | 通用对话、写作、代码、多轮问答         | 闭源、多模态、插件市场               |
| [Claude](https://claude.ai)               | Anthropic       | 通用对话、长文总结、代码审查           | 闭源、超长上下文                     |
| [Gemini](https://gemini.google.com)       | Google          | 通用对话、搜索增强、实时音视频理解     | 闭源、原生多模态                     |
| [Grok](https://grok.x.ai)                 | xAI             | 通用对话、实时信息检索、X 平台内容总结 | v3 闭源 / v2 开源                    |
| [Llama](https://llama.meta.com)           | Meta            | 通用对话、研究实验、企业私有化         | 开源、社区生态最活跃                 |
| [Qwen](https://tongyi.aliyun.com/qianwen) | 阿里            | 通用对话、中文业务、工具调用           | 开源 & 闭源双轨                      |
| [DeepSeek](https://chat.deepseek.com)     | 深度求索        | 通用对话、数学推理、代码生成           | 开源 & 闭源双轨                      |
| [腾讯元宝](https://yuanbao.tencent.com)   | 腾讯 × 深度求索 | 通用对话、元宝 App 内嵌                | 闭源、元宝 App 专属                  |
| [ChatGLM](https://chatglm.cn)             | 清华&智谱       | 通用对话、中文教育、科研               | 开源 & 闭源双轨                      |
| [Kimi](https://kimi.moonshot.cn)          | 月之暗面        | 通用对话、超长文档阅读、法律/财经分析  | 闭源、256 k 上下文                   |
| [Hunyuan](https://hunyuan.tencent.com)    | 腾讯            | 通用对话、广告创意、游戏 NPC           | 开源 389 B-MoE                       |
| [Doubao](https://www.doubao.com)          | 字节跳动        | 通用对话、抖音内容创作、客服、教育     | 闭源、中文优化                       |
| [MiniMax](https://api.minimaxi.com)       | MiniMax         | 通用对话、出海社交、游戏剧情           | 开源 456 B-MoE                       |
| [01.AI Yi](https://www.01.ai)             | 零一万物        | 通用对话、金融/医疗微调                | 开源 34B / 闭源 API                  |
| [Baichuan 3](https://www.baichuan-ai.com) | 百川智能        | 中文写作、医疗问答                     | 开源 & 闭源双轨                      |
| [InternLM2.5](https://internlm.org.cn)    | 上海 AI Lab     | 通用对话、教育评测                     | 开源 20B / 社区生态                  |
| [Mixtral](https://mistral.ai)             | Mistral AI      | 通用对话、多语言                       | 开源 MoE                             |
| [Perplexity](https://perplexity.ai)       | Perplexity      | 搜索增强问答                           | 闭源, 基于 GPT/Claude 的实时搜索产品 |

### 专用

| 名称 | 机构 | 用途 | 备注 |
|---|---|---|---|
| [Whisper](https://huggingface.co/openai/whisper-large-v3) | OpenAI | 多语 ASR、字幕、会议纪要 | 开源 |
| [Stable Diffusion](https://clipdrop.co/stable-diffusion) | Stability AI | 文生图、LoRA 微调 | 开源 |
| [DALL·E](https://chatgpt.com) | OpenAI | 文生图、图文混合编辑 | 闭源 |
| [Midjourney](https://www.midjourney.com) | Midjourney | 艺术海报、概念原画 | 闭源、Discord 使用 |
| [Suno](https://suno.ai) | Suno AI | 流行歌曲创作 | 闭源、Web 直用 |
| [ElevenLabs](https://elevenlabs.io) | ElevenLabs | 音色克隆、有声书、游戏配音 | 闭源、API & Web |
| [Udio](https://www.udio.com) | Udio | 多风格音乐、伴奏分离 | 闭源、Web & 移动端 |
| [Sora](https://openai.com/sora) | OpenAI | 广告片、短视频、故事板 | 闭源 Beta |
| [Runway](https://runwayml.com) | Runway | 物理仿真视频、镜头设计 | 闭源、Web 直用 |
| [Pika](https://pika.art) | Pika Labs | 秒级短视频、局部重绘 | 闭源、Web 直用 |
| [Luma Dream Machine](https://lumalabs.ai/dream-machine) | Luma AI | 文本→3D 场景、NeRF 渲染 | 闭源、Web 直用 |
| [Kling](https://kling.kuaishou.com) | 快手 | 2 min 1080P 视频、运动一致性 | 闭源 内测 |
| [Hailuo](https://hailuoai.com) | MiniMax | 2 min 1080P 视频 | 闭源 微信 / Web |
| [Vidu](https://vidu.studio) | 生数科技 | 16 秒 1080P 视频 | 闭源 内测 |
| [CodeLlama](https://huggingface.co/codellama) | Meta | 代码补全、调试脚本 | 开源 |
| [DeepSeek-Coder](https://huggingface.co/deepseek-ai) | 深度求索 | 算法题、科研脚本生成 | 开源 |
| [CodeGemma](https://huggingface.co/google/codegemma-2-9b) | Google | 代码补全与调试 | 开源 9 B |
| [ChatGLM-Code](https://chatglm.cn) | 清华 & 智谱 | 中文代码补全 | 开源 |
| [AlphaFold3](https://alphafoldserver.com) | DeepMind | 蛋白质-配体结构预测 | 闭源、Web 平台 |
| [ChemCrow](https://huggingface.co/spaces/ur-whitelab/chemcrow) | CMU | 化学合成路径规划 | 开源 |
| [BioBERT](https://huggingface.co/dmis-lab/biobert-v1.1) | Korea Univ | 生物医学 NER、关系抽取 | 开源 |
| [SciSpace](https://www.scispace.com) | SciSpace | 论文解读、公式问答 | 闭源 Web & 插件 |
| [Galactica](https://huggingface.co/facebook/galactica-120b) | Meta | 学术文本生成、引文 | 开源 120 B |

## 工具

%% 需完整列举全生命周期生态工具链并归类, 例如 Ollama、n8n、Dify、Cherry Studio、Cursor 等 %%

### 模型部署

- [Ollama](https://ollama.ai): 一行命令拉取并本地运行 Llama、Qwen、Mistral 等 GGUF 模型, macOS/Linux/Win 支持.  
- [LM Studio](https://lmstudio.ai): 可视化桌面客户端, 可浏览、下载、聊天, 兼容 OpenAI API.  
- [vLLM](https://github.com/vllm-project/vllm): 高吞吐、PagedAttention 生产级推理引擎, 支持 continuous batching.  
- [SGLang](https://github.com/sgl-project/sglang): 2024 开源, RadixAttention + Chunked Prefill, 长上下文友好.  
- [Xinference](https://github.com/xorbitsai/inference): 国产开源推理平台, 100+ 模型一键服务化, RESTful & gRPC.  

### 应用编排 / LLMOps

- [Hugging Face Transformers](https://huggingface.co/docs/transformers): Python 生态最丰富的预训练模型库.  
- [LangChain](https://python.langchain.com): 链、记忆、工具调用、Agent 的通用框架.  
- [LlamaIndex](https://docs.llamaindex.ai): 专注 RAG 的数据连接与索引框架.  
- [CrewAI](https://crewai.com): 多智能体角色-任务-工具协作框架.  
- [n8n](https://n8n.io): 开源低代码工作流, 节点拖拽即可连接 API、数据库、AI.  
- [Dify](https://dify.ai): 开源 LLMOps 平台, Prompt IDE、RAG、Agent、一键发布 API.  
- [Coze](https://coze.com): 低代码聊天机器人平台, 与抖音、飞书生态深度集成.  
- [Flowise](https://flowiseai.com): 拖拽式 LLM 流程构建器, 一键导出 Docker Compose.  

### 监控与可观测

- [LangSmith](https://smith.langchain.com): LangChain 官方链路追踪、回归测试、在线标注.  
- [Helicone](https://helicone.ai): 开源 LLM 网关, 成本/延迟/Token 级别可视化, 支持 OpenAI & 本地 vLLM.  

### 通用 Agent 平台 / IDE

- [Cursor](https://www.cursor.so): VS Code 深度魔改, 集成 Claude / GPT 与 MCP 的 AI IDE.  
- [GitHub Copilot](https://github.com/features/copilot): 主流编辑器内置 AI 代码补全与对话.  
- [Windsurf](https://windsurf.io): Codeium 出品, 多文件重构、命令行 Agent.  
- [Continue](https://continue.dev): VS Code / JetBrains 开源 AI 插件.  
- [Aider](https://github.com/paul-gauthier/aider): CLI 多文件编辑 + 单元测试.  
- [Cline](https://github.com/cline/cline): VS Code Agent 插件, 可执行命令.  

### MCP 生态

- 官方服务器仓库: [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)  
- 社区导航站:  
  - [AIbase MCP 模型库](https://mcp.aibase.com/zh)  
  - [MCP.so](https://mcp.so)  

## 参考

%% 导航/聚合网站、评测网站、服务平台等 %%

### 导航聚合

- [Hugging Face](https://huggingface.co) 开源模型、数据集、Spaces 演示  
- [ModelScope](https://modelscope.cn) 阿里达摩院中文模型中心  
- [OpenCSG Hub](https://hub.opencsg.com) 中文社区版 Hugging Face  
- [AIbase Model Square](https://model.aibase.cn/models) 国内外模型对比下载  
- [AI-Bot](https://ai-bot.cn) 中文 AI 工具与模型导航  
- [Futurepedia](https://www.futurepedia.io) 英文 AI 工具目录, 日更  
- [TopAI.tools](https://topai.tools) 分类浏览的 AI 工具排行榜  
- [There’s An AI For That](https://theresanaiforthat.com) 按场景搜索的全球 AI 工具库  
- [Toolify](https://www.toolify.ai) AI 工具中文/英文双语聚合  

### 评测与基准

- [Chatbot Arena (LMSYS)](https://chat.lmsys.org) 众包盲测, Elo 实时榜  
- [Open LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard) 学术基准 MMLU/GSM8K 排行  
- [C-Eval 2025](https://cevalbenchmark.com) 中文法律/金融/医学长文本评测  
- [SuperCLUE 琅琊榜](https://www.superclueai.com) 月度中文大模型榜单  

### 数据集 & 微调资源

- [Firefly](https://github.com/yangjianxin1/Firefly) 300 万中文指令微调数据  
- [OpenCSG Dataset Hub](https://datasets.opencsg.com) 中文多领域开源数据集索引  

### 云 API 网关 / 服务平台

- [OpenRouter](https://openrouter.net) 统一 API 调用多家闭源/开源模型  
- Azure OpenAI Service、Google Vertex AI、AWS Bedrock、百度千帆、阿里云百炼、腾讯云 TI-ONE 均提供 MaaS