if (!process.env.TOKEN) throw new Error('Set your token as an environment variable before running tests: TOKEN=<YOUR TOKEN> npm test')

module.exports = exports = {
  token: process.env.TOKEN,
  target: process.env.TARGET || 'ahrefs.com'
};
