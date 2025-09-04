import { defineConfig } from 'tsup' // 使用 defineConfig 有类型提示！

export default defineConfig({
  entry: ["src/*.ts"],
  format: ["cjs", "esm"],
  dts: true,
  // splitting: true,
  splitting: false,
  clean: true,
  outDir: "dist",
  sourcemap: "inline",
  cjsInterop: true,
})

