import { defineConfig } from 'vitepress'
import timeline from "vitepress-markdown-timeline"
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import { loadEnv } from 'vite'

const mode = process.env.NODE_ENV || 'development'
const { VITE_BASE_URL } = loadEnv(mode, process.cwd())

console.log('Mode:', process.env.NODE_ENV)
console.log('VITE_BASE_URL:', VITE_BASE_URL)


/**
 * 使用浏览器内置的分词API Intl.Segmenter
 */
function chineseSearchOptimize(input: string) {
  const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
  const result: string[] = []
  for (const it of segmenter.segment(input)) {
    if (it.isWordLike) {
      result.push(it.segment)
    }
  }
  return result.join(' ')
}

export const sharedConfig = defineConfig({
  rewrites: {
    'zh/:rest*': ':rest*'
  },
  metaChunk: true,
  lang: 'zh-CN', // 语言
  title: "许大仙", // 站点名称
  titleTemplate: "Hi，终于等到你", // 网页标题
  description: "许大仙、前端、Java、大数据、云原生", // 站点描述
  head: [ // favicon.ico 图标等
    ['link', { rel: "shortcut icon", href: `${VITE_BASE_URL || '/'}logo.svg` }],
    // 网站 favicon.ico 图标
    ['link', { rel: "icon", href: `${VITE_BASE_URL || '/'}logo.svg`, type: "image/svg+xml" }],
    // 引入 Google Fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css?family=Roboto+Slab:300,300i,400,400i,700,700i%7CRoboto+Mono:400,400i,700,700i&display=fallback', rel: 'stylesheet' }],
    // 网页视口
    ['meta', {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,shrink-to-fit=no"
    }],
    // 关键词和描述
    ['meta', { name: "keywords", content: "许大仙" }],
  ],
  appearance: true, // 主题模式，默认浅色且开启切换
  base: VITE_BASE_URL,
  lastUpdated: true, // 上次更新
  vite: {
    build: {
      chunkSizeWarningLimit: 1600
    },
    plugins: [
      pagefindPlugin({
        locales: {
          root: {
            customSearchQuery: chineseSearchOptimize,
            btnPlaceholder: '搜索',
            placeholder: '搜索文档',
            emptyText: '空空如也',
            heading: '共: {{searchResult}} 条结果',
            filter(searchItem, idx, originArray) {
              console.log(searchItem)
              return !searchItem.route.includes('404')
            }
          },
          en: {
            btnPlaceholder: 'Search',
            placeholder: 'Search Docs...',
            emptyText: 'No results',
            heading: 'Total: {{searchResult}} search results.',
            filter(searchItem, idx, originArray) {
              console.log(searchItem)
              return !searchItem.route.includes('404')
            }
          }
        },
        excludeSelector: ['img', 'a.header-anchor'],
      }),
      groupIconVitePlugin(), //代码组图标
    ],
    server: {
      port: 10089
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler" // or 'modern'
        }
      }
    },
  },
  markdown: { // markdown 配置
    math: true,
    lineNumbers: true, // 行号显示
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },
    // 组件插入h1标题下
    config: (md) => {
      // 创建 markdown-it 插件
      md.use((md) => {
        const defaultRender = md.render
        md.render = function (...args) {
          const [content, env] = args
          const isHomePage = env.path === '/' || env.relativePath === 'index.md'  // 判断是否是首页

          if (isHomePage) {
            return defaultRender.apply(md, args) // 如果是首页，直接渲染内容
          }
          // 调用原始渲染
          let defaultContent = defaultRender.apply(md, args)
          // 替换内容
          defaultContent = defaultContent.replace(/NOTE/g, '提醒')
            .replace(/TIP/g, '建议')
            .replace(/IMPORTANT/g, '重要')
            .replace(/WARNING/g, '警告')
            .replace(/CAUTION/g, '注意')
          // 返回渲染的内容
          return defaultContent
        }
      })
      md.use(timeline)
      md.use(groupIconMdPlugin) //代码组图标
    }
  },
  themeConfig: { // 主题设置
    logo: '/logo.svg',  // 左上角logo
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/Aurorxa/c/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
    //社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Aurorxa/c' },
    ],
  }
})
