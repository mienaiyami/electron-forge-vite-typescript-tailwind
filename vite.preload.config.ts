import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
    build: {
        rollupOptions: {
            input: "src/electron/preload.ts",
            // add package here if get deps error
            // external: ["ytdl-core", "fluent-ffmpeg", "ffmpeg-static"],
        },
        modulePreload: {
            polyfill: false,
        },
        minify: "esbuild",
        target: "esnext",
    },
});
