const express = require('express');
const fs = require('fs'); 
const app = express();

const data = JSON.parse(fs.readFileSync('./config.retronhost.js', {encoding:'utf8', flag:'r'}));

app.get('*', (req, res) => {
  url = ""
  if (data.pages[req.originalUrl] === undefined) {
    console.log("404 "+req.originalUrl)
    url = data["404"]
  } else {
    console.log("200 "+req.originalUrl)
    url = data.pages[req.originalUrl]
  }
  content = fs.readFileSync(url, {encoding:'utf8', flag:'r'})
  res.send(content)
});

app.listen(3000, () => {
  console.log('server started');
  console.log(data)
});
