const express = require('express');
const app = express();



const PORT = 5000;

// Ek basic test route banana
app.get('/', (req, res) => {
  res.send('<h1>Hello Muskan! Backend is running... 🚀</h1>');
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});