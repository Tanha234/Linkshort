const app = require("./index");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 LOCAL Server running on port ${PORT}`);
  console.log("📍 API routes: http://localhost:" + PORT + "/api/urls");
  console.log("📍 Redirect routes: http://localhost:" + PORT + "/:char");
});
