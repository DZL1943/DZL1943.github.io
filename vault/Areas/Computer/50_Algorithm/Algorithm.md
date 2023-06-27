---
title: 算法
created: 2023-06-08T18:11
modified: 2026-01-14T19:25
aliases:
  - 算法
sidebar_position: 1
---

# 算法

## 算法分析

![](https://bkimg.cdn.bcebos.com/formula/50478f879e8dea5a7b0de4ea6cc73295.svg)

## [排序和查找](<排序和查找.md>)

## 整数算法

## 字符串算法

### KMP

```python
def kmp_search(text, pattern):
    """
    KMP算法字符串匹配
    :param text: 文本字符串
    :param pattern: 匹配模式字符串
    :return: 成功匹配的位置列表,若无匹配则返回空列表
    """

    n = len(text)
    m = len(pattern)

    if m == 0:
        return [i for i in range(n)]

    # 计算前缀表
    prefix = get_prefix(pattern)

    j = 0
    matches = [] # 存储匹配成功的位置

    for i in range(n):
        while j > 0 and text[i] != pattern[j]:
            # 不匹配时,回溯到上一个可能的匹配位置,即prefix[j-1]
            j = prefix[j-1]

        if text[i] == pattern[j]:
            # 当前字符匹配,则继续比较下个字符
            j += 1

        if j == m:
            # 完全匹配时,记录当前匹配位置
            matches.append(i - m + 1)
            # 回溯到上一个可能的匹配位置,继续查找下一次匹配
            j = prefix[j-1]
    return matches

def get_prefix(pattern):
    """
    计算模式串的前缀表
    :param pattern: 模式串
    :return: 前缀表
    """
    m = len(pattern)
    prefix = [0] * m
    j = 0

    for i in range(1, m):
        while j > 0 and pattern[i] != pattern[j]:
            j = prefix[j-1]

        if pattern[i] == pattern[j]:
            j += 1

        prefix[i] = j

    return prefix
```

### 最长公共子串

```python
def longest_common_substring(str1, str2):
    m = len(str1)
    n = len(str2)
    # 二维数组初始化为0,用于记录子问题的解
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    # 记录最长公共子串的长度
    max_length = 0
    # 记录最长公共子串在两个字符串中的结束位置
    end_index = 0
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
                if dp[i][j] > max_length:
                    max_length = dp[i][j]
                    end_index = i
            else:
                dp[i][j] = 0
    # 返回最长公共子串
    return str1[end_index - max_length: end_index]
```

### 最长公共子序列

```python
def longest_common_subsequence(str1, str2):
    m = len(str1)
    n = len(str2)
    # 二维数组初始化为 0,用于记录子问题的解
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    # 回溯获取最长公共子序列
    lcs = ""
    while m > 0 and n > 0:
        if str1[m - 1] == str2[n - 1]:
            lcs = str1[m - 1] + lcs
            m -= 1
            n -= 1
        elif dp[m - 1][n] >= dp[m][n - 1]:
            m -= 1
        else:
            n -= 1
    return lcs
```

## 双指针

- 左右指针
- 快慢指针
- 滑动窗口

### 三数之和

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        nums.sort()
        ans = list()

        # 枚举 a
        for first in range(n):
            # 需要和上一次枚举的数不相同
            if first > 0 and nums[first] == nums[first - 1]:
                continue
            # c 对应的指针初始指向数组的最右端
            third = n - 1
            target = -nums[first]
            # 枚举 b
            for second in range(first + 1, n):
                # 需要和上一次枚举的数不相同
                if second > first + 1 and nums[second] == nums[second - 1]:
                    continue
                # 需要保证 b 的指针在 c 的指针的左侧
                while second < third and nums[second] + nums[third] > target:
                    third -= 1
                # 如果指针重合,随着 b 后续的增加
                # 就不会有满足 a+b+c=0 并且 b<c 的 c 了,可以退出循环
                if second == third:
                    break
                if nums[second] + nums[third] == target:
                    ans.append([nums[first], nums[second], nums[third]])

        return ans
```

### 删除有序数组中的重复项

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums:
            return 0

        n = len(nums)
        fast = slow = 1
        while fast < n:
            if nums[fast] != nums[fast - 1]:
                nums[slow] = nums[fast]
                slow += 1
            fast += 1

        return slow
```

## 递归

## 分治

## 动态规划

### 子序列问题

### 路径问题

### 背包问题

## 回溯

### 组合

```python
def combine(n, k):
    def backtrack(index, pth):
        if len(pth) == k:
            res.append(pth[:])
            return
        for i in range(index, n + 1):
            # 剪枝操作,如果剩余数字不够填满当前组合,直接跳过
            if len(pth) + (n - i + 1) < k:
                break
            pth.append(i)
            backtrack(i + 1, pth)
            pth.pop()

    res = []
    backtrack(1, [])
    return res
```

### 排列

```python
def permute(nums):
    # 定义回溯函数,first 表示当前要处理的位置
    def backtrack(first):
        # 如果已经处理完了所有的数,将当前结果添加到答案数组中,并返回
        if first == n:
            res.append(nums[:])
            return
        # 尝试填入剩余的每个数字,并递归处理下一个位置
        for i in range(first, n):
            # 将第 first 个数字与第 i 个数字交换位置
            nums[first], nums[i] = nums[i], nums[first]
            # 递归处理下一个位置
            backtrack(first + 1)
            # 恢复原有状态,以便进行下一次尝试
            nums[first], nums[i] = nums[i], nums[first]

    # 计算列表长度
    n = len(nums)
    # 创建答案数组
    res = []
    # 调用回溯函数,从第 0 个位置开始搜索
    backtrack(0)
    # 返回答案数组
    return res
```

### 子集

## 贪心