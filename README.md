# 新能源云检 - uniapp 微信小程序

基于 Vue3 + uniapp 重写的新能源车辆检测小程序。

## 技术栈

| 技术 | 说明 |
|------|------|
| uniapp | 跨端框架，主要用于微信小程序 |
| Vue 3 | 使用 `<script setup>` + Composition API |
| uview-plus | UI 组件库，`u-*` 前缀组件 |
| Pinia | 状态管理 |
| 自定义 request.js | 基于 uni.request 封装，含 token 注入 & 错误拦截 |

## 项目配置

- **应用名**：新能源云检
- **微信小程序 AppID**：`wx8b6812bdf87db4be`
- **后端 API**：`https://api.xinnengyuanyunjian.top`
- **主题色**：`#57ca9e`

---

## 目录结构

```
cheyunjian-frontend/
├── pages/
│   ├── login/login.vue          # 登录页（微信一键 / 手机验证码 / 账号密码）
│   └── main/
│       ├── index.vue            # 首页（三大功能入口）
│       └── mine.vue             # 我的（用户信息、VIP状态、记录入口）
│   	├── check/
│   	│   ├── vinInput.vue         # 车云检 VIN 输入
│   	│   ├── result.vue           # 车云检报告详情
│   	│   └── record.vue           # 车云检记录列表
│   		├── accident/
│   	│   ├── vinInput.vue         # 事故查询 VIN 输入
│   	│   ├── report.vue           # 事故报告（webview + 轮询）
│   	│   └── record.vue           # 事故查询记录列表
│   	├── maintenance/
│   	│   ├── vinInput.vue         # 维保查询 VIN 输入
│   	│   ├── report.vue           # 维保报告（webview + 轮询）
│   	│   └── record.vue           # 维保查询记录列表
│   	├── vip/
│   	│   ├── vipCard.vue          # VIP 套餐购买
│   	│   └── myVip.vue            # 我的会员状态
│   	└── mine/
│       ├── myInfo.vue           # 个人信息设置
│       └── question.vue         # 常见问题（静态）
│   	├── reg/
│   	│   ├── register.vue         # 手机号注册
│   	│   └── updatePassword.vue   # 修改密码（短信验证）
│   	└── pay/
│       	└── payResult.vue        # 支付结果页
├── store/
│   └── user.js                  # Pinia 用户状态（token, userInfo, isVip）
├── utils/
│   ├── request.js               # 请求封装（token 注入、loading、错误拦截）
│   └── api.js                   # 所有接口方法
├── static/                      # 静态资源（tab 图标占位）
├── App.vue                      # 应用入口
├── main.js                      # 初始化（pinia + uview-plus）
├── pages.json                   # 页面路由配置（含分包）
├── manifest.json                # 小程序配置（appid）
└── uni.scss                     # 全局样式变量
```

---

## 快速开始

### 1. 安装依赖

```bash
npm install
```

> 注意：需要先安装 HBuilderX 或 uni-cli。推荐用 HBuilderX 直接导入项目。

### 2. HBuilderX 运行（推荐）

1. 打开 HBuilderX
2. 文件 → 导入 → 从本地目录导入
3. 选择 `cheyunjian-frontend/` 目录
4. 运行 → 运行到小程序模拟器 → 微信开发者工具

### 3. CLI 运行

```bash
npm run dev:mp-weixin
```

编译产物在 `dist/dev/mp-weixin/`，用微信开发者工具打开该目录。

---

## 核心流程说明

### 微信一键登录

```
wx.login() → code
  → POST /index/user/miniProgramLogin {code}
  → 存 token 到 uni.setStorageSync('token')
  → 跳首页
```

### 支付 + 检测流程（以车云检为例）

```
输入 VIN 码
  → POST /Wx/payCloudCheck {payType:3, vinCode}
  → uni.requestPayment() 唤起微信支付
  → 支付成功 → POST /index/cloud/checkCarNew {vinCode, outTradeNo}
  → 跳转报告页 /pages/check/result
```

### 事故/维保报告轮询

```
支付成功 → 拿到 checkId
  → GET 查询报告状态（3秒一次，最多10次）
  → 生成完成 → web-view 加载 reportUrl
```

---

## 接口说明

所有接口在 `utils/api.js` 中定义，基于 `utils/request.js` 封装。

**Token 注入**：每次请求自动读取 `uni.getStorageSync('token')` 并注入 `Authorization` Header。

**统一错误处理**：
- `code === 401/403` → 清除 token，跳转登录页
- 网络错误 → Toast 提示 "网络请求失败"
- 业务错误 → Toast 提示 `res.msg`

---

## 状态管理（Pinia）

`store/user.js` 维护：

| 字段 | 类型 | 说明 |
|------|------|------|
| `token` | String | 登录 token |
| `userInfo` | Object | 用户信息 |
| `isVip` | Boolean | VIP 状态 |
| `vipExpireTime` | String | VIP 到期时间 |

关键方法：
- `setToken(token)` - 存 token（同步写 storage）
- `setUserInfo(info)` - 存用户信息
- `logout()` - 清除所有状态并跳登录
- `checkLogin()` - 检查登录状态，未登录则跳登录页
- `initFromStorage()` - App Launch 时从 storage 恢复状态

---

## 注意事项

1. **Tab 图标**：`static/` 下的 `tab-*.png` 为 1x1 像素占位图，上线前需替换为真实图标（建议 81x81px）
2. **uview-plus**：确保已通过 npm 安装或在 uni_modules 中引入
3. **分包加载**：`pagesA/` 和 `pagesB/` 为分包，减小主包体积
4. **支付**：微信支付仅在真机上可用，模拟器中会报错，属正常现象

---

## 开发进度

- [x] 项目结构搭建
- [x] 路由配置（pages.json）
- [x] manifest.json（appid 配置）
- [x] Pinia 用户状态管理
- [x] 请求封装（request.js + api.js）
- [x] 登录页（三种方式）
- [x] 首页（三大功能入口）
- [x] 我的页面
- [x] 车云检（VIN 输入、报告、记录）
- [x] 事故查询（VIN 输入、webview 报告、记录）
- [x] 维保查询（VIN 输入、webview 报告、记录）
- [x] VIP 购买 & 我的会员
- [x] 个人信息 & 常见问题
- [x] 注册 & 修改密码
- [x] 支付结果页
