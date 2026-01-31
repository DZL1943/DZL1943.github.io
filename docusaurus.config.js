// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import remark_anyblock_to_codeblock from './src/remark/anyblock2'; // [!code ++]
import remark_anyblock_render_codeblock from './src/remark/anyblock'; // [!code ++]

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Welcome",
    tagline: "Hello world!",
    favicon: "img/favicon.ico",

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url of your site here
    url: "https://dzl1943.github.io",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "dzl1943", // Usually your GitHub org/user name.
    projectName: "dzl1943.github.io", // Usually your repo name.
    deploymentBranch: "gh-pages",
    trailingSlash: false,
    onBrokenLinks: "throw",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "zh-Hans",
        locales: ["zh-Hans"],
    },

    markdown: {
        // format: 'detect',
        mermaid: true,
        parseFrontMatter: async (params) => {
            const result = await params.defaultParseFrontMatter(params);

            // if(['author', 'authors'].every(p => !result.frontMatter[p])) result.frontMatter['author'] = '6Bd2';

            /** @type {{from: string, to: string, transform?: (v: any) => any}[]} */
            const mappings = [
                { from: "created", to: "date" },
                // {
                //     from: "updated",
                //     to: "last_update",
                //     transform: (v) => ({date: v }),
                // },
                // {
                //     from: "modified",
                //     to: "last_update",
                //     transform: (v) => ({ date: v }),
                // },
                { from: "private", to: "unlisted" },
                { from: "public", to: "unlisted", transform: (v) => !v },
            ];

            mappings.forEach(({ from, to, transform }) => {
                if (from !== to && from in result.frontMatter) {
                    result.frontMatter[to] = transform
                        ? transform(result.frontMatter[from])
                        : result.frontMatter[from];
                    delete result.frontMatter[from];
                }
            });
            return result;
        },
    },

    plugins: [
      [
        '@docusaurus/plugin-content-blog',
        {
          id: 'blog2',
          path: 'vault/Thoughts',
          routeBasePath: 'blog2'
        }
      ]
    ],

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    // routeBasePath: '/',
                    path: "vault/Areas",
                    sidebarPath: "./sidebars.js",
                    showLastUpdateTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // editUrl: 'https://github.com/DZL1943/DZL1943.github.io/edit/main/website',
                    beforeDefaultRemarkPlugins: [],
                    remarkPlugins: [
                        remarkMath,
                        remark_anyblock_to_codeblock,
                        remark_anyblock_render_codeblock,
                    ],
                    rehypePlugins: [rehypeKatex],
                },
                blog: {
                    blogSidebarTitle: "All posts",
                    blogSidebarCount: "ALL",
                    // routeBasePath: '/',
                    path: "vault/Pages",
                    showLastUpdateTime: true,
                    showReadingTime: true,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true,
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // editUrl: 'https://github.com/DZL1943/DZL1943.github.io/edit/main/website',
                    // Useful options to enforce blogging best practices
                    onInlineTags: "warn",
                    onInlineAuthors: "warn",
                    onUntruncatedBlogPosts: "warn",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            }),
        ],
    ],

    stylesheets: [
        {
            href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
            type: "text/css",
            integrity:
                "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
            crossorigin: "anonymous",
        },
    ],
    themes: ["@docusaurus/theme-mermaid"],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: "img/docusaurus-social-card.jpg",
            colorMode: {
                respectPrefersColorScheme: true,
            },
            docs: {
                sidebar: {
                    hideable: true,
                    autoCollapseCategories: true,
                },
            },
            navbar: {
                // hideOnScroll: true,
                title: "Home",
                // logo: {
                //   alt: 'My Site Logo',
                //   src: 'img/logo.svg',
                // },
                items: [
                    {
                        type: "docSidebar",
                        sidebarId: "computerSidebar",
                        position: "left",
                        label: "Doc",
                    },
                    { to: "/blog", label: "Blog", position: "left" },
                    {
                        href: "https://github.com/DZL1943",
                        // label: "GitHub",
                        position: "right",
                        className: 'header-github-link',
                        'aria-label': 'GitHub repository',
                    },
                ],
            },
            footer: {
                //   style: 'dark',
                //   links: [
                //     {
                //       title: 'Docusaurus',
                //       items: [
                //         {
                //           label: 'Docs',
                //           href: 'https://docusaurus.io/docs',
                //         },
                //         {
                //           label: 'GitHub',
                //           href: 'https://github.com/facebook/docusaurus',
                //         },
                //       ],
                //     },
                //   ],
                copyright: `Copyright © ${new Date().getFullYear()} DZL1943. Built with <a href="https://docusaurus.io" target="_blank" rel="noopener noreferrer">Docusaurus</a>.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
                additionalLanguages: ["ini", "lua", "lisp", "vim"],
            },
            mermaid: {
                theme: { light: "neutral", dark: "forest" },
                // options: {
                //   maxTextSize: 50,
                // },
            },
        }),
};

export default config;
