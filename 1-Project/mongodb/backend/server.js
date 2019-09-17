const api = require('./src/api');

const PORT = process.env.PORT || 8080;

api.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
