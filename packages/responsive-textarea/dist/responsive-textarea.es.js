import { jsx as E } from "react/jsx-runtime";
import { forwardRef as L, useState as T, useRef as z, useCallback as d, useEffect as y } from "react";
const P = (a, c) => {
  let r;
  return function(...t) {
    const n = this;
    clearTimeout(r), r = setTimeout(() => a.apply(n, t), c);
  };
}, j = L(
  ({
    placeholder: a = "请输入内容...",
    initialValue: c = "",
    onChange: r,
    pcHeight: t = "150px",
    mobileMinRows: n = 3,
    className: w = "",
    resizeDebounceDelay: h = 100,
    breakpoint: i = 768,
    disabled: x = !1,
    style: p = {}
  }, o) => {
    const [f, g] = T(c), u = z(null), Y = d(
      (e) => {
        u.current = e, typeof o == "function" ? o(e) : o && (o.current = e);
      },
      [o]
    ), $ = (e) => {
      const s = e.target.value;
      g(s), r == null || r(s);
    }, m = d(() => window.matchMedia(`(min-width: ${i}px)`).matches, [i]), l = d(() => {
      const e = u.current;
      if (e)
        if (m())
          e.style.height = t, e.style.minHeight = t, e.style.overflowY = "auto", e.style.resize = "vertical";
        else {
          e.style.height = "auto";
          const s = e.style.overflowY;
          e.style.overflowY = "hidden", e.style.height = `${e.scrollHeight}px`, e.style.overflowY = s, e.style.minHeight = `calc(${n} * 1.5em + 16px + 2px)`, e.style.overflowY = "hidden", e.style.resize = "none";
        }
    }, [m, t, n]);
    return y(() => {
      l();
    }, [f, l]), y(() => {
      const e = P(
        l,
        h
      );
      window.addEventListener("resize", e);
      const s = window.matchMedia(`(min-width: ${i}px)`), v = () => e();
      return s.addEventListener("change", v), l(), () => {
        window.removeEventListener("resize", e), s.removeEventListener("change", v);
      };
    }, [l, h, i]), y(() => {
      const e = u.current;
      e && (e.style.setProperty("--rt-pc-height", t), e.style.setProperty("--rt-mobile-min-rows", `${n}`), e.style.setProperty("--rt-breakpoint", `${i}px`));
    }, [t, n, i]), /* @__PURE__ */ E(
      "textarea",
      {
        ref: Y,
        className: w,
        placeholder: a,
        value: f,
        onChange: $,
        disabled: x,
        style: {
          // Base inline styles for consistent behavior
          width: "100%",
          boxSizing: "border-box",
          lineHeight: "1.5",
          // Crucial for scrollHeight consistency
          // Merge external style prop last to allow it to override internal styles
          ...p
        }
      }
    );
  }
);
j.displayName = "ResponsiveTextarea";
export {
  j as ResponsiveTextarea
};
