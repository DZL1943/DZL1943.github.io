---
title: 函数
created: 2025-01-22T10:59
modified: 2026-01-14T19:51
aliases: [函数]
---

# 函数

## 分类

%% [list2node] %%
- 任意
    - 广义
        - 可测
            - 连续: 在其定义域内没有间断点的函数
                - 光滑: 在其定义域内无限次可导的函数
                    - **解析**: 在其定义域内的每一点都可以展开为收敛的幂级数的函数
                        - 代数: 由多项式通过有限次代数运算(加、减、乘、除、开方)得到的函数
                            - 多项式
                            - 有理
                            - 根式
                        - 指数
                        - 对数
                        - 三角、反三角
                        - 双曲、反双曲
                        - 通过幂级数展开定义的函数、特殊函数

## 初等函数

基本初等函数经过有限次的四则运算或有限次的函数复合所构成并可以用一个解析式表出的函数,称为初等函数.

### 幂函数

$f(x) = x^a$

- $a < 0$: 在 $(0, +\infty)$ 单调递减. 都经过点 (1,1)
    - 整数, 比如 $x^{-2}$, $x^{-3}$. 定义域 R/0, 值域 R/0. a 的奇偶决定函数奇偶
    - 分数, 比如 $x^{-\frac{1}{2}}$, $x^{-\frac{1}{3}}$. 定义域、值域分别取决于分母、分子的奇偶性
- $a > 0$: 在 $(0, +\infty)$ 单调递增. $0 < a < 1$ 越增越慢, 图像上凸(横抛); $a > 1$ 越增越快, 图像下凹(竖抛). 都经过点 (0,0) (1,1)
    - 整数, 比如 $x^2$, $x^3$. 定义域 R, 值域 R. a 的奇偶决定函数奇偶
    - 分数, 比如 $x^{\frac{1}{2}}$, $x^{\frac{1}{3}}$. 定义域、值域分别取决于分母、分子的奇偶性

