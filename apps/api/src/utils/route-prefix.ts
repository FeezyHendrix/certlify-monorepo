export const routePrefix =
  (prefix = '') =>
  (path = '') => {
    let parsedPrefix = prefix;

    if (prefix[0] === '/' && prefix.length > 1) {
      parsedPrefix = prefix.replace('/', '');
    }

    let parsedPath = path;

    if (path[0] === '/' && path.length > 1) {
      parsedPath = path.replace('/', '');
    }

    let parsedRoute = `/${parsedPrefix}${
      parsedPath != '' ? `/${parsedPath}` : ''
    }`.trim();

    if (
      (prefix[0] === '/' && prefix.length === 1) ||
      (prefix === '' && path === '')
    ) {
      parsedRoute = '/';
    }

    return parsedRoute;
  };
