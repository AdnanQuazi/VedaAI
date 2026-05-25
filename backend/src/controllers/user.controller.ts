import { successResponse } from '../utils/apiResponse';
import { User } from '../models/User.model';

export const getMe = async (req: any, res: any) => {
  const user = await User.findById(req.user.id).select('-password');
  return successResponse(res, 'User fetched successfully', user);
};
