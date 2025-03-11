import 'dotenv/config';
import fastify from 'fastify';
import multipart from '@fastify/multipart';
import staticPlugin from '@fastify/static';
import view from '@fastify/view';
import { createClient } from '@supabase/supabase-js';
import { Queue } from 'bullmq';
import { join } from 'path';

const app = fastify();

// Register view engine
app.register(view, {
  engine: {
    ejs: require('ejs'),
  },
  root: join(__dirname, '../views'),
});

// Register static file serving
app.register(staticPlugin, {
  root: join(__dirname, '../public'),
  prefix: '/static/',
});

// Register multipart for file uploads
app.register(multipart, {
  limits: {
    fileSize: 1024 * 1024 * 100, // 100MB
  },
});

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Initialize Redis connection
const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
};

// Initialize BullMQ queue
const audioQueue = new Queue('audio-processing', { connection });

// Routes
app.get('/', async (request, reply) => {
  return reply.view('index.ejs', {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  });
});

app.get('/signin', async (request, reply) => {
  return reply.view('signin.ejs', {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  });
});

app.get('/signup', async (request, reply) => {
  return reply.view('signup.ejs', {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  });
});

// Protected route for audio processing
app.post('/process-audio', async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return reply.status(401).send({ error: 'Invalid token' });
    }

    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ error: 'No file uploaded' });
    }

    const buffer = await data.toBuffer();
    const job = await audioQueue.add('process-audio', {
      userId: user.id,
      audioData: buffer.toString('base64'),
    });

    console.log('Job added to queue:', job.id);

    return { jobId: job.id };
  } catch (error) {
    console.error('Error processing audio:', error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
});

// Start the server
const start = async () => {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  try {
    await app.listen({ port });
    console.log(`Server running at http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
