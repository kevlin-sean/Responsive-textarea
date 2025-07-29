import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  CSSProperties,
} from "react";

// Debounce function to limit function call frequency
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
  breakpoint?: number;
  /**
   * Disables the textarea if set to true.
   * @default false
   */
  disabled?: boolean;
  /**
   * Inline style object for custom styling.
   * @default {}
   */
  style?: CSSProperties;
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
      breakpoint = 768,
      disabled = false,
      style = {},
    },
    ref
  ) => {
    const [value, setValue] = useState(initialValue);
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    // Combines the internal ref with the ref passed from forwardRef
    const combinedRef = useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node; // Always update internal ref

        // Update the external ref if it's provided
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
            node;
        }
      },
      [ref]
    );

    // Handles input changes, updates internal state, and calls external onChange callback
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      onChange?.(newValue); // Optional chaining for onChange
    };

    // Determines if the current view is PC based on the breakpoint
    const isPcView = useCallback(() => {
      return window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
    }, [breakpoint]);

    // Adjusts textarea height based on PC/Mobile view
    const adjustTextareaHeight = useCallback(() => {
      const textarea = internalRef.current;
      if (!textarea) return;

      if (!isPcView()) {
        // Mobile view: auto-adjust height, hide scrollbar (content scrolls with page)
        textarea.style.height = "auto"; // Reset height to get true scrollHeight
        // Temporarily hide overflowY to ensure accurate scrollHeight calculation without existing scrollbars
        const prevOverflowY = textarea.style.overflowY;
        textarea.style.overflowY = "hidden";
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.overflowY = prevOverflowY; // Restore previous overflowY

        textarea.style.minHeight = `calc(${mobileMinRows} * 1.5em + 16px + 2px)`; // Set min-height based on mobileMinRows
        textarea.style.overflowY = "hidden"; // Ensure no internal scrollbar on mobile
        textarea.style.resize = "none"; // Disable native resize on mobile
      } else {
        // PC view: fixed height, internal scroll, vertical resize enabled
        textarea.style.height = pcHeight; // Set fixed height from prop
        textarea.style.minHeight = pcHeight; // Ensure min-height is also fixed
        textarea.style.overflowY = "auto"; // Enable internal scrollbar on PC
        textarea.style.resize = "vertical"; // Allow native vertical resize on PC
      }
    }, [isPcView, pcHeight, mobileMinRows]);

    // Effect 1: Adjust height on value change or component mount
    useEffect(() => {
      adjustTextareaHeight();
    }, [value, adjustTextareaHeight]);

    // Effect 2: Add/remove resize and media query listeners
    useEffect(() => {
      const debouncedAdjustHeight = debounce(
        adjustTextareaHeight,
        resizeDebounceDelay
      );
      window.addEventListener("resize", debouncedAdjustHeight);

      const mediaQueryList = window.matchMedia(`(min-width: ${breakpoint}px)`);
      const handleMediaQueryChange = () => debouncedAdjustHeight();
      mediaQueryList.addEventListener("change", handleMediaQueryChange);

      // Initial adjustment on mount to apply correct PC/mobile styles
      adjustTextareaHeight();

      return () => {
        window.removeEventListener("resize", debouncedAdjustHeight);
        mediaQueryList.removeEventListener("change", handleMediaQueryChange);
      };
    }, [adjustTextareaHeight, resizeDebounceDelay, breakpoint]);

    // Effect 3: Set CSS variables (useful if external CSS consumes them)
    // Even though we're directly setting overflow/resize now,
    // these variables can still be used for other styling aspects if needed.
    useEffect(() => {
      const textarea = internalRef.current;
      if (textarea) {
        textarea.style.setProperty("--rt-pc-height", pcHeight);
        textarea.style.setProperty("--rt-mobile-min-rows", `${mobileMinRows}`);
        textarea.style.setProperty("--rt-breakpoint", `${breakpoint}px`);
      }
    }, [pcHeight, mobileMinRows, breakpoint]);

    return (
      <textarea
        ref={combinedRef}
        // Only apply external className. Remove internal `styles.responsiveTextarea`
        // as all its rules are now handled by inline styles or removed.
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        // Removed `rows` attribute as height is controlled by JS/CSS
        disabled={disabled}
        style={{
          // Base inline styles for consistent behavior
          width: "100%",
          boxSizing: "border-box",
          lineHeight: "1.5", // Crucial for scrollHeight consistency
          // Merge external style prop last to allow it to override internal styles
          ...style,
        }}
      />
    );
  }
);

ResponsiveTextarea.displayName = "ResponsiveTextarea";
export default ResponsiveTextarea;
