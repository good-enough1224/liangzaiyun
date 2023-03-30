import { app, session, protocol } from "electron";

const path = require("path");
const dotenv = require("dotenv");

/**
 * @desc  转发 web 的请求
 */
export const webProxy = () => {
  protocol.registerHttpProtocol("http", (request, callback) => {
      let { url } = request;
      

    const baseURL = process.env["VITE_BASE_URL"] as string;

    if ((url as string).startsWith(baseURL)) {
      url = url.replace("/api", "");
    }
    callback({ url });
  });
};

export const loadVueTools = async () => {
  // 开发环境加载 vue dev tools
  if (!app.isPackaged) {
    let vueDevToolsPath = process.env["VUE_DEV_TOOLS_PATH"];
    await session.defaultSession.loadExtension(vueDevToolsPath as string);
  }
};

export const loadDotEnv = () => {
  dotenv.config({ path: path.join(__dirname, "../.env.development") });
};
