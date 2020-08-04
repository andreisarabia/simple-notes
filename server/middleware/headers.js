const defaultHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'deny',
  'X-XSS-Protection': '1; mode=block',
};

module.exports = isProduction => {
  let headers;

  if (isProduction) {
    headers = defaultHeaders;
  } else {
    headers = {
      ...defaultHeaders,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'content-type',
    };
  }

  return async (ctx, next) => {
    ctx.set(headers);

    await next();
  };
};
