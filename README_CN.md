# 图片预览增强版 (中文版) - Visual Studio Code 扩展

> **重要声明**：
> - 本插件是 [vscode-gutter-preview](https://github.com/kisstkondoros/gutter-preview) 的中文汉化增强版本
> - 原作者：[Tamas Kiss](https://github.com/kisstkondoros)
> - 汉化版使用 [Cursor](https://cursor.sh/) 辅助完成，由中文社区维护
> - 原版权利和荣誉归属于原作者

> 这是 vscode-gutter-preview 的独立中文分支版本，添加了额外的功能支持，不会被原版插件更新覆盖。

在代码行号区域和悬停时预览图片，支持变量引用和动态图片选择。

## 版本说明

这是一个独立维护的中文版本，在原版基础上增加了以下特性：

1. 完整的中文界面
2. 支持变量引用方式的图片路径
3. 支持动态图片选择（srcid）
4. 不会被原版插件的更新覆盖

## 与原版区别

1. 插件ID不同：`vscode-gutter-preview-cn`（原版为 `vscode-gutter-preview`）
2. 支持更多图片引用方式
3. 完整的中文支持
4. 独立的版本号管理

## 功能特点

1. 支持在代码行号区域预览图片
2. 支持鼠标悬停时预览图片
3. 支持动态图片选择（通过 srcid）
4. 支持变量引用方式的图片路径

## 安装方法

[如何安装 Visual Studio Code 扩展](https://code.visualstudio.com/docs/editor/extension-gallery)

## 使用方法

### 1. 基本图片预览

```html
<img src="path/to/image.png" />
```

### 2. 动态图片选择

使用 srcid 属性来选择不同的图片：

```html
<image src="bg.png" srcid="1" />
<!-- 预览 bg_1.png -->
<img src="bg.png" srcid="2" />
<!-- 预览 bg_2.png -->
<div src="bg.png" srcid="abc" />
<!-- 预览 bg_0.png -->
```

### 3. 变量引用方式

使用变量定义和引用来指定图片路径：

```xml
<Var name="customize_dev_icon" expression="'icon/icon_1.png'" type="string" const="true" />
<Image srcExp="@customize_dev_icon" ... />
```

## 配置选项

1. `gutterpreview.showImagePreviewOnGutter`: 是否在代码行号区域显示预览（默认：true）
2. `gutterpreview.showUnderline`: 是否为图片URL添加下划线（默认：true）
3. `gutterpreview.imagePreviewMaxHeight`: 预览图片的最大高度（默认：100）
4. `gutterpreview.imagePreviewMaxWidth`: 预览图片的最大宽度（默认：-1）
5. `gutterpreview.sourceFolder`: 解析相对路径时的额外文件夹
6. `gutterpreview.currentColorForSVG`: SVG预览的默认颜色（默认：white）

## 支持的文件类型

-   HTML/XML
-   CSS/SCSS/LESS
-   Markdown
-   任何包含图片URL的文本文件

## 特殊功能

1. 动态图片选择：

    - 使用 srcid 属性指定图片序号
    - 自动处理数字和非数字的 srcid 值

2. 变量引用支持：
    - 支持通过 `<Var>` 标签定义变量
    - 使用 `@变量名` 方式引用变量
    - 自动处理引号和路径格式

## 注意事项

1. 变量引用目前仅在同一文件内有效
2. srcid 为非数字时默认使用 \_0 后缀
3. 图片路径支持相对路径和绝对路径

## 常见问题

Q: 为什么有些图片无法预览？
A: 检查图片路径是否正确，以及文件是否存在。对于特殊URL格式，可以通过 `gutterpreview.urlDetectionPatterns` 配置正则表达式来支持。

Q: 如何修改预览图片的大小？
A: 通过 `gutterpreview.imagePreviewMaxHeight` 和 `gutterpreview.imagePreviewMaxWidth` 配置项来调整。

## 更新日志

### 0.32.2

-   添加对变量引用的支持
-   添加动态图片选择功能
-   优化代码结构和性能
-   添加中文支持

## 许可证

基于 MIT 许可证开源
