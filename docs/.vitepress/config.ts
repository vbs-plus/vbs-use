import { defineConfig } from 'vitepress'
import { version } from '../../package.json'
import { applyPlugins } from './plugins/code'

const guides = [
  { text: 'Quick Start', link: '/guide/quick-start' },
]

const functions = [
  {
    text: 'Elements',
    items: [
      {
        text: 'UseActiveElement',
        link: '/functions/elements/useActiveElement',
      },
    ],
  },
  {
    text: 'Utils',
    items: [
      {
        text: 'UseActiveElement',
        link: '/functions/elements/useActiveElement',
      },
    ],
  },
  {
    text: 'Browser',
    items: [
      {
        text: 'UseActiveElement',
        link: '/functions/elements/useActiveElement',
      },
    ],
  }, {
    text: 'Behavior',
    items: [
      {
        text: 'UseActiveElement',
        link: '/functions/elements/useActiveElement',
      },
    ],
  },
]

const nav = [
  { text: 'Guide', items: guides },
  { text: 'Functions', items: functions },
  {
    text: `v${version}`,
    items: [
      {
        text: 'Release Notes',
        link: 'https://github.com/onu-ui/onu-ui/releases',
      },
    ],
  },
]

const sidebar = {
  '/guide': [
    {
      text: 'Developer Guide',
      items: guides,
    },
  ],
  '/functions': functions,
}

export default defineConfig({
  title: 'VbsUse',
  description: 'Mini collection of Vue Composition Utilities',
  head: [
    ['meta', { property: 'og:title', content: 'VbsUse' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Mini collection of Vue Composition Utilities',
      },
    ],
    [
      'meta',
      { property: 'og:url', content: 'https://github.com/vbs-plus/vbs-use' },
    ],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;400;600&display=swap',
        rel: 'stylesheet',
      },
    ],
  ],
  themeConfig: {
    logo: '/logo.png',
    editLink: {
      pattern: 'https://github.com/vbs-plus/vbs-use/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },
    nav,
    socialLinks: [{ icon: 'github', link: 'https://github.com/vbs-plus/vbs-use' }],
    sidebar,
    algolia: {
      appId: '',
      apiKey: '',
      indexName: '',
    },
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2022-present yzh990918',
    },
  },
  markdown: {
    config: (md) => {
      applyPlugins(md)
    },
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
})
