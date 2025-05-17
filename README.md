<p align="center">
  <img src="./resources/icon.png?raw=true" alt="Logo" height="200">
</p>

<h1 align="center">JiaolongControlConsole</h1>

<p align="center">
  <strong>基于【蛟龙16PRO】 7945HX + RTX 4060 BIOS v35 EC v35 版本开发</strong><br>
  <em>其他版本[16PRO版本]使用风险自负</em>
</p>

---

## 📦 安装依赖
```bash
winget install OpenJS.NodeJS
```
```bash
winget install Microsoft.DotNet.SDK.8
```
```bash
npm install
```

## 🧪 启动开发模式

```bash
powershell -ExecutionPolicy Bypass -File .\JiaoLongWMI\build.ps1
```
```bash
npm run dev
```
## 🏗️ 构建项目

```bash
powershell -ExecutionPolicy Bypass -File .\build.ps1
```

---
