# ResponsiveTextarea

一个灵活的 React 文本输入框组件，在 PC 端具有固定高度并支持内部滚动，而在移动端则能自动调整高度以适应内容，并与页面共用滚动条。使用 TypeScript 和 Vite 构建，确保了高性能和良好的开发体验。

## ✨ 功能特性

- 响应式设计: 自动适应 PC 和移动设备的不同屏幕尺寸。

- PC 端优化: 固定高度，内容超出时显示内部滚动条，提供一致的输入区域。

- 移动端友好: 高度自适应内容，与页面滚动条无缝集成，避免双重滚动体验。

- 基于 TypeScript: 提供完整的类型定义，增强开发时的代码提示和错误检查。

- Vite 构建: 快速的打包和开发体验。

- CSS Modules: 样式局部化，避免全局样式冲突。

- 防抖处理: 页面或容器大小调整时，高度计算进行防抖处理，优化性能。

## 🚀 安装

```bash


npm install responsive-textarea

yarn add responsive-textarea

pnpm add responsive-textarea


```

## 📖 使用方式

```tsx
import React, { useState } from "react";
import {
  ResponsiveTextarea,
  ResponsiveTextareaProps,
} from "responsive-textarea-vite"; // 导入你的组件和类型

function MyAwesomeForm() {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>产品描述</h1>
      <ResponsiveTextarea
        placeholder="请输入详细的产品描述..."
        initialValue={description}
        onChange={handleDescriptionChange}
        pcHeight="250px" // Custom PC height
        mobileMinRows={6} // Custom mobile minimum rows
        className="my-custom-textarea-style" // Add your own extra class name
      />
      <p>当前描述字数: {description.length}</p>
    </div>
  );
}

export default MyAwesomeForm;
```

## 🔧 Props (属性)

ResponsiveTextarea 组件接受以下属性

| 属性名              | 类型                    | 默认值          | 描述                                                      |
| ------------------- | ----------------------- | --------------- | --------------------------------------------------------- |
| placeholder         | string                  | '请输入内容...' | 文本输入框的占位符文本。                                  |
| initialValue        | string                  | ''              | 文本输入框的初始值。                                      |
| onChange            | (value: string) => void | undefined       | 当文本内容改变时触发的回调函数，参数为当前文本框的值。    |
| pcHeight            | string                  | '150px'         | PC 端文本输入框的固定高度，接受任何合法的 CSS height 值。 |
| mobileMinRows       | number                  | 3               | 移动端文本输入框的最小行数，用于计算其最小高度。          |
| className           | string                  | ''              | 额外的 CSS 类名，允许你通过外部 CSS 文件自定义样式。      |
| resizeDebounceDelay | number                  | 100             | 页面或容器 resize 事件的防抖延迟（毫秒），用于优化性能。  |


## 🎨 样式定制
组件内部使用 CSS Modules 来封装样式。你可以通过以下方式定制样式：

使用 className prop: 传入你自己的 CSS 类名，可以直接覆盖或扩展组件的样式。

覆盖 CSS 变量:
组件内部通过 JavaScript 动态设置了两个 CSS 变量：

--rt-pc-height: 控制 PC 端固定高度。

--rt-mobile-min-rows: 控制移动端最小行数。
你可以通过 pcHeight 和 mobileMinRows props 来改变它们。

如果需要更深度的定制，你可能需要检查打包后生成的 CSS 文件，并使用更具体的选择器来覆盖样式。

## 🤝 贡献
欢迎任何形式的贡献！如果你发现 Bug 或有改进建议，请随时提交 Issue 或 Pull Request。

## 许可证
本项目使用 MIT 许可证。详见 LICENSE 文件。