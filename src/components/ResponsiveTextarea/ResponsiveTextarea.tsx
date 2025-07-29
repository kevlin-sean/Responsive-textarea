import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
} from "react";
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
  /**
   * Custom breakpoint (in pixels) for switching between PC and mobile layouts.
   * @default 768
   */
  breakpoint?: number; // <-- 新增 breakpoint prop
  /**
   * Disables the textarea if set to true.
   * @default false
   */
  disabled?: boolean;
}

/**
 * A responsive textarea component that has fixed height with internal scrolling on PC,
 * and auto-adjusts height with page scrolling on mobile.
 */
const ResponsiveTextarea = forwardRef<
  HTMLTextAreaElement,
  ResponsiveTextareaProps
>(
  (
    {
      placeholder = "请输入内容...",
      initialValue = "",
      onChange,
      pcHeight = "150px",
      mobileMinRows = 3,
      className = "",
      resizeDebounceDelay = 100,
      breakpoint = 768, // <-- 使用默认值
      disabled = false,
    },
    ref // forwardRef 会将 ref 作为第二个参数传递
  ) => {
    const [value, setValue] = useState(initialValue);
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const combinedRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
            node;
        }
      },
      [ref]
    );

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    };

    // 使用 breakpoint prop 来判断是否为 PC 视图
    const isPcView = useCallback(() => {
      return window.matchMedia(`(min-width: ${breakpoint}px)`).matches; // <-- 使用 breakpoint
    }, [breakpoint]); // <-- 依赖 breakpoint

    const adjustTextareaHeight = useCallback(() => {
      const textarea = internalRef.current;
      if (textarea) {
        if (!isPcView()) {
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        } else {
          textarea.style.height = "";
        }
      }
    }, [isPcView]);

    useEffect(() => {
      adjustTextareaHeight();
    }, [value, adjustTextareaHeight]);

    useEffect(() => {
      const debouncedAdjustHeight = debounce(
        adjustTextareaHeight,
        resizeDebounceDelay
      );

      window.addEventListener("resize", debouncedAdjustHeight);

      // 监听匹配媒体查询的变化，当断点改变时，旧的监听器需要被移除，新的需要被添加
      // 这里的媒体查询字符串依赖于 breakpoint
      const mediaQueryList = window.matchMedia(`(min-width: ${breakpoint}px)`); // <-- 使用 breakpoint
      const handleMediaQueryChange = () => {
        debouncedAdjustHeight();
      };
      mediaQueryList.addEventListener("change", handleMediaQueryChange);

      return () => {
        window.removeEventListener("resize", debouncedAdjustHeight);
        mediaQueryList.removeEventListener("change", handleMediaQueryChange);
      };
    }, [adjustTextareaHeight, resizeDebounceDelay, breakpoint]); // <-- 依赖 breakpoint

    // Effect: Set CSS variables for flexible styling via props
    useEffect(() => {
      const textarea = internalRef.current;
      if (textarea) {
        textarea.style.setProperty("--rt-pc-height", pcHeight);
        textarea.style.setProperty(
          "--rt-mobile-min-rows",
          String(mobileMinRows)
        );
        // 将 breakpoint 设置为 CSS 变量，以便 CSS Modules 能够使用
        textarea.style.setProperty("--rt-breakpoint", `${breakpoint}px`); // <-- 新增 CSS 变量
      }
    }, [pcHeight, mobileMinRows, breakpoint]); // <-- 依赖 breakpoint

    return (
      <textarea
        ref={combinedRef}
        className={`${styles.responsiveTextarea} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        rows={mobileMinRows}
        disabled={disabled}
      />
    );
  }
);

ResponsiveTextarea.displayName = "ResponsiveTextarea";

export default ResponsiveTextarea;
