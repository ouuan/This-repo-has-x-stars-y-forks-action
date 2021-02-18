# This repo has x stars y forks

## 如何触发？

这里使用了 3 种触发方式

1. push main 分支触发
2. fork 触发
3. 定时 5 分钟触发

## 如何在自己项目使用？

1. Fork 到自己项目中
2. 打开自己项目的 Actions，有时候默认 fork 的项目，GitHub 会默认关闭 Actions
3. 申请个人 token，https://github.com/settings/tokens
4. 勾选如下图
![](./token.png)
5. 修改 `.github/workflows/auto-update.yml` 中的 `GH_TOKEN`，将这个名称同新建的名称保持一致。
6. 将新建的 token 保存到自己项目的 Secrets 中。注意 token 保存好
![](./secrets.png)
7. Actions 会自动运行，更新当前项目的名称

## 创意来自

- https://github.com/RealPeha

## LICENSE

[MIT](./LICENSE)
