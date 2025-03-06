import 'dotenv/config';
import { Worker } from 'bullmq';
import { createClient } from '@supabase/supabase-js';
import { transcribeAudio } from './lib/transcribe';

interface AudioJob {
  userId: string;
  audioData: string;
}

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

const worker = new Worker<AudioJob>(
  'audio-processing',
  async (job) => {
    console.log(`Processing job ${job.id}`);
    const { userId, audioData } = job.data;

    try {
      const transcription = await transcribeAudio(audioData);

      // Store the transcription in Supabase
      // await supabase.from('transcriptions').insert({
      //   user_id: userId,
      //   text: transcription,
      //   job_id: job.id,
      // });

      console.log('Transcription:', transcription);

      // this is where we would run the transcript cleanup prompt
      // const agentsmithClient = new AgentsmithClient({
      //   apiKey: process.env.AGENTSMITH_API_KEY || '',
      // });

      // const result = await agentsmithClient.execute({
      //   prompt: 'transcript-cleanup',
      //   variables: {
      //     transcription,
      //   },
      // });

      // then we would run the other prompts, tbd

      return { processed: true };
    } catch (error) {
      console.error('Job failed:', error);
      throw error;
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    },
  }
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});

export default worker;
