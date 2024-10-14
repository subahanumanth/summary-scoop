import axios from "axios";
import { Request, Response } from "express";
import Joi from "joi";
import { openai } from "../config/openAI";

export const summarizeYTVideo = async (req: Request, res: Response) => {
  try {
    const { videoUrl } = validateInput(req.body);

    let result;
    try {
      result = await axios.post(
        "https://api.kome.ai/api/tools/youtube-transcripts",
        {
          video_id: videoUrl,
          format: true,
        }
      );
    } catch (error) {
      return res.status(404).json({
        error:
          "We could not find transcript for the video. Feel free to try another video.",
      });
    }

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Summarize the following youtube video: ${result.data.transcript}`,
        },
      ],
      model: "gpt-3.5-turbo-0125",
    });
    const summary = response.choices[0].message.content ?? "No summary found";

    return res.status(200).json({
      message: "Success",
      summary: summary[0].toUpperCase() + summary.slice(1),
    });
  } catch (error: unknown) {
    return handleError(error, res);
  }
};

const handleError = (error: unknown, res: Response) => {
  if (error instanceof Joi.ValidationError) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(500).json({ error: "Internal server error" });
};

const validateInput = (input: unknown) => {
  const schema = Joi.object({
    videoUrl: Joi.string()
      .uri({ scheme: ["https"] })
      .required(),
  });

  const { value, error } = schema.validate(input);
  if (error) {
    throw error;
  }

  return value;
};
