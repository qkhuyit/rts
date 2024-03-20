// @ts-ignore
/* eslint-disable */
import { request, type RequestOptions } from '@/utils/request';

/** Get group list GET /api/v1/groups */
export async function groupList(
    params: API.GroupParams,
    options?: RequestOptions,
) {
    return request<API.GroupPagedEntity>('/api/v1/groups', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
