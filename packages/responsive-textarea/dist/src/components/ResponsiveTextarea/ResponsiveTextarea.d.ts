import { default as React, CSSProperties } from 'react';

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
declare const ResponsiveTextarea: React.ForwardRefExoticComponent<ResponsiveTextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export default ResponsiveTextarea;
//# sourceMappingURL=ResponsiveTextarea.d.ts.map