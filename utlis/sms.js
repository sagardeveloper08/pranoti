const https = require('https');

// Account details
const apiKey = encodeURIComponent('MzM0OTMyMzg1NTRjNDc0MzU5NTE3ODM3NzgzNzY0Nzc=	');

// Message details
const numbers = [918779742206];
const sender = encodeURIComponent('TXTLCL');
const message = encodeURIComponent('942463');

const numbersString = numbers.join(',');

// Prepare data for POST request
const data = `apikey=${apiKey}&numbers=${numbersString}&sender=${sender}&message=${message}`;

// Set options for the HTTP request
const options = {
  hostname: 'api.textlocal.in',
  path: '/send/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': data.length,
  },
};

// Send the POST request
const req = https.request(options, (res) => {
  let response = '';

  res.on('data', (chunk) => {
    response += chunk;
  });

  res.on('end', () => {
    // Process your response here
    console.log(response);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
