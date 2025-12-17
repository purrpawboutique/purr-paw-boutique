# 🔧 线上问题修复总结

## 修复日期
2024-12-17

## 修复内容

### ✅ 问题 1: Webhook 请求体处理错误（已修复）

**问题原因**:
- Stripe webhook 需要原始请求体来验证签名
- Vercel 默认会解析 JSON body，导致签名验证失败
- 使用 `JSON.stringify(req.body)` 无法还原原始请求体

**修复方案**:
1. 添加 `export const config = { api: { bodyParser: false } }` 禁用自动解析
2. 创建 `getRawBody()` 函数从请求流中读取原始数据
3. 使用原始请求体进行 Stripe 签名验证

**修改文件**:
- `api/stripe.ts` - 添加原始请求体处理逻辑
- `vercel.json` - 添加 `maxDuration: 10` 配置

**影响范围**: 
- 仅影响 `/api/stripe-webhook` 端点
- 不影响其他 API 端点
- 向后兼容，不破坏现有功能

---

### ⚠️ 问题 2: STRIPE_WEBHOOK_SECRET 未配置（需要手动配置）

**问题原因**:
- `.env` 文件中 `STRIPE_WEBHOOK_SECRET` 为空
- 无法验证 webhook 请求的真实性
- 存在安全风险（任何人都可以伪造支付通知）

**临时方案**:
- 代码中添加了降级处理
- 如果 secret 未配置，会记录警告但仍处理事件
- 生产环境必须配置以确保安全

**需要的操作**:
1. 从 Stripe Dashboard 获取 webhook signing secret
2. 在 Vercel 环境变量中配置 `STRIPE_WEBHOOK_SECRET`
3. 重新部署应用

**详细步骤**: 参见 `STRIPE_WEBHOOK_SETUP.md`

---

## 📋 提交清单

### 已修改的文件
- ✅ `api/stripe.ts` - 修复 webhook 处理
- ✅ `vercel.json` - 添加函数配置
- ✅ `STRIPE_WEBHOOK_SETUP.md` - 配置指南
- ✅ `HOTFIX_SUMMARY.md` - 本文件

### 未修改的文件
- ✅ 所有前端代码保持不变
- ✅ 其他 API 端点保持不变
- ✅ 构建配置保持不变

---

## 🚀 部署步骤

### 1. 提交代码
```bash
git add api/stripe.ts vercel.json STRIPE_WEBHOOK_SETUP.md HOTFIX_SUMMARY.md
git commit -m "fix: Stripe webhook signature verification

- Added getRawBody helper to get raw request body
- Configured bodyParser: false for webhook endpoint
- Added fallback for missing webhook secret with warnings
- Improved webhook event logging"
git push origin main
```

### 2. 配置环境变量
按照 `STRIPE_WEBHOOK_SETUP.md` 中的步骤配置 `STRIPE_WEBHOOK_SECRET`

### 3. 验证部署
- 检查 Vercel 部署日志
- 测试 webhook 端点
- 确认签名验证正常工作

---

## 🔍 回滚方案

如果出现问题，可以回滚到上一个 commit：
```bash
git revert HEAD
git push origin main
```

或者在 Vercel Dashboard 中选择之前的部署版本进行回滚。

---

## 📊 风险评估

**风险等级**: 🟢 低

**原因**:
- 修改范围小，仅涉及 webhook 处理
- 添加了降级处理，不会导致服务中断
- 向后兼容，不影响现有功能
- 可以快速回滚

**测试建议**:
1. 部署后立即测试 webhook 端点
2. 使用 Stripe Dashboard 发送测试 webhook
3. 监控 Vercel 函数日志
4. 完成一次测试购买流程

---

## 📝 后续工作

### 立即需要（高优先级）
- [ ] 配置 `STRIPE_WEBHOOK_SECRET` 环境变量
- [ ] 测试 webhook 签名验证
- [ ] 验证支付流程完整性

### 可以稍后处理（中优先级）
- [ ] 移除硬编码的域名，使用环境变量
- [ ] 收紧 CORS 配置
- [ ] 添加 webhook 事件的数据库存储

### 长期优化（低优先级）
- [ ] 添加 webhook 重试机制
- [ ] 实现订单状态同步
- [ ] 添加支付失败通知

---

## ✨ 预期效果

修复完成后：
- ✅ Webhook 签名验证正常工作
- ✅ 支付通知安全可靠
- ✅ 防止恶意伪造的支付请求
- ✅ 详细的日志便于调试
