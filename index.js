import KeyvRedis, { Keyv } from "@keyv/redis";

function reconnectStrategy(retries) {
    const delay = 1000; // 1 second
    console.log({ message: `Retrying (${retries}) connection to Redis in ${delay} milliseconds ...` });
    return delay;
}

function configure(keyvRedis) {
    const client = keyvRedis._client;
    client.removeAllListeners('error');
    client.on('error', (error) => {
        console.log({ message: 'Not emitting the error', error: error.constructor.name });
    })
}

async function run() {
    const keyvRedis = new KeyvRedis({
        socket: {
            host: "localhost",
            port: 6379,
            reconnectStrategy: reconnectStrategy,
        },
    });
    configure(keyvRedis);
    const keyv = new Keyv(keyvRedis);
    // connection to Redis happens at first use
    console.log({ set: await keyv.set("key", "value") });
    console.log({ get: await keyv.get("key") });
}

run();
