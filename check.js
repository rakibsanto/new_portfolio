const http = require('http');
http.get('http://localhost:8000/index.html', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log("HTML length:", data.length);
  });
});
