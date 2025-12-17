# 🔐 Stripe Webhook 配置指南

## 问题说明
当前 `STRIPE_WEBHOOK_SECRET` 未配置，导致 Stripe 的支付通知无法被安全验证。

## ✅ 修复内容（已完成）

### 1. 修复了 webhook 请求体处理
- 添加了 `getRawBody` 函数来获取原始请求体
- 配置 `bodyParser: false` 以保留原始请求数据
- Stripe 签名验证现在可以正常工作

### 2. 添加了降级处理
- 如果 webhook secret 未配置，会记录警告但仍处理事件
- 生产环境必须配置 secret 以确保安全

## 🚀 配置步骤

### 第 1 步：获取 Webhook Secret

1. 访问 [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. 点击 "Add endpoint" 或选择现有的 endpoint
3. 配置 endpoint URL：
   ```
   https://purrpawboutique.uk/api/stripe-webhook
   ```
4. 选择要监听的事件：
   - `checkout.session.completed` - 结账完成
   - `payment_intent.succeeded` - 支付成功
   - `payment_intent.payment_failed` - 支付失败
5. 点击 "Add endpoint"
6. 在 endpoint 详情页面，点击 "Reveal" 查看 **Signing secret**
7. 复制这个 secret（格式类似：`whsec_xxxxxxxxxxxxx`）

### 第 2 步：在 Vercel 中配置环境变量

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择你的项目 `purr-paw-boutique`
3. 进入 **Settings** → **Environment Variables**
4. 添加新的环境变量：
   - **Name**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: `whsec_xxxxxxxxxxxxx`（你从 Stripe 复制的值）
   - **Environment**: 选择 `Production`（和其他需要的环境）
5. 点击 **Save**

### 第 3 步：重新部署

配置环境变量后，Vercel 会自动触发重新部署。如果没有：
1. 进入项目的 **Deployments** 页面
2. 点击最新部署旁边的 **⋯** 菜单
3. 选择 **Redeploy**

### 第 4 步：测试 Webhook

1. 在 Stripe Dashboard 的 webhook 页面
2. 点击你的 endpoint
3. 点击 **Send test webhook**
4. 选择 `checkout.session.completed` 事件
5. 点击 **Send test webhook**
6. 检查响应是否为 `200 OK`

## 🔍 验证配置

### 检查 Vercel 日志
1. 进入 Vercel 项目的 **Deployments** 页面
2. 点击最新的部署
3. 查看 **Functions** 日志
4. 应该看到：
   - ✅ `Webhook signature verified: checkout.session.completed`
   - 而不是 ⚠️ `STRIPE_WEBHOOK_SECRET not configured`

### 测试真实支付
1. 在网站上完成一次测试购买
2. 检查 Stripe Dashboard 的 webhook 日志
3. 确认所有事件都成功发送（200 状态码）

## 📝 重要提示

- **生产环境必须配置 webhook secret**，否则任何人都可以伪造支付通知
- 每个 Stripe 账户的每个 endpoint 都有唯一的 secret
- 如果重新创建 endpoint，需要更新 secret
- 不要将 webhook secret 提交到 Git 仓库

## 🔄 提交代码

修复已完成，现在提交到 GitHub：

```bash
git add api/stripe.ts vercel.json STRIPE_WEBHOOK_SETUP.md
git commit -m "fix: Stripe webhook signature verification

- Added getRawBody helper to get raw request body
- Configured bodyParser: false for webhook endpoint
- Added fallback for missing webhook secret with warnings
- Improved webhook event logging"
git push origin main
```

## ✨ 完成后

配置完成后，你的 Stripe webhook 将：
- ✅ 安全验证所有来自 Stripe 的请求
- ✅ 自动处理支付成功/失败事件
- ✅ 记录详细的日志便于调试
- ✅ 防止恶意伪造的支付通知
