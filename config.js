const envs = {
    dev: {
        name: 'dev',
        port: 6120
    },
    prod: {
        name: 'prod',
        port: 41221
    }
};

const NODE_ENV = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLowerCase() : '';
const environment = NODE_ENV === 'prod' ? envs.prod : envs.dev;

export default environment;