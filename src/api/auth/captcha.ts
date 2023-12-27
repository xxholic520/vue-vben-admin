import { defHttp } from '@/utils/http/axios';
import { VerifyCodeResult } from './model';

export function captchaImage() {
  return defHttp.get<VerifyCodeResult>({ url: '/auth/code' });
}
