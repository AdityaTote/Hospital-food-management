import app from "./app";
import { connectDb } from "./db";
import { port } from "./constant";


connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
     });
  }).catch((err) => {
    console.log(err);
  });