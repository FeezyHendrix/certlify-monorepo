import { routePrefix } from '../../../utils/route-prefix';
import { get, SuccessResponse } from '../../../internal/http';
import { getUserById } from '../../../services/user/user.service';
import { authPreHandler } from '../../pre-handlers/auth.handler';
import httpStatus from 'http-status';
import { omit } from 'lodash';

const userRoute = routePrefix('user');

export const getUserController = get(
  userRoute(),
  { preHandler: [authPreHandler] },
  async (_ctx, request, reply) => {
    const user = await getUserById((request as any).claim.id);

    reply
      .status(httpStatus.OK)
      .send(new SuccessResponse({ data: omit(user, ['password']) }));
  }
);
