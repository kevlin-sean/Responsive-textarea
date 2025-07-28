import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path"; // Node.js 'path' module for absolute paths
import dts from "vite-plugin-dts"; // Plugin to generate TypeScript declaration files

export default defineConfig({
  plugins: [
    react(), // Vite plugin for React applications
    dts({
      insertTypesEntry: true, // Will create an entry .d.ts file for types
      // outputPath: 'dist/types', // Optional: specify output path for types (defaults to build.outDir)
    }),
  ],
  build: {
    // Configure library mode for building a component library
    lib: {
      entry: resolve(__dirname, "src/index.ts"), // Entry point for your library
      name: "ResponsiveTextarea", // Global name for UMD build (e.g., window.ResponsiveTextarea)
      formats: ["es", "cjs", "umd"], // Output formats: ES Module, CommonJS, UMD
      fileName: (format) => `responsive-textarea.${format}.js`, // Naming convention for output files
    },
    // Rollup options for fine-grained control over the build process
    rollupOptions: {
      // Ensure that 'react' and 'react-dom' are externalized (not bundled into the library)
      // They are peer dependencies and should be provided by the consuming application
      external: ["react", "react-dom"],
      output: {
        // Provide global variables for externalized dependencies in UMD build mode
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: true, // Ensures CSS is extracted into separate files for the library build
    outDir: "dist", // Output directory for the built files
  },
});
