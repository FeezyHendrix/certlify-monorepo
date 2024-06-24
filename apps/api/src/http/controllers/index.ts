import { merge } from 'lodash';
import * as authControllers from './auth/auth.controller';
import * as miscControllers from './misc/misc.controller';
import * as userControllers from './user/user.controller';
import { ControllerPlugin } from '../../internal/http';

export const controllers = Object.values(
  merge(authControllers, miscControllers, userControllers)
) as unknown[] as ControllerPlugin[];
