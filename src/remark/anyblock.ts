import {
  // remark_anyblock_render_codeblock,
  ABConvertManager,
  jsdom_init,
  jsdom_enable,
  jsdom_disable,
} from "@anyblock/remark-any-block";
import {visit} from 'unist-util-visit';

jsdom_init(false)
{
  // 定义默认渲染行为
  // ABConvertManager.getInstance().redefine_renderMarkdown((markdown: string, el: HTMLElement):void => {
  //   el.classList.add("markdown-rendered")
  //   el.textContent = markdown.replace('\n', '<br>'); return; // TODO 临时
  // 
  //   const result = "md.render(markdown)";
  // 
  //   console.log('re-renderMarkdown:', markdown, '===>', result)
  //   const el_child = document.createElement("div"); el.appendChild(el_child); el_child.innerHTML = result;
  // })
}

// 渲染 anyblock 代码块
const remark_anyblock_render_codeblock = (options) => {
  // ABConvertManager.getInstance().redefine_renderMarkdown((markdown: string, el: HTMLElement):void => {})
  const transformer = async (ast_tree) => {
    // if (typeof document === "undefined") return
    let number = 1;
    visit(ast_tree, 'code', (node, index: number|undefined, parent: any|undefined) => {
      if (typeof node.lang != "string" || node.lang.toLowerCase() != "anyblock") return
      if (!parent || !index) return

      const lines = node.value.split("\n")
      const head = lines.shift()
      const headerMatch = head?.match(/\[(.*)\]/)
      if (!headerMatch) return

      const header = headerMatch[1];
      const content = lines.join("\n").trimStart();
      const markup = (node.data as any)?.markup ?? ""

      jsdom_enable()
      const el: HTMLDivElement = document.createElement("div");
      el.classList.add("ab-note", "drop-shadow");
      ABConvertManager.autoABConvert(el, header, content, markup.startsWith(":::") ? "mdit" : "");
      jsdom_disable()

      // new node
      const html = el.outerHTML;
      const new_node = {
        // 与其他 Remark 流程不同，Docusaurus (基于 MDX v2/v3) 不再直接支持 type: 'html' 节点
        // 在 Docusaurus (MDX) 的处理流程中，直接插入 HTML 字符串通常是不被推荐的，
        // 或者需要将其标记为 JSX 才能被正确解析和渲染成 React 组件
        // 原:
        // type: 'html',
        // value: el.outerHTML,
        // type: 'jsx',
        // value: `<div dangerouslySetInnerHTML={{__html: ${JSON.stringify(el.outerHTML)} }} />`,
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'dangerouslySetInnerHTML',
            value: {
              type: 'mdxJsxAttributeValueExpression',
              // value 字段用于调试或作为 fallback
              value: `{{__html: ${JSON.stringify(html)} }}`,
              data: {
                // 必须构建 estree 数据，告诉 MDX 这是一个对象表达式 {__html: "..."}
                estree: {
                  type: 'Program',
                  body: [{
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'ObjectExpression',
                      properties: [{
                        type: 'Property',
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: { type: 'Identifier', name: '__html' },
                        value: { type: 'Literal', value: html },
                        kind: 'init'
                      }]
                    }
                  }],
                  sourceType: 'module'
                }
              }
            }
          }
        ],
        children: []
      }
      parent.children.splice(index, 1, new_node)
      // return 'skip'
    });
  };
  return transformer;
}
export default remark_anyblock_render_codeblock;