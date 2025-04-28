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

      const apiKey = 'sdk_**';

      const transcriptionCleanupPromptVersionUuid =
        'c2773430-7c7f-4559-84e5-4dfe61785552';

      const claimExtractionPromptVersionUuid =
        'e9082140-a74e-4724-9cb0-5e811d71c6bb';

      const supportingCitationsSearchPromptVersionUuid =
        '3237e107-d220-4eb0-9080-95987473a4c5';

      const outlineFormerPromptVersionUuid =
        '03a3d5d0-12b2-4934-9536-2a360e3bb3c8';

      const cleanupCompileResponse = await fetch(
        `http://localhost:3000/api/v1/promptVersion/${transcriptionCleanupPromptVersionUuid}/compile`,
        {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
          },
          body: JSON.stringify({
            variables: {
              transcription,
              language: 'English',
            },
          }),
        }
      );

      if (!cleanupCompileResponse.ok) {
        console.error('Failed to compile prompt!');
        const responseJson = await cleanupCompileResponse.json();
        console.error('Response:', responseJson);
        throw new Error('Failed to compile prompt!');
      }

      const cleanupCompileData: any = await cleanupCompileResponse.json();

      console.log(
        'Cleanup compile response:',
        JSON.stringify(cleanupCompileData, null, 2)
      );

      const cleanupResponse = await fetch(
        `http://localhost:3000/api/v1/promptVersion/${transcriptionCleanupPromptVersionUuid}/execute`,
        {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
          },
          body: JSON.stringify({
            variables: {
              transcription,
              language: 'English',
            },
          }),
        }
      );

      if (!cleanupResponse.ok) {
        console.error('Failed to execute prompt!');
        const responseJson = await cleanupResponse.json();
        console.error('Response:', responseJson);
        throw new Error('Failed to execute prompt!');
      }

      const cleanupData: any = await cleanupResponse.json();

      console.log('Cleanup response:', JSON.stringify(cleanupData, null, 2));

      const cleanedTranscript =
        cleanupData.completion.choices[0].message.content;

      const claimResponse = await fetch(
        `http://localhost:3000/api/v1/promptVersion/${claimExtractionPromptVersionUuid}/execute`,
        {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
          },
          body: JSON.stringify({
            variables: {
              transcript: cleanedTranscript,
            },
          }),
        }
      );

      if (!claimResponse.ok) {
        console.error('Failed to execute prompt!');
        const responseJson = await claimResponse.json();
        console.error('Response:', responseJson);
        throw new Error('Failed to execute prompt!');
      }

      const claimData: any = await claimResponse.json();

      console.log('Claim response:', JSON.stringify(claimData, null, 2));

      const claims = claimData.completion.choices[0].message.content;

      const supportingCitationsResponse = await fetch(
        `http://localhost:3000/api/v1/promptVersion/${supportingCitationsSearchPromptVersionUuid}/execute`,
        {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
          },
          body: JSON.stringify({
            variables: {
              claims: claims.split('\n'),
            },
            config: {
              plugins: [{ id: 'web', max_results: 10 }],
            },
          }),
        }
      );

      if (!supportingCitationsResponse.ok) {
        console.error('Failed to execute prompt!');
        const responseJson = await supportingCitationsResponse.json();
        console.error('Response:', responseJson);
        throw new Error('Failed to execute prompt!');
      }

      const supportingCitationsData: any =
        await supportingCitationsResponse.json();

      console.log(
        'Supporting citations response:',
        JSON.stringify(supportingCitationsData, null, 2)
      );

      const citations =
        supportingCitationsData.completion.choices[0].message.content;

      const outlineFormerResponse = await fetch(
        `http://localhost:3000/api/v1/promptVersion/${outlineFormerPromptVersionUuid}/execute`,
        {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
          },
          body: JSON.stringify({
            variables: {
              transcript: cleanedTranscript,
              citations,
            },
          }),
        }
      );

      if (!outlineFormerResponse.ok) {
        console.error('Failed to execute prompt!');
        const responseJson = await outlineFormerResponse.json();
        console.error('Response:', responseJson);
        throw new Error('Failed to execute prompt!');
      }

      const outlineFormerData: any = await outlineFormerResponse.json();

      console.log(
        'Outline former response:',
        JSON.stringify(outlineFormerData, null, 2)
      );

      const outline = outlineFormerData.completion.choices[0].message.content;

      console.log('Outline:', outline);

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
