import { Router } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
const router = Router();
router.get("/", (req, res) => {
    res.send("Hello World!");
});
export default router;
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
router.route("/generate").post(async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            throw new Error("Prompt is required");
        }
        const aiResponse = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "512x512",
            response_format: "b64_json",
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
    }
    catch (error) {
        console.error(error);
        if ((error = "Prompt is required")) {
            return res.status(400).send("Prompt is required");
        }
        res
            .status(500)
            .send(error?.response.data.error.message || "Something went wrong");
    }
});
//# sourceMappingURL=dalleRoutes.js.map