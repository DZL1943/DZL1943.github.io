import {
  ABReg,
} from '@anyblock/remark-any-block';
import { toMarkdown } from 'mdast-util-to-markdown';

/**
 * 检测 `[header]` 段落
 */
function matchAbHeader(node): string | null {
  if (node.type !== "paragraph") return null;

  const text = node.children
    .map((c) => (c.type === "text" ? c.value : ""))
    .join("");
  const match = text.match(ABReg.reg_header_noprefix);
  if (!match || !match.length) return null

  return match[5]
}

/**
 * 检测 `:::container` 首段落
 * 匹配时返回 `{flag, type}`
 * 也可用 import remarkDirective from 'remark-directive'; 来代替之
 */
function matchContainerStart(node):
  | { flag: string; type: string }
  | null {
  if (node.type !== "paragraph") return null;
  const text = node.children
    .map((c) => (c.type === "text" ? c.value : ""))
    .join("")
    .trim();
  const m = text.match(ABReg.reg_mdit_head);
  if (!m || !m[3] || !m[4]) return null;
  return { flag: m[3], type: m[4] };
}

/**
 * 检测 `:::container` 尾段落
 */
function matchContainerEnd(node, flag: string): boolean {
  if (node.type !== "paragraph") return false;
  const text = node.children
    .map((c) => (c.type === "text" ? c.value : ""))
    .join("")
    .trim();
  return text === flag;
}

/**
 * 将一组 mdast 节点反序列化为 markdown 格式
 */
function nodesToMarkdown(nodes): string {
  // jsdom_enable()
  const result = toMarkdown(
    { type: "root", children: nodes } as unknown,
    { listItemIndent: "one" }
  ).trimEnd();
  // jsdom_disable()
  return result;
}

/**
 * remark 插件: 缓存当前处理文件的路径到全局变量 `global_path` 中
 */
const captureFileContext = () => {
  return (_tree, file) => {
    if (file.path) global_path = file.path
  }
}

let global_path: string = ''

/**
 * remark 插件: 将任何特殊的 AnyBlock 语法转换为带有 `lang = "AnyBlock"` 属性的“代码”节点。
 *
 * - `[header]` + (list|heading|code|blockquote|table...)
 * - `:::type ... :::`
 */
export const remark_anyblock_to_codeblock = (options) => {
  const transformer = async (tree) => {
    const children = [...tree.children];

    const out = [];
    for (let i = 0; i < children.length; i++) {
      const node = children[i];

      // step1. 检测 `[]` 语法
      const header = matchAbHeader(node);
      if (header) {
        const node_next = children[i+1];
        if (
          node_next.type === "list" ||
          node_next.type === "heading" ||
          node_next.type === "code" ||
          node_next.type === "blockquote"
          // node_next.type === "table"
        ) {
          const codeValue = `[${header}]\n${nodesToMarkdown([node_next])}`;
          out.push({
            type: "code",
            lang: "anyblock",
            value: codeValue,
            data: { markup: "[]" },
          });
          i++; continue;
        } else {}
      }

      // step2. 检测 `:::` 语法
      const container = matchContainerStart(node);
      if (container) {
        const body = [];
        let j = i + 1;
        for (; j < children.length; j++) {
          const n = children[j];
          if (matchContainerEnd(n, container.flag)) {
            break;
          }
          body.push(n);
        }
        if (j < children.length) {
          const codeValue = `[${container.type}]\n${nodesToMarkdown(body)}`;
          out.push({
            type: "code",
            lang: "anyblock",
            value: codeValue,
            data: { markup: container.flag },
          });
          i = j; continue;
        }
      }

      // step3. 不处理的节点，保持不变
      out.push(node)
    }
    tree.children = out;
  }
  return transformer;
}
export default remark_anyblock_to_codeblock;