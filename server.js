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
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWQxNjkwNjhiMWMwM2U3ODVmNzVhYyIsImlhdCI6MTcwNTg0MjMzOCwiZXhwIjoxNzA1OTI1MTM4fQ.N-vE1xj6QmJyT4C1ocQEkfE42BkOFgq3_RJ28lXKdZw"
// }