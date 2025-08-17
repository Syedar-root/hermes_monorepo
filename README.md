# Hermes Dictionary Hover Card SDK

Hermes 是一个基于TypeScript开发的前端SDK，专注于提供悬停显示词典卡片功能，帮助开发者为网页内容快速添加智能词典查询能力。

## 项目简介

Hermes SDK 提供了悬停显示词典卡片的核心功能，支持自定义触发方式、异步内容加载和智能定位。项目采用了现代化的前端开发技术栈，使用Vite作为构建工具，支持快速开发和优化的生产构建。

## 技术栈

- **语言**: TypeScript
- **构建工具**: Vite
- **HTTP客户端**: Axios
- **样式处理**: CSS Modules

## 安装说明

### 前提条件

- Node.js 16+
- pnpm 包管理器

### 安装步骤

1. 克隆项目到本地

```bash
git clone <repository-url>
cd hermes_monorepo
```

2. 安装依赖

```bash
pnpm install
```

3. 进入前端包目录

```bash
cd packages/hermes_fe
```

4. 启动开发服务器

```bash
pnpm dev
```

## 使用方法

### 安装SDK

可以通过npm或pnpm安装SDK包：

```bash
# 使用npm
npm install @syedar/hermes_fe

# 使用pnpm
pnpm add @syedar/hermes_fe
```

### 引入SDK

在你的项目中引入Hermes SDK：

```typescript
// 引入 Hermes 核心类
import { Hermes } from '@syedar/hermes_fe'

// 引入样式文件
import '@syedar/hermes_fe/dist/hermes_fe.css'
```

### 初始化配置

创建Hermes实例并配置：

```typescript
const hermes = new Hermes({
  markId: 'hermes-id', // 标记元素的data属性名，默认值为hermes-id
  triggerId: 'hermes-trigger', // 触发方式的data属性名，默认值为hermes-trigger
  requestBaseUrl: 'http://api.example.com', // API请求基础URL, 默认为http://127.0.0.1:8000
  popPanelMaxHeight: 400, // 弹窗最大高度，默认值为400
})

// 初始化组件
hermes.init()
```

具体请求路径：
GET /hermes-dict/content?id={id}

### HTML中使用

在HTML元素上添加数据属性来启用词典卡片：

```html
<!-- 基础用法 -->
<div data-hermes-id="word-1" data-hermes-trigger="hover">
  鼠标悬停显示词典解释
</div>

<!-- 自定义触发方式 -->
<div data-hermes-id="word-2" data-hermes-trigger="click">点击显示词典解释</div>
```

## 事件监听

监听Hermes的各种事件：

```typescript
// 目前代码中没有实现事件系统，此处为预留接口
// 监听卡片显示事件
// hermes.on('show', (data) => {
//   console.log('卡片显示:', data)
// })

// 监听卡片隐藏事件
// hermes.on('hide', () => {
//   console.log('卡片隐藏')
// })
```

## 自定义样式

通过CSS变量自定义卡片样式：

```css
/* 在你的样式文件中覆盖默认变量 */
:root {
  --hermes-bg-color: #ffffff;
  --hermes-border-color: #e0e0e0;
  --hermes-text-color: #333333;
  --hermes-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

## 配置选项

| 参数名            | 类型   | 默认值                                             | 描述                 |
| ----------------- | ------ | -------------------------------------------------- | -------------------- |
| markId            | string | 'hermes-id'                                        | 标记元素的data属性名 |
| triggerId         | string | 'hermes-trigger'                                   | 触发方式的data属性名 |
| requestBaseUrl    | string | 'http://127.0.0.1:4523/m1/4854404-4509875-default' | API请求基础URL       |
| popPanelMaxHeight | number | 400                                                | 弹窗最大高度         |

## 常见问题

### 1. 卡片不显示怎么办？

- 检查是否正确初始化了Hermes实例
- 确认元素上添加了正确的数据属性
- 检查浏览器控制台是否有错误信息
- 确保CSS文件已正确引入

### 2. 如何自定义卡片样式？

可以通过覆盖CSS变量来自定义样式，详情见[自定义样式](#自定义样式)部分。

### 3. 如何修改触发方式？

在HTML元素上设置 `data-hermes-trigger` 属性，可以设置为 'hover' 或 'click'。

## 项目结构

```
hermes_monorepo/
├── packages/
│   └── hermes_fe/
│       ├── src/
│       │   ├── components/       # UI组件
│       │   │   ├── popPanel.ts   # 弹窗组件
│       │   │   ├── scrollContainer/ # 滚动容器组件
│       │   │   └── panelContent/  # 面板内容组件
│       │   ├── utils/            # 工具类
│       │   │   ├── hermes.ts     # 核心功能类
│       │   │   ├── cache.ts      # 缓存工具
│       │   │   └── api/          # API请求
│       │   ├── index.ts          # 导出入口
│       │   └── style.css         # 全局样式
│       ├── index.html            # 入口HTML
│       └── package.json          # 包配置
└── pnpm-workspace.yaml           # 工作区配置
```

## 主要功能

1. **词典卡片显示**
   - 支持鼠标悬停触发显示
   - 智能定位，避免超出视口
   - 自定义卡片样式和内容结构

2. **异步内容加载**
   - 支持从API获取词典数据
   - 加载状态显示
   - 错误处理和重试机制

3. **灵活配置**
   - 自定义触发方式
   - 卡片最大高度限制
   - API请求基础URL配置

## 开发指南

### 脚本命令

- `pnpm dev`: 启动开发服务器
- `pnpm build`: 构建生产版本
- `pnpm preview`: 预览构建产物
- `pnpm lint:pritter`: 格式化代码

### 组件开发

1. 在 `src/components` 目录下创建新组件
2. 为组件编写类型定义
3. 实现组件逻辑和样式
4. 在 `src/utils/hermes.ts` 中集成新组件
5. 导出组件到 `src/index.ts`
