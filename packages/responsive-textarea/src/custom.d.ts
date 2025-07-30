/**
 * @file custom.d.ts
 * @description TypeScript declaration file for CSS Modules.
 */
// ResponsiveTextarea.module.css"; // Import CSS Modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
