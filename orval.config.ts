import { defineConfig } from "orval"
import { API_BASE_URL } from "./src/constants/config"

export default defineConfig({
    "api": {
        input: API_BASE_URL + "/docs",
        output: {
            target: "./src/shared/api/api.ts",
            client: "fetch"
        }
    }
})
 