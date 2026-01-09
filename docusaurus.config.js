// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Welcome',
  tagline: 'Hello world!',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://dzl1943.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dzl1943', // Usually your GitHub org/user name.
  projectName: 'dzl1943.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
  },

  markdown: {
    mermaid: true,
    parseFrontMatter: async (params) => {
      // Reuse the default parser
      const result = await params.defaultParseFrontMatter(params);
      // Rename an unsupported front matter coming from another system
      const fieldMap = {
        created: 'date',
        modified: 'last_update',
        updated: 'last_update'
      }
      for (const [k, v] of Object.entries(fieldMap)) {
        if (result.frontMatter[k]) {
          result.frontMatter[v] = result.frontMatter[k];
          delete result.frontMatter[k];
        }
      }
      return result;
    },
  },

  // plugins: [
  //   [
  //     '@docusaurus/plugin-content-blog',
  //     {
  //       id: 'journals',
  //       path: './journals',
  //       routeBasePath: 'journals'
  //     }
  //   ]
  // ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // routeBasePath: '/',
          path: 'vault/docs',
          sidebarPath: './sidebars.js',
          showLastUpdateTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/DZL1943/DZL1943.github.io/edit/main/website',
        },
        blog: {
          // blogSidebarTitle: 'All posts',
          // blogSidebarCount: 'ALL',
          // routeBasePath: '/',
          path: 'vault/blog',
          showLastUpdateTime: true,
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/DZL1943/DZL1943.github.io/edit/main/website',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true
        },
      },
      navbar: {
        // hideOnScroll: true,
        title: 'Home',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'computerSidebar',
            position: 'left',
            label: 'Doc',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://docusaurus.io',
            label: 'Docusaurus',
            position: 'right',
          },
          {
            href: 'https://github.com/DZL1943',
            label: 'GitHub',
            position: 'right',
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
        copyright: `Copyright © ${new Date().getFullYear()} DZL1943. Built with Docusaurus.`,

      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['ini']
      },
    }),
};

export default config;
