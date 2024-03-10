import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import axiosRetry from 'axios-retry';

const retry_count = 3;
const default_delay = 1000;

class HttpClient {
	private axiosInstance: AxiosInstance;

	constructor(baseURL: string) {
		this.axiosInstance = axios.create({
			baseURL,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// Adding Retry options to the queries
		axiosRetry(this.axiosInstance, {
			retries: retry_count,
			retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 1000),
		})

		// Interceptors can be added for global request/response handling
		this.axiosInstance.interceptors.response.use(
			this.handleSuccessResponse,
			this.handleErrorResponse
		);
	}

	private async handleSuccessResponse(response: AxiosResponse) {
		await new Promise(resolve => setTimeout(resolve, default_delay))
		return response;
	}

	private handleErrorResponse(error: any): any {
		if (error.response) {
			// The request was made and the server responded with a status code
			const status = error.response.status;

			if (status >= 500 && status < 600) {
				toast('Something Went Wrong!', {
					position: 'bottom-left',
					theme: 'light',
					type: 'error',
				});
				// window.location.href = '/error';
			}
		}

		// return Promise.reject(error);
	}

	public get<T>(url: string, config?: AxiosRequestConfig) {
		return this.axiosInstance.get<T>(url, config);
	}

	public post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
		return this.axiosInstance.post<T>(url, data, config);
	}

	public put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
		return this.axiosInstance.put<T>(url, data, config);
	}

	public delete<T>(url: string, config?: AxiosRequestConfig) {
		return this.axiosInstance.delete<T>(url, config);
	}
}

export default HttpClient;
