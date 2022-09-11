declare type User = {
  _id: string;
  username: string;
  email: string;
  role: boolean;
};
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Express {
  export interface Request {
    user?: User;
  }
}
