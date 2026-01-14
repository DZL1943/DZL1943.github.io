---
title: 概率
created: 2025-02-11T22:48
modified: 2026-01-14T19:51
aliases: [概率]
---

# 概率

## 定义

古典定义: 试验只有有限个等可能性的基本结果. $P(A)=\frac{m}{n}$  
频率定义:  
统计定义:  
公理化定义: 非负性, 规范性, 可列可加性

## 事件

- 随机事件
- 必然事件 $P(\Omega) = 1$
- 不可能事件 $P(\emptyset) = 0$
- 对立事件(补事件) $A \cup \overline{A} = \Omega$ 且 $A \cap \overline{A} = \emptyset$, $P(\overline{A}) = 1 - P(A)$
- 互斥事件 $A \cap B = \emptyset$, $P(A \cup B) = P(A) + P(B)$
- 独立事件 $P(A \cap B) = P(A) \cdot P(B)$, $P(A \mid B) = P(A)$ 或 $P(B \mid A) = P(B)$
- 条件事件 $P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad \text{其中 } P(B) > 0$

## 概型

### 离散型概率分布

描述取值为离散随机变量的概率分布.

- 古典分布(离散均匀分布)
- 伯努利分布(Bernoulli Distribution)
- 二项分布(Binomial Distribution)
- 几何分布(Geometric Distribution)
- 负二项分布(Negative Binomial Distribution)
- 泊松分布(Poisson Distribution)
- 超几何分布(Hypergeometric Distribution)
- 多项分布(Multinomial Distribution)

### 连续型概率分布

描述取值为连续随机变量的概率分布.

- 均匀分布(Uniform Distribution)
- 正态分布(Normal Distribution)
- 指数分布(Exponential Distribution)
- 伽马分布(Gamma Distribution)
- 贝塔分布(Beta Distribution)
- 对数正态分布(Log-Normal Distribution)
- 威布尔分布(Weibull Distribution)
- 柯西分布(Cauchy Distribution)
- 拉普拉斯分布(Laplace Distribution)
- 帕累托分布(Pareto Distribution)

### 多维概率分布

描述多个随机变量的联合分布.

- 多项分布(Multinomial Distribution)
- 狄利克雷分布(Dirichlet Distribution)
- 多元正态分布(Multivariate Normal Distribution)

### 统计推断中的抽样分布

用于统计推断和假设检验的分布.

- 卡方分布(Chi-Square Distribution)
- t分布(Student's t-Distribution)
- F分布(F-Distribution)

### 重尾分布

尾部概率衰减较慢,适合描述极端事件.

- 柯西分布(Cauchy Distribution)
- 帕累托分布(Pareto Distribution)

### 时间或空间相关分布

描述与时间或空间相关的随机现象.

- 泊松分布(Poisson Distribution)
- 指数分布(Exponential Distribution)
- 伽马分布(Gamma Distribution)
- 威布尔分布(Weibull Distribution)

### 贝叶斯统计中的分布

常用于贝叶斯统计中的先验或后验分布.

- 贝塔分布(Beta Distribution)
- 狄利克雷分布(Dirichlet Distribution)
- 伽马分布(Gamma Distribution)

### 特殊用途分布

用于特定领域或问题的分布.

- 对数正态分布(Log-Normal Distribution)(金融、生物学)
- 威布尔分布(Weibull Distribution)(可靠性工程)
- 拉普拉斯分布(Laplace Distribution)(信号处理)
- 超几何分布(Hypergeometric Distribution)(质量控制)
