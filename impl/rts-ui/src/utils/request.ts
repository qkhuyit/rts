import axios, { CanceledError } from 'axios';
import { isString } from 'lodash-es';
import { message as $message, Modal } from 'ant-design-vue';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResultEnum } from '@/enums/httpEnum';
import { useUserStore } from '@/store/modules/user';
import { useSSEStore } from '@/store/modules/sse';

export interface RequestOptions extends AxiosRequestConfig {
  /** Whether to extract data directly from the response, for example, return res.data directly and ignore information such as res.code */
  isReturnResult?: boolean;
  /** The request is successful and the prompt message is */
  successMsg?: string;
  /** The request failed is a prompt message */
  errorMsg?: string;
  /** When successful, whether to display the success information returned by the backend */
  showSuccessMsg?: boolean;
  /** When failure occurs, whether to display the failure information returned by the backend */
  showErrorMsg?: boolean;
  /** The type of request header Content-Type (json <-> application/json | form <-> application/x-www-form-urlencoded) */
  requestType?: 'json' | 'form';
}

const UNKNOWN_ERROR = 'Unknown error, please try again !';

/** The path prefix of the real request */
export const baseApiUrl = import.meta.env.VITE_BASE_API_URL;


const controller = new AbortController();
const service = axios.create({
  baseURL: baseApiUrl,
  timeout: 10000,
  signal: controller.signal,
});

service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;
    if (token && config.headers) {
      // 请求头token信息，请根据实际情况进行修改
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: AxiosResponse<BaseResponse>) => {
    const res = response.data;

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== ResultEnum.SUCCESS) {
      $message.error(res.message || UNKNOWN_ERROR);
      // Illegal token
      if ([1101, 1105].includes(res.code)) {
        // to re-login
        Modal.confirm({
          title: 'Warning',
          content: res.message || 'The account is abnormal. You can cancel your stay on this page or log in again.',
          okText: 'Re-register',
          cancelText: 'Cancel',
          onOk: () => {
            localStorage.clear();
            window.location.reload();
          },
        });
      }

      // throw other
      const error = new Error(res.message || UNKNOWN_ERROR) as Error & { code: any };
      error.code = res.code;
      return Promise.reject(error);
    } else {
      const sseStore = useSSEStore();
      sseStore.setServerConnectStatus(true);
      return response;
    }
  },
  (error) => {
    if (!(error instanceof CanceledError)) {
      // Handle 422 or 500 error exception prompts
      const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
      $message.error({ content: errMsg, key: errMsg });
      error.message = errMsg;
    }
    return Promise.reject(error);
  },
);

type BaseResponse<T = any> = Omit<API.ResOp, 'data'> & {
  data: T;
};

export function request<T = any>(
  url: string,
  config: { isReturnResult: false } & RequestOptions,
): Promise<BaseResponse<T>>;
export function request<T = any>(
  url: string,
  config: RequestOptions,
): Promise<BaseResponse<T>['data']>;
export function request<T = any>(
  config: { isReturnResult: false } & RequestOptions,
): Promise<BaseResponse<T>>;
export function request<T = any>(config: RequestOptions): Promise<BaseResponse<T>['data']>;
/**
 *
 * @param url - request url
 * @param config - AxiosRequestConfig
 */
export async function request(_url: string | RequestOptions, _config: RequestOptions = {}) {
  const url = isString(_url) ? _url : _url.url;
  const config = isString(_url) ? _config : _url;
  try {
    // Compatible with from data file upload situation
    const { requestType, isReturnResult = true, ...rest } = config;

    const response = (await service.request({
      url,
      ...rest,
      headers: {
        ...rest.headers,
        ...(requestType === 'form' ? { 'Content-Type': 'multipart/form-data' } : {}),
      },
    })) as AxiosResponse<BaseResponse>;
    const { data } = response;
    const { code, message } = data || {};

    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;

    if (hasSuccess) {
      const { successMsg, showSuccessMsg } = config;
      if (successMsg) {
        $message.success(successMsg);
      } else if (showSuccessMsg && message) {
        $message.success(message);
      }
    }

    // When the page code needs to obtain code, data, message and other information, it needs to set isReturnResult to false
    if (!isReturnResult) {
      return data;
    } else {
      return data.data;
    }
  } catch (error: any) {
    return Promise.reject(error);
  }
}
