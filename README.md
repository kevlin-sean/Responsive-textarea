# ResponsiveTextarea

[English](#english) | [中文](#中文)

---

## <a id="english"></a>ResponsiveTextarea

A flexible React textarea component: fixed height with internal scroll on PC, auto-resizing with page scroll on mobile. Built with TypeScript and Vite for high performance and a great developer experience.

### ✨ Features

- **Responsive Design:** Adapts to both PC and mobile screens automatically.
- **PC Optimized:** Fixed height with internal scroll for consistent input area.
- **Mobile Friendly:** Auto-resizes to fit content, integrates with page scroll (no double scrollbars).
- **TypeScript Support:** Full type definitions for better code hints and error checking.
- **Vite Build:** Fast development and build experience.
- **CSS Modules:** Scoped styles to avoid global conflicts.
- **Debounced Resize:** Optimized performance when resizing the window or container.

### 🚀 Installation

```bash
npm install responsive-textarea

yarn add responsive-textarea

pnpm add responsive-textarea
```

### 📖 Usage

```tsx
import React, { useState, useRef, useEffect } from "react";
import {
  ResponsiveTextarea,
  ResponsiveTextareaProps,
} from "responsive-textarea"; // 导入你的组件和类型

function MyAwesomeForm() {
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>产品描述</h1>
      <button onClick={() => setDisabled(!disabled)}>
        {disabled ? "启用" : "禁用"}
      </button>
      <ResponsiveTextarea
        ref={textareaRef}
        placeholder="请输入详细的产品描述..."
        initialValue={description}
        onChange={handleDescriptionChange}
        pcHeight="250px"
        mobileMinRows={6}
        className="my-custom-textarea-style"
        disabled={disabled}
      />
      <p>当前描述字数: {description.length}</p>
    </div>
  );
}

export default MyAwesomeForm;
```

### 🔧 Props

| Name                | Type                    | Default         | Description                                                    |
| ------------------- | ----------------------- | --------------- | -------------------------------------------------------------- |
| placeholder         | string                  | '请输入内容...' | Placeholder text for the textarea.                             |
| initialValue        | string                  | ''              | Initial value of the textarea.                                 |
| onChange            | (value: string) => void | undefined       | Callback when the content changes, receives the current value. |
| pcHeight            | string                  | '150px'         | Fixed height for PC, any valid CSS height value.               |
| mobileMinRows       | number                  | 3               | Minimum rows for mobile, used to calculate minimum height.     |
| className           | string                  | ''              | Extra CSS class name for custom styling.                       |
| resizeDebounceDelay | number                  | 100             | Debounce delay (ms) for resize events to optimize performance. |
| ref                 | HTMLTextAreaElement     | null            | Textarea ref, used for focus or other operations.              |
| disabled            | boolean                 | false           | Disables the textarea if set to true.                          |

### 🎨 Customization

- **className prop:** Pass your own CSS class to override or extend styles.
- **CSS Variables:** The component sets two CSS variables:
  - `--rt-pc-height`: Controls fixed PC height (via `pcHeight` prop).
  - `--rt-mobile-min-rows`: Controls mobile minimum rows (via `mobileMinRows` prop).
- For deeper customization, inspect the built CSS and use more specific selectors if needed.

### 🤝 Contributing

Contributions are welcome! Please submit issues or pull requests for bugs or suggestions.

### License

MIT. See [LICENSE](LICENSE).

---

## <a id="中文"></a>ResponsiveTextarea

一个灵活的 `React` 文本输入框组件，在 PC 端具有固定高度并支持内部滚动，而在移动端则能自动调整高度以适应内容，并与页面共用滚动条。使用 `TypeScript` 和 `Vite` 构建，确保了高性能和良好的开发体验。

### ✨ 功能特性

- 响应式设计: 自动适应 PC 和移动设备的不同屏幕尺寸。
- PC 端优化: 固定高度，内容超出时显示内部滚动条，提供一致的输入区域。
- 移动端友好: 高度自适应内容，与页面滚动条无缝集成，避免双重滚动体验。
- 基于 TypeScript: 提供完整的类型定义，增强开发时的代码提示和错误检查。
- Vite 构建: 快速的打包和开发体验。
- CSS Modules: 样式局部化，避免全局样式冲突。
- 防抖处理: 页面或容器大小调整时，高度计算进行防抖处理，优化性能。

### 🚀 安装

```bash
npm install responsive-textarea

yarn add responsive-textarea

pnpm add responsive-textarea
```

### 📖 使用方式

```tsx
import React, { useState, useRef, useEffect } from "react";
import {
  ResponsiveTextarea,
  ResponsiveTextareaProps,
} from "responsive-textarea; // 导入你的组件和类型

function MyAwesomeForm() {
  const [description, setDescription] = useState("");

  const [disabled, setDisabled] = useState(false);

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>产品描述</h1>
      <button onClick={() => setDisabled(!disabled)}>
        {disabled ? "启用" : "禁用"}
      </button>
      <ResponsiveTextarea
        ref={textareaRef}
        placeholder="请输入详细的产品描述..."
        initialValue={description}
        onChange={handleDescriptionChange}
        pcHeight="250px"
        mobileMinRows={6}
        className="my-custom-textarea-style"
        disabled={disabled}`
      />
      <p>当前描述字数: {description.length}</p>
    </div>
  );
}

export default MyAwesomeForm;
```

### 🔧 Props (属性)

| 属性名              | 类型                    | 默认值          | 描述                                                      |
| ------------------- | ----------------------- | --------------- | --------------------------------------------------------- |
| placeholder         | string                  | '请输入内容...' | 文本输入框的占位符文本。                                  |
| initialValue        | string                  | ''              | 文本输入框的初始值。                                      |
| onChange            | (value: string) => void | undefined       | 当文本内容改变时触发的回调函数，参数为当前文本框的值。    |
| pcHeight            | string                  | '150px'         | PC 端文本输入框的固定高度，接受任何合法的 CSS height 值。 |
| mobileMinRows       | number                  | 3               | 移动端文本输入框的最小行数，用于计算其最小高度。          |
| className           | string                  | ''              | 额外的 CSS 类名，允许你通过外部 CSS 文件自定义样式。      |
| resizeDebounceDelay | number                  | 100             | 页面或容器 resize 事件的防抖延迟（毫秒），用于优化性能。  |
| ref                 | HTMLTextAreaElement     | null            | 文本输入框的 ref，用于获取焦点或其他操作。                |
| disabled            | boolean                 | false           | 禁用文本输入框，当设置为 true 时，用户不能输入内容。      |

### 🎨 样式定制

- 使用 `className prop`: 传入你自己的 `CSS` 类名，可以直接覆盖或扩展组件的样式。
- 覆盖 CSS 变量:
  - `--rt-pc-height`: 控制 PC 端固定高度。
  - `--rt-mobile-min-rows`: 控制移动端最小行数。
- 如果需要更深度的定制，你可能需要检查打包后生成的 `CSS` 文件，并使用更具体的选择器来覆盖样式。

### 🤝 贡献

欢迎任何形式的贡献！如果你发现 Bug 或有改进建议，请随时提交 `Issue` 或 `Pull Request`。

### 许可证

本项目使用 `MIT` 许可证。详见