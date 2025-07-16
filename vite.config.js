import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    base: "/Simon-memory-game/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    }
})