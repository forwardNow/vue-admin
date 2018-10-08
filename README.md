# 基于 Vue 的中后台系统

- [基于 Vue 的中后台系统](#%E5%9F%BA%E4%BA%8E-vue-%E7%9A%84%E4%B8%AD%E5%90%8E%E5%8F%B0%E7%B3%BB%E7%BB%9F)
  - [1. 介绍](#1-%E4%BB%8B%E7%BB%8D)
  - [2. 编撰](#2-%E7%BC%96%E6%92%B0)
  - [3. 使用](#3-%E4%BD%BF%E7%94%A8)
    - [3.1. 环境](#31-%E7%8E%AF%E5%A2%83)
    - [3.2. 设置代理](#32-%E8%AE%BE%E7%BD%AE%E4%BB%A3%E7%90%86)
    - [3.3. 开发与编译](#33-%E5%BC%80%E5%8F%91%E4%B8%8E%E7%BC%96%E8%AF%91)
    - [3.4. 启动 Vue UI](#34-%E5%90%AF%E5%8A%A8-vue-ui)
  - [4. 使用到的包](#4-%E4%BD%BF%E7%94%A8%E5%88%B0%E7%9A%84%E5%8C%85)
  - [5. 兼容性](#5-%E5%85%BC%E5%AE%B9%E6%80%A7)
  - [6. 项目结构](#6-%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84)
    - [6.1. /src/](#61-src)
  - [7. 前后端数据交换](#7-%E5%89%8D%E5%90%8E%E7%AB%AF%E6%95%B0%E6%8D%AE%E4%BA%A4%E6%8D%A2)
    - [7.1. 数据编码](#71-%E6%95%B0%E6%8D%AE%E7%BC%96%E7%A0%81)
    - [7.2. 数据格式](#72-%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F)
      - [7.2.1. 请求](#721-%E8%AF%B7%E6%B1%82)
      - [7.2.2. 响应](#722-%E5%93%8D%E5%BA%94)
      - [7.2.3. 错误代码(errorCode)](#723-%E9%94%99%E8%AF%AF%E4%BB%A3%E7%A0%81errorcode)
      - [7.2.4. 结果数据(result)](#724-%E7%BB%93%E6%9E%9C%E6%95%B0%E6%8D%AEresult)
  - [8. 图标](#8-%E5%9B%BE%E6%A0%87)
  - [9. 平滑切换视图](#9-%E5%B9%B3%E6%BB%91%E5%88%87%E6%8D%A2%E8%A7%86%E5%9B%BE)
  - [10. 全局 loading](#10-%E5%85%A8%E5%B1%80-loading)
    - [10.1. 说明](#101-%E8%AF%B4%E6%98%8E)
    - [10.2. 原理](#102-%E5%8E%9F%E7%90%86)
    - [10.3. 实现](#103-%E5%AE%9E%E7%8E%B0)
  - [11. 用户认证](#11-%E7%94%A8%E6%88%B7%E8%AE%A4%E8%AF%81)
    - [11.1. 原理](#111-%E5%8E%9F%E7%90%86)
    - [11.2. 实现](#112-%E5%AE%9E%E7%8E%B0)
  - [12. Element UI 的使用](#12-element-ui-%E7%9A%84%E4%BD%BF%E7%94%A8)
    - [12.1. `<el-table>` 的 width 无限增加的问题](#121-el-table-%E7%9A%84-width-%E6%97%A0%E9%99%90%E5%A2%9E%E5%8A%A0%E7%9A%84%E9%97%AE%E9%A2%98)

## 1. 介绍

编写此文档的目的是为了记录如何实现前后端分离。

## 2. 编撰

吴钦飞(wuqinfei@qq.com)

## 3. 使用

> 此项目使用 vue-cli 3.0.2 开发、测试、编译

### 3.1. 环境

```shell
$ sudo npm install -g webpack webpack-cli
$ webpack -v
4.18.0

$ sudo npm install -g @vue/cli
$ vue --version
3.0.2

$ sudo npm install -g @vue/cli-service-global
```

### 3.2. 设置代理

> 用于开发时启动的测试服务器（devServer）

编辑 `/vue.config.js` 文件中 `"target"` 属性：

```javascript
module.exports = {
  devServer: {
    // 设置代理
    proxy: {
      '/api': {
        // target: 'http://localhost:3000/', // 域名
        target: 'http://192.168.10.226:1888/', // 域名
        ws: true, // 是否启用websockets
        /**
         * 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，
         * 这样服务端和服务端进行数据的交互就不会有跨域问题
         */
        changOrigin: true,
      },
    },
  },
};
```

### 3.3. 开发与编译

```shell
# 启动测试服务器
npm run serve

# 编译
npm run build
```

### 3.4. 启动 Vue UI

>在命令行中执行 `vue ui` 命令，启动 web 服务器，选择该项目

```shell
vue ui
```

## 4. 使用到的包

| 库或框架   | 版本   | 说明                                    |
| ---------- | ------ | --------------------------------------- |
| vue        | 2.5.16 | 指令、组件、数据绑定                    |
| vue-router | 3.0.1  | 前端路由                                |
| axios      | 0.18.0 | HTTP 通信                               |
| element-ui | 2.4.6  | UI 组件库(基于 vue 2.x)，兼容性 IE10+ |
| vuex       | 3.0.1  | 应用的状态管理                          |

## 5. 兼容性

现代浏览器以及 IE10+。(element-ui 的兼容性 IE10+)

## 6. 项目结构

```text
admin/
  dist/           # build 后文件的存放目录(部署目录)
  node_modules/   # 第三方包
  public/         # 静态资源
  src/            # 源码目录
  tests/          # 测试
  .browserslistrc # 浏览器支持设置
  .eslintrc.js    # ESLint 设置
  .gitignore      #
  babel.config.js # ES6 转 ES5
  cypress.json
  package.json    # 包描述文件
  package-lock.json # 版本锁定
  postcss.config.js # 浏览器前缀设置
  README.html
  README.md
  vue.config.js   # Vue CLI 配置文件
```

### 6.1. /src/

```text
src/
  apis/           # 服务器端 API
  assets/         # 资源目录
  components/     # 组件：公共组件
  interceptors/   # 拦截器
  plugins/        # Vue 插件
  services/       # 服务层
  share/          # 共享
  views/          # 视图目录
  App.vue         # 入口 Vue 组件
  main.js         # 入口脚本
  router.js       # 路由
  store.js        # 状态存储
```

## 7. 前后端数据交换

### 7.1. 数据编码

前后端基于 HTTP 协议进行通信，需要约定 HTTP 数据部分的编码。

可通过 `Content-Type` 消息头指定编码方式。

常用的编码方式：

| 编码方式                            | 描述                          | 示例                                     |
| ----------------------------------- | ----------------------------- | ---------------------------------------- |
| `application/x-www-form-urlencoded` | 表单 url 编码，常用于表单提交 | `name=zs&gender=1&age=18`                |
| `application/json`                  | JSON 编码，常用于 Ajax        | `{"name": "zs", "gender": 1, "age": 18}` |

此项目采用 `application/json` 格式

### 7.2. 数据格式

#### 7.2.1. 请求

约定：

- 方法：POST
- 路径：以 `/api` 打头
- 数据：都为 json 对象(`application/json`)

数据分为两种：

- 普通数据
- 分页数据

普通数据：

```json
/*
POST /api/user HTTP/1.1
Content-Type: application/json
*/
{
  "id": 1
}
```

分页数据：

```json
/*
POST /api/user/list HTTP/1.1
Content-Type: application/json
*/
{
  "age": 0,
  "gender": 1,

  "pager": {
    "currentPage": 1,
    "pageSize": 20,
    "orderBy": [
      { "field": "age", "order": "asc" },
      { "field": "gender", "order": "desc" },
    ]
  }
}
/*
SELECT * from sys_user LIMIT 0,20
WHERE age = 0 AND gender = 1
ORDER BY age ASC, gender DESC
 */
```

#### 7.2.2. 响应

约定：

- 所有 HTTP 响应状态码都为 200

数据格式：

```json
/*
HTTP/1.1 200 OK
Content-Type: application/json
*/
{
  "errorCode": 401,    // 错误代码：API 处理的结果代码。(必须)
  "reason": "未登录",   // 原因：对错误代码的描述。(可选)
  "result": {}         // 数据：API 返回的数据。(可选)
}
```

#### 7.2.3. 错误代码(errorCode)

>针对前端的处理

分为两种

- 全局：交由拦截器进行处理，并给予提示
- 私有：针对特定业务的错误处理，自行处理

全局：

| 错误代码 | 描述                             |
| ---------- | -------------------------------- |
| 0          | 处理成功                         |
| 401        | 未登录         |
| 403        | 未授权 |
| 500        | 其他错误           |

私有：

- 格式：`xxyyzz`，`xx` 代表业务类型，`yy` 代表子业务类型，`zz` 代表错误类型
- 示例
  - 100101，会话/登陆/用户或密码错误
  - 100201，会话/登出/退出系统失败

#### 7.2.4. 结果数据(result)

分为两种

- 普通数据
- 分页数据

普通数据：

```json
/*
HTTP/1.1 200 OK
Content-Type: application/json
*/
{
  "errorCode": 0,
  "reason": "成功",
  "result": {
    "id": 1,
    "name": "张三",
    "age": 18
  }
}
```

分页数据：

```json
/*
HTTP/1.1 200 OK
Content-Type: application/json
*/
{
  "errorCode": 0,
  "reason": "成功",
  "result": {
    "pager": {
      "total": 129,
      "pageSize": 20,
      "currentPage": 1,
    },
    "items": [
      { "id": 1, "name": "张三", "age": 18 },
      { "id": 2, "name": "张三", "age": 19 },
      // ......
    ]
  }
}
```

## 8. 图标

阿里图标库：[Rookie 3.0官方图标库](http://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=7077)

## 9. 平滑切换视图

使用 Vue 过渡动画达到视图平滑过渡的效果。

```html
<style>
.admin-enter,
.admin-leave-to {
  opacity: 0;
  transform: translateX(140px);
}

.admin-enter-active,
.admin-leave-active {
  transition: all 0.5s ease;
}
</style>
<transition mode="out-in" name="admin">
  <router-view class="content__body"></router-view>
</transition>
```

## 10. 全局 loading

### 10.1. 说明

有 Ajax 请求时会显示 loading 状态，即一旦有 Ajax 处于 pending 状态就会显示 loading 。

### 10.2. 原理

- 在 store(vuex)中定义状态 `store.state.isLoading`
- 在 App.vue 中创建 loading 元素，并关联到 store 中的状态
  - `<div class="loading" v-show="isVisible">...</div>`
  - 计算属性 `isVisible` 的值为 `store.state.isLoading`
- 发送请求之前，改变状态
- 处理响应之前，改变状态

### 10.3. 实现

[./src/store.js](./src/store.js)

```javascript
// /src/store.js
export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  mutations: {
    showLoading() {
      this.state.isLoading = true;
    },
    hideLoading() {
      this.state.isLoading = false;
    },
  },
});
```

[./src/App.vue](./src/App.vue)

```html
<!-- /src/App.vue -->
<template>
  <div class="app">
    <router-view></router-view>
    <div class="loading" v-show="isVisible">
      <span class="el-icon-loading"></span>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isVisible() {
      return this.$store.state.isLoading;
    },
  },
};
</script>
```

[./src/interceptors/HttpRequestInterceptor.js](./src/interceptors/HttpRequestInterceptor.js)

```javascript
// /src/interceptors/HttpRequestInterceptor.js
axiosInstance.interceptors.request.use(
  (config) => {
    store.commit('showLoading');
    return config;
  },
  (error) => {
    store.commit('showLoading');
    return Promise.reject(error);
  },
);
```

[./src/interceptors/HttpResponseInterceptor.js](./src/interceptors/HttpResponseInterceptor.js)

```javascript
// /src/interceptors/HttpResponseInterceptor.js
axiosInstance.interceptors.response.use(
  (res) => {
    store.commit('hideLoading');
    return res.data;
  },
  (error) => {
    store.commit('hideLoading');
    return Promise.reject(error);
  },
);
```

## 11. 用户认证

### 11.1. 原理

**凭证**：

除了 `/login`(登陆路由)，其他的路由全部需要需要登陆认证。

登陆成功后，将返回的 `userInfo` 作为认证成功的凭证存储在 sessionStorage 。

每次跳转路由之前都会验证是否有凭证，没有则跳转到登陆页。

**凭证失效的情况**：

- 关闭浏览器页面
- 服务端 session 过期后，返回 401 状态码后，手动删除凭证。

### 11.2. 实现

第 0 步：登陆成功后，在 sessionStorage 保存凭证。

第 1 步：在配置 route 时，设置 meta 数据标识该路由是否需要认证。([./src/router.js](./src/router.js))

```javascript
// 文件：/src/router.js
const router = new Router({
  routes: [
    // ...
    {
      name: 'home', path: '/home', component: Home,
      meta: { requiresAuth: true },
    },
  ],
});
```

第 2 步：在全局守卫中，判断要跳转的路由的 meta 数据判断是否允许该路由。([./src/interceptors/RouteInterceptor.js](./src/interceptors/RouteInterceptor.js))

```javascript
// 文件：/src/interceptors/RouteInterceptor.js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Auth.isLogin()) { // 未登陆
      next({
        name: 'login',
        query: { status: 401 },
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});
```

第 3 步：请求服务器，返回 401(未认证)状态码时移除凭证并导航到登陆页。([./src/interceptors/HttpResponseInterceptor.js](./src/interceptors/HttpResponseInterceptor.js))

```javascript
// /src/interceptors/HttpResponseInterceptor.js
switch (status) {
  case 401: {
    desc = '登陆失效，请重新登陆！';

    AuthService.remove();

    setTimeout(() => {
      router.push({
        name: 'login',
        query: { status: 401 },
      });
    }, 2000);
    break;
  }
}
```

## 12. Element UI 的使用

### 12.1. `<el-table>` 的 width 无限增加的问题

在 IE10 使用`<el-table>`，满足以下条件的一种会造成其 width 不停增长：

- 所在容器如果有向右浮动的元素(`float: right;`)，该容器也没有应用 `.clearfix`
- 所在容器使用了 `min-height: 500px;`