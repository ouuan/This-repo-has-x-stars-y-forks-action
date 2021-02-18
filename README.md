<p align="center">
  <a href="">
    <img width="140" src="https://avatars.githubusercontent.com/u/73879334?s=200&v=4" />
  </a>
</p>

<h1 align="center">Action JavaScript Template</h1>
<div align="center">
A simple javascript template for rapid development of GitHub actions.
</div>

![](https://img.shields.io/github/workflow/status/actions-cool/action-js-template/CI?style=flat-square)
[![](https://img.shields.io/badge/marketplace-action--js--template-blueviolet?style=flat-square)](https://github.com/marketplace/actions/action-js-template)

## 🚀 How to use?

![](https://github.com/actions-cool/resources/blob/main/image/template-js.png?raw=true)

## 📒 Catalog Introduction

```
├── .github/workflows/     The CI for make sure it is packaged correctly
├── dist                   Package the generated Aciton execution code
├── src                    Component home directory
│   └── main.js            Your code
└── action.yml             Action config
```

The rest of the documents can be consulted by yourself.

## 🤖 Command introduction

| Name | Desc |
| -- | -- |
| package | action build for release |
| format | prettier write |
| format-check | prettier check |

## Changelog

[CHANGELOG](./CHANGELOG.md)

## LICENSE

[MIT](https://github.com/actions-cool/action-js-template/blob/main/LICENSE)
