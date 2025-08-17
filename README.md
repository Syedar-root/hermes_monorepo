# Hermes Frontend Component Library

Hermes 是一个基于TypeScript开发的前端组件库，专注于提供高质量、易用的UI组件，帮助开发者快速构建美观且功能完善的Web应用。

## 项目简介

Hermes 组件库提供了多种UI组件，包括弹窗、滚动容器、面板内容等，同时包含了便捷的工具类和API交互功能。项目采用了现代化的前端开发技术栈，使用Vite作为构建工具，支持快速开发和优化的生产构建。

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

### 引入组件

```typescript
// 引入 Hermes 核心类
import { Hermes } from 'hermes_fe'

// 初始化 Hermes
const hermes = new Hermes({
  markId: 'hermes-id', // 标记元素的data属性名
  triggerId: 'hermes-trigger', // 触发方式的data属性名
  requestBaseUrl: 'http://api.example.com', // API请求基础URL
  popPanelMaxHeight: 400, // 弹窗最大高度
})

// 初始化组件
hermes.init()
```

### HTML中使用

```html
<!-- 为元素添加 Hermes 标记 -->
<div data-hermes-id="unique-id" data-hermes-trigger="hover">
  鼠标悬停显示弹窗
</div>
```

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

1. **自定义弹窗 (PopPanel)**
   - 支持悬停和点击触发
   - 智能定位，避免超出视口
   - 支持异步内容加载和加载状态显示

2. **自定义滚动容器 (ScrollContainer)**
   - 美化的滚动条样式
   - 支持滚动监听和高度变化回调
   - 自动显示/隐藏滚动条

3. **面板内容 (PanelContent)**
   - 支持多种内容类型：标题、文本、链接
   - 灵活的布局配置
   - 响应式设计

4. **核心工具类 (Hermes)**
   - DOM元素观察和自动初始化
   - 统一的事件处理和内容加载
   - 缓存机制优化性能

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
