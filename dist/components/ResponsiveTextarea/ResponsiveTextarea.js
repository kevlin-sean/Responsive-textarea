import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./ResponsiveTextarea.module.css"; // Import CSS Modules
// Simple debounce function to limit function call frequency
const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
};
/**
 * A responsive textarea component that has fixed height with internal scrolling on PC,
 * and auto-adjusts height with page scrolling on mobile.
 */
const ResponsiveTextarea = ({ placeholder = "请输入内容...", initialValue = "", onChange, pcHeight = "150px", mobileMinRows = 3, className = "", resizeDebounceDelay = 100, }) => {
    const [value, setValue] = useState(initialValue);
    const textareaRef = useRef(null);
    // Handles input changes, updates internal state, and calls external onChange callback
    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };
    // Core logic: Adjusts textarea height based on content and screen size.
    // This mainly applies to mobile for auto-sizing; PC height is fixed by CSS.
    const adjustTextareaHeight = useCallback(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            // Important: Reset height to 'auto' first to ensure correct scrollHeight calculation
            textarea.style.height = "auto";
            // Then set its height to the content's scroll height to fit content
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, []); // useCallback ensures this function reference is stable
    // Effect 1: Adjust textarea height when `value` changes (primarily for mobile auto-sizing)
    useEffect(() => {
        adjustTextareaHeight();
    }, [value, adjustTextareaHeight]); // Dependencies: value change and adjustTextareaHeight function
    // Effect 2: Listen for window resize events and recalculate height
    useEffect(() => {
        // Debounce the resize event handler to prevent excessive calls
        const debouncedAdjustHeight = debounce(adjustTextareaHeight, resizeDebounceDelay);
        window.addEventListener("resize", debouncedAdjustHeight);
        // Cleanup function: Remove event listener when component unmounts to prevent memory leaks
        return () => {
            window.removeEventListener("resize", debouncedAdjustHeight);
        };
    }, [adjustTextareaHeight, resizeDebounceDelay]); // Dependencies: function reference and debounce delay
    // Effect 3: Dynamically set CSS variables via JavaScript, allowing CSS to respond to component props
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            // Set CSS variable for PC fixed height
            textarea.style.setProperty("--rt-pc-height", pcHeight);
            // Set CSS variable for mobile minimum rows
            textarea.style.setProperty("--rt-mobile-min-rows", mobileMinRows.toString());
        }
    }, [pcHeight, mobileMinRows]); // Dependencies: PC height and mobile min rows
    return (_jsx("textarea", { ref: textareaRef, 
        // Combine internal CSS Modules class name with external class name
        className: `${styles.responsiveTextarea} ${className}`, placeholder: placeholder, value: value, onChange: handleChange, rows: mobileMinRows }));
};
export default ResponsiveTextarea;
