import express from "express";
import users from "./routes/users";
import tournament from "./routes/tournament";

import cors from "cors";
import { Request } from "express";
import {
  errorHandler,
  ResponseSuccessJson,
  toExpressHandler,
} from "./utils/express.utils";

import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";

const serviceAccount = require('./configurations/serviceAccountKey.json');


initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore();




const port = process.env.PORT || 3001;

const app = express();
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.options("*", cors() as any);

app.use("/users", users);
app.use("/tournament", tournament);



class TestController {
  static testEndpoint = async (req: Request) => {
    if (req.query.fail) throw new Error("simulated error");
    return ResponseSuccessJson({ message: "ok" });
  };
}



app.get(
  "/test",
  // ----
  toExpressHandler(TestController.testEndpoint, TestController)
);
app.use(errorHandler);

app.listen(port ,() => console.log("Server is running"));



export default app;

