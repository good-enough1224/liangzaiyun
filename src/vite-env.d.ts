/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VUE_DEV_TOOLS_PATH: string;
  // 更多环境变量...
  //   readonly VITE_API_URL: string;
}


interface ImportMeta {
  readonly env: ImportMetaEnv;
}

