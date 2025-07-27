module.exports = function override(config, env) {
  // New config, e.g. config.plugins.push...
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    util: false,
    path: false,
    os: false,
    crypto: false,
    net: false,
    dns: false,
    tls: false,
    stream: false,
    url: false,
    buffer: false,
  };
  return config;
}
