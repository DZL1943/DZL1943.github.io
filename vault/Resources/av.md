---
title: av
created: 2025-10-24T06:39
modified: 2026-01-19T14:57
tags:
  - linker-exclude
unlisted: true
---

<!-- truncate -->

## 视图

```base
filters:
  and:
    - file.folder.startsWith(this.file.folder)
    - file.tags.contains("av")
formulas:
  filteredTags: tags.filter(!/#clippings|#av/.matches(value))
views:
  - type: cards
    name: cards
    groupBy:
      property: formula.filteredTags
      direction: ASC
    order:
      - file.basename
      - file.tags
      - url
    sort:
      - property: file.ctime
        direction: DESC
    image: note.image
    imageAspectRatio: 0.65
  - type: table
    name: table
    order:
      - file.name
      - file.tags
    sort: []

```

## 属性

- 标题 title
- 链接 url
- 封面 image
- 分类 category
- 标签 tags
- 评级 rating
- 备注 note

## 分类

首先按作者、区域分
- Inbox
- UGC
- PGC
    - CN
    - JP
    - US
- CGC
- Archive

其次按内容、人物、场景分

特殊癖好用标签而非分类

## 标签

- clippings
    - 91
    - 51
    - missav
- av
    - 吃瓜福利 solo
    - 室内自拍 Homemade
    - 野战露出 Public
        - ktv、电影院、网吧、超市
        - 酒店、宿舍、办公室、教室、车库、楼道、天台、厕所、公园、野外
        - 车、公交
    - 嫖娼约炮
    - 淫妻绿帽 Cuckold
    - 强奸乱伦
        - 上一辈
            - (继)母亲
            - 岳母(妻子的母亲)
            - 伯母/婶婶(父亲兄弟的妻子)
            - 姑姑(父亲的姐妹)
            - 姨妈(母亲的姐妹)
            - 舅妈(母亲兄弟的妻子)
        - 同辈
            - (堂/表)姐姐/妹妹
            - 嫂子/弟媳(兄弟的妻子)
            - 姨子(妻子的姐妹)
        - 下一辈
            - (继)女儿
            - 侄女(兄弟的女儿)
            - 外甥女(姐妹的女儿)
            - 儿媳
    - 多人运动
    - 变态另类 Hardcore
- appearance
    - 颜值
    - 巨乳 Big Breast
    - 肥臀 Big Ass
    - 美屄 Pussy
    - 巨屌 Big Dick
    - 美腿
- sex
    - 口交 Blowjob
    - 乳交
    - 肛交 Anal
    - 中出 Creampie
    - 颜射 Bukkake
    - 潮吹 Squirt
    - 叫床
    - 爆肏
    - 男上
    - 女上
    - 侧入
    - 后入
    - 站入
    - 坐跪
- role
    - 未成年
    - 熟女 Mature
    - 黑人
    - 素人 Amateur
    - 名人 Celebrity
    - Cosplay
- scene

> [!NOTE]- 词汇
> - 素人 amateur
> - 情侣 couples
> - 模特 models
> - 名人 celebrity
> - 熟女 mature
> - 大奶 BBW
> - 巨屌 Big Dick
> - 肥臀 Big Ass
> - 巨乳 Big Tits
> - 自慰 solo
> - 手淫 masturbation
> - 口交 blowjob
> - 手交 handjob
> - 指交 fingering
> - 拳交 fisting
> - 恋足 feet
> - 爆菊 anal
> - 捆绑 bondage
> - 颜射 bukkake
> - 潮吹 squirt
> - 中出 creampie
> - 舔屄 pussy licking
> - 双洞 double penetration
> - 轮交 gangbang
> - 3P threesome
> - 群交 orgy
> - 重口 hardcore
> - 粗暴 rough
> - 野战 public
> - 绿帽 cuckold
> - 真人实拍 reality
> - 第一视角 POV
> - 脱衣舞 striptease
> - 按摩 massage
> - cosplay
> - 角色扮演 role play
> - 跨性别 transgender
> - 女同 lesbian
> - 日漫 hentai
> - cartoon

## 网站

- https://theporndude.com/zh
- [秘密研究所-秘密导航地址官方发布-入口加载地址页](https://yanjiusuo.lol)
- [Chinese homemade video](https://91porn.com/)
- https://91porny.com/
- [MissAV | 免費高清AV在線看](https://missav.com/)
- [在線成人色情視頻AV電影免費看 - Avgle](https://www.avgle.pro/)
- https://www.pornhub.com/
- https://www.pornbest.org/
- https://fuqqt.com/
- https://www.sesedizhi.fun/
- https://hsex.icu/
- https://xiaohuangshu.me/
- https://cableav.tv/
- https://www.coolinet.net/
- [51吃瓜网](https://51cg.fun/)
- https://kanliao6.net/
- [swag](https://swag.live)
- [草榴](https://www.t66y.com/)
- [海角](https://www.haijiao.com)
- https://hjd2048.com/2048/
- https://www.nicesss.com/

## 女优

- 素人
- 妓女
- 网红
    - 松果儿
    - 九儿
    - 尤妮丝
    - 朱可儿
    - 软软
    - 麻酥酥喲
    - 私人玩物
    - 娜美妖姬
    - 柚子猫
    - Comerzz(Jessie)
    - namprikk
    - 叶美香
- 职业
    - Julia
    - 百花绘美里
    - 织田真子
    - 美波濑奈
    - 叶爱
    - 神乐桃果

## 系列

- 秦先生
- 呆哥

## 工作流

- 通过 Obsidian Web Clipper 剪藏(主要获取 title、url、image)
- 或者借助 Notion 中转, 再用脚本批量处理(保存 markdown 文件)
- 通过 Local Images Plus 插件或 QuickAdd 注册事件自动触发"下载附件" (因为链接可能会失效, 保存图片易于查看)
- 剪藏后的内容用 Bases cards 呈现

