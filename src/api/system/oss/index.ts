import { defHttp } from '@/utils/http/axios';
import { ContentTypeEnum } from '@/enums/httpEnum';
import { OssFile } from './types';
import { PageQuery } from '@/api/model/baseModel';

enum Api {
  root = '/resource/oss',
  ossList = '/resource/oss/list',
  ossInfo = '/resource/oss/listByIds',
  ossUpload = '/resource/oss/upload',
  ossDownload = '/resource/oss/download',
}

export function ossList(params: PageQuery) {
  return defHttp.get<OssFile[]>({ url: Api.ossList, params });
}

export function ossInfo(ossIds: (string | number)[]) {
  return defHttp.get<OssFile>({ url: Api.ossInfo + '/' + ossIds });
}

/**
 * 这里用不上了 上传接口由框架自行处理
 * @deprecated
 * @param file
 * @param successMsg
 * @returns
 */
export function ossUpload(file: any) {
  const formData = new FormData();
  formData.append('file', file);
  return defHttp.post(
    {
      url: Api.ossUpload,
      data: formData,
      headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
    },
    { successMessageMode: 'message' },
  );
}

/**
 * 下载文件  返回为二进制
 * @param ossId ossId
 * @returns
 */
export function ossDownload(ossId: string | number) {
  return defHttp.get<Blob>(
    { url: Api.ossDownload + '/' + ossId, responseType: 'blob' },
    { isTransformResponse: false },
  );
}

export function ossRemove(ossIds: (string | number)[]) {
  return defHttp.delete<void>({ url: Api.root + '/' + ossIds });
}
