import { useState, useRef, useEffect } from "react";
import ResponsiveTextarea from "./components/ResponsiveTextarea/ResponsiveTextarea"; // 注意路径，直接从组件源文件导入

function App() {
  const [message, setMessage] = useState(
    "这是默认文本，你可以尝试输入更多内容或在不同设备上调整窗口大小。\n\nPC端：高度固定，内部滚动。\n移动端：高度自适应，页面滚动。"
  );

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Responsive-textarea开发调试</h1>
      <p>在这个页面中测试组件的响应式行为、高度调整和输入功能。</p>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="dev-textarea"
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
        >
          测试输入框:
        </label>
        <ResponsiveTextarea
          ref={textareaRef}
          placeholder="开始输入..."
          initialValue={message}
          onChange={handleMessageChange}
          pcHeight="400px" // 调试时可以随意调整
          mobileMinRows={6}
          breakpoint={768}
          resizeDebounceDelay={50} // 调试时可以调整防抖延迟
        />
      </div>

      <h3>当前输入内容:</h3>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          background: "#f5f5f5",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        {message}
      </pre>

      <p style={{ marginTop: "20px", fontSize: "0.9em", color: "#666" }}>
        提示：改变浏览器窗口大小（特别是缩小到移动端尺寸）来测试响应式行为。
      </p>
    </div>
  );
}

export default App;
