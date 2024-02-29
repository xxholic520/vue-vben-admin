// 授权类型
type GrantType = 'password' | 'sms' | 'social' | 'email' | 'xcx';

export interface LoginParams {
  tenantId?: string;
  username?: string;
  password?: string;
  rememberMe?: boolean;
  socialCode?: string;
  socialState?: string;
  source?: string;
  code?: string;
  uuid?: string;
  clientId?: string;
  grantType?: GrantType;
}

export interface LoginResult {
  access_token: string;
}

// 租户信息
export interface TenantVO {
  companyName: string;
  domain: any;
  tenantId: string;
}

export interface TenantInfo {
  tenantEnabled: boolean;
  voList: TenantVO[];
}

export interface VerifyCodeResult {
  captchaEnabled: boolean;
  uuid?: string;
  img?: string;
}

export interface UserInfo {
  userId: string | number;
  userName: string;
  nickName: string;
  avatar?: string;
  createTime: string;
  remark?: string;
  homePath?: string;
}

/**
 * @param roles 角色列表
 * @param user 用户信息
 * @param permissions 权限列表
 */
export interface UserInfoResult {
  roles: string[];
  user: UserInfo;
  permissions: string[];
}
