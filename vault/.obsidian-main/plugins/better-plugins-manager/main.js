var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);

// src/main.ts
var import_obsidian24 = require("obsidian");

// src/settings/data.ts
var DEFAULT_SETTINGS = {
  PERSISTENCE: false,
  // 筛选
  FILTER_SEARCH: "",
  FILTER_TAG: "",
  FILTER_GROUP: "",
  FILTER_DELAY: "",
  LANGUAGE: "",
  LANGUAGE_INITIALIZED: false,
  MIGRATION_VERSION: "",
  DEBUG: false,
  CENTER: false,
  ITEM_STYLE: "alwaysExpand",
  GROUP_STYLE: "a",
  TAG_STYLE: "b",
  DELAY: false,
  FADE_OUT_DISABLED_PLUGINS: true,
  COMMAND_ITEM: false,
  COMMAND_GROUP: false,
  STARTUP_CHECK_UPDATES: false,
  REPO_MAP: {},
  BPM_INSTALLED: [],
  HIDE_BPM_TAG: false,
  EXPORT_DIR: "",
  GITHUB_TOKEN: "",
  SELF_CHECK_IGNORED: false,
  GROUPS: [],
  TAGS: [],
  DELAYS: [
    {
      "id": "default",
      "name": "\u9ED8\u8BA4\u5EF6\u8FDF",
      "time": 10
    }
  ],
  Plugins: [],
  HIDES: []
};

// src/settings/index.ts
var import_obsidian20 = require("obsidian");

// src/settings/base-setting.ts
var BaseSetting = class {
  constructor(obj) {
    this.settingTab = obj;
    this.manager = obj.manager;
    this.settings = obj.manager.settings;
    this.containerEl = obj.contentEl;
    this.app = obj.app;
  }
  display() {
    this.main();
  }
};

// src/settings/ui/manager-basis.ts
var import_obsidian15 = require("obsidian");

// src/modal/manager-modal.ts
var import_obsidian13 = require("obsidian");

// src/utils.ts
var import_obsidian = require("obsidian");
var managerOpen = (dir, manager) => {
  if (import_obsidian.Platform.isMobileApp) {
    new import_obsidian.Notice("\u79FB\u52A8\u7AEF\u6682\u4E0D\u652F\u6301\u6253\u5F00\u6587\u4EF6\u5939\uFF0C\u8BF7\u5728\u684C\u9762\u7AEF\u64CD\u4F5C\u3002");
    return;
  }
  try {
    const { exec } = require("child_process");
    if (import_obsidian.Platform.isDesktop || import_obsidian.Platform.isWin) {
      exec(`start "" "${dir}"`, (error) => {
        if (error) {
          new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u5931\u8D25_\u6587\u672C"));
        } else {
          new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u6210\u529F_\u6587\u672C"));
        }
      });
      return;
    }
    if (import_obsidian.Platform.isMacOS) {
      exec(`open ${dir}`, (error) => {
        if (error) {
          new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u5931\u8D25_\u6587\u672C"));
        } else {
          new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u6210\u529F_\u6587\u672C"));
        }
      });
    }
  } catch (e) {
    console.error("\u6253\u5F00\u76EE\u5F55\u5931\u8D25", e);
    new import_obsidian.Notice(manager.translator.t("\u901A\u7528_\u5931\u8D25_\u6587\u672C"));
  }
};

// src/modal/group-modal.ts
var import_obsidian2 = require("obsidian");
var GroupModal = class extends import_obsidian2.Modal {
  constructor(app, manager, managerModal, managerPlugin) {
    super(app);
    this.defaultGroupColor = "";
    this.settings = manager.settings;
    this.manager = manager;
    this.managerModal = managerModal;
    this.managerPlugin = managerPlugin;
    this.selected = "";
    this.add = false;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-editor__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian2.Setting(this.titleEl).setClass("manager-bar__title").setName(`[${this.managerPlugin.name}]`);
    const closeButton = new import_obsidian2.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    if (!this.defaultGroupColor) {
      this.defaultGroupColor = this.pickDistinctColor(this.settings.GROUPS.map((g) => g.color));
    }
    for (const group of this.settings.GROUPS) {
      const itemEl = new import_obsidian2.Setting(this.contentEl);
      itemEl.setClass("manager-editor__item");
      if (this.selected == "" || this.selected != group.id) {
        itemEl.addExtraButton(
          (cb) => cb.setIcon("settings").onClick(() => {
            this.selected = group.id;
            this.reloadShowData();
          })
        );
        itemEl.addToggle(
          (cb) => cb.setValue(group.id === this.managerPlugin.group).onChange(async () => {
            this.managerPlugin.group = this.managerPlugin.group === group.id ? "" : group.id;
            await this.manager.savePluginAndExport(this.managerPlugin.id);
            this.managerModal.reloadShowData();
            this.reloadShowData();
          })
        );
        const groupEl = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(groupEl);
        const tag = this.manager.createTag(group.name, group.color, this.settings.GROUP_STYLE);
        groupEl.appendChild(tag);
      }
      if (this.selected != "" && this.selected == group.id) {
        itemEl.addColorPicker(
          (cb) => cb.setValue(group.color).onChange((value) => {
            group.color = value;
            this.manager.saveSettings();
            this.reloadShowData();
          })
        );
        itemEl.addText(
          (cb) => cb.setValue(group.name).onChange((value) => {
            group.name = value;
            this.manager.saveSettings();
          }).inputEl.addClass("manager-editor__item-input")
        );
        itemEl.addExtraButton(
          (cb) => cb.setIcon("trash-2").onClick(() => {
            const hasTestGroup = this.settings.Plugins.some((plugin) => plugin.group === group.id);
            if (!hasTestGroup) {
              this.manager.settings.GROUPS = this.manager.settings.GROUPS.filter((t) => t.id !== group.id);
              this.manager.saveSettings();
              this.reloadShowData();
              command_default(this.app, this.manager);
              new import_obsidian2.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
            } else {
              new import_obsidian2.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
            }
          })
        );
        itemEl.addExtraButton(
          (cb) => cb.setIcon("save").onClick(() => {
            this.selected = "";
            this.reloadShowData();
            this.managerModal.reloadShowData();
          })
        );
        const groupEl = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(groupEl);
        const tag = this.manager.createTag(group.name, group.color, this.settings.GROUP_STYLE);
        groupEl.appendChild(tag);
      }
    }
    if (this.add) {
      let id = "";
      let name = "";
      let color = this.pickDistinctColor(this.settings.GROUPS.map((g) => g.color));
      const foodBar = new import_obsidian2.Setting(this.contentEl).setClass("manager-bar__title");
      foodBar.infoEl.remove();
      foodBar.addColorPicker(
        (cb) => cb.setValue(color).onChange((value) => {
          color = value;
        })
      );
      foodBar.addText(
        (cb) => cb.setPlaceholder("ID").onChange((value) => {
          id = value;
          this.manager.saveSettings();
        }).inputEl.addClass("manager-editor__item-input")
      );
      foodBar.addText(
        (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
          name = value;
        }).inputEl.addClass("manager-editor__item-input")
      );
      foodBar.addExtraButton(
        (cb) => cb.setIcon("plus").onClick(() => {
          const containsId = this.manager.settings.GROUPS.some((tag) => tag.id === id);
          if (!containsId && id !== "") {
            if (color === "")
              color = this.pickDistinctColor(this.settings.GROUPS.map((g) => g.color));
            this.manager.settings.GROUPS.push({ id, name, color });
            this.manager.saveSettings();
            this.add = false;
            this.reloadShowData();
            command_default(this.app, this.manager);
            new import_obsidian2.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
          } else {
            new import_obsidian2.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
          }
        })
      );
    } else {
      const foodBar = new import_obsidian2.Setting(this.contentEl).setClass("manager-bar__title").setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C"));
      const addButton = new import_obsidian2.ExtraButtonComponent(foodBar.controlEl);
      addButton.setIcon("circle-plus");
      addButton.onClick(() => {
        this.add = true;
        this.reloadShowData();
      });
    }
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    await this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
  pickDistinctColor(existing) {
    const palette = ["#FF6B6B", "#4ECDC4", "#FFD166", "#A78BFA", "#48BB78", "#F472B6", "#38BDF8", "#F59E0B", "#22D3EE", "#F97316", "#10B981", "#E11D48", "#6366F1", "#14B8A6"];
    const toRgb = (hex) => {
      const clean = hex.replace("#", "");
      const num = parseInt(clean, 16);
      return [num >> 16 & 255, num >> 8 & 255, num & 255];
    };
    const dist = (a, b) => {
      const [ar, ag, ab] = toRgb(a);
      const [br, bg, bb] = toRgb(b);
      return Math.sqrt((ar - br) ** 2 + (ag - bg) ** 2 + (ab - bb) ** 2);
    };
    const MIN_DIST = 80;
    for (const c of palette) {
      const min = existing.length ? Math.min(...existing.map((ex) => dist(ex, c))) : Infinity;
      if (min === Infinity || min > MIN_DIST)
        return c;
    }
    return palette[0];
  }
};

// src/modal/tags-modal.ts
var import_obsidian4 = require("obsidian");

// src/repo-resolver.ts
var import_obsidian3 = require("obsidian");
var BPM_TAG_ID = "bpm-install";
var CACHE_FILE = "community-plugins-cache.json";
var RepoResolver = class {
  constructor(manager) {
    this.cacheLoaded = false;
    this.cache = {};
    this.bpmTagNameFallback = "bpm install";
    this.manager = manager;
  }
  get cachePath() {
    return (0, import_obsidian3.normalizePath)(`${this.manager.app.vault.configDir}/plugins/${this.manager.manifest.id}/${CACHE_FILE}`);
  }
  async loadCacheFromFile() {
    const adapter = this.manager.app.vault.adapter;
    if (await adapter.exists(this.cachePath)) {
      try {
        const content = await adapter.read(this.cachePath);
        this.cache = JSON.parse(content);
      } catch (e) {
        console.error("\u52A0\u8F7D\u4ED3\u5E93\u7F13\u5B58\u5931\u8D25", e);
        this.cache = {};
      }
    }
  }
  async writeCache() {
    const adapter = this.manager.app.vault.adapter;
    try {
      await adapter.write(this.cachePath, JSON.stringify(this.cache));
    } catch (e) {
      console.error("\u5199\u5165\u4ED3\u5E93\u7F13\u5B58\u5931\u8D25", e);
    }
  }
  async ensureCacheLoaded() {
    if (this.cacheLoaded)
      return;
    await this.loadCacheFromFile();
    this.cache = { ...this.cache, ...this.manager.settings.REPO_MAP || {} };
    this.cacheLoaded = true;
  }
  async fetchCommunityList() {
    const url = "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json";
    try {
      const res = await (0, import_obsidian3.requestUrl)({ url });
      const list = res.json;
      const map = {};
      list.forEach((item) => {
        if (item.id && item.repo)
          map[item.id] = item.repo;
      });
      this.cache = { ...this.cache, ...map };
      await this.writeCache();
      return map;
    } catch (e) {
      console.error("\u83B7\u53D6\u793E\u533A\u63D2\u4EF6\u6E05\u5355\u5931\u8D25", e);
      return {};
    }
  }
  async resolveRepo(pluginId) {
    var _a;
    await this.ensureCacheLoaded();
    const fromSettings = (_a = this.manager.settings.REPO_MAP) == null ? void 0 : _a[pluginId];
    if (fromSettings)
      return fromSettings;
    if (this.cache[pluginId])
      return this.cache[pluginId];
    const remote = await this.fetchCommunityList();
    const found = remote[pluginId];
    if (found) {
      this.manager.settings.REPO_MAP[pluginId] = found;
      await this.manager.saveSettings();
      return found;
    }
    return null;
  }
  async setRepo(pluginId, repo) {
    await this.ensureCacheLoaded();
    this.cache[pluginId] = repo;
    this.manager.settings.REPO_MAP[pluginId] = repo;
    await this.manager.saveSettings();
    await this.writeCache();
  }
};
var ensureBpmTagExists = (manager) => {
  if (!manager.settings.TAGS.find((t) => t.id === BPM_TAG_ID)) {
    manager.settings.TAGS.push({
      id: BPM_TAG_ID,
      name: manager.translator ? manager.translator.t("\u6807\u7B7E_BPM\u5B89\u88C5_\u540D\u79F0") : "bpm install",
      color: "#409EFF"
    });
  }
};

// src/modal/tags-modal.ts
var TagsModal = class extends import_obsidian4.Modal {
  constructor(app, manager, managerModal, managerPlugin) {
    super(app);
    this.defaultTagColor = "";
    this.settings = manager.settings;
    this.manager = manager;
    this.managerModal = managerModal;
    this.managerPlugin = managerPlugin;
    this.selected = "";
    this.add = false;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-editor__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian4.Setting(this.titleEl).setClass("manager-bar__title").setName(this.managerPlugin.name);
    const closeButton = new import_obsidian4.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    if (!this.defaultTagColor) {
      this.defaultTagColor = this.pickDistinctColor(this.settings.TAGS.map((t) => t.color));
    }
    for (const tag of this.settings.TAGS) {
      const itemEl = new import_obsidian4.Setting(this.contentEl);
      itemEl.setClass("manager-editor__item");
      if (this.selected == "" || this.selected != tag.id) {
        itemEl.addExtraButton(
          (cb) => cb.setIcon("settings").setDisabled(tag.id === BPM_TAG_ID).onClick(() => {
            this.selected = tag.id;
            this.reloadShowData();
          })
        );
        itemEl.addToggle(
          (cb) => cb.setValue(this.managerPlugin.tags.includes(tag.id)).setDisabled(tag.id === BPM_TAG_ID).onChange(async (isChecked) => {
            if (isChecked) {
              if (!this.managerPlugin.tags.includes(tag.id)) {
                this.managerPlugin.tags.push(tag.id);
              }
            } else {
              this.managerPlugin.tags = this.managerPlugin.tags.filter((t) => t !== tag.id);
            }
            await this.manager.savePluginAndExport(this.managerPlugin.id);
            this.managerModal.reloadShowData();
          })
        );
        const tempEl = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(tempEl);
        const tagEl = this.manager.createTag(tag.name, tag.color, this.settings.TAG_STYLE);
        tempEl.appendChild(tagEl);
      }
      if (this.selected != "" && this.selected == tag.id) {
        if (tag.id === BPM_TAG_ID) {
          this.selected = "";
          continue;
        }
        itemEl.addColorPicker(
          (cb) => cb.setValue(tag.color).onChange((value) => {
            tag.color = value;
            this.manager.saveSettings();
            this.reloadShowData();
          })
        );
        itemEl.addText(
          (cb) => cb.setValue(tag.name).onChange((value) => {
            tag.name = value;
            this.manager.saveSettings();
          }).inputEl.addClass("manager-editor__item-input")
        );
        itemEl.addExtraButton(
          (cb) => cb.setIcon("trash-2").setDisabled(tag.id === BPM_TAG_ID).onClick(() => {
            const hasTestTag = this.settings.Plugins.some((plugin) => plugin.tags && plugin.tags.includes(tag.id));
            if (!hasTestTag) {
              this.manager.settings.TAGS = this.manager.settings.TAGS.filter((t) => t.id !== tag.id);
              this.manager.saveSettings();
              this.reloadShowData();
              command_default(this.app, this.manager);
              new import_obsidian4.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
            } else {
              new import_obsidian4.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
            }
          })
        );
        itemEl.addExtraButton(
          (cb) => cb.setIcon("save").onClick(() => {
            this.selected = "";
            this.reloadShowData();
            this.managerModal.reloadShowData();
          })
        );
        const groupEl = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(groupEl);
        const tagEl = this.manager.createTag(tag.name, tag.color, this.settings.TAG_STYLE);
        groupEl.appendChild(tagEl);
      }
    }
    if (this.add) {
      let id = "";
      let name = "";
      let color = this.pickDistinctColor(this.settings.TAGS.map((t) => t.color));
      const foodBar = new import_obsidian4.Setting(this.contentEl).setClass("manager-bar__title");
      foodBar.infoEl.remove();
      foodBar.addColorPicker(
        (cb) => cb.setValue(color).onChange((value) => {
          color = value;
        })
      );
      foodBar.addText(
        (cb) => cb.setPlaceholder("ID").onChange((value) => {
          id = value;
          this.manager.saveSettings();
        }).inputEl.addClass("manager-editor__item-input")
      );
      foodBar.addText(
        (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
          name = value;
        }).inputEl.addClass("manager-editor__item-input")
      );
      foodBar.addExtraButton(
        (cb) => cb.setIcon("plus").onClick(() => {
          const containsId = this.manager.settings.TAGS.some((tag) => tag.id === id);
          if (!containsId && id !== "" && id !== BPM_TAG_ID) {
            if (color === "")
              color = this.pickDistinctColor(this.settings.TAGS.map((t) => t.color));
            this.manager.settings.TAGS.push({ id, name, color });
            this.manager.saveSettings();
            this.add = false;
            this.reloadShowData();
            command_default(this.app, this.manager);
            new import_obsidian4.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
          } else {
            new import_obsidian4.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
          }
        })
      );
    } else {
      const foodBar = new import_obsidian4.Setting(this.contentEl).setClass("manager-bar__title").setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C"));
      const addButton = new import_obsidian4.ExtraButtonComponent(foodBar.controlEl);
      addButton.setIcon("circle-plus");
      addButton.onClick(() => {
        this.add = true;
        this.reloadShowData();
      });
    }
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    await this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
  pickDistinctColor(existing) {
    const palette = ["#FF6B6B", "#4ECDC4", "#FFD166", "#A78BFA", "#48BB78", "#F472B6", "#38BDF8", "#F59E0B", "#22D3EE", "#F97316", "#10B981", "#E11D48", "#6366F1", "#14B8A6"];
    const toRgb = (hex) => {
      const clean = hex.replace("#", "");
      const num = parseInt(clean, 16);
      return [num >> 16 & 255, num >> 8 & 255, num & 255];
    };
    const dist = (a, b) => {
      const [ar, ag, ab] = toRgb(a);
      const [br, bg, bb] = toRgb(b);
      return Math.sqrt((ar - br) ** 2 + (ag - bg) ** 2 + (ab - bb) ** 2);
    };
    const MIN_DIST = 80;
    for (const c of palette) {
      const min = existing.length ? Math.min(...existing.map((ex) => dist(ex, c))) : Infinity;
      if (min === Infinity || min > MIN_DIST)
        return c;
    }
    return palette[0];
  }
};

// src/modal/delete-modal.ts
var import_obsidian5 = require("obsidian");
var DeleteModal = class extends import_obsidian5.Modal {
  constructor(app, manager, deleteCallback) {
    super(app);
    this.manager = manager;
    this.deleteCallback = deleteCallback;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-editor__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian5.Setting(this.titleEl);
    titleBar.setClass("manager-delete__title");
    titleBar.setName(this.manager.translator.t("\u5378\u8F7D_\u6807\u9898"));
    const closeButton = new import_obsidian5.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    const titleBar = new import_obsidian5.Setting(this.titleEl);
    titleBar.setName(this.manager.translator.t("\u5378\u8F7D_\u63D0\u793A"));
    const actionBar = new import_obsidian5.Setting(this.titleEl);
    actionBar.setClass("manager-delete__action");
    actionBar.addButton(
      (cb) => cb.setWarning().setButtonText(this.manager.translator.t("\u5378\u8F7D_\u5378\u8F7D")).onClick(() => {
        this.deleteCallback();
        this.close();
      })
    );
    actionBar.addButton(
      (cb) => cb.setButtonText(this.manager.translator.t("\u5378\u8F7D_\u53D6\u6D88")).onClick(() => {
        this.close();
      })
    );
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/disable-modal.ts
var import_obsidian6 = require("obsidian");
var DisableModal = class extends import_obsidian6.Modal {
  constructor(app, manager, deleteCallback) {
    super(app);
    this.manager = manager;
    this.deleteCallback = deleteCallback;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-editor__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian6.Setting(this.titleEl);
    titleBar.setClass("manager-delete__title");
    titleBar.setName(this.manager.translator.t("\u4E00\u952E_\u6807\u9898"));
    const closeButton = new import_obsidian6.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    const titleBar = new import_obsidian6.Setting(this.titleEl);
    titleBar.setName(this.manager.translator.t("\u4E00\u952E_\u63D0\u793A"));
    const actionBar = new import_obsidian6.Setting(this.titleEl);
    actionBar.setClass("manager-delete__action");
    actionBar.addButton(
      (cb) => cb.setCta().setButtonText(this.manager.translator.t("\u4E00\u952E_\u542F\u7981")).onClick(() => {
        this.deleteCallback();
        this.close();
      })
    );
    actionBar.addButton(
      (cb) => cb.setButtonText(this.manager.translator.t("\u4E00\u952E_\u53D6\u6D88")).onClick(() => {
        this.close();
      })
    );
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/note-modal.ts
var import_obsidian7 = require("obsidian");
var NoteModal = class extends import_obsidian7.Modal {
  constructor(app, manager, managerPlugin, managerModal) {
    super(app);
    this.settings = manager.settings;
    this.manager = manager;
    this.managerPlugin = managerPlugin;
    this.managerModal = managerModal;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-note__container");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const titleBar = new import_obsidian7.Setting(this.titleEl).setClass("manager-bar__title").setName(`${this.managerPlugin.name}`);
    const closeButton = new import_obsidian7.ExtraButtonComponent(titleBar.controlEl);
    closeButton.setIcon("circle-x");
    closeButton.onClick(() => this.close());
  }
  async showData() {
    const textArea = new import_obsidian7.TextAreaComponent(this.contentEl);
    textArea.setValue(this.managerPlugin.note);
    textArea.onChange(async (newValue) => {
      this.managerPlugin.note = newValue;
      await this.manager.savePluginAndExport(this.managerPlugin.id);
      this.managerModal.reloadShowData();
    });
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    await this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/modal/hide-modal.ts
var import_obsidian8 = require("obsidian");
var HideModal = class extends import_obsidian8.Modal {
  constructor(app, manager, managerModal, plugins) {
    super(app);
    // [本地][变量] 导出插件列表
    this.plugins = [];
    // 搜索内容
    this.searchText = "";
    this.delay = "";
    this.tag = "";
    this.group = "";
    this.filter = "all";
    this.appSetting = this.app.setting;
    this.appPlugins = this.app.plugins;
    this.manager = manager;
    this.managerModal = managerModal;
    this.settings = manager.settings;
    this.plugins = plugins;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    modalEl.addClass("manager-container");
    if (!this.settings.CENTER)
      modalEl.addClass("manager-container__top");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    const actionBar = new import_obsidian8.Setting(this.titleEl).setClass("manager-bar__action").setName(this.manager.translator.t("\u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898"));
    const closeButton = new import_obsidian8.ButtonComponent(actionBar.controlEl);
    closeButton.setIcon("x");
    closeButton.onClick(() => {
      this.close();
    });
    const searchBar = new import_obsidian8.Setting(this.titleEl).setClass("manager-bar__search").setName(this.manager.translator.t("\u901A\u7528_\u641C\u7D22_\u6587\u672C"));
    const filterOptions = {
      "all": this.manager.translator.t("\u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0"),
      "enabled": this.manager.translator.t("\u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0"),
      "disabled": this.manager.translator.t("\u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0"),
      "grouped": this.manager.translator.t("\u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0"),
      "ungrouped": this.manager.translator.t("\u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0"),
      "tagged": this.manager.translator.t("\u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0"),
      "untagged": this.manager.translator.t("\u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0"),
      "noted": this.manager.translator.t("\u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0")
    };
    const filterDropdown = new import_obsidian8.DropdownComponent(searchBar.controlEl);
    filterDropdown.addOptions(filterOptions);
    filterDropdown.setValue(this.filter);
    filterDropdown.onChange((value) => {
      this.filter = value;
      this.reloadShowData();
    });
    const groupCounts = this.settings.Plugins.reduce((acc, plugin) => {
      const groupId = plugin.group || "";
      acc[groupId] = (acc[groupId] || 0) + 1;
      return acc;
    }, { "": 0 });
    const groups = this.settings.GROUPS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${groupCounts[item.id] || 0}]`;
      return acc;
    }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C") });
    const groupsDropdown = new import_obsidian8.DropdownComponent(searchBar.controlEl);
    groupsDropdown.addOptions(groups);
    groupsDropdown.setValue(this.group);
    groupsDropdown.onChange((value) => {
      this.group = value;
      this.reloadShowData();
    });
    const tagCounts = this.settings.Plugins.reduce((acc, plugin) => {
      plugin.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    const tags = this.settings.TAGS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${tagCounts[item.id] || 0}]`;
      return acc;
    }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C") });
    const tagsDropdown = new import_obsidian8.DropdownComponent(searchBar.controlEl);
    tagsDropdown.addOptions(tags);
    tagsDropdown.setValue(this.tag);
    tagsDropdown.onChange((value) => {
      this.tag = value;
      this.reloadShowData();
    });
    if (this.settings.DELAY) {
      const delayCounts = this.settings.Plugins.reduce((acc, plugin) => {
        const delay = plugin.delay || "";
        acc[delay] = (acc[delay] || 0) + 1;
        return acc;
      }, { "": 0 });
      const delays = this.settings.DELAYS.reduce((acc, item) => {
        acc[item.id] = `${item.name} (${delayCounts[item.id] || 0})`;
        return acc;
      }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C") });
      const delaysDropdown = new import_obsidian8.DropdownComponent(searchBar.controlEl);
      delaysDropdown.addOptions(delays);
      delaysDropdown.setValue(this.delay || "");
      delaysDropdown.onChange((value) => {
        this.delay = value;
        this.reloadShowData();
      });
    }
    this.searchEl = new import_obsidian8.SearchComponent(searchBar.controlEl);
    this.searchEl.onChange((value) => {
      this.searchText = value;
      this.reloadShowData();
    });
  }
  async showData() {
    for (const plugin of this.plugins) {
      const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
      const isEnabled = this.settings.DELAY ? ManagerPlugin == null ? void 0 : ManagerPlugin.enabled : this.appPlugins.enabledPlugins.has(plugin.id);
      if (ManagerPlugin) {
        switch (this.filter) {
          case "enabled":
            if (!isEnabled)
              continue;
            break;
          case "disabled":
            if (isEnabled)
              continue;
            break;
          case "grouped":
            if (ManagerPlugin.group === "")
              continue;
            break;
          case "ungrouped":
            if (ManagerPlugin.group !== "")
              continue;
            break;
          case "tagged":
            if (ManagerPlugin.tags.length === 0)
              continue;
            break;
          case "untagged":
            if (ManagerPlugin.tags.length > 0)
              continue;
            break;
          case "noted":
            if (!ManagerPlugin.note || ManagerPlugin.note === "")
              continue;
            break;
          default:
            break;
        }
        if (this.group !== "" && ManagerPlugin.group !== this.group)
          continue;
        if (this.tag !== "" && !ManagerPlugin.tags.includes(this.tag))
          continue;
        if (this.delay !== "" && ManagerPlugin.delay !== this.delay)
          continue;
        if (this.searchText !== "" && ManagerPlugin.name.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && ManagerPlugin.desc.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && plugin.author.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1)
          continue;
        if (plugin.id === this.manager.manifest.id)
          continue;
        const itemEl = new import_obsidian8.Setting(this.contentEl);
        itemEl.setClass("manager-item");
        itemEl.nameEl.addClass("manager-item__name-container");
        itemEl.descEl.addClass("manager-item__description-container");
        if (ManagerPlugin.group !== "") {
          const group = createSpan({ cls: "manager-item__name-group" });
          itemEl.nameEl.appendChild(group);
          const item = this.settings.GROUPS.find((t) => t.id === ManagerPlugin.group);
          if (item) {
            const tag = this.manager.createTag(item.name, item.color, this.settings.GROUP_STYLE);
            group.appendChild(tag);
          }
        }
        const title = createSpan({ text: ManagerPlugin.name, cls: "manager-item__name-title" });
        itemEl.nameEl.appendChild(title);
        const version = createSpan({ text: `[${plugin.version}]`, cls: ["manager-item__name-version"] });
        itemEl.nameEl.appendChild(version);
        if (this.settings.DELAY && ManagerPlugin.delay !== "") {
          const d = this.settings.DELAYS.find((item) => item.id === ManagerPlugin.delay);
          if (d) {
            const delay = createSpan({ text: `${d.time}s`, cls: ["manager-item__name-delay"] });
            itemEl.nameEl.appendChild(delay);
          }
        }
        const desc = createDiv({ text: ManagerPlugin.desc, cls: ["manager-item__name-desc"] });
        itemEl.descEl.appendChild(desc);
        const tags = createDiv();
        itemEl.descEl.appendChild(tags);
        ManagerPlugin.tags.map((id) => {
          const item = this.settings.TAGS.find((item2) => item2.id === id);
          if (item) {
            const tag = this.manager.createTag(item.name, item.color, this.settings.TAG_STYLE);
            tags.appendChild(tag);
          }
        });
        const hiddenToggle = new import_obsidian8.ToggleComponent(itemEl.controlEl);
        const isHidden = this.settings.HIDES.includes(plugin.id);
        hiddenToggle.setValue(isHidden);
        hiddenToggle.onChange((value) => {
          if (value)
            this.settings.HIDES.push(plugin.id);
          else
            this.settings.HIDES = this.settings.HIDES.filter((id) => id !== plugin.id);
          this.manager.saveSettings();
          this.managerModal.reloadShowData();
        });
      }
    }
  }
  async reloadShowData() {
    let scrollTop = 0;
    const modalElement = this.contentEl;
    scrollTop = modalElement.scrollTop;
    modalElement.empty();
    this.showData();
    modalElement.scrollTo(0, scrollTop);
  }
  async onOpen() {
    await this.showHead();
    await this.showData();
  }
  async onClose() {
    this.contentEl.empty();
  }
};

// src/troubleshoot/troubleshoot-modal.ts
var import_obsidian10 = require("obsidian");

// src/troubleshoot/troubleshoot-state.ts
var CORE_PLUGINS_EXCLUDE = [
  "better-plugins-manager"
  // BPM 自身
];
var INITIAL_TROUBLESHOOT_STATE = {
  status: "idle",
  originalEnabledPlugins: [],
  phase: "confirm",
  suspectPool: [],
  clearedPlugins: [],
  currentStep: 0,
  history: []
};
function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}

// src/troubleshoot/troubleshoot-algorithm.ts
var TroubleshootAlgorithm = class {
  constructor(app, manager) {
    this.app = app;
    this.manager = manager;
    this.bpmId = manager.manifest.id;
  }
  /**
   * 获取当前启用的插件列表（排除核心插件）
   */
  getEnabledPlugins() {
    const enabled = [];
    const settings = this.manager.settings;
    const manifests = this.app.plugins.manifests;
    if (settings.DELAY) {
      for (const mp of settings.Plugins) {
        if (!manifests[mp.id])
          continue;
        if (mp.id === this.bpmId || CORE_PLUGINS_EXCLUDE.includes(mp.id))
          continue;
        if (mp.enabled) {
          enabled.push(mp.id);
        }
      }
    } else {
      const appPlugins = this.app.plugins;
      for (const id of appPlugins.enabledPlugins) {
        if (!manifests[id])
          continue;
        if (id === this.bpmId || CORE_PLUGINS_EXCLUDE.includes(id))
          continue;
        enabled.push(id);
      }
    }
    return enabled;
  }
  /**
   * 获取所有插件的 manifest
   */
  getAllManifests() {
    return this.app.plugins.manifests;
  }
  /**
   * 启用指定插件集合（禁用其他所有插件）
   */
  async setEnabledPlugins(pluginsToEnable) {
    const settings = this.manager.settings;
    const appPlugins = this.app.plugins;
    const manifests = this.app.plugins.manifests;
    const enableSet = new Set(pluginsToEnable);
    for (const id of Object.keys(manifests)) {
      if (id === this.bpmId)
        continue;
      const shouldEnable = enableSet.has(id);
      if (settings.DELAY) {
        const mp = settings.Plugins.find((p) => p.id === id);
        if (mp) {
          if (shouldEnable && !mp.enabled) {
            mp.enabled = true;
            await appPlugins.enablePlugin(id);
          } else if (!shouldEnable && mp.enabled) {
            mp.enabled = false;
            await appPlugins.disablePlugin(id);
          }
        }
      } else {
        const isCurrentlyEnabled = appPlugins.enabledPlugins.has(id);
        if (shouldEnable && !isCurrentlyEnabled) {
          await appPlugins.enablePluginAndSave(id);
          const mp = settings.Plugins.find((p) => p.id === id);
          if (mp)
            mp.enabled = true;
        } else if (!shouldEnable && isCurrentlyEnabled) {
          await appPlugins.disablePluginAndSave(id);
          const mp = settings.Plugins.find((p) => p.id === id);
          if (mp)
            mp.enabled = false;
        }
      }
    }
    await this.manager.saveSettings();
  }
  /**
   * 将列表二分
   */
  splitHalf(arr) {
    const mid = Math.ceil(arr.length / 2);
    return [arr.slice(0, mid), arr.slice(mid)];
  }
  /**
   * 初始化排查状态
   */
  initState() {
    const enabled = this.getEnabledPlugins();
    return {
      status: "running",
      originalEnabledPlugins: [...enabled],
      phase: "confirm",
      suspectPool: [...enabled],
      clearedPlugins: [],
      currentStep: 1,
      history: [],
      // 新增字段用于新算法
      algorithmState: {
        stage: "initial-confirm",
        currentSet: [...enabled],
        fixedSet: [],
        searchSet: [],
        foundFirst: null
      }
    };
  }
  /**
   * 记录历史
   */
  recordHistory(state, action, enabledPlugins) {
    state.history.push({
      action,
      previousEnabledPlugins: [...enabledPlugins],
      suspectPoolSnapshot: [...state.suspectPool]
    });
  }
  /**
   * 撤销上一步
   */
  async undo(state) {
    if (state.history.length === 0)
      return false;
    const lastStep = state.history.pop();
    await this.setEnabledPlugins(lastStep.previousEnabledPlugins);
    state.suspectPool = lastStep.suspectPoolSnapshot;
    state.currentStep = Math.max(1, state.currentStep - 1);
    return true;
  }
  /**
   * 恢复原始状态
   */
  async restoreOriginal(state) {
    await this.setEnabledPlugins(state.originalEnabledPlugins);
  }
  // ========================================
  // 新算法实现
  // ========================================
  /**
   * 执行下一步排查
   * 根据用户反馈（问题是否存在）推进算法
   */
  async executeNextStep(state, problemExists) {
    const algo = state.algorithmState;
    if (state.history.length > 0) {
      state.history[state.history.length - 1].userFeedback = problemExists ? "problem-exists" : "problem-gone";
    }
    switch (algo.stage) {
      case "initial-confirm":
        return this.handleInitialConfirm(state, problemExists);
      case "bisect-main":
        return this.handleBisectMain(state, problemExists);
      case "cross-pair-bisect-b":
        return this.handleCrossPairBisectB(state, problemExists);
      case "cross-pair-bisect-a":
        return this.handleCrossPairBisectA(state, problemExists);
      case "verify-single":
        return this.handleVerifySingle(state, problemExists);
      case "verify-pair":
        return this.handleVerifyPair(state, problemExists);
      default:
        return { type: "error", message: "\u672A\u77E5\u7684\u7B97\u6CD5\u9636\u6BB5" };
    }
  }
  /**
   * 阶段：初始确认（禁用全部插件）
   */
  async handleInitialConfirm(state, problemExists) {
    if (problemExists) {
      return { type: "not-plugin-issue" };
    }
    const algo = state.algorithmState;
    algo.stage = "bisect-main";
    algo.currentSet = [...state.originalEnabledPlugins];
    state.currentStep++;
    const [c1] = this.splitHalf(algo.currentSet);
    algo.testingHalf = "first";
    algo.c1 = c1;
    algo.c2 = algo.currentSet.filter((id) => !c1.includes(id));
    this.recordHistory(state, "enable-half", []);
    await this.setEnabledPlugins(c1);
    return {
      type: "continue",
      nextAction: {
        action: "test",
        plugins: c1,
        description: `\u6D4B\u8BD5\u524D\u534A (${c1.length} \u4E2A\u63D2\u4EF6)`
      }
    };
  }
  /**
   * 阶段：主循环二分
   */
  async handleBisectMain(state, problemExists) {
    const algo = state.algorithmState;
    state.currentStep++;
    if (algo.testingHalf === "first") {
      if (problemExists) {
        algo.currentSet = algo.c1;
        return this.continueOrFinishBisect(state);
      } else {
        algo.testingHalf = "second";
        this.recordHistory(state, "enable-half", algo.c1);
        await this.setEnabledPlugins(algo.c2);
        return {
          type: "continue",
          nextAction: {
            action: "test",
            plugins: algo.c2,
            description: `\u6D4B\u8BD5\u540E\u534A (${algo.c2.length} \u4E2A\u63D2\u4EF6)`
          }
        };
      }
    } else {
      if (problemExists) {
        algo.currentSet = algo.c2;
        return this.continueOrFinishBisect(state);
      } else {
        return this.startCrossPair(state, algo.c1, algo.c2);
      }
    }
  }
  /**
   * 继续二分或完成
   */
  async continueOrFinishBisect(state) {
    const algo = state.algorithmState;
    if (algo.currentSet.length === 1) {
      algo.stage = "verify-single";
      algo.foundFirst = algo.currentSet[0];
      this.recordHistory(state, "isolate", algo.currentSet);
      await this.setEnabledPlugins([algo.foundFirst]);
      return {
        type: "continue",
        nextAction: {
          action: "test",
          plugins: [algo.foundFirst],
          description: `\u9A8C\u8BC1\u5355\u63D2\u4EF6: ${this.getPluginName(algo.foundFirst)}`
        }
      };
    }
    if (algo.currentSet.length === 2) {
      algo.stage = "verify-pair";
      algo.pairToVerify = [...algo.currentSet];
      algo.verifyStep = "test-first";
      this.recordHistory(state, "isolate", algo.currentSet);
      await this.setEnabledPlugins([algo.currentSet[0]]);
      return {
        type: "continue",
        nextAction: {
          action: "test",
          plugins: [algo.currentSet[0]],
          description: `\u9A8C\u8BC1: ${this.getPluginName(algo.currentSet[0])}`
        }
      };
    }
    const [c1, c2] = this.splitHalf(algo.currentSet);
    algo.testingHalf = "first";
    algo.c1 = c1;
    algo.c2 = c2;
    this.recordHistory(state, "enable-half", algo.currentSet);
    await this.setEnabledPlugins(c1);
    return {
      type: "continue",
      nextAction: {
        action: "test",
        plugins: c1,
        description: `\u6D4B\u8BD5\u524D\u534A (${c1.length} \u4E2A\u63D2\u4EF6)`
      }
    };
  }
  /**
   * 开始跨分区冲突排查
   */
  async startCrossPair(state, setA, setB) {
    const algo = state.algorithmState;
    algo.stage = "cross-pair-bisect-b";
    algo.fixedSet = setA;
    algo.searchSet = setB;
    const [b1] = this.splitHalf(algo.searchSet);
    algo.searchHalf = b1;
    algo.searchOtherHalf = algo.searchSet.filter((id) => !b1.includes(id));
    const testSet = [...algo.fixedSet, ...b1];
    this.recordHistory(state, "test-pair", algo.c2);
    await this.setEnabledPlugins(testSet);
    state.currentStep++;
    return {
      type: "continue",
      nextAction: {
        action: "test",
        plugins: testSet,
        description: `\u56FA\u5B9A A \u7EC4 (${algo.fixedSet.length}\u4E2A) + B \u7EC4\u524D\u534A (${b1.length}\u4E2A)`
      }
    };
  }
  /**
   * 阶段：跨分区二分 B
   */
  async handleCrossPairBisectB(state, problemExists) {
    const algo = state.algorithmState;
    state.currentStep++;
    if (problemExists) {
      algo.searchSet = algo.searchHalf;
    } else {
      algo.searchSet = algo.searchOtherHalf;
    }
    if (algo.searchSet.length === 1) {
      algo.foundSecond = algo.searchSet[0];
      algo.stage = "cross-pair-bisect-a";
      algo.searchSet = algo.fixedSet;
      algo.fixedSet = [algo.foundSecond];
      const [a1] = this.splitHalf(algo.searchSet);
      algo.searchHalf = a1;
      algo.searchOtherHalf = algo.searchSet.filter((id) => !a1.includes(id));
      const testSet2 = [...algo.fixedSet, ...a1];
      this.recordHistory(state, "test-pair", algo.searchSet);
      await this.setEnabledPlugins(testSet2);
      return {
        type: "continue",
        nextAction: {
          action: "test",
          plugins: testSet2,
          description: `\u56FA\u5B9A ${this.getPluginName(algo.foundSecond)} + A \u7EC4\u524D\u534A (${a1.length}\u4E2A)`
        }
      };
    }
    const [b1] = this.splitHalf(algo.searchSet);
    algo.searchHalf = b1;
    algo.searchOtherHalf = algo.searchSet.filter((id) => !b1.includes(id));
    const testSet = [...algo.fixedSet, ...b1];
    this.recordHistory(state, "test-pair", algo.searchSet);
    await this.setEnabledPlugins(testSet);
    return {
      type: "continue",
      nextAction: {
        action: "test",
        plugins: testSet,
        description: `\u56FA\u5B9A A \u7EC4 + B \u7EC4\u5B50\u96C6 (${b1.length}\u4E2A)`
      }
    };
  }
  /**
   * 阶段：跨分区二分 A
   */
  async handleCrossPairBisectA(state, problemExists) {
    const algo = state.algorithmState;
    state.currentStep++;
    if (problemExists) {
      algo.searchSet = algo.searchHalf;
    } else {
      algo.searchSet = algo.searchOtherHalf;
    }
    if (algo.searchSet.length === 1) {
      algo.foundFirst = algo.searchSet[0];
      state.result = {
        plugin1: algo.foundFirst,
        plugin2: algo.foundSecond
      };
      state.status = "completed";
      state.phase = "done";
      return {
        type: "pair",
        culpritA: algo.foundFirst,
        culpritB: algo.foundSecond
      };
    }
    const [a1] = this.splitHalf(algo.searchSet);
    algo.searchHalf = a1;
    algo.searchOtherHalf = algo.searchSet.filter((id) => !a1.includes(id));
    const testSet = [...algo.fixedSet, ...a1];
    this.recordHistory(state, "test-pair", algo.searchSet);
    await this.setEnabledPlugins(testSet);
    return {
      type: "continue",
      nextAction: {
        action: "test",
        plugins: testSet,
        description: `\u56FA\u5B9A ${this.getPluginName(algo.foundSecond)} + A \u7EC4\u5B50\u96C6 (${a1.length}\u4E2A)`
      }
    };
  }
  /**
   * 阶段：验证单插件
   */
  async handleVerifySingle(state, problemExists) {
    const algo = state.algorithmState;
    if (problemExists) {
      state.result = {
        plugin1: algo.foundFirst,
        plugin2: ""
        // 单插件没有第二个
      };
      state.status = "completed";
      state.phase = "done";
      return {
        type: "single",
        culprit: algo.foundFirst
      };
    } else {
      return {
        type: "error",
        message: "\u5355\u4E2A\u63D2\u4EF6\u542F\u7528\u65F6\u95EE\u9898\u6D88\u5931\uFF0C\u53EF\u80FD\u662F\u591A\u63D2\u4EF6\u7EC4\u5408\u51B2\u7A81"
      };
    }
  }
  /**
   * 阶段：验证冲突对（剩两个插件时）
   */
  async handleVerifyPair(state, problemExists) {
    const algo = state.algorithmState;
    const pair = algo.pairToVerify;
    state.currentStep++;
    if (algo.verifyStep === "test-first") {
      if (problemExists) {
        state.result = { plugin1: pair[0], plugin2: "" };
        state.status = "completed";
        state.phase = "done";
        return { type: "single", culprit: pair[0] };
      }
      algo.verifyStep = "test-second";
      this.recordHistory(state, "isolate", [pair[0]]);
      await this.setEnabledPlugins([pair[1]]);
      return {
        type: "continue",
        nextAction: {
          action: "test",
          plugins: [pair[1]],
          description: `\u9A8C\u8BC1: ${this.getPluginName(pair[1])}`
        }
      };
    }
    if (algo.verifyStep === "test-second") {
      if (problemExists) {
        state.result = { plugin1: pair[1], plugin2: "" };
        state.status = "completed";
        state.phase = "done";
        return { type: "single", culprit: pair[1] };
      }
      state.result = { plugin1: pair[0], plugin2: pair[1] };
      state.status = "completed";
      state.phase = "done";
      return { type: "pair", culpritA: pair[0], culpritB: pair[1] };
    }
    return { type: "error", message: "\u9A8C\u8BC1\u9636\u6BB5\u72B6\u6001\u5F02\u5E38" };
  }
  /**
   * 开始排查（第一步：禁用全部）
   */
  async startTroubleshoot(state) {
    const algo = state.algorithmState;
    algo.stage = "initial-confirm";
    this.recordHistory(state, "disable-all", state.originalEnabledPlugins);
    await this.setEnabledPlugins([]);
  }
  /**
   * 获取插件显示名称
   */
  getPluginName(id) {
    var _a;
    const manifests = this.getAllManifests();
    return ((_a = manifests[id]) == null ? void 0 : _a.name) || id;
  }
  /**
   * 计算预计剩余步骤数
   */
  estimateRemainingSteps(state) {
    var _a, _b;
    const poolSize = ((_b = (_a = state.algorithmState) == null ? void 0 : _a.currentSet) == null ? void 0 : _b.length) || state.suspectPool.length;
    if (poolSize <= 1)
      return 1;
    return Math.ceil(Math.log2(poolSize)) * 2;
  }
  /**
   * 重启 Obsidian
   */
  restartObsidian() {
    this.app.commands.executeCommandById("app:reload");
  }
};

// src/troubleshoot/troubleshoot-result.ts
var import_obsidian9 = require("obsidian");
var TroubleshootResultModal = class extends import_obsidian9.Modal {
  constructor(app, manager, state) {
    super(app);
    this.manager = manager;
    this.algorithm = new TroubleshootAlgorithm(app, manager);
    this.state = state;
    this.t = (k) => manager.translator.t(k);
  }
  async onOpen() {
    await this.render();
  }
  async onClose() {
  }
  async render() {
    const { contentEl, titleEl } = this;
    contentEl.empty();
    titleEl.empty();
    const modalEl = contentEl.parentElement;
    modalEl.addClass("troubleshoot-result-modal");
    const defaultCloseBtn = modalEl.querySelector(".modal-close-button");
    if (defaultCloseBtn) {
      defaultCloseBtn.remove();
    }
    const titleSetting = new import_obsidian9.Setting(titleEl).setClass("troubleshoot-title").setName(`\u2705 ${this.t("\u6392\u67E5_\u5B8C\u6210_\u6807\u9898")}`);
    const closeBtn = titleSetting.controlEl.createEl("button", { cls: "clickable-icon" });
    (0, import_obsidian9.setIcon)(closeBtn, "x");
    closeBtn.onclick = () => this.close();
    if (this.state.result) {
      const isSinglePlugin = !this.state.result.plugin2;
      if (isSinglePlugin) {
        const resultContainer = contentEl.createDiv("troubleshoot-result-container");
        resultContainer.createEl("h3", { text: `\u{1F3AF} \u53D1\u73B0\u95EE\u9898\u63D2\u4EF6` });
        const conflictBox = resultContainer.createDiv("troubleshoot-conflict-box");
        const plugin1Name = this.getPluginName(this.state.result.plugin1);
        const plugin1Version = this.getPluginVersion(this.state.result.plugin1);
        const plugin1Div = conflictBox.createDiv("troubleshoot-plugin");
        plugin1Div.createEl("span", { text: "\u{1F50C}", cls: "plugin-icon" });
        plugin1Div.createEl("span", { text: plugin1Name, cls: "plugin-name" });
        plugin1Div.createEl("span", { text: `v${plugin1Version}`, cls: "plugin-version" });
        const suggestionsDiv = contentEl.createDiv("troubleshoot-suggestions");
        suggestionsDiv.createEl("h4", { text: `\u{1F4CB} ${this.t("\u6392\u67E5_\u5EFA\u8BAE_\u6807\u9898")}` });
        const suggestionList = suggestionsDiv.createEl("ul");
        suggestionList.createEl("li", { text: "\u5C1D\u8BD5\u66F4\u65B0\u6B64\u63D2\u4EF6\u5230\u6700\u65B0\u7248\u672C" });
        suggestionList.createEl("li", { text: "\u68C0\u67E5\u63D2\u4EF6\u7684 GitHub Issues \u662F\u5426\u6709\u76F8\u5173\u95EE\u9898" });
        suggestionList.createEl("li", { text: "\u8054\u7CFB\u63D2\u4EF6\u4F5C\u8005\u62A5\u544A\u95EE\u9898" });
        suggestionList.createEl("li", { text: "\u6682\u65F6\u7981\u7528\u6B64\u63D2\u4EF6" });
      } else {
        const resultContainer = contentEl.createDiv("troubleshoot-result-container");
        resultContainer.createEl("h3", { text: `\u{1F3AF} ${this.t("\u6392\u67E5_\u53D1\u73B0\u51B2\u7A81_\u6587\u672C")}` });
        const conflictBox = resultContainer.createDiv("troubleshoot-conflict-box");
        const plugin1Name = this.getPluginName(this.state.result.plugin1);
        const plugin1Version = this.getPluginVersion(this.state.result.plugin1);
        const plugin2Name = this.getPluginName(this.state.result.plugin2);
        const plugin2Version = this.getPluginVersion(this.state.result.plugin2);
        const plugin1Div = conflictBox.createDiv("troubleshoot-plugin");
        plugin1Div.createEl("span", { text: "\u{1F50C}", cls: "plugin-icon" });
        plugin1Div.createEl("span", { text: plugin1Name, cls: "plugin-name" });
        plugin1Div.createEl("span", { text: `v${plugin1Version}`, cls: "plugin-version" });
        conflictBox.createEl("span", { text: "\u26A1", cls: "conflict-arrow" });
        const plugin2Div = conflictBox.createDiv("troubleshoot-plugin");
        plugin2Div.createEl("span", { text: "\u{1F50C}", cls: "plugin-icon" });
        plugin2Div.createEl("span", { text: plugin2Name, cls: "plugin-name" });
        plugin2Div.createEl("span", { text: `v${plugin2Version}`, cls: "plugin-version" });
        const suggestionsDiv = contentEl.createDiv("troubleshoot-suggestions");
        suggestionsDiv.createEl("h4", { text: `\u{1F4CB} ${this.t("\u6392\u67E5_\u5EFA\u8BAE_\u6807\u9898")}` });
        const suggestionList = suggestionsDiv.createEl("ul");
        suggestionList.createEl("li", { text: this.t("\u6392\u67E5_\u5EFA\u8BAE1_\u6587\u672C") });
        suggestionList.createEl("li", { text: this.t("\u6392\u67E5_\u5EFA\u8BAE2_\u6587\u672C") });
        suggestionList.createEl("li", { text: this.t("\u6392\u67E5_\u5EFA\u8BAE3_\u6587\u672C") });
      }
      const statsDiv = contentEl.createDiv("troubleshoot-stats");
      statsDiv.createEl("p", {
        text: `${this.t("\u6392\u67E5_\u603B\u6B65\u9AA4_\u6587\u672C")}: ${this.state.currentStep}`,
        cls: "troubleshoot-stat"
      });
    }
    const actionContainer = contentEl.createDiv("troubleshoot-actions");
    const restoreBtn = new import_obsidian9.ButtonComponent(actionContainer);
    restoreBtn.setButtonText(this.t("\u6392\u67E5_\u6062\u590D\u539F\u59CB_\u6309\u94AE"));
    restoreBtn.setCta();
    restoreBtn.onClick(async () => {
      await this.restoreAndClose();
    });
    const reportBtn = new import_obsidian9.ButtonComponent(actionContainer);
    reportBtn.setButtonText(`\u{1F4CA} ${this.t("\u6392\u67E5_\u751F\u6210\u62A5\u544A_\u6309\u94AE")}`);
    reportBtn.onClick(async () => {
      await this.generateReport();
    });
  }
  getPluginName(id) {
    var _a;
    const manifests = this.algorithm.getAllManifests();
    return ((_a = manifests[id]) == null ? void 0 : _a.name) || id;
  }
  getPluginVersion(id) {
    var _a;
    const manifests = this.algorithm.getAllManifests();
    return ((_a = manifests[id]) == null ? void 0 : _a.version) || "unknown";
  }
  async restoreAndClose() {
    await this.algorithm.restoreOriginal(this.state);
    await this.clearStateAndClose();
    new import_obsidian9.Notice(this.t("\u6392\u67E5_\u5DF2\u6062\u590D_\u901A\u77E5"));
  }
  async clearStateAndClose() {
    this.manager.settings.TROUBLESHOOT_STATE = cloneState(INITIAL_TROUBLESHOOT_STATE);
    await this.manager.saveSettings();
    this.close();
  }
  /**
   * 生成 Markdown 报告
   */
  async generateReport() {
    if (!this.state.result) {
      new import_obsidian9.Notice(this.t("\u6392\u67E5_\u65E0\u7ED3\u679C_\u901A\u77E5"));
      return;
    }
    const isSinglePlugin = !this.state.result.plugin2;
    const plugin1Name = this.getPluginName(this.state.result.plugin1);
    const plugin1Version = this.getPluginVersion(this.state.result.plugin1);
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toISOString().split("T")[1].split(".")[0].replace(/:/g, "-");
    const fileName = `plugin-conflict-report-${dateStr}-${timeStr}.md`;
    const filePath = (0, import_obsidian9.normalizePath)(fileName);
    let content;
    if (isSinglePlugin) {
      content = `# ${this.t("\u62A5\u544A_\u5355\u63D2\u4EF6_\u6807\u9898")}

${this.t("\u62A5\u544A_\u751F\u6210\u8BF4\u660E")} ${now.toLocaleString()}

---

## \u{1F3AF} ${this.t("\u62A5\u544A_\u53D1\u73B0\u95EE\u9898\u63D2\u4EF6")}

| ${this.t("\u62A5\u544A_\u63D2\u4EF6")} |
|--------|
| **${plugin1Name}** (v${plugin1Version}) |
| ID: \`${this.state.result.plugin1}\` |

---

## \u{1F4CA} ${this.t("\u62A5\u544A_\u6392\u67E5\u6458\u8981")}

- **${this.t("\u62A5\u544A_\u603B\u6B65\u9AA4")}**: ${this.state.currentStep}
- **${this.t("\u62A5\u544A_\u7ED3\u679C\u7C7B\u578B")}**: ${this.t("\u62A5\u544A_\u5355\u63D2\u4EF6\u95EE\u9898")}
- **${this.t("\u62A5\u544A_\u539F\u59CB\u542F\u7528\u6570")}**: ${this.state.originalEnabledPlugins.length}

---

## \u{1F4CB} ${this.t("\u62A5\u544A_\u5EFA\u8BAE\u64CD\u4F5C")}

1. ${this.t("\u62A5\u544A_\u5355\u63D2\u4EF6\u5EFA\u8BAE1")}
2. ${this.t("\u62A5\u544A_\u5355\u63D2\u4EF6\u5EFA\u8BAE2")}
3. ${this.t("\u62A5\u544A_\u5355\u63D2\u4EF6\u5EFA\u8BAE3")}
4. ${this.t("\u62A5\u544A_\u5355\u63D2\u4EF6\u5EFA\u8BAE4")}

---

## \u{1F4DD} ${this.t("\u62A5\u544A_\u5907\u6CE8")}

${this.t("\u62A5\u544A_\u5907\u6CE8\u63D0\u793A")}
`;
    } else {
      const plugin2Name = this.getPluginName(this.state.result.plugin2);
      const plugin2Version = this.getPluginVersion(this.state.result.plugin2);
      content = `# ${this.t("\u62A5\u544A_\u51B2\u7A81_\u6807\u9898")}

${this.t("\u62A5\u544A_\u751F\u6210\u8BF4\u660E")} ${now.toLocaleString()}

---

## \u{1F3AF} ${this.t("\u62A5\u544A_\u53D1\u73B0\u51B2\u7A81")}

| ${this.t("\u62A5\u544A_\u63D2\u4EF61")} | ${this.t("\u62A5\u544A_\u63D2\u4EF62")} |
|----------|----------|
| **${plugin1Name}** (v${plugin1Version}) | **${plugin2Name}** (v${plugin2Version}) |
| ID: \`${this.state.result.plugin1}\` | ID: \`${this.state.result.plugin2}\` |

---

## \u{1F4CA} ${this.t("\u62A5\u544A_\u6392\u67E5\u6458\u8981")}

- **${this.t("\u62A5\u544A_\u603B\u6B65\u9AA4")}**: ${this.state.currentStep}
- **${this.t("\u62A5\u544A_\u7ED3\u679C\u7C7B\u578B")}**: ${this.t("\u62A5\u544A_\u51B2\u7A81\u5BF9")}
- **${this.t("\u62A5\u544A_\u539F\u59CB\u542F\u7528\u6570")}**: ${this.state.originalEnabledPlugins.length}

---

## \u{1F4CB} ${this.t("\u62A5\u544A_\u5EFA\u8BAE\u64CD\u4F5C")}

1. ${this.t("\u62A5\u544A_\u51B2\u7A81\u5EFA\u8BAE1")}
2. ${this.t("\u62A5\u544A_\u51B2\u7A81\u5EFA\u8BAE2")}
3. ${this.t("\u62A5\u544A_\u51B2\u7A81\u5EFA\u8BAE3")}
4. ${this.t("\u62A5\u544A_\u51B2\u7A81\u5EFA\u8BAE4")}

---

## \u{1F4DD} ${this.t("\u62A5\u544A_\u5907\u6CE8")}

${this.t("\u62A5\u544A_\u5907\u6CE8\u63D0\u793A")}

---

## \u{1F527} ${this.t("\u62A5\u544A_\u6280\u672F\u8BE6\u60C5")}

### ${this.t("\u62A5\u544A_\u63D2\u4EF61")}: ${plugin1Name}
- ID: \`${this.state.result.plugin1}\`
- Version: ${plugin1Version}

### ${this.t("\u62A5\u544A_\u63D2\u4EF62")}: ${plugin2Name}
- ID: \`${this.state.result.plugin2}\`
- Version: ${plugin2Version}

### ${this.t("\u62A5\u544A_\u539F\u59CB\u542F\u7528\u5217\u8868")}
${this.state.originalEnabledPlugins.map((id) => `- ${this.getPluginName(id)} (\`${id}\`)`).join("\n")}
`;
    }
    try {
      await this.app.vault.create(filePath, content);
      new import_obsidian9.Notice(`${this.t("\u6392\u67E5_\u62A5\u544A\u5DF2\u751F\u6210_\u901A\u77E5")}: ${fileName}`);
      const file = this.app.vault.getAbstractFileByPath(filePath);
      if (file) {
        await this.app.workspace.getLeaf().openFile(file);
      }
    } catch (e) {
      console.error("[BPM] Failed to create report:", e);
      new import_obsidian9.Notice(this.t("\u6392\u67E5_\u62A5\u544A\u5931\u8D25_\u901A\u77E5"));
    }
  }
};

// src/troubleshoot/troubleshoot-modal.ts
var TroubleshootModal = class {
  constructor(app, manager) {
    this.lastDescription = "";
    // 悬浮窗元素
    this.containerEl = null;
    this.headerEl = null;
    this.contentEl = null;
    // 拖动状态
    this.isDragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.app = app;
    this.manager = manager;
    this.algorithm = new TroubleshootAlgorithm(app, manager);
    this.t = (k) => manager.translator.t(k);
    const savedState = manager.settings.TROUBLESHOOT_STATE;
    if (savedState && savedState.status === "running") {
      this.state = savedState;
    } else {
      this.state = cloneState(INITIAL_TROUBLESHOOT_STATE);
    }
  }
  open() {
    if (this.containerEl) {
      return;
    }
    this.createFloatingWindow();
    this.render();
  }
  close() {
    if (this.containerEl) {
      this.containerEl.remove();
      this.containerEl = null;
      this.headerEl = null;
      this.contentEl = null;
    }
    this.saveState();
  }
  async saveState() {
    this.manager.settings.TROUBLESHOOT_STATE = this.state;
    await this.manager.saveSettings();
  }
  /**
   * 创建悬浮窗
   */
  createFloatingWindow() {
    this.containerEl = document.body.createDiv({ cls: "troubleshoot-floating-window" });
    this.headerEl = this.containerEl.createDiv({ cls: "troubleshoot-floating-header" });
    this.contentEl = this.containerEl.createDiv({ cls: "troubleshoot-floating-content" });
    this.containerEl.style.position = "fixed";
    this.containerEl.style.right = "20px";
    this.containerEl.style.bottom = "20px";
    this.containerEl.style.left = "auto";
    this.containerEl.style.top = "auto";
    this.containerEl.style.zIndex = "1000";
    this.bindDragEvents();
  }
  /**
   * 绑定拖动事件
   */
  bindDragEvents() {
    if (!this.headerEl || !this.containerEl)
      return;
    const onMouseDown = (e) => {
      if (!this.containerEl)
        return;
      this.isDragging = true;
      const rect = this.containerEl.getBoundingClientRect();
      this.dragOffsetX = e.clientX - rect.left;
      this.dragOffsetY = e.clientY - rect.top;
      this.headerEl.addClass("dragging");
      e.preventDefault();
    };
    const onMouseMove = (e) => {
      if (!this.isDragging || !this.containerEl)
        return;
      this.containerEl.style.left = `${e.clientX - this.dragOffsetX}px`;
      this.containerEl.style.top = `${e.clientY - this.dragOffsetY}px`;
      this.containerEl.style.right = "auto";
      this.containerEl.style.bottom = "auto";
    };
    const onMouseUp = () => {
      var _a;
      this.isDragging = false;
      (_a = this.headerEl) == null ? void 0 : _a.removeClass("dragging");
    };
    this.headerEl.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    this.headerEl.addEventListener("touchstart", (e) => {
      if (!this.containerEl || e.touches.length !== 1)
        return;
      const touch = e.touches[0];
      const rect = this.containerEl.getBoundingClientRect();
      this.isDragging = true;
      this.dragOffsetX = touch.clientX - rect.left;
      this.dragOffsetY = touch.clientY - rect.top;
    });
    document.addEventListener("touchmove", (e) => {
      if (!this.isDragging || !this.containerEl || e.touches.length !== 1)
        return;
      const touch = e.touches[0];
      this.containerEl.style.left = `${touch.clientX - this.dragOffsetX}px`;
      this.containerEl.style.top = `${touch.clientY - this.dragOffsetY}px`;
      this.containerEl.style.right = "auto";
      this.containerEl.style.bottom = "auto";
    });
    document.addEventListener("touchend", () => {
      this.isDragging = false;
    });
  }
  async render() {
    if (!this.contentEl || !this.headerEl)
      return;
    this.contentEl.empty();
    this.headerEl.empty();
    if (this.state.status === "idle") {
      await this.renderWelcome();
    } else if (this.state.status === "running") {
      await this.renderProgress();
    } else if (this.state.status === "completed") {
      this.close();
      new TroubleshootResultModal(this.app, this.manager, this.state).open();
    }
  }
  /**
   * 渲染欢迎界面
   */
  async renderWelcome() {
    if (!this.headerEl || !this.contentEl)
      return;
    const titleSpan = this.headerEl.createSpan({ text: this.t("\u6392\u67E5_\u6B22\u8FCE_\u6807\u9898"), cls: "troubleshoot-floating-title" });
    const closeBtn = this.headerEl.createEl("button", { cls: "troubleshoot-floating-close" });
    (0, import_obsidian10.setIcon)(closeBtn, "x");
    closeBtn.onclick = () => this.close();
    this.contentEl.createEl("p", {
      text: this.t("\u6392\u67E5_\u6B22\u8FCE_\u8BF4\u660E"),
      cls: "troubleshoot-desc"
    });
    const enabledPlugins = this.algorithm.getEnabledPlugins();
    this.contentEl.createEl("p", {
      text: `${this.t("\u6392\u67E5_\u5F53\u524D\u542F\u7528_\u6587\u672C")}: ${enabledPlugins.length}`,
      cls: "troubleshoot-info"
    });
    const estimatedSteps = Math.ceil(Math.log2(enabledPlugins.length)) * 2 + 2;
    this.contentEl.createEl("p", {
      text: `${this.t("\u6392\u67E5_\u9884\u8BA1\u6B65\u9AA4_\u6587\u672C")}: ~${estimatedSteps}`,
      cls: "troubleshoot-info"
    });
    const actionContainer = this.contentEl.createDiv("troubleshoot-actions");
    const startBtn = new import_obsidian10.ButtonComponent(actionContainer);
    startBtn.setButtonText(this.t("\u6392\u67E5_\u5F00\u59CB_\u6309\u94AE"));
    startBtn.setCta();
    startBtn.onClick(async () => {
      await this.startTroubleshoot();
    });
    const cancelBtn = new import_obsidian10.ButtonComponent(actionContainer);
    cancelBtn.setButtonText(this.t("\u6392\u67E5_\u53D6\u6D88_\u6309\u94AE"));
    cancelBtn.onClick(() => this.close());
  }
  /**
   * 渲染排查进度界面
   */
  async renderProgress() {
    if (!this.headerEl || !this.contentEl)
      return;
    this.headerEl.createSpan({
      text: `${this.t("\u6392\u67E5_\u6B65\u9AA4_\u6587\u672C")} ${this.state.currentStep}`,
      cls: "troubleshoot-floating-title"
    });
    const closeBtn = this.headerEl.createEl("button", { cls: "troubleshoot-floating-close" });
    (0, import_obsidian10.setIcon)(closeBtn, "x");
    closeBtn.onclick = () => this.confirmExit();
    const algo = this.state.algorithmState;
    let phaseText = "";
    if (algo) {
      switch (algo.stage) {
        case "initial-confirm":
          phaseText = this.t("\u6392\u67E5_\u9636\u6BB5_\u786E\u8BA4");
          break;
        case "bisect-main":
          phaseText = this.t("\u6392\u67E5_\u9636\u6BB5_\u67E5\u627E\u7B2C\u4E00");
          break;
        case "cross-pair-bisect-b":
        case "cross-pair-bisect-a":
          phaseText = this.t("\u6392\u67E5_\u9636\u6BB5_\u67E5\u627E\u7B2C\u4E8C");
          break;
        case "verify-single":
        case "verify-pair":
          phaseText = "\u9A8C\u8BC1\u9636\u6BB5";
          break;
      }
    }
    this.contentEl.createEl("p", { text: phaseText, cls: "troubleshoot-phase" });
    if (this.lastDescription) {
      this.contentEl.createEl("p", {
        text: `\u5F53\u524D\u6D4B\u8BD5: ${this.lastDescription}`,
        cls: "troubleshoot-desc"
      });
    }
    const progressContainer = this.contentEl.createDiv("troubleshoot-progress");
    const remaining = this.algorithm.estimateRemainingSteps(this.state);
    const total = this.state.currentStep + remaining;
    const percent = Math.round(this.state.currentStep / total * 100);
    const progressBar = progressContainer.createDiv("troubleshoot-progress-bar");
    progressBar.style.width = `${percent}%`;
    progressContainer.createSpan({ text: `${percent}%`, cls: "troubleshoot-progress-text" });
    const currentEnabled = this.algorithm.getEnabledPlugins();
    const listContainer = this.contentEl.createDiv("troubleshoot-lists");
    const enabledDiv = listContainer.createDiv("troubleshoot-list enabled");
    enabledDiv.createEl("h4", { text: `\u2705 ${this.t("\u6392\u67E5_\u5DF2\u542F\u7528_\u6587\u672C")} (${currentEnabled.length})` });
    const enabledList = enabledDiv.createEl("ul");
    for (const id of currentEnabled) {
      enabledList.createEl("li", { text: this.algorithm.getPluginName(id) });
    }
    if (currentEnabled.length === 0) {
      enabledList.createEl("li", { text: "(\u65E0)", cls: "muted" });
    }
    this.contentEl.createEl("p", {
      text: this.t("\u6392\u67E5_\u6D4B\u8BD5\u63D0\u793A_\u6587\u672C"),
      cls: "troubleshoot-hint"
    });
    const actionContainer = this.contentEl.createDiv("troubleshoot-actions");
    const problemExistsBtn = new import_obsidian10.ButtonComponent(actionContainer);
    problemExistsBtn.setButtonText(`\u{1F44E} ${this.t("\u6392\u67E5_\u95EE\u9898\u8FD8\u5728_\u6309\u94AE")}`);
    problemExistsBtn.onClick(async () => {
      await this.handleFeedback(true);
    });
    const problemGoneBtn = new import_obsidian10.ButtonComponent(actionContainer);
    problemGoneBtn.setButtonText(`\u{1F44D} ${this.t("\u6392\u67E5_\u95EE\u9898\u6D88\u5931_\u6309\u94AE")}`);
    problemGoneBtn.setCta();
    problemGoneBtn.onClick(async () => {
      await this.handleFeedback(false);
    });
    const restartBtn = new import_obsidian10.ButtonComponent(actionContainer);
    restartBtn.setButtonText(`\u{1F504} ${this.t("\u6392\u67E5_\u91CD\u542F_\u6309\u94AE")}`);
    restartBtn.onClick(async () => {
      await this.saveState();
      this.algorithm.restartObsidian();
    });
    const footerContainer = this.contentEl.createDiv("troubleshoot-footer");
    const undoBtn = new import_obsidian10.ButtonComponent(footerContainer);
    undoBtn.setButtonText(`\u21A9\uFE0F ${this.t("\u6392\u67E5_\u64A4\u9500_\u6309\u94AE")}`);
    undoBtn.setDisabled(this.state.history.length === 0);
    undoBtn.onClick(async () => {
      await this.undo();
    });
    const exitBtn = new import_obsidian10.ButtonComponent(footerContainer);
    exitBtn.setButtonText(`\u{1F6AA} ${this.t("\u6392\u67E5_\u9000\u51FA_\u6309\u94AE")}`);
    exitBtn.onClick(() => this.confirmExit());
  }
  /**
   * 开始排查
   */
  async startTroubleshoot() {
    this.state = this.algorithm.initState();
    this.lastDescription = "\u5DF2\u7981\u7528\u5168\u90E8\u63D2\u4EF6";
    await this.algorithm.startTroubleshoot(this.state);
    await this.saveState();
    new import_obsidian10.Notice(this.t("\u6392\u67E5_\u5DF2\u7981\u7528\u6240\u6709_\u901A\u77E5"));
    await this.render();
  }
  /**
   * 处理用户反馈
   */
  async handleFeedback(problemExists) {
    const result = await this.algorithm.executeNextStep(this.state, problemExists);
    switch (result.type) {
      case "not-plugin-issue":
        new import_obsidian10.Notice(this.t("\u6392\u67E5_\u975E\u63D2\u4EF6\u95EE\u9898_\u901A\u77E5"));
        await this.algorithm.restoreOriginal(this.state);
        this.state.status = "aborted";
        await this.saveState();
        this.close();
        return;
      case "single":
        await this.saveState();
        this.close();
        new TroubleshootResultModal(this.app, this.manager, this.state).open();
        return;
      case "pair":
        await this.saveState();
        this.close();
        new TroubleshootResultModal(this.app, this.manager, this.state).open();
        return;
      case "error":
        new import_obsidian10.Notice(result.message);
        await this.algorithm.restoreOriginal(this.state);
        this.state.status = "aborted";
        await this.saveState();
        this.close();
        return;
      case "continue":
        if (result.nextAction.action === "test") {
          this.lastDescription = result.nextAction.description;
        }
        await this.saveState();
        await this.render();
        return;
    }
  }
  /**
   * 撤销上一步
   */
  async undo() {
    const success = await this.algorithm.undo(this.state);
    if (success) {
      await this.saveState();
      await this.render();
      new import_obsidian10.Notice(this.t("\u6392\u67E5_\u5DF2\u64A4\u9500_\u901A\u77E5"));
    }
  }
  /**
   * 确认退出
   */
  confirmExit() {
    const overlay = document.body.createDiv({ cls: "troubleshoot-confirm-overlay" });
    const dialog = overlay.createDiv({ cls: "troubleshoot-confirm-dialog" });
    dialog.createEl("h4", { text: this.t("\u6392\u67E5_\u9000\u51FA\u786E\u8BA4_\u6807\u9898") });
    dialog.createEl("p", { text: this.t("\u6392\u67E5_\u9000\u51FA\u786E\u8BA4_\u6587\u672C") });
    const actions = dialog.createDiv("troubleshoot-actions");
    const restoreBtn = new import_obsidian10.ButtonComponent(actions);
    restoreBtn.setButtonText(this.t("\u6392\u67E5_\u6062\u590D\u5E76\u9000\u51FA_\u6309\u94AE"));
    restoreBtn.setCta();
    restoreBtn.onClick(async () => {
      await this.algorithm.restoreOriginal(this.state);
      this.state = cloneState(INITIAL_TROUBLESHOOT_STATE);
      await this.saveState();
      overlay.remove();
      this.close();
    });
    const keepBtn = new import_obsidian10.ButtonComponent(actions);
    keepBtn.setButtonText(this.t("\u6392\u67E5_\u4FDD\u6301\u5E76\u9000\u51FA_\u6309\u94AE"));
    keepBtn.onClick(async () => {
      await this.saveState();
      overlay.remove();
      this.close();
    });
    const cancelBtn = new import_obsidian10.ButtonComponent(actions);
    cancelBtn.setButtonText(this.t("\u6392\u67E5_\u7EE7\u7EED\u6392\u67E5_\u6309\u94AE"));
    cancelBtn.onClick(() => overlay.remove());
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });
  }
};

// src/github-install.ts
var import_obsidian11 = require("obsidian");
var API_BASE = "https://api.github.com";
var buildHeaders = (token) => {
  const headers = {
    Accept: "application/vnd.github+json"
  };
  if (token)
    headers.Authorization = `Bearer ${token}`;
  return headers;
};
var sanitizeRepo = (input) => {
  let repo = (input || "").trim();
  repo = repo.replace(/^https?:\/\/github.com\//i, "");
  repo = repo.replace(/^git@github.com:/i, "");
  repo = repo.replace(/\.git$/i, "");
  repo = repo.replace(/\/$/, "");
  const parts = repo.split("/");
  if (parts.length >= 2)
    repo = `${parts[0]}/${parts[1]}`;
  return repo;
};
var enrichError = (res, msg) => {
  var _a, _b;
  const err = new Error(msg || `GitHub request failed: ${res == null ? void 0 : res.status}`);
  err.status = res == null ? void 0 : res.status;
  err.rateRemaining = (_a = res == null ? void 0 : res.headers) == null ? void 0 : _a["x-ratelimit-remaining"];
  err.rateReset = (_b = res == null ? void 0 : res.headers) == null ? void 0 : _b["x-ratelimit-reset"];
  return err;
};
var fetchJson = async (url, token) => {
  const res = await (0, import_obsidian11.requestUrl)({ url, headers: buildHeaders(token) });
  if (res.status >= 400)
    throw enrichError(res);
  return res.json;
};
var fetchText = async (url, token) => {
  const res = await (0, import_obsidian11.requestUrl)({ url, headers: buildHeaders(token) });
  if (res.status >= 400)
    throw enrichError(res);
  return res.text;
};
var getRelease = async (repo, version, token) => {
  const url = version && version.trim() !== "" ? `${API_BASE}/repos/${repo}/releases/tags/${version}` : `${API_BASE}/repos/${repo}/releases/latest`;
  return await fetchJson(url, token);
};
var pickAsset = (release, name) => {
  var _a, _b, _c;
  return (_c = (_b = (_a = release.assets) == null ? void 0 : _a.find((a) => a.name === name)) == null ? void 0 : _b.browser_download_url) != null ? _c : null;
};
var fetchRawFromTag = async (repo, tag, file, token) => {
  const candidates = [
    `https://raw.githubusercontent.com/${repo}/${tag}/${file}`,
    `https://raw.githubusercontent.com/${repo}/v${tag}/${file}`
  ];
  for (const url of candidates) {
    try {
      return await fetchText(url, token);
    } catch (e) {
    }
  }
  throw new Error(`raw file missing: ${file}`);
};
var fetchReleaseVersions = async (manager, repoInput) => {
  var _a;
  const repo = sanitizeRepo(repoInput);
  const token = ((_a = manager.settings.GITHUB_TOKEN) == null ? void 0 : _a.trim()) || void 0;
  const url = `${API_BASE}/repos/${repo}/releases?per_page=50`;
  const releases = await fetchJson(url, token);
  if (!Array.isArray(releases))
    return [];
  return releases.map((r) => ({
    version: r.tag_name || "",
    prerelease: Boolean(r.prerelease)
  })).filter((r) => r.version);
};
var installPluginFromGithub = async (manager, repoInput, version, markAsBpm = true) => {
  var _a, _b;
  try {
    const repo = sanitizeRepo(repoInput);
    const token = ((_a = manager.settings.GITHUB_TOKEN) == null ? void 0 : _a.trim()) || void 0;
    const release = await getRelease(repo, version, token);
    const tag = release.tag_name || version || "";
    if (manager.settings.DEBUG)
      console.log("[BPM] install from GitHub", { repo, version, tag });
    const manifestUrl = pickAsset(release, "manifest.json");
    const mainJsUrl = pickAsset(release, "main.js");
    let manifestText = null;
    let mainJs = null;
    let styles = null;
    try {
      if (manifestUrl)
        manifestText = await fetchText(manifestUrl, token);
      if (mainJsUrl)
        mainJs = await fetchText(mainJsUrl, token);
      const stylesUrl = pickAsset(release, "styles.css");
      if (stylesUrl)
        styles = await fetchText(stylesUrl, token);
      if (manager.settings.DEBUG)
        console.log("[BPM] release assets picked", { manifestUrl: !!manifestUrl, mainJsUrl: !!mainJsUrl, styles: !!styles });
    } catch (e) {
      if (manager.settings.DEBUG)
        console.log("[BPM] release asset fetch failed, will fallback", e);
    }
    if (!manifestText || !mainJs) {
      if (!tag)
        throw new Error("\u672A\u627E\u5230\u53D1\u5E03 tag\uFF0C\u65E0\u6CD5\u4E0B\u8F7D\u539F\u59CB\u6587\u4EF6");
      try {
        manifestText = await fetchRawFromTag(repo, tag, "manifest.json", token);
        mainJs = await fetchRawFromTag(repo, tag, "main.js", token);
        try {
          styles = await fetchRawFromTag(repo, tag, "styles.css", token);
        } catch (e) {
        }
        if (manager.settings.DEBUG)
          console.log("[BPM] fallback to raw tag", { repo, tag, manifest: !!manifestText, main: !!mainJs, styles: !!styles });
      } catch (e) {
        console.error("fallback to raw tag failed", e);
      }
    }
    if (!manifestText || !mainJs) {
      new import_obsidian11.Notice("\u672A\u627E\u5230 manifest.json \u6216 main.js\uFF0C\u8BF7\u68C0\u67E5\u53D1\u5E03\u8D44\u4EA7\u6216\u4ED3\u5E93 tag\u3002");
      return false;
    }
    const manifest = JSON.parse(manifestText);
    if (!(manifest == null ? void 0 : manifest.id)) {
      new import_obsidian11.Notice("manifest.json \u7F3A\u5C11 id \u5B57\u6BB5\uFF0C\u65E0\u6CD5\u5B89\u88C5\u3002");
      return false;
    }
    if (manager.settings.DEBUG)
      console.log("[BPM] manifest parsed", { id: manifest.id, version: manifest.version });
    const adapter = manager.app.vault.adapter;
    const pluginDir = (0, import_obsidian11.normalizePath)(`${manager.app.vault.configDir}/plugins/${manifest.id}`);
    const pluginPath = `${pluginDir}/`;
    if (!await adapter.exists(pluginDir))
      await adapter.mkdir(pluginDir);
    if (manager.settings.DEBUG)
      console.log("[BPM] writing files", { pluginDir, manifestSize: manifestText.length, mainSize: mainJs.length, stylesSize: styles == null ? void 0 : styles.length });
    await adapter.write(`${pluginPath}manifest.json`, manifestText);
    await adapter.write(`${pluginPath}main.js`, mainJs);
    if (styles)
      await adapter.write(`${pluginPath}styles.css`, styles);
    try {
      await manager.appPlugins.disablePlugin(manifest.id);
    } catch (e) {
    }
    await manager.appPlugins.enablePluginAndSave(manifest.id);
    if (markAsBpm) {
      if (!manager.settings.BPM_INSTALLED.includes(manifest.id)) {
        manager.settings.BPM_INSTALLED.push(manifest.id);
      }
      const mp = manager.settings.Plugins.find((p) => p.id === manifest.id);
      if (mp && !mp.tags.includes(BPM_TAG_ID))
        mp.tags.push(BPM_TAG_ID);
    }
    await manager.repoResolver.setRepo(manifest.id, repo);
    await manager.appPlugins.loadManifests();
    if (manager.settings.DEBUG) {
      const loaded = (_b = manager.appPlugins.manifests) == null ? void 0 : _b[manifest.id];
      console.log("[BPM] manifest after reload", { id: manifest.id, loadedVersion: loaded == null ? void 0 : loaded.version, expected: manifest.version });
    }
    manager.synchronizePlugins(Object.values(manager.appPlugins.manifests).filter((pm) => pm.id !== manager.manifest.id));
    manager.saveSettings();
    manager.exportPluginNote(manifest.id);
    if (manager.settings.DEBUG)
      console.log("[BPM] install complete", { id: manifest.id, markAsBpm });
    new import_obsidian11.Notice(`${manager.translator.t("\u5B89\u88C5_\u6210\u529F_\u63D0\u793A")}${manifest.name || manifest.id}`);
    return true;
  } catch (error) {
    const err = error;
    console.error(error);
    if ((err == null ? void 0 : err.status) === 403 && !manager.settings.GITHUB_TOKEN) {
      new import_obsidian11.Notice(manager.translator.t("\u5B89\u88C5_\u9519\u8BEF_\u9650\u901F"));
    } else if ((err == null ? void 0 : err.status) === 404) {
      new import_obsidian11.Notice(manager.translator.t("\u5B89\u88C5_\u9519\u8BEF_\u7F3A\u5C11\u8D44\u6E90"));
    } else {
      new import_obsidian11.Notice(manager.translator.t("\u5B89\u88C5_\u9519\u8BEF_\u901A\u7528"));
    }
    return false;
  }
};
var installThemeFromGithub = async (manager, repoInput, version) => {
  var _a, _b, _c, _d, _e;
  try {
    const repo = sanitizeRepo(repoInput);
    const token = ((_a = manager.settings.GITHUB_TOKEN) == null ? void 0 : _a.trim()) || void 0;
    const release = await getRelease(repo, version, token);
    const manifestUrl = pickAsset(release, "manifest.json");
    const themeUrl = (_c = (_b = pickAsset(release, "theme.css")) != null ? _b : pickAsset(release, "themes.css")) != null ? _c : pickAsset(release, "theme-beta.css");
    if (!manifestUrl || !themeUrl) {
      new import_obsidian11.Notice("\u672A\u627E\u5230 manifest.json \u6216 theme.css \u8D44\u6E90\u3002");
      return false;
    }
    const manifestText = await fetchText(manifestUrl, token);
    const manifest = JSON.parse(manifestText);
    if (!(manifest == null ? void 0 : manifest.name)) {
      new import_obsidian11.Notice("\u4E3B\u9898 manifest \u7F3A\u5C11 name \u5B57\u6BB5\u3002");
      return false;
    }
    const themeCss = await fetchText(themeUrl, token);
    const adapter = manager.app.vault.adapter;
    const themeDir = (0, import_obsidian11.normalizePath)(`${manager.app.vault.configDir}/themes/${manifest.name}`);
    const themePath = `${themeDir}/`;
    if (!await adapter.exists(themeDir))
      await adapter.mkdir(themeDir);
    await adapter.write(`${themePath}theme.css`, themeCss);
    await adapter.write(`${themePath}manifest.json`, manifestText);
    (_e = (_d = manager.app.customCss) == null ? void 0 : _d.setTheme) == null ? void 0 : _e.call(_d, manifest.name);
    new import_obsidian11.Notice(`\u5DF2\u5B89\u88C5/\u66F4\u65B0\u4E3B\u9898\uFF1A${manifest.name}`);
    return true;
  } catch (error) {
    console.error(error);
    new import_obsidian11.Notice("\u4E3B\u9898\u5B89\u88C5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u4ED3\u5E93\u5730\u5740/\u7248\u672C\u6216\u7F51\u7EDC\u72B6\u6001\u3002");
    return false;
  }
};

// src/modal/manager-modal.ts
var import_obsidian14 = require("obsidian");

// src/modal/update-modal.ts
var import_obsidian12 = require("obsidian");
var UpdateModal = class extends import_obsidian12.Modal {
  constructor(app, manager, pluginId, versions, defaultVersion, repo) {
    super(app);
    this.manager = manager;
    this.pluginId = pluginId;
    this.versions = versions;
    this.defaultVersion = defaultVersion;
    this.repo = repo;
  }
  async onOpen() {
    var _a, _b;
    const { contentEl } = this;
    const t = (k) => this.manager.translator.t(k);
    contentEl.empty();
    const title = contentEl.createEl("h3", { text: t("\u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6807\u9898") });
    title.style.marginBottom = "8px";
    let versionList = [...this.versions];
    if (versionList.length === 0 && this.repo) {
      const loading = contentEl.createDiv();
      loading.setText(t("\u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u4E2D"));
      try {
        versionList = await fetchReleaseVersions(this.manager, this.repo);
      } catch (e) {
        console.error("fetch versions in modal failed", e);
        new import_obsidian12.Notice(t("\u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u5931\u8D25\u63D0\u793A"), 4e3);
      } finally {
        loading.remove();
      }
      this.versions = versionList;
    }
    let selected = this.defaultVersion || ((_b = (_a = versionList[0]) == null ? void 0 : _a.version) != null ? _b : "");
    if (versionList.length > 0) {
      new import_obsidian12.Setting(contentEl).setName(t("\u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u7248\u672C_\u6807\u9898")).addDropdown((dd) => {
        versionList.forEach((v) => {
          dd.addOption(v.version, `${v.version}${v.prerelease ? " (pre)" : ""}`);
        });
        dd.setValue(selected);
        dd.onChange((v) => {
          selected = v;
        });
      });
    } else {
      const info = contentEl.createDiv();
      info.setText(t("\u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u65E0\u7248\u672C\u63D0\u793A"));
    }
    new import_obsidian12.Setting(contentEl).addButton((btn) => {
      btn.setButtonText(t("\u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u4E0B\u8F7D\u6309\u94AE"));
      btn.setCta();
      btn.onClick(async () => {
        btn.setDisabled(true);
        try {
          const ok = await this.manager.downloadUpdate(this.pluginId, selected);
          if (ok) {
            new import_obsidian12.Notice(t("\u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6210\u529F\u63D0\u793A"), 3e3);
            this.close();
          }
        } finally {
          btn.setDisabled(false);
        }
      });
    }).addButton((btn) => {
      btn.setButtonText(t("\u901A\u7528_\u53D6\u6D88_\u6587\u672C"));
      btn.onClick(() => this.close());
    });
  }
};

// src/modal/manager-modal.ts
var ManagerModal = class extends import_obsidian13.Modal {
  constructor(app, manager) {
    super(app);
    // [本地][变量] 展示插件列表
    this.displayPlugins = [];
    this.allPlugins = [];
    // 过滤器
    this.filter = "";
    // 分组内容
    this.group = "";
    // 标签内容
    this.tag = "";
    // 标签内容
    this.delay = "";
    // 搜索内容
    this.searchText = "";
    // 安装模式
    this.installMode = false;
    this.installType = "plugin";
    this.installRepo = "";
    this.installVersion = "";
    this.installVersions = [];
    this.actionCollapsed = false;
    this.filterCollapsed = false;
    this.reloadingManifests = false;
    this.mobileFiltersCollapsed = true;
    // 编辑模式
    this.editorMode = false;
    // 测试模式
    this.developerMode = false;
    this.appSetting = this.app.setting;
    this.appPlugins = this.app.plugins;
    this.manager = manager;
    this.settings = manager.settings;
    this.basePath = (0, import_obsidian14.normalizePath)(`${this.app.vault.configDir}`);
    manager.synchronizePlugins(
      Object.values(this.appPlugins.manifests).filter(
        (pm) => pm.id !== manager.manifest.id
      )
    );
  }
  showInlineProgress(text, subText) {
    const notice = new import_obsidian13.Notice("", 0);
    notice.noticeEl.empty();
    const wrap = document.createElement("div");
    wrap.addClass("bpm-update-progress");
    const title = document.createElement("div");
    title.setText(text);
    const sub = document.createElement("div");
    sub.addClass("bpm-update-progress__sub");
    if (subText)
      sub.setText(subText);
    const bar = document.createElement("div");
    bar.addClass("bpm-progress");
    const fill = document.createElement("div");
    fill.addClass("bpm-progress__bar");
    fill.style.width = "0%";
    bar.appendChild(fill);
    wrap.appendChild(title);
    wrap.appendChild(sub);
    wrap.appendChild(bar);
    notice.noticeEl.appendChild(wrap);
    return {
      update: (processed, total = 1, current) => {
        const ratio = total > 0 ? Math.min(1, processed / total) : 0;
        fill.style.width = `${ratio * 100}%`;
        sub.setText(`${processed}/${total}${current ? ` \xB7 ${current}` : ""}`);
      },
      hide: () => notice.hide()
    };
  }
  async getActivePlugins() {
    const originPlugins = this.app.plugins.plugins;
    console.log(await this.processPlugins(originPlugins));
    return await this.processPlugins(originPlugins);
  }
  async processPlugins(originPlugins) {
    var _a;
    let plugins = {};
    for (let name in originPlugins) {
      try {
        let plugin = { ...originPlugins[name] };
        plugin.manifest = { ...originPlugins[name].manifest };
        plugin.manifest["pluginUrl"] = `https://obsidian.md/plugins?id=${plugin.manifest.id}`;
        plugin.manifest["author2"] = (_a = plugin.manifest.author) == null ? void 0 : _a.replace(/<.*?@.*?\..*?>/g, "").trim();
        plugin.manifest["installLink"] = `obsidian://BPM-install?id=${plugin.manifest.id}&enable=true`;
        plugins[name] = plugin;
      } catch (e) {
        console.error(name, e);
        console.log(originPlugins[name]);
        console.log(originPlugins[name].manifest);
        console.log(typeof originPlugins[name].manifest);
      }
    }
    return plugins;
  }
  async showHead() {
    var _a;
    const modalEl = this.contentEl.parentElement;
    this.modalContainer = modalEl;
    modalEl.addClass("manager-container");
    if (import_obsidian13.Platform.isMobileApp)
      modalEl.addClass("manager-container--mobile");
    if (!this.settings.CENTER && !import_obsidian13.Platform.isMobileApp)
      modalEl.addClass("manager-container__top");
    if (this.editorMode)
      modalEl.addClass("manager-container--editing");
    modalEl.removeChild(modalEl.getElementsByClassName("modal-close-button")[0]);
    (_a = this.titleEl.parentElement) == null ? void 0 : _a.addClass("manager-container__header");
    this.contentEl.addClass("manager-item-container");
    this.footEl = document.createElement("div");
    this.footEl.addClass("manager-food");
    this.modalEl.appendChild(this.footEl);
    if (import_obsidian13.Platform.isMobileApp) {
      this.showHeadMobile();
      return;
    }
    const actionWrapper = this.titleEl.createDiv("manager-section manager-section--actions");
    const actionContent = actionWrapper.createDiv("manager-section__content");
    actionContent.addClass("manager-section__content--actions");
    const bindLongPressTooltip = (btn, text) => {
      let timer;
      const show = () => {
        new import_obsidian13.Notice(text, 1500);
      };
      btn.buttonEl.addEventListener("touchstart", () => {
        timer = window.setTimeout(show, 500);
      });
      const clear = () => {
        if (timer)
          window.clearTimeout(timer);
        timer = void 0;
      };
      btn.buttonEl.addEventListener("touchend", clear);
      btn.buttonEl.addEventListener("touchcancel", clear);
    };
    const actionBar = new import_obsidian13.Setting(actionContent).setClass("manager-bar__action").setName("");
    const githubButton = new import_obsidian13.ButtonComponent(actionBar.controlEl);
    githubButton.setIcon("github");
    githubButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0"));
    this.bindLongPressTooltip(githubButton.buttonEl, this.manager.translator.t("\u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0"));
    githubButton.onClick(() => {
      window.open("https://github.com/zenozero-dev/obsidian-manager");
    });
    const tutorialButton = new import_obsidian13.ButtonComponent(actionBar.controlEl);
    tutorialButton.setIcon("book-open");
    tutorialButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0"));
    this.bindLongPressTooltip(tutorialButton.buttonEl, this.manager.translator.t("\u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0"));
    tutorialButton.onClick(() => {
      window.open("https://www.bilibili.com/video/BV1WyrkYMEce/");
    });
    const updateButton = new import_obsidian13.ButtonComponent(actionBar.controlEl);
    updateButton.setIcon("rss");
    updateButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0"));
    this.bindLongPressTooltip(updateButton.buttonEl, this.manager.translator.t("\u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0"));
    updateButton.onClick(async () => {
      updateButton.setDisabled(true);
      try {
        await this.manager.checkUpdatesWithNotice();
        const count = Object.values(this.manager.updateStatus || {}).filter((s) => s.hasUpdate).length;
        new import_obsidian13.Notice(`\u68C0\u67E5\u5B8C\u6210\uFF0C\u53D1\u73B0 ${count} \u4E2A\u63D2\u4EF6\u6709\u53EF\u7528\u66F4\u65B0`);
        this.reloadShowData();
      } catch (error) {
        console.error("\u68C0\u67E5\u66F4\u65B0\u65F6\u51FA\u9519:", error);
        new import_obsidian13.Notice("\u68C0\u67E5\u66F4\u65B0\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
      } finally {
        updateButton.setDisabled(false);
      }
    });
    const hideButton = new import_obsidian13.ButtonComponent(actionBar.controlEl);
    hideButton.setIcon("eye-off");
    const hideTooltip = this.manager.translator.t("\u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898");
    hideButton.setTooltip(hideTooltip);
    this.bindLongPressTooltip(hideButton.buttonEl, hideTooltip);
    hideButton.onClick(async () => {
      const all = Object.values(this.appPlugins.manifests);
      const plugins = all.filter((pm) => pm.id !== this.manager.manifest.id);
      plugins.sort((item1, item2) => {
        return item1.name.localeCompare(item2.name);
      });
      new HideModal(this.app, this.manager, this, plugins).open();
    });
    const reloadButton = new import_obsidian13.ButtonComponent(actionBar.controlEl);
    reloadButton.setIcon("refresh-ccw");
    reloadButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0"));
    this.bindLongPressTooltip(reloadButton.buttonEl, this.manager.translator.t("\u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0"));
    reloadButton.onClick(async () => {
      if (this.reloadingManifests)
        return;
      this.reloadingManifests = true;
      reloadButton.setDisabled(true);
      const notice = new import_obsidian13.Notice(this.manager.translator.t("\u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5F00\u59CB\u63D0\u793A"), 0);
      await new Promise((r) => window.setTimeout(r, 50));
      try {
        await this.appPlugins.loadManifests();
        await this.reloadShowData();
      } catch (e) {
        console.error("[BPM] reload manifests failed", e);
        new import_obsidian13.Notice(this.manager.translator.t("\u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5931\u8D25\u63D0\u793A"), 4e3);
      } finally {
        notice.hide();
        reloadButton.setDisabled(false);
        this.reloadingManifests = false;
      }
    });
    const disableButton = new import_obsidian13.ButtonComponent(actionBar.controlEl);
    disableButton.setIcon("square");
    disableButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0"));
    this.bindLongPressTooltip(disableButton.buttonEl, this.manager.translator.t("\u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0"));
    disableButton.onClick(async () => {
      new DisableModal(this.app, this.manager, async () => {
        for (const plugin of this.displayPlugins) {
          if (plugin.id === this.manager.manifest.id)
            continue;
          if (this.settings.DELAY) {
            const ManagerPlugin = this.settings.Plugins.find((p) => p.id === plugin.id);
            if (ManagerPlugin && ManagerPlugin.enabled) {
              await this.appPlugins.disablePlugin(plugin.id);
              ManagerPlugin.enabled = false;
              await this.manager.savePluginAndExport(plugin.id);
              this.reloadShowData();
            }
          } else {
            if (this.appPlugins.enabledPlugins.has(plugin.id)) {
              const ManagerPlugin = this.settings.Plugins.find((p) => p.id === plugin.id);
              if (ManagerPlugin)
                ManagerPlugin.enabled = false;
              await this.appPlugins.disablePluginAndSave(plugin.id);
              await this.manager.savePluginAndExport(plugin.id);
              this.reloadShowData();
            }
          }
          command_default(this.app, this.manager);
        }
      }).open();
    });
    const enableButton = new import_obsidian13.ButtonComponent(actionBar.controlEl);
    enableButton.setIcon("square-check");
    enableButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0"));
    this.bindLongPressTooltip(enableButton.buttonEl, this.manager.translator.t("\u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0"));
    enableButton.onClick(async () => {
      new DisableModal(this.app, this.manager, async () => {
        for (const plugin of this.displayPlugins) {
          if (plugin.id === this.manager.manifest.id)
            continue;
          if (this.settings.DELAY) {
            const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
            if (ManagerPlugin && !ManagerPlugin.enabled) {
              await this.appPlugins.enablePlugin(plugin.id);
              ManagerPlugin.enabled = true;
              await this.manager.savePluginAndExport(plugin.id);
              this.reloadShowData();
            }
          } else {
            if (!this.appPlugins.enabledPlugins.has(plugin.id)) {
              const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
              if (ManagerPlugin)
                ManagerPlugin.enabled = true;
              await this.appPlugins.enablePluginAndSave(plugin.id);
              await this.manager.savePluginAndExport(plugin.id);
              this.reloadShowData();
            }
          }
          command_default(this.app, this.manager);
        }
      }).open();
    });
    const troubleshootButton = new import_obsidian13.ButtonComponent(actionBar.controlEl);
    troubleshootButton.setIcon("search");
    troubleshootButton.setTooltip(this.manager.translator.t("\u6392\u67E5_\u6309\u94AE_\u63CF\u8FF0"));
    this.bindLongPressTooltip(troubleshootButton.buttonEl, this.manager.translator.t("\u6392\u67E5_\u6309\u94AE_\u63CF\u8FF0"));
    troubleshootButton.onClick(() => {
      new TroubleshootModal(this.app, this.manager).open();
    });
    const editorButton = new import_obsidian13.ButtonComponent(actionBar.controlEl);
    this.editorMode ? editorButton.setIcon("pen-off") : editorButton.setIcon("pen");
    editorButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0"));
    this.bindLongPressTooltip(editorButton.buttonEl, this.manager.translator.t("\u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0"));
    editorButton.onClick(async () => {
      this.editorMode = !this.editorMode;
      this.editorMode ? editorButton.setIcon("pen-off") : editorButton.setIcon("pen");
      this.applyEditingStyle();
      if (!this.editorMode) {
        await this.refreshFilterOptions(true);
      } else {
        this.renderContent();
      }
    });
    const settingsButton = new import_obsidian13.ButtonComponent(actionBar.controlEl);
    settingsButton.setIcon("settings");
    settingsButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0"));
    this.bindLongPressTooltip(settingsButton.buttonEl, this.manager.translator.t("\u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0"));
    settingsButton.onClick(() => {
      this.appSetting.open();
      this.appSetting.openTabById(this.manager.manifest.id);
    });
    const installToggle = new import_obsidian13.ButtonComponent(actionBar.controlEl);
    installToggle.setIcon("download");
    const installTooltip = this.manager.translator.t("\u7BA1\u7406\u5668_\u5B89\u88C5_GITHUB_\u63CF\u8FF0");
    installToggle.setTooltip(installTooltip);
    this.bindLongPressTooltip(installToggle.buttonEl, installTooltip);
    installToggle.onClick(() => {
      this.installMode = !this.installMode;
      installToggle.setIcon(this.installMode ? "arrow-left" : "download");
      if (this.searchBarEl) {
        this.installMode ? this.searchBarEl.addClass("manager-display-none") : this.searchBarEl.removeClass("manager-display-none");
      }
      this.renderContent();
    });
    if (this.developerMode) {
      const testButton = new import_obsidian13.ButtonComponent(actionBar.controlEl);
      testButton.setIcon("refresh-ccw");
      testButton.setTooltip("\u5237\u65B0\u63D2\u4EF6");
      testButton.onClick(async () => {
        this.close();
        await this.appPlugins.disablePlugin(this.manager.manifest.id);
        await this.appPlugins.enablePlugin(this.manager.manifest.id);
      });
    }
    if (this.developerMode) {
      const testButton = new import_obsidian13.ButtonComponent(actionBar.controlEl);
      testButton.setIcon("test-tube");
      testButton.setTooltip("\u6D4B\u8BD5\u63D2\u4EF6");
      testButton.onClick(async () => {
      });
    }
    const filterWrapper = this.titleEl.createDiv("manager-section manager-section--filters");
    const filterContent = filterWrapper.createDiv("manager-section__content");
    filterContent.addClass("manager-section__content--filters");
    const searchBar = new import_obsidian13.Setting(filterContent).setClass("manager-bar__search").setName("");
    this.searchBarEl = searchBar.settingEl;
    const filterOptions = {
      "all": this.manager.translator.t("\u7B5B\u9009_\u72B6\u6001_\u5168\u90E8"),
      "enabled": this.manager.translator.t("\u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0"),
      "disabled": this.manager.translator.t("\u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0"),
      "grouped": this.manager.translator.t("\u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0"),
      "ungrouped": this.manager.translator.t("\u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0"),
      "tagged": this.manager.translator.t("\u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0"),
      "untagged": this.manager.translator.t("\u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0"),
      "noted": this.manager.translator.t("\u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0")
    };
    const filterDropdown = new import_obsidian13.DropdownComponent(searchBar.controlEl);
    filterDropdown.addOptions(filterOptions);
    filterDropdown.setValue(this.filter || "all");
    filterDropdown.onChange((value) => {
      this.filter = value;
      this.reloadShowData();
    });
    const groupCounts = this.settings.Plugins.reduce((acc, plugin) => {
      const groupId = plugin.group || "";
      acc[groupId] = (acc[groupId] || 0) + 1;
      return acc;
    }, { "": 0 });
    const groups = this.settings.GROUPS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${groupCounts[item.id] || 0}]`;
      return acc;
    }, { "": this.manager.translator.t("\u7B5B\u9009_\u5206\u7EC4_\u5168\u90E8") });
    this.groupDropdown = new import_obsidian13.DropdownComponent(searchBar.controlEl);
    this.groupDropdown.addOptions(groups);
    this.groupDropdown.setValue(this.settings.PERSISTENCE ? this.settings.FILTER_GROUP : this.group);
    this.groupDropdown.onChange((value) => {
      if (this.settings.PERSISTENCE) {
        this.settings.FILTER_GROUP = value;
        this.manager.saveSettings();
      } else {
        this.group = value;
      }
      this.reloadShowData();
    });
    const tagCounts = this.settings.Plugins.reduce((acc, plugin) => {
      plugin.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    const tags = this.settings.TAGS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${tagCounts[item.id] || 0}]`;
      return acc;
    }, { "": this.manager.translator.t("\u7B5B\u9009_\u6807\u7B7E_\u5168\u90E8") });
    this.tagDropdown = new import_obsidian13.DropdownComponent(searchBar.controlEl);
    this.tagDropdown.addOptions(tags);
    this.tagDropdown.setValue(this.settings.PERSISTENCE ? this.settings.FILTER_TAG : this.tag);
    this.tagDropdown.onChange((value) => {
      if (this.settings.PERSISTENCE) {
        this.settings.FILTER_TAG = value;
        this.manager.saveSettings();
      } else {
        this.tag = value;
      }
      this.reloadShowData();
    });
    if (this.settings.DELAY) {
      const delayCounts = this.settings.Plugins.reduce((acc, plugin) => {
        const delay = plugin.delay || "";
        acc[delay] = (acc[delay] || 0) + 1;
        return acc;
      }, { "": 0 });
      const delays = this.settings.DELAYS.reduce((acc, item) => {
        acc[item.id] = `${item.name} (${item.time}s) [${delayCounts[item.id] || 0}]`;
        return acc;
      }, { "": this.manager.translator.t("\u7B5B\u9009_\u5EF6\u8FDF_\u5168\u90E8") });
      this.delayDropdown = new import_obsidian13.DropdownComponent(searchBar.controlEl);
      this.delayDropdown.addOptions(delays);
      this.delayDropdown.setValue(this.settings.PERSISTENCE ? this.settings.FILTER_DELAY : this.delay);
      this.delayDropdown.onChange((value) => {
        if (this.settings.PERSISTENCE) {
          this.settings.FILTER_DELAY = value;
          this.manager.saveSettings();
        } else {
          this.delay = value;
        }
        this.reloadShowData();
      });
    }
    this.searchEl = new import_obsidian13.SearchComponent(searchBar.controlEl);
    if (this.settings.PERSISTENCE && typeof this.settings.FILTER_SEARCH === "string") {
      this.searchText = this.settings.FILTER_SEARCH;
      this.searchEl.inputEl.value = this.searchText;
    }
    this.searchEl.onChange((value) => {
      this.searchText = value;
      if (this.settings.PERSISTENCE) {
        this.settings.FILTER_SEARCH = value;
        this.manager.saveSettings();
      }
      this.reloadShowData();
    });
  }
  showHeadMobile() {
    const t = (k) => this.manager.translator.t(k);
    this.titleEl.empty();
    const header = this.titleEl.createDiv("bpm-mobile-header");
    const topRow = header.createDiv("bpm-mobile-header__top");
    const topActions = topRow.createDiv("bpm-mobile-header__actions");
    const editorBtn = new import_obsidian13.ButtonComponent(topActions);
    editorBtn.setIcon(this.editorMode ? "pen-off" : "pen");
    editorBtn.setTooltip(t("\u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0"));
    this.bindLongPressTooltip(editorBtn.buttonEl, t("\u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0"));
    editorBtn.onClick(async () => {
      this.editorMode = !this.editorMode;
      this.applyEditingStyle();
      if (!this.editorMode) {
        await this.refreshFilterOptions(true);
      } else {
        this.renderContent();
      }
      this.showHeadMobile();
    });
    const installBtn = new import_obsidian13.ButtonComponent(topActions);
    installBtn.setIcon(this.installMode ? "arrow-left" : "download");
    installBtn.setTooltip(this.installMode ? t("\u901A\u7528_\u8FD4\u56DE_\u6587\u672C") : t("\u7BA1\u7406\u5668_\u5B89\u88C5_GITHUB_\u63CF\u8FF0"));
    this.bindLongPressTooltip(installBtn.buttonEl, this.installMode ? t("\u901A\u7528_\u8FD4\u56DE_\u6587\u672C") : t("\u7BA1\u7406\u5668_\u5B89\u88C5_GITHUB_\u63CF\u8FF0"));
    installBtn.onClick(() => {
      this.installMode = !this.installMode;
      if (this.searchBarEl) {
        this.installMode ? this.searchBarEl.addClass("manager-display-none") : this.searchBarEl.removeClass("manager-display-none");
      }
      this.renderContent();
      this.showHeadMobile();
    });
    const updateBtn = new import_obsidian13.ButtonComponent(topActions);
    updateBtn.setIcon("rss");
    updateBtn.setTooltip(t("\u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0"));
    this.bindLongPressTooltip(updateBtn.buttonEl, t("\u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0"));
    updateBtn.onClick(async () => {
      await this.manager.checkUpdatesWithNotice();
      await this.reloadShowData();
    });
    const moreBtn = new import_obsidian13.ButtonComponent(topActions);
    moreBtn.setIcon("more-vertical");
    moreBtn.setTooltip(t("\u7BA1\u7406\u5668_\u66F4\u591A\u64CD\u4F5C_\u63CF\u8FF0"));
    this.bindLongPressTooltip(moreBtn.buttonEl, t("\u7BA1\u7406\u5668_\u66F4\u591A\u64CD\u4F5C_\u63CF\u8FF0"));
    moreBtn.buttonEl.addEventListener("click", (ev) => {
      const menu = new import_obsidian13.Menu();
      menu.addItem((item) => item.setTitle(t("\u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0")).setIcon("square").onClick(async () => {
        new DisableModal(this.app, this.manager, async () => {
          for (const plugin of this.displayPlugins) {
            if (plugin.id === this.manager.manifest.id)
              continue;
            if (this.settings.DELAY) {
              const ManagerPlugin = this.settings.Plugins.find((p) => p.id === plugin.id);
              if (ManagerPlugin && ManagerPlugin.enabled) {
                await this.appPlugins.disablePlugin(plugin.id);
                ManagerPlugin.enabled = false;
                await this.manager.savePluginAndExport(plugin.id);
              }
            } else {
              if (this.appPlugins.enabledPlugins.has(plugin.id)) {
                const ManagerPlugin = this.settings.Plugins.find((p) => p.id === plugin.id);
                if (ManagerPlugin)
                  ManagerPlugin.enabled = false;
                await this.appPlugins.disablePluginAndSave(plugin.id);
                await this.manager.savePluginAndExport(plugin.id);
              }
            }
            command_default(this.app, this.manager);
          }
          this.reloadShowData();
        }).open();
      }));
      menu.addItem((item) => item.setTitle(t("\u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0")).setIcon("square-check").onClick(async () => {
        new DisableModal(this.app, this.manager, async () => {
          for (const plugin of this.displayPlugins) {
            if (plugin.id === this.manager.manifest.id)
              continue;
            if (this.settings.DELAY) {
              const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
              if (ManagerPlugin && !ManagerPlugin.enabled) {
                await this.appPlugins.enablePlugin(plugin.id);
                ManagerPlugin.enabled = true;
                await this.manager.savePluginAndExport(plugin.id);
              }
            } else {
              if (!this.appPlugins.enabledPlugins.has(plugin.id)) {
                const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
                if (ManagerPlugin)
                  ManagerPlugin.enabled = true;
                await this.appPlugins.enablePluginAndSave(plugin.id);
                await this.manager.savePluginAndExport(plugin.id);
              }
            }
            command_default(this.app, this.manager);
          }
          this.reloadShowData();
        }).open();
      }));
      menu.addSeparator();
      menu.addItem((item) => item.setTitle(t("\u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0")).setIcon("refresh-ccw").onClick(async () => {
        await this.appPlugins.loadManifests();
        await this.reloadShowData();
      }));
      menu.addItem((item) => item.setTitle(t("\u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898")).setIcon("eye-off").onClick(async () => {
        const all = Object.values(this.appPlugins.manifests);
        const plugins = all.filter((pm) => pm.id !== this.manager.manifest.id);
        plugins.sort((item1, item2) => item1.name.localeCompare(item2.name));
        new HideModal(this.app, this.manager, this, plugins).open();
      }));
      menu.addSeparator();
      menu.addItem((item) => item.setTitle(t("\u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0")).setIcon("settings").onClick(() => {
        this.appSetting.open();
        this.appSetting.openTabById(this.manager.manifest.id);
      }));
      menu.addItem((item) => item.setTitle(t("\u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0")).setIcon("github").onClick(() => {
        window.open("https://github.com/zenozero-dev/obsidian-manager");
      }));
      menu.addItem((item) => item.setTitle(t("\u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0")).setIcon("book-open").onClick(() => {
        window.open("https://www.bilibili.com/video/BV1WyrkYMEce/");
      }));
      menu.showAtMouseEvent(ev);
    });
    const searchWrap = header.createDiv("bpm-mobile-header__search");
    this.searchEl = new import_obsidian13.SearchComponent(searchWrap);
    if (this.settings.PERSISTENCE && typeof this.settings.FILTER_SEARCH === "string") {
      this.searchText = this.settings.FILTER_SEARCH;
      this.searchEl.inputEl.value = this.searchText;
    }
    this.searchEl.onChange((value) => {
      this.searchText = value;
      if (this.settings.PERSISTENCE) {
        this.settings.FILTER_SEARCH = value;
        this.manager.saveSettings();
      }
      this.reloadShowData();
    });
    const filterHeader = header.createDiv("bpm-mobile-header__filters-toggle");
    const arrow = filterHeader.createSpan({ cls: "bpm-mobile-header__filters-arrow" });
    arrow.setText(this.mobileFiltersCollapsed ? "\u25BC" : "\u25B2");
    filterHeader.createSpan({ text: t("\u901A\u7528_\u8FC7\u6EE4_\u6587\u672C") });
    filterHeader.toggleClass("is-open", !this.mobileFiltersCollapsed);
    filterHeader.addEventListener("click", () => {
      this.mobileFiltersCollapsed = !this.mobileFiltersCollapsed;
      filterPanel.toggleClass("is-collapsed", this.mobileFiltersCollapsed);
      filterHeader.toggleClass("is-open", !this.mobileFiltersCollapsed);
      arrow.setText(this.mobileFiltersCollapsed ? "\u25BC" : "\u25B2");
    });
    const activeFiltersContainer = header.createDiv("bpm-active-filters");
    const updateActiveFilters = () => {
      activeFiltersContainer.empty();
      const currentGroup = this.settings.PERSISTENCE ? this.settings.FILTER_GROUP : this.group;
      const currentTag = this.settings.PERSISTENCE ? this.settings.FILTER_TAG : this.tag;
      if (this.filter && this.filter !== "all") {
        const filterLabels = {
          "enabled": t("\u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0"),
          "disabled": t("\u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0"),
          "grouped": t("\u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0"),
          "ungrouped": t("\u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0"),
          "tagged": t("\u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0"),
          "untagged": t("\u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0"),
          "noted": t("\u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0")
        };
        const chip = activeFiltersContainer.createDiv("bpm-active-filter-chip");
        chip.setText(filterLabels[this.filter] || this.filter);
        const closeIcon = chip.createSpan("bpm-active-filter-chip__close");
        (0, import_obsidian13.setIcon)(closeIcon, "x");
        chip.addEventListener("click", () => {
          this.filter = "all";
          this.showHeadMobile();
          this.reloadShowData();
        });
      }
      if (currentGroup) {
        const groupItem = this.settings.GROUPS.find((g) => g.id === currentGroup);
        if (groupItem) {
          const chip = activeFiltersContainer.createDiv("bpm-active-filter-chip");
          chip.setText(groupItem.name);
          const closeIcon = chip.createSpan("bpm-active-filter-chip__close");
          (0, import_obsidian13.setIcon)(closeIcon, "x");
          chip.addEventListener("click", () => {
            if (this.settings.PERSISTENCE) {
              this.settings.FILTER_GROUP = "";
              this.manager.saveSettings();
            } else {
              this.group = "";
            }
            this.showHeadMobile();
            this.reloadShowData();
          });
        }
      }
      if (currentTag) {
        const tagItem = this.settings.TAGS.find((t2) => t2.id === currentTag);
        if (tagItem) {
          const chip = activeFiltersContainer.createDiv("bpm-active-filter-chip");
          chip.setText(tagItem.name);
          const closeIcon = chip.createSpan("bpm-active-filter-chip__close");
          (0, import_obsidian13.setIcon)(closeIcon, "x");
          chip.addEventListener("click", () => {
            if (this.settings.PERSISTENCE) {
              this.settings.FILTER_TAG = "";
              this.manager.saveSettings();
            } else {
              this.tag = "";
            }
            this.showHeadMobile();
            this.reloadShowData();
          });
        }
      }
      if (activeFiltersContainer.childElementCount === 0) {
        activeFiltersContainer.style.display = "none";
      } else {
        activeFiltersContainer.style.display = "flex";
      }
    };
    updateActiveFilters();
    const filterPanel = header.createDiv(`bpm-mobile-header__filters${this.mobileFiltersCollapsed ? " is-collapsed" : ""}`);
    const statusSetting = new import_obsidian13.Setting(filterPanel).setName(t("\u7B5B\u9009_\u72B6\u6001_\u5168\u90E8"));
    statusSetting.addDropdown((dd) => {
      dd.addOptions({
        "all": t("\u7B5B\u9009_\u72B6\u6001_\u5168\u90E8"),
        "enabled": t("\u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0"),
        "disabled": t("\u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0"),
        "grouped": t("\u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0"),
        "ungrouped": t("\u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0"),
        "tagged": t("\u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0"),
        "untagged": t("\u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0"),
        "noted": t("\u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0")
      });
      dd.setValue(this.filter || "all");
      dd.onChange((v) => {
        this.filter = v;
        this.reloadShowData();
      });
    });
    const groupCounts = this.settings.Plugins.reduce((acc, plugin) => {
      const groupId = plugin.group || "";
      acc[groupId] = (acc[groupId] || 0) + 1;
      return acc;
    }, { "": 0 });
    const groups = this.settings.GROUPS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${groupCounts[item.id] || 0}]`;
      return acc;
    }, { "": t("\u7B5B\u9009_\u5206\u7EC4_\u5168\u90E8") });
    const groupSetting = new import_obsidian13.Setting(filterPanel).setName(t("\u7B5B\u9009_\u5206\u7EC4_\u5168\u90E8"));
    groupSetting.addDropdown((dd) => {
      dd.addOptions(groups);
      dd.setValue(this.settings.PERSISTENCE ? this.settings.FILTER_GROUP : this.group);
      dd.onChange((value) => {
        if (this.settings.PERSISTENCE) {
          this.settings.FILTER_GROUP = value;
          this.manager.saveSettings();
        } else {
          this.group = value;
        }
        this.reloadShowData();
      });
    });
    const tagCounts = this.settings.Plugins.reduce((acc, plugin) => {
      plugin.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    const tags = this.settings.TAGS.reduce((acc, item) => {
      acc[item.id] = `${item.name} [${tagCounts[item.id] || 0}]`;
      return acc;
    }, { "": t("\u7B5B\u9009_\u6807\u7B7E_\u5168\u90E8") });
    const tagSetting = new import_obsidian13.Setting(filterPanel).setName(t("\u7B5B\u9009_\u6807\u7B7E_\u5168\u90E8"));
    tagSetting.addDropdown((dd) => {
      dd.addOptions(tags);
      dd.setValue(this.settings.PERSISTENCE ? this.settings.FILTER_TAG : this.tag);
      dd.onChange((value) => {
        if (this.settings.PERSISTENCE) {
          this.settings.FILTER_TAG = value;
          this.manager.saveSettings();
        } else {
          this.tag = value;
        }
        this.reloadShowData();
      });
    });
    if (this.settings.DELAY) {
      const delayCounts = this.settings.Plugins.reduce((acc, plugin) => {
        const delay = plugin.delay || "";
        acc[delay] = (acc[delay] || 0) + 1;
        return acc;
      }, { "": 0 });
      const delays = this.settings.DELAYS.reduce((acc, item) => {
        acc[item.id] = `${item.name} (${delayCounts[item.id] || 0})`;
        return acc;
      }, { "": t("\u7B5B\u9009_\u5EF6\u8FDF_\u5168\u90E8") });
      const delaySetting = new import_obsidian13.Setting(filterPanel).setName(t("\u7B5B\u9009_\u5EF6\u8FDF_\u5168\u90E8"));
      delaySetting.addDropdown((dd) => {
        dd.addOptions(delays);
        dd.setValue(this.settings.PERSISTENCE ? this.settings.FILTER_DELAY : this.delay);
        dd.onChange((value) => {
          if (this.settings.PERSISTENCE) {
            this.settings.FILTER_DELAY = value;
            this.manager.saveSettings();
          } else {
            this.delay = value;
          }
          this.reloadShowData();
        });
      });
    }
  }
  /** 移动端底部操作栏 */
  showMobileFooter() {
    const t = (k) => this.manager.translator.t(k);
    const existingFooter = this.modalEl.querySelector(".bpm-mobile-footer");
    if (existingFooter)
      existingFooter.remove();
    const footer = document.createElement("div");
    footer.addClass("bpm-mobile-footer");
    const createFooterBtn = (icon, label, onClick) => {
      const btn = document.createElement("button");
      btn.addClass("bpm-mobile-footer__btn");
      (0, import_obsidian13.setIcon)(btn, icon);
      const labelEl = document.createElement("span");
      labelEl.addClass("bpm-mobile-footer__btn-label");
      labelEl.setText(label);
      btn.appendChild(labelEl);
      btn.addEventListener("click", onClick);
      this.bindLongPressTooltip(btn, label);
      return btn;
    };
    const disableBtn = createFooterBtn("square", t("\u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0"), async () => {
      new DisableModal(this.app, this.manager, async () => {
        for (const plugin of this.displayPlugins) {
          if (plugin.id === this.manager.manifest.id)
            continue;
          if (this.settings.DELAY) {
            const ManagerPlugin = this.settings.Plugins.find((p) => p.id === plugin.id);
            if (ManagerPlugin && ManagerPlugin.enabled) {
              await this.appPlugins.disablePlugin(plugin.id);
              ManagerPlugin.enabled = false;
              await this.manager.savePluginAndExport(plugin.id);
            }
          } else {
            if (this.appPlugins.enabledPlugins.has(plugin.id)) {
              const ManagerPlugin = this.settings.Plugins.find((p) => p.id === plugin.id);
              if (ManagerPlugin)
                ManagerPlugin.enabled = false;
              await this.appPlugins.disablePluginAndSave(plugin.id);
              await this.manager.savePluginAndExport(plugin.id);
            }
          }
          command_default(this.app, this.manager);
        }
        this.reloadShowData();
      }).open();
    });
    footer.appendChild(disableBtn);
    const enableBtn = createFooterBtn("square-check", t("\u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0"), async () => {
      new DisableModal(this.app, this.manager, async () => {
        for (const plugin of this.displayPlugins) {
          if (plugin.id === this.manager.manifest.id)
            continue;
          if (this.settings.DELAY) {
            const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
            if (ManagerPlugin && !ManagerPlugin.enabled) {
              await this.appPlugins.enablePlugin(plugin.id);
              ManagerPlugin.enabled = true;
              await this.manager.savePluginAndExport(plugin.id);
            }
          } else {
            if (!this.appPlugins.enabledPlugins.has(plugin.id)) {
              const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
              if (ManagerPlugin)
                ManagerPlugin.enabled = true;
              await this.appPlugins.enablePluginAndSave(plugin.id);
              await this.manager.savePluginAndExport(plugin.id);
            }
          }
          command_default(this.app, this.manager);
        }
        this.reloadShowData();
      }).open();
    });
    footer.appendChild(enableBtn);
    const updateBtn = createFooterBtn("rss", t("\u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0"), async () => {
      await this.manager.checkUpdatesWithNotice();
      await this.reloadShowData();
    });
    footer.appendChild(updateBtn);
    const settingsBtn = createFooterBtn("settings", t("\u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0"), () => {
      this.appSetting.open();
      this.appSetting.openTabById(this.manager.manifest.id);
    });
    footer.appendChild(settingsBtn);
    const moreBtn = createFooterBtn("more-horizontal", t("\u7BA1\u7406\u5668_\u66F4\u591A\u64CD\u4F5C_\u63CF\u8FF0"), () => {
    });
    moreBtn.addEventListener("click", (ev) => {
      const menu = new import_obsidian13.Menu();
      menu.addItem((item) => item.setTitle(t("\u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0")).setIcon("refresh-ccw").onClick(async () => {
        await this.appPlugins.loadManifests();
        await this.reloadShowData();
      }));
      menu.addItem((item) => item.setTitle(t("\u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898")).setIcon("eye-off").onClick(async () => {
        const all = Object.values(this.appPlugins.manifests);
        const plugins = all.filter((pm) => pm.id !== this.manager.manifest.id);
        plugins.sort((item1, item2) => item1.name.localeCompare(item2.name));
        new HideModal(this.app, this.manager, this, plugins).open();
      }));
      menu.addSeparator();
      menu.addItem((item) => item.setTitle(t("\u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0")).setIcon("github").onClick(() => {
        window.open("https://github.com/zenozero-dev/obsidian-manager");
      }));
      menu.addItem((item) => item.setTitle(t("\u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0")).setIcon("book-open").onClick(() => {
        window.open("https://www.bilibili.com/video/BV1WyrkYMEce/");
      }));
      menu.showAtMouseEvent(ev);
    });
    footer.appendChild(moreBtn);
    this.modalEl.appendChild(footer);
  }
  async showData() {
    var _a, _b, _c, _d;
    const manifestMap = this.appPlugins.manifests;
    if (this.settings.DEBUG)
      console.log("[BPM] render showData manifests size:", Object.keys(manifestMap).length);
    const uniqMap = /* @__PURE__ */ new Map();
    Object.values(manifestMap).forEach((mf) => {
      uniqMap.set(mf.id, mf);
    });
    const uniquePlugins = Array.from(uniqMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    if (this.settings.DEBUG)
      console.log("[BPM] render showData uniquePlugins:", uniquePlugins.map((p) => p.id).join(","));
    if (this.settings.DEBUG)
      console.log("[BPM] render showData before loop, children:", this.contentEl.children.length);
    this.displayPlugins = [];
    const renderedIds = /* @__PURE__ */ new Set();
    for (const plugin of uniquePlugins) {
      if (renderedIds.has(plugin.id))
        continue;
      renderedIds.add(plugin.id);
      const ManagerPlugin = this.manager.settings.Plugins.find((mp) => mp.id === plugin.id);
      const getBasePath = (_b = (_a = this.app.vault.adapter) == null ? void 0 : _a.getBasePath) == null ? void 0 : _b.call(_a);
      const basePath = getBasePath ? (0, import_obsidian14.normalizePath)(getBasePath) : "";
      const cfgDir = this.app.vault.configDir;
      const rawDir = plugin.dir || `plugins/${plugin.id}`;
      const isAbsolute = new RegExp("^(?:[a-zA-Z]:[\\\\/]|[\\\\/])").test(rawDir);
      let pluginDir;
      if (isAbsolute) {
        pluginDir = (0, import_obsidian14.normalizePath)(rawDir);
      } else if (rawDir.startsWith(cfgDir) || rawDir.startsWith(".") || rawDir.startsWith("/")) {
        pluginDir = (0, import_obsidian14.normalizePath)(`${basePath}/${rawDir}`);
      } else {
        pluginDir = (0, import_obsidian14.normalizePath)(`${basePath}/${cfgDir}/${rawDir}`);
      }
      if (this.settings.DEBUG)
        console.log("[BPM] render item", plugin.id, "children before add:", this.contentEl.children.length);
      if (!ManagerPlugin)
        continue;
      const isSelf = plugin.id === this.manager.manifest.id;
      const isEnabled = this.settings.DELAY ? ManagerPlugin.enabled : this.appPlugins.enabledPlugins.has(plugin.id);
      switch (this.filter) {
        case "enabled":
          if (!isEnabled)
            continue;
          break;
        case "disabled":
          if (isEnabled)
            continue;
          break;
        case "grouped":
          if (ManagerPlugin.group === "")
            continue;
          break;
        case "ungrouped":
          if (ManagerPlugin.group !== "")
            continue;
          break;
        case "tagged":
          if (ManagerPlugin.tags.length === 0)
            continue;
          break;
        case "untagged":
          if (ManagerPlugin.tags.length > 0)
            continue;
          break;
        case "noted":
          if (!ManagerPlugin.note || ManagerPlugin.note === "")
            continue;
          break;
        default:
          break;
      }
      if (this.settings.PERSISTENCE) {
        if (this.settings.FILTER_GROUP !== "" && ManagerPlugin.group !== this.settings.FILTER_GROUP)
          continue;
        if (this.settings.FILTER_TAG !== "" && !ManagerPlugin.tags.includes(this.settings.FILTER_TAG))
          continue;
        if (this.settings.FILTER_DELAY !== "" && ManagerPlugin.delay !== this.settings.FILTER_DELAY)
          continue;
      } else {
        if (this.group !== "" && ManagerPlugin.group !== this.group)
          continue;
        if (this.tag !== "" && !ManagerPlugin.tags.includes(this.tag))
          continue;
        if (this.delay !== "" && ManagerPlugin.delay !== this.delay)
          continue;
      }
      if (this.searchText !== "" && ManagerPlugin.name.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && ManagerPlugin.desc.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1 && plugin.author.toLowerCase().indexOf(this.searchText.toLowerCase()) == -1)
        continue;
      if (!isSelf && this.settings.HIDES.includes(plugin.id))
        continue;
      const itemEl = new import_obsidian13.Setting(this.contentEl);
      itemEl.settingEl.setAttr("data-plugin-id", plugin.id);
      itemEl.setClass("manager-item");
      itemEl.nameEl.addClass("manager-item__name-container");
      itemEl.descEl.addClass("manager-item__description-container");
      itemEl.controlEl.addClass("manager-item__controls");
      itemEl.settingEl.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        const menu = new import_obsidian13.Menu();
        menu.addItem(
          (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u68C0\u67E5\u66F4\u65B0_\u6807\u9898")).setIcon("rss").onClick(async () => {
            await this.manager.checkUpdateForPlugin(plugin.id);
            await this.reloadShowData();
          })
        );
        menu.addSeparator();
        if (!this.settings.DELAY)
          menu.addItem(
            (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u5355\u6B21\u542F\u52A8_\u63CF\u8FF0")).setIcon("repeat-1").setDisabled(isSelf || isEnabled).onClick(async () => {
              new import_obsidian13.Notice(this.manager.translator.t("\u7BA1\u7406\u5668_\u5355\u6B21\u542F\u52A8\u4E2D_\u63D0\u793A"));
              await this.appPlugins.enablePlugin(plugin.id);
              await this.reloadShowData();
            })
          );
        if (!this.settings.DELAY)
          menu.addItem(
            (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u91CD\u542F\u63D2\u4EF6_\u63CF\u8FF0")).setIcon("refresh-ccw").setDisabled(isSelf || !isEnabled).onClick(async () => {
              new import_obsidian13.Notice(this.manager.translator.t("\u7BA1\u7406\u5668_\u91CD\u542F\u4E2D_\u63D0\u793A"));
              await this.appPlugins.disablePluginAndSave(plugin.id);
              await this.appPlugins.enablePluginAndSave(plugin.id);
              await this.reloadShowData();
            })
          );
        menu.addItem(
          (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898")).setIcon("eye-off").setDisabled(isSelf).onClick(() => {
            if (isSelf)
              return;
            const isHidden = this.settings.HIDES.includes(plugin.id);
            if (isHidden) {
              this.settings.HIDES = this.settings.HIDES.filter((id) => id !== plugin.id);
            } else {
              this.settings.HIDES.push(plugin.id);
            }
            this.manager.saveSettings();
            this.reloadShowData();
          })
        );
        menu.addSeparator();
        menu.addItem(
          (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u7B14\u8BB0_\u6807\u9898")).setIcon("notebook-pen").onClick(() => {
            new NoteModal(this.app, this.manager, ManagerPlugin, this).open();
          })
        );
        menu.addItem(
          (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u5FEB\u6377\u952E_\u6807\u9898")).setIcon("circle-plus").onClick(async () => {
            await this.appSetting.open();
            await this.appSetting.openTabById("hotkeys");
            const tab = await this.appSetting.activeTab;
            tab.searchComponent.inputEl.value = plugin.id;
            tab.updateHotkeyVisibility();
            tab.searchComponent.inputEl.blur();
          })
        );
        menu.addItem(
          (item) => item.setTitle(this.manager.translator.t("\u83DC\u5355_\u590D\u5236ID_\u6807\u9898")).setIcon("copy").onClick(() => {
            navigator.clipboard.writeText(plugin.id);
            new import_obsidian13.Notice(this.manager.translator.t("\u901A\u77E5_ID\u5DF2\u590D\u5236"));
          })
        );
        menu.showAtPosition({ x: event.clientX, y: event.clientY });
      });
      if (this.settings.FADE_OUT_DISABLED_PLUGINS && !isEnabled)
        itemEl.settingEl.addClass("inactive");
      this.displayPlugins.push(plugin);
      if (!this.editorMode) {
        switch (this.settings.ITEM_STYLE) {
          case "alwaysExpand":
            itemEl.descEl.addClass("manager-display-block");
            break;
          case "neverExpand":
            itemEl.descEl.addClass("manager-display-none");
            break;
          case "hoverExpand":
            itemEl.descEl.addClass("manager-display-none");
            itemEl.settingEl.addEventListener(
              "mouseenter",
              () => {
                itemEl.descEl.removeClass("manager-display-none");
                itemEl.descEl.addClass("manager-display-block");
              }
            );
            itemEl.settingEl.addEventListener(
              "mouseleave",
              () => {
                itemEl.descEl.removeClass("manager-display-block");
                itemEl.descEl.addClass("manager-display-none");
              }
            );
            break;
          case "clickExpand":
            itemEl.descEl.addClass("manager-display-none");
            itemEl.settingEl.addEventListener(
              "click",
              function(event) {
                const excludedButtons = Array.from(
                  itemEl.controlEl.querySelectorAll("div")
                );
                if (
                  // @ts-ignore
                  excludedButtons.includes(event.target)
                ) {
                  event.stopPropagation();
                  return;
                }
                if (itemEl.descEl.hasClass("manager-display-none")) {
                  itemEl.descEl.removeClass("manager-display-none");
                  itemEl.descEl.addClass("manager-display-block");
                } else {
                  itemEl.descEl.removeClass("manager-display-block");
                  itemEl.descEl.addClass("manager-display-none");
                }
              }
            );
            break;
        }
      }
      if (ManagerPlugin.group !== "") {
        const group = createSpan({ cls: "manager-item__name-group" });
        itemEl.nameEl.appendChild(group);
        const item = this.settings.GROUPS.find((t) => t.id === ManagerPlugin.group);
        if (item) {
          const tag = this.manager.createTag(item.name, item.color, this.settings.GROUP_STYLE);
          if (this.editorMode)
            tag.onclick = () => {
              new GroupModal(this.app, this.manager, this, ManagerPlugin).open();
            };
          group.appendChild(tag);
        }
      }
      if (ManagerPlugin.group === "" && this.editorMode) {
        const group = createSpan({ cls: "manager-item__name-group" });
        if (this.editorMode)
          itemEl.nameEl.appendChild(group);
        const tag = this.manager.createTag("+", "", "");
        if (this.editorMode)
          tag.onclick = () => {
            new GroupModal(this.app, this.manager, this, ManagerPlugin).open();
          };
        if (this.editorMode)
          group.appendChild(tag);
      }
      const title = createSpan({ text: ManagerPlugin.name, title: plugin.name, cls: "manager-item__name-title" });
      if (this.editorMode) {
        title.setAttribute("style", "border-width: 1px;border-style: dashed;");
        title.setAttribute("contenteditable", "true");
        title.addEventListener("input", async () => {
          if (title.textContent) {
            ManagerPlugin.name = title.textContent;
            await this.manager.savePluginAndExport(plugin.id);
            command_default(this.app, this.manager);
          }
        });
      }
      itemEl.nameEl.appendChild(title);
      const versionWrap = createDiv({ cls: "manager-item__versions" });
      const version = createSpan({ text: `[${plugin.version}]`, cls: ["manager-item__name-version"] });
      versionWrap.appendChild(version);
      if (!this.editorMode) {
        versionWrap.addClass("manager-item__versions--clickable");
        versionWrap.addEventListener("click", async () => {
          var _a2;
          const progress = this.showInlineProgress(this.manager.translator.t("\u901A\u77E5_\u83B7\u53D6\u7248\u672C\u4E2D\u6587\u6848"), plugin.id);
          progress.update(0, 1, plugin.id);
          try {
            const st = await this.manager.checkUpdateForPlugin(plugin.id);
            progress.update(1, 1, plugin.id);
            const versions = (st == null ? void 0 : st.versions) && st.versions.length > 0 ? st.versions : (st == null ? void 0 : st.remoteVersion) ? [{ version: st.remoteVersion, prerelease: /-/.test(st.remoteVersion) }] : [];
            new UpdateModal(this.app, this.manager, plugin.id, versions, (_a2 = st == null ? void 0 : st.remoteVersion) != null ? _a2 : null, (st == null ? void 0 : st.repo) || void 0).open();
          } catch (e) {
            console.error("[BPM] fetch remote versions failed", e);
            new import_obsidian13.Notice(this.manager.translator.t("\u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u5931\u8D25\u63D0\u793A"), 4e3);
          } finally {
            progress.hide();
          }
        });
      }
      const updateInfo = (_c = this.manager.updateStatus) == null ? void 0 : _c[plugin.id];
      if ((updateInfo == null ? void 0 : updateInfo.hasUpdate) && updateInfo.remoteVersion) {
        const arrow = createSpan({ text: "\u2192", cls: ["manager-item__name-remote-arrow"] });
        versionWrap.appendChild(arrow);
        const remote = createSpan({ text: `${updateInfo.remoteVersion}`, cls: ["manager-item__name-remote"] });
        versionWrap.appendChild(remote);
        if (!this.editorMode && !import_obsidian13.Platform.isMobileApp) {
          const downloadBtn = new import_obsidian13.ExtraButtonComponent(itemEl.controlEl);
          downloadBtn.setIcon("download");
          downloadBtn.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u4E0B\u8F7D\u66F4\u65B0_\u63CF\u8FF0"));
          downloadBtn.onClick(() => {
            const versions = updateInfo.versions && updateInfo.versions.length > 0 ? updateInfo.versions : [{ version: updateInfo.remoteVersion, prerelease: false }];
            new UpdateModal(this.app, this.manager, plugin.id, versions, updateInfo.remoteVersion, updateInfo.repo || void 0).open();
          });
        }
      }
      itemEl.nameEl.appendChild(versionWrap);
      if (((_d = ManagerPlugin.note) == null ? void 0 : _d.length) > 0) {
        const note = createSpan();
        note.style.cssText = "width:16px; height:16px; display:inline-flex; color: var(--text-accent);";
        note.addEventListener("click", () => {
          new NoteModal(this.app, this.manager, ManagerPlugin, this).open();
        });
        itemEl.nameEl.appendChild(note);
        (0, import_obsidian13.setIcon)(note, "notebook-pen");
      }
      if (this.settings.DELAY && !this.editorMode && !isSelf && ManagerPlugin.delay !== "") {
        const d = this.settings.DELAYS.find((item) => item.id === ManagerPlugin.delay);
        if (d) {
          const delay = createSpan({ text: `${d.time}s`, cls: ["manager-item__name-delay"] });
          itemEl.nameEl.appendChild(delay);
        }
      }
      const desc = createDiv({ text: ManagerPlugin.desc, title: plugin.description, cls: ["manager-item__name-desc"] });
      if (this.editorMode) {
        desc.setAttribute("style", "border-width: 1px;border-style: dashed");
        desc.setAttribute("contenteditable", "true");
        desc.addEventListener("input", async () => {
          if (desc.textContent) {
            ManagerPlugin.desc = desc.textContent;
            await this.manager.savePluginAndExport(plugin.id);
          }
        });
      }
      itemEl.descEl.appendChild(desc);
      const tags = createDiv();
      itemEl.descEl.appendChild(tags);
      ManagerPlugin.tags.map((id) => {
        const item = this.settings.TAGS.find((item2) => item2.id === id);
        if (item) {
          if (item.id === BPM_TAG_ID && this.settings.HIDE_BPM_TAG) {
          } else {
            const tag = this.manager.createTag(item.name, item.color, this.settings.TAG_STYLE);
            if (this.editorMode && item.id !== BPM_TAG_ID)
              tag.onclick = () => {
                new TagsModal(this.app, this.manager, this, ManagerPlugin).open();
              };
            tags.appendChild(tag);
          }
        }
      });
      if (this.editorMode) {
        const tag = this.manager.createTag("+", "", "");
        tag.onclick = () => {
          new TagsModal(this.app, this.manager, this, ManagerPlugin).open();
        };
        tags.appendChild(tag);
      }
      if (!this.editorMode) {
        const isMobile = import_obsidian13.Platform.isMobileApp;
        let openPluginSetting = null;
        let openPluginSettingEl;
        if (isMobile) {
          const moreButton = new import_obsidian13.ExtraButtonComponent(itemEl.controlEl);
          moreButton.setIcon("more-vertical");
          moreButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u66F4\u591A\u64CD\u4F5C_\u63CF\u8FF0"));
          const moreEl = moreButton.extraSettingsEl || moreButton.buttonEl;
          this.bindLongPressTooltip(moreEl, this.manager.translator.t("\u7BA1\u7406\u5668_\u66F4\u591A\u64CD\u4F5C_\u63CF\u8FF0"));
          moreEl == null ? void 0 : moreEl.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            const menu = new import_obsidian13.Menu();
            menu.addItem((item) => item.setTitle(this.manager.translator.t("\u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0")).setIcon("rss").onClick(async () => {
              await this.manager.checkUpdateForPlugin(plugin.id);
              await this.reloadShowData();
            }));
            if ((updateInfo == null ? void 0 : updateInfo.hasUpdate) && updateInfo.remoteVersion) {
              menu.addItem((item) => item.setTitle(this.manager.translator.t("\u7BA1\u7406\u5668_\u4E0B\u8F7D\u66F4\u65B0_\u63CF\u8FF0")).setIcon("download").onClick(() => {
                const versions = updateInfo.versions && updateInfo.versions.length > 0 ? updateInfo.versions : [{ version: updateInfo.remoteVersion, prerelease: false }];
                new UpdateModal(this.app, this.manager, plugin.id, versions, updateInfo.remoteVersion, updateInfo.repo || void 0).open();
              }));
            }
            menu.addSeparator();
            menu.addItem((item) => item.setTitle(this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0")).setIcon("settings").setDisabled(!isEnabled).onClick(() => {
              this.appSetting.open();
              this.appSetting.openTabById(plugin.id);
            }));
            menu.addItem((item) => item.setTitle(this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0")).setIcon("folder-open").onClick(() => {
              managerOpen(pluginDir, this.manager);
            }));
            menu.addItem((item) => item.setTitle(this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u6807\u9898")).setIcon("github").onClick(async () => {
              const repo = await this.manager.repoResolver.resolveRepo(plugin.id);
              if (repo) {
                window.open(`https://github.com/${repo}`);
              } else {
                const isBpmInstall = this.manager.settings.BPM_INSTALLED.includes(plugin.id);
                new import_obsidian13.Notice(isBpmInstall ? this.manager.translator.t("\u7BA1\u7406\u5668_\u4ED3\u5E93\u672A\u8BB0\u5F55_\u63D0\u793A") : this.manager.translator.t("\u7BA1\u7406\u5668_\u4ED3\u5E93\u9700\u624B\u52A8\u6DFB\u52A0_\u63D0\u793A"));
              }
            }));
            menu.addSeparator();
            menu.addItem((item) => item.setTitle(this.manager.translator.t("\u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0")).setIcon("trash").setDisabled(isSelf).onClick(async () => {
              if (isSelf)
                return;
              new DeleteModal(this.app, this.manager, async () => {
                await this.appPlugins.uninstallPlugin(plugin.id);
                await this.appPlugins.loadManifests();
                this.reloadShowData();
                command_default(this.app, this.manager);
                this.manager.synchronizePlugins(Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manager.manifest.id));
                new import_obsidian13.Notice(this.manager.translator.t("\u5378\u8F7D_\u901A\u77E5_\u4E00"));
              }).open();
            }));
            menu.showAtMouseEvent(event);
          });
        } else {
          const openRepoButton = new import_obsidian13.ExtraButtonComponent(itemEl.controlEl);
          openRepoButton.setIcon("github");
          openRepoButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u4ED3\u5E93\u68C0\u6D4B\u4E2D_\u63D0\u793A"));
          openRepoButton.setDisabled(true);
          const repo = await this.manager.repoResolver.resolveRepo(plugin.id);
          if (repo) {
            openRepoButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u63D0\u793A").replace("{repo}", repo));
            openRepoButton.setDisabled(false);
            openRepoButton.onClick(() => window.open(`https://github.com/${repo}`));
          } else {
            const isBpmInstall = this.manager.settings.BPM_INSTALLED.includes(plugin.id);
            openRepoButton.setTooltip(isBpmInstall ? this.manager.translator.t("\u7BA1\u7406\u5668_\u4ED3\u5E93\u672A\u8BB0\u5F55_\u63D0\u793A") : this.manager.translator.t("\u7BA1\u7406\u5668_\u4ED3\u5E93\u9700\u624B\u52A8\u6DFB\u52A0_\u63D0\u793A"));
          }
          openPluginSetting = new import_obsidian13.ExtraButtonComponent(itemEl.controlEl);
          openPluginSetting.setIcon("settings");
          openPluginSetting.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0"));
          openPluginSetting.onClick(() => {
            openPluginSetting == null ? void 0 : openPluginSetting.setDisabled(true);
            this.appSetting.open();
            this.appSetting.openTabById(plugin.id);
            openPluginSetting == null ? void 0 : openPluginSetting.setDisabled(false);
          });
          openPluginSettingEl = openPluginSetting.extraSettingsEl || openPluginSetting.buttonEl;
          if (!isEnabled) {
            openPluginSetting.setDisabled(true);
            if (openPluginSettingEl)
              openPluginSettingEl.style.display = "none";
          }
          const openPluginDirButton = new import_obsidian13.ExtraButtonComponent(itemEl.controlEl);
          openPluginDirButton.setIcon("folder-open");
          openPluginDirButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0"));
          openPluginDirButton.onClick(() => {
            openPluginDirButton.setDisabled(true);
            managerOpen(pluginDir, this.manager);
            openPluginDirButton.setDisabled(false);
          });
          const deletePluginButton = new import_obsidian13.ExtraButtonComponent(itemEl.controlEl);
          deletePluginButton.setIcon("trash");
          deletePluginButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0"));
          if (isSelf)
            deletePluginButton.setDisabled(true);
          deletePluginButton.onClick(async () => {
            if (isSelf)
              return;
            new DeleteModal(this.app, this.manager, async () => {
              await this.appPlugins.uninstallPlugin(plugin.id);
              await this.appPlugins.loadManifests();
              this.reloadShowData();
              command_default(this.app, this.manager);
              this.manager.synchronizePlugins(Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manager.manifest.id));
              new import_obsidian13.Notice(this.manager.translator.t("\u5378\u8F7D_\u901A\u77E5_\u4E00"));
            }).open();
          });
        }
        const toggleSwitch = new import_obsidian13.ToggleComponent(itemEl.controlEl);
        toggleSwitch.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0"));
        toggleSwitch.setValue(isEnabled);
        if (isSelf) {
          toggleSwitch.setValue(true);
          toggleSwitch.setDisabled(true);
          toggleSwitch.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u81EA\u8EAB\u4E0D\u53EF\u7981\u7528_\u63D0\u793A"));
        } else
          toggleSwitch.onChange(async () => {
            const ManagerPlugin2 = this.settings.Plugins.find((p) => p.id === plugin.id);
            const targetEnabled = toggleSwitch.getValue();
            const removeByFilter = this.filter === "enabled" && !targetEnabled || this.filter === "disabled" && targetEnabled;
            const updateCardUI = () => {
              if (this.settings.FADE_OUT_DISABLED_PLUGINS) {
                itemEl.settingEl.toggleClass("inactive", !targetEnabled);
              }
              if (openPluginSetting) {
                openPluginSetting.setDisabled(!targetEnabled);
                if (openPluginSettingEl)
                  openPluginSettingEl.style.display = targetEnabled ? "" : "none";
              }
              if (removeByFilter) {
                itemEl.settingEl.detach();
              }
              this.footEl.innerHTML = this.count();
            };
            if (this.settings.DELAY) {
              if (targetEnabled) {
                if (ManagerPlugin2)
                  ManagerPlugin2.enabled = true;
                await this.manager.savePluginAndExport(plugin.id);
                await this.appPlugins.enablePlugin(plugin.id);
              } else {
                if (ManagerPlugin2)
                  ManagerPlugin2.enabled = false;
                await this.manager.savePluginAndExport(plugin.id);
                await this.appPlugins.disablePlugin(plugin.id);
              }
            } else {
              if (targetEnabled) {
                if (ManagerPlugin2)
                  ManagerPlugin2.enabled = true;
                await this.appPlugins.enablePluginAndSave(plugin.id);
              } else {
                if (ManagerPlugin2)
                  ManagerPlugin2.enabled = false;
                await this.appPlugins.disablePluginAndSave(plugin.id);
              }
              await this.manager.savePluginAndExport(plugin.id);
            }
            command_default(this.app, this.manager);
            updateCardUI();
          });
      }
      if (this.editorMode) {
        const reloadButton = new import_obsidian13.ExtraButtonComponent(itemEl.controlEl);
        reloadButton.setIcon("refresh-ccw");
        reloadButton.setTooltip(this.manager.translator.t("\u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0"));
        reloadButton.onClick(async () => {
          ManagerPlugin.name = plugin.name;
          ManagerPlugin.desc = plugin.description;
          ManagerPlugin.group = "";
          ManagerPlugin.delay = "";
          ManagerPlugin.tags = [];
          await this.manager.savePluginAndExport(plugin.id);
          this.reloadShowData();
        });
        if (this.settings.DELAY) {
          const delays = this.settings.DELAYS.reduce((acc, item) => {
            acc[item.id] = item.name;
            return acc;
          }, { "": this.manager.translator.t("\u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C") });
          const delaysEl = new import_obsidian13.DropdownComponent(itemEl.controlEl);
          delaysEl.addOptions(delays);
          delaysEl.setValue(ManagerPlugin.delay);
          delaysEl.onChange(async (value) => {
            ManagerPlugin.delay = value;
            await this.manager.savePluginAndExport(plugin.id);
            this.reloadShowData();
          });
        }
      }
    }
    if (this.settings.DEBUG) {
      const cards = Array.from(this.contentEl.querySelectorAll(".manager-item"));
      console.log("[BPM] render showData after loop, cards:", cards.length, "ids:", cards.map((el) => el.getAttribute("data-plugin-id")).filter(Boolean).join(","));
    }
    this.footEl.innerHTML = this.count();
  }
  count() {
    let totalCount = 0;
    let enabledCount = 0;
    let disabledCount = 0;
    if (this.settings.DELAY) {
      const plugins = this.settings.Plugins;
      totalCount = plugins.length;
      plugins.forEach((plugin) => {
        plugin.enabled ? enabledCount++ : disabledCount++;
      });
    } else {
      totalCount = Object.keys(this.manager.appPlugins.manifests).length - 1;
      enabledCount = this.manager.appPlugins.enabledPlugins.size - 1;
      disabledCount = totalCount - enabledCount;
    }
    const totalLabel = this.manager.translator.t("\u901A\u7528_\u603B\u8BA1_\u6587\u672C");
    const enabledLabel = this.manager.translator.t("\u901A\u7528_\u542F\u7528_\u6587\u672C");
    const disabledLabel = this.manager.translator.t("\u901A\u7528_\u7981\u7528_\u6587\u672C");
    return `<span class="bpm-stat-chip bpm-stat-chip--total"><span class="bpm-stat-chip__label">${totalLabel}</span><span class="bpm-stat-chip__value">${totalCount}</span></span><span class="bpm-stat-chip bpm-stat-chip--enabled"><span class="bpm-stat-chip__label">${enabledLabel}</span><span class="bpm-stat-chip__value">${enabledCount}</span></span><span class="bpm-stat-chip bpm-stat-chip--disabled"><span class="bpm-stat-chip__label">${disabledLabel}</span><span class="bpm-stat-chip__value">${disabledCount}</span></span>`;
  }
  // 安装面板
  showInstallPanel() {
    this.contentEl.empty();
    const t = (k) => this.manager.translator.t(k);
    const info = this.contentEl.createEl("div");
    info.addClass("manager-install__info");
    info.setText(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u4ECB\u7ECD"));
    const typeSetting = new import_obsidian13.Setting(this.contentEl).setName(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u6807\u9898")).setDesc(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63CF\u8FF0"));
    typeSetting.addDropdown((dd) => {
      dd.addOptions({ "plugin": t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63D2\u4EF6"), "theme": t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u4E3B\u9898") });
      dd.setValue(this.installType);
      dd.onChange((v) => {
        this.installType = v;
      });
    });
    const repoSetting = new import_obsidian13.Setting(this.contentEl).setName(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u6807\u9898")).setDesc(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u63CF\u8FF0"));
    repoSetting.addText((text) => {
      text.setPlaceholder(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u5360\u4F4D"));
      text.setValue(this.installRepo);
      text.onChange((v) => {
        this.installRepo = v;
        this.installVersions = [];
        this.installVersion = "";
        this.renderContent();
      });
    });
    const versionSetting = new import_obsidian13.Setting(this.contentEl).setName(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u6807\u9898")).setDesc(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u63CF\u8FF0"));
    versionSetting.addDropdown((dd) => {
      dd.addOption("", t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u9ED8\u8BA4\u6700\u65B0"));
      this.installVersions.forEach((v) => dd.addOption(v.version, `${v.version}${v.prerelease ? " (pre)" : ""}`));
      dd.setValue(this.installVersion);
      dd.onChange((v) => {
        this.installVersion = v;
      });
      dd.selectEl.style.minWidth = "200px";
    });
    versionSetting.addButton((btn) => {
      btn.setButtonText(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u6309\u94AE"));
      btn.setCta();
      btn.onClick(async () => {
        if (!this.installRepo) {
          new import_obsidian13.Notice(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93\u4E3A\u7A7A\u63D0\u793A"));
          return;
        }
        btn.setDisabled(true);
        btn.setButtonText(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u4E2D"));
        try {
          this.installVersions = await fetchReleaseVersions(this.manager, this.installRepo);
          if (this.installVersions.length === 0)
            new import_obsidian13.Notice(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u7A7A\u63D0\u793A"));
          this.installVersion = "";
        } catch (e) {
          console.error(e);
          new import_obsidian13.Notice(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u5931\u8D25\u63D0\u793A"));
        }
        btn.setDisabled(false);
        btn.setButtonText(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u6309\u94AE"));
        this.renderContent();
      });
    });
    const action = new import_obsidian13.Setting(this.contentEl).setName(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6807\u9898"));
    action.addButton((btn) => {
      btn.setButtonText(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6309\u94AE"));
      btn.setCta();
      btn.onClick(async () => {
        if (!this.installRepo) {
          new import_obsidian13.Notice(t("\u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93\u4E3A\u7A7A\u63D0\u793A"));
          return;
        }
        btn.setDisabled(true);
        const ok = this.installType === "plugin" ? await installPluginFromGithub(this.manager, this.installRepo, this.installVersion) : await installThemeFromGithub(this.manager, this.installRepo, this.installVersion);
        btn.setDisabled(false);
        if (ok) {
          this.installMode = false;
          if (this.searchBarEl)
            this.searchBarEl.removeClass("manager-display-none");
          this.renderContent();
        }
      });
    });
  }
  renderContent() {
    this.contentEl.empty();
    if (this.installMode) {
      this.showInstallPanel();
    } else {
      this.showData();
    }
  }
  bindLongPressTooltip(el, text) {
    if (!el || !text)
      return;
    let timer;
    const show = () => {
      new import_obsidian13.Notice(text, 1500);
    };
    const clear = () => {
      if (timer)
        window.clearTimeout(timer);
      timer = void 0;
    };
    el.addEventListener("touchstart", () => {
      timer = window.setTimeout(show, 500);
    });
    el.addEventListener("touchend", clear);
    el.addEventListener("touchcancel", clear);
  }
  async reloadShowData() {
    if (this.settings.DEBUG)
      console.log("[BPM] reloadShowData start, children before empty:", this.contentEl.children.length);
    const modalElement = this.contentEl;
    const scrollTop = modalElement.scrollTop;
    modalElement.empty();
    if (this.installMode) {
      this.showInstallPanel();
      modalElement.scrollTo(0, scrollTop);
    } else {
      await this.showData();
      modalElement.scrollTo(0, scrollTop);
    }
    if (this.settings.DEBUG)
      console.log("[BPM] reloadShowData end, children after render:", this.contentEl.children.length);
  }
  async refreshFilterOptions(preserveScroll = false) {
    var _a, _b, _c;
    const scrollTop = preserveScroll ? this.contentEl.scrollTop : 0;
    if (this.groupDropdown) {
      const currentGroup = (_a = this.groupDropdown.selectEl.value) != null ? _a : this.settings.PERSISTENCE ? this.settings.FILTER_GROUP : this.group;
      const groupCounts = this.settings.Plugins.reduce((acc, plugin) => {
        const groupId = plugin.group || "";
        acc[groupId] = (acc[groupId] || 0) + 1;
        return acc;
      }, { "": 0 });
      const groups = this.settings.GROUPS.reduce((acc, item) => {
        acc[item.id] = `${item.name} [${groupCounts[item.id] || 0}]`;
        return acc;
      }, { "": this.manager.translator.t("\u7B5B\u9009_\u5206\u7EC4_\u5168\u90E8") });
      const current = this.settings.PERSISTENCE ? this.settings.FILTER_GROUP : currentGroup;
      this.resetDropdown(this.groupDropdown, groups, current);
    }
    if (this.tagDropdown) {
      const currentTag = (_b = this.tagDropdown.selectEl.value) != null ? _b : this.settings.PERSISTENCE ? this.settings.FILTER_TAG : this.tag;
      const tagCounts = this.settings.Plugins.reduce((acc, plugin) => {
        plugin.tags.forEach((tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      }, {});
      const tags = this.settings.TAGS.reduce((acc, item) => {
        acc[item.id] = `${item.name} [${tagCounts[item.id] || 0}]`;
        return acc;
      }, { "": this.manager.translator.t("\u7B5B\u9009_\u6807\u7B7E_\u5168\u90E8") });
      const current = this.settings.PERSISTENCE ? this.settings.FILTER_TAG : currentTag;
      this.resetDropdown(this.tagDropdown, tags, current);
    }
    if (this.settings.DELAY && this.delayDropdown) {
      const currentDelay = (_c = this.delayDropdown.selectEl.value) != null ? _c : this.settings.PERSISTENCE ? this.settings.FILTER_DELAY : this.delay;
      const delayCounts = this.settings.Plugins.reduce((acc, plugin) => {
        const delay = plugin.delay || "";
        acc[delay] = (acc[delay] || 0) + 1;
        return acc;
      }, { "": 0 });
      const delays = this.settings.DELAYS.reduce((acc, item) => {
        acc[item.id] = `${item.name} (${delayCounts[item.id] || 0})`;
        return acc;
      }, { "": this.manager.translator.t("\u7B5B\u9009_\u5EF6\u8FDF_\u5168\u90E8") });
      const current = this.settings.PERSISTENCE ? this.settings.FILTER_DELAY : currentDelay;
      this.resetDropdown(this.delayDropdown, delays, current);
    }
    await this.reloadShowData();
    if (preserveScroll)
      this.contentEl.scrollTo({ top: scrollTop });
  }
  resetDropdown(dropdown, options, value) {
    dropdown.selectEl.empty();
    dropdown.addOptions(options);
    dropdown.setValue(options[value] ? value : Object.keys(options)[0] || "");
  }
  async onOpen() {
    this.manager.pauseExportWatcher();
    await this.showHead();
    await this.showData();
    this.searchEl.inputEl.focus();
    this.applyEditingStyle();
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "f") {
        if (this.searchEl.inputEl) {
          this.searchEl.inputEl.focus();
        }
      }
    });
  }
  async onClose() {
    this.contentEl.empty();
    if (this.modalContainer)
      this.modalContainer.removeClass("manager-container--editing");
    this.manager.resumeExportWatcher();
  }
  applyEditingStyle() {
    if (!this.modalContainer)
      return;
    if (this.editorMode) {
      this.modalContainer.addClass("manager-container--editing");
    } else {
      this.modalContainer.removeClass("manager-container--editing");
    }
  }
};

// src/command.ts
var Commands = (app, manager) => {
  manager.addCommand({
    id: "manager-view",
    name: manager.translator.t("\u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0"),
    hotkeys: [
      {
        modifiers: ["Ctrl"],
        key: "M"
      }
    ],
    callback: () => {
      new ManagerModal(app, manager).open();
    }
  });
  manager.addCommand({
    id: "troubleshoot-conflicts",
    name: manager.translator.t("\u6392\u67E5_\u6309\u94AE_\u63CF\u8FF0"),
    callback: () => {
      new TroubleshootModal(app, manager).open();
    }
  });
  if (manager.settings.DELAY) {
    if (manager.settings.COMMAND_ITEM) {
      const plugins = Object.values(manager.appPlugins.manifests).filter((pm) => pm.id !== manager.manifest.id);
      plugins.forEach((plugin) => {
        const mp = manager.settings.Plugins.find((mp2) => mp2.id === plugin.id);
        if (mp) {
          manager.addCommand({
            id: `manager-${mp.id}`,
            name: `${mp.enabled ? manager.translator.t("\u901A\u7528_\u5173\u95ED_\u6587\u672C") : manager.translator.t("\u901A\u7528_\u5F00\u542F_\u6587\u672C")} ${mp.name} `,
            callback: async () => {
              if (mp.enabled) {
                mp.enabled = false;
                await manager.savePluginAndExport(mp.id);
                await manager.appPlugins.disablePlugin(plugin.id);
                Commands(app, manager);
              } else {
                mp.enabled = true;
                await manager.savePluginAndExport(mp.id);
                await manager.appPlugins.enablePlugin(plugin.id);
                Commands(app, manager);
              }
            }
          });
        }
      });
    }
    if (manager.settings.COMMAND_GROUP) {
      manager.settings.GROUPS.forEach((group) => {
        manager.addCommand({
          id: `manager-${group.id}-enabled`,
          name: `${manager.translator.t("\u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C")} ${group.name}`,
          callback: async () => {
            const filteredPlugins = manager.settings.Plugins.filter((plugin) => plugin.group === group.id);
            filteredPlugins.forEach(async (plugin) => {
              if (plugin && !plugin.enabled) {
                await manager.appPlugins.enablePlugin(plugin.id);
                plugin.enabled = true;
                await manager.savePluginAndExport(plugin.id);
              }
            });
            Commands(app, manager);
          }
        });
        manager.addCommand({
          id: `manager-${group.id}-disable`,
          name: `${manager.translator.t("\u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C")} ${group.name}`,
          callback: async () => {
            const filteredPlugins = manager.settings.Plugins.filter((plugin) => plugin.group === group.id);
            filteredPlugins.forEach(async (plugin) => {
              if (plugin && plugin.enabled) {
                await manager.appPlugins.disablePlugin(plugin.id);
                plugin.enabled = false;
                await manager.savePluginAndExport(plugin.id);
              }
            });
            Commands(app, manager);
          }
        });
      });
    }
  } else {
    if (manager.settings.COMMAND_ITEM) {
      const plugins = Object.values(manager.appPlugins.manifests).filter((pm) => pm.id !== manager.manifest.id);
      plugins.forEach((plugin) => {
        const enabled = manager.appPlugins.enabledPlugins.has(plugin.id);
        manager.addCommand({
          id: `manager-${plugin.id}`,
          name: `${enabled ? manager.translator.t("\u547D\u4EE4\u884C_\u7981\u7528_\u6587\u672C") : manager.translator.t("\u547D\u4EE4\u884C_\u542F\u7528_\u6587\u672C")} ${plugin.name} `,
          callback: async () => {
            if (enabled) {
              await manager.appPlugins.disablePluginAndSave(plugin.id);
              const mp = manager.settings.Plugins.find((p) => p.id === plugin.id);
              if (mp)
                mp.enabled = false;
              await manager.savePluginAndExport(plugin.id);
              Commands(app, manager);
            } else {
              await manager.appPlugins.enablePluginAndSave(plugin.id);
              const mp = manager.settings.Plugins.find((p) => p.id === plugin.id);
              if (mp)
                mp.enabled = true;
              await manager.savePluginAndExport(plugin.id);
              Commands(app, manager);
            }
          }
        });
      });
    }
    if (manager.settings.COMMAND_GROUP) {
      manager.settings.GROUPS.forEach((group) => {
        manager.addCommand({
          id: `manager-${group.id}-enabled`,
          name: `${manager.translator.t("\u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C")} ${group.name} ${manager.translator.t("\u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C")}`,
          callback: async () => {
            const filteredPlugins = manager.settings.Plugins.filter((plugin) => plugin.group === group.id);
            filteredPlugins.forEach(async (plugin) => {
              await manager.appPlugins.enablePluginAndSave(plugin.id);
              const mp = manager.settings.Plugins.find((p) => p.id === plugin.id);
              if (mp)
                mp.enabled = true;
              await manager.savePluginAndExport(plugin.id);
            });
            Commands(app, manager);
          }
        });
        manager.addCommand({
          id: `manager-${group.id}-disable`,
          name: `${manager.translator.t("\u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C")} ${group.name} ${manager.translator.t("\u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C")}`,
          callback: async () => {
            const filteredPlugins = manager.settings.Plugins.filter((plugin) => plugin.group === group.id);
            filteredPlugins.forEach(async (plugin) => {
              await manager.appPlugins.disablePluginAndSave(plugin.id);
              const mp = manager.settings.Plugins.find((p) => p.id === plugin.id);
              if (mp)
                mp.enabled = false;
              await manager.savePluginAndExport(plugin.id);
            });
            Commands(app, manager);
          }
        });
      });
    }
  }
};
var command_default = Commands;

// src/settings/ui/manager-basis.ts
var ManagerBasis = class extends BaseSetting {
  main() {
    const languageBar = new import_obsidian15.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0"));
    const languageDropdown = new import_obsidian15.DropdownComponent(languageBar.controlEl);
    languageDropdown.addOptions(this.manager.translator.language);
    languageDropdown.setValue(this.settings.LANGUAGE);
    languageDropdown.onChange((value) => {
      this.settings.LANGUAGE = value;
      this.manager.saveSettings();
      this.settingTab.basisDisplay();
      command_default(this.app, this.manager);
      this.settingTab.display();
      this.display();
    });
    const DelayBar = new import_obsidian15.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0"));
    const DelayToggle = new import_obsidian15.ToggleComponent(DelayBar.controlEl);
    DelayToggle.setValue(this.settings.DELAY);
    DelayToggle.onChange((value) => {
      this.settings.DELAY = value;
      this.manager.saveSettings();
      value ? this.manager.enableDelaysForAllPlugins() : this.manager.disableDelaysForAllPlugins();
      this.settingTab.display();
      this.display();
    });
    const persistenceBar = new import_obsidian15.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0"));
    const persistenceToggle = new import_obsidian15.ToggleComponent(persistenceBar.controlEl);
    persistenceToggle.setValue(this.settings.PERSISTENCE);
    persistenceToggle.onChange((value) => {
      this.settings.PERSISTENCE = value;
      this.manager.saveSettings();
    });
    const debugBar = new import_obsidian15.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8C03\u8BD5\u6A21\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8C03\u8BD5\u6A21\u5F0F_\u63CF\u8FF0"));
    const debugToggle = new import_obsidian15.ToggleComponent(debugBar.controlEl);
    debugToggle.setValue(this.settings.DEBUG);
    debugToggle.onChange((value) => {
      this.settings.DEBUG = value;
      this.manager.saveSettings();
    });
    const startupCheckBar = new import_obsidian15.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0"));
    const startupCheckToggle = new import_obsidian15.ToggleComponent(startupCheckBar.controlEl);
    startupCheckToggle.setValue(this.settings.STARTUP_CHECK_UPDATES);
    startupCheckToggle.onChange((value) => {
      this.settings.STARTUP_CHECK_UPDATES = value;
      this.manager.saveSettings();
    });
    const CommandItemBar = new import_obsidian15.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0"));
    const CommandItemToggle = new import_obsidian15.ToggleComponent(CommandItemBar.controlEl);
    CommandItemToggle.setValue(this.settings.COMMAND_ITEM);
    CommandItemToggle.onChange((value) => {
      this.settings.COMMAND_ITEM = value;
      this.manager.saveSettings();
      command_default(this.app, this.manager);
    });
    const CommandGroupBar = new import_obsidian15.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0"));
    const CommandGroupToggle = new import_obsidian15.ToggleComponent(CommandGroupBar.controlEl);
    CommandGroupToggle.setValue(this.settings.COMMAND_GROUP);
    CommandGroupToggle.onChange((value) => {
      this.settings.COMMAND_GROUP = value;
      this.manager.saveSettings();
      command_default(this.app, this.manager);
    });
    const hideBpmTagBar = new import_obsidian15.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u9690\u85CFBPM\u6807\u7B7E_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u9690\u85CFBPM\u6807\u7B7E_\u63CF\u8FF0"));
    const hideBpmTagToggle = new import_obsidian15.ToggleComponent(hideBpmTagBar.controlEl);
    hideBpmTagToggle.setValue(this.settings.HIDE_BPM_TAG);
    hideBpmTagToggle.onChange((value) => {
      var _a;
      this.settings.HIDE_BPM_TAG = value;
      this.manager.saveSettings();
      (_a = this.manager.managerModal) == null ? void 0 : _a.reloadShowData();
    });
    const exportDirBar = new import_obsidian15.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u63CF\u8FF0"));
    const exportDirInput = new import_obsidian15.TextComponent(exportDirBar.controlEl);
    exportDirInput.setPlaceholder(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u793A\u4F8B"));
    exportDirInput.setValue(this.settings.EXPORT_DIR || "");
    exportDirInput.inputEl.addEventListener("blur", () => {
      exportDirInput.setValue(exportDirInput.getValue().trim());
    });
    exportDirBar.addButton((btn) => {
      btn.setButtonText(this.manager.translator.t("\u901A\u7528_\u4FDD\u5B58_\u6587\u672C")).setCta();
      btn.onClick(() => {
        this.settings.EXPORT_DIR = exportDirInput.getValue().trim();
        this.manager.saveSettings();
        this.manager.setupExportWatcher();
        this.manager.exportAllPluginNotes();
      });
    });
    new import_obsidian15.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u63D0\u793A_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u63D0\u793A_\u63CF\u8FF0"));
    const tokenBar = new import_obsidian15.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u6807\u9898")).setDesc(`${this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u63CF\u8FF0")} (${this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u6743\u9650")})`);
    const tokenInput = new import_obsidian15.TextComponent(tokenBar.controlEl);
    tokenInput.setPlaceholder("ghp_xxx");
    tokenInput.setValue(this.settings.GITHUB_TOKEN || "");
    tokenInput.onChange((value) => {
      this.settings.GITHUB_TOKEN = value.trim();
      this.manager.saveSettings();
    });
    new import_obsidian15.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0"));
  }
};

// src/settings/ui/manager-style.ts
var import_obsidian16 = require("obsidian");
var ManagerBasis2 = class extends BaseSetting {
  constructor() {
    super(...arguments);
    this.ITEM_STYLE = {
      "alwaysExpand": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E00"),
      "neverExpand": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E8C"),
      "hoverExpand": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E09"),
      "clickExpand": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u56DB")
    };
    this.GROUP_STYLE = {
      "a": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E00"),
      "b": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E8C"),
      "c": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E09"),
      "d": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u56DB")
    };
    this.TAG_STYLE = {
      "a": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E00"),
      "b": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E8C"),
      "c": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E09"),
      "d": this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u56DB")
    };
  }
  main() {
    const itemStyleBar = new import_obsidian16.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0"));
    const itemStyleDropdown = new import_obsidian16.DropdownComponent(itemStyleBar.controlEl);
    itemStyleDropdown.addOptions(this.ITEM_STYLE);
    itemStyleDropdown.setValue(this.settings.ITEM_STYLE);
    itemStyleDropdown.onChange((value) => {
      this.settings.ITEM_STYLE = value;
      this.manager.saveSettings();
    });
    const groupStyleBar = new import_obsidian16.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0"));
    const groupStyleDropdown = new import_obsidian16.DropdownComponent(groupStyleBar.controlEl);
    groupStyleDropdown.addOptions(this.GROUP_STYLE);
    groupStyleDropdown.setValue(this.settings.GROUP_STYLE);
    groupStyleDropdown.onChange((value) => {
      this.settings.GROUP_STYLE = value;
      this.manager.saveSettings();
    });
    const tagStyleBar = new import_obsidian16.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0"));
    const tagStyleDropdown = new import_obsidian16.DropdownComponent(tagStyleBar.controlEl);
    tagStyleDropdown.addOptions(this.TAG_STYLE);
    tagStyleDropdown.setValue(this.settings.TAG_STYLE);
    tagStyleDropdown.onChange((value) => {
      this.settings.TAG_STYLE = value;
      this.manager.saveSettings();
    });
    const topBar = new import_obsidian16.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0"));
    const topToggle = new import_obsidian16.ToggleComponent(topBar.controlEl);
    topToggle.setValue(this.settings.CENTER);
    topToggle.onChange((value) => {
      this.settings.CENTER = value;
      this.manager.saveSettings();
    });
    const fadeOutDisabledPluginsBar = new import_obsidian16.Setting(this.containerEl).setName(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898")).setDesc(this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0"));
    const fadeOutDisabledPluginsToggle = new import_obsidian16.ToggleComponent(fadeOutDisabledPluginsBar.controlEl);
    fadeOutDisabledPluginsToggle.setValue(this.settings.FADE_OUT_DISABLED_PLUGINS);
    fadeOutDisabledPluginsToggle.onChange((value) => {
      this.settings.FADE_OUT_DISABLED_PLUGINS = value;
      this.manager.saveSettings();
    });
  }
};

// src/settings/ui/manager-delay.ts
var import_obsidian17 = require("obsidian");
var ManagerDelay = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let time = 0;
    new import_obsidian17.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addSlider(
      (cb) => cb.setLimits(0, 100, 1).setValue(time).setDynamicTooltip().onChange((value) => {
        time = value;
      })
    ).addText(
      (cb) => cb.setPlaceholder("ID").onChange((value) => {
        id = value;
      })
    ).addText(
      (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
        name = value;
      })
    ).addExtraButton(
      (cb) => cb.setIcon("plus").onClick(() => {
        const containsId = this.manager.settings.DELAYS.some((delay) => delay.id === id);
        if (!containsId && id !== "") {
          this.manager.settings.DELAYS.push({ id, name, time });
          this.manager.saveSettings();
          this.settingTab.delayDisplay();
          new import_obsidian17.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian17.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.DELAYS.forEach((delay, index) => {
      const item = new import_obsidian17.Setting(this.containerEl);
      item.settingEl.addClass("manager-setting-group__item");
      item.setName(`[${delay.id}]`);
      item.addSlider(
        (cb) => cb.setLimits(0, 100, 1).setValue(delay.time).setDynamicTooltip().onChange((value) => {
          delay.time = value;
          this.manager.saveSettings();
        })
      );
      item.addText(
        (cb) => cb.setValue(delay.name).onChange((value) => {
          delay.name = value;
          this.manager.saveSettings();
        })
      );
      item.addExtraButton(
        (cb) => cb.setIcon("trash-2").onClick(() => {
          const hasTestGroup = this.settings.Plugins.some((plugin) => plugin.delay === delay.id);
          if (!hasTestGroup) {
            this.manager.settings.DELAYS = this.manager.settings.DELAYS.filter((t) => t.id !== delay.id);
            this.manager.saveSettings();
            this.settingTab.delayDisplay();
            new import_obsidian17.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian17.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
          }
        })
      );
    });
  }
};

// src/settings/ui/manager-tag.ts
var import_obsidian18 = require("obsidian");
var ManagerTag = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let color = this.manager.generateAutoColor(this.manager.settings.TAGS.map((t) => t.color));
    new import_obsidian18.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addColorPicker(
      (cb) => cb.setValue(color).onChange((value) => {
        color = value;
      })
    ).addText(
      (cb) => cb.setPlaceholder("ID").onChange((value) => {
        id = value;
        this.manager.saveSettings();
      })
    ).addText(
      (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
        name = value;
      })
    ).addExtraButton(
      (cb) => cb.setIcon("plus").onClick(() => {
        const containsId = this.manager.settings.TAGS.some((tag) => tag.id === id);
        if (!containsId && id !== "") {
          if (color === "")
            color = this.manager.generateAutoColor(this.manager.settings.TAGS.map((t) => t.color));
          this.manager.settings.TAGS.push({ id, name, color });
          this.manager.saveSettings();
          this.settingTab.tagDisplay();
          new import_obsidian18.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian18.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.TAGS.forEach((tag, index) => {
      const item = new import_obsidian18.Setting(this.containerEl);
      item.setClass("manager-setting-tag__item");
      const isBpmTag = tag.id === BPM_TAG_ID;
      item.addColorPicker(
        (cb) => cb.setDisabled(isBpmTag).setValue(tag.color).onChange((value) => {
          tag.color = value;
          this.manager.saveSettings();
          this.settingTab.tagDisplay();
        })
      );
      item.addText(
        (cb) => cb.setDisabled(isBpmTag).setValue(tag.name).onChange((value) => {
          tag.name = value;
          this.manager.saveSettings();
        }).inputEl.addEventListener("blur", () => {
          this.settingTab.tagDisplay();
        })
      );
      item.addExtraButton(
        (cb) => cb.setIcon("trash-2").setDisabled(isBpmTag).onClick(() => {
          const hasTestTag = this.settings.Plugins.some((plugin) => plugin.tags && plugin.tags.includes(tag.id));
          if (!hasTestTag) {
            this.manager.settings.TAGS = this.manager.settings.TAGS.filter((t) => t.id !== tag.id);
            this.manager.saveSettings();
            this.settingTab.tagDisplay();
            new import_obsidian18.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian18.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
          }
        })
      );
      const tagEl = this.manager.createTag(tag.name, tag.color, this.settings.TAG_STYLE);
      item.nameEl.appendChild(tagEl);
      item.nameEl.appendText(` [${tag.id}]`);
    });
  }
};

// src/settings/ui/manager-group.ts
var import_obsidian19 = require("obsidian");
var ManagerGroup = class extends BaseSetting {
  main() {
    let id = "";
    let name = "";
    let color = this.manager.generateAutoColor(this.manager.settings.GROUPS.map((g) => g.color));
    new import_obsidian19.Setting(this.containerEl).setHeading().setName(this.manager.translator.t("\u901A\u7528_\u65B0\u589E_\u6587\u672C")).addColorPicker(
      (cb) => cb.setValue(color).onChange((value) => {
        color = value;
      })
    ).addText(
      (cb) => cb.setPlaceholder("ID").onChange((value) => {
        id = value;
        this.manager.saveSettings();
      })
    ).addText(
      (cb) => cb.setPlaceholder(this.manager.translator.t("\u901A\u7528_\u540D\u79F0_\u6587\u672C")).onChange((value) => {
        name = value;
      })
    ).addExtraButton(
      (cb) => cb.setIcon("plus").onClick(() => {
        const containsId = this.manager.settings.GROUPS.some((tag) => tag.id === id);
        if (!containsId && id !== "") {
          if (color === "")
            color = this.manager.generateAutoColor(this.manager.settings.GROUPS.map((g) => g.color));
          this.manager.settings.GROUPS.push({ id, name, color });
          this.manager.saveSettings();
          this.settingTab.groupDisplay();
          command_default(this.app, this.manager);
          new import_obsidian19.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00"));
        } else {
          new import_obsidian19.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C"));
        }
      })
    );
    this.manager.settings.GROUPS.forEach((group, index) => {
      const item = new import_obsidian19.Setting(this.containerEl);
      item.settingEl.addClass("manager-setting-group__item");
      item.addColorPicker(
        (cb) => cb.setValue(group.color).onChange((value) => {
          group.color = value;
          this.manager.saveSettings();
          this.settingTab.groupDisplay();
        })
      );
      item.addText(
        (cb) => cb.setValue(group.name).onChange((value) => {
          group.name = value;
          this.manager.saveSettings();
        }).inputEl.addEventListener("blur", () => {
          this.settingTab.groupDisplay();
        })
      );
      item.addExtraButton(
        (cb) => cb.setIcon("trash-2").onClick(() => {
          const hasTestGroup = this.settings.Plugins.some((plugin) => plugin.group === group.id);
          if (!hasTestGroup) {
            this.manager.settings.GROUPS = this.manager.settings.GROUPS.filter((t) => t.id !== group.id);
            this.manager.saveSettings();
            this.settingTab.groupDisplay();
            command_default(this.app, this.manager);
            new import_obsidian19.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09"));
          } else {
            new import_obsidian19.Notice(this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB"));
          }
        })
      );
      const tagEl = this.manager.createTag(group.name, group.color, this.settings.GROUP_STYLE);
      item.nameEl.appendChild(tagEl);
      item.nameEl.appendText(` [${group.id}]`);
    });
  }
};

// src/settings/index.ts
var ManagerSettingTab = class extends import_obsidian20.PluginSettingTab {
  constructor(app, manager) {
    super(app, manager);
    this.manager = manager;
    this.app = app;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("manager-setting__container");
    const tabsEl = this.containerEl.createEl("div");
    tabsEl.addClass("manager-setting__tabs");
    this.contentEl = this.containerEl.createEl("div");
    this.contentEl.addClass("manager-setting__content");
    const tabItems = [
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.basisDisplay() },
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u6837\u5F0F\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.styleDisplay() },
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.groupDisplay() },
      { text: this.manager.translator.t("\u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.tagDisplay() }
    ];
    if (this.manager.settings.DELAY)
      tabItems.push({ text: this.manager.translator.t("\u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00"), content: () => this.delayDisplay() });
    const tabItemsEls = [];
    tabItems.forEach((item, index) => {
      const itemEl = tabsEl.createEl("div");
      itemEl.addClass("manager-setting__tabs-item");
      itemEl.textContent = item.text;
      tabItemsEls.push(itemEl);
      if (index === 0) {
        itemEl.addClass("manager-setting__tabs-item_is-active");
        item.content();
      }
      itemEl.addEventListener("click", () => {
        tabItemsEls.forEach((tabEl) => {
          tabEl.removeClass("manager-setting__tabs-item_is-active");
        });
        itemEl.addClass("manager-setting__tabs-item_is-active");
        item.content();
      });
    });
  }
  basisDisplay() {
    this.contentEl.empty();
    new ManagerBasis(this).display();
  }
  styleDisplay() {
    this.contentEl.empty();
    new ManagerBasis2(this).display();
  }
  delayDisplay() {
    this.contentEl.empty();
    new ManagerDelay(this).display();
  }
  groupDisplay() {
    this.contentEl.empty();
    new ManagerGroup(this).display();
  }
  tagDisplay() {
    this.contentEl.empty();
    new ManagerTag(this).display();
  }
};

// src/lang/locale/zh_cn.ts
var zh_cn_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "\u63D2\u4EF6\u7BA1\u7406\u5668",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\u6210\u529F",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\u5931\u8D25",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "\u65B0\u589E",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "\u64CD\u4F5C",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "\u641C\u7D22",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "\u540D\u79F0",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "\u5168\u90E8",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "\u5168\u90E8",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "\u65E0",
  \u901A\u7528_\u8FC7\u6EE4_\u6587\u672C: "\u8FC7\u6EE4",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "\u603B\u8BA1",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "\u542F\u7528",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "\u7981\u7528",
  \u901A\u7528_\u5173\u95ED_\u6587\u672C: "\u5173\u95ED",
  \u901A\u7528_\u5F00\u542F_\u6587\u672C: "\u5F00\u542F",
  \u901A\u7528_\u4FDD\u5B58_\u6587\u672C: "\u4FDD\u5B58\u8BBE\u7F6E",
  \u901A\u7528_\u53D6\u6D88_\u6587\u672C: "\u53D6\u6D88",
  \u901A\u7528_\u8FD4\u56DE_\u6587\u672C: "\u8FD4\u56DE",
  \u5BFC\u51FA_\u6B63\u6587\u63D0\u793A: "\u6B63\u6587\u533A\uFF1A\u8FD9\u91CC\u7684\u5185\u5BB9\u53EF\u81EA\u884C\u7F16\u8F91\u6216\u66FF\u6362\u3002",
  \u547D\u4EE4\u884C_\u542F\u7528_\u6587\u672C: "\u542F\u7528",
  \u547D\u4EE4\u884C_\u7981\u7528_\u6587\u672C: "\u7981\u7528",
  \u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C: "\u5206\u7EC4",
  \u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C: "\u4E00\u952E\u542F\u7528",
  \u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C: "\u4E00\u952E\u7981\u7528",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "\u8BBF\u95EE\u4ED3\u5E93",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "\u8BBF\u95EE\u89C6\u9891\u6559\u7A0B",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "\u542F\u7528\u7F16\u8F91\u6A21\u5F0F\uFF0C\u6DF1\u5EA6\u81EA\u5B9A\u4E49\u63D2\u4EF6\u914D\u7F6E",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "\u91CD\u8F7D\u63D2\u4EF6\uFF0C\u5373\u65F6\u751F\u6548",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5F00\u59CB\u63D0\u793A: "\u6B63\u5728\u91CD\u65B0\u8BFB\u53D6\u63D2\u4EF6\u6E05\u5355\u2026",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5931\u8D25\u63D0\u793A: "\u91CD\u8F7D\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\uFF08\u8BE6\u60C5\u89C1\u63A7\u5236\u53F0\uFF09\u3002",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\u68C0\u67E5\u63D2\u4EF6\u66F4\u65B0",
  \u7BA1\u7406\u5668_\u66F4\u591A\u64CD\u4F5C_\u63CF\u8FF0: "\u66F4\u591A\u64CD\u4F5C",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "\u4E00\u952E\u7981\u7528\u6240\u6709\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "\u4E00\u952E\u542F\u7528\u6240\u6709\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "\u7BA1\u7406\u63D2\u4EF6\u8BBE\u7F6E",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u4EC5\u663E\u793A\u5DF2\u542F\u7528\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u672A\u5206\u7EC4_\u63CF\u8FF0: "\u7B5B\u9009\u6240\u6709\u672A\u5206\u7EC4\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "\u6253\u5F00\u8BBE\u7F6E\u754C\u9762",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "\u8FD8\u539F\u521D\u59CB\u72B6\u6001",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "\u6253\u5F00\u63D2\u4EF6\u76EE\u5F55",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "\u5F7B\u5E95\u5220\u9664\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "\u5207\u6362\u63D2\u4EF6\u72B6\u6001",
  \u7BA1\u7406\u5668_\u81EA\u8EAB\u4E0D\u53EF\u7981\u7528_\u63D0\u793A: "BPM \u4E0D\u80FD\u7981\u7528\u81EA\u8EAB",
  \u7BA1\u7406\u5668_\u5355\u6B21\u542F\u52A8\u4E2D_\u63D0\u793A: "\u5F00\u542F\u4E2D\uFF0C\u8BF7\u7A0D\u7B49",
  \u7BA1\u7406\u5668_\u91CD\u542F\u4E2D_\u63D0\u793A: "\u91CD\u542F\u4E2D\uFF0C\u8BF7\u7A0D\u7B49",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u68C0\u6D4B\u4E2D_\u63D0\u793A: "\u6B63\u5728\u68C0\u6D4B\u4ED3\u5E93\u5730\u5740...",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u63D0\u793A: "\u6253\u5F00\u4ED3\u5E93\uFF1A{repo}",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u6807\u9898: "\u6253\u5F00\u4ED3\u5E93",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u672A\u8BB0\u5F55_\u63D0\u793A: "\u672A\u8BB0\u5F55\u4ED3\u5E93\u5730\u5740",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u9700\u624B\u52A8\u6DFB\u52A0_\u63D0\u793A: "\u672C\u63D2\u4EF6\u975E\u5B98\u65B9/bpm\u5B89\u88C5\uFF0C\u8BF7\u624B\u52A8\u6DFB\u52A0\u6765\u6E90",
  \u4E0B\u8F7D\u66F4\u65B0_\u7F3A\u5C11\u4ED3\u5E93\u63D0\u793A: "\u7F3A\u5C11\u4ED3\u5E93\u6765\u6E90\uFF0C\u65E0\u6CD5\u4E0B\u8F7D\u66F4\u65B0",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u9690\u85CFBPM\u6807\u7B7E_\u6807\u9898: "\u9690\u85CF\u201Cbpm\u5B89\u88C5\u201D\u6807\u7B7E",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u9690\u85CFBPM\u6807\u7B7E_\u63CF\u8FF0: "\u5F00\u542F\u540E\u5217\u8868\u4E0D\u663E\u793A\u81EA\u52A8\u6DFB\u52A0\u7684 bpm \u5B89\u88C5\u6807\u7B7E\uFF0C\u4EC5\u9690\u85CF\u5C55\u793A\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "\u542F\u52A8\u65F6\u68C0\u6D4B\u63D2\u4EF6\u66F4\u65B0",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\u6253\u5F00 BPM \u65F6\u81EA\u52A8\u68C0\u6D4B\u53EF\u66F4\u65B0\u63D2\u4EF6\uFF0C\u5E76\u5728\u53F3\u4E0A\u89D2\u63D0\u793A\u6570\u91CF\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u6807\u9898: "\u63D2\u4EF6\u4FE1\u606F\u5BFC\u51FA\u76EE\u5F55",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u63CF\u8FF0: "\u76F8\u5BF9\u5E93\u8DEF\u5F84\u7684\u6587\u4EF6\u5939\uFF0C\u7528\u4E8E\u5BFC\u51FA BPM \u63D2\u4EF6\u4FE1\u606F\uFF08\u652F\u6301 Base\uFF09\u3002\u4E0D\u4F1A\u5728\u8F93\u5165\u65F6\u7ACB\u523B\u5199\u5165\uFF0C\u9700\u70B9\u51FB\u201C\u4FDD\u5B58\u8BBE\u7F6E\u201D\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u793A\u4F8B: "\u4F8B\u5982: BPM-Export",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u63D0\u793A_\u6807\u9898: "\u524D\u7F6E\u7EA6\u5B9A\uFF08frontmatter \u952E\u540D\uFF09",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u63D0\u793A_\u63CF\u8FF0: "\u53EA\u8BFB: bpm_ro_id/name/group/tags/delay/installed_via_bpm\uFF1B\u53EF\u5199: bpm_rw_desc/note/enabled\uFF1B\u6761\u4EF6\u53EF\u5199: bpm_rwc_repo\uFF08\u4EC5\u5B98\u65B9\u672A\u5339\u914D\u4E14\u975E BPM \u5B89\u88C5\u65F6\uFF09\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u6807\u9898: "GitHub API Token",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u63CF\u8FF0: "\u7528\u4E8E\u4ECE GitHub \u4E0B\u8F7D\u63D2\u4EF6/\u4E3B\u9898\uFF0C\u907F\u514D\u9891\u7E41\u7684 API \u9650\u6D41\u3002\u53EF\u7559\u7A7A\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u6743\u9650: "\u9700\u8981\u6743\u9650\uFF1APublic repositories",
  \u5378\u8F7D_\u6807\u9898: "\u5378\u8F7D\u63D2\u4EF6",
  \u5378\u8F7D_\u63D0\u793A: "\u4F60\u786E\u5B9A\u8981\u5378\u8F7D\u6B64\u63D2\u4EF6\u5417\uFF1F\u8FD9\u5C06\u5220\u9664\u63D2\u4EF6\u7684\u6587\u4EF6\u5939\u3002",
  \u5378\u8F7D_\u5378\u8F7D: "\u5378\u8F7D",
  \u5378\u8F7D_\u53D6\u6D88: "\u53D6\u6D88",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "\u5378\u8F7D\u6210\u529F",
  \u4E00\u952E_\u6807\u9898: "\u4E00\u952E\u542F\u7528/\u7981\u7528\u63D2\u4EF6",
  \u4E00\u952E_\u63D0\u793A: "\u4F60\u786E\u5B9A\u8981\u4E00\u952E\u542F\u7528/\u7981\u7528\u6B64\u9875\u9762\u63D2\u4EF6\u5417\uFF1F\u8FD9\u5C06\u65E0\u6CD5\u6062\u590D\u3002(\u542F\u7528/\u7981\u7528\u8FC7\u7A0B\u4E2D\u8BF7\u8010\u5FC3\u7B49\u5F85)",
  \u4E00\u952E_\u542F\u7981: "\u542F\u7528/\u7981\u7528",
  \u4E00\u952E_\u53D6\u6D88: "\u53D6\u6D88",
  \u4E00\u952E_\u901A\u77E5_\u4E00: "\u542F\u7528/\u7981\u7528\u6210\u529F",
  \u83DC\u5355_\u7B14\u8BB0_\u6807\u9898: "\u7B14\u8BB0",
  \u83DC\u5355_\u5FEB\u6377\u952E_\u6807\u9898: "\u5FEB\u6377\u952E",
  \u83DC\u5355_GitHub_\u6807\u9898: "GitHub",
  \u83DC\u5355_\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "\u68C0\u6D4B\u63D2\u4EF6\u66F4\u65B0",
  \u83DC\u5355_\u5355\u6B21\u542F\u52A8_\u63CF\u8FF0: "\u5355\u6B21\u542F\u52A8",
  \u83DC\u5355_\u91CD\u542F\u63D2\u4EF6_\u63CF\u8FF0: "\u91CD\u542F\u63D2\u4EF6",
  \u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898: "\u9690\u85CF\u63D2\u4EF6",
  \u83DC\u5355_\u590D\u5236ID_\u6807\u9898: "\u590D\u5236ID",
  \u7BA1\u7406\u5668_\u5B89\u88C5_GITHUB_\u63CF\u8FF0: "\u5B89\u88C5\u63D2\u4EF6 / \u4E3B\u9898\uFF08GitHub \u4ED3\u5E93\uFF09",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ECB\u7ECD: "\u4ECE GitHub \u4ED3\u5E93\u5B89\u88C5\u63D2\u4EF6\u6216\u4E3B\u9898\uFF08\u8BFB\u53D6\u6700\u65B0\u53D1\u5E03\u8D44\u4EA7\uFF09\u3002",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u6807\u9898: "\u7C7B\u578B",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63CF\u8FF0: "\u9009\u62E9\u8981\u5B89\u88C5\u63D2\u4EF6\u6216\u4E3B\u9898",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63D2\u4EF6: "\u63D2\u4EF6",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u4E3B\u9898: "\u4E3B\u9898",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u6807\u9898: "\u4ED3\u5E93",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u63CF\u8FF0: "GitHub \u4ED3\u5E93\u8DEF\u5F84\uFF0C\u652F\u6301 <user>/<repo> \u548C https://github.com/<user>/<repo> \u4E24\u79CD\u5F62\u5F0F\u3002",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u5360\u4F4D: "user/repo",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93\u4E3A\u7A7A\u63D0\u793A: "\u8BF7\u8F93\u5165\u4ED3\u5E93\u8DEF\u5F84",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u6807\u9898: "\u7248\u672C",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u63CF\u8FF0: "\u70B9\u51FB\u83B7\u53D6 GitHub \u53D1\u5E03\u7248\u672C\u540E\u53EF\u9009\u62E9\uFF1B\u4E0D\u9009\u5219\u9ED8\u8BA4\u6700\u65B0\u3002",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u9ED8\u8BA4\u6700\u65B0: "\u6700\u65B0\u53D1\u5E03",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u6309\u94AE: "\u83B7\u53D6\u7248\u672C",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u4E2D: "\u83B7\u53D6\u4E2D...",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u7A7A\u63D0\u793A: "\u672A\u627E\u5230\u53D1\u884C\u7248\u672C\uFF0C\u5C1D\u8BD5\u624B\u52A8\u586B\u5199 tag",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u5931\u8D25\u63D0\u793A: "\u83B7\u53D6\u53D1\u884C\u7248\u672C\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u4ED3\u5E93\u6216\u7F51\u7EDC",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6807\u9898: "\u64CD\u4F5C",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6309\u94AE: "\u5F00\u59CB\u5B89\u88C5",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6807\u9898: "\u9009\u62E9\u7248\u672C",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u7248\u672C_\u6807\u9898: "\u7248\u672C",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u4E2D: "\u6B63\u5728\u83B7\u53D6\u53EF\u7528\u7248\u672C\u2026",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u5931\u8D25\u63D0\u793A: "\u83B7\u53D6\u7248\u672C\u5217\u8868\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u65E0\u7248\u672C\u63D0\u793A: "\u672A\u83B7\u53D6\u5230\u7248\u672C\u5217\u8868\uFF0C\u5C06\u5C1D\u8BD5\u4F7F\u7528\u68C0\u6D4B\u5230\u7684\u7248\u672C\u6216\u6700\u65B0\u7248\u672C\u3002",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u4E0B\u8F7D\u6309\u94AE: "\u4E0B\u8F7D\u66F4\u65B0",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6210\u529F\u63D0\u793A: "\u5DF2\u4E0B\u8F7D\u5E76\u66F4\u65B0\u63D2\u4EF6",
  \u901A\u77E5_ID\u5DF2\u590D\u5236: "ID\u5DF2\u590D\u5236",
  \u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0: "\u5168\u90E8",
  \u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u4EC5\u542F\u7528",
  \u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0: "\u4EC5\u7981\u7528",
  \u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0: "\u5DF2\u5206\u7EC4",
  \u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0: "\u672A\u5206\u7EC4",
  \u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0: "\u6709\u6807\u7B7E",
  \u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0: "\u65E0\u6807\u7B7E",
  \u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0: "\u6709\u7B14\u8BB0",
  \u7B5B\u9009_\u72B6\u6001_\u5168\u90E8: "\u72B6\u6001\uFF1A\u5168\u90E8",
  \u7B5B\u9009_\u5206\u7EC4_\u5168\u90E8: "\u5206\u7EC4\uFF1A\u5168\u90E8",
  \u7B5B\u9009_\u6807\u7B7E_\u5168\u90E8: "\u6807\u7B7E\uFF1A\u5168\u90E8",
  \u7B5B\u9009_\u5EF6\u8FDF_\u5168\u90E8: "\u5EF6\u8FDF\uFF1A\u5168\u90E8",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\u57FA\u7840",
  \u8BBE\u7F6E_\u6837\u5F0F\u8BBE\u7F6E_\u524D\u7F00: "\u6837\u5F0F",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "\u5206\u7EC4",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "\u6807\u7B7E",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "\u5EF6\u8FDF",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "\u8BED\u8A00\u8BBE\u7F6E",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "\u9009\u62E9\u60A8\u559C\u6B22\u7684\u8BED\u8A00\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898: "\u754C\u9762\u5C45\u4E2D",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0: "\u8BBE\u7F6E\u7BA1\u7406\u5668\u754C\u9762\u662F\u5426\u5C45\u4E2D",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "\u76EE\u5F55\u6837\u5F0F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "\u9009\u62E9\u5206\u7EC4\u7684\u6837\u5F0F\uFF0C\u4EE5\u63D0\u5347\u6D4F\u89C8\u4F53\u9A8C\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E00: "\u59CB\u7EC8\u5C55\u5F00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E8C: "\u6C38\u4E0D\u5C55\u5F00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E09: "\u60AC\u6D6E\u5C55\u5F00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u56DB: "\u5355\u51FB\u5C55\u5F00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "\u5206\u7EC4\u6837\u5F0F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "\u9009\u62E9\u5206\u7EC4\u7684\u6837\u5F0F\uFF0C\u4F7F\u5206\u7EC4\u66F4\u52A0\u660E\u663E\uFF0C\u4FBF\u4E8E\u8BC6\u522B\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E00: "\u6837\u5F0F\u4E00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E8C: "\u6837\u5F0F\u4E8C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E09: "\u6837\u5F0F\u4E09",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u56DB: "\u6837\u5F0F\u56DB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "\u6807\u7B7E\u6837\u5F0F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "\u9009\u62E9\u6807\u7B7E\u7684\u6837\u5F0F\uFF0C\u4F7F\u6807\u7B7E\u66F4\u52A0\u660E\u663E\uFF0C\u4FBF\u4E8E\u8BC6\u522B\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E00: "\u6837\u5F0F\u4E00",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E8C: "\u6837\u5F0F\u4E8C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E09: "\u6837\u5F0F\u4E09",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u56DB: "\u6837\u5F0F\u56DB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "\u5EF6\u65F6\u542F\u52A8",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "\u542F\u7528\u5EF6\u65F6\u542F\u52A8\u529F\u80FD\u53EF\u4EE5\u4F18\u5316\u52A0\u8F7D\u987A\u5E8F\uFF0C\u4F46\u8BF7\u6CE8\u610F\uFF0C\u8FD9\u53EF\u80FD\u4F1A\u5BFC\u81F4\u67D0\u4E9B\u63D2\u4EF6\u51FA\u73B0\u517C\u5BB9\u6027\u95EE\u9898\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "\u6DE1\u5316\u63D2\u4EF6",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "\u4E3A\u672A\u542F\u7528\u7684\u63D2\u4EF6\u63D0\u4F9B\u89C6\u89C9\u6DE1\u5316\u6548\u679C\uFF0C\u4EE5\u4FBF\u6E05\u6670\u5730\u533A\u5206\u542F\u7528\u548C\u672A\u542F\u7528\u7684\u63D2\u4EF6\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898: "\u7B5B\u9009\u6301\u4E45\u5316",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0: "\u542F\u7528\u540E\uFF0C\u60A8\u5C06\u5728\u6BCF\u6B21\u6253\u5F00\u7BA1\u7406\u5668\u65F6\u770B\u5230\u76F8\u540C\u7684\u63D2\u4EF6\u5217\u8868\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "\u5355\u72EC\u63A7\u5236\u63D2\u4EF6\u547D\u4EE4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "\u542F\u7528\u6B64\u9009\u9879\u53EF\u4EE5\u5355\u72EC\u63A7\u5236\u6BCF\u4E2A\u63D2\u4EF6\u7684\u542F\u7528\u548C\u7981\u7528\u72B6\u6001\u3002(\u91CD\u542FObsidian\u751F\u6548)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "\u5206\u7EC4\u63A7\u5236\u63D2\u4EF6\u547D\u4EE4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "\u542F\u7528\u6B64\u9009\u9879\u53EF\u4EE5\u4E00\u952E\u542F\u7528\u6216\u7981\u7528\u6307\u5B9A\u5206\u7EC4\u4E2D\u7684\u6240\u6709\u63D2\u4EF6\u3002(\u91CD\u542FObsidian\u751F\u6548)",
  \u6807\u7B7E_BPM\u5B89\u88C5_\u540D\u79F0: "bpm\u5B89\u88C5",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u5EF6\u8FDF] \u5DF2\u6DFB\u52A0",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u5EF6\u8FDF] ID\u5DF2\u5B58\u5728\u6216\u4E3A\u7A7A",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u5EF6\u8FDF] \u5220\u9664\u6210\u529F",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u5EF6\u8FDF] \u5220\u9664\u5931\u8D25\uFF0C\u6B64\u5EF6\u8FDF\u4E0B\u5B58\u5728\u63D2\u4EF6",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u5206\u7EC4] \u5DF2\u6DFB\u52A0",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u5206\u7EC4] ID\u5DF2\u5B58\u5728\u6216\u4E3A\u7A7A",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u5206\u7EC4] \u5220\u9664\u6210\u529F",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u5206\u7EC4] \u5220\u9664\u5931\u8D25\uFF0C\u6B64\u5206\u7EC4\u4E0B\u5B58\u5728\u63D2\u4EF6",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u6807\u7B7E] \u5DF2\u6DFB\u52A0",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u6807\u7B7E] ID\u5DF2\u5B58\u5728\u6216\u4E3A\u7A7A",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u6807\u7B7E] \u5220\u9664\u6210\u529F",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u6807\u7B7E] \u5220\u9664\u5931\u8D25\uFF0C\u6B64\u6807\u7B7E\u4E0B\u5B58\u5728\u63D2\u4EF6",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "\u5982\u679C\u9047\u5230\u672C\u63D2\u4EF6\u4E0E\u5176\u4ED6\u63D2\u4EF6\u51B2\u7A81",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "\u4E2A\u4EBA\u80FD\u529B\u6709\u9650\uFF0C\u65E0\u6CD5\u4FEE\u590D\u6B64\u95EE\u9898\uFF0C\u8BF7\u5173\u95ED\u5EF6\u65F6\u542F\u52A8\uFF0C\u5373\u53EF\u89E3\u51B3\u4E00\u5207\u51B2\u7A81\u95EE\u9898\u3002",
  \u901A\u77E5_\u68C0\u6D4B\u66F4\u65B0\u4E2D\u6587\u6848: "\u68C0\u6D4B\u63D2\u4EF6\u66F4\u65B0\u60C5\u51B5\u4E2D...",
  \u901A\u77E5_\u68C0\u67E5\u66F4\u65B0\u5931\u8D25_\u5EFA\u8BAEToken: "\u7F51\u7EDC\u6216 API \u53D7\u9650\uFF0C\u5EFA\u8BAE\u5148\u914D\u7F6E GitHub Token\uFF08Public repositories \u6743\u9650\uFF09\u3002",
  \u901A\u77E5_\u53EF\u66F4\u65B0\u6570\u91CF: "\u53D1\u73B0 {count} \u4E2A\u63D2\u4EF6\u53EF\u66F4\u65B0",
  \u901A\u77E5_\u83B7\u53D6\u7248\u672C\u4E2D\u6587\u6848: "\u6B63\u5728\u83B7\u53D6\u4E91\u7AEF\u7248\u672C\u4FE1\u606F\u2026",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "\u5F00\u542F\u63D2\u4EF6\u7BA1\u7406\u5668",
  \u7BA1\u7406\u5668_\u4E0B\u8F7D\u66F4\u65B0_\u63CF\u8FF0: "\u4E0B\u8F7D\u6307\u5B9A\u7248\u672C\u66F4\u65B0\uFF08\u652F\u6301\u9884\u53D1\u5E03\uFF09",
  \u5B89\u88C5_\u6210\u529F_\u63D0\u793A: "\u5DF2\u5B89\u88C5/\u66F4\u65B0\u63D2\u4EF6\uFF1A",
  \u5B89\u88C5_\u9519\u8BEF_\u9650\u901F: "GitHub \u8BF7\u6C42\u53D7\u9650\uFF08403\uFF09\uFF0C\u8BF7\u914D\u7F6E GitHub Token \u540E\u91CD\u8BD5\u3002",
  \u5B89\u88C5_\u9519\u8BEF_\u7F3A\u5C11\u8D44\u6E90: "\u672A\u627E\u5230\u53D1\u5E03\u8D44\u6E90\u6216\u6587\u4EF6\uFF0C\u8BF7\u68C0\u67E5\u4ED3\u5E93/\u7248\u672C\u662F\u5426\u5B58\u5728\u3002",
  \u5B89\u88C5_\u9519\u8BEF_\u901A\u7528: "\u5B89\u88C5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u4ED3\u5E93\u5730\u5740/\u7248\u672C\u6216\u7F51\u7EDC\u72B6\u6001\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8C03\u8BD5\u6A21\u5F0F_\u6807\u9898: "\u8C03\u8BD5\u6A21\u5F0F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8C03\u8BD5\u6A21\u5F0F_\u63CF\u8FF0: "\u5F00\u542F\u540E\u6253\u5370\u8C03\u8BD5\u65E5\u5FD7\uFF0C\u5173\u95ED\u65F6\u4EC5\u8F93\u51FA\u9519\u8BEF\u4FE1\u606F\u3002",
  // 插件冲突排查
  \u6392\u67E5_\u6B22\u8FCE_\u6807\u9898: "\u{1F50D} \u63D2\u4EF6\u51B2\u7A81\u6392\u67E5\u5411\u5BFC",
  \u6392\u67E5_\u6B22\u8FCE_\u8BF4\u660E: "\u6B64\u5411\u5BFC\u5C06\u5E2E\u52A9\u60A8\u901A\u8FC7\u4E8C\u5206\u6CD5\u5FEB\u901F\u5B9A\u4F4D\u4E24\u4E2A\u51B2\u7A81\u7684\u63D2\u4EF6\u3002\u6392\u67E5\u8FC7\u7A0B\u4E2D\u4F1A\u4E34\u65F6\u7981\u7528/\u542F\u7528\u63D2\u4EF6\uFF0C\u5B8C\u6210\u540E\u53EF\u6062\u590D\u539F\u59CB\u72B6\u6001\u3002",
  \u6392\u67E5_\u5F53\u524D\u542F\u7528_\u6587\u672C: "\u5F53\u524D\u542F\u7528\u7684\u63D2\u4EF6",
  \u6392\u67E5_\u9884\u8BA1\u6B65\u9AA4_\u6587\u672C: "\u9884\u8BA1\u6392\u67E5\u6B65\u9AA4",
  \u6392\u67E5_\u5F00\u59CB_\u6309\u94AE: "\u5F00\u59CB\u6392\u67E5",
  \u6392\u67E5_\u53D6\u6D88_\u6309\u94AE: "\u53D6\u6D88",
  \u6392\u67E5_\u6B65\u9AA4_\u6587\u672C: "\u6B65\u9AA4",
  \u6392\u67E5_\u9636\u6BB5_\u786E\u8BA4: "\u9636\u6BB5 1: \u786E\u8BA4\u662F\u63D2\u4EF6\u95EE\u9898\uFF08\u5DF2\u7981\u7528\u6240\u6709\u63D2\u4EF6\uFF09",
  \u6392\u67E5_\u9636\u6BB5_\u67E5\u627E\u7B2C\u4E00: "\u9636\u6BB5 2: \u4E8C\u5206\u5B9A\u4F4D\u7B2C\u4E00\u4E2A\u5ACC\u7591\u63D2\u4EF6",
  \u6392\u67E5_\u9636\u6BB5_\u67E5\u627E\u7B2C\u4E8C: "\u9636\u6BB5 3: \u4E8C\u5206\u5B9A\u4F4D\u7B2C\u4E8C\u4E2A\u51B2\u7A81\u63D2\u4EF6",
  \u6392\u67E5_\u7B2C\u4E00\u51B2\u7A81_\u6587\u672C: "\u7B2C\u4E00\u4E2A\u51B2\u7A81\u63D2\u4EF6",
  \u6392\u67E5_\u5DF2\u542F\u7528_\u6587\u672C: "\u5DF2\u542F\u7528",
  \u6392\u67E5_\u5DF2\u7981\u7528_\u6587\u672C: "\u5DF2\u7981\u7528",
  \u6392\u67E5_\u6D4B\u8BD5\u63D0\u793A_\u6587\u672C: "\u8BF7\u6D4B\u8BD5\u95EE\u9898\u662F\u5426\u8FD8\u5B58\u5728\uFF0C\u7136\u540E\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\uFF1A",
  \u6392\u67E5_\u95EE\u9898\u8FD8\u5728_\u6309\u94AE: "\u95EE\u9898\u8FD8\u5728",
  \u6392\u67E5_\u95EE\u9898\u6D88\u5931_\u6309\u94AE: "\u95EE\u9898\u6D88\u5931\u4E86",
  \u6392\u67E5_\u91CD\u542F_\u6309\u94AE: "\u91CD\u542F Obsidian",
  \u6392\u67E5_\u64A4\u9500_\u6309\u94AE: "\u64A4\u9500\u4E0A\u4E00\u6B65",
  \u6392\u67E5_\u9000\u51FA_\u6309\u94AE: "\u9000\u51FA\u6392\u67E5",
  \u6392\u67E5_\u5DF2\u7981\u7528\u6240\u6709_\u901A\u77E5: "\u5DF2\u7981\u7528\u6240\u6709\u63D2\u4EF6\uFF0C\u8BF7\u6D4B\u8BD5\u95EE\u9898\u662F\u5426\u8FD8\u5B58\u5728",
  \u6392\u67E5_\u975E\u63D2\u4EF6\u95EE\u9898_\u901A\u77E5: "\u7981\u7528\u6240\u6709\u63D2\u4EF6\u540E\u95EE\u9898\u4F9D\u7136\u5B58\u5728\uFF0C\u8FD9\u53EF\u80FD\u4E0D\u662F\u63D2\u4EF6\u51B2\u7A81\u95EE\u9898",
  \u6392\u67E5_\u5DF2\u64A4\u9500_\u901A\u77E5: "\u5DF2\u64A4\u9500\u5230\u4E0A\u4E00\u6B65",
  \u6392\u67E5_\u65E0\u6CD5\u5B9A\u4F4D_\u901A\u77E5: "\u65E0\u6CD5\u5B9A\u4F4D\u51B2\u7A81\u63D2\u4EF6\uFF0C\u53EF\u80FD\u662F\u66F4\u590D\u6742\u7684\u591A\u63D2\u4EF6\u51B2\u7A81",
  \u6392\u67E5_\u9000\u51FA\u786E\u8BA4_\u6807\u9898: "\u9000\u51FA\u6392\u67E5",
  \u6392\u67E5_\u9000\u51FA\u786E\u8BA4_\u6587\u672C: "\u60A8\u786E\u5B9A\u8981\u9000\u51FA\u6392\u67E5\u5417\uFF1F\u53EF\u4EE5\u9009\u62E9\u6062\u590D\u539F\u59CB\u63D2\u4EF6\u72B6\u6001\u6216\u4FDD\u6301\u5F53\u524D\u72B6\u6001\u3002",
  \u6392\u67E5_\u6062\u590D\u5E76\u9000\u51FA_\u6309\u94AE: "\u6062\u590D\u539F\u59CB\u72B6\u6001\u5E76\u9000\u51FA",
  \u6392\u67E5_\u4FDD\u6301\u5E76\u9000\u51FA_\u6309\u94AE: "\u4FDD\u6301\u5F53\u524D\u72B6\u6001\u5E76\u9000\u51FA",
  \u6392\u67E5_\u7EE7\u7EED\u6392\u67E5_\u6309\u94AE: "\u7EE7\u7EED\u6392\u67E5",
  \u6392\u67E5_\u5B8C\u6210_\u6807\u9898: "\u6392\u67E5\u5B8C\u6210",
  \u6392\u67E5_\u53D1\u73B0\u51B2\u7A81_\u6587\u672C: "\u53D1\u73B0\u51B2\u7A81\u63D2\u4EF6\u7EC4\u5408",
  \u6392\u67E5_\u5EFA\u8BAE_\u6807\u9898: "\u5EFA\u8BAE\u64CD\u4F5C",
  \u6392\u67E5_\u5EFA\u8BAE1_\u6587\u672C: "\u68C0\u67E5\u4E24\u4E2A\u63D2\u4EF6\u7684 GitHub Issues \u770B\u662F\u5426\u6709\u5DF2\u77E5\u51B2\u7A81",
  \u6392\u67E5_\u5EFA\u8BAE2_\u6587\u672C: "\u5C1D\u8BD5\u66F4\u65B0\u5176\u4E2D\u4E00\u4E2A\u6216\u4E24\u4E2A\u63D2\u4EF6\u5230\u6700\u65B0\u7248\u672C",
  \u6392\u67E5_\u5EFA\u8BAE3_\u6587\u672C: "\u6682\u65F6\u7981\u7528\u5176\u4E2D\u4E00\u4E2A\u51B2\u7A81\u7684\u63D2\u4EF6",
  \u6392\u67E5_\u603B\u6B65\u9AA4_\u6587\u672C: "\u6392\u67E5\u603B\u6B65\u9AA4",
  \u6392\u67E5_\u6062\u590D\u539F\u59CB_\u6309\u94AE: "\u6062\u590D\u539F\u59CB\u72B6\u6001",
  \u6392\u67E5_\u4FDD\u6301\u5F53\u524D_\u6309\u94AE: "\u4FDD\u6301\u5F53\u524D\u72B6\u6001",
  \u6392\u67E5_\u751F\u6210\u62A5\u544A_\u6309\u94AE: "\u751F\u6210\u62A5\u544A",
  \u6392\u67E5_\u5DF2\u6062\u590D_\u901A\u77E5: "\u5DF2\u6062\u590D\u539F\u59CB\u63D2\u4EF6\u72B6\u6001",
  \u6392\u67E5_\u65E0\u7ED3\u679C_\u901A\u77E5: "\u6CA1\u6709\u6392\u67E5\u7ED3\u679C\u53EF\u751F\u6210\u62A5\u544A",
  \u6392\u67E5_\u62A5\u544A\u5DF2\u751F\u6210_\u901A\u77E5: "\u6392\u67E5\u62A5\u544A\u5DF2\u751F\u6210",
  \u6392\u67E5_\u62A5\u544A\u5931\u8D25_\u901A\u77E5: "\u751F\u6210\u62A5\u544A\u5931\u8D25",
  \u6392\u67E5_\u6309\u94AE_\u63CF\u8FF0: "\u6392\u67E5\u63D2\u4EF6\u51B2\u7A81",
  // 报告模板
  \u62A5\u544A_\u5355\u63D2\u4EF6_\u6807\u9898: "\u63D2\u4EF6\u95EE\u9898\u62A5\u544A",
  \u62A5\u544A_\u51B2\u7A81_\u6807\u9898: "\u63D2\u4EF6\u51B2\u7A81\u62A5\u544A",
  \u62A5\u544A_\u751F\u6210\u8BF4\u660E: "\u7531 **Better Plugins Manager** \u751F\u6210\u4E8E",
  \u62A5\u544A_\u53D1\u73B0\u95EE\u9898\u63D2\u4EF6: "\u53D1\u73B0\u95EE\u9898\u63D2\u4EF6",
  \u62A5\u544A_\u53D1\u73B0\u51B2\u7A81: "\u53D1\u73B0\u51B2\u7A81",
  \u62A5\u544A_\u63D2\u4EF6: "\u63D2\u4EF6",
  \u62A5\u544A_\u63D2\u4EF61: "\u63D2\u4EF6 1",
  \u62A5\u544A_\u63D2\u4EF62: "\u63D2\u4EF6 2",
  \u62A5\u544A_\u6392\u67E5\u6458\u8981: "\u6392\u67E5\u6458\u8981",
  \u62A5\u544A_\u603B\u6B65\u9AA4: "\u603B\u6B65\u9AA4\u6570",
  \u62A5\u544A_\u7ED3\u679C\u7C7B\u578B: "\u7ED3\u679C\u7C7B\u578B",
  \u62A5\u544A_\u5355\u63D2\u4EF6\u95EE\u9898: "\u5355\u63D2\u4EF6\u95EE\u9898",
  \u62A5\u544A_\u51B2\u7A81\u5BF9: "\u63D2\u4EF6\u51B2\u7A81\u5BF9",
  \u62A5\u544A_\u539F\u59CB\u542F\u7528\u6570: "\u539F\u59CB\u542F\u7528\u63D2\u4EF6\u6570",
  \u62A5\u544A_\u5EFA\u8BAE\u64CD\u4F5C: "\u5EFA\u8BAE\u64CD\u4F5C",
  \u62A5\u544A_\u5355\u63D2\u4EF6\u5EFA\u8BAE1: "\u5C1D\u8BD5\u5C06\u6B64\u63D2\u4EF6\u66F4\u65B0\u5230\u6700\u65B0\u7248\u672C",
  \u62A5\u544A_\u5355\u63D2\u4EF6\u5EFA\u8BAE2: "\u68C0\u67E5\u63D2\u4EF6\u7684 GitHub Issues \u662F\u5426\u6709\u76F8\u5173\u95EE\u9898",
  \u62A5\u544A_\u5355\u63D2\u4EF6\u5EFA\u8BAE3: "\u8054\u7CFB\u63D2\u4EF6\u4F5C\u8005\u62A5\u544A\u95EE\u9898",
  \u62A5\u544A_\u5355\u63D2\u4EF6\u5EFA\u8BAE4: "\u6682\u65F6\u7981\u7528\u6B64\u63D2\u4EF6",
  \u62A5\u544A_\u51B2\u7A81\u5EFA\u8BAE1: "\u68C0\u67E5\u4E24\u4E2A\u63D2\u4EF6\u7684 GitHub Issues \u770B\u662F\u5426\u6709\u5DF2\u77E5\u51B2\u7A81",
  \u62A5\u544A_\u51B2\u7A81\u5EFA\u8BAE2: "\u5C1D\u8BD5\u66F4\u65B0\u5176\u4E2D\u4E00\u4E2A\u6216\u4E24\u4E2A\u63D2\u4EF6\u5230\u6700\u65B0\u7248\u672C",
  \u62A5\u544A_\u51B2\u7A81\u5EFA\u8BAE3: "\u6682\u65F6\u7981\u7528\u5176\u4E2D\u4E00\u4E2A\u51B2\u7A81\u7684\u63D2\u4EF6",
  \u62A5\u544A_\u51B2\u7A81\u5EFA\u8BAE4: "\u5411\u63D2\u4EF6\u4F5C\u8005\u62A5\u544A\u6B64\u95EE\u9898",
  \u62A5\u544A_\u5907\u6CE8: "\u5907\u6CE8",
  \u62A5\u544A_\u5907\u6CE8\u63D0\u793A: "*\u5728\u6B64\u6DFB\u52A0\u60A8\u7684\u5907\u6CE8...*",
  \u62A5\u544A_\u6280\u672F\u8BE6\u60C5: "\u6280\u672F\u8BE6\u60C5",
  \u62A5\u544A_\u539F\u59CB\u542F\u7528\u5217\u8868: "\u539F\u59CB\u542F\u7528\u7684\u63D2\u4EF6\u5217\u8868",
  // 自检
  \u81EA\u68C0_\u68C0\u6D4B\u5230\u63D2\u4EF6_\u6807\u9898: "\u68C0\u6D4B\u5230\u975E BPM \u7BA1\u7406\u7684\u63D2\u4EF6",
  \u81EA\u68C0_\u68C0\u6D4B\u5230\u63D2\u4EF6_\u8BF4\u660E: "Obsidian \u7684 community-plugins.json \u4E2D\u5B58\u5728\u7531 Obsidian \u672C\u4F53\u542F\u52A8\u7684\u63D2\u4EF6\u3002\u4E3A\u907F\u514D BPM \u4E0E Obsidian \u540C\u65F6\u63A7\u5236\u63D2\u4EF6\u5BFC\u81F4\u51B2\u7A81\uFF0C\u5EFA\u8BAE\u8BA9 BPM \u63A5\u7BA1\u8FD9\u4E9B\u63D2\u4EF6\u7684\u63A7\u5236\u6743\u3002",
  \u81EA\u68C0_\u68C0\u6D4B\u5230\u63D2\u4EF6_\u5217\u8868: "\u68C0\u6D4B\u5230\u4EE5\u4E0B\u63D2\u4EF6\uFF1A",
  \u81EA\u68C0_\u8B66\u544A_\u6587\u672C: "\u5982\u679C\u9009\u62E9\u5FFD\u7565\uFF0C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u63D2\u4EF6\u542F\u7528\u72B6\u6001\u4E0D\u4E00\u81F4\u6216\u5EF6\u8FDF\u542F\u52A8\u529F\u80FD\u5931\u6548\u3002",
  \u81EA\u68C0_\u63A5\u7BA1_\u6309\u94AE: "\u8BA9 BPM \u63A5\u7BA1",
  \u81EA\u68C0_\u5FFD\u7565_\u6309\u94AE: "\u672C\u6B21\u5FFD\u7565",
  \u81EA\u68C0_\u4E0D\u518D\u63D0\u793A_\u6309\u94AE: "\u4E0D\u518D\u63D0\u793A",
  \u81EA\u68C0_\u63A5\u7BA1\u6210\u529F_\u901A\u77E5: "\u5DF2\u6210\u529F\u63A5\u7BA1\u63D2\u4EF6\u63A7\u5236",
  \u81EA\u68C0_\u63A5\u7BA1\u5931\u8D25_\u901A\u77E5: "\u63A5\u7BA1\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u4FEE\u6539 community-plugins.json",
  \u81EA\u68C0_\u9700\u8981\u91CD\u542F_\u901A\u77E5: "\u5EFA\u8BAE\u91CD\u542F Obsidian \u4EE5\u786E\u4FDD\u66F4\u6539\u751F\u6548",
  \u81EA\u68C0_\u5FFD\u7565\u8B66\u544A_\u901A\u77E5: "\u5DF2\u5FFD\u7565\u8B66\u544A\uFF0C\u540C\u65F6\u4F7F\u7528 Obsidian \u548C BPM \u7BA1\u7406\u63D2\u4EF6\u53EF\u80FD\u5BFC\u81F4\u95EE\u9898",
  \u81EA\u68C0_\u4E0D\u518D\u63D0\u793A\u786E\u8BA4_\u901A\u77E5: "\u5DF2\u8BBE\u7F6E\u4E0D\u518D\u63D0\u793A\uFF0C\u53EF\u5728\u8BBE\u7F6E\u4E2D\u91CD\u65B0\u542F\u7528"
};

// src/lang/locale/en.ts
var en_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "Plugin Manager",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "Success",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "Failure",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "Add",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "Operation",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "Search",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "Name",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "ALL",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "ALL",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "No Delay",
  \u901A\u7528_\u8FC7\u6EE4_\u6587\u672C: "Filter",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "Total",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "Enable",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "Disable",
  \u901A\u7528_\u5173\u95ED_\u6587\u672C: "Disable",
  \u901A\u7528_\u5F00\u542F_\u6587\u672C: "Enable",
  \u901A\u7528_\u4FDD\u5B58_\u6587\u672C: "Save settings",
  \u901A\u7528_\u53D6\u6D88_\u6587\u672C: "Cancel",
  \u901A\u7528_\u8FD4\u56DE_\u6587\u672C: "Back",
  \u5BFC\u51FA_\u6B63\u6587\u63D0\u793A: "Body section: you can edit or replace this content.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u9690\u85CFBPM\u6807\u7B7E_\u6807\u9898: "Hide \u201Cbpm install\u201D tag",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u9690\u85CFBPM\u6807\u7B7E_\u63CF\u8FF0: "Hide the auto-added bpm install tag in the list (only hide display, keep mark).",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u6807\u9898: "Export directory for plugin info",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u63CF\u8FF0: "Relative vault path to export BPM plugin info (for Base). Changes apply when clicking \u201CSave settings\u201D.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u793A\u4F8B: "e.g., BPM-Export",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u63D0\u793A_\u6807\u9898: "Frontmatter conventions",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u63D0\u793A_\u63CF\u8FF0: "Read-only: bpm_ro_id/name/group/tags/delay/installed_via_bpm; writable: bpm_rw_desc/note/enabled; conditional: bpm_rwc_repo (only when official match is missing and not BPM-installed).",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u6807\u9898: "GitHub API Token",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u63CF\u8FF0: "Used to download plugins/themes from GitHub and reduce rate limits. Optional.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u6743\u9650: "Required scope: Public repositories",
  \u547D\u4EE4\u884C_\u542F\u7528_\u6587\u672C: "Enable",
  \u547D\u4EE4\u884C_\u7981\u7528_\u6587\u672C: "Disable",
  \u547D\u4EE4\u884C_\u5206\u7EC4_\u6587\u672C: "Group",
  \u547D\u4EE4\u884C_\u4E00\u952E\u542F\u7528_\u6587\u672C: "One - click Enable",
  \u547D\u4EE4\u884C_\u4E00\u952E\u7981\u7528_\u6587\u672C: "One - click Disable",
  \u83DC\u5355_\u7B14\u8BB0_\u6807\u9898: "Note",
  \u83DC\u5355_\u5FEB\u6377\u952E_\u6807\u9898: "Hotkeys",
  \u83DC\u5355_GitHub_\u6807\u9898: "GitHub",
  \u83DC\u5355_\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "Check update",
  \u83DC\u5355_\u5355\u6B21\u542F\u52A8_\u63CF\u8FF0: "Single start",
  \u83DC\u5355_\u91CD\u542F\u63D2\u4EF6_\u63CF\u8FF0: "Restart plugin",
  \u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898: "Hide plugin",
  \u83DC\u5355_\u590D\u5236ID_\u6807\u9898: "Copy ID",
  \u7BA1\u7406\u5668_\u5B89\u88C5_GITHUB_\u63CF\u8FF0: "Install plugin / theme (GitHub repo)",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ECB\u7ECD: "Install plugins or themes from GitHub releases (reads latest assets).",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u6807\u9898: "Type",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63CF\u8FF0: "Choose to install a plugin or a theme.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63D2\u4EF6: "Plugin",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u4E3B\u9898: "Theme",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u6807\u9898: "Repository",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u63CF\u8FF0: "GitHub path, supports <user>/<repo> or https://github.com/<user>/<repo>.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u5360\u4F4D: "user/repo",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93\u4E3A\u7A7A\u63D0\u793A: "Please enter a repository path",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u6807\u9898: "Version",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u63CF\u8FF0: "Click to fetch releases, then choose; empty = latest.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u9ED8\u8BA4\u6700\u65B0: "Latest release",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u6309\u94AE: "Fetch versions",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u4E2D: "Fetching...",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u7A7A\u63D0\u793A: "No releases found, try typing a tag manually.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u5931\u8D25\u63D0\u793A: "Failed to fetch releases, check repo or network.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6807\u9898: "Action",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6309\u94AE: "Install now",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6807\u9898: "Select version",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u7248\u672C_\u6807\u9898: "Version",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u4E2D: "Fetching available versions\u2026",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u5931\u8D25\u63D0\u793A: "Failed to fetch version list. Please try again later.",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u65E0\u7248\u672C\u63D0\u793A: "No version list available. Will try the detected or latest version.",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u4E0B\u8F7D\u6309\u94AE: "Download update",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6210\u529F\u63D0\u793A: "Downloaded and updated plugin",
  \u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0: "All",
  \u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Enabled only",
  \u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0: "Disabled only",
  \u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0: "Grouped",
  \u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0: "Ungrouped",
  \u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0: "With tags",
  \u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0: "Without tags",
  \u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0: "With notes",
  \u7B5B\u9009_\u72B6\u6001_\u5168\u90E8: "Status: All",
  \u7B5B\u9009_\u5206\u7EC4_\u5168\u90E8: "Groups: All",
  \u7B5B\u9009_\u6807\u7B7E_\u5168\u90E8: "Tags: All",
  \u7B5B\u9009_\u5EF6\u8FDF_\u5168\u90E8: "Delay: All",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "Visit Repository",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "Access video tutorials",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "Enable edit mode for in-depth plugin configuration customization",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "Reload plugins to take effect immediately",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5F00\u59CB\u63D0\u793A: "Refreshing plugin manifests\u2026",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5931\u8D25\u63D0\u793A: "Reload failed. Please try again (see console for details).",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "Check for plugin updates",
  \u7BA1\u7406\u5668_\u66F4\u591A\u64CD\u4F5C_\u63CF\u8FF0: "More actions",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "Disable all plugins at once",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "Enable all plugins at once",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "Manage plugin settings",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Only display enabled plugins",
  \u7BA1\u7406\u5668_\u672A\u5206\u7EC4_\u63CF\u8FF0: "Filter all ungrouped plugins",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "Open the settings interface",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "Restore to the initial state",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "Open the plugin directory",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "Completely delete the plugin",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "Toggle the plugin status",
  \u7BA1\u7406\u5668_\u81EA\u8EAB\u4E0D\u53EF\u7981\u7528_\u63D0\u793A: "BPM cannot disable itself",
  \u7BA1\u7406\u5668_\u5355\u6B21\u542F\u52A8\u4E2D_\u63D0\u793A: "Enabling\u2026 please wait",
  \u7BA1\u7406\u5668_\u91CD\u542F\u4E2D_\u63D0\u793A: "Restarting\u2026 please wait",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u68C0\u6D4B\u4E2D_\u63D0\u793A: "Detecting repository\u2026",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u63D0\u793A: "Open repo: {repo}",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u6807\u9898: "Open repository",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u672A\u8BB0\u5F55_\u63D0\u793A: "Repository not recorded",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u9700\u624B\u52A8\u6DFB\u52A0_\u63D0\u793A: "This plugin is not installed via official/BPM. Please set the source manually.",
  \u4E0B\u8F7D\u66F4\u65B0_\u7F3A\u5C11\u4ED3\u5E93\u63D0\u793A: "Missing repository source; cannot download update.",
  \u5378\u8F7D_\u6807\u9898: "Uninstall Plugin",
  \u5378\u8F7D_\u63D0\u793A: "Are you sure you want to uninstall this plugin? This will delete the plugin's folder.",
  \u5378\u8F7D_\u5378\u8F7D: "Uninstall",
  \u5378\u8F7D_\u53D6\u6D88: "Cancel",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "Uninstalled successfully",
  \u4E00\u952E_\u6807\u9898: "One-click Enable/Disable Plugins",
  \u4E00\u952E_\u63D0\u793A: "Are you sure you want to enable/disable the plugins on this page with one click? This action cannot be undone. (Please wait patiently during the enable/disable process)",
  \u4E00\u952E_\u542F\u7981: "Enable/Disable",
  \u4E00\u952E_\u53D6\u6D88: "Cancel",
  \u4E00\u952E_\u901A\u77E5_\u4E00: "Enable/Disable Successful",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "Basic",
  \u8BBE\u7F6E_\u6837\u5F0F\u8BBE\u7F6E_\u524D\u7F00: "Style",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "Group",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "Tag",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "Delay",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "Language Settings",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "Choose your preferred language.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898: "Center the interface",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0: "Set whether the manager interface is centered",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "Directory Style",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "Select the style of the group to enhance the browsing experience.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E00: "Always Expanded",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E8C: "Never Expanded",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E09: "Hover to Expand",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u56DB: "Click to Expand",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "Group Style",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "Select the style of the group to make it more noticeable and easy to identify.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E00: "Style One",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E8C: "Style Two",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E09: "Style Three",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u56DB: "Style Four",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "Tag Style",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "Select the style of the tag to make it more noticeable and easy to identify.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E00: "Style One",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E8C: "Style Two",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E09: "Style Three",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u56DB: "Style Four",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "Delayed Startup",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "Enabling the delayed startup feature can optimize the loading order, but please note that this may cause compatibility issues with some plugins.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "Fade Plugins",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "Provide a visual fade effect for disabled plugins to clearly distinguish between enabled and disabled plugins.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "Check updates on startup",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "When BPM opens, automatically check for plugin updates and briefly show the count.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898: "Filter Persistence",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0: "After enabling, you will see the same plugin list every time you open the manager.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "Control Plugin Commands Separately",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "Enable this option to control the enabled and disabled state of each plugin separately. (Restart Obsidian to take effect)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "Control Plugin Commands by Group",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "Enable this option to enable or disable all plugins in a specified group with one click. (Restart Obsidian to take effect)",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Delay] Added",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Delay] ID already exists or is empty",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Delay] Deleted successfully",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Delay] Deletion failed, plugins exist under this delay",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Group] Added",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Group] ID already exists or is empty",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Group] Deleted successfully",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Group] Deletion failed, plugins exist under this group",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Tag] Added",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Tag] ID already exists or is empty",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Tag] Deleted successfully",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Tag] Deletion failed, plugins exist under this tag",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "If You Encounter Conflicts with Other Plugins",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "Due to limited capabilities, I cannot fix this issue. Please disable delayed startup to resolve all conflict issues.",
  \u901A\u77E5_\u68C0\u6D4B\u66F4\u65B0\u4E2D\u6587\u6848: "Checking plugin updates...",
  \u901A\u77E5_\u53EF\u66F4\u65B0\u6570\u91CF: "{count} plugins have updates available",
  \u901A\u77E5_\u68C0\u67E5\u66F4\u65B0\u5931\u8D25_\u5EFA\u8BAEToken: "Network/API limited. Please configure a GitHub Token (Public repositories scope) and retry.",
  \u901A\u77E5_\u83B7\u53D6\u7248\u672C\u4E2D\u6587\u6848: "Fetching remote version info\u2026",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "Open the plugin manager",
  \u6807\u7B7E_BPM\u5B89\u88C5_\u540D\u79F0: "bpm install",
  \u7BA1\u7406\u5668_\u4E0B\u8F7D\u66F4\u65B0_\u63CF\u8FF0: "Download an update (choose version, incl. pre-release)",
  \u5B89\u88C5_\u6210\u529F_\u63D0\u793A: "Installed/updated: ",
  \u5B89\u88C5_\u9519\u8BEF_\u9650\u901F: "GitHub rate-limited (403). Please set a GitHub token and retry.",
  \u5B89\u88C5_\u9519\u8BEF_\u7F3A\u5C11\u8D44\u6E90: "Release assets/files not found. Please check repo/version.",
  \u5B89\u88C5_\u9519\u8BEF_\u901A\u7528: "Install failed. Please check repo/version or network.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8C03\u8BD5\u6A21\u5F0F_\u6807\u9898: "Debug mode",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8C03\u8BD5\u6A21\u5F0F_\u63CF\u8FF0: "When off, only errors are logged; when on, debug logs are printed.",
  // Plugin Conflict Troubleshooter
  \u6392\u67E5_\u6B22\u8FCE_\u6807\u9898: "\u{1F50D} Plugin Conflict Troubleshooter",
  \u6392\u67E5_\u6B22\u8FCE_\u8BF4\u660E: "This wizard helps you quickly locate two conflicting plugins using binary search. Plugins will be enabled/disabled during the process. Original state can be restored afterwards.",
  \u6392\u67E5_\u5F53\u524D\u542F\u7528_\u6587\u672C: "Currently enabled plugins",
  \u6392\u67E5_\u9884\u8BA1\u6B65\u9AA4_\u6587\u672C: "Estimated steps",
  \u6392\u67E5_\u5F00\u59CB_\u6309\u94AE: "Start Troubleshooting",
  \u6392\u67E5_\u53D6\u6D88_\u6309\u94AE: "Cancel",
  \u6392\u67E5_\u6B65\u9AA4_\u6587\u672C: "Step",
  \u6392\u67E5_\u9636\u6BB5_\u786E\u8BA4: "Phase 1: Confirming plugin issue (all plugins disabled)",
  \u6392\u67E5_\u9636\u6BB5_\u67E5\u627E\u7B2C\u4E00: "Phase 2: Binary search for first suspect plugin",
  \u6392\u67E5_\u9636\u6BB5_\u67E5\u627E\u7B2C\u4E8C: "Phase 3: Binary search for second conflicting plugin",
  \u6392\u67E5_\u7B2C\u4E00\u51B2\u7A81_\u6587\u672C: "First conflicting plugin",
  \u6392\u67E5_\u5DF2\u542F\u7528_\u6587\u672C: "Enabled",
  \u6392\u67E5_\u5DF2\u7981\u7528_\u6587\u672C: "Disabled",
  \u6392\u67E5_\u6D4B\u8BD5\u63D0\u793A_\u6587\u672C: "Please test if the problem still exists, then click a button below:",
  \u6392\u67E5_\u95EE\u9898\u8FD8\u5728_\u6309\u94AE: "Problem Still Exists",
  \u6392\u67E5_\u95EE\u9898\u6D88\u5931_\u6309\u94AE: "Problem Gone",
  \u6392\u67E5_\u91CD\u542F_\u6309\u94AE: "Restart Obsidian",
  \u6392\u67E5_\u64A4\u9500_\u6309\u94AE: "Undo Last Step",
  \u6392\u67E5_\u9000\u51FA_\u6309\u94AE: "Exit Troubleshooting",
  \u6392\u67E5_\u5DF2\u7981\u7528\u6240\u6709_\u901A\u77E5: "All plugins disabled. Please test if the problem still exists.",
  \u6392\u67E5_\u975E\u63D2\u4EF6\u95EE\u9898_\u901A\u77E5: "Problem persists with all plugins disabled. This may not be a plugin conflict.",
  \u6392\u67E5_\u5DF2\u64A4\u9500_\u901A\u77E5: "Reverted to previous step",
  \u6392\u67E5_\u65E0\u6CD5\u5B9A\u4F4D_\u901A\u77E5: "Unable to locate conflicting plugins. May be a more complex multi-plugin conflict.",
  \u6392\u67E5_\u9000\u51FA\u786E\u8BA4_\u6807\u9898: "Exit Troubleshooting",
  \u6392\u67E5_\u9000\u51FA\u786E\u8BA4_\u6587\u672C: "Are you sure you want to exit? You can choose to restore original plugin state or keep current state.",
  \u6392\u67E5_\u6062\u590D\u5E76\u9000\u51FA_\u6309\u94AE: "Restore & Exit",
  \u6392\u67E5_\u4FDD\u6301\u5E76\u9000\u51FA_\u6309\u94AE: "Keep Current & Exit",
  \u6392\u67E5_\u7EE7\u7EED\u6392\u67E5_\u6309\u94AE: "Continue Troubleshooting",
  \u6392\u67E5_\u5B8C\u6210_\u6807\u9898: "Troubleshooting Complete",
  \u6392\u67E5_\u53D1\u73B0\u51B2\u7A81_\u6587\u672C: "Conflicting Plugin Pair Found",
  \u6392\u67E5_\u5EFA\u8BAE_\u6807\u9898: "Suggested Actions",
  \u6392\u67E5_\u5EFA\u8BAE1_\u6587\u672C: "Check GitHub Issues for both plugins to see if this conflict is known",
  \u6392\u67E5_\u5EFA\u8BAE2_\u6587\u672C: "Try updating one or both plugins to the latest version",
  \u6392\u67E5_\u5EFA\u8BAE3_\u6587\u672C: "Temporarily disable one of the conflicting plugins",
  \u6392\u67E5_\u603B\u6B65\u9AA4_\u6587\u672C: "Total steps taken",
  \u6392\u67E5_\u6062\u590D\u539F\u59CB_\u6309\u94AE: "Restore Original State",
  \u6392\u67E5_\u4FDD\u6301\u5F53\u524D_\u6309\u94AE: "Keep Current State",
  \u6392\u67E5_\u751F\u6210\u62A5\u544A_\u6309\u94AE: "Generate Report",
  \u6392\u67E5_\u5DF2\u6062\u590D_\u901A\u77E5: "Original plugin state restored",
  \u6392\u67E5_\u65E0\u7ED3\u679C_\u901A\u77E5: "No results to generate report",
  \u6392\u67E5_\u62A5\u544A\u5DF2\u751F\u6210_\u901A\u77E5: "Conflict report generated",
  \u6392\u67E5_\u62A5\u544A\u5931\u8D25_\u901A\u77E5: "Failed to generate report",
  \u6392\u67E5_\u6309\u94AE_\u63CF\u8FF0: "Troubleshoot plugin conflicts",
  // Report Template
  \u62A5\u544A_\u5355\u63D2\u4EF6_\u6807\u9898: "Plugin Issue Report",
  \u62A5\u544A_\u51B2\u7A81_\u6807\u9898: "Plugin Conflict Report",
  \u62A5\u544A_\u751F\u6210\u8BF4\u660E: "Generated by **Better Plugins Manager** on",
  \u62A5\u544A_\u53D1\u73B0\u95EE\u9898\u63D2\u4EF6: "Problematic Plugin Found",
  \u62A5\u544A_\u53D1\u73B0\u51B2\u7A81: "Conflict Detected",
  \u62A5\u544A_\u63D2\u4EF6: "Plugin",
  \u62A5\u544A_\u63D2\u4EF61: "Plugin 1",
  \u62A5\u544A_\u63D2\u4EF62: "Plugin 2",
  \u62A5\u544A_\u6392\u67E5\u6458\u8981: "Troubleshooting Summary",
  \u62A5\u544A_\u603B\u6B65\u9AA4: "Total Steps",
  \u62A5\u544A_\u7ED3\u679C\u7C7B\u578B: "Result Type",
  \u62A5\u544A_\u5355\u63D2\u4EF6\u95EE\u9898: "Single Plugin Issue",
  \u62A5\u544A_\u51B2\u7A81\u5BF9: "Plugin Pair Conflict",
  \u62A5\u544A_\u539F\u59CB\u542F\u7528\u6570: "Original Enabled Plugins",
  \u62A5\u544A_\u5EFA\u8BAE\u64CD\u4F5C: "Suggested Actions",
  \u62A5\u544A_\u5355\u63D2\u4EF6\u5EFA\u8BAE1: "Try updating the plugin to the latest version",
  \u62A5\u544A_\u5355\u63D2\u4EF6\u5EFA\u8BAE2: "Check the plugin's GitHub Issues for related problems",
  \u62A5\u544A_\u5355\u63D2\u4EF6\u5EFA\u8BAE3: "Contact the plugin author to report the issue",
  \u62A5\u544A_\u5355\u63D2\u4EF6\u5EFA\u8BAE4: "Temporarily disable this plugin",
  \u62A5\u544A_\u51B2\u7A81\u5EFA\u8BAE1: "Check GitHub Issues for both plugins to see if this conflict is known",
  \u62A5\u544A_\u51B2\u7A81\u5EFA\u8BAE2: "Try updating one or both plugins to the latest version",
  \u62A5\u544A_\u51B2\u7A81\u5EFA\u8BAE3: "Temporarily disable one of the conflicting plugins",
  \u62A5\u544A_\u51B2\u7A81\u5EFA\u8BAE4: "Report this issue to the plugin authors",
  \u62A5\u544A_\u5907\u6CE8: "Notes",
  \u62A5\u544A_\u5907\u6CE8\u63D0\u793A: "*Add your notes here...*",
  \u62A5\u544A_\u6280\u672F\u8BE6\u60C5: "Technical Details",
  \u62A5\u544A_\u539F\u59CB\u542F\u7528\u5217\u8868: "Originally Enabled Plugins",
  // Self-check
  \u81EA\u68C0_\u68C0\u6D4B\u5230\u63D2\u4EF6_\u6807\u9898: "Non-BPM Managed Plugins Detected",
  \u81EA\u68C0_\u68C0\u6D4B\u5230\u63D2\u4EF6_\u8BF4\u660E: "Obsidian's community-plugins.json contains plugins started by Obsidian itself. To avoid conflicts between BPM and Obsidian controlling plugins simultaneously, it is recommended to let BPM take over control of these plugins.",
  \u81EA\u68C0_\u68C0\u6D4B\u5230\u63D2\u4EF6_\u5217\u8868: "Detected plugins:",
  \u81EA\u68C0_\u8B66\u544A_\u6587\u672C: "Ignoring this may cause plugin state inconsistency or delay-start feature malfunction.",
  \u81EA\u68C0_\u63A5\u7BA1_\u6309\u94AE: "Let BPM Take Over",
  \u81EA\u68C0_\u5FFD\u7565_\u6309\u94AE: "Ignore This Time",
  \u81EA\u68C0_\u4E0D\u518D\u63D0\u793A_\u6309\u94AE: "Don't Show Again",
  \u81EA\u68C0_\u63A5\u7BA1\u6210\u529F_\u901A\u77E5: "Successfully took over plugin control",
  \u81EA\u68C0_\u63A5\u7BA1\u5931\u8D25_\u901A\u77E5: "Takeover failed, please manually modify community-plugins.json",
  \u81EA\u68C0_\u9700\u8981\u91CD\u542F_\u901A\u77E5: "Please restart Obsidian for the changes to take effect",
  \u81EA\u68C0_\u5FFD\u7565\u8B66\u544A_\u901A\u77E5: "Warning ignored. Using both Obsidian and BPM to manage plugins may cause issues",
  \u81EA\u68C0_\u4E0D\u518D\u63D0\u793A\u786E\u8BA4_\u901A\u77E5: "Will not show again. You can re-enable this in settings"
};

// src/lang/locale/ru.ts
var ru_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\u0423\u0441\u043F\u0435\u0445",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\u041D\u0435\u0443\u0434\u0430\u0447\u0430",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u044F",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "\u041F\u043E\u0438\u0441\u043A",
  \u901A\u7528_\u8FC7\u6EE4_\u6587\u672C: "\u0424\u0438\u043B\u044C\u0442\u0440",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "\u0411\u0435\u0437 \u0433\u0440\u0443\u043F\u043F\u044B",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "\u0411\u0435\u0437 \u043C\u0435\u0442\u043A\u0438",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "\u0411\u0435\u0437 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0438",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "\u0412\u0441\u0435\u0433\u043E",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C",
  \u901A\u7528_\u5173\u95ED_\u6587\u672C: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
  \u901A\u7528_\u5F00\u542F_\u6587\u672C: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C",
  \u901A\u7528_\u4FDD\u5B58_\u6587\u672C: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  \u901A\u7528_\u53D6\u6D88_\u6587\u672C: "\u041E\u0442\u043C\u0435\u043D\u0430",
  \u901A\u7528_\u8FD4\u56DE_\u6587\u672C: "\u041D\u0430\u0437\u0430\u0434",
  \u5BFC\u51FA_\u6B63\u6587\u63D0\u793A: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0442\u0435\u043A\u0441\u0442: \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043B\u0438 \u0437\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u043A\u043E\u043D\u0442\u0435\u043D\u0442.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u9690\u85CFBPM\u6807\u7B7E_\u6807\u9898: "\u0421\u043A\u0440\u044B\u0442\u044C \u0442\u0435\u0433 \u201Cbpm install\u201D",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u9690\u85CFBPM\u6807\u7B7E_\u63CF\u8FF0: "\u0421\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0430\u0432\u0442\u043E\u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u0442\u0435\u0433 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435 (\u0442\u043E\u043B\u044C\u043A\u043E \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u043E, \u043C\u0435\u0442\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442\u0441\u044F).",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u6807\u9898: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u63CF\u8FF0: "\u041F\u0443\u0442\u044C \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430 \u0434\u043B\u044F \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 BPM (Base). \u041F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u043F\u0440\u0438 \u043D\u0430\u0436\u0430\u0442\u0438\u0438 \u201C\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C\u201D.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u793A\u4F8B: "\u043D\u0430\u043F\u0440.: BPM-Export",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u63D0\u793A_\u6807\u9898: "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 frontmatter",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u63D0\u793A_\u63CF\u8FF0: "\u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u0435\u043D\u0438\u0435: bpm_ro_id/name/group/tags/delay/installed_via_bpm; \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0435: bpm_rw_desc/note/enabled; \u0443\u0441\u043B\u043E\u0432\u043D\u044B\u0435: bpm_rwc_repo (\u0431\u0435\u0437 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u044F \u0438 \u043D\u0435 BPM).",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u6807\u9898: "GitHub API Token",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u63CF\u8FF0: "\u0414\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0438\u0437 GitHub \u0438 \u0443\u043C\u0435\u043D\u044C\u0448\u0435\u043D\u0438\u044F \u043B\u0438\u043C\u0438\u0442\u043E\u0432 API. \u041E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u6743\u9650: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B: Public repositories",
  \u83DC\u5355_\u7B14\u8BB0_\u6807\u9898: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430",
  \u83DC\u5355_\u5FEB\u6377\u952E_\u6807\u9898: "\u0413\u043E\u0440\u044F\u0447\u0438\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438",
  \u83DC\u5355_GitHub_\u6807\u9898: "GitHub",
  \u83DC\u5355_\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435",
  \u83DC\u5355_\u5355\u6B21\u542F\u52A8_\u63CF\u8FF0: "\u041E\u0434\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0443\u0441\u043A",
  \u83DC\u5355_\u91CD\u542F\u63D2\u4EF6_\u63CF\u8FF0: "\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D",
  \u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898: "\u0421\u043A\u0440\u044B\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D",
  \u83DC\u5355_\u590D\u5236ID_\u6807\u9898: "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C ID",
  \u7BA1\u7406\u5668_\u5B89\u88C5_GITHUB_\u63CF\u8FF0: "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D / \u0442\u0435\u043C\u0443 (\u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439 GitHub)",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ECB\u7ECD: "\u0423\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0439\u0442\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0438\u043B\u0438 \u0442\u0435\u043C\u044B \u0438\u0437 \u0440\u0435\u043B\u0438\u0437\u043E\u0432 GitHub (\u0431\u0435\u0440\u0451\u0442 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 assets).",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u6807\u9898: "\u0422\u0438\u043F",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435, \u0447\u0442\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C: \u043F\u043B\u0430\u0433\u0438\u043D \u0438\u043B\u0438 \u0442\u0435\u043C\u0443.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63D2\u4EF6: "\u041F\u043B\u0430\u0433\u0438\u043D",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u4E3B\u9898: "\u0422\u0435\u043C\u0430",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u6807\u9898: "\u0420\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u63CF\u8FF0: "\u041F\u0443\u0442\u044C GitHub, \u0444\u043E\u0440\u043C\u0430\u0442 <user>/<repo> \u0438\u043B\u0438 https://github.com/<user>/<repo>.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u5360\u4F4D: "user/repo",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93\u4E3A\u7A7A\u63D0\u793A: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0443\u0442\u044C \u043A \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u044E",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u6807\u9898: "\u0412\u0435\u0440\u0441\u0438\u044F",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u63CF\u8FF0: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0440\u0435\u043B\u0438\u0437\u044B \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435; \u043F\u0443\u0441\u0442\u043E = \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u9ED8\u8BA4\u6700\u65B0: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0440\u0435\u043B\u0438\u0437",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u6309\u94AE: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0432\u0435\u0440\u0441\u0438\u0438",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u4E2D: "\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435...",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u7A7A\u63D0\u793A: "\u0420\u0435\u043B\u0438\u0437\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0432\u0432\u0435\u0441\u0442\u0438 \u0442\u0435\u0433 \u0432\u0440\u0443\u0447\u043D\u0443\u044E.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u5931\u8D25\u63D0\u793A: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0440\u0435\u043B\u0438\u0437\u044B, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439 \u0438\u043B\u0438 \u0441\u0435\u0442\u044C.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6807\u9898: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6309\u94AE: "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",
  \u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0: "\u0412\u0441\u0435",
  \u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u0422\u043E\u043B\u044C\u043A\u043E \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0435",
  \u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0: "\u0422\u043E\u043B\u044C\u043A\u043E \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0435",
  \u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0: "\u0421 \u0433\u0440\u0443\u043F\u043F\u043E\u0439",
  \u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0: "\u0411\u0435\u0437 \u0433\u0440\u0443\u043F\u043F\u044B",
  \u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0: "\u0421 \u0442\u0435\u0433\u0430\u043C\u0438",
  \u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0: "\u0411\u0435\u0437 \u0442\u0435\u0433\u043E\u0432",
  \u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0: "\u0421 \u0437\u0430\u043C\u0435\u0442\u043A\u043E\u0439",
  \u7B5B\u9009_\u72B6\u6001_\u5168\u90E8: "\u0421\u0442\u0430\u0442\u0443\u0441: \u0412\u0441\u0435",
  \u7B5B\u9009_\u5206\u7EC4_\u5168\u90E8: "\u0413\u0440\u0443\u043F\u043F\u044B: \u0412\u0441\u0435",
  \u7B5B\u9009_\u6807\u7B7E_\u5168\u90E8: "\u0422\u0435\u0433\u0438: \u0412\u0441\u0435",
  \u7B5B\u9009_\u5EF6\u8FDF_\u5168\u90E8: "\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430: \u0412\u0441\u0435",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "\u041F\u043E\u0441\u0435\u0442\u0438\u0442\u044C \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0432\u0438\u0434\u0435\u043E-\u0443\u0440\u043E\u043A\u0430\u043C",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "\u0420\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0434\u043B\u044F \u0433\u043B\u0443\u0431\u043E\u043A\u043E\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0434\u043B\u044F \u043D\u0435\u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u044D\u0444\u0444\u0435\u043A\u0442\u0430",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0441\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0440\u0430\u0437\u043E\u043C",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0441\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0440\u0430\u0437\u043E\u043C",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0435",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u043F\u043B\u0430\u0433\u0438\u043D\u0430",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "\u041F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0441\u0442\u0430\u0442\u0443\u0441",
  \u7BA1\u7406\u5668_\u4E0B\u8F7D\u66F4\u65B0_\u63CF\u8FF0: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 (\u0432\u044B\u0431\u043E\u0440 \u0432\u0435\u0440\u0441\u0438\u0438, \u0432\u043A\u043B\u044E\u0447\u0430\u044F pre-release)",
  \u5378\u8F7D_\u6807\u9898: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D",
  \u5378\u8F7D_\u63D0\u793A: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u043E\u0442 \u043F\u043B\u0430\u0433\u0438\u043D? \u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D.",
  \u5378\u8F7D_\u5378\u8F7D: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
  \u5378\u8F7D_\u53D6\u6D88: "\u041E\u0442\u043C\u0435\u043D\u0430",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "\u0423\u0434\u0430\u043B\u0435\u043D\u043E \u0443\u0441\u043F\u0435\u0448\u043D\u043E",
  \u4E00\u952E_\u6807\u9898: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C/\u0432\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0441\u0435",
  \u4E00\u952E_\u63D0\u793A: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043C\u0430\u0441\u0441\u043E\u0432\u043E\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435/\u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435. \u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u043E\u0431\u0440\u0430\u0442\u0438\u043C\u043E.",
  \u4E00\u952E_\u542F\u7981: "\u0412\u043A\u043B/\u0412\u044B\u043A\u043B",
  \u4E00\u952E_\u53D6\u6D88: "\u041E\u0442\u043C\u0435\u043D\u0430",
  \u4E00\u952E_\u901A\u77E5_\u4E00: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\u0411\u0430\u0437\u043E\u0432\u044B\u0435",
  \u8BBE\u7F6E_\u6837\u5F0F\u8BBE\u7F6E_\u524D\u7F00: "\u0421\u0442\u0438\u043B\u044C",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "\u0413\u0440\u0443\u043F\u043F\u0430",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "\u0422\u0435\u0433",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "\u042F\u0437\u044B\u043A",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0438\u0442\u0430\u0435\u043C\u044B\u0439 \u044F\u0437\u044B\u043A.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898: "\u0426\u0435\u043D\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0: "\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u0446\u0435\u043D\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u043A\u043D\u0430 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "\u0421\u0442\u0438\u043B\u044C \u0441\u043F\u0438\u0441\u043A\u0430",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0438\u043B\u044C \u0434\u043B\u044F \u0433\u0440\u0443\u043F\u043F.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E00: "\u0412\u0441\u0435\u0433\u0434\u0430 \u0440\u0430\u0441\u043A\u0440\u044B\u0442",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E8C: "\u041D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0440\u0430\u0441\u043A\u0440\u044B\u0442",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E09: "\u0420\u0430\u0441\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u56DB: "\u0420\u0430\u0441\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043F\u043E \u043A\u043B\u0438\u043A\u0443",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "\u0421\u0442\u0438\u043B\u044C \u0433\u0440\u0443\u043F\u043F\u044B",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0438\u043B\u044C \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0433\u0440\u0443\u043F\u043F.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E00: "\u0421\u0442\u0438\u043B\u044C 1",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E8C: "\u0421\u0442\u0438\u043B\u044C 2",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E09: "\u0421\u0442\u0438\u043B\u044C 3",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u56DB: "\u0421\u0442\u0438\u043B\u044C 4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "\u0421\u0442\u0438\u043B\u044C \u0442\u0435\u0433\u043E\u0432",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0438\u043B\u044C \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0442\u0435\u0433\u043E\u0432.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E00: "\u0421\u0442\u0438\u043B\u044C 1",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E8C: "\u0421\u0442\u0438\u043B\u044C 2",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E09: "\u0421\u0442\u0438\u043B\u044C 3",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u56DB: "\u0421\u0442\u0438\u043B\u044C 4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "\u041E\u0442\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0439 \u0437\u0430\u043F\u0443\u0441\u043A",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "\u041E\u043F\u0442\u0438\u043C\u0438\u0437\u0438\u0440\u0443\u0435\u0442 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438, \u043D\u043E \u043C\u043E\u0436\u0435\u0442 \u0432\u044B\u0437\u0432\u0430\u0442\u044C \u043D\u0435\u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u0438.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "\u041E\u0441\u043B\u0430\u0431\u0438\u0442\u044C \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "\u0412\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u043E \u0432\u044B\u0434\u0435\u043B\u044F\u0442\u044C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0435/\u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898: "\u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0442\u0435 \u0436\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u044B \u043F\u0440\u0438 \u043A\u0430\u0436\u0434\u043E\u043C \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0438.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "\u041A\u043E\u043C\u0430\u043D\u0434\u044B \u043F\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "\u0423\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435\u043C \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043F\u043B\u0430\u0433\u0438\u043D\u0430 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E (\u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430).",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "\u041A\u043E\u043C\u0430\u043D\u0434\u044B \u043F\u043E \u0433\u0440\u0443\u043F\u043F\u0430\u043C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "\u0412\u043A\u043B/\u0432\u044B\u043A\u043B \u0433\u0440\u0443\u043F\u043F\u0443 \u0446\u0435\u043B\u0438\u043A\u043E\u043C (\u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430).",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u0438 \u0441\u0442\u0430\u0440\u0442\u0435",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\u041F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435 BPM \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E.",
  \u901A\u77E5_\u68C0\u67E5\u66F4\u65B0\u5931\u8D25_\u5EFA\u8BAEToken: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0442\u0438/API. \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 GitHub Token (Public repositories) \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435.",
  \u901A\u77E5_\u68C0\u6D4B\u66F4\u65B0\u4E2D\u6587\u6848: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0439 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432...",
  \u901A\u77E5_\u53EF\u66F4\u65B0\u6570\u91CF: "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0434\u043B\u044F {count} \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430] \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430] ID \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043F\u0443\u0441\u0442",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430] \u0423\u0434\u0430\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430] \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C, \u0435\u0441\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0441 \u044D\u0442\u043E\u0439 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u043E\u0439",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u0413\u0440\u0443\u043F\u043F\u0430] \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u0413\u0440\u0443\u043F\u043F\u0430] ID \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043F\u0443\u0441\u0442",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u0413\u0440\u0443\u043F\u043F\u0430] \u0423\u0434\u0430\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u0413\u0440\u0443\u043F\u043F\u0430] \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C, \u0435\u0441\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0432 \u044D\u0442\u043E\u0439 \u0433\u0440\u0443\u043F\u043F\u0435",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u0422\u0435\u0433] \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u0422\u0435\u0433] ID \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043F\u0443\u0441\u0442",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u0422\u0435\u0433] \u0423\u0434\u0430\u043B\u0435\u043D\u043E",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u0422\u0435\u0433] \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C, \u0435\u0441\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0441 \u044D\u0442\u0438\u043C \u0442\u0435\u0433\u043E\u043C",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "\u0415\u0441\u043B\u0438 \u0432\u043E\u0437\u043D\u0438\u043A\u0430\u044E\u0442 \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u044B \u0441 \u0434\u0440\u0443\u0433\u0438\u043C\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430\u043C\u0438",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u043E\u0442\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0439 \u0437\u0430\u043F\u0443\u0441\u043A, \u0447\u0442\u043E\u0431\u044B \u0443\u0441\u0442\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442\u044B.",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432",
  \u6807\u7B7E_BPM\u5B89\u88C5_\u540D\u79F0: "bpm install",
  \u5B89\u88C5_\u6210\u529F_\u63D0\u793A: "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E/\u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E: ",
  \u5B89\u88C5_\u9519\u8BEF_\u9650\u901F: "\u041B\u0438\u043C\u0438\u0442 GitHub (403). \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u0442\u043E\u043A\u0435\u043D \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435.",
  \u5B89\u88C5_\u9519\u8BEF_\u7F3A\u5C11\u8D44\u6E90: "\u0424\u0430\u0439\u043B\u044B \u0440\u0435\u043B\u0438\u0437\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439/\u0432\u0435\u0440\u0441\u0438\u044E.",
  \u5B89\u88C5_\u9519\u8BEF_\u901A\u7528: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439/\u0441\u0435\u0442\u044C.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8C03\u8BD5\u6A21\u5F0F_\u6807\u9898: "\u0420\u0435\u0436\u0438\u043C \u043E\u0442\u043B\u0430\u0434\u043A\u0438",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8C03\u8BD5\u6A21\u5F0F_\u63CF\u8FF0: "\u0412\u044B\u043A\u043B: \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0448\u0438\u0431\u043A\u0438. \u0412\u043A\u043B: \u0432\u044B\u0432\u043E\u0434 \u043E\u0442\u043B\u0430\u0434\u043E\u0447\u043D\u044B\u0445 \u043B\u043E\u0433\u043E\u0432.",
  \u901A\u77E5_\u83B7\u53D6\u7248\u672C\u4E2D\u6587\u6848: "\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u0432\u0435\u0440\u0441\u0438\u044F\u0445\u2026",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6807\u9898: "\u0412\u044B\u0431\u043E\u0440 \u0432\u0435\u0440\u0441\u0438\u0438",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u7248\u672C_\u6807\u9898: "\u0412\u0435\u0440\u0441\u0438\u044F",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u4E2D: "\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0432\u0435\u0440\u0441\u0438\u0439\u2026",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u5931\u8D25\u63D0\u793A: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0432\u0435\u0440\u0441\u0438\u0439. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435.",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u65E0\u7248\u672C\u63D0\u793A: "\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u0435\u0440\u0441\u0438\u0439 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u0411\u0443\u0434\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0430 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u043D\u0430\u044F \u0438\u043B\u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0432\u0435\u0440\u0441\u0438\u044F.",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u4E0B\u8F7D\u6309\u94AE: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6210\u529F\u63D0\u793A: "\u041F\u043B\u0430\u0433\u0438\u043D \u0441\u043A\u0430\u0447\u0430\u043D \u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5F00\u59CB\u63D0\u793A: "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430 \u043F\u043B\u0430\u0433\u0438\u043D\u043E\u0432\u2026",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5931\u8D25\u63D0\u793A: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430 (\u0441\u043C. \u043A\u043E\u043D\u0441\u043E\u043B\u044C).",
  \u7BA1\u7406\u5668_\u5355\u6B21\u542F\u52A8\u4E2D_\u63D0\u793A: "\u0412\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435\u2026 \u043F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435",
  \u7BA1\u7406\u5668_\u91CD\u542F\u4E2D_\u63D0\u793A: "\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u2026 \u043F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u68C0\u6D4B\u4E2D_\u63D0\u793A: "\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u044F\u2026",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u63D0\u793A: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439: {repo}",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u672A\u8BB0\u5F55_\u63D0\u793A: "\u0420\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u9700\u624B\u52A8\u6DFB\u52A0_\u63D0\u793A: "\u041F\u043B\u0430\u0433\u0438\u043D \u043D\u0435 \u0438\u0437 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E/BPM \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430. \u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0432\u0440\u0443\u0447\u043D\u0443\u044E.",
  \u4E0B\u8F7D\u66F4\u65B0_\u7F3A\u5C11\u4ED3\u5E93\u63D0\u793A: "\u041D\u0435\u0442 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u044F \u2014 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0441\u043A\u0430\u0447\u0430\u0442\u044C \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435.",
  \u7BA1\u7406\u5668_\u66F4\u591A\u64CD\u4F5C_\u63CF\u8FF0: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u6807\u9898: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439"
};

// src/lang/locale/ja.ts
var ja_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "\u30D7\u30E9\u30B0\u30A4\u30F3\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\u6210\u529F",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\u5931\u6557",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "\u8FFD\u52A0",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "\u64CD\u4F5C",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "\u691C\u7D22",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "\u540D\u524D",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "\u30B0\u30EB\u30FC\u30D7\u306A\u3057",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "\u30BF\u30B0\u306A\u3057",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "\u9045\u5EF6\u306A\u3057",
  \u901A\u7528_\u8FC7\u6EE4_\u6587\u672C: "\u30D5\u30A3\u30EB\u30BF\u30FC",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "\u5408\u8A08",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "\u6709\u52B9",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "\u7121\u52B9",
  \u901A\u7528_\u8FD4\u56DE_\u6587\u672C: "\u623B\u308B",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "\u30EA\u30DD\u30B8\u30C8\u30EA\u3092\u898B\u308B",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "\u30D3\u30C7\u30AA\u30C1\u30E5\u30FC\u30C8\u30EA\u30A2\u30EB\u306B\u30A2\u30AF\u30BB\u30B9",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "\u7DE8\u96C6\u30E2\u30FC\u30C9\u3092\u6709\u52B9\u306B\u3057\u3066\u3001\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u8A2D\u5B9A\u3092\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA\u3057\u307E\u3059",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u30EA\u30ED\u30FC\u30C9\u3057\u3066\u5373\u5EA7\u306B\u52B9\u679C\u3092\u767A\u63EE\u3057\u307E\u3059",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u66F4\u65B0\u3092\u78BA\u8A8D\u3059\u308B",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "\u4E00\u5EA6\u306B\u3059\u3079\u3066\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u7121\u52B9\u306B\u3057\u307E\u3059",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "\u4E00\u5EA6\u306B\u3059\u3079\u3066\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u6709\u52B9\u306B\u3057\u307E\u3059",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u8A2D\u5B9A\u3092\u7BA1\u7406\u3059\u308B",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\u6709\u52B9\u306A\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u307F\u3092\u8868\u793A\u3059\u308B",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "\u8A2D\u5B9A\u30A4\u30F3\u30BF\u30FC\u30D5\u30A7\u30FC\u30B9\u3092\u958B\u304F",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "\u521D\u671F\u72B6\u614B\u306B\u623B\u3059",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u3092\u958B\u304F",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u5B8C\u5168\u306B\u524A\u9664\u3059\u308B",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30B9\u30C6\u30FC\u30BF\u30B9\u3092\u5207\u308A\u66FF\u3048\u308B",
  \u83DC\u5355_\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u3092\u78BA\u8A8D",
  \u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898: "\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u975E\u8868\u793A",
  \u83DC\u5355_\u590D\u5236ID_\u6807\u9898: "ID\u3092\u30B3\u30D4\u30FC",
  \u7BA1\u7406\u5668_\u5B89\u88C5_GITHUB_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3 / \u30C6\u30FC\u30DE\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\uFF08GitHub \u30EA\u30DD\u30B8\u30C8\u30EA\uFF09",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ECB\u7ECD: "GitHub \u30EA\u30EA\u30FC\u30B9\u304B\u3089\u30D7\u30E9\u30B0\u30A4\u30F3\u3084\u30C6\u30FC\u30DE\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\uFF08\u6700\u65B0\u30A2\u30BB\u30C3\u30C8\u3092\u4F7F\u7528\uFF09\u3002",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u6807\u9898: "\u30BF\u30A4\u30D7",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u304B\u30C6\u30FC\u30DE\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63D2\u4EF6: "\u30D7\u30E9\u30B0\u30A4\u30F3",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u4E3B\u9898: "\u30C6\u30FC\u30DE",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u6807\u9898: "\u30EA\u30DD\u30B8\u30C8\u30EA",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u63CF\u8FF0: "<user>/<repo> \u307E\u305F\u306F https://github.com/<user>/<repo> \u5F62\u5F0F\u3092\u30B5\u30DD\u30FC\u30C8\u3002",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u5360\u4F4D: "user/repo",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93\u4E3A\u7A7A\u63D0\u793A: "\u30EA\u30DD\u30B8\u30C8\u30EA\u306E\u30D1\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u6807\u9898: "\u30D0\u30FC\u30B8\u30E7\u30F3",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u63CF\u8FF0: "GitHub \u306E\u30EA\u30EA\u30FC\u30B9\u3092\u53D6\u5F97\u3057\u3066\u304B\u3089\u9078\u629E\u3057\u307E\u3059\u3002\u7A7A\u306A\u3089\u6700\u65B0\u3002",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u9ED8\u8BA4\u6700\u65B0: "\u6700\u65B0\u30EA\u30EA\u30FC\u30B9",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u6309\u94AE: "\u30D0\u30FC\u30B8\u30E7\u30F3\u53D6\u5F97",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u4E2D: "\u53D6\u5F97\u4E2D...",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u7A7A\u63D0\u793A: "\u30EA\u30EA\u30FC\u30B9\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002\u30BF\u30B0\u3092\u624B\u5165\u529B\u3057\u3066\u307F\u3066\u304F\u3060\u3055\u3044\u3002",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u5931\u8D25\u63D0\u793A: "\u30EA\u30EA\u30FC\u30B9\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u30EA\u30DD\u30B8\u30C8\u30EA\u307E\u305F\u306F\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6807\u9898: "\u64CD\u4F5C",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6309\u94AE: "\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u958B\u59CB",
  \u5378\u8F7D_\u6807\u9898: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB",
  \u5378\u8F7D_\u63D0\u793A: "\u3053\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30D5\u30A9\u30EB\u30C0\u304C\u524A\u9664\u3055\u308C\u307E\u3059\u3002",
  \u5378\u8F7D_\u5378\u8F7D: "\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB",
  \u5378\u8F7D_\u53D6\u6D88: "\u30AD\u30E3\u30F3\u30BB\u30EB",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "\u30A2\u30F3\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u306B\u6210\u529F\u3057\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\u57FA\u672C",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "\u30B0\u30EB\u30FC\u30D7",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "\u30BF\u30B0",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "\u9045\u5EF6",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "\u8A00\u8A9E\u8A2D\u5B9A",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "\u304A\u597D\u307F\u306E\u8A00\u8A9E\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u30B9\u30BF\u30A4\u30EB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "\u30B0\u30EB\u30FC\u30D7\u306E\u30B9\u30BF\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u3001\u30D6\u30E9\u30A6\u30B8\u30F3\u30B0\u4F53\u9A13\u3092\u5411\u4E0A\u3055\u305B\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "\u30B0\u30EB\u30FC\u30D7\u30B9\u30BF\u30A4\u30EB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "\u30B0\u30EB\u30FC\u30D7\u306E\u30B9\u30BF\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u3001\u3088\u308A\u76EE\u7ACB\u305F\u305B\u3084\u3059\u304F\u8B58\u5225\u3057\u3084\u3059\u304F\u3057\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "\u30BF\u30B0\u30B9\u30BF\u30A4\u30EB",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "\u30BF\u30B0\u306E\u30B9\u30BF\u30A4\u30EB\u3092\u9078\u629E\u3057\u3066\u3001\u3088\u308A\u76EE\u7ACB\u305F\u305B\u3084\u3059\u304F\u8B58\u5225\u3057\u3084\u3059\u304F\u3057\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "\u9045\u5EF6\u30B9\u30BF\u30FC\u30C8",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "\u9045\u5EF6\u30B9\u30BF\u30FC\u30C8\u6A5F\u80FD\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u8AAD\u307F\u8FBC\u307F\u9806\u5E8F\u3092\u6700\u9069\u5316\u3067\u304D\u307E\u3059\u304C\u3001\u4E00\u90E8\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3067\u4E92\u63DB\u6027\u554F\u984C\u304C\u767A\u751F\u3059\u308B\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30D5\u30A7\u30FC\u30C9",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "\u7121\u52B9\u306A\u30D7\u30E9\u30B0\u30A4\u30F3\u306B\u8996\u899A\u7684\u306A\u30D5\u30A7\u30FC\u30C9\u52B9\u679C\u3092\u63D0\u4F9B\u3057\u3066\u3001\u6709\u52B9\u3068\u7121\u52B9\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u660E\u78BA\u306B\u533A\u5225\u3057\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "\u30D7\u30E9\u30B0\u30A4\u30F3\u30B3\u30DE\u30F3\u30C9\u3092\u500B\u5225\u306B\u5236\u5FA1",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u5404\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u6709\u52B9/\u7121\u52B9\u72B6\u614B\u3092\u500B\u5225\u306B\u5236\u5FA1\u3067\u304D\u307E\u3059\u3002\uFF08Obsidian\u3092\u518D\u8D77\u52D5\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\uFF09",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "\u30B0\u30EB\u30FC\u30D7\u3054\u3068\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u30B3\u30DE\u30F3\u30C9\u3092\u5236\u5FA1",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "\u3053\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3092\u6709\u52B9\u306B\u3059\u308B\u3068\u3001\u6307\u5B9A\u3055\u308C\u305F\u30B0\u30EB\u30FC\u30D7\u5185\u306E\u3059\u3079\u3066\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u30EF\u30F3\u30AF\u30EA\u30C3\u30AF\u3067\u6709\u52B9\u307E\u305F\u306F\u7121\u52B9\u306B\u3067\u304D\u307E\u3059\u3002\uFF08Obsidian\u3092\u518D\u8D77\u52D5\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\uFF09",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "\u8D77\u52D5\u6642\u306B\u66F4\u65B0\u3092\u30C1\u30A7\u30C3\u30AF",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "BPM \u3092\u958B\u304F\u3068\u304D\u306B\u81EA\u52D5\u3067\u66F4\u65B0\u3092\u78BA\u8A8D\u3057\u3001\u4EF6\u6570\u3092\u77ED\u6642\u9593\u8868\u793A\u3057\u307E\u3059\u3002",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u9045\u5EF6] \u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u9045\u5EF6] ID\u304C\u65E2\u306B\u5B58\u5728\u3059\u308B\u304B\u3001\u7A7A\u3067\u3059",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u9045\u5EF6] \u524A\u9664\u306B\u6210\u529F\u3057\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u9045\u5EF6] \u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3001\u3053\u306E\u9045\u5EF6\u306E\u4E0B\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u304C\u5B58\u5728\u3057\u307E\u3059",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u30B0\u30EB\u30FC\u30D7] \u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u30B0\u30EB\u30FC\u30D7] ID\u304C\u65E2\u306B\u5B58\u5728\u3059\u308B\u304B\u3001\u7A7A\u3067\u3059",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u30B0\u30EB\u30FC\u30D7] \u524A\u9664\u306B\u6210\u529F\u3057\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u30B0\u30EB\u30FC\u30D7] \u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3001\u3053\u306E\u30B0\u30EB\u30FC\u30D7\u306E\u4E0B\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u304C\u5B58\u5728\u3057\u307E\u3059",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\u30BF\u30B0] \u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\u30BF\u30B0] ID\u304C\u65E2\u306B\u5B58\u5728\u3059\u308B\u304B\u3001\u7A7A\u3067\u3059",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\u30BF\u30B0] \u524A\u9664\u306B\u6210\u529F\u3057\u307E\u3057\u305F",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\u30BF\u30B0] \u524A\u9664\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3001\u3053\u306E\u30BF\u30B0\u306E\u4E0B\u306B\u30D7\u30E9\u30B0\u30A4\u30F3\u304C\u5B58\u5728\u3057\u307E\u3059",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "\u4ED6\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u3068\u306E\u30B3\u30F3\u30D5\u30EA\u30AF\u30C8\u304C\u767A\u751F\u3057\u305F\u5834\u5408",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "\u80FD\u529B\u306B\u9650\u308A\u304C\u3042\u308B\u305F\u3081\u3001\u3053\u306E\u554F\u984C\u3092\u4FEE\u6B63\u3067\u304D\u307E\u305B\u3093\u3002\u9045\u5EF6\u30B9\u30BF\u30FC\u30C8\u3092\u7121\u52B9\u306B\u3059\u308B\u3053\u3068\u3067\u3001\u3059\u3079\u3066\u306E\u30B3\u30F3\u30D5\u30EA\u30AF\u30C8\u554F\u984C\u3092\u89E3\u6C7A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u901A\u77E5_\u53EF\u66F4\u65B0\u6570\u91CF: "{count} \u500B\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u306B\u66F4\u65B0\u304C\u3042\u308A\u307E\u3059",
  \u901A\u77E5_\u68C0\u6D4B\u66F4\u65B0\u4E2D\u6587\u6848: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u66F4\u65B0\u3092\u78BA\u8A8D\u4E2D...",
  \u901A\u77E5_\u68C0\u67E5\u66F4\u65B0\u5931\u8D25_\u5EFA\u8BAEToken: "\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF/API \u304C\u5236\u9650\u3055\u308C\u3066\u3044\u307E\u3059\u3002GitHub Token\uFF08Public repositories \u6A29\u9650\uFF09\u3092\u8A2D\u5B9A\u3057\u3066\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u901A\u77E5_\u83B7\u53D6\u7248\u672C\u4E2D\u6587\u6848: "\u30EA\u30E2\u30FC\u30C8\u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u60C5\u5831\u3092\u53D6\u5F97\u4E2D\u2026",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6807\u9898: "\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u9078\u629E",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u7248\u672C_\u6807\u9898: "\u30D0\u30FC\u30B8\u30E7\u30F3",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u4E2D: "\u5229\u7528\u53EF\u80FD\u306A\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u53D6\u5F97\u4E2D\u2026",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u5931\u8D25\u63D0\u793A: "\u30D0\u30FC\u30B8\u30E7\u30F3\u4E00\u89A7\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u3057\u3070\u3089\u304F\u3057\u3066\u304B\u3089\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u65E0\u7248\u672C\u63D0\u793A: "\u30D0\u30FC\u30B8\u30E7\u30F3\u4E00\u89A7\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u691C\u51FA\u3055\u308C\u305F/\u6700\u65B0\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u4E0B\u8F7D\u6309\u94AE: "\u66F4\u65B0\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6210\u529F\u63D0\u793A: "\u30D7\u30E9\u30B0\u30A4\u30F3\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3057\u3066\u66F4\u65B0\u3057\u307E\u3057\u305F",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5F00\u59CB\u63D0\u793A: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30DE\u30CB\u30D5\u30A7\u30B9\u30C8\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5931\u8D25\u63D0\u793A: "\u518D\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\uFF08\u8A73\u7D30\u306F\u30B3\u30F3\u30BD\u30FC\u30EB\uFF09\u3002",
  \u7BA1\u7406\u5668_\u5355\u6B21\u542F\u52A8\u4E2D_\u63D0\u793A: "\u6709\u52B9\u5316\u4E2D\u2026\u3057\u3070\u3089\u304F\u304A\u5F85\u3061\u304F\u3060\u3055\u3044",
  \u7BA1\u7406\u5668_\u91CD\u542F\u4E2D_\u63D0\u793A: "\u518D\u8D77\u52D5\u4E2D\u2026\u3057\u3070\u3089\u304F\u304A\u5F85\u3061\u304F\u3060\u3055\u3044",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u68C0\u6D4B\u4E2D_\u63D0\u793A: "\u30EA\u30DD\u30B8\u30C8\u30EA\u3092\u691C\u51FA\u4E2D\u2026",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u63D0\u793A: "\u30EA\u30DD\u30B8\u30C8\u30EA\u3092\u958B\u304F: {repo}",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u672A\u8BB0\u5F55_\u63D0\u793A: "\u30EA\u30DD\u30B8\u30C8\u30EA\u304C\u8A18\u9332\u3055\u308C\u3066\u3044\u307E\u305B\u3093",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u9700\u624B\u52A8\u6DFB\u52A0_\u63D0\u793A: "\u3053\u306E\u30D7\u30E9\u30B0\u30A4\u30F3\u306F\u516C\u5F0F/BPM \u7531\u6765\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u624B\u52D5\u3067\u30BD\u30FC\u30B9\u3092\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  \u4E0B\u8F7D\u66F4\u65B0_\u7F3A\u5C11\u4ED3\u5E93\u63D0\u793A: "\u30EA\u30DD\u30B8\u30C8\u30EA\u304C\u4E0D\u660E\u306E\u305F\u3081\u66F4\u65B0\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u3067\u304D\u307E\u305B\u3093\u3002",
  \u7B5B\u9009_\u72B6\u6001_\u5168\u90E8: "\u72B6\u614B\uFF1A\u5168\u90E8",
  \u7B5B\u9009_\u5206\u7EC4_\u5168\u90E8: "\u30B0\u30EB\u30FC\u30D7\uFF1A\u5168\u90E8",
  \u7B5B\u9009_\u6807\u7B7E_\u5168\u90E8: "\u30BF\u30B0\uFF1A\u5168\u90E8",
  \u7B5B\u9009_\u5EF6\u8FDF_\u5168\u90E8: "\u9045\u5EF6\uFF1A\u5168\u90E8",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "\u30D7\u30E9\u30B0\u30A4\u30F3\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC\u3092\u958B\u304F",
  \u7BA1\u7406\u5668_\u66F4\u591A\u64CD\u4F5C_\u63CF\u8FF0: "\u305D\u306E\u4ED6\u306E\u64CD\u4F5C",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u6807\u9898: "\u30EA\u30DD\u30B8\u30C8\u30EA\u3092\u958B\u304F"
};

// src/lang/locale/ko.ts
var ko_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "\uD50C\uB7EC\uADF8\uC778 \uAD00\uB9AC\uC790",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\uC131\uACF5",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\uC2E4\uD328",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "\uCD94\uAC00",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "\uC791\uC5C5",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "\uAC80\uC0C9",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "\uC774\uB984",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "\uADF8\uB8F9 \uC5C6\uC74C",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "\uD0DC\uADF8 \uC5C6\uC74C",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "\uB51C\uB808\uC774 \uC5C6\uC74C",
  \u901A\u7528_\u8FC7\u6EE4_\u6587\u672C: "\uD544\uD130",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "\uCD1D\uACC4",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "\uD65C\uC131\uD654",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "\uBE44\uD65C\uC131\uD654",
  \u901A\u7528_\u8FD4\u56DE_\u6587\u672C: "\uB4A4\uB85C",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "\uC800\uC7A5\uC18C \uBC29\uBB38",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "\uBE44\uB514\uC624 \uD29C\uD1A0\uB9AC\uC5BC\uC5D0 \uC561\uC138\uC2A4",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "\uD3B8\uC9D1 \uBAA8\uB4DC\uB97C \uD65C\uC131\uD654\uD558\uC5EC \uD50C\uB7EC\uADF8\uC778 \uC124\uC815\uC744 \uC790\uC138\uD788 \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778\uC744 \uB2E4\uC2DC \uB85C\uB4DC\uD558\uC5EC \uC989\uC2DC \uC801\uC6A9\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uC5C5\uB370\uC774\uD2B8\uB97C \uD655\uC778\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "\uD55C \uBC88\uC5D0 \uBAA8\uB4E0 \uD50C\uB7EC\uADF8\uC778\uC744 \uBE44\uD65C\uC131\uD654\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "\uD55C \uBC88\uC5D0 \uBAA8\uB4E0 \uD50C\uB7EC\uADF8\uC778\uC744 \uD65C\uC131\uD654\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uC124\uC815\uC744 \uAD00\uB9AC\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "\uD65C\uC131\uD654\uB41C \uD50C\uB7EC\uADF8\uC778\uB9CC \uD45C\uC2DC\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "\uC124\uC815 \uC778\uD130\uD398\uC774\uC2A4\uB97C \uC5FD\uB2C8\uB2E4",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "\uCD08\uAE30 \uC0C1\uD0DC\uB85C \uBCF5\uC6D0\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uB514\uB809\uD1A0\uB9AC\uB97C \uC5FD\uB2C8\uB2E4",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778\uC744 \uC644\uC804\uD788 \uC0AD\uC81C\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uC0C1\uD0DC\uB97C \uC804\uD658\uD558\uC138\uC694",
  \u83DC\u5355_\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "\uC5C5\uB370\uC774\uD2B8 \uD655\uC778",
  \u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898: "\uD50C\uB7EC\uADF8\uC778 \uC228\uAE30\uAE30",
  \u83DC\u5355_\u590D\u5236ID_\u6807\u9898: "ID \uBCF5\uC0AC",
  \u7BA1\u7406\u5668_\u5B89\u88C5_GITHUB_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 / \uD14C\uB9C8 \uC124\uCE58 (GitHub \uC800\uC7A5\uC18C)",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ECB\u7ECD: "GitHub \uB9B4\uB9AC\uC2A4\uC5D0\uC11C \uD50C\uB7EC\uADF8\uC778\xB7\uD14C\uB9C8 \uC124\uCE58 (\uCD5C\uC2E0 \uC790\uC0B0 \uC0AC\uC6A9).",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u6807\u9898: "\uC720\uD615",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uB610\uB294 \uD14C\uB9C8\uB97C \uC120\uD0DD\uD558\uC138\uC694.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63D2\u4EF6: "\uD50C\uB7EC\uADF8\uC778",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u4E3B\u9898: "\uD14C\uB9C8",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u6807\u9898: "\uC800\uC7A5\uC18C",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u63CF\u8FF0: "<user>/<repo> \uB610\uB294 https://github.com/<user>/<repo> \uD615\uC2DD \uC9C0\uC6D0.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u5360\u4F4D: "user/repo",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93\u4E3A\u7A7A\u63D0\u793A: "\uC800\uC7A5\uC18C \uACBD\uB85C\uB97C \uC785\uB825\uD558\uC138\uC694",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u6807\u9898: "\uBC84\uC804",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u63CF\u8FF0: "GitHub \uB9B4\uB9AC\uC2A4\uB97C \uAC00\uC838\uC628 \uB4A4 \uC120\uD0DD\uD569\uB2C8\uB2E4. \uBE44\uC6B0\uBA74 \uCD5C\uC2E0.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u9ED8\u8BA4\u6700\u65B0: "\uCD5C\uC2E0 \uB9B4\uB9AC\uC2A4",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u6309\u94AE: "\uBC84\uC804 \uAC00\uC838\uC624\uAE30",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u4E2D: "\uAC00\uC838\uC624\uB294 \uC911...",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u7A7A\u63D0\u793A: "\uB9B4\uB9AC\uC2A4\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uD0DC\uADF8\uB97C \uC9C1\uC811 \uC785\uB825\uD574 \uBCF4\uC138\uC694.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u5931\u8D25\u63D0\u793A: "\uB9B4\uB9AC\uC2A4 \uAC00\uC838\uC624\uAE30 \uC2E4\uD328. \uC800\uC7A5\uC18C\uB098 \uB124\uD2B8\uC6CC\uD06C\uB97C \uD655\uC778\uD558\uC138\uC694.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6807\u9898: "\uC791\uC5C5",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6309\u94AE: "\uC9C0\uAE08 \uC124\uCE58",
  \u5378\u8F7D_\u6807\u9898: "\uD50C\uB7EC\uADF8\uC778 \uC81C\uAC70",
  \u5378\u8F7D_\u63D0\u793A: "\uC774 \uD50C\uB7EC\uADF8\uC778\uC744 \uC81C\uAC70\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C? \uC774 \uC791\uC5C5\uC740 \uD50C\uB7EC\uADF8\uC778 \uD3F4\uB354\uB97C \uC0AD\uC81C\uD569\uB2C8\uB2E4.",
  \u5378\u8F7D_\u5378\u8F7D: "\uC81C\uAC70",
  \u5378\u8F7D_\u53D6\u6D88: "\uCDE8\uC18C",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "\uC131\uACF5\uC801\uC73C\uB85C \uC81C\uAC70\uB418\uC5C8\uC2B5\uB2C8\uB2E4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "\uAE30\uBCF8",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "\uADF8\uB8F9",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "\uD0DC\uADF8",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "\uB51C\uB808\uC774",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "\uC5B8\uC5B4 \uC124\uC815",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "\uC120\uD638\uD558\uB294 \uC5B8\uC5B4\uB97C \uC120\uD0DD\uD558\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "\uB514\uB809\uD1A0\uB9AC \uC2A4\uD0C0\uC77C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "\uADF8\uB8F9\uC758 \uC2A4\uD0C0\uC77C\uC744 \uC120\uD0DD\uD558\uC5EC \uBE0C\uB77C\uC6B0\uC9D5 \uACBD\uD5D8\uC744 \uD5A5\uC0C1\uD558\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "\uADF8\uB8F9 \uC2A4\uD0C0\uC77C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "\uADF8\uB8F9\uC758 \uC2A4\uD0C0\uC77C\uC744 \uC120\uD0DD\uD558\uC5EC \uB354 \uB208\uC5D0 \uB744\uACE0 \uC2DD\uBCC4\uD558\uAE30 \uC27D\uAC8C \uB9CC\uB4DC\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "\uD0DC\uADF8 \uC2A4\uD0C0\uC77C",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "\uD0DC\uADF8\uC758 \uC2A4\uD0C0\uC77C\uC744 \uC120\uD0DD\uD558\uC5EC \uB354 \uB208\uC5D0 \uB744\uACE0 \uC2DD\uBCC4\uD558\uAE30 \uC27D\uAC8C \uB9CC\uB4DC\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "\uC9C0\uC5F0 \uC2DC\uC791",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "\uC9C0\uC5F0 \uC2DC\uC791 \uAE30\uB2A5\uC744 \uD65C\uC131\uD654\uD558\uBA74 \uB85C\uB529 \uC21C\uC11C\uB97C \uCD5C\uC801\uD654\uD560 \uC218 \uC788\uC9C0\uB9CC, \uC77C\uBD80 \uD50C\uB7EC\uADF8\uC778\uC5D0\uC11C \uD638\uD658\uC131 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD560 \uC218 \uC788\uC73C\uBBC0\uB85C \uC720\uC758\uD558\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "\uD50C\uB7EC\uADF8\uC778 \uD750\uB9AC\uAC8C \uD45C\uC2DC",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "\uBE44\uD65C\uC131\uD654\uB41C \uD50C\uB7EC\uADF8\uC778\uC5D0 \uC2DC\uAC01\uC801\uC778 \uD750\uB9BC \uD6A8\uACFC\uB97C \uC81C\uACF5\uD558\uC5EC \uD65C\uC131\uD654\uB41C \uD50C\uB7EC\uADF8\uC778\uACFC \uBE44\uD65C\uC131\uD654\uB41C \uD50C\uB7EC\uADF8\uC778\uC744 \uBA85\uD655\uD788 \uAD6C\uBD84\uD558\uC138\uC694.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "\uD50C\uB7EC\uADF8\uC778 \uBA85\uB839\uC744 \uBCC4\uB3C4\uB85C \uC81C\uC5B4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "\uC774 \uC635\uC158\uC744 \uD65C\uC131\uD654\uD558\uBA74 \uAC01 \uD50C\uB7EC\uADF8\uC778\uC758 \uD65C\uC131\uD654/\uBE44\uD65C\uC131\uD654 \uC0C1\uD0DC\uB97C \uBCC4\uB3C4\uB85C \uC81C\uC5B4\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (Obsidian\uC744 \uB2E4\uC2DC \uC2DC\uC791\uD574\uC57C \uC801\uC6A9\uB429\uB2C8\uB2E4)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "\uADF8\uB8F9\uBCC4 \uD50C\uB7EC\uADF8\uC778 \uBA85\uB839 \uC81C\uC5B4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "\uC774 \uC635\uC158\uC744 \uD65C\uC131\uD654\uD558\uBA74 \uC9C0\uC815\uB41C \uADF8\uB8F9\uC758 \uBAA8\uB4E0 \uD50C\uB7EC\uADF8\uC778\uC744 \uD55C \uBC88 \uD074\uB9AD\uC73C\uB85C \uD65C\uC131\uD654\uD558\uAC70\uB098 \uBE44\uD65C\uC131\uD654\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. (Obsidian\uC744 \uB2E4\uC2DC \uC2DC\uC791\uD574\uC57C \uC801\uC6A9\uB429\uB2C8\uB2E4)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "\uC2DC\uC791 \uC2DC \uC5C5\uB370\uC774\uD2B8 \uD655\uC778",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "BPM\uC744 \uC5F4 \uB54C \uC790\uB3D9\uC73C\uB85C \uC5C5\uB370\uC774\uD2B8\uB97C \uD655\uC778\uD558\uACE0 \uAC1C\uC218\uB97C \uAC04\uB2E8\uD788 \uC54C\uB9BD\uB2C8\uB2E4.",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\uB51C\uB808\uC774] \uCD94\uAC00\uB428",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\uB51C\uB808\uC774] ID\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD558\uAC70\uB098 \uBE44\uC5B4 \uC788\uC74C",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\uB51C\uB808\uC774] \uC131\uACF5\uC801\uC73C\uB85C \uC0AD\uC81C\uB428",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\uB51C\uB808\uC774] \uC0AD\uC81C \uC2E4\uD328, \uC774 \uB51C\uB808\uC774\uD558\uC5D0 \uD50C\uB7EC\uADF8\uC778\uC774 \uC874\uC7AC\uD568",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\uADF8\uB8F9] \uCD94\uAC00\uB428",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\uADF8\uB8F9] ID\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD558\uAC70\uB098 \uBE44\uC5B4 \uC788\uC74C",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\uADF8\uB8F9] \uC131\uACF5\uC801\uC73C\uB85C \uC0AD\uC81C\uB428",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\uADF8\uB8F9] \uC0AD\uC81C \uC2E4\uD328, \uC774 \uADF8\uB8F9\uD558\uC5D0 \uD50C\uB7EC\uADF8\uC778\uC774 \uC874\uC7AC\uD568",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[\uD0DC\uADF8] \uCD94\uAC00\uB428",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[\uD0DC\uADF8] ID\uAC00 \uC774\uBBF8 \uC874\uC7AC\uD558\uAC70\uB098 \uBE44\uC5B4 \uC788\uC74C",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[\uD0DC\uADF8] \uC131\uACF5\uC801\uC73C\uB85C \uC0AD\uC81C\uB428",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[\uD0DC\uADF8] \uC0AD\uC81C \uC2E4\uD328, \uC774 \uD0DC\uADF8\uD558\uC5D0 \uD50C\uB7EC\uADF8\uC778\uC774 \uC874\uC7AC\uD568",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "\uB2E4\uB978 \uD50C\uB7EC\uADF8\uC778\uACFC\uC758 \uCDA9\uB3CC\uC774 \uBC1C\uC0DD\uD560 \uACBD\uC6B0",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "\uB2A5\uB825\uC774 \uC81C\uD55C\uB418\uC5B4 \uC788\uC5B4 \uC774 \uBB38\uC81C\uB97C \uD574\uACB0\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC9C0\uC5F0 \uC2DC\uC791\uC744 \uBE44\uD65C\uC131\uD654\uD558\uC5EC \uBAA8\uB4E0 \uCDA9\uB3CC \uBB38\uC81C\uB97C \uD574\uACB0\uD558\uC138\uC694.",
  \u901A\u77E5_\u53EF\u66F4\u65B0\u6570\u91CF: "\uC5C5\uB370\uC774\uD2B8 \uAC00\uB2A5\uD55C \uD50C\uB7EC\uADF8\uC778 {count}\uAC1C\uAC00 \uC788\uC2B5\uB2C8\uB2E4",
  \u7B5B\u9009_\u72B6\u6001_\u5168\u90E8: "\uC0C1\uD0DC: \uC804\uCCB4",
  \u7B5B\u9009_\u5206\u7EC4_\u5168\u90E8: "\uADF8\uB8F9: \uC804\uCCB4",
  \u7B5B\u9009_\u6807\u7B7E_\u5168\u90E8: "\uD0DC\uADF8: \uC804\uCCB4",
  \u7B5B\u9009_\u5EF6\u8FDF_\u5168\u90E8: "\uC9C0\uC5F0: \uC804\uCCB4",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "\uD50C\uB7EC\uADF8\uC778 \uAD00\uB9AC\uC790\uB97C \uC5FD\uB2C8\uB2E4",
  \u901A\u77E5_\u83B7\u53D6\u7248\u672C\u4E2D\u6587\u6848: "\uC6D0\uACA9 \uBC84\uC804 \uC815\uBCF4\uB97C \uAC00\uC838\uC624\uB294 \uC911\u2026",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6807\u9898: "\uBC84\uC804 \uC120\uD0DD",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u7248\u672C_\u6807\u9898: "\uBC84\uC804",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u4E2D: "\uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uBC84\uC804\uC744 \uAC00\uC838\uC624\uB294 \uC911\u2026",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u5931\u8D25\u63D0\u793A: "\uBC84\uC804 \uBAA9\uB85D\uC744 \uAC00\uC838\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uB098\uC911\uC5D0 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u65E0\u7248\u672C\u63D0\u793A: "\uBC84\uC804 \uBAA9\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uAC10\uC9C0\uB41C/\uCD5C\uC2E0 \uBC84\uC804\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u4E0B\u8F7D\u6309\u94AE: "\uC5C5\uB370\uC774\uD2B8 \uB2E4\uC6B4\uB85C\uB4DC",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6210\u529F\u63D0\u793A: "\uD50C\uB7EC\uADF8\uC778\uC744 \uB2E4\uC6B4\uB85C\uB4DC\uD558\uACE0 \uC5C5\uB370\uC774\uD2B8\uD588\uC2B5\uB2C8\uB2E4",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5F00\u59CB\u63D0\u793A: "\uD50C\uB7EC\uADF8\uC778 \uB9E4\uB2C8\uD398\uC2A4\uD2B8\uB97C \uC0C8\uB85C \uACE0\uCE58\uB294 \uC911\u2026",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5931\u8D25\u63D0\u793A: "\uC7AC\uB85C\uB4DC \uC2E4\uD328. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694(\uCF58\uC194 \uD655\uC778).",
  \u7BA1\u7406\u5668_\u5355\u6B21\u542F\u52A8\u4E2D_\u63D0\u793A: "\uD65C\uC131\uD654 \uC911\u2026 \uC7A0\uC2DC\uB9CC \uAE30\uB2E4\uB824 \uC8FC\uC138\uC694",
  \u7BA1\u7406\u5668_\u91CD\u542F\u4E2D_\u63D0\u793A: "\uC7AC\uC2DC\uC791 \uC911\u2026 \uC7A0\uC2DC\uB9CC \uAE30\uB2E4\uB824 \uC8FC\uC138\uC694",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u68C0\u6D4B\u4E2D_\u63D0\u793A: "\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD558\uB294 \uC911\u2026",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u63D0\u793A: "\uC800\uC7A5\uC18C \uC5F4\uAE30: {repo}",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u672A\u8BB0\u5F55_\u63D0\u793A: "\uC800\uC7A5\uC18C\uAC00 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u9700\u624B\u52A8\u6DFB\u52A0_\u63D0\u793A: "\uC774 \uD50C\uB7EC\uADF8\uC778\uC740 \uACF5\uC2DD/BPM \uC124\uCE58\uAC00 \uC544\uB2D9\uB2C8\uB2E4. \uC18C\uC2A4\uB97C \uC218\uB3D9\uC73C\uB85C \uC124\uC815\uD558\uC138\uC694.",
  \u4E0B\u8F7D\u66F4\u65B0_\u7F3A\u5C11\u4ED3\u5E93\u63D0\u793A: "\uC800\uC7A5\uC18C \uC815\uBCF4\uAC00 \uC5C6\uC5B4 \uC5C5\uB370\uC774\uD2B8\uB97C \uB2E4\uC6B4\uB85C\uB4DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
  \u7BA1\u7406\u5668_\u66F4\u591A\u64CD\u4F5C_\u63CF\u8FF0: "\uB354 \uB9CE\uC740 \uC791\uC5C5",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u6807\u9898: "\uC800\uC7A5\uC18C \uC5F4\uAE30"
};

// src/lang/locale/fr.ts
var fr_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "Gestionnaire de plugins",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "Succ\xE8s",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "\xC9chec",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "Ajouter",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "Op\xE9ration",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "Recherche",
  \u901A\u7528_\u8FC7\u6EE4_\u6587\u672C: "Filtrer",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "Nom",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "Aucun groupe",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "Aucun tag",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "Aucun retard",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "Total",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "Activer",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "D\xE9sactiver",
  \u901A\u7528_\u5173\u95ED_\u6587\u672C: "Fermer",
  \u901A\u7528_\u5F00\u542F_\u6587\u672C: "Ouvrir",
  \u901A\u7528_\u4FDD\u5B58_\u6587\u672C: "Enregistrer",
  \u901A\u7528_\u53D6\u6D88_\u6587\u672C: "Annuler",
  \u901A\u7528_\u8FD4\u56DE_\u6587\u672C: "Retour",
  \u5BFC\u51FA_\u6B63\u6587\u63D0\u793A: "Section corps : vous pouvez modifier ou remplacer ce contenu.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u9690\u85CFBPM\u6807\u7B7E_\u6807\u9898: "Masquer le tag \u201Cbpm install\u201D",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u9690\u85CFBPM\u6807\u7B7E_\u63CF\u8FF0: "Masque simplement l\u2019affichage du tag ajout\xE9 automatiquement (le marquage est conserv\xE9).",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u6807\u9898: "R\xE9pertoire d\u2019export des infos plugin",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u63CF\u8FF0: "Chemin relatif au coffre pour exporter les infos BPM (Base). Appliqu\xE9 en cliquant sur \u201CEnregistrer\u201D.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u793A\u4F8B: "ex. : BPM-Export",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u63D0\u793A_\u6807\u9898: "Conventions frontmatter",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u63D0\u793A_\u63CF\u8FF0: "Lecture seule : bpm_ro_id/name/group/tags/delay/installed_via_bpm ; \xE9ditable : bpm_rw_desc/note/enabled ; conditionnel : bpm_rwc_repo (sans correspondance officielle et non BPM).",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u6807\u9898: "GitHub API Token",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u63CF\u8FF0: "Pour t\xE9l\xE9charger depuis GitHub et r\xE9duire les limites d\u2019API. Optionnel.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u6743\u9650: "Port\xE9e requise : Public repositories",
  \u83DC\u5355_\u7B14\u8BB0_\u6807\u9898: "Note",
  \u83DC\u5355_\u5FEB\u6377\u952E_\u6807\u9898: "Raccourcis",
  \u83DC\u5355_GitHub_\u6807\u9898: "GitHub",
  \u83DC\u5355_\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "V\xE9rifier les mises \xE0 jour",
  \u83DC\u5355_\u5355\u6B21\u542F\u52A8_\u63CF\u8FF0: "D\xE9marrage unique",
  \u83DC\u5355_\u91CD\u542F\u63D2\u4EF6_\u63CF\u8FF0: "Red\xE9marrer le plugin",
  \u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898: "Masquer le plugin",
  \u83DC\u5355_\u590D\u5236ID_\u6807\u9898: "Copier l\u2019ID",
  \u7BA1\u7406\u5668_\u5B89\u88C5_GITHUB_\u63CF\u8FF0: "Installer plugin / th\xE8me (d\xE9p\xF4t GitHub)",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ECB\u7ECD: "Installer des plugins ou th\xE8mes depuis GitHub (utilise le dernier release).",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u6807\u9898: "Type",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63CF\u8FF0: "Choisissez d\u2019installer un plugin ou un th\xE8me.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63D2\u4EF6: "Plugin",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u4E3B\u9898: "Th\xE8me",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u6807\u9898: "D\xE9p\xF4t",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u63CF\u8FF0: "Chemin GitHub, prend en charge <user>/<repo> ou https://github.com/<user>/<repo>.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u5360\u4F4D: "user/repo",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93\u4E3A\u7A7A\u63D0\u793A: "Veuillez saisir le chemin du d\xE9p\xF4t",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u6807\u9898: "Version",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u63CF\u8FF0: "R\xE9cup\xE9rez les releases puis choisissez ; vide = derni\xE8re.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u9ED8\u8BA4\u6700\u65B0: "Dernier release",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u6309\u94AE: "R\xE9cup\xE9rer les versions",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u4E2D: "R\xE9cup\xE9ration...",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u7A7A\u63D0\u793A: "Aucune release trouv\xE9e, essayez de saisir un tag manuellement.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u5931\u8D25\u63D0\u793A: "\xC9chec de la r\xE9cup\xE9ration des releases, v\xE9rifiez le d\xE9p\xF4t ou le r\xE9seau.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6807\u9898: "Action",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6309\u94AE: "Installer maintenant",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6807\u9898: "Choisir la version",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u7248\u672C_\u6807\u9898: "Version",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u4E2D: "R\xE9cup\xE9ration des versions disponibles\u2026",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u5931\u8D25\u63D0\u793A: "\xC9chec de r\xE9cup\xE9ration de la liste des versions. R\xE9essayez plus tard.",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u65E0\u7248\u672C\u63D0\u793A: "Aucune liste de versions. Essai avec la version d\xE9tect\xE9e ou la derni\xE8re.",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u4E0B\u8F7D\u6309\u94AE: "T\xE9l\xE9charger la mise \xE0 jour",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6210\u529F\u63D0\u793A: "Plugin t\xE9l\xE9charg\xE9 et mis \xE0 jour",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5F00\u59CB\u63D0\u793A: "Actualisation des manifests\u2026",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5931\u8D25\u63D0\u793A: "\xC9chec du rechargement. R\xE9essayez (voir la console).",
  \u7BA1\u7406\u5668_\u5355\u6B21\u542F\u52A8\u4E2D_\u63D0\u793A: "Activation\u2026 veuillez patienter",
  \u7BA1\u7406\u5668_\u91CD\u542F\u4E2D_\u63D0\u793A: "Red\xE9marrage\u2026 veuillez patienter",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u68C0\u6D4B\u4E2D_\u63D0\u793A: "D\xE9tection du d\xE9p\xF4t\u2026",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u63D0\u793A: "Ouvrir le d\xE9p\xF4t : {repo}",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u672A\u8BB0\u5F55_\u63D0\u793A: "D\xE9p\xF4t non enregistr\xE9",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u9700\u624B\u52A8\u6DFB\u52A0_\u63D0\u793A: "Ce plugin n\u2019est pas officiel/ni install\xE9 via BPM. Ajoutez la source manuellement.",
  \u4E0B\u8F7D\u66F4\u65B0_\u7F3A\u5C11\u4ED3\u5E93\u63D0\u793A: "Source du d\xE9p\xF4t manquante, impossible de t\xE9l\xE9charger la mise \xE0 jour.",
  \u7B5B\u9009_\u5168\u90E8_\u63CF\u8FF0: "Tout",
  \u7B5B\u9009_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Activ\xE9s uniquement",
  \u7B5B\u9009_\u4EC5\u7981\u7528_\u63CF\u8FF0: "D\xE9sactiv\xE9s uniquement",
  \u7B5B\u9009_\u5DF2\u5206\u7EC4_\u63CF\u8FF0: "Group\xE9s",
  \u7B5B\u9009_\u672A\u5206\u7EC4_\u63CF\u8FF0: "Non group\xE9s",
  \u7B5B\u9009_\u6709\u6807\u7B7E_\u63CF\u8FF0: "Avec tags",
  \u7B5B\u9009_\u65E0\u6807\u7B7E_\u63CF\u8FF0: "Sans tags",
  \u7B5B\u9009_\u6709\u7B14\u8BB0_\u63CF\u8FF0: "Avec note",
  \u7B5B\u9009_\u72B6\u6001_\u5168\u90E8: "\xC9tat : Tous",
  \u7B5B\u9009_\u5206\u7EC4_\u5168\u90E8: "Groupes : Tous",
  \u7B5B\u9009_\u6807\u7B7E_\u5168\u90E8: "Tags : Tous",
  \u7B5B\u9009_\u5EF6\u8FDF_\u5168\u90E8: "Retard : Tous",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "Visiter le d\xE9p\xF4t",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "Acc\xE9der aux tutoriels vid\xE9o",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "Activer le mode \xE9dition pour personnaliser en profondeur",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "Recharger les plugins pour prise d\u2019effet imm\xE9diate",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "V\xE9rifier les mises \xE0 jour de plugins",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "Tout d\xE9sactiver en un clic",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "Tout activer en un clic",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "G\xE9rer les param\xE8tres du plugin",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Afficher uniquement les plugins activ\xE9s",
  \u7BA1\u7406\u5668_\u672A\u5206\u7EC4_\u63CF\u8FF0: "Filtrer les plugins non group\xE9s",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "Ouvrir l\u2019interface de r\xE9glages",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "Restaurer l\u2019\xE9tat initial",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "Ouvrir le r\xE9pertoire du plugin",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "Supprimer compl\xE8tement le plugin",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "Basculer l\u2019\xE9tat du plugin",
  \u7BA1\u7406\u5668_\u4E0B\u8F7D\u66F4\u65B0_\u63CF\u8FF0: "T\xE9l\xE9charger une mise \xE0 jour (choix de version, pr\xE9-release incl.)",
  \u5378\u8F7D_\u6807\u9898: "D\xE9sinstaller le plugin",
  \u5378\u8F7D_\u63D0\u793A: "\xCAtes-vous s\xFBr de d\xE9sinstaller ? Le dossier du plugin sera supprim\xE9.",
  \u5378\u8F7D_\u5378\u8F7D: "D\xE9sinstaller",
  \u5378\u8F7D_\u53D6\u6D88: "Annuler",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "D\xE9sinstall\xE9 avec succ\xE8s",
  \u4E00\u952E_\u6807\u9898: "Activation/D\xE9sactivation en un clic",
  \u4E00\u952E_\u63D0\u793A: "Confirmez-vous l\u2019activation/d\xE9sactivation en masse ? (Patientez pendant l\u2019op\xE9ration)",
  \u4E00\u952E_\u542F\u7981: "Activer/D\xE9sactiver",
  \u4E00\u952E_\u53D6\u6D88: "Annuler",
  \u4E00\u952E_\u901A\u77E5_\u4E00: "Op\xE9ration termin\xE9e",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "Basique",
  \u8BBE\u7F6E_\u6837\u5F0F\u8BBE\u7F6E_\u524D\u7F00: "Style",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "Groupe",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "Tag",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "Retard",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "Langue",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "Choisissez votre langue pr\xE9f\xE9r\xE9e.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u6807\u9898: "Centrer l\u2019interface",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u754C\u9762\u5C45\u4E2D_\u63CF\u8FF0: "D\xE9finir si l\u2019interface est centr\xE9e",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "Style d\u2019affichage",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "Choisir le style pour les groupes.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E00: "Toujours d\xE9velopp\xE9",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E8C: "Jamais d\xE9velopp\xE9",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u4E09: "D\xE9velopper au survol",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u9009\u9879_\u56DB: "D\xE9velopper au clic",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "Style de groupe",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "Choisir le style des groupes.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E00: "Style 1",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E8C: "Style 2",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u4E09: "Style 3",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u9009\u9879_\u56DB: "Style 4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "Style de tag",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "Choisir le style des tags.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E00: "Style 1",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E8C: "Style 2",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u4E09: "Style 3",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u9009\u9879_\u56DB: "Style 4",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "D\xE9marrage diff\xE9r\xE9",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "Optimise l\u2019ordre de chargement mais peut causer des incompatibilit\xE9s.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "Estomper les plugins",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "Effet visuel pour distinguer activ\xE9/d\xE9sactiv\xE9.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u6807\u9898: "Persistance des filtres",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u7B5B\u9009\u6301\u4E45\u5316_\u63CF\u8FF0: "Voir la m\xEAme liste filtr\xE9e \xE0 chaque ouverture.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "Commandes s\xE9par\xE9es par plugin",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "Contr\xF4ler \xE9tat activ\xE9/d\xE9sactiv\xE9 par plugin (red\xE9marrage requis).",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "Commandes par groupe",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "Activer/d\xE9sactiver un groupe en un clic (red\xE9marrage requis).",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "V\xE9rifier les mises \xE0 jour au d\xE9marrage",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "Au lancement de BPM, v\xE9rifier les mises \xE0 jour et afficher le nombre.",
  \u901A\u77E5_\u68C0\u67E5\u66F4\u65B0\u5931\u8D25_\u5EFA\u8BAEToken: "\xC9chec r\xE9seau/API. Configurez un token GitHub (Public repositories) puis r\xE9essayez.",
  \u901A\u77E5_\u68C0\u6D4B\u66F4\u65B0\u4E2D\u6587\u6848: "V\xE9rification des mises \xE0 jour de plugins...",
  \u901A\u77E5_\u53EF\u66F4\u65B0\u6570\u91CF: "{count} plugins ont des mises \xE0 jour disponibles",
  \u901A\u77E5_\u83B7\u53D6\u7248\u672C\u4E2D\u6587\u6848: "R\xE9cup\xE9ration des infos de versions distantes\u2026",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Retard] Ajout\xE9",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Retard] ID existant ou vide",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Retard] Supprim\xE9",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Retard] Suppression impossible, des plugins l\u2019utilisent",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Groupe] Ajout\xE9",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Groupe] ID existant ou vide",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Groupe] Supprim\xE9",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Groupe] Suppression impossible, des plugins l\u2019utilisent",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Tag] Ajout\xE9",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Tag] ID existant ou vide",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Tag] Supprim\xE9",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Tag] Suppression impossible, des plugins l\u2019utilisent",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "Conflit avec d\u2019autres plugins",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "D\xE9sactivez le d\xE9marrage diff\xE9r\xE9 pour r\xE9soudre les conflits.",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "Ouvrir le gestionnaire de plugins",
  \u6807\u7B7E_BPM\u5B89\u88C5_\u540D\u79F0: "bpm install",
  \u5B89\u88C5_\u6210\u529F_\u63D0\u793A: "Install\xE9/mis \xE0 jour : ",
  \u5B89\u88C5_\u9519\u8BEF_\u9650\u901F: "Limite GitHub (403). Configurez un token puis r\xE9essayez.",
  \u5B89\u88C5_\u9519\u8BEF_\u7F3A\u5C11\u8D44\u6E90: "Ressources de release introuvables. V\xE9rifiez d\xE9p\xF4t/version.",
  \u5B89\u88C5_\u9519\u8BEF_\u901A\u7528: "\xC9chec de l\u2019installation. V\xE9rifiez d\xE9p\xF4t/version ou r\xE9seau.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8C03\u8BD5\u6A21\u5F0F_\u6807\u9898: "Mode debug",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8C03\u8BD5\u6A21\u5F0F_\u63CF\u8FF0: "D\xE9sactiv\xE9 : erreurs uniquement. Activ\xE9 : logs de debug.",
  \u7BA1\u7406\u5668_\u66F4\u591A\u64CD\u4F5C_\u63CF\u8FF0: "Plus d\u2019actions",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u6807\u9898: "Ouvrir le d\xE9p\xF4t"
};

// src/lang/locale/es.ts
var es_default = {
  \u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C: "Administrador de plugins",
  \u901A\u7528_\u6210\u529F_\u6587\u672C: "\xC9xito",
  \u901A\u7528_\u5931\u8D25_\u6587\u672C: "Fallo",
  \u901A\u7528_\u65B0\u589E_\u6587\u672C: "Agregar",
  \u901A\u7528_\u64CD\u4F5C_\u6587\u672C: "Operaci\xF3n",
  \u901A\u7528_\u641C\u7D22_\u6587\u672C: "Buscar",
  \u901A\u7528_\u540D\u79F0_\u6587\u672C: "Nombre",
  \u901A\u7528_\u65E0\u5206\u7EC4_\u6587\u672C: "Sin grupo",
  \u901A\u7528_\u65E0\u6807\u7B7E_\u6587\u672C: "Sin etiqueta",
  \u901A\u7528_\u65E0\u5EF6\u8FDF_\u6587\u672C: "Sin retraso",
  \u901A\u7528_\u8FC7\u6EE4_\u6587\u672C: "Filtrar",
  \u901A\u7528_\u603B\u8BA1_\u6587\u672C: "Total",
  \u901A\u7528_\u542F\u7528_\u6587\u672C: "Habilitar",
  \u901A\u7528_\u7981\u7528_\u6587\u672C: "Deshabilitar",
  \u901A\u7528_\u8FD4\u56DE_\u6587\u672C: "Volver",
  \u7BA1\u7406\u5668_GITHUB_\u63CF\u8FF0: "Visitar repositorio",
  \u7BA1\u7406\u5668_\u89C6\u9891\u6559\u7A0B_\u63CF\u8FF0: "Acceder a tutoriales en video",
  \u7BA1\u7406\u5668_\u7F16\u8F91\u6A21\u5F0F_\u63CF\u8FF0: "Habilitar modo de edici\xF3n para una personalizaci\xF3n profunda de la configuraci\xF3n del plugin",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u63CF\u8FF0: "Recargar plugins para que surtan efecto inmediatamente",
  \u7BA1\u7406\u5668_\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "Comprobar actualizaciones de plugins",
  \u7BA1\u7406\u5668_\u66F4\u591A\u64CD\u4F5C_\u63CF\u8FF0: "M\xE1s acciones",
  \u7BA1\u7406\u5668_\u4E00\u952E\u7981\u7528_\u63CF\u8FF0: "Deshabilitar todos los plugins a la vez",
  \u7BA1\u7406\u5668_\u4E00\u952E\u542F\u7528_\u63CF\u8FF0: "Habilitar todos los plugins a la vez",
  \u7BA1\u7406\u5668_\u63D2\u4EF6\u8BBE\u7F6E_\u63CF\u8FF0: "Administrar configuraci\xF3n de plugins",
  \u7BA1\u7406\u5668_\u4EC5\u542F\u7528_\u63CF\u8FF0: "Mostrar solo plugins habilitados",
  \u7BA1\u7406\u5668_\u6253\u5F00\u8BBE\u7F6E_\u63CF\u8FF0: "Abrir la interfaz de configuraci\xF3n",
  \u7BA1\u7406\u5668_\u8FD8\u539F\u5185\u5BB9_\u63CF\u8FF0: "Restaurar al estado inicial",
  \u7BA1\u7406\u5668_\u6253\u5F00\u76EE\u5F55_\u63CF\u8FF0: "Abrir el directorio de plugins",
  \u7BA1\u7406\u5668_\u5220\u9664\u63D2\u4EF6_\u63CF\u8FF0: "Eliminar completamente el plugin",
  \u7BA1\u7406\u5668_\u5207\u6362\u72B6\u6001_\u63CF\u8FF0: "Alternar el estado del plugin",
  \u83DC\u5355_\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "Comprobar actualizaci\xF3n",
  \u83DC\u5355_\u9690\u85CF\u63D2\u4EF6_\u6807\u9898: "Ocultar plugin",
  \u83DC\u5355_\u590D\u5236ID_\u6807\u9898: "Copiar ID",
  \u7BA1\u7406\u5668_\u5B89\u88C5_GITHUB_\u63CF\u8FF0: "Instalar plugin / tema (repositorio GitHub)",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ECB\u7ECD: "Instala plugins o temas desde GitHub (lee los assets del \xFAltimo release).",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u6807\u9898: "Tipo",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63CF\u8FF0: "Elige instalar un plugin o un tema.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u63D2\u4EF6: "Plugin",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7C7B\u578B_\u4E3B\u9898: "Tema",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u6807\u9898: "Repositorio",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u63CF\u8FF0: "Ruta de GitHub, admite <usuario>/<repo> o https://github.com/<usuario>/<repo>.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93_\u5360\u4F4D: "usuario/repo",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u4ED3\u5E93\u4E3A\u7A7A\u63D0\u793A: "Introduce la ruta del repositorio",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u6807\u9898: "Versi\xF3n",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u63CF\u8FF0: "Pulsa para obtener releases; vac\xEDo = \xFAltima.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u9ED8\u8BA4\u6700\u65B0: "\xDAltimo release",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u6309\u94AE: "Obtener versiones",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u83B7\u53D6\u4E2D: "Obteniendo...",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u7A7A\u63D0\u793A: "No se encontraron releases, intenta escribir un tag manualmente.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u7248\u672C_\u5931\u8D25\u63D0\u793A: "No se pudieron obtener los releases, revisa repo o red.",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6807\u9898: "Acci\xF3n",
  \u7BA1\u7406\u5668_\u5B89\u88C5_\u64CD\u4F5C_\u6309\u94AE: "Instalar ahora",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6807\u9898: "Seleccionar versi\xF3n",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u7248\u672C_\u6807\u9898: "Versi\xF3n",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u4E2D: "Obteniendo versiones disponibles\u2026",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u83B7\u53D6\u5931\u8D25\u63D0\u793A: "No se pudo obtener la lista de versiones. Int\xE9ntalo de nuevo m\xE1s tarde.",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u65E0\u7248\u672C\u63D0\u793A: "No hay lista de versiones. Se intentar\xE1 usar la versi\xF3n detectada o la m\xE1s reciente.",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u4E0B\u8F7D\u6309\u94AE: "Descargar actualizaci\xF3n",
  \u7BA1\u7406\u5668_\u9009\u62E9\u7248\u672C_\u6210\u529F\u63D0\u793A: "Plugin descargado y actualizado",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5F00\u59CB\u63D0\u793A: "Actualizando manifiestos de plugins\u2026",
  \u7BA1\u7406\u5668_\u91CD\u8F7D\u63D2\u4EF6_\u5931\u8D25\u63D0\u793A: "Error al recargar. Int\xE9ntalo de nuevo (ver consola).",
  \u7BA1\u7406\u5668_\u5355\u6B21\u542F\u52A8\u4E2D_\u63D0\u793A: "Activando\u2026 espera un momento",
  \u7BA1\u7406\u5668_\u91CD\u542F\u4E2D_\u63D0\u793A: "Reiniciando\u2026 espera un momento",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u68C0\u6D4B\u4E2D_\u63D0\u793A: "Detectando repositorio\u2026",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u63D0\u793A: "Abrir repo: {repo}",
  \u7BA1\u7406\u5668_\u6253\u5F00\u4ED3\u5E93_\u6807\u9898: "Abrir repositorio",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u672A\u8BB0\u5F55_\u63D0\u793A: "Repositorio no registrado",
  \u7BA1\u7406\u5668_\u4ED3\u5E93\u9700\u624B\u52A8\u6DFB\u52A0_\u63D0\u793A: "Este plugin no es oficial/instalado por BPM. A\xF1ade el origen manualmente.",
  \u4E0B\u8F7D\u66F4\u65B0_\u7F3A\u5C11\u4ED3\u5E93\u63D0\u793A: "Falta el repositorio; no se puede descargar la actualizaci\xF3n.",
  \u5378\u8F7D_\u6807\u9898: "Desinstalar Plugin",
  \u5378\u8F7D_\u63D0\u793A: "\xBFEst\xE1 seguro de que desea desinstalar este plugin? Esto eliminar\xE1 la carpeta del plugin.",
  \u5378\u8F7D_\u5378\u8F7D: "Desinstalar",
  \u5378\u8F7D_\u53D6\u6D88: "Cancelar",
  \u5378\u8F7D_\u901A\u77E5_\u4E00: "Desinstalado correctamente",
  \u901A\u7528_\u4FDD\u5B58_\u6587\u672C: "Guardar configuraci\xF3n",
  \u5BFC\u51FA_\u6B63\u6587\u63D0\u793A: "Cuerpo: puedes editar o reemplazar este contenido.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u9690\u85CFBPM\u6807\u7B7E_\u6807\u9898: "Ocultar etiqueta \u201Cbpm install\u201D",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u9690\u85CFBPM\u6807\u7B7E_\u63CF\u8FF0: "Oculta la etiqueta a\xF1adida autom\xE1ticamente en la lista (solo visual).",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u6807\u9898: "Directorio de exportaci\xF3n de informaci\xF3n",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u63CF\u8FF0: "Ruta relativa del vault para exportar info BPM (Base). Se aplica al pulsar \u201CGuardar configuraci\xF3n\u201D.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u76EE\u5F55_\u793A\u4F8B: "p.ej.: BPM-Export",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u63D0\u793A_\u6807\u9898: "Convenciones frontmatter",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5BFC\u51FA\u63D0\u793A_\u63CF\u8FF0: "Solo lectura: bpm_ro_id/name/group/tags/delay/installed_via_bpm; editable: bpm_rw_desc/note/enabled; condicional: bpm_rwc_repo (sin coincidencia oficial y no instalado por BPM).",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u6807\u9898: "GitHub API Token",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_GITHUB_TOKEN_\u63CF\u8FF0: "Para descargar plugins/temas de GitHub y reducir l\xEDmites de API. Opcional.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u524D\u7F00: "Configuraci\xF3n b\xE1sica",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u524D\u7F00: "Grupo",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u524D\u7F00: "Etiqueta",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u524D\u7F00: "Retraso",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u6807\u9898: "Configuraci\xF3n de idioma",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8BED\u8A00_\u63CF\u8FF0: "Seleccione su idioma preferido.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u6807\u9898: "Estilo del directorio",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u76EE\u5F55\u6837\u5F0F_\u63CF\u8FF0: "Seleccione el estilo del grupo para mejorar la experiencia de navegaci\xF3n.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u6807\u9898: "Estilo del grupo",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u6837\u5F0F_\u63CF\u8FF0: "Seleccione el estilo del grupo para hacerlo m\xE1s visible y f\xE1cil de identificar.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u6807\u9898: "Estilo de la etiqueta",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6807\u7B7E\u6837\u5F0F_\u63CF\u8FF0: "Seleccione el estilo de la etiqueta para hacerlo m\xE1s visible y f\xE1cil de identificar.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u6807\u9898: "Inicio con retraso",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5EF6\u65F6\u542F\u52A8_\u63CF\u8FF0: "Habilitar la funci\xF3n de inicio con retraso puede optimizar el orden de carga, pero tenga en cuenta que esto puede causar problemas de compatibilidad con algunos plugins.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u6807\u9898: "Atenuar plugins",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u6DE1\u5316\u63D2\u4EF6_\u63CF\u8FF0: "Proporcione un efecto de atenuaci\xF3n visual para plugins deshabilitados para distinguir claramente entre plugins habilitados y deshabilitados.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u6807\u9898: "Controlar comandos de plugins por separado",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5355\u72EC\u547D\u4EE4_\u63CF\u8FF0: "Habilite esta opci\xF3n para controlar el estado habilitado y deshabilitado de cada plugin por separado. (Reinicie Obsidian para que surtan efecto)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u6807\u9898: "Controlar comandos de plugins por grupo",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u5206\u7EC4\u547D\u4EE4_\u63CF\u8FF0: "Habilite esta opci\xF3n para habilitar o deshabilitar todos los plugins de un grupo espec\xEDfico con un solo clic. (Reinicie Obsidian para que surtan efecto)",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u6807\u9898: "Comprobar actualizaciones al inicio",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u542F\u52A8\u68C0\u67E5\u66F4\u65B0_\u63CF\u8FF0: "Al abrir BPM, comprueba autom\xE1ticamente actualizaciones y muestra un aviso breve con el recuento.",
  \u6807\u7B7E_BPM\u5B89\u88C5_\u540D\u79F0: "bpm install",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Retraso] A\xF1adido",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Retraso] El ID ya existe o est\xE1 vac\xEDo",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Retraso] Eliminado correctamente",
  \u8BBE\u7F6E_\u5EF6\u8FDF\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Retraso] Fallo al eliminar, existen plugins bajo este retraso",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Grupo] A\xF1adido",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Grupo] El ID ya existe o est\xE1 vac\xEDo",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Grupo] Eliminado correctamente",
  \u8BBE\u7F6E_\u5206\u7EC4\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Grupo] Fallo al eliminar, existen plugins bajo este grupo",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E00: "[Etiqueta] A\xF1adido",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E8C: "[Etiqueta] El ID ya existe o est\xE1 vac\xEDo",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u4E09: "[Etiqueta] Eliminado correctamente",
  \u8BBE\u7F6E_\u6807\u7B7E\u8BBE\u7F6E_\u901A\u77E5_\u56DB: "[Etiqueta] Fallo al eliminar, existen plugins bajo esta etiqueta",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u6807\u9898: "Si encuentra conflictos con otros plugins",
  \u8BBE\u7F6E_\u63D0\u793A_\u4E00_\u63CF\u8FF0: "Debido a capacidades limitadas, no puedo solucionar este problema. Por favor, deshabilite el inicio con retraso para resolver todos los problemas de conflicto.",
  \u901A\u77E5_\u68C0\u6D4B\u66F4\u65B0\u4E2D: "Comprobando actualizaciones\u2026",
  \u901A\u77E5_\u53EF\u66F4\u65B0\u6570\u91CF: "{count} plugins tienen actualizaciones disponibles",
  \u901A\u77E5_\u83B7\u53D6\u7248\u672C\u4E2D\u6587\u6848: "Obteniendo informaci\xF3n de versiones remotas\u2026",
  \u7B5B\u9009_\u72B6\u6001_\u5168\u90E8: "Estado: Todos",
  \u7B5B\u9009_\u5206\u7EC4_\u5168\u90E8: "Grupos: Todos",
  \u7B5B\u9009_\u6807\u7B7E_\u5168\u90E8: "Etiquetas: Todas",
  \u7B5B\u9009_\u5EF6\u8FDF_\u5168\u90E8: "Retraso: Todos",
  \u547D\u4EE4_\u7BA1\u7406\u9762\u677F_\u63CF\u8FF0: "Abrir el administrador de plugins",
  \u7BA1\u7406\u5668_\u4E0B\u8F7D\u66F4\u65B0_\u63CF\u8FF0: "Descargar actualizaci\xF3n (elige versi\xF3n, incl. pre-release)",
  \u5B89\u88C5_\u6210\u529F_\u63D0\u793A: "Instalado/actualizado: ",
  \u5B89\u88C5_\u9519\u8BEF_\u9650\u901F: "Solicitud a GitHub limitada (403). Configure un token y reintente.",
  \u5B89\u88C5_\u9519\u8BEF_\u7F3A\u5C11\u8D44\u6E90: "No se encontraron assets/archivos de la release. Verifique repositorio/versi\xF3n.",
  \u5B89\u88C5_\u9519\u8BEF_\u901A\u7528: "Fallo al instalar. Verifique repositorio/versi\xF3n o red.",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8C03\u8BD5\u6A21\u5F0F_\u6807\u9898: "Modo depuraci\xF3n",
  \u8BBE\u7F6E_\u57FA\u7840\u8BBE\u7F6E_\u8C03\u8BD5\u6A21\u5F0F_\u63CF\u8FF0: "Si est\xE1 desactivado, solo se muestran errores; si est\xE1 activado, se imprimen logs de depuraci\xF3n."
};

// src/lang/inxdex.ts
var Translator = class {
  constructor(manager) {
    this.language = {
      "zh-cn": "\u7B80\u4F53\u4E2D\u6587",
      "en": "English",
      "ru": "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A",
      "ja": "\u65E5\u672C\u8A9E",
      "ko": "\uD55C\uAD6D\uC5B4",
      "fr": "Fran\xE7ais",
      "es": "Espa\xF1ol"
    };
    this.localeMap = {
      "zh-cn": zh_cn_default,
      "en": en_default,
      "ru": ru_default,
      "ja": ja_default,
      "ko": ko_default,
      "fr": fr_default,
      "es": es_default
    };
    this.manager = manager;
  }
  // 方法用于获取翻译后的字符串
  t(str) {
    const language = this.normalizeLang(this.manager.settings.LANGUAGE || "en");
    const locale = this.localeMap[language] || en_default;
    const base = en_default;
    const fallback = zh_cn_default;
    return locale[str] || base[str] || fallback[str];
  }
  normalizeLang(lang) {
    const lower = (lang || "").toLowerCase().replace("_", "-");
    const map = {
      // Official mappings we support
      "en": "en",
      "en-gb": "en",
      "zh": "zh-cn",
      "zh-cn": "zh-cn",
      "zh-tw": "zh-cn",
      "ru": "ru",
      "ja": "ja",
      "ko": "ko",
      "fr": "fr",
      "es": "es"
    };
    return map[lower] || map[lower.split("-")[0]] || "en";
  }
};

// src/agreement.ts
var import_obsidian21 = require("obsidian");
var Agreement = class {
  /**
   * 构造函数，初始化插件安装器
   * @param SMPL - ShareMyPlugin 实例
   */
  constructor(SMPL) {
    // 标记是否已经加载了社区插件列表
    this.loaded = false;
    // 防抖函数，用于定时刷新社区插件列表，每小时执行一次
    this.debounceFetch = (0, import_obsidian21.debounce)(async () => {
      await this.fetchCommunityPlugins();
    }, 1e3 * 60 * 60);
    this.plugin = SMPL;
    this.fetchCommunityPlugins();
  }
  /**
   * 从远程获取社区插件列表，并将其转换为以插件 ID 为键的对象
   */
  async fetchCommunityPlugins() {
    const pluginList = await fetch(`https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json`).then((r) => r.json());
    const keyedPluginList = {};
    for (const item of pluginList)
      keyedPluginList[item.id] = item;
    this.communityPlugins = keyedPluginList;
    this.loaded = true;
  }
  /**
   * 获取指定的插件
   * @param id - 要获取的插件的 ID
   */
  async pluginGithub(id) {
    if (!this.loaded) {
      await this.fetchCommunityPlugins();
    }
    const pluginInfo = this.communityPlugins[id];
    if (!pluginInfo) {
      new import_obsidian21.Notice(`[\u63D2\u4EF6\u7BA1\u7406\u5668] \u672A\u77E5\u63D2\u4EF6ID: ${id}`);
      return null;
    }
    window.open(`https://github.com/${pluginInfo.repo}`);
  }
  /**
   * 安装指定的插件
   * @param id - 要安装的插件的 ID
   * @param version - 要安装的插件的版本，默认为空字符串，表示不检查版本
   * @param enable - 安装后是否启用插件，默认为 false
   * @param github - 插件的 GitHub 仓库地址，默认为空字符串
   */
  async pluginInstall(id, version = "", enable = false, github = "") {
    var _a, _b;
    if (!this.loaded)
      await this.fetchCommunityPlugins();
    else
      this.debounceFetch();
    const pluginRegistry = this.plugin.app.plugins;
    let installFlag = false;
    const repo = github !== "" ? github : (_a = this.communityPlugins[id]) == null ? void 0 : _a.repo;
    console.log(repo);
    if (!repo) {
      new import_obsidian21.Notice(`[\u63D2\u4EF6\u7BA1\u7406\u5668] \u672A\u77E5\u63D2\u4EF6ID: ${id}`);
      return;
    }
    if (pluginRegistry.manifests[id]) {
      new import_obsidian21.Notice(`[\u63D2\u4EF6\u7BA1\u7406\u5668] \u63D2\u4EF6 ${pluginRegistry.manifests[id].name} \u5DF2\u5B89\u88C5`);
      if (version !== "" && version !== ((_b = pluginRegistry.manifests[id]) == null ? void 0 : _b.version))
        installFlag = true;
    } else {
      installFlag = true;
    }
    if (installFlag) {
      const manifest = await fetch(`https://raw.githubusercontent.com/${repo}/HEAD/manifest.json`).then((r) => r.json());
      if (version.toLowerCase() === "latest" || version === "")
        version = manifest.version;
      await pluginRegistry.installPlugin(repo, version, manifest);
    }
    if (enable) {
      await pluginRegistry.loadPlugin(id);
      await pluginRegistry.enablePluginAndSave(id);
    } else {
      await pluginRegistry.disablePlugin(id);
    }
  }
  /**
   * 解析安装参数并调用 installPlugin 方法安装插件
   * @param params - 包含插件安装参数的对象
   */
  async parsePluginInstall(params) {
    var _a, _b;
    let args = {
      id: params.id,
      version: (_a = params == null ? void 0 : params.version) != null ? _a : "",
      enable: ["", "true", "1"].includes(params.enable.toLowerCase()),
      github: (_b = params.github) != null ? _b : ""
    };
    this.pluginInstall(args.id, args.version, args.enable);
  }
  /**
   * 解析包含插件信息的字符串或对象，获取插件的相关信息
   * @param input - 包含插件信息的字符串或对象
   * @return - 返回解析后的插件信息对象，如果解析失败则返回 null
   */
  async parsePluginGithub(params) {
    let args = { id: params.id };
    await this.pluginGithub(args.id);
  }
};

// src/main.ts
var import_obsidian25 = require("obsidian");

// src/migrations.ts
var import_obsidian22 = require("obsidian");
var compare = (a, b) => {
  const pa = (a || "0").split(".").map(Number);
  const pb = (b || "0").split(".").map(Number);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const ai = pa[i] || 0;
    const bi = pb[i] || 0;
    if (ai > bi)
      return 1;
    if (ai < bi)
      return -1;
  }
  return 0;
};
var migrations = [
  {
    version: "0.3.1",
    run: async (manager) => {
      var _a, _b;
      let changed = false;
      if (!manager.settings.LANGUAGE_INITIALIZED || !manager.settings.LANGUAGE) {
        manager.settings.LANGUAGE = manager.getAppLanguage();
        manager.settings.LANGUAGE_INITIALIZED = true;
        changed = true;
      }
      if ((_a = manager.settings.GROUPS) == null ? void 0 : _a.some((g) => g.id === "default")) {
        manager.settings.GROUPS = manager.settings.GROUPS.filter((g) => g.id !== "default");
        changed = true;
      }
      if ((_b = manager.settings.TAGS) == null ? void 0 : _b.some((t) => t.id === "default")) {
        manager.settings.TAGS = manager.settings.TAGS.filter((t) => t.id !== "default");
        changed = true;
      }
      ensureBpmTagExists(manager);
      if (manager.settings.Plugins && manager.settings.Plugins.length > 0) {
        manager.settings.Plugins.forEach((p) => {
          if (!p.name) {
            p.name = p.id;
            changed = true;
          }
        });
      }
      if (changed)
        await manager.saveSettings();
    }
  },
  {
    version: "0.3.2",
    run: async (manager) => {
      const exportDir = manager.settings.EXPORT_DIR;
      if (!exportDir)
        return;
      const normalizedDir = (0, import_obsidian22.normalizePath)(exportDir);
      const mdFiles = manager.app.vault.getMarkdownFiles().filter((f) => {
        const p = (0, import_obsidian22.normalizePath)(f.path);
        return p === normalizedDir || p.startsWith(normalizedDir + "/");
      });
      const parseFrontmatter = (content) => {
        if (!content.startsWith("---"))
          return { frontmatter: null, body: content };
        const end = content.indexOf("\n---", 3);
        if (end === -1)
          return { frontmatter: null, body: content };
        const raw = content.slice(3, end).trim();
        let fm = null;
        try {
          fm = (0, import_obsidian22.parseYaml)(raw);
        } catch (e) {
          fm = null;
        }
        const body = content.slice(end + 4);
        return { frontmatter: fm, body };
      };
      let changed = false;
      for (const f of mdFiles) {
        try {
          const old = await manager.app.vault.read(f);
          const parsed = parseFrontmatter(old);
          const fm = parsed.frontmatter;
          if (!fm || !fm["bpm_ro_id"] || !("bpm_ro_updated" in fm))
            continue;
          delete fm["bpm_ro_updated"];
          const yaml = (0, import_obsidian22.stringifyYaml)(fm).trimEnd();
          const next = `---
${yaml}
---${parsed.body.startsWith("\n") ? "" : "\n"}${parsed.body}`;
          if (next !== old) {
            await manager.app.vault.adapter.write(f.path, next);
            changed = true;
          }
        } catch (e) {
        }
      }
      if (changed) {
        return;
      }
    }
  }
];
var runMigrations = async (manager) => {
  const currentVersion = manager.manifest.version;
  const last = manager.settings.MIGRATION_VERSION || "";
  const pending = migrations.filter((m) => compare(m.version, last) > 0).sort((a, b) => compare(a.version, b.version));
  for (const m of pending) {
    await m.run(manager);
    manager.settings.MIGRATION_VERSION = m.version;
    await manager.saveSettings();
  }
  if (!manager.settings.MIGRATION_VERSION || compare(manager.settings.MIGRATION_VERSION, currentVersion) < 0) {
    manager.settings.MIGRATION_VERSION = currentVersion;
    await manager.saveSettings();
  }
};

// src/self-check.ts
var import_obsidian23 = require("obsidian");
var COMMUNITY_PLUGINS_PATH = ".obsidian/community-plugins.json";
async function readCommunityPlugins(app) {
  try {
    const adapter = app.vault.adapter;
    const content = await adapter.read(COMMUNITY_PLUGINS_PATH);
    return JSON.parse(content);
  } catch (e) {
    console.error("[BPM] Failed to read community-plugins.json:", e);
    return [];
  }
}
async function writeCommunityPlugins(app, plugins) {
  try {
    const adapter = app.vault.adapter;
    await adapter.write(COMMUNITY_PLUGINS_PATH, JSON.stringify(plugins, null, 2));
    return true;
  } catch (e) {
    console.error("[BPM] Failed to write community-plugins.json:", e);
    return false;
  }
}
async function performSelfCheck(manager) {
  const bpmId = manager.manifest.id;
  const communityPlugins = await readCommunityPlugins(manager.app);
  const nonBpmPlugins = communityPlugins.filter((id) => id !== bpmId);
  if (nonBpmPlugins.length === 0) {
    return;
  }
  if (manager.settings.SELF_CHECK_IGNORED) {
    return;
  }
  new TakeoverModal(manager.app, manager, nonBpmPlugins).open();
}
var TakeoverModal = class extends import_obsidian23.Modal {
  constructor(app, manager, nonBpmPlugins) {
    super(app);
    this.manager = manager;
    this.nonBpmPlugins = nonBpmPlugins;
    this.t = (k) => manager.translator.t(k);
  }
  onOpen() {
    const { contentEl, titleEl } = this;
    const modalEl = contentEl.parentElement;
    modalEl.addClass("bpm-takeover-modal");
    const closeBtn = modalEl.querySelector(".modal-close-button");
    if (closeBtn)
      closeBtn.remove();
    titleEl.setText(`\u26A0\uFE0F ${this.t("\u81EA\u68C0_\u68C0\u6D4B\u5230\u63D2\u4EF6_\u6807\u9898")}`);
    contentEl.createEl("p", {
      text: this.t("\u81EA\u68C0_\u68C0\u6D4B\u5230\u63D2\u4EF6_\u8BF4\u660E"),
      cls: "takeover-desc"
    });
    const listContainer = contentEl.createDiv("takeover-plugin-list");
    listContainer.createEl("h4", { text: this.t("\u81EA\u68C0_\u68C0\u6D4B\u5230\u63D2\u4EF6_\u5217\u8868") });
    const ul = listContainer.createEl("ul");
    for (const id of this.nonBpmPlugins) {
      const name = this.getPluginName(id);
      ul.createEl("li", { text: `${name} (${id})` });
    }
    contentEl.createEl("p", {
      text: this.t("\u81EA\u68C0_\u8B66\u544A_\u6587\u672C"),
      cls: "takeover-warning"
    });
    const actionContainer = contentEl.createDiv("takeover-actions");
    const takeoverBtn = new import_obsidian23.ButtonComponent(actionContainer);
    takeoverBtn.setButtonText(this.t("\u81EA\u68C0_\u63A5\u7BA1_\u6309\u94AE"));
    takeoverBtn.setCta();
    takeoverBtn.onClick(async () => {
      await this.takeoverPlugins();
    });
    const ignoreBtn = new import_obsidian23.ButtonComponent(actionContainer);
    ignoreBtn.setButtonText(this.t("\u81EA\u68C0_\u5FFD\u7565_\u6309\u94AE"));
    ignoreBtn.onClick(async () => {
      await this.ignoreWarning();
    });
    const ignoreForeverBtn = new import_obsidian23.ButtonComponent(actionContainer);
    ignoreForeverBtn.setButtonText(this.t("\u81EA\u68C0_\u4E0D\u518D\u63D0\u793A_\u6309\u94AE"));
    ignoreForeverBtn.onClick(async () => {
      await this.ignoreForever();
    });
  }
  getPluginName(id) {
    var _a;
    const manifests = this.app.plugins.manifests;
    return ((_a = manifests[id]) == null ? void 0 : _a.name) || id;
  }
  /**
   * 执行接管
   */
  async takeoverPlugins() {
    const bpmId = this.manager.manifest.id;
    const success = await writeCommunityPlugins(this.app, [bpmId]);
    if (success) {
      new import_obsidian23.Notice(this.t("\u81EA\u68C0_\u63A5\u7BA1\u6210\u529F_\u901A\u77E5"));
      for (const id of this.nonBpmPlugins) {
        const existing = this.manager.settings.Plugins.find((p) => p.id === id);
        if (existing) {
          existing.enabled = true;
        } else {
          const manifest = this.app.plugins.manifests[id];
          if (manifest) {
            this.manager.settings.Plugins.push({
              id,
              name: manifest.name,
              desc: manifest.description || "",
              group: "",
              tags: [],
              enabled: true,
              delay: "default",
              note: ""
            });
          }
        }
      }
      await this.manager.saveSettings();
      this.close();
      new import_obsidian23.Notice(this.t("\u81EA\u68C0_\u9700\u8981\u91CD\u542F_\u901A\u77E5"), 5e3);
    } else {
      new import_obsidian23.Notice(this.t("\u81EA\u68C0_\u63A5\u7BA1\u5931\u8D25_\u901A\u77E5"));
    }
  }
  /**
   * 忽略警告（本次）
   */
  async ignoreWarning() {
    new import_obsidian23.Notice(this.t("\u81EA\u68C0_\u5FFD\u7565\u8B66\u544A_\u901A\u77E5"), 5e3);
    this.close();
  }
  /**
   * 不再提示
   */
  async ignoreForever() {
    this.manager.settings.SELF_CHECK_IGNORED = true;
    await this.manager.saveSettings();
    new import_obsidian23.Notice(this.t("\u81EA\u68C0_\u4E0D\u518D\u63D0\u793A\u786E\u8BA4_\u901A\u77E5"));
    this.close();
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};

// src/main.ts
var Manager = class extends import_obsidian24.Plugin {
  constructor() {
    super(...arguments);
    this.exportWatcher = null;
    this.exportWatcherPaused = false;
    this.exportWriting = false;
    this.toggleNotice = null;
    this.updateStatus = {};
    this.updateProgressNotice = null;
  }
  async onload() {
    this.appPlugins = this.app.plugins;
    this.appWorkspace = this.app.workspace;
    console.log(`%c ${this.manifest.name} %c v${this.manifest.version} `, `padding: 2px; border-radius: 2px 0 0 2px; color: #fff; background: #5B5B5B;`, `padding: 2px; border-radius: 0 2px 2px 0; color: #fff; background: #409EFF;`);
    await this.loadSettings();
    await runMigrations(this);
    if (!this.settings.LANGUAGE_INITIALIZED || !this.settings.LANGUAGE) {
      this.settings.LANGUAGE = this.getAppLanguage();
      this.settings.LANGUAGE_INITIALIZED = true;
      await this.saveSettings();
    }
    this.translator = new Translator(this);
    ensureBpmTagExists(this);
    this.ensureBpmTagAndRecords();
    this.ensureSelfPluginRecord();
    this.repoResolver = new RepoResolver(this);
    this.addRibbonIcon("folder-cog", this.translator.t("\u901A\u7528_\u7BA1\u7406\u5668_\u6587\u672C"), () => {
      this.managerModal = new ManagerModal(this.app, this);
      this.managerModal.open();
    });
    this.addSettingTab(new ManagerSettingTab(this.app, this));
    this.settings.DELAY ? this.enableDelay() : this.disableDelay();
    command_default(this.app, this);
    this.agreement = new Agreement(this);
    this.setupExportWatcher();
    if (this.settings.EXPORT_DIR)
      this.exportAllPluginNotes();
    this.startupCheckForUpdates();
    performSelfCheck(this);
    this.registerObsidianProtocolHandler("BPM-plugin-install", async (params) => {
      await this.agreement.parsePluginInstall(params);
    });
    this.registerObsidianProtocolHandler("BPM-plugin-github", async (params) => {
      await this.agreement.parsePluginGithub(params);
    });
  }
  async onunload() {
    if (this.settings.DELAY)
      this.disableDelaysForAllPlugins();
    if (this.exportWatcher)
      this.app.vault.offref(this.exportWatcher);
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  // 保存并同步单个插件到导出笔记
  async savePluginAndExport(pluginId) {
    await this.saveSettings();
    await this.exportPluginNote(pluginId);
  }
  showUpdateProgress(total) {
    if (this.updateProgressNotice)
      this.updateProgressNotice.hide();
    const notice = new import_obsidian25.Notice("", 0);
    notice.noticeEl.empty();
    const wrap = document.createElement("div");
    wrap.addClass("bpm-update-progress");
    const text = document.createElement("div");
    text.setText(this.translator.t("\u901A\u77E5_\u68C0\u6D4B\u66F4\u65B0\u4E2D\u6587\u6848"));
    const sub = document.createElement("div");
    sub.addClass("bpm-update-progress__sub");
    const bar = document.createElement("div");
    bar.addClass("bpm-progress");
    const fill = document.createElement("div");
    fill.addClass("bpm-progress__bar");
    bar.appendChild(fill);
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = this.translator.t("\u901A\u7528_\u53D6\u6D88_\u6587\u672C") || "Cancel";
    cancelBtn.addClass("bpm-progress__cancel");
    let processed = 0;
    let cancelled = false;
    cancelBtn.onclick = () => {
      cancelled = true;
    };
    const update = (p, currentId) => {
      processed = p;
      const ratio = total > 0 ? Math.min(1, processed / total) : 0;
      fill.style.width = `${ratio * 100}%`;
      sub.setText(`${processed}/${total}${currentId ? ` \xB7 ${currentId}` : ""}`);
    };
    wrap.appendChild(text);
    wrap.appendChild(sub);
    wrap.appendChild(bar);
    wrap.appendChild(cancelBtn);
    notice.noticeEl.appendChild(wrap);
    this.updateProgressNotice = notice;
    return {
      dispose: () => {
        notice.hide();
        if (this.updateProgressNotice === notice)
          this.updateProgressNotice = null;
      },
      update,
      cancel: () => {
        cancelled = true;
      },
      isCancelled: () => cancelled
    };
  }
  async checkUpdatesWithNotice() {
    const manifests = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    const progress = this.showUpdateProgress(manifests.length);
    let processed = 0;
    try {
      const res = await this.checkUpdates({
        onProgress: (id) => {
          processed++;
          progress.update(processed, id);
        },
        isCancelled: () => progress.isCancelled()
      });
      return res;
    } finally {
      progress.dispose();
    }
  }
  async startupCheckForUpdates() {
    if (!this.settings.STARTUP_CHECK_UPDATES)
      return;
    try {
      const manifests = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
      const progress = this.showUpdateProgress(manifests.length);
      let processed = 0;
      const status = await this.checkUpdates({
        onProgress: () => {
          processed++;
          progress.update(processed);
        },
        isCancelled: () => progress.isCancelled()
      });
      const count = Object.values(status || {}).filter((s) => s.hasUpdate).length;
      if (count > 0) {
        const msg = this.translator.t("\u901A\u77E5_\u53EF\u66F4\u65B0\u6570\u91CF").replace("{count}", `${count}`);
        new import_obsidian25.Notice(msg, 5e3);
      }
      progress.dispose();
    } catch (e) {
      if (this.settings.DEBUG)
        console.error("[BPM] startup check updates failed", e);
      if (!this.settings.GITHUB_TOKEN) {
        new import_obsidian25.Notice(this.translator.t("\u901A\u77E5_\u68C0\u67E5\u66F4\u65B0\u5931\u8D25_\u5EFA\u8BAEToken"));
      }
    }
  }
  ensureBpmTagAndRecords() {
    ensureBpmTagExists(this);
    this.settings.BPM_INSTALLED.forEach((id) => {
      const mp = this.settings.Plugins.find((p) => p.id === id);
      if (mp && !mp.tags.includes(BPM_TAG_ID))
        mp.tags.push(BPM_TAG_ID);
    });
  }
  getExportDir() {
    if (!this.settings.EXPORT_DIR)
      return null;
    return (0, import_obsidian25.normalizePath)(this.settings.EXPORT_DIR);
  }
  pauseExportWatcher() {
    if (this.exportWatcher) {
      this.app.vault.offref(this.exportWatcher);
      this.exportWatcher = null;
    }
    this.exportWatcherPaused = true;
  }
  resumeExportWatcher() {
    if (!this.settings.EXPORT_DIR) {
      this.exportWatcherPaused = false;
      return;
    }
    if (this.exportWatcherPaused) {
      this.setupExportWatcher();
    }
    this.exportWatcherPaused = false;
  }
  setupExportWatcher() {
    if (this.exportWatcher)
      this.app.vault.offref(this.exportWatcher);
    const dir = this.settings.EXPORT_DIR;
    if (!dir)
      return;
    this.exportWatcher = this.app.vault.on("modify", async (file) => {
      await this.handleExportedFileChange(file);
    });
    this.registerEvent(this.exportWatcher);
  }
  async handleExportedFileChange(file) {
    var _a, _b;
    if (this.exportWriting)
      return;
    const exportDir = this.settings.EXPORT_DIR;
    if (!exportDir)
      return;
    if (!file.path.endsWith(".md"))
      return;
    const normalized = (0, import_obsidian25.normalizePath)(file.path);
    if (!normalized.startsWith((0, import_obsidian25.normalizePath)(exportDir) + "/") && (0, import_obsidian25.normalizePath)(exportDir) !== normalized)
      return;
    try {
      const content = await this.app.vault.read(file);
      const { frontmatter } = this.parseFrontmatter(content);
      if (!frontmatter || !frontmatter["bpm_ro_id"])
        return;
      const id = String(frontmatter["bpm_ro_id"]);
      const mp = this.settings.Plugins.find((p) => p.id === id);
      if (!mp)
        return;
      const safe = (key) => frontmatter[key];
      mp.desc = (_a = safe("bpm_rw_desc")) != null ? _a : mp.desc;
      mp.note = (_b = safe("bpm_rw_note")) != null ? _b : mp.note;
      if (typeof safe("bpm_rw_enabled") === "boolean") {
        const targetEnabled = safe("bpm_rw_enabled");
        mp.enabled = targetEnabled;
        if (id !== this.manifest.id) {
          const isEnabled = this.appPlugins.enabledPlugins.has(id);
          if (targetEnabled !== isEnabled) {
            this.showToggleNotice();
            try {
              if (targetEnabled) {
                await this.appPlugins.enablePluginAndSave(id);
              } else {
                await this.appPlugins.disablePluginAndSave(id);
              }
            } catch (e) {
              console.error("\u540C\u6B65\u542F\u7528/\u7981\u7528\u63D2\u4EF6\u5931\u8D25", e);
            } finally {
              this.hideToggleNotice();
            }
          }
        }
      }
      const repo = safe("bpm_rwc_repo");
      const allowRepo = !this.settings.BPM_INSTALLED.includes(id) && !this.settings.REPO_MAP[id];
      if (repo && allowRepo) {
        this.settings.REPO_MAP[id] = repo;
      }
      await this.saveSettings();
      this.reloadIfCurrentModal();
    } catch (e) {
      console.error("\u540C\u6B65\u5BFC\u5165 BPM \u7B14\u8BB0\u5931\u8D25", e);
    }
  }
  parseFrontmatter(content) {
    if (!content.startsWith("---"))
      return { frontmatter: null, body: content };
    const end = content.indexOf("\n---", 3);
    if (end === -1)
      return { frontmatter: null, body: content };
    const raw = content.slice(3, end).trim();
    let fm = null;
    try {
      fm = (0, import_obsidian25.parseYaml)(raw);
    } catch (e) {
      fm = null;
    }
    const body = content.slice(end + 4);
    return { frontmatter: fm, body };
  }
  async exportAllPluginNotes() {
    if (!this.settings.EXPORT_DIR)
      return;
    for (const plugin of this.settings.Plugins) {
      await this.exportPluginNote(plugin.id);
    }
  }
  async exportPluginNote(pluginId) {
    var _a;
    if (!this.settings.EXPORT_DIR)
      return;
    const mp = this.settings.Plugins.find((p) => p.id === pluginId);
    if (!mp)
      return;
    const dir = this.getExportDir();
    if (!dir)
      return;
    try {
      const adapter = this.app.vault.adapter;
      const vaultRelativeDir = (0, import_obsidian25.normalizePath)(this.settings.EXPORT_DIR);
      if (!await adapter.exists(vaultRelativeDir)) {
        await adapter.mkdir(vaultRelativeDir);
      }
      const targetPath = await this.resolveExportPath(mp, vaultRelativeDir);
      let body = `

${this.translator.t("\u5BFC\u51FA_\u6B63\u6587\u63D0\u793A")}`;
      let existingFrontmatter = null;
      let existingContent = null;
      if (await adapter.exists(targetPath)) {
        const old = await adapter.read(targetPath);
        existingContent = old;
        const parsed = this.parseFrontmatter(old);
        existingFrontmatter = (_a = parsed.frontmatter) != null ? _a : null;
        body = parsed.body || body;
      }
      let repo = this.settings.REPO_MAP[mp.id] || "";
      try {
        const resolved = await this.repoResolver.resolveRepo(mp.id);
        if (resolved)
          repo = resolved;
      } catch (e) {
        console.error("\u89E3\u6790\u4ED3\u5E93\u6620\u5C04\u5931\u8D25", e);
      }
      const bpmFrontmatter = {
        "bpm_ro_id": mp.id,
        "bpm_ro_name": mp.name,
        "bpm_rw_desc": mp.desc,
        "bpm_rw_note": mp.note,
        "bpm_rw_enabled": mp.enabled,
        "bpm_rwc_repo": repo,
        "bpm_ro_group": mp.group,
        "bpm_ro_tags": mp.tags,
        "bpm_ro_delay": mp.delay,
        "bpm_ro_installed_via_bpm": this.settings.BPM_INSTALLED.includes(mp.id)
      };
      const kept = Object.fromEntries(Object.entries(existingFrontmatter != null ? existingFrontmatter : {}).filter(([k]) => !k.startsWith("bpm_")));
      const frontmatter = { ...bpmFrontmatter, ...kept };
      const yaml = (0, import_obsidian25.stringifyYaml)(frontmatter).trimEnd();
      const content = `---
${yaml}
---${body.startsWith("\n") ? "" : "\n"}${body}`;
      if (existingContent !== null && existingContent === content)
        return;
      this.exportWriting = true;
      await adapter.write(targetPath, content);
    } catch (e) {
      console.error("\u5BFC\u51FA BPM \u7B14\u8BB0\u5931\u8D25", e);
    } finally {
      this.exportWriting = false;
    }
  }
  // 确保 BPM 自身也存在于插件记录中（用于面板显示与导出）
  ensureSelfPluginRecord() {
    var _a;
    const id = this.manifest.id;
    const existing = this.settings.Plugins.find((p) => p.id === id);
    if ((_a = this.settings.HIDES) == null ? void 0 : _a.includes(id)) {
      this.settings.HIDES = this.settings.HIDES.filter((x) => x !== id);
    }
    if (!existing) {
      this.settings.Plugins.push({
        id,
        name: this.manifest.name,
        desc: this.manifest.description,
        group: "",
        tags: [],
        enabled: true,
        delay: "",
        note: ""
      });
      this.saveSettings();
      this.exportAllPluginNotes();
      return;
    }
    existing.name = existing.name || this.manifest.name;
    existing.desc = existing.desc || this.manifest.description;
    existing.enabled = true;
    existing.delay = "";
  }
  reloadIfCurrentModal() {
    var _a;
    try {
      (_a = this.managerModal) == null ? void 0 : _a.reloadShowData();
    } catch (e) {
    }
  }
  showToggleNotice() {
    if (this.toggleNotice)
      return;
    this.toggleNotice = new import_obsidian25.Notice("\u6B63\u5728\u5E94\u7528\u66F4\u6539\uFF0C\u8BF7\u52FF\u9891\u7E41\u64CD\u4F5C\u3002", 3e3);
  }
  hideToggleNotice() {
    if (this.toggleNotice) {
      this.toggleNotice.hide();
      this.toggleNotice = null;
    }
  }
  exportFileName(mp) {
    const base = (mp.name || mp.id || "plugin").trim();
    const safe = base.replace(/[/\\?%*:|"<>]/g, "-").replace(/\s+/g, " ");
    return safe || "plugin";
  }
  // 查找/重命名导出文件：优先按 frontmatter 中的 bpm_ro_id 匹配，必要时将旧文件名重命名为当前 name
  async resolveExportPath(mp, vaultRelativeDir) {
    const adapter = this.app.vault.adapter;
    const normalizedDir = (0, import_obsidian25.normalizePath)(vaultRelativeDir);
    const desired = (0, import_obsidian25.normalizePath)(`${normalizedDir}/${this.exportFileName(mp)}.md`);
    const files = this.app.vault.getMarkdownFiles().filter((f) => {
      const p = (0, import_obsidian25.normalizePath)(f.path);
      return p === normalizedDir || p.startsWith(normalizedDir + "/");
    });
    for (const f of files) {
      try {
        const content = await this.app.vault.read(f);
        const { frontmatter } = this.parseFrontmatter(content);
        if ((frontmatter == null ? void 0 : frontmatter["bpm_ro_id"]) === mp.id) {
          const currentPath = (0, import_obsidian25.normalizePath)(f.path);
          if (currentPath !== desired) {
            if (!await adapter.exists(desired)) {
              await adapter.rename(currentPath, desired);
              return desired;
            }
            return currentPath;
          }
          return currentPath;
        }
      } catch (e) {
      }
    }
    if (await adapter.exists(desired))
      return desired;
    const legacyById = (0, import_obsidian25.normalizePath)(`${normalizedDir}/${(mp.id || "plugin").replace(/[/\\?%*:|"<>]/g, "-") || "plugin"}.md`);
    if (await adapter.exists(legacyById)) {
      if (!await adapter.exists(desired)) {
        await adapter.rename(legacyById, desired);
        return desired;
      }
      return legacyById;
    }
    return desired;
  }
  // 关闭延时 调用
  disableDelay() {
    const plugins = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    this.synchronizePlugins(plugins);
  }
  // 开启延时 调用
  enableDelay() {
    const plugins = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    this.synchronizePlugins(plugins);
    plugins.forEach((plugin) => this.startPluginWithDelay(plugin.id));
  }
  // 为所有插件启动延迟
  enableDelaysForAllPlugins() {
    const plugins = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    this.synchronizePlugins(plugins);
    plugins.forEach(async (plugin) => {
      const isEnabled = this.appPlugins.enabledPlugins.has(plugin.id);
      if (isEnabled) {
        await this.appPlugins.disablePluginAndSave(plugin.id);
        await this.appPlugins.enablePlugin(plugin.id);
        const mp = this.settings.Plugins.find((p) => p.id === plugin.id);
        if (mp)
          mp.enabled = true;
        this.saveSettings();
      } else {
        const mp = this.settings.Plugins.find((p) => p.id === plugin.id);
        if (mp)
          mp.enabled = false;
        this.saveSettings();
      }
    });
  }
  // 为所有插件关闭延迟
  disableDelaysForAllPlugins() {
    const plugins = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    plugins.forEach(async (pm) => {
      const plugin = this.settings.Plugins.find((p) => p.id === pm.id);
      if (plugin) {
        if (plugin.enabled) {
          await this.appPlugins.disablePlugin(pm.id);
          await this.appPlugins.enablePluginAndSave(pm.id);
        }
      }
    });
  }
  // 延时启动指定插件
  startPluginWithDelay(id) {
    if (id === this.manifest.id)
      return;
    const plugin = this.settings.Plugins.find((p) => p.id === id);
    if (plugin && plugin.enabled) {
      const delay = this.settings.DELAYS.find((item) => item.id === plugin.delay);
      const time = delay ? delay.time : 0;
      setTimeout(() => {
        this.appPlugins.enablePlugin(id);
      }, time * 1e3);
    }
  }
  // 同步插件到配置文件
  synchronizePlugins(p1) {
    const p2 = this.settings.Plugins;
    p2.forEach((p2Item) => {
      if (p2Item.id === this.manifest.id)
        return;
      if (!p1.some((p1Item) => p1Item.id === p2Item.id)) {
        this.settings.Plugins = this.settings.Plugins.filter((pm) => pm.id !== p2Item.id);
      }
    });
    p1.forEach((p1Item) => {
      if (!p2.some((p2Item) => p2Item.id === p1Item.id)) {
        const isEnabled = this.appPlugins.enabledPlugins.has(p1Item.id);
        this.settings.Plugins.push({
          "id": p1Item.id,
          "name": p1Item.name,
          "desc": p1Item.description,
          "group": "",
          "tags": [],
          "enabled": isEnabled,
          "delay": "",
          "note": ""
        });
      }
      const mp = this.settings.Plugins.find((pm) => pm.id === p1Item.id);
      if (mp && this.settings.BPM_INSTALLED.includes(p1Item.id) && !mp.tags.includes(BPM_TAG_ID)) {
        mp.tags.push(BPM_TAG_ID);
      }
    });
    this.ensureSelfPluginRecord();
    this.saveSettings();
    this.exportAllPluginNotes();
  }
  // 工具函数
  createTag(text, color, type) {
    const style = this.generateTagStyle(color, type);
    const tag = createEl("span", {
      text,
      cls: "manager-tag",
      attr: { "style": style }
    });
    return tag;
  }
  generateTagStyle(color, type) {
    let style;
    const [r, g, b] = this.hexToRgbArray(color);
    switch (type) {
      case "a":
        style = `color: #fff; background-color: ${color}; border-color: ${color};`;
        break;
      case "b":
        style = `color: ${color}; background-color: transparent; border-color: ${color};`;
        break;
      case "c":
        style = `color: ${color}; background-color: rgba(${r}, ${g}, ${b}, 0.3); border-color: ${color};`;
        break;
      case "d":
        style = `color: ${color}; background-color: ${this.adjustColorBrightness(color, 50)}; border-color: ${this.adjustColorBrightness(color, 50)};`;
        break;
      default:
        style = `background-color: transparent;border-style: dashed;`;
    }
    return style;
  }
  hexToRgbArray(hex) {
    const rgb = parseInt(hex.slice(1), 16);
    const r = rgb >> 16;
    const g = rgb >> 8 & 255;
    const b = rgb & 255;
    return [r, g, b];
  }
  adjustColorBrightness(hex, amount) {
    const rgb = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.max(0, (rgb >> 16 & 255) + amount));
    const g = Math.min(255, Math.max(0, (rgb >> 8 & 255) + amount));
    const b = Math.min(255, Math.max(0, (rgb & 255) + amount));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }
  // 获取 Obsidian 当前语言（兼容旧版类型定义）
  getAppLanguage() {
    var _a, _b, _c, _d, _e;
    const anyApp = this.app;
    const langCandidates = [
      (_a = anyApp == null ? void 0 : anyApp.i18n) == null ? void 0 : _a.locale,
      (_b = anyApp == null ? void 0 : anyApp.i18n) == null ? void 0 : _b.lang,
      (_c = anyApp == null ? void 0 : anyApp.i18n) == null ? void 0 : _c.language,
      (_e = (_d = window == null ? void 0 : window.moment) == null ? void 0 : _d.locale) == null ? void 0 : _e.call(_d),
      navigator == null ? void 0 : navigator.language
    ];
    const picked = langCandidates.find((l) => typeof l === "string" && l.length > 0) || "en";
    const lower = picked.toLowerCase().replace("_", "-");
    const map = {
      "en": "en",
      "en-gb": "en",
      "zh": "zh-cn",
      "zh-cn": "zh-cn",
      "zh-tw": "zh-cn",
      "ru": "ru",
      "ja": "ja",
      "ko": "ko",
      "fr": "fr",
      "es": "es"
    };
    return map[lower] || map[lower.split("-")[0]] || "en";
  }
  // 版本比较：>0 表示 a>b
  compareVersions(a = "0.0.0", b = "0.0.0") {
    const pa = a.split(".").map(Number);
    const pb = b.split(".").map(Number);
    const len = Math.max(pa.length, pb.length);
    for (let i = 0; i < len; i++) {
      const ai = pa[i] || 0;
      const bi = pb[i] || 0;
      if (ai > bi)
        return 1;
      if (ai < bi)
        return -1;
    }
    return 0;
  }
  // 检测插件更新：官方 + GitHub（BPM 或用户指定仓库）
  async checkUpdates(opts) {
    var _a, _b, _c, _d, _e, _f, _g;
    const manifests = Object.values(this.appPlugins.manifests).filter((pm) => pm.id !== this.manifest.id);
    const officialMap = await this.fetchOfficialStats();
    const statusMap = {};
    if (this.settings.DEBUG)
      console.log("[BPM] checkUpdates start, total manifests:", manifests.length);
    for (const pm of manifests) {
      if ((_a = opts == null ? void 0 : opts.isCancelled) == null ? void 0 : _a.call(opts))
        break;
      const localVersion = pm.version || "0.0.0";
      const st = { source: "unknown", localVersion, checkedAt: Date.now() };
      try {
        const official = officialMap[pm.id];
        if (official) {
          st.source = "official";
          st.remoteVersion = official;
          st.repo = await this.repoResolver.resolveRepo(pm.id);
          if (st.repo) {
            st.versions = await this.fetchGithubVersions(st.repo);
          }
          st.hasUpdate = this.compareVersions(official, localVersion) > 0;
          statusMap[pm.id] = st;
          if (this.settings.DEBUG)
            console.log("[BPM] update official match", pm.id, localVersion, "->", st.remoteVersion);
          continue;
        }
        let repo = this.settings.REPO_MAP[pm.id] || null;
        if (!repo) {
          try {
            repo = await this.repoResolver.resolveRepo(pm.id);
          } catch (e) {
          }
        }
        if (repo) {
          st.source = "github";
          st.repo = repo;
          st.versions = await this.fetchGithubVersions(repo);
          const pick = (_e = (_d = (_b = st.versions) == null ? void 0 : _b.find((v) => !v.prerelease)) != null ? _d : (_c = st.versions) == null ? void 0 : _c[0]) != null ? _e : null;
          st.remoteVersion = (_f = pick == null ? void 0 : pick.version) != null ? _f : await this.fetchGithubManifestVersion(repo);
          st.hasUpdate = st.remoteVersion ? this.compareVersions(st.remoteVersion, localVersion) > 0 : false;
          if (!st.remoteVersion)
            st.message = "\u672A\u83B7\u53D6\u5230\u8FDC\u7AEF\u7248\u672C";
          if (this.settings.DEBUG)
            console.log("[BPM] update github match", pm.id, repo, localVersion, "->", st.remoteVersion);
        } else {
          st.source = "unknown";
          st.message = "\u65E0\u6765\u6E90\uFF0C\u65E0\u6CD5\u68C0\u6D4B";
          if (this.settings.DEBUG)
            console.log("[BPM] update unknown source", pm.id);
        }
      } catch (e) {
        st.error = (e == null ? void 0 : e.message) || String(e);
        console.error("[BPM] checkUpdates error", pm.id, e);
      }
      statusMap[pm.id] = st;
      (_g = opts == null ? void 0 : opts.onProgress) == null ? void 0 : _g.call(opts, pm.id);
    }
    this.updateStatus = statusMap;
    return statusMap;
  }
  async checkUpdateForPlugin(pluginId) {
    var _a, _b, _c, _d, _e;
    const pm = this.appPlugins.manifests[pluginId];
    if (!pm)
      return null;
    const localVersion = pm.version || "0.0.0";
    const st = { source: "unknown", localVersion, checkedAt: Date.now() };
    try {
      const officialMap = await this.fetchOfficialStats();
      const official = officialMap[pm.id];
      if (official) {
        st.source = "official";
        st.remoteVersion = official;
        try {
          st.repo = await this.repoResolver.resolveRepo(pm.id);
          if (st.repo)
            st.versions = await this.fetchGithubVersions(st.repo);
        } catch (e) {
        }
        st.hasUpdate = this.compareVersions(official, localVersion) > 0;
        this.updateStatus[pm.id] = st;
        if (this.settings.DEBUG)
          console.log("[BPM] single update official", pm.id, localVersion, "->", st.remoteVersion);
        return st;
      }
      let repo = this.settings.REPO_MAP[pm.id] || null;
      if (!repo) {
        try {
          repo = await this.repoResolver.resolveRepo(pm.id);
        } catch (e) {
          repo = null;
        }
      }
      if (repo) {
        st.source = "github";
        st.repo = repo;
        st.versions = await this.fetchGithubVersions(repo);
        const pick = (_d = (_c = (_a = st.versions) == null ? void 0 : _a.find((v) => !v.prerelease)) != null ? _c : (_b = st.versions) == null ? void 0 : _b[0]) != null ? _d : null;
        st.remoteVersion = (_e = pick == null ? void 0 : pick.version) != null ? _e : await this.fetchGithubManifestVersion(repo);
        st.hasUpdate = st.remoteVersion ? this.compareVersions(st.remoteVersion, localVersion) > 0 : false;
        if (!st.remoteVersion)
          st.message = "\u672A\u83B7\u53D6\u5230\u8FDC\u7AEF\u7248\u672C";
        if (this.settings.DEBUG)
          console.log("[BPM] single update github", pm.id, repo, localVersion, "->", st.remoteVersion);
      } else {
        st.source = "unknown";
        st.message = "\u65E0\u6765\u6E90\uFF0C\u65E0\u6CD5\u68C0\u6D4B";
        if (this.settings.DEBUG)
          console.log("[BPM] single update unknown source", pm.id);
      }
    } catch (e) {
      st.error = (e == null ? void 0 : e.message) || String(e);
      console.error("[BPM] checkUpdateForPlugin error", pm.id, e);
    }
    this.updateStatus[pm.id] = st;
    return st;
  }
  async fetchOfficialStats() {
    const url = "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json";
    try {
      const res = await (0, import_obsidian25.requestUrl)({ url });
      const json = res.json;
      const map = {};
      Object.entries(json || {}).forEach(([id, entry]) => {
        if (entry && typeof entry === "object") {
          const latest = this.getLatestVersionFromStats(entry);
          if (latest)
            map[id] = latest;
        }
      });
      return map;
    } catch (e) {
      console.error("\u83B7\u53D6\u5B98\u65B9\u63D2\u4EF6 stats \u5931\u8D25", e);
      return {};
    }
  }
  getLatestVersionFromStats(entry) {
    const versions = Object.keys(entry || {}).filter((k) => k !== "downloads" && k !== "updated");
    if (versions.length === 0)
      return null;
    let latest = versions[0];
    for (const v of versions) {
      if (this.compareVersions(v, latest) > 0)
        latest = v;
    }
    return latest;
  }
  async fetchGithubManifestVersion(repo) {
    var _a;
    const headers = {
      "User-Agent": "better-plugins-manager"
    };
    if (this.settings.GITHUB_TOKEN)
      headers["Authorization"] = `Bearer ${this.settings.GITHUB_TOKEN}`;
    try {
      const release = await (0, import_obsidian25.requestUrl)({ url: `https://api.github.com/repos/${repo}/releases/latest`, headers });
      const assets = ((_a = release.json) == null ? void 0 : _a.assets) || [];
      const manifestAsset = assets.find((a) => a.name === "manifest.json");
      if (manifestAsset == null ? void 0 : manifestAsset.browser_download_url) {
        const manifestRes = await (0, import_obsidian25.requestUrl)({ url: manifestAsset.browser_download_url, headers });
        const manifest = manifestRes.json;
        if (manifest == null ? void 0 : manifest.version)
          return manifest.version;
      }
    } catch (e) {
    }
    const candidates = [
      `https://raw.githubusercontent.com/${repo}/HEAD/manifest.json`,
      `https://raw.githubusercontent.com/${repo}/main/manifest.json`,
      `https://raw.githubusercontent.com/${repo}/master/manifest.json`
    ];
    for (const url of candidates) {
      try {
        const res = await (0, import_obsidian25.requestUrl)({ url, headers });
        const manifest = res.json;
        if (manifest == null ? void 0 : manifest.version)
          return manifest.version;
      } catch (e) {
      }
    }
    return null;
  }
  async fetchGithubVersions(repoInput) {
    try {
      return await fetchReleaseVersions(this, repoInput);
    } catch (e) {
      console.error("[BPM] fetchGithubVersions error", repoInput, e);
      return [];
    }
  }
  async downloadUpdate(pluginId, version) {
    const st = this.updateStatus[pluginId];
    let repo = (st == null ? void 0 : st.repo) || this.settings.REPO_MAP[pluginId] || null;
    if (!repo) {
      try {
        repo = await this.repoResolver.resolveRepo(pluginId);
      } catch (e) {
        repo = null;
      }
    }
    if (!repo) {
      new import_obsidian25.Notice(this.translator.t("\u4E0B\u8F7D\u66F4\u65B0_\u7F3A\u5C11\u4ED3\u5E93\u63D0\u793A"));
      return false;
    }
    const ok = await installPluginFromGithub(this, repo, version, false);
    if (ok) {
      await this.checkUpdates();
      this.reloadIfCurrentModal();
    }
    return ok;
  }
  /**
   * 生成自动配色，使用“黄金角”分布避免颜色过于接近。
   * existingColors: 已存在的颜色列表，用于避免重复/过近。
   */
  generateAutoColor(existingColors = []) {
    const baseHue = existingColors.length * 137.508 % 360;
    let hue = baseHue;
    const saturation = 68;
    const lightness = 60;
    const isClose = (hex) => {
      const [r, g, b] = this.hexToRgbArray(hex);
      for (const c of existingColors) {
        const [cr, cg, cb] = this.hexToRgbArray(c);
        const dist = Math.sqrt(
          Math.pow(r - cr, 2) + Math.pow(g - cg, 2) + Math.pow(b - cb, 2)
        );
        if (dist < 60)
          return true;
      }
      return false;
    };
    for (let i = 0; i < Math.max(existingColors.length + 6, 12); i++) {
      const hex = this.hslToHex(hue, saturation, lightness);
      if (!isClose(hex))
        return hex;
      hue = (hue + 27) % 360;
    }
    return "#A079FF";
  }
  hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const r = Math.round(255 * f(0));
    const g = Math.round(255 * f(8));
    const b = Math.round(255 * f(4));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }
};

// main.ts
var main_default = Manager;
