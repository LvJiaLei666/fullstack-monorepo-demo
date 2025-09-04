# 全栈 Monorepo 演示项目

这是一个使用现代技术栈构建的全栈monorepo项目，展示了如何在前后端之间共享类型定义和常量。

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)

## 🚀 快速开始

### 前置条件
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 13

### 快速启动
```bash
# 1. 克隆项目
git clone <repository-url>
cd fullstack-monorepo-demo

# 2. 安装依赖
pnpm install

# 3. 设置环境变量
cp apps/server/.env.example apps/server/.env
# 编辑 .env 文件，配置数据库连接

# 4. 构建共享包
pnpm build:shared

# 5. 初始化数据库
pnpm db:generate
pnpm db:migrate

# 6. 启动开发服务器
pnpm dev
```

访问 http://localhost:5173 查看前端应用，http://localhost:3000 访问后端API。

## 🏗️ 项目结构

```
fullstack-monorepo-demo/
├── apps/
│   ├── server/                   # 后端 - NestJS应用
│   │   ├── src/
│   │   │   ├── prisma/          # Prisma服务
│   │   │   ├── users/           # 用户模块
│   │   │   └── main.ts          # 应用入口
│   │   ├── prisma/
│   │   │   └── schema.prisma    # 数据库模式
│   │   └── package.json
│   └── web/                     # 前端 - Vue3应用
│       ├── src/
│       │   ├── components/      # Vue组件
│       │   ├── stores/          # Pinia状态管理
│       │   ├── views/           # 页面组件
│       │   └── main.ts          # 应用入口
│       └── package.json
├── packages/
│   └── shared/                  # 共享包 - 类型定义、常量和工具
│       ├── src/
│       │   ├── types/           # 通用类型定义
│       │   ├── constants/       # 共享常量
│       │   ├── generated/       # Prisma生成的类型
│       │   └── index.ts         # 导出入口
│       ├── tsup.config.ts       # 构建配置
│       └── package.json
├── package.json                 # 根配置
├── pnpm-workspace.yaml         # pnpm工作空间配置
└── .gitignore                  # Git忽略规则
```

## 🚀 技术栈

### 后端 (apps/server/)
- **NestJS** - Node.js框架，提供企业级架构
- **Prisma** - 现代化数据库ORM，类型安全
- **prisma-types-generator** - 生成优化的类型定义到共享包
- **TypeScript** - 静态类型检查
- **PostgreSQL** - 关系型数据库
- **Jest** - 单元测试框架

### 前端 (apps/web/)
- **Vue 3** - 渐进式JavaScript框架
- **Composition API** - Vue 3的新特性
- **Pinia** - 轻量级状态管理
- **TypeScript** - 类型安全的JavaScript
- **Vite** - 快速的构建工具
- **Vue Router** - 客户端路由
- **Vitest** - 基于Vite的测试框架

### 共享包 (packages/shared/)
- **TypeScript** - 类型定义
- **tsup** - 快速的TypeScript构建工具
- **prisma-types-generator** - 优化的数据库类型生成
- **通用类型** - API响应、分页、错误处理等
- **共享常量** - API前缀、配置常量等

## 📦 安装和设置

### 1. 环境准备
确保你的系统已安装以下软件：
- Node.js 18.0.0 或更高版本
- pnpm 8.0.0 或更高版本
- PostgreSQL 13 或更高版本

### 2. 安装依赖
```bash
pnpm install
```

### 3. 构建共享包
```bash
# 首先构建shared包，使其他包可以导入
pnpm build:shared
```

### 4. 数据库设置
```bash
# 复制环境变量模板
cp apps/server/.env.example apps/server/.env

# 编辑环境变量文件
# DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
# JWT_SECRET="your-secret-key"
# PORT=3000

# 生成Prisma类型到shared包
pnpm db:generate

# 运行数据库迁移
pnpm db:migrate

# (可选) 填充示例数据
pnpm --filter @fullstack-monorepo-demo/server db:seed
```

## 🏃‍♂️ 运行项目

### 开发模式
```bash
# 同时启动前后端开发服务器
pnpm dev

# 前端: http://localhost:5173
# 后端: http://localhost:3000
# API文档: http://localhost:3000/api

# 或者分别启动
pnpm --filter @fullstack-monorepo-demo/server start:dev
pnpm --filter @fullstack-monorepo-demo/web dev
```

