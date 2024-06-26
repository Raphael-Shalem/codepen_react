import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import react from '@vitejs/plugin-react'

export default defineConfig({
  // base: "https://www.yisumatica.org.il/competition5/",
  plugins: [react(), tsconfigPaths() ],
})
