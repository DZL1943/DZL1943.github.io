---
title: Better Plugins Manager
created: 2025-02-15T17:09
modified: 2025-10-08T21:29
tags:
  - Obsidian/Plugins
aliases:
  - Better Plugins Manager
url:
  - https://github.com/Obsidian-Forge/obsidian-manager
---

# Better Plugins Manager

## 功能

- 过滤
- 安装
- 开关
- 延迟启动
- 设置
- 快捷键
- 更新
- 卸载
- 主页
- 笔记

## 配置

- GROUPS
    - default
    - 本体类 main %% 作用于本体界面 %%
    - 编辑类 edit %% 内容编辑 %%
    - 扩展类 ext %% 扩展了新的功能或接口 %%
    - 辅助类 aux %% 低频周边 %%
    - ~~备用待定~~
- TAGS
    - default
    - 必备 required
    - 推荐 recommended %% 重要但不一定必要 %%
    - 可选 optional %% 非必要&不重要 %%
    - 备用 reserved %% 暂不需要 %%
    - 待定 undetermined
    - 不推荐 deprecated
    - beta
    - bug
    - lag
    - dev %% 调试 %%
    - config %% 配置复杂 %%
    - risk %% 风险 %%
- DELAYS %% 建议 id 等于值 %%
    - default 0
    - instant 0
    - short 5
    - middle 10
    - long 15
- Plugins (Manifest): 
    - id, name, desc, group, tags, enabled, delay, note
    - version
    - author
    - repo

## 解析

```dataviewjs
dv.header(3, '精选')
dv.list(app.plugins.plugins["better-plugins-manager"].settings.Plugins.filter(p => p.tags.includes('favorite')).sort((a, b) => a.name.localeCompare(b.name)).map(p=>p.name))
```

```dataviewjs
const bpmSettings = app.plugins.plugins["better-plugins-manager"].settings;
const groupsMap = Object.fromEntries(
  bpmSettings.GROUPS.map((item) => [item.id, item.name])
);
const tagsMap = Object.fromEntries(
  bpmSettings.TAGS.map((item) => [item.id, item.name])
);
const delaysMap = Object.fromEntries(
  bpmSettings.DELAYS.map((item) => [item.id, item.time])
);

function renderList(plugins) {
  dv.list(
    (plugins || bpmSettings.Plugins)
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((p) => `${p.id}`)
  );
}

function renderTable(plugins) {
  dv.table(
    ["id", "group", "tags", "delay", "enabled", "note"],
    (plugins || bpmSettings.Plugins).sort((a, b) => a.id.localeCompare(b.id)).map((p) => [
      p.id,
      groupsMap[p.group],
      p.tags.map(tag=>tagsMap[tag]).join(","),
      delaysMap[p.delay],
      p.enabled ? p.enabled : `**${p.enabled}**`,
      p.note,
    ])
  );
}

function renderByGroups() {
  // 分组收集(含未分组)
  const grouped = bpmSettings.Plugins.reduce((acc, p) => {
    const key = p.group ?? "未分组";
    (acc[key] ??= []).push(p);
    return acc;
  }, {});

  // 按配置顺序渲染
  bpmSettings.GROUPS.forEach((g) => {
    grouped[g.id]?.length && dv.header(3, g.name) && renderTable(grouped[g.id]);
  });

  // 处理未分组(独立于配置)
  grouped.未分组?.length &&
    dv.header(3, "未分组") &&
    renderTable(grouped.未分组);
}

function renderByTags() {
  // 标签分组收集
  const tagged = bpmSettings.Plugins.reduce((acc, p) => {
    p.tags?.forEach((t) => (acc[t] ??= []).push(p));
    return acc;
  }, {});

  // 按配置顺序渲染
  bpmSettings.TAGS.forEach((t) => {
    tagged[t.id]?.length && dv.header(3, t.name) && renderTable(tagged[t.id]);
  });
}

renderByGroups()
//renderByTags()
```

## Tips

