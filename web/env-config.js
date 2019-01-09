const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.API_URL': prod
    ? 'https://x6qc7fuiua.execute-api.sa-east-1.amazonaws.com/prod/'
    : 'http://localhost:4000'
};
