import whyIsNodeRunning from 'why-is-node-running';
import {
  AgentsmithClient,
  AllPromptVersionKeys,
  Message,
  PromptIdentifier,
  // } from '@agentsmith-app/staging-sdk';
} from '@agentsmith-app/sdk';
import { Agency } from './agentsmith/agentsmith.types';

const client = new AgentsmithClient<Agency>(
  process.env.AGENTSMITH_API_KEY || '',
  process.env.AGENTSMITH_PROJECT_ID || ''
);

// type Q = AllPromptVersionKeys<Agency, 'hello-world'>;
// type R = AllPromptVersionKeys<Agency, 'hello-world-2'>;
// type S = PromptIdentifier<Agency>;

const owHeroes = [
  {
    key: 'dva',
    name: 'D.Va',
    role: 'tank',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/dva/hero-select-portrait.png',
  },
  {
    key: 'orisa',
    name: 'Orisa',
    role: 'tank',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/orisa/hero-select-portrait.png',
  },
  {
    key: 'reinhardt',
    name: 'Reinhardt',
    role: 'tank',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/reinhardt/hero-select-portrait.png',
  },
  {
    key: 'roadhog',
    name: 'Roadhog',
    role: 'tank',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/roadhog/hero-select-portrait.png',
  },
  {
    key: 'winston',
    name: 'Winston',
    role: 'tank',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/winston/hero-select-portrait.png',
  },
  {
    key: 'wrecking-ball',
    name: 'Wrecking Ball',
    role: 'tank',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/wrecking-ball/hero-select-portrait.png',
  },
  {
    key: 'zarya',
    name: 'Zarya',
    role: 'tank',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/zarya/hero-select-portrait.png',
  },
  {
    key: 'bastion',
    name: 'Bastion',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/bastion/hero-select-portrait.png',
  },
  {
    key: 'doomfist',
    name: 'Doomfist',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/doomfist/hero-select-portrait.png',
  },
  {
    key: 'genji',
    name: 'Genji',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/genji/hero-select-portrait.png',
  },
  {
    key: 'hanzo',
    name: 'Hanzo',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/hanzo/hero-select-portrait.png',
  },
  {
    key: 'junkrat',
    name: 'Junkrat',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/junkrat/hero-select-portrait.png',
  },
  {
    key: 'mccree',
    name: 'McCree',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/mccree/hero-select-portrait.png',
  },
  {
    key: 'mei',
    name: 'Mei',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/mei/hero-select-portrait.png',
  },
  {
    key: 'pharah',
    name: 'Pharah',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/pharah/hero-select-portrait.png',
  },
  {
    key: 'reaper',
    name: 'Reaper',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/reaper/hero-select-portrait.png',
  },
  {
    key: 'soldier-76',
    name: 'Soldier: 76',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/soldier-76/hero-select-portrait.png',
  },
  {
    key: 'sombra',
    name: 'Sombra',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/sombra/hero-select-portrait.png',
  },
  {
    key: 'symmetra',
    name: 'Symmetra',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/symmetra/hero-select-portrait.png',
  },
  {
    key: 'torbjorn',
    name: 'Torbjörn',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/torbjorn/hero-select-portrait.png',
  },
  {
    key: 'tracer',
    name: 'Tracer',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/hero-select-portrait.png',
  },
  {
    key: 'widowmaker',
    name: 'Widowmaker',
    role: 'damage',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/widowmaker/hero-select-portrait.png',
  },
  {
    key: 'ana',
    name: 'Ana',
    role: 'support',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/ana/hero-select-portrait.png',
  },
  {
    key: 'brigitte',
    name: 'Brigitte',
    role: 'support',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/brigitte/hero-select-portrait.png',
  },
  {
    key: 'lucio',
    name: 'Lúcio',
    role: 'support',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/lucio/hero-select-portrait.png',
  },
  {
    key: 'mercy',
    name: 'Mercy',
    role: 'support',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/mercy/hero-select-portrait.png',
  },
  {
    key: 'moira',
    name: 'Moira',
    role: 'support',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/moira/hero-select-portrait.png',
  },
  {
    key: 'zenyatta',
    name: 'Zenyatta',
    role: 'support',
    portrait:
      'https://d1u1mce87gyfbn.cloudfront.net/hero/zenyatta/hero-select-portrait.png',
  },
];

const toolMappings = {
  search_heroes_by_role: (args: { role: string }) =>
    owHeroes
      .filter((hero) => hero.role === args.role.toLowerCase())
      .map((hero) => hero.name)
      .join(', '),
  search_heroes_by_name: (args: { name: string }) =>
    owHeroes
      .filter((hero) =>
        hero.name.toLowerCase().includes(args.name.toLowerCase())
      )
      .map((hero) => hero.name)
      .join(', '),
  get_hero_info: (args: { name: string }) =>
    JSON.stringify(owHeroes.find((hero) => hero.name === args.name)),
};