> [!tip]+ 右键 -> 笔记、快捷键、GitHub

> [!attention]+ 尽量在本插件中开关插件, 避免直接在设置中操作. (如果插件存留在 community-plugins.json 中则延时启动无效.)
> - 若在本插件中 off
>     - 在插件中 on, 重启后 on
>     - 在设置中 on, 重启后 **on**
> - 若在本插件中 on
>     - 在插件中 off, 重启后 off
>     - 在设置中 off, 重启后 on

## lazy-to-bpm

```python
import json
import sys
from pathlib import Path

class StatusMapper:
    # 按优先级顺序定义的标签列表
    TAGS_PRIORITY = [
        "required",
        "recommended",
        "optional",
        "reserved",
        "undetermined",
        "ignored",
        "deprecated",
    ]

    # 对应的符号列表(与TAGS_PRIORITY一一对应)
    SYMBOLS = ["X", "P", "/", "+", "?", "-", "C"]

    # 从标签到符号的正向映射
    TAG_TO_SYMBOL = dict(zip(TAGS_PRIORITY, SYMBOLS))

    # 从符号到标签的反向映射
    SYMBOL_TO_TAG = dict(zip(SYMBOLS, TAGS_PRIORITY))

    # 默认状态映射(基于 enabled 状态)
    DEFAULT_SYMBOLS = {
        True: "x",  # 启用状态的默认符号
        False: ">",  # 禁用状态的默认符号
    }

    @classmethod
    def get_status_symbol(cls, enabled, tags):
        """根据插件状态和标签获取状态符号"""
        if tags:
            # 按照优先级顺序检查标签
            for tag in cls.TAGS_PRIORITY:
                if tag in tags:
                    return cls.TAG_TO_SYMBOL[tag]

        # 如果没有匹配的标签,返回基于 enabled 状态的默认符号
        return cls.DEFAULT_SYMBOLS[enabled]

    @classmethod
    def get_tag_from_symbol(cls, symbol):
        """根据状态符号获取标签"""
        # 首先检查是否为特殊标签
        if symbol in cls.SYMBOL_TO_TAG:
            return cls.SYMBOL_TO_TAG[symbol]

        # 如果不是特殊标签,检查是否为默认符号
        for enabled, default_symbol in cls.DEFAULT_SYMBOLS.items():
            if symbol == default_symbol:
                return "enabled" if enabled else "disabled"

        # 如果都不是,返回未知
        return "unknown"

class PluginManager:
    UNGROUPED = "未分组"

    def __init__(self, basepath=".obsidian"):
        self.basepath = basepath
        self.bpm_data = self.load_config("better-plugins-manager")

        # 使用映射提高查找性能
        self.plugins = {plugin["id"]: plugin for plugin in self.bpm_data["Plugins"]}
        self.groups = {group["id"]: group for group in self.bpm_data["GROUPS"]}
        self.tags = {tag["id"]: tag for tag in self.bpm_data["TAGS"]}
        self.delays = {delay["id"]: delay for delay in self.bpm_data["DELAYS"]}

    def get_config_path(self, plugin, filename="data.json"):
        return Path(self.basepath) / "plugins" / plugin / filename

    def load_config(self, plugin):
        try:
            with open(self.get_config_path(plugin), "r", encoding="utf-8") as file:
                return json.load(file)
        except Exception as e:
            print(f"加载配置出错: {e}")
            return None

    def save_config(self, data, plugin, filename="data-modified.json"):
        file_path = self.get_config_path(plugin, filename)
        file_path.parent.mkdir(parents=True, exist_ok=True)

        try:
            with open(file_path, "w", encoding="utf-8") as file:
                json.dump(data, file, indent=2, ensure_ascii=False)
            print(f"配置已保存: {file_path}")
        except Exception as e:
            print(f"保存配置出错: {e}")

    def get_plugins(self, condition=None):
        """获取所有插件或根据条件过滤插件"""
        if condition is None:
            return list(self.plugins.values())
        elif callable(condition):
            return [plugin for plugin in self.plugins.values() if condition(plugin)]
        else:
            raise ValueError("condition 必须是可调用函数或 None")

    def get_plugins_by_tag(self, tag):
        """根据标签获取插件"""
        return self.get_plugins(lambda p: tag in p.get("tags", []))

    def get_plugins_by_group(self, group):
        """根据分组获取插件"""
        return self.get_plugins(lambda p: p.get("group") == group)

    def get_plugins_by_enabled(self, enabled=True):
        """根据启用状态获取插件"""
        return self.get_plugins(lambda p: p.get("enabled", True) == enabled)

    def get_plugins_by_delay(self, delay):
        """根据延迟设置获取插件"""
        return self.get_plugins(lambda p: p.get("delay") == delay)

    def update_plugin_delay(self, plugins, delay=""):
        if isinstance(plugins, str):
            plugins = [plugins]

        if delay and delay not in self.delays:
            print(f"警告: 延迟 '{delay}' 不存在")
            return

        for plugin_id in set(plugins).intersection(self.plugins):
            self.plugins[plugin_id]["delay"] = delay

    def update_plugin_group(self, plugins, group=""):
        if isinstance(plugins, str):
            plugins = [plugins]

        if group and group not in self.groups:
            print(f"警告: 分组 '{group}' 不存在")
            return

        for plugin_id in set(plugins).intersection(self.plugins):
            self.plugins[plugin_id]["group"] = group

    def update_plugin_tags(self, plugins, tags=None, mode="replace"):
        if isinstance(plugins, str):
            plugins = [plugins]

        if tags and any(tag not in self.tags for tag in tags):
            print("警告: 某些标签不存在")
            return

        for plugin_id in set(plugins).intersection(self.plugins):
            current_tags = set(self.plugins[plugin_id].get("tags", []))

            if not tags:  # 清空标签
                self.plugins[plugin_id]["tags"] = []
            elif mode == "replace":
                self.plugins[plugin_id]["tags"] = tags.copy()
            elif mode == "add":
                self.plugins[plugin_id]["tags"] = list(current_tags.union(tags))
            elif mode == "remove":
                self.plugins[plugin_id]["tags"] = list(current_tags - set(tags))

    def add_plugin_tags(self, plugins, tags):
        self.update_plugin_tags(plugins, tags, "add")

    def remove_plugin_tags(self, plugins, tags):
        self.update_plugin_tags(plugins, tags, "remove")

    def clear_plugin_tags(self, plugins):
        self.update_plugin_tags(plugins, [])

    def rename_delay(self, old_id, new_id):
        if old_id not in self.delays:
            print(f"警告: 延迟ID '{old_id}' 不存在")
            return

        # 更新延迟
        self.delays[new_id] = self.delays[old_id]
        self.delays[new_id]["id"] = new_id
        del self.delays[old_id]

        # 更新插件
        for plugin in self.plugins.values():
            if plugin.get("delay") == old_id:
                plugin["delay"] = new_id

    def rename_group(self, old_id, new_id):
        if old_id not in self.groups:
            print(f"警告: 分组ID '{old_id}' 不存在")
            return

        # 更新分组
        self.groups[new_id] = self.groups[old_id]
        self.groups[new_id]["id"] = new_id
        del self.groups[old_id]

        # 更新插件
        for plugin in self.plugins.values():
            if plugin.get("group") == old_id:
                plugin["group"] = new_id

    def rename_tag(self, old_id, new_id):
        if old_id not in self.tags:
            print(f"警告: 标签ID '{old_id}' 不存在")
            return

        # 更新标签
        self.tags[new_id] = self.tags[old_id]
        self.tags[new_id]["id"] = new_id
        del self.tags[old_id]

        # 更新插件
        for plugin in self.plugins.values():
            if old_id in plugin.get("tags", []):
                plugin["tags"] = [
                    new_id if tag == old_id else tag for tag in plugin.get("tags", [])
                ]

    def lazy2bpm(self, delays_map=None):
        # 默认的延迟映射
        default_delays_map = {
            "short": "5",
            "long": "15",
            "instant": "0",
            "disabled": "",
        }

        # 使用默认映射作为基础,然后用传入的参数更新它
        final_delays_map = {**default_delays_map, **(delays_map or {})}

        lazy_data = self.load_config("lazy-plugins")
        if not lazy_data:
            return self.bpm_data

        lazy_plugins = lazy_data["desktop"]["plugins"]

        for plugin_id, plugin in self.plugins.items():
            if plugin_id not in lazy_plugins:
                continue

            startup_type = lazy_plugins[plugin_id]["startupType"]
            plugin["enabled"] = startup_type != "disabled"

            if startup_type in final_delays_map:
                delay = final_delays_map[startup_type]
                if delay and delay not in self.delays:
                    print(f"警告: 延迟ID '{delay}' 不存在")
                    continue
                plugin["delay"] = delay
            else:
                print(f"警告: startupType '{startup_type}' 不存在")

        return self.bpm_data

    def export_md(self, output_path=None, condition=None, extra_attrs=None):
        """
        导出插件列表到Markdown格式

        Args:
            output_path: 输出文件路径,None表示打印到控制台
            condition: 插件过滤条件函数
            extra_attrs: 额外属性列表,如["tags", "delay"]
        """
        # 获取过滤后的插件
        plugins = self.get_plugins(condition)
        plugins = sorted(plugins, key=lambda p: p["id"])

        # 按分组组织插件
        grouped_plugins = {}
        for plugin in plugins:
            group_id = plugin.get("group", "") or self.UNGROUPED
            if group_id not in grouped_plugins:
                grouped_plugins[group_id] = []
            grouped_plugins[group_id].append(plugin)

        # 构建输出内容
        lines = ["# Obsidian 插件列表\n\n"]

        group_index_map = {
            group["id"]: idx for idx, group in enumerate(self.bpm_data["GROUPS"])
        }

        sorted_groups = sorted(
            grouped_plugins.keys(),
            key=lambda gid: (
                0 if gid == self.UNGROUPED else 1,  # 特别处理未分组
                group_index_map.get(gid, float("inf")),  # 不在GROUPS中的分组排在后面
                gid,  # 相同索引的分组按字母顺序排序
            ),
        )

        for group_id in sorted_groups:
            group_info = self.groups.get(group_id, {})
            group_name = group_info.get("name", group_id)
            lines.append(f"## {group_name}\n\n")

            for plugin in grouped_plugins[group_id]:
                # 状态只对应方括号中间的值
                status = StatusMapper.get_status_symbol(
                    plugin["enabled"], plugin["tags"]
                )
                line = f"- [{status}] {plugin['id']}"

                # 添加额外属性
                if extra_attrs:
                    attr_values = []
                    for attr in extra_attrs:
                        if attr in {"enabled", "id"} or attr not in plugin:
                            continue
                        value = plugin.get(attr, "")
                        if isinstance(value, list):
                            value = ",".join(value)
                        attr_values.append(str(value))
                    if attr_values:
                        line += " | " + " | ".join(attr_values)

                lines.append(line + "\n")

            lines.append("\n")

        # 输出结果
        content = "".join(lines)

        if output_path:
            try:
                with open(output_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"插件列表已导出: {output_path}")
            except Exception as e:
                print(f"导出Markdown出错: {e}")
        else:
            print(content)

def main():
    basepath = sys.argv[1] if len(sys.argv) > 1 else ".obsidian"
    pm = PluginManager(basepath)

    pm.export_md(
        condition=lambda p: any(
            tag in p["tags"]
            for tag in StatusMapper.TAGS_PRIORITY[:2]
            or (
                p["enabled"]
                and all(tag not in p["tags"] for tag in StatusMapper.TAGS_PRIORITY[2:])
            )
        ),
        extra_attrs=[],
    )

if __name__ == "__main__":
    main()

```