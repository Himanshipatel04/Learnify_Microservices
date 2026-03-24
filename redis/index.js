import { Redis } from '@upstash/redis';
import { MongoClient } from 'mongodb';
import express from 'express';

// ── Clients ───────────────────────────────────────────────────────────────────

const redis = new Redis({
  url: 'https://eternal-spider-74072.upstash.io',
  token: 'gQAAAAAAASFYAAIncDIzZDFmZDZlZmU4MWM0NjA3YWNkNzA0ZDBmY2NiZWEwYnAyNzQwNzI'
})

const mongo = new MongoClient('mongodb+srv://himanshipatel0409:himanshi@cluster0.gozbdan.mongodb.net/');

// ── Middleware ────────────────────────────────────────────────────────────────

function latencyMiddleware(req, res, next) {
    const start = performance.now();
    res.on('finish', () => {
        const ms = (performance.now() - start).toFixed(2);
        const color = ms < 50 ? '\x1b[32m' : ms < 200 ? '\x1b[33m' : '\x1b[31m';
        console.log(`${color}${req.method} ${req.path} → ${res.statusCode} [${ms}ms]\x1b[0m`);
    });
    next();
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function bench(label, fn, runs = 50) {
    const start = performance.now();
    for (let i = 0; i < runs; i++) await fn();
    const ms = ((performance.now() - start) / runs).toFixed(2);
    return `${ms}ms`;
}

// ── Routes ────────────────────────────────────────────────────────────────────

async function setupRoutes(app) {
    const db = mongo.db('mydb');
    const users = db.collection('users');

    // Seed
    await users.updateOne(
        { _id: '4' },
        { $setOnInsert: { _id: '4', name: 'Alice', age: 30 } },
        { upsert: true }
    );

    // GET /user/:id — cache-aside (Redis → MongoDB)
    app.get('/user/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const cached = await redis.get(`user:${id}`);  // Upstash auto-parses JSON ✅
            if (cached) {
                return res.json({ source: 'redis', data: cached });
            }

            const user = await users.findOne({ _id: id });
            if (!user) return res.status(404).json({ error: 'User not found' });

            await redis.set(`user:${id}`, user, { ex: 300 });  // note: lowercase 'ex' for Upstash
            return res.json({ source: 'mongodb', data: user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // GET /bench
    app.get('/bench', async (req, res) => {
        const results = {
            redis_set: await bench('redis_set', () => redis.set('bench', { name: 'Alice' })),
            redis_get: await bench('redis_get', () => redis.get('bench')),
            mongo_find: await bench('mongo_find', () => users.findOne({ _id: '1' })),
        };
        res.json({ runs: 50, results });
    });
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

async function main() {
    await mongo.connect();
    console.log('✓ MongoDB connected');

    const app = express();
    app.use(express.json());
    app.use(latencyMiddleware);

    await setupRoutes(app);

    app.listen(3000, () => console.log('✓ Server running on http://localhost:3000'));
}

main().catch(console.error);