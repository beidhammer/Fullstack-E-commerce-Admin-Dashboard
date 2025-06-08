const app = require('./app');
const port = process.env.PORT || 3001;

// Start server
app.listen(port, () => {
  console.log(`🛠 Admin front-end running at http://localhost:${port}/login`);
});
