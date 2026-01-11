---
created: 2025-04-02T20:08
modified: 2025-04-02T20:09
---

## Word

## Excel

### 拖动行列

移动光标到边框处, 待光标变为手型, 按住 shift 拖动.

### 下拉填充

### 冻结前几行

选中第 n+1 行, 视图-冻结窗格

### 隐藏列

### 多条件筛选

### 行高列宽

### 条件格式

### 引用其他 sheet 中的行

1. 选择目标单元格
2. 输入=
3. 切换到对应 sheet, 用鼠标选择区域, 回车
4. 处理空值例如 `IF(Sheet2!A5:P7="", "", Sheet2!A5:P7)`

例子: A5:P7、A5:P9、A5:P7, 从第六行开始.
```
IFERROR(
  IF((ROW()-5)>SUMPRODUCT(ROWS(Data1), ROWS(Data2), ROWS(Data3)), "",
  IF((ROW()-5)<=ROWS(Data1),
    INDEX(Data1, ROW()-5, COLUMN()) & "",
  IF((ROW()-5)<=ROWS(Data1)+ROWS(Data2),
    INDEX(Data2, (ROW()-5)-ROWS(Data1), COLUMN()) & "",
    INDEX(Data3, (ROW()-5)-ROWS(Data1)-ROWS(Data2), COLUMN()) & ""
  ))), 
"")
```

### 分类汇总

### 图表

## PPT