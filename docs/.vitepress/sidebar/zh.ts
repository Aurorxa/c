import { DefaultTheme } from 'vitepress'
import { commonDirectoryName } from '../utils/constant'
// 中文侧边栏
export const zhSidebar: DefaultTheme.Sidebar = [
  {
    text: 'C 语言基础',
    collapsed: true,
    items: [
      {
        text: 'C 语言初级',
        collapsed: true,
        items: [
          { text: '计算机软件常识科普', link: `/01_c-se/c-basic/01_${commonDirectoryName}/` },
          { text: 'Windows 软件包管理', link: `/01_c-se/c-basic/02_${commonDirectoryName}/` },
          { text: '编程基础一', link: `/01_c-se/c-basic/03_${commonDirectoryName}/` },
          { text: '编程基础二', link: `/01_c-se/c-basic/04_${commonDirectoryName}/` },
          { text: 'C 语言入门一', link: `/01_c-se/c-basic/05_${commonDirectoryName}/` },
          { text: 'C 语言入门二', link: `/01_c-se/c-basic/06_${commonDirectoryName}/` },
          { text: '变量和常量', link: `/01_c-se/c-basic/07_${commonDirectoryName}/` },
          { text: '进制', link: `/01_c-se/c-basic/08_${commonDirectoryName}/` },
          { text: '数据类型', link: `/01_c-se/c-basic/09_${commonDirectoryName}/` },
          { text: '运算符', link: `/01_c-se/c-basic/10_${commonDirectoryName}/` },
          { text: 'C 语言中的字符集', link: `/01_c-se/c-basic/11_${commonDirectoryName}/` },
        ]
      },
      {
        text: 'C 语言进阶',
        collapsed: true,
        items: [
          { text: '格式化输入输出', link: `/01_c-se/c-leap/01_${commonDirectoryName}/` },
          { text: '虚拟地址空间', link: `/01_c-se/c-leap/02_${commonDirectoryName}/` },
          { text: '流程控制', link: `/01_c-se/c-leap/03_${commonDirectoryName}/` },
          { text: '内存泄漏和内存溢出', link: `/01_c-se/c-leap/04_${commonDirectoryName}/` },
          { text: '数组一', link: `/01_c-se/c-leap/05_${commonDirectoryName}/` },
          { text: '数组二', link: `/01_c-se/c-leap/06_${commonDirectoryName}/` },
          { text: '指针一', link: `/01_c-se/c-leap/07_${commonDirectoryName}/` },
          { text: '指针二', link: `/01_c-se/c-leap/08_${commonDirectoryName}/` },
          { text: '指针三', link: `/01_c-se/c-leap/09_${commonDirectoryName}/` },
          { text: '变量', link: `/01_c-se/c-leap/10_${commonDirectoryName}/` },
        ]
      },
      {
        text: 'C 语言高级',
        collapsed: true,
        items: [
          { text: '函数一', link: `/01_c-se/c-senior/01_${commonDirectoryName}/` },
          { text: '函数二', link: `/01_c-se/c-senior/02_${commonDirectoryName}/` },
          { text: 'const 关键字', link: `/01_c-se/c-senior/03_${commonDirectoryName}/` },
          { text: '字符串', link: `/01_c-se/c-senior/04_${commonDirectoryName}/` },
          { text: '预处理器', link: `/01_c-se/c-senior/05_${commonDirectoryName}/` },
          { text: '自定义数据类型一', link: `/01_c-se/c-senior/06_${commonDirectoryName}/` },
          { text: '自定义数据类型二', link: `/01_c-se/c-senior/07_${commonDirectoryName}/` },
          { text: '常见的库函数', link: `/01_c-se/c-senior/08_${commonDirectoryName}/` },
          { text: '内存管理一', link: `/01_c-se/c-senior/09_${commonDirectoryName}/` },
          { text: '内存管理二', link: `/01_c-se/c-senior/10_${commonDirectoryName}/` },
          { text: '文件操作一', link: `/01_c-se/c-senior/11_${commonDirectoryName}/` },
          { text: '文件操作二', link: `/01_c-se/c-senior/12_${commonDirectoryName}/` },
        ]
      },
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
    text: 'Linux 快速上手',
    collapsed: true,
    items: [
      { text: 'Linux 初识和安装', link: `/06_linux/01_${commonDirectoryName}/` },
    ]
  },
  {
    text: 'Linux 系统编程',
    collapsed: true,
    items: [

    ]
  },
  {
    text: '项目构建工具',
    collapsed: true,
    items: [
      {
        text: 'meson', collapsed: true, items: [
          { text: 'meson 入门', link: `/03_build/01_${commonDirectoryName}/` },
        ]
      },
      {
        text: 'Cmake', collapsed: true, items: [
          { text: 'Cmake 入门', link: `/03_build/01_${commonDirectoryName}/` },
        ]
      },
      {
        text: 'Conan', link: '/03_build/01_${commonDirectoryName}/'
      },
      {
        text: 'Gradle', collapsed: true, items: [
          { text: 'Gradle 入门', link: `/03_build/01_${commonDirectoryName}/` },
        ]
      },
    ]
  },
  {
    text: 'C++ 基础',
    collapsed: true,
    items: [
      { text: 'C++ 入门', link: `/05_cpp/01_${commonDirectoryName}/` },
      { text: '变量、数据类型、运算符', link: `/05_cpp/02_${commonDirectoryName}/` },
      { text: '流程控制', link: `/05_cpp/03_${commonDirectoryName}/` },
      { text: '数组', link: `/05_cpp/04_${commonDirectoryName}/` },
      { text: '指针', link: `/05_cpp/05_${commonDirectoryName}/` },
      { text: '函数', link: `/05_cpp/06_${commonDirectoryName}/` },
      { text: '自定义数据类型', link: `/05_cpp/07_${commonDirectoryName}/` },
      { text: '类和对象', link: `/05_cpp/08_${commonDirectoryName}/` },
      { text: 'C++ 引用', link: `/05_cpp/09_${commonDirectoryName}/` },
      { text: '继承和派生', link: `/05_cpp/10_${commonDirectoryName}/` },
      { text: 'C++ 多态和虚函数', link: `/05_cpp/11_${commonDirectoryName}/` },
      { text: '运算符重载', link: `/05_cpp/12_${commonDirectoryName}/` },
      { text: '模板', link: `/05_cpp/13_${commonDirectoryName}/` },
      { text: 'C++ 异常', link: `/05_cpp/14_${commonDirectoryName}/` },
      { text: '面向对象进阶', link: `/05_cpp/15_${commonDirectoryName}/` },
      { text: '文件操作和 IO 流', link: `/05_cpp/16_${commonDirectoryName}/` },
      { text: 'STL（标准模板库）', link: `/05_cpp/17_${commonDirectoryName}/` },
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
]
