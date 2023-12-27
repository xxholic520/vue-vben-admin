import { defHttp } from '@/utils/http/axios';
import { PostVO, PostForm, PostQuery, PostListGetResultModel } from '@/api/system/post/types';

/**
 * 查询岗位信息列表
 * @param query
 * @returns {*}
 */
export function getPostList(query?: PostQuery) {
  return defHttp.get<PostListGetResultModel>({ url: '/system/post/list', params: query });
}

/**
 * 查询岗位信息详细
 * @param postId
 */
export function getPostById(postId: string | number) {
  return defHttp.get<PostVO>({ url: '/system/post/' + postId, method: 'get' });
}

/**
 * 新增岗位信息
 * @param data
 */
export function createPost(data: PostForm) {
  return defHttp.post({ url: '/system/post', data }, { successMessageMode: 'message' });
}

/**
 * 修改岗位信息
 * @param data
 */
export function updatePost(data: PostForm) {
  return defHttp.put({ url: '/system/post', data }, { successMessageMode: 'message' });
}

/**
 * 删除岗位信息
 * @param postId
 */
export function removePost(postId: string | number | Array<string | number>) {
  return defHttp.delete({ url: '/system/post/' + postId }, { successMessageMode: 'message' });
}

/**
 * 导出岗位信息
 * @param query
 */
export function exportPost(query?: PostQuery) {
  return defHttp.post<Blob>(
    {
      url: '/system/post/export',
      params: query,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    },
    { isTransformResponse: false },
  );
}
