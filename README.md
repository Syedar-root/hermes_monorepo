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

1. **词典卡片显示**
   - 支持鼠标悬停触发显示
   - 智能定位，避免超出视口
   - 自定义卡片样式和内容结构

2. **异步内容加载**
   - 支持从API获取词典数据
   - 加载状态显示
   - 错误处理和重试机制

3. **缓存机制**
   - 查询结果缓存
   - 优化性能和减少API请求

4. **灵活配置**
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
