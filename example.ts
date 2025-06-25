import { AgentsmithClient } from '@agentsmith/sdk';
import { Agency } from './agentsmith/agentsmith.types';

const client = new AgentsmithClient<Agency>(
  process.env.AGENTSMITH_API_KEY || '',
  'c2c63d0a-5225-4c86-97a5-66549ccaaddf'
);

const main = async () => {
  try {
    const prompt = await client.getPrompt('hello-world@0.1.1');

    const { completion } = await prompt.execute({
      firstName: 'John',
      lastName: 'Doe',
    });

    console.log('completion', JSON.stringify(completion, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