![](https://bkimg.cdn.bcebos.com/pic/ae51f3deb48f8c54d37acd2235292df5e0fe7f15?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080)  
![](<../../Attachments/1761259187581-800983.png>)

$$\frac{d}{dx} [x^n] = n x^{n-1}$$

$$ \int x^n \, dx = \frac{x^{n+1}}{n+1} + C \quad (n \neq -1) $$

### 指数函数

$f(x) = a^x$, 其中 $a > 0$ 且 $a \neq 1$. 定义域 $\mathbb{R}$, 值域 $(0, +\infty)$

- $0 < a < 1$, 单调递减
- $a > 1$, 单调递增
- $f(0) = a^0 = 1$

$$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$

$$\frac{d}{dx} [e^x] = e^x$$  
$$\frac{d}{dx} [a^x] = a^x \ln a$$

$$ \int e^x \, dx = e^x + C $$  
$$ \int a^x \, dx = \frac{a^x}{\ln a} + C $$

### 对数函数

$f(x) = \log_a x$, 其中 $a > 0$ 且 $a \neq 1$. 定义域 $(0, +\infty)$, 值域 $\mathbb{R}$

- $0 < a < 1$, 单调递减
- $a > 1$, 单调递增
- $f(1) = \log_a 1 = 0$
- $f(a) = \log_a a = 1$

$$\ln(x) = \sum_{n=1}^{\infty} (-1)^{n+1} \frac{(x-1)^n}{n} = (x-1) - \frac{(x-1)^2}{2} + \frac{(x-1)^3}{3} - \cdots$$

$$ \frac{d}{dx} [\ln x] = \frac{1}{x} $$  
$$ \frac{d}{dx} [\log_a x] = \frac{1}{x \ln a} $$

$$ \int \frac{1}{x} \, dx = \ln |x| + C $$

### 三角函数

- 正弦 $f(x) = \sin x = \sum_{n=0}^{\infty} (-1)^n \frac{x^{2n+1}}{(2n+1)!} = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots$. 定义域 R, 值域 $[-1, 1]$
- 余弦 $f(x) = \cos(x) = \sum_{n=0}^{\infty} (-1)^n \frac{x^{2n}}{(2n)!} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots$. 定义域 R, 值域 $[-1, 1]$
- 正切 $f(x) = \tan(x) = \sum_{n=1}^{\infty} \frac{(-1)^{n-1} 2^{2n} (2^{2n}-1) B_{2n}}{(2n)!} x^{2n-1} = x + \frac{x^3}{3} + \frac{2x^5}{15} + \frac{17x^7}{315} + \cdots$. 定义域 $x \neq \frac{\pi}{2} + k\pi, \quad k \in \mathbb{Z}$, 值域 R
- 余切 $f(x) = \cot x$. 定义域 $x \neq k\pi, \quad k \in \mathbb{Z}$, 值域 R
- 正割 $f(x) = \sec x$. 定义域 $x \neq \frac{\pi}{2} + k\pi, \quad k \in \mathbb{Z}$, 值域 $(-\infty, -1] \cup [1, +\infty)$
- 余割 $f(x) = \csc x$. 定义域 $x \neq k\pi, \quad k \in \mathbb{Z}$, 值域 $(-\infty, -1] \cup [1, +\infty)$

$$ \frac{d}{dx} [\sin x] = \cos x $$  
$$ \frac{d}{dx} [\cos x] = -\sin x $$  
$$ \frac{d}{dx} [\tan x] = \sec^2 x $$  
$$ \frac{d}{dx} [\cot x] = -\csc^2 x $$  
$$ \frac{d}{dx} [\sec x] = \sec x \tan x $$  
$$ \frac{d}{dx} [\csc x] = -\csc x \cot x $$

$$ \int \sin x \, dx = -\cos x + C $$  
$$ \int \cos x \, dx = \sin x + C $$  
$$ \int \tan x \, dx = -\ln |\cos x| + C $$  
$$ \int \cot x \, dx = \ln |\sin x| + C $$  
$$ \int \sec x \, dx = \ln |\sec x + \tan x| + C $$  
$$ \int \csc x \, dx = -\ln |\csc x + \cot x| + C $$

| 角度(θ) | 弧度              | sinθ                 | cosθ                 | tanθ                 |
| ----- | --------------- | -------------------- | -------------------- | -------------------- |
| 0°    | $0$             | $0$                  | $1$                  | $0$                  |
| 30°   | $\frac{\pi}{6}$ | $\frac{1}{2}$        | $\frac{\sqrt{3}}{2}$ | $\frac{\sqrt{3}}{3}$ |
| 45°   | $\frac{\pi}{4}$ | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{2}}{2}$ | $1$                  |
| 60°   | $\frac{\pi}{3}$ | $\frac{\sqrt{3}}{2}$ | $\frac{1}{2}$        | $\sqrt{3}$           |
| 90°   | $\frac{\pi}{2}$ | $1$                  | $0$                  | 无定义                  |

### 反三角函数

- 反正弦 $f(x) = \arcsin x$
- 反余弦 $f(x) = \arccos x$
- 反正切 $f(x) = \arctan x$

$$ \frac{d}{dx} [\arcsin x] = \frac{1}{\sqrt{1-x^2}} $$  
$$ \frac{d}{dx} [\arccos x] = -\frac{1}{\sqrt{1-x^2}} $$  
$$ \frac{d}{dx} [\arctan x] = \frac{1}{1+x^2} $$  
$$ \frac{d}{dx} [\text{arccot } x] = -\frac{1}{1+x^2} $$  
$$ \frac{d}{dx} [\text{arcsec } x] = \frac{1}{|x|\sqrt{x^2-1}} $$  
$$ \frac{d}{dx} [\text{arccsc } x] = -\frac{1}{|x|\sqrt{x^2-1}} $$

$$ \int \frac{1}{\sqrt{1-x^2}} \, dx = \arcsin x + C $$  
$$ \int \frac{1}{1+x^2} \, dx = \arctan x + C $$

### 常数函数

%% (在数学分析中包括, 在高等数学中不包括) %%
