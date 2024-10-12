import { Request, Response } from 'express';
import Joi from 'joi';
import { YoutubeTranscript, YoutubeTranscriptError } from 'youtube-transcript';
import { openai } from '../config/openAI';

export const summarizeYTVideo = async (req: Request, res: Response) => {
    try {
        const { videoId } = validateInput(req.body);
        console.log(videoId, 'video id');
        const captions = await YoutubeTranscript.fetchTranscript(videoId, {lang: ''});
        console.log(captions, 'captions');
        const transcript = captions.map(caption => caption.text).join(' ');
        console.log(transcript, 'transcript')

        // const response = await openai.chat.completions.create({
        //     messages: [{ role: 'user', content: `Summarize the following youtube video transcript: ${transcript}` }],
        //     model: 'gpt-3.5-turbo',
        // });

        // return response.data.choices[0].text.trim();
        return res.status(200).json({message: 'Success', summary: 'This is a summary of the video'});
    } catch (error: unknown) {
        return handleError(error, res);
    }
}

const handleError = (error: unknown, res: Response) => {
    if (error instanceof Joi.ValidationError) {
        console.log(error)
        return res.status(400).json({error: error.message});
    }

    if (error instanceof YoutubeTranscriptError) {
        console.log(error)
        return res.status(404).json({error: 'Could not find transcript for the video'});
    }

        console.log(error)
    return res.status(500).json({error: 'Internal server error'});
}

const validateInput = (input: unknown) => {
    const schema = Joi.object({
        videoId: Joi.string().length(11).required()
    });

    const {value, error} = schema.validate(input);
    if (error) {
        throw error;
    }

    return value;
}