### 生产构建
```bash
# 构建所有包
pnpm build

# 启动生产服务器
pnpm --filter @fullstack-monorepo-demo/server start:prod
pnpm --filter @fullstack-monorepo-demo/web preview
```

### 数据库管理
```bash
# 打开Prisma Studio (数据库可视化工具)
pnpm db:studio

# 重置数据库
pnpm --filter @fullstack-monorepo-demo/server db:reset

# 查看迁移状态
pnpm --filter @fullstack-monorepo-demo/server db:status
```

## 🔗 共享类型和常量的使用

### Prisma类型生成配置
```prisma
// apps/server/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

// 使用prisma-types-generator生成优化的类型到shared包
generator types {
  provider    = "prisma-types-generator"
  output      = "../../../packages/shared/src/generated/prisma"
  modelSuffix = "Model"
  prettier    = "true"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 在后端使用共享类型和常量
```typescript
// apps/server/src/app.service.ts
import { Injectable } from '@nestjs/common';
import { API_PREFIX } from '@fullstack-monorepo-demo/shared';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!' + API_PREFIX;
  }
}
```

### 在前端使用共享类型和常量
```vue
<!-- apps/web/src/App.vue -->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import type { UserModel } from '@fullstack-monorepo-demo/shared';
import { API_PREFIX } from '@fullstack-monorepo-demo/shared';

// 使用共享的类型定义
const user: UserModel = {
  id: '1',
  email: 'test@test.com',
  password: 'test',
  createdAt: '2021-01-01',
  updatedAt: '2021-01-01',
}
</script>

<template>
  <div>
    <!-- 使用共享常量 -->
    <p>API前缀: {{ API_PREFIX }}</p>
    <p>用户信息: {{ user }}</p>
  </div>
</template>
```

### 共享包构建配置
```typescript
// packages/shared/tsup.config.ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ["src/*.ts"],
  format: ["cjs", "esm"],        // 支持CommonJS和ES模块
  dts: true,                     // 生成类型声明文件
  splitting: false,              // 关闭代码分割
  clean: true,                   // 构建前清理输出目录
  outDir: "dist",
  sourcemap: "inline",           // 内联source map
  cjsInterop: true,             // CJS互操作性
})
```

## 🎯 核心特性

### ✅ 类型安全
- 前后端共享相同的类型定义
- 使用 `prisma-types-generator` 生成优化的数据库类型
- TypeScript提供编译时类型检查
- 接口变更时的编译时错误检测

### ✅ 常量共享
- API前缀、配置常量等在前后端保持一致
- 避免硬编码，提高可维护性
- 集中管理应用配置

### ✅ 开发体验
- 自动类型推导和智能提示
- 热重载开发服务器
- 快速的 `tsup` 构建工具
- 统一的代码风格和ESLint规则
- 集成的测试环境

### ✅ 可维护性
- 单一数据源的类型定义
- 模块化的项目结构
- 清晰的依赖关系
- 自动化的构建和部署

### ✅ 性能优化
- Vite的快速构建
- tsup的高效TypeScript编译
- Tree-shaking优化
- 代码分割
- 生产环境优化

## 📝 可用脚本

### 根目录
- `pnpm dev` - 启动所有开发服务器
- `pnpm build` - 构建所有包
- `pnpm build:shared` - 单独构建共享包
- `pnpm build:server` - 单独构建后端
- `pnpm build:web` - 单独构建前端
- `pnpm lint` - 运行所有linter
- `pnpm test` - 运行所有测试
- `pnpm clean` - 清理所有构建文件
- `pnpm db:generate` - 生成Prisma客户端和类型
- `pnpm db:migrate` - 运行数据库迁移
- `pnpm db:studio` - 打开Prisma Studio

### 各个包
```bash
# 在特定包中运行命令
pnpm --filter @fullstack-monorepo-demo/server <command>
pnpm --filter @fullstack-monorepo-demo/web <command>
pnpm --filter @fullstack-monorepo-demo/shared <command>

