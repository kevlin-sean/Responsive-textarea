import React, { useState } from "react";
// Import your ResponsiveTextarea component from the installed package name
import { ResponsiveTextarea } from "responsive-textarea";

// --- Basic CSS for the demo page (can be in App.css or inline) ---
const demoPageStyles = {
  container: {
    padding: "20px",
    maxWidth: "700px",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
  },
  section: {
    marginBottom: "30px",
    border: "1px dashed #ccc",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "20px",
    color: "#333",
  },
  textareaBaseStyle: {
    width: "100%",
    padding: "10px",
    border: "1px solid #007bff",
    borderRadius: "4px",
    fontSize: "16px",
    color: "#333",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  },
  textareaFocusStyle: {
    outline: "none",
    borderColor: "#0056b3",
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
  },
  infoText: {
    marginTop: "15px",
    fontSize: "0.9em",
    color: "#555",
  },
};

function App() {
  const [value1, setValue1] = useState(
    "这是一个响应式文本输入框的演示。\n\n在PC端，它将保持固定高度并内部滚动。\n在移动端，它将自动调整高度并与页面一起滚动。\n\n尝试输入更多内容，并改变浏览器窗口大小来观察它的行为。"
  );
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("这个是禁用状态的输入框。");

  return (
    <div style={demoPageStyles.container}>
      <h1 style={demoPageStyles.heading}>responsive-textarea Live Demo</h1>
      <p>
        A customizable React textarea component that provides fixed height with
        internal scrolling on PC, and auto-adjusts height with page scrolling on
        mobile.
      </p>

      <div style={demoPageStyles.section}>
        <h2>Default Behavior & Custom PC Height (180px)</h2>
        <ResponsiveTextarea
          placeholder="请输入内容..."
          initialValue={value1}
          onChange={setValue1}
          pcHeight="180px" // Custom PC height
          mobileMinRows={5} // Custom mobile min rows
          // Apply some basic visual styles via `style` prop
          style={demoPageStyles.textareaBaseStyle}
        />
        <p style={demoPageStyles.infoText}>
          Current content length: {value1.length}
        </p>
      </div>

      <div style={demoPageStyles.section}>
        <h2>Custom Breakpoint (992px) & Smaller PC Height (100px)</h2>
        <p>
          This textarea will switch between mobile/PC behavior at a screen width
          of <strong>992px</strong>.
        </p>
        <ResponsiveTextarea
          placeholder="尝试调整浏览器大小，并在 992px 宽度时观察变化..."
          initialValue={value2}
          onChange={setValue2}
          breakpoint={992} // Custom breakpoint
          pcHeight="100px"
          style={{
            ...demoPageStyles.textareaBaseStyle,
            borderColor: "#ffc107",
            boxShadow: "none",
          }}
        />
        <p style={demoPageStyles.infoText}>
          Content: "{value2.substring(0, 50)}..."
        </p>
      </div>

      <div style={demoPageStyles.section}>
        <h2>Disabled Textarea</h2>
        <ResponsiveTextarea
          initialValue={value3}
          disabled={true} // Disable the textarea
          pcHeight="120px"
          style={{
            ...demoPageStyles.textareaBaseStyle,
            backgroundColor: "#e9ecef",
            cursor: "not-allowed",
          }}
        />
        <p style={demoPageStyles.infoText}>
          This textarea is disabled and cannot be edited.
        </p>
      </div>
    </div>
  );
}

export default App;
