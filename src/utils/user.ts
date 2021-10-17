import type { UserRoles, UserType } from '../models/user';
import { use } from 'passport';

type UserDTO = {
  id: string;
  email: string;
  role: UserRoles;
  // createdAt: Date;
  // updatedAt: Date;
  profile: {
    firstName: string;
    lastName: string;
  };
};

// eslint-disable-next-line
export const prepareUserDTO = (user: UserType): UserDTO => ({
  // eslint-disable-next-line no-underscore-dangle
  id: user._id,
  email: user.email,
  role: user.role,
  profile: {
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
  },
});

export const isAdvancedRole = (user: UserType): boolean =>
  user.role === 'ADMIN' || user.role === 'MEDIC';

export const isProRole = (user: UserType): boolean => user.role === 'ADMIN';
