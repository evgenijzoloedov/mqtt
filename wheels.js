const mqtt = require('mqtt')
const {TOPICS} = require('./const')
const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`


const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000,
})


client.on('connect', () => {
    client.subscribe([TOPICS.fromServerToWheels], () => {
    })
})

client.on('message', (topic, payload) => {
    console.log('Payload: ', payload.toString())
})
