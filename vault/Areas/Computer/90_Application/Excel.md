## Tips

### 只读

文件属性

### 分屏

视图-重排窗口

### 高亮行列

视图

### 选中当前列到头尾

ctrl+shift+上/下

### 序号填充

### 筛选

先选择当前列所有数据（包括表头），再筛选

### 移动行列

移动光标到边框处, 待光标变为手型, 按住 shift 拖动.

### 冻结表头

选中要冻结的下一行，可以冻结前 n 行

### 标题

用单元格格式-对齐-跨列居中替代合并单元格

### 自动边框

### 修订

### 条件格式

### 从总表提取部分

例如参考当前 sheet 的 A2，比对总表的 C 列，提取其后第五列的值
`vlookup(A2, 总表!C:G,5,0)`

检查重名 `=COUNTIF(总表!C:C,D4)`

### 数据透视表

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