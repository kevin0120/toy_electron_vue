# cap_jester
CAP 前端代码仓库

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

# 注意

## 建议使用nvm安装node环境
[下载windows安装包](https://github.com/coreybutler/nvm-windows/releases)


### npm的版本应该大于7.x, 如果npm版本小于7.x或者husky没有生效应该手动执行
```shell
npx husky install
```

# scripts脚本说明

## dev环境脚本

```text
"release": 如果不加参数自动更新修订版本, 并且自动更新changelog
"lint": 修复eslint问题的脚本    
"lint:prettier": 修复eslint问题的脚本 prettier风格,
"prepare": 启动husky， npm7中 "npm install" 之后会自动执行,
"add:husky-pre-commit": 添加husky一个脚本，添加后的脚本在 "git commit" 信息填写之前执行，检查 "git add" 的文件是否有eslint的问题并且修复,
"add:husky-commit-msg": 添加husky一个脚本，添加后的脚本在 "git commit" 信息填写之后执行，检查 "git commit" 的信息是否符合commit规范,
"lint-staged": 校验暂存区的文件并且修复eslint的问题
"test": 运行全部测试文件
"coverage": 查看代码测试覆盖率
```

## 安装依赖

```shell
pnpm install
```

## 运行dev环境
```shell
pnpm dev
```

## 构建生产环境代码
```shell
pnpm build
```

## 测试
### 运行该项目下的全部测试文件
```shell
pnpm test
```
### 查看测试代码覆盖率
```shell
pnpm coverage
```
### IDE插件支持
[IDE 集成](https://cn.vitest.dev/guide/ide.html)


## 文件结构说明：

```python
├──.husky                               #git hooks脚本
├──.github                              #CI CD
├──public                               #公共资源文件夹
├──src                                  #源代码
│  ├──api                                 #接口文件
│  ├──assets                              #静态资源
│  ├──components                          #公共组件
│  ├──hooks                               #通用业务逻辑
│  ├──layout                              #页面布局
│  ├──plugins                             #项目插件
│  ├──router                              #页面路由配置
│  ├──styles                              #全局样式文件
│  ├──types                               #全局变量类型声明
│  ├──utils                               #通用工具函数
│  ├──views                               #页面
│  ├──App.vue                             #vue根组件
│  └──main.ts                             #入口文件
├──.env                                 #全局环境变量
├──.env.development                     #开发环境环境变量
├──.env.production                      #生产环境环境变量
├──.prettierrc.cjs                       #代码风格规范
└──commitlint.config.cjs                 #commit规范
```
