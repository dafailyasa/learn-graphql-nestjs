import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    if (!(await this.getUserInfo(ctx.getContext().req))) {
      return false;
    }
    return true;
  }

  async getUserInfo(req: Request): Promise<boolean> {
    if (!req?.headers?.authorization) {
      throw new ForbiddenException('Invalid login! please login again');
    }
    try {
      const payload =
        '{"query":"query {getUserInfo {_id email username role}}"}';
      const user = await axios.post('http://localhost:3000/graphql', payload, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${req.headers.authorization}`,
        },
      });
      req.user = {
        _id: user.data.data.getUserInfo._id,
        username: user.data.data.getUserInfo.username,
        email: user.data.data.getUserInfo.email,
        role: user.data.data.getUserInfo.role,
      };
      return true;
    } catch (error) {
      throw error;
    }
  }
}
