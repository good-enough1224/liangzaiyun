// src/axios.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface MyResponseType<T = any> {
  code: number;
  message: string;
  data: T;
}

//使用create方法创建axios实例
const instance = axios.create({
  timeout: 5000, // 请求超时时间
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // token 验证
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    const responseCode = response.status;
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (responseCode === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    console.log("Response: error", error);
    const msg = error.Message !== undefined ? error.Message : "";
    // alert(msg)
    return Promise.reject(error);
  }
);

const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<MyResponseType<T>> => {
  try {
    const { data } = await instance.request<MyResponseType<T>>(config);
    data.code === 200
      ? console.log(data.message) // 成功消息提示
      : console.error(data.message); // 失败消息提示
    return data;
  } catch (err: any) {
    const message = err.message || "请求失败";
    console.error(message); // 失败消息提示
    return {
      code: -1,
      message,
      data: null as any,
    };
  }
};

export default request;
