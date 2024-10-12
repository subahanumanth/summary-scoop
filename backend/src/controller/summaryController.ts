import { Request, Response } from 'express';
import Joi from 'joi';
import { openai } from '../config/openAI';
import axios from 'axios';

export const summarizeYTVideo = async (req: Request, res: Response) => {
    try {
        const { videoUrl } = validateInput(req.body);

        let transcriptResult;
        try {
            transcriptResult = await axios.post('https://api.kome.ai/api/tools/youtube-transcripts', {
                "video_id": videoUrl,
                "format": true
            });
        } catch (error) {
            return res.status(404).json({ error: 'Could not find transcript for the video' });
        }

        // let transcript;
        // try {
        //     const youtube = await Innertube.create({
        //         lang: 'en',
        //         location: 'US',
        //         retrieve_player: false,
        //     });
        //     const info = await youtube.getInfo(videoId);
        //     const transcriptData = await info.getTranscript();
        //     transcript = transcriptData?.transcript?.content?.body?.initial_segments.map((segment) => segment.snippet.text).join(' ');
        //     if (!transcript) {
        //         throw new Error('Could not find transcript for the video');
        //     }
        // } catch (error) {
        //     return res.status(404).json({ error: 'Could not find transcript for the video' });
        // }
        // return res.status(200).json({ message: 'Success', summary: '' });
        return res.status(200).json({ message: 'Success', summary: transcriptResult.data.transcript });

        // const captions = await YoutubeTranscript.fetchTranscript(videoId, {lang: ''});
        // console.log(captions, 'captions');
        // const transcript = captions.map(caption => caption.text).join(' ');
        // console.log(transcript, 'transcript')

        // const response = await openai.chat.completions.create({
        //     messages: [{ role: 'user', content: `Summarize the following youtube video transcript: ${transcript}` }],
        //     model: 'gpt-3.5-turbo',
        // });

        // return response.data.choices[0].text.trim();
    } catch (error: unknown) {
        return handleError(error, res);
    }
}

const handleError = (error: unknown, res: Response) => {
    if (error instanceof Joi.ValidationError) {
        return res.status(400).json({ error: error.message });
    }

        console.log(error)
    return res.status(500).json({ error: 'Internal server error' });
}

const validateInput = (input: unknown) => {
    const schema = Joi.object({
        videoUrl: Joi.string().uri({ scheme: ['https'] }).required(),
    });

    const { value, error } = schema.validate(input);
    if (error) {
        throw error;
    }

    return value;
}