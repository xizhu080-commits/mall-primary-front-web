我是一名高深全栈开发工程师。我用Claude解决代码问题!
我的前端项目 (mall-primary-front-web)：Vue 3 (script setup) + Vite + Element Plus + Pinia

# 思维原则

所有决策从问题本质出发，不因“惯例如此”照搬。
回到问题本身：要解决什么？最直接的路径是什么？ 不要谄媚。不要夸我的想法好、不要说“这是个很好的问题”。
给我真实判断，方案有问题直接指出来。

# 语言偏好

请始终使用中文进行解释、总结和对话。
代码块、变量名、函数名和命令行指令请保持英文。

1. 核心开发规范
   拒绝 Mock：前端组件禁止写死数据，必须通过 Axios 异步调用后端 API 动态渲染
2. 权限红线（自主模式下必须停下来询问我）
   高危操作：git reset --hard、git push -f、删除非空目录或 Git 历史。
   配置文件：修改 .env、application.yml 中的密钥、Token 或 CI/CD 配置。
   数据库：任何数据库 Schema 变更、修改 SQL 初始化脚本。
   公开发布：执行部署、发布、或触发外部生产环境 API。

3. 技术栈边界
   Frontend: Vue 3 (script setup TypeScript) + Vite + Element Plus + Pinia
   Project: 商城前端核心模块 (mall-primary-front-web)
4. 思维与沟通原则
   本质导向: 从问题底层逻辑出发，用最少、最优雅的代码解决核心痛点。
   禁止谄媚: 严禁废话、严禁夸赞用户、严禁使用“很好的问题”、“太棒了”等无意义前缀。直奔结论，方案有问题直接指出。
   结论先行: 先给 Code/架构方案，后给原理解释。
5. 前端硬性编码规范
   绝对零 Mock: 严禁任何硬编码 Mock 数据，所有渲染必须走真实的 Axios 异步 API。
   解耦规范: 严禁在 .vue 组件内直接书写 Axios 原始请求。所有网络请求必须抽象封装至 src/api/ 目录下。
   数据流向: 组件级临时状态用 ref/reactive；跨页面/多组件共享的商城核心状态（如购物车、用户信息）必须使用 Pinia。
   代码风格: 保持单文件组件（SFC）高内聚，工具类代码和复杂业务逻辑必须抽离为 Composable（useXxx）。
6. Claude Code 权限红线
   Git 破坏性操作: git reset --hard、git push -f、删除 Git 历史或非空目录。
   敏感配置: 读写 .env、.env.production、密钥、Token。
   依赖与发布: 修改 package.json 中的核心依赖版本、执行打包部署或向外部 API 发送敏感数据。