# 示例
pnpm --filter @fullstack-monorepo-demo/server test
pnpm --filter @fullstack-monorepo-demo/web build
pnpm --filter @fullstack-monorepo-demo/shared dev  # 监听模式构建
```

## 🔧 配置说明

### Workspace配置 (pnpm-workspace.yaml)
```yaml
packages:
  - packages/*
  - apps/*
```

### 共享包配置 (packages/shared/package.json)
```json
{
  "name": "@fullstack-monorepo-demo/shared",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch"
  },
  "devDependencies": {
    "tsup": "^8.5.0"
  },
  "peerDependencies": {
    "@prisma/client": "*"
  }
}
```

### TypeScript配置
- 根目录的 `tsconfig.json` 配置项目引用
- 各个包都有自己的 `tsconfig.json`
- 共享的编译器选项确保一致性
- tsup提供快速的TypeScript编译

## 🧪 测试

### 运行测试
```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm --filter @fullstack-monorepo-demo/server test
pnpm --filter @fullstack-monorepo-demo/web test

# 运行测试并查看覆盖率
pnpm --filter @fullstack-monorepo-demo/server test:cov
```

### 测试结构
- **后端测试**: Jest + Supertest
- **前端测试**: Vitest + Vue Test Utils
- **E2E测试**: 可以集成Playwright或Cypress

## 🚨 故障排除

### 常见问题

#### 1. 依赖安装失败
```bash
# 清理缓存并重新安装
pnpm store prune
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

#### 2. 类型错误
```bash
# 重新生成Prisma类型
pnpm db:generate

# 重新构建shared包
pnpm build:shared
```

#### 3. 共享包导入错误
```bash
# 确保先构建shared包
pnpm build:shared

# 检查shared包的构建输出
ls -la packages/shared/dist/
```

#### 4. 数据库连接错误
- 检查 `apps/server/.env` 中的 `DATABASE_URL`
- 确保PostgreSQL服务正在运行
- 验证数据库用户权限

#### 5. 端口冲突
- 前端默认端口: 5173
- 后端默认端口: 3000
- 可以在各自的配置文件中修改

### 调试技巧
1. 使用 `console.log` 和浏览器开发工具
2. 利用 VS Code 的调试功能
3. 查看网络请求和响应
4. 使用 Prisma Studio 查看数据库状态
5. 检查共享包的构建输出和类型导出

## 📚 学习资源

### 官方文档
- [Prisma文档](https://www.prisma.io/docs/) - 数据库工具链
- [prisma-types-generator](https://github.com/YassinEldeeb/prisma-types-generator) - 类型生成器
- [tsup文档](https://tsup.egoist.dev/) - TypeScript构建工具
- [NestJS文档](https://docs.nestjs.com/) - Node.js框架
- [Vue 3文档](https://vuejs.org/) - 前端框架
- [Pinia文档](https://pinia.vuejs.org/) - 状态管理
- [pnpm Workspace](https://pnpm.io/workspaces) - 包管理

### 推荐教程
- [TypeScript 深入理解](https://www.typescriptlang.org/docs/)
- [Monorepo 最佳实践](https://monorepo.tools/)
- [全栈开发指南](https://fullstackopen.com/)

## 🛣️ 路线图

### 已完成
- ✅ 基础项目结构
- ✅ 类型共享机制（使用prisma-types-generator）
- ✅ 常量共享机制
- ✅ 快速构建配置（tsup）
- ✅ 开发环境配置
- ✅ 基础CRUD操作示例

### 计划中
- 🔄 用户认证和授权
- 🔄 API文档生成
- 🔄 Docker容器化
- 🔄 CI/CD流水线
- 🔄 性能监控
- 🔄 错误追踪

### 未来考虑
- 📋 GraphQL支持
- 📋 微服务架构
- 📋 实时通信(WebSocket)
- 📋 文件上传和处理
- 📋 国际化支持

## 🤝 贡献

我们欢迎所有形式的贡献！

### 如何贡献
1. Fork 这个仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

### 贡献指南
- 遵循现有的代码风格
- 添加适当的测试
- 更新相关文档
- 确保所有测试通过
- 构建共享包后再提交

### 报告问题
如果你发现了bug或有功能建议，请在GitHub Issues中报告。

## 📄 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有开源项目的贡献者，特别是：
- Prisma团队提供的优秀ORM
- prisma-types-generator的作者提供的类型生成工具
- tsup团队提供的快速构建工具
- NestJS社区的企业级框架
- Vue.js团队的响应式框架
- pnpm团队的快速包管理器

---

如果这个项目对你有帮助，请给它一个 ⭐️！ 