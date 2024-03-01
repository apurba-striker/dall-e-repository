import { Router } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { nanoid } from "nanoid";
import sharp from "sharp";
import { storage } from "../index.js";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Post from "../mongodb/models/post.js";
const router = Router();
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
router.post("/", async (req, res) => {
    const { name, prompt, photo } = req.body;
    try {
        if (!name || !prompt || !photo) {
            throw new Error("All fields are required");
        }
        let fileName = name + ' - ' + prompt + ' - ' + nanoid(4) + ".jpg";
        const storageRef = ref(storage, `images/${fileName}`);
        const message4 = photo;
        sharp(Buffer.from(message4.split(",")[1], "base64"))
            .resize(512, 512) // width, height
            .jpeg({ quality: 90 }) // set the quality to 80
            .toBuffer()
            .then((compressedImage) => {
            uploadString(storageRef, "data:image/jpeg;base64," + compressedImage.toString("base64"), "data_url").then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    const post = new Post({
                        name,
                        prompt,
                        photo: downloadURL,
                    });
                    post.save();
                    return res.status(201).json({ success: true, post });
                });
                console.log("Uploaded a data_url string!");
            });
        });
    }
    catch (e) {
        console.log(e);
        if (e.message === "All fields are required") {
            return res.status(400).send("All fields are required");
        }
        return res.status(500).json({ success: false, message: e.message });
    }
});
export default router;
//# sourceMappingURL=postRoutes.js.map