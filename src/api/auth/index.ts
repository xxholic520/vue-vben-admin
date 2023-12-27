import { defHttp } from '@/utils/http/axios';
import { LoginParams, LoginResult, TenantInfo, UserInfoResult } from './model';
import { ErrorMessageMode } from '#/axios';
import { useGlobSetting } from '@/hooks/setting';

enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  Register = '/auth/register',
  TenantList = '/auth/tenant/list',
  GetUserInfo = '/system/user/getInfo',
  GetRoutes = '/system/menu/getRouters',
}

const globalSetting = useGlobSetting();

/**
 * @description 用户登录
 */
export function login(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  params = {
    ...params,
    clientId: params.clientId || globalSetting.clientId,
    grantType: params.grantType || 'password',
  };
  return defHttp.post<LoginResult>(
    { url: Api.Login, params },
    { errorMessageMode: mode, isEncrypt: true, withToken: false },
  );
}

/**
 * @description 退出登录
 */
export function logout() {
  return defHttp.post({ url: '/auth/logout' });
}

export function getTenantList() {
  return defHttp.get<TenantInfo>({ url: Api.TenantList }, { withToken: false });
}

export function getUserInfo() {
  return defHttp.get<UserInfoResult>({ url: Api.GetUserInfo });
}
