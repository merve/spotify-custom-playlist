import ApiService, { TokenRequest } from '../../api/helpers/Sender';

/// types
import { Auth } from '../../api/models/Auth/auth.model';

const API = new ApiService();

export const getTokenReq = async (body: TokenRequest): Promise<Auth> => {
  const { data } = await API.getToken(body);
  return data;
};

export const refreshTokenReq = async (): Promise<Auth | null> => {
  const res = await API.refreshToken();
  if (res === null) return null;

  const { data } = res;
  const auth: Auth = data;
  return auth;
};
