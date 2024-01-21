import mongoose from "mongoose";
import app from "./app.js";

const {DB_HOST, PORT = 3000} = process.env;

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

// npm run start:dev
  
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWQxMGE0NWIxZTNmYzI2ZjZmZjMxNyIsImlhdCI6MTcwNTg0MDg5NiwiZXhwIjoxNzA1OTIzNjk2fQ.WrAAXjufcpI9yc9Ku3AH_pq4u6OOYW9P3FG2Z8HMndI"
// }