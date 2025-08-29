export type User = {
  id: string;
  email: string;
  createdAt: Date;
  emailVerified: boolean;
  lastName: string;
  firstName: string;
  profile: {
    type: string;
    id: string;
    email: string;
    imgProfile: string;
  };
};
