const express = require("express");
const app = express();
const port = 3123;
app.get('/posts', (req, res)=> res.send('Some posts'));

app.listen(port, ()=> console.log(`listening on ${port}`));

module.export = app;