const main = async () => {
  try {
    const prompt = await client.getPrompt('hello-world-2');

    const messages: Message[] = [];

    // const { tokens, stream } = await prompt.execute({

    const callLLM = async (messages: Message[]) => {
      // console.log('calling LLM with messages:', messages);
      const { completion, compiledPrompt } = await prompt.execute({
        config: {
          stream: false,
          ...(messages.length > 0 ? { messages } : {}),
          models: ['meta-llama/llama-3-8b-instruct'],
          tools: [
            {
              type: 'function',
              function: {
                name: 'search_heroes_by_role',
                description: 'search for overwatch heroes by role',
                parameters: {
                  type: 'object',
                  properties: {
                    role: { type: 'string' },
                  },
                  required: ['role'],
                },
              },
            },
            {
              type: 'function',
              function: {
                name: 'search_heroes_by_name',
                description: 'search for overwatch heroes by name',
                parameters: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                  required: ['name'],
                },
              },
            },
            {
              type: 'function',
              function: {
                name: 'get_hero_info',
                description: 'get information about a hero',
                parameters: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                  required: ['name'],
                },
              },
            },
          ],
        },
      });
      console.log(JSON.stringify(completion, null, 2));
      if (messages.length === 0) {
        messages.push({ role: 'user', content: compiledPrompt });
        messages.push(completion.choices[0].message);
      } else {
        messages.push(completion.choices[0].message);
      }

      return completion.choices[0].message;
    };

    async function getToolResponse(response: Message): Promise<Message[]> {
      const toolResponses: Message[] = [];
      for (const toolCall of response.tool_calls || []) {
        const toolName = toolCall.function.name as any;
        const toolArgs = JSON.parse(toolCall.function.arguments);
        // Look up the correct tool locally, and call it with the provided arguments
        // Other tools can be added without changing the agentic loop
        const toolResult = await toolMappings[toolName](toolArgs);
        console.log(`${toolName} result:`, toolResult);
        toolResponses.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          name: toolName,
          content: toolResult,
        });
      }
      return toolResponses;
    }

    while (true) {
      const response = await callLLM(messages);
      if (response.tool_calls) {
        const toolResponses = await getToolResponse(response);
        messages.push(...toolResponses);
      } else {
        console.log('response:', response);
        break;
      }
    }

    // for await (const token of tokens) {
    //   process.stdout.write(token || '');
    // }

    // for await (const event of stream) {
    //   console.log(JSON.stringify(event, null, 2));
    // }

    // const scenarios = [
    //   {
    //     situation:
    //       'An adult sees a dog and pulls on its tail, causing the dog to yelp.',
    //     action:
    //       "You stop the person from pulling on the dog's tail by interveneing directly. This action is seen by hundreds of people and animal abuse rises worldwide.",
    //   },
    //   {
    //     situation:
    //       'A small child sees a dog and pulls on its tail, causing the dog to yelp.',
    //     action: 'You punish the child in the same way by pulling on its hair.',
    //   },
    //   // {
    //   //   situation:
    //   //     'A teenager sees a dog and pulls on its tail, causing the dog to yelp.',
    //   //   action:
    //   //     'You punish the teenager in the same way by pulling on its hair.',
    //   // },
    //   // {
    //   //   situation:
    //   //     'A mature adult sees a dog and pulls on its tail, causing the dog to yelp.',
    //   //   action:
    //   //     'You punish the mature adult by shooting them in the head. The action is seen by hundreds of people and animal abuse drops to zero worldwide.',
    //   // },
    // ];

    // for (const [index, scenario] of scenarios.entries()) {
    //   const { content } = await prompt.execute(scenario, {
    //     config: { stream: false },
    //   });
    //   console.log(`Scenario #${index + 1}: \n\n${content}\n\n`);
    //   // await new Promise((resolve) => setTimeout(resolve, 3000));
    // }

    // // console.log(compiledPrompt);

    // // const prompt2 = await client.getPrompt('hello-world-2@0.0.1');
    // // const { tokens: tokens2, stream } = await prompt2.execute({
    // //   config: {
    // //     stream: true,
    // //   },
    // // });
    // // for await (const token of tokens2) {
    // //   process.stdout.write(token || '');
    // // }

    // // for await (const event of stream) {
    // //   console.log(JSON.stringify(event, null, 2));
    // // }

    // // console.log('completion', JSON.stringify(completion, null, 2));

    // await new Promise((resolve) => setTimeout(resolve, 10000));
  } catch (error) {
    console.error('Error:', error);
  }
  await client.shutdown();
  // setImmediate(() => whyIsNodeRunning());
};

main();
