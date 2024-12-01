import { DefaultTheme } from 'vitepress'
import { commonDirectoryName } from '../utils/constant'
export const sidebar: DefaultTheme.Sidebar = {
  '/notes/': [
    {
      text: 'C 语言基础',
      collapsed: true,
      items: [
        { text: '计算机软件常识科普', link: `/notes/01_c-basic/01_${commonDirectoryName}/` },
        { text: '编程基础一', link: `/notes/01_c-basic/02_${commonDirectoryName}/` },
        { text: '编程基础二', link: `/notes/01_c-basic/03_${commonDirectoryName}/` },
        { text: 'C 语言入门一', link: `/notes/01_c-basic/04_${commonDirectoryName}/` },
        { text: 'C 语言入门二', link: `/notes/01_c-basic/05_${commonDirectoryName}/` },
        { text: '变量和常量', link: `/notes/01_c-basic/06_${commonDirectoryName}/` },
        { text: '进制', link: `/notes/01_c-basic/07_${commonDirectoryName}/` },
        { text: '数据类型', link: `/notes/01_c-basic/08_${commonDirectoryName}/` },
        { text: '运算符', link: `/notes/01_c-basic/09_${commonDirectoryName}/` },
        { text: 'C 语言中的字符集', link: `/notes/01_c-basic/10_${commonDirectoryName}/` },
      ]
    },
    {
      text: 'C 语言进阶',
      collapsed: true,
      items: [
        { text: '格式化输入输出', link: `/notes/02_c-leap/01_${commonDirectoryName}/` },
        { text: '虚拟地址空间', link: `/notes/02_c-leap/02_${commonDirectoryName}/` },
        { text: '流程控制', link: `/notes/02_c-leap/03_${commonDirectoryName}/` },
        { text: '内存泄漏和内存溢出', link: `/notes/02_c-leap/04_${commonDirectoryName}/` },
        { text: '数组一', link: `/notes/02_c-leap/05_${commonDirectoryName}/` },
        { text: '数组二', link: `/notes/02_c-leap/06_${commonDirectoryName}/` },
        { text: '指针一', link: `/notes/02_c-leap/07_${commonDirectoryName}/` },
        { text: '指针二', link: `/notes/02_c-leap/08_${commonDirectoryName}/` },
        { text: '指针三', link: `/notes/02_c-leap/09_${commonDirectoryName}/` },
        { text: '字符串', link: `/notes/02_c-leap/10_${commonDirectoryName}/` },

      ]
    },
    {
      text: 'C 语言高级',
      collapsed: true,
      items: [
        { text: '函数一', link: `/notes/03_c-senior/01_${commonDirectoryName}/` },
        { text: '函数二', link: `/notes/03_c-senior/02_${commonDirectoryName}/` },
        { text: '变量', link: `/notes/03_c-senior/03_${commonDirectoryName}/` },
        { text: 'const 关键字', link: `/notes/03_c-senior/04_${commonDirectoryName}/` },
        { text: '预处理器', link: `/notes/03_c-senior/05_${commonDirectoryName}/` },
        { text: '自定义数据类型一', link: `/notes/03_c-senior/06_${commonDirectoryName}/` },
        { text: '自定义数据类型二', link: `/notes/03_c-senior/07_${commonDirectoryName}/` },
        { text: '常见的库函数', link: `/notes/03_c-senior/08_${commonDirectoryName}/` },
        { text: '内存管理', link: `/notes/03_c-senior/09_${commonDirectoryName}/` },
        { text: '文件操作', link: `/notes/03_c-senior/10_${commonDirectoryName}/` },
      ]
    },
    {
      text: '数据结构和算法',
      collapsed: true,
      items: [
      ]
    },
    {
      text: 'C 语言新特性',
      collapsed: true,
      items: [
      ]
    },
    {
      text: 'Linux 编程',
      collapsed: true,
      items: [
        { text: 'Linux 初识和安装', link: `/notes/06_linux/01_${commonDirectoryName}/` },
      ]
    },
    {
      text: '项目构建工具',
      collapsed: true,
      items: [
        {
          text: 'meson', collapsed: true, items: [
            { text: 'meson 入门', link: `/notes/03_build/01_${commonDirectoryName}/` },
          ]
        },
        {
          text: 'Cmake', collapsed: true, items: [
            { text: 'Cmake 入门', link: `/notes/03_build/01_${commonDirectoryName}/` },
          ]
        },
        {
          text: 'Conan', link: '/notes/03_build/01_${commonDirectoryName}/'
        },
        {
          text: 'Gradle', collapsed: true, items: [
            { text: 'Gradle 入门', link: `/notes/03_build/01_${commonDirectoryName}/` },
          ]
        },
      ]
    },
    {
      text: 'C++ 基础',
      collapsed: true,
      items: [
        { text: 'C++ 入门', link: `/notes/05_cpp/01_${commonDirectoryName}/` },
        { text: '变量、数据类型、运算符', link: `/notes/05_cpp/02_${commonDirectoryName}/` },
        { text: '流程控制', link: `/notes/05_cpp/03_${commonDirectoryName}/` },
        { text: '数组', link: `/notes/05_cpp/04_${commonDirectoryName}/` },
        { text: '指针', link: `/notes/05_cpp/05_${commonDirectoryName}/` },
        { text: '函数', link: `/notes/05_cpp/06_${commonDirectoryName}/` },
        { text: '自定义数据类型', link: `/notes/05_cpp/07_${commonDirectoryName}/` },
        { text: '类和对象', link: `/notes/05_cpp/08_${commonDirectoryName}/` },
        { text: 'C++ 引用', link: `/notes/05_cpp/09_${commonDirectoryName}/` },
        { text: '继承和派生', link: `/notes/05_cpp/10_${commonDirectoryName}/` },
        { text: 'C++ 多态和虚函数', link: `/notes/05_cpp/11_${commonDirectoryName}/` },
        { text: '运算符重载', link: `/notes/05_cpp/12_${commonDirectoryName}/` },
        { text: '模板', link: `/notes/05_cpp/13_${commonDirectoryName}/` },
        { text: 'C++ 异常', link: `/notes/05_cpp/14_${commonDirectoryName}/` },
        { text: '面向对象进阶', link: `/notes/05_cpp/15_${commonDirectoryName}/` },
        { text: '文件操作和 IO 流', link: `/notes/05_cpp/16_${commonDirectoryName}/` },
        { text: 'STL（标准模板库）', link: `/notes/05_cpp/17_${commonDirectoryName}/` },
      ]
    },
    {
      text: 'C++ 高级',
      collapsed: true,
      items: [

      ]
    },
    {
      text: 'Qt 桌面开发',
      collapsed: true,
      items: [

      ]
    }
  ],
}

export default sidebar