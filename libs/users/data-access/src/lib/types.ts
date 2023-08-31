export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
};

export type UserItem = Pick<User, 'firstName' | 'lastName' | 'avatarUrl' | 'email'>;

export type UserFilter = { q: string, _page: number, _limit: number } | null;
