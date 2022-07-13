import ApiService from '../../api/helpers/Sender';

/// types
import { Mock } from '../../api/models/Mock/mock.model';

const API = new ApiService();

export const getMockData = async ({ id }: { id?: string }): Promise<Mock> => {
  const { data }: { data: Mock } = await API.get(`${id}`);

  return data;
};
