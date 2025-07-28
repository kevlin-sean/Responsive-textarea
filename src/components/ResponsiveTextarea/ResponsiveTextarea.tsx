import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./ResponsiveTextarea.module.css"; // Import CSS Modules

// Simple debounce function to limit function call frequency
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

/**
 * Props interface for the ResponsiveTextarea component.
 */
export interface ResponsiveTextareaProps {
  /**
   * Placeholder text for the textarea.
   * @default 'Please enter content...'
   */
  placeholder?: string;
  /**
   * Initial value of the textarea.
   * @default ''
   */
  initialValue?: string;
  /**
   * Callback function triggered when the textarea content changes.
   * @param value The current value of the textarea.
   */
  onChange?: (value: string) => void;
  /**
   * Fixed height for the textarea on PC, e.g., '150px'.
   * @default '150px'
   */
  pcHeight?: string;
  /**
   * Minimum number of rows for the textarea on mobile devices.
   * @default 3
   */
  mobileMinRows?: number;
  /**
   * Additional CSS class name for custom styling.
   * @default ''
   */
  className?: string;
  /**
   * Debounce delay (in milliseconds) for the window resize event.
   * @default 100
   */
  resizeDebounceDelay?: number;
}

/**
 * A responsive textarea component that has fixed height with internal scrolling on PC,
 * and auto-adjusts height with page scrolling on mobile.
 */
const ResponsiveTextarea: React.FC<ResponsiveTextareaProps> = ({
  placeholder = "请输入内容...",
  initialValue = "",
  onChange,
  pcHeight = "150px",
  mobileMinRows = 3,
  className = "",
  resizeDebounceDelay = 100,
}) => {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handles input changes, updates internal state, and calls external onChange callback
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const isPcView = useCallback(() => {
    // 匹配 CSS 中定义的 PC 端断点 (min-width: 768px)
    // 确保这里的断点与你的 ResponsiveTextarea.module.css 中的 @media 规则一致
    return window.matchMedia("(min-width: 768px)").matches;
  }, []);

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // 只有当不是 PC 视图时，才让 JS 调整高度以实现自适应
      if (!isPcView()) {
        // <--- 关键判断
        textarea.style.height = "auto"; // 先重置，才能正确计算 scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`; // 设置为实际内容高度
      } else {
        // 如果是 PC 视图，确保移除 JS 设置的行内 height，让 CSS 接管
        textarea.style.height = ""; // 清除行内 height 样式
      }
    }
  }, [isPcView]); // 依赖项：isPcView 函数

  useEffect(() => {
    adjustTextareaHeight();
  }, [value, adjustTextareaHeight]);

  useEffect(() => {
    const debouncedAdjustHeight = debounce(
      adjustTextareaHeight,
      resizeDebounceDelay
    );

    window.addEventListener("resize", debouncedAdjustHeight);

    // 监听匹配媒体查询的变化，当从移动端切换到PC端或反之时立即调整
    const mediaQueryList = window.matchMedia("(min-width: 768px)");
    const handleMediaQueryChange = () => {
      debouncedAdjustHeight();
    };
    mediaQueryList.addEventListener("change", handleMediaQueryChange);

    return () => {
      window.removeEventListener("resize", debouncedAdjustHeight);
      mediaQueryList.removeEventListener("change", handleMediaQueryChange); // 清理
    };
  }, [adjustTextareaHeight, resizeDebounceDelay]);

  return (
    <textarea
      ref={textareaRef}
      // Combine internal CSS Modules class name with external class name
      className={`${styles.responsiveTextarea} ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      rows={mobileMinRows} // `rows` attribute serves as an HTML hint, actual height controlled by JS/CSS
    />
  );
};

export default ResponsiveTextarea;
