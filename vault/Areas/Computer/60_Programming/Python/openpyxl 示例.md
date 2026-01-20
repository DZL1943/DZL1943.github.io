
```python
from openpyxl import load_workbook, Workbook
import sys

# 江西省的市级行政区及其下属县
jiangxi_cities = {
    "南昌市": ["南昌县", "安义县", "进贤县", "青云谱区", "新建区"],
    "景德镇市": ["浮梁县", "乐平市"],
    "萍乡市": ["莲花县", "芦溪县", "上栗县", "湘东区"],
    "九江市": ["九江县", "武宁县", "修水县", "永修县", "德安县", "都昌县", "湖口县", "彭泽县", "瑞昌市", "共青城市", "庐山市"],
    "新余市": ["分宜县"],
    "鹰潭市": ["余江县", "贵溪市"],
    "赣州市": ["赣县", "信丰县", "大余县", "上犹县", "崇义县", "安远县", "龙南县", "定南县", "全南县", "宁都县", "于都县", "兴国县", "会昌县", "寻乌县", "石城县", "瑞金市", "南康市"],
    "吉安市": ["吉安县", "吉水县", "峡江县", "新干县", "永丰县", "泰和县", "遂川县", "万安县", "安福县", "永新县", "井冈山市", "吉州区"],
    "宜春市": ["奉新县", "万载县", "上高县", "宜丰县", "靖安县", "铜鼓县", "丰城市", "樟树市", "高安市"],
    "抚州市": ["南城县", "黎川县", "南丰县", "崇仁县", "乐安县", "宜黄县", "金溪县", "资溪县", "东乡县", "广昌县", "临川区"],
    "上饶市": ["上饶县", "广丰县", "玉山县", "铅山县", "横峰县", "弋阳县", "余干县", "鄱阳县", "万年县", "婺源县", "德兴市", "三清山"]
}

def read_excel_file(file_path):
    try:
        workbook = load_workbook(filename=file_path)
        return workbook
    except Exception as e:
        print(f"读取Excel文件时出错: {e}")
        return None

def save_excel_file(data, outfile, has_header=True):
    try:
        workbook = Workbook()
        workbook.remove(workbook.active)  # 删除默认的 Sheet

        for sheet_name, rows in data.items():
            # 如果数据为空，或者有表头且数据仅有表头，则跳过创建
            if not rows or (has_header and len(rows) <= 1):
                print(f"工作表 {sheet_name} 无数据或仅有表头，跳过创建")
                continue

            sheet = workbook.create_sheet(title=sheet_name)
            # 直接遍历所有行并写入
            for row in rows:
                sheet.append(row)

        workbook.save(filename=outfile)
        print(f"数据已保存到文件: {outfile}")
    except Exception as e:
        print(f"保存Excel文件时出错: {e}")

def get_city_by_name(input_str):
    """
    根据输入的字符串（县名或市名），返回所属的市名。
    :param input_str: 输入的字符串（县名或市名）
    :return: 所属的市名，如果不属于任何市则返回 None
    """
    # 遍历所有市及其下属县
    for city, counties in jiangxi_cities.items():
        # 检查输入字符串是否包含市名（去掉最后一个“市”字）
        if city in input_str or city[:-1] in input_str:
            return city
        # 检查输入字符串是否包含下属县名（去掉最后一个“县”或“区”字）
        for county in counties:
            if county in input_str or county[:-1] in input_str:
                return city
    # 如果没有匹配到任何市或县，返回 None
    return None

def split_sheets_by_column(infile, column_index, start_row=2, outfile="output.xlsx"):
    try:
        workbook = read_excel_file(infile)
        if workbook is None:
            return None

        sheet = workbook.active
        header_row = [cell.value for cell in sheet[start_row - 1]]  # 获取表头

        city_data = {city: [header_row] for city in jiangxi_cities.keys()}  # 初始化时包含表头
        city_data["未匹配"] = [header_row]  # 添加未匹配数据的键，并包含表头

        for row in sheet.iter_rows(min_row=start_row, values_only=True):
            value = row[column_index - 1]  # 列索引从0开始，因此需要减1
            if value is None:  # 如果值为空，跳过当前行
                continue

            # 使用 get_city_by_name 函数判断该值属于哪个市
            city = get_city_by_name(str(value))  # 确保 value 是字符串
            if city:
                city_data[city].append(row)  # 添加到对应市的列表中
            else:
                city_data["未匹配"].append(row)  # 未匹配到任何市，添加到“未匹配”列表

        # 打印每个 Sheet 的行数（减去表头）并计算总行数
        print("按市分组后的行数统计：")
        total_rows = 0  # 总行数
        for city, rows in city_data.items():
            row_count = len(rows) - 1  # 减去表头
            print(f"{city}: {row_count} 行")
            total_rows += row_count  # 累加总行数

        print(f"分组后的总行数: {total_rows} 行")

        save_excel_file(city_data, outfile, has_header=True)
        return city_data
    except Exception as e:
        print(f"读取Excel文件时出错: {e}")
        return None

def read_and_filter_excel(infile, start_row=2):
    try:
        workbook = read_excel_file(infile)
        if workbook is None:
            return None, None

        # 定义过滤条件（每个条件是一个函数，返回 (result, reason)）
        filter_conditions = [
            lambda row: (row[8] != "不限", "第9列: 招聘对象不为'不限'"),
            lambda row: (not (row[9] == "专业不限" or any(keyword in row[9].split("本科专业")[-1] for keyword in ["计算机", "软件"])), "第10列: 专业不符合要求"),
            lambda row: (row[10] == "硕士研究生及以上学历", "第11列: 学历要求过高"),
            lambda row: ("25周岁以下" in row[11] or "30周岁以下" in row[11], "第12列: 年龄不符合要求"),
            lambda row: (any(keyword in str(row[12]) for keyword in ["职业资格证书", "基层工作经历", "毕业生", "限本县", "退役士兵", "符合人民警察录用条件", "限女性", "服务期满人员"]), "第13列: 其他限制条件不符合要求"),
            lambda row: (any(keyword in str(row[15]) for keyword in ["资格证书", "法律", "会计", "残疾人", "畲族"]), "第16列: 其他限制条件不符合要求"),
        ]

        all_data = {}  # 保留的行
        all_excluded_data = {}  # 过滤掉的行

        for sheet_name in workbook.sheetnames:
            sheet = workbook[sheet_name]
            print(f"正在处理工作表: {sheet.title}")

            header_row = [cell.value for cell in sheet[start_row-1]]  # 获取表头

            data = [header_row]  # 保留的行，包含表头
            excluded_data = [header_row + ["排除原因"]]  # 过滤掉的行，包含表头和排除原因

            for row in sheet.iter_rows(min_row=start_row, values_only=True):  # 从指定行开始读取数据
                exclusion_reason = []  # 用于存储排除原因

                for condition in filter_conditions:
                    result, reason = condition(row)  # 调用过滤条件函数，获取结果和原因
                    if result:
                        exclusion_reason.append(reason)  # 添加排除原因

                if exclusion_reason:
                    # 将排除原因附加到行尾
                    excluded_data.append(list(row) + ["; ".join(exclusion_reason)])
                else:
                    data.append(row)

            print(f"工作表 {sheet.title} 筛选后的总行数: {len(data) - 1}")  # 减去表头
            print(f"工作表 {sheet.title} 过滤掉的总行数: {len(excluded_data) - 1}")  # 减去表头

            all_data[sheet_name] = data
            all_excluded_data[sheet_name] = excluded_data

        total_kept = sum(len(rows) - 1 for rows in all_data.values())
        total_excluded = sum(len(rows) - 1 for rows in all_excluded_data.values())
        print(f"所有保留的总行数: {total_kept}")
        print(f"所有过滤掉的总行数: {total_excluded}")
        
        save_excel_file(all_data, "所有保留的行.xlsx", has_header=True)
        # 保存过滤掉的数据（默认将首行视为表头）
        save_excel_file(all_excluded_data, "所有过滤掉的行.xlsx", has_header=True)

        return all_data, all_excluded_data
    except Exception as e:
        print(f"读取Excel文件时出错: {e}")
        return None, None

def main():
    if len(sys.argv) < 2:
        print("请提供Excel文件路径！")
        print("用法: python script.py <文件路径>")
        sys.exit(1)

    file_path = sys.argv[1]  # 文件路径
    split_sheets_file = "split.xlsx"

    split_sheets_by_column(file_path, 3, start_row=4, outfile=split_sheets_file)

    read_and_filter_excel(split_sheets_file)
    

if __name__ == "__main__":
    main()
```