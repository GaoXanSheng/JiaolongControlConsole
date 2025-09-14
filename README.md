<p align="center">
  <img src="./resources/icon.png?raw=true" alt="Logo" height="200">
</p>

<h1 align="center">JiaolongControlConsole</h1>

<p align="center">
  <strong>基于【蛟龙16PRO】 7945HX + RTX 4060 BIOS v35 EC v35 版本开发</strong><br>
  <em>其他版本[16PRO版本]使用风险自负</em>
</p>

---
## 📢 交流群

<p align="left">
  <a href="https://qm.qq.com/q/4ase4LoAJi">
    <img src="https://img.shields.io/badge/QQ%20群-蛟龙工具箱问题反馈-EB1923?logo=tencentqq&logoColor=white" alt="QQ Group">
  </a>
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

## 额外相关项目
- [V55EC](https://github.com/GaoXanSheng/JiaoLong16Pro-EC_Modifier/releases/tag/V55)
