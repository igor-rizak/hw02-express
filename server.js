import mongoose from "mongoose";

import app from "./app.js";

// import {DB_HOST, PORT = 3000} from "config.js"

const PORT = 3000

export const DB_HOST = "mongodb+srv://igor5800r:8g7iDDVL0tytwX8R@cluster0.az4t3fd.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(()=> {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })