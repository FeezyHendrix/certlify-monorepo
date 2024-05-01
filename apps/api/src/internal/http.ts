import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from 'fastify';
import { PartialInstantiable } from '../utils/partial-instantiable';

export type RouterFastifyCtx<T = Record<string, any>> = FastifyInstance & T;

export type RouteFactoryHandler = (
  ctx: RouterFastifyCtx,
  request: FastifyRequest & Record<string, any>,
  reply: FastifyReply
) => void;

export type RouteFactoryPreHandler = (
  ctx: RouterFastifyCtx,
  request: FastifyRequest & Record<string, any>,
  reply: FastifyReply,
  done: (err?: any) => void
) => void;

export type RouteFactoryOptions = Omit<RouteOptions, 'handler'> & {
  handler: RouteFactoryHandler;
};

export type RouteFnArgument = [string, RouteOptions, RouteFactoryHandler];

export type ControllerPlugin = (
  ctx: FastifyInstance,
  opt: FastifyPluginOptions,
  done: (err?: any) => void
) => void;

export function route(opt: RouteFactoryOptions): FastifyPluginCallback {
  return (fastify, _, done) => {
    const { handler } = opt;

    fastify.route({
      ...opt,
      handler: (request, reply) => handler(fastify, request, reply),
    });
    done();
  };
}

export function parseRouteFactoryArgs(...args: unknown[]): RouteFnArgument {
  if (args[3] == null && args.length == 2) {
    return <RouteFnArgument>[args[0], null, args[1]];
  }
  return <RouteFnArgument>args;
}

export function get(
  path: string,
  handler: RouteFactoryHandler
): ControllerPlugin;
export function get(
  path: string,
  opt: Partial<RouteOptions>,
  handler: RouteFactoryHandler
): ControllerPlugin;
export function get(...args: unknown[]) {
  const [path, opt, handler] = parseRouteFactoryArgs(...args);

  return route({ ...opt, method: 'GET', url: path, handler });
}

export function post(
  path: string,
  handler: RouteFactoryHandler
): ControllerPlugin;
export function post(
  path: string,
  opt: Partial<RouteOptions>,
  handler: RouteFactoryHandler
): ControllerPlugin;
export function post(...args: unknown[]) {
  const [path, opt, handler] = parseRouteFactoryArgs(...args);

  return route({ ...opt, method: 'POST', url: path, handler });
}

export function patch(
  path: string,
  handler: RouteFactoryHandler
): ControllerPlugin;
export function patch(
  path: string,
  opt: Partial<RouteOptions>,
  handler: RouteFactoryHandler
): ControllerPlugin;
export function patch(...args: unknown[]) {
  const [path, opt, handler] = parseRouteFactoryArgs(...args);

  return route({ ...opt, method: 'PATCH', url: path, handler });
}

export function put(
  path: string,
  handler: RouteFactoryHandler
): ControllerPlugin;
export function put(
  path: string,
  opt: Partial<RouteOptions>,
  handler: RouteFactoryHandler
): ControllerPlugin;
export function put(...args: unknown[]) {
  const [path, opt, handler] = parseRouteFactoryArgs(...args);

  return route({ ...opt, method: 'PUT', url: path, handler });
}

export function del(
  path: string,
  handler: RouteFactoryHandler
): ControllerPlugin;
export function del(
  path: string,
  opt: Partial<RouteOptions>,
  handler: RouteFactoryHandler
): ControllerPlugin;
export function del(...args: unknown[]) {
  const [path, opt, handler] = parseRouteFactoryArgs(...args);

  return route({ ...opt, method: 'DELETE', url: path, handler });
}

export class SuccessResponse<
  T = Record<any, string>
> extends PartialInstantiable<SuccessResponse<T>> {
  message: string;
  data: T;

  constructor(props?: Partial<SuccessResponse<T>>) {
    super(props);

    if (this.message == null) {
      this.message = 'success';
    }
  }
}
