const express = require('express'),
      formidable = require('formidable'),
      path = require('path'),
      app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('index.html')
})

app.listen(3000, '192.168.0.46', (err, stat) => {
  console.log((err? err : "server listening on 192.168.0.46:3000"));
})
+
