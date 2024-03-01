import express, { Express, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import connectDb from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import { initializeApp } from "firebase/app";
import {
  getStorage,
} from "firebase/storage";



const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

export { storage };

// const storageRef = ref(storage, "images/stars.jpg");

// const message4 = uri
// uploadString(storageRef, message4, "data_url").then((snapshot) => {
//   getDownloadURL(snapshot.ref).then((downloadURL) => {
//     console.log("File available at", downloadURL);
//   });
//   console.log("Uploaded a data_url string!");
// });

try {
  connectDb(process.env.MONGODB_URl as string);
} catch (err) {
  console.log(err);
}

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
