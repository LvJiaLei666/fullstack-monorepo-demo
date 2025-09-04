# 全栈 Monorepo 演示项目

这是一个使用现代技术栈构建的全栈monorepo项目，展示了如何在前后端之间共享类型定义。

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

# 4. 初始化数据库
pnpm db:generate
pnpm db:migrate

# 5. 启动开发服务器
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
│   └── shared/                  # 共享包 - 类型定义和工具
│       ├── src/
│       │   ├── types/           # 通用类型定义
│       │   ├── generated/       # Prisma生成的类型
│       │   └── index.ts         # 导出入口
│       └── package.json
├── package.json                 # 根配置
├── pnpm-workspace.yaml         # pnpm工作空间配置
└── .gitignore                  # Git忽略规则
```

## 🚀 技术栈

### 后端 (apps/server/)
- **NestJS** - Node.js框架，提供企业级架构
- **Prisma** - 现代化数据库ORM，类型安全
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
- **Prisma Client** - 数据库类型自动生成
- **通用类型** - API响应、分页、错误处理等

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

### 3. 数据库设置
```bash
# 复制环境变量模板
cp apps/server/.env.example apps/server/.env

# 编辑环境变量文件
# DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
# JWT_SECRET="your-secret-key"
# PORT=3000

# 生成Prisma客户端到shared包
pnpm db:generate

# 运行数据库迁移
pnpm db:migrate

# (可选) 填充示例数据
pnpm --filter @fullstack-monorepo-demo/server db:seed
```

### 4. 构建共享包
```bash
# 构建shared包，使其他包可以导入
pnpm --filter @fullstack-monorepo-demo/shared build
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

## 🔗 共享类型的使用

### 在后端使用
```typescript
// apps/server/src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import type { User, Prisma, ApiResponse } from '@fullstack-monorepo-demo/shared';

@Injectable()
export class UsersService {
  async createUser(data: Prisma.UserCreateInput): Promise<ApiResponse<User>> {
    const user = await this.prisma.user.create({ data });
    return {
      success: true,
      data: user,
      message: '用户创建成功'
    };
  }
}
```

### 在前端使用
```typescript
// apps/web/src/stores/user.ts
import { defineStore } from 'pinia';
import type { User, ApiResponse } from '@fullstack-monorepo-demo/shared';

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([]);
  const loading = ref(false);

  const fetchUsers = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await fetch('/api/users');
      const result: ApiResponse<User[]> = await response.json();
      if (result.success) {
        users.value = result.data;
      }
    } finally {
      loading.value = false;
    }
  };

  return { users, loading, fetchUsers };
});
```

### 在Vue组件中使用
```vue
<!-- apps/web/src/components/UserList.vue -->
<script setup lang="ts">
import type { User } from '@fullstack-monorepo-demo/shared';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

// TypeScript会提供完整的类型检查和智能提示
const handleUserClick = (user: User) => {
  console.log(`点击用户: ${user.email}`);
};

onMounted(() => {
  userStore.fetchUsers();
});
</script>

<template>
  <div class="user-list">
    <div v-if="userStore.loading">加载中...</div>
    <div
      v-for="user in userStore.users"
      :key="user.id"
      @click="handleUserClick(user)"
      class="user-item"
    >
      {{ user.email }}
    </div>
  </div>
</template>
```

## 🎯 核心特性

### ✅ 类型安全
- 前后端共享相同的类型定义
- Prisma自动生成数据库类型
- TypeScript提供编译时类型检查
- 接口变更时的编译时错误检测

### ✅ 开发体验
- 自动类型推导和智能提示
- 热重载开发服务器
- 统一的代码风格和ESLint规则
- 集成的测试环境

### ✅ 可维护性
- 单一数据源的类型定义
- 模块化的项目结构
- 清晰的依赖关系
- 自动化的构建和部署

### ✅ 性能优化
- Vite的快速构建
- Tree-shaking优化
- 代码分割
- 生产环境优化

## 📝 可用脚本

### 根目录
- `pnpm dev` - 启动所有开发服务器
- `pnpm build` - 构建所有包
- `pnpm lint` - 运行所有linter
- `pnpm test` - 运行所有测试
- `pnpm clean` - 清理所有构建文件
- `pnpm db:generate` - 生成Prisma客户端
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
```

## 🔧 配置说明

### Workspace配置 (pnpm-workspace.yaml)
```yaml
packages:
  - packages/*
  - apps/*
```

### Prisma配置 (apps/server/prisma/schema.prisma)
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../../../packages/shared/src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

这个配置将Prisma客户端生成到shared包中，使前后端都能访问相同的类型。

### TypeScript配置
- 根目录的 `tsconfig.json` 配置项目引用
- 各个包都有自己的 `tsconfig.json`
- 共享的编译器选项确保一致性

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
# 重新生成Prisma客户端
pnpm db:generate

# 重新构建shared包
pnpm --filter @fullstack-monorepo-demo/shared build
```

#### 3. 数据库连接错误
- 检查 `apps/server/.env` 中的 `DATABASE_URL`
- 确保PostgreSQL服务正在运行
- 验证数据库用户权限

#### 4. 端口冲突
- 前端默认端口: 5173
- 后端默认端口: 3000
- 可以在各自的配置文件中修改

### 调试技巧
1. 使用 `console.log` 和浏览器开发工具
2. 利用 VS Code 的调试功能
3. 查看网络请求和响应
4. 使用 Prisma Studio 查看数据库状态

## 📚 学习资源

### 官方文档
- [Prisma文档](https://www.prisma.io/docs/) - 数据库工具链
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
- ✅ 类型共享机制
- ✅ 开发环境配置
- ✅ 基础CRUD操作

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

### 报告问题
如果你发现了bug或有功能建议，请在GitHub Issues中报告。

## 📄 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有开源项目的贡献者，特别是：
- Prisma团队提供的优秀ORM
- NestJS社区的企业级框架
- Vue.js团队的响应式框架
- pnpm团队的快速包管理器

---

如果这个项目对你有帮助，请给它一个 ⭐️！ 