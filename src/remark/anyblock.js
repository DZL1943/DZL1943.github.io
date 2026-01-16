import { transformer_anyblock,remark_anyblock_render_codeblock } from "@anyblock/remark-any-block";

const plugin = (options) => {
    const transformer = async (ast) => {
        remark_anyblock_render_codeblock()(ast);
    };
    return transformer;
};

export default plugin;