
const {TOPICS} = require('./const')
const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const mqtt = require('mqtt')


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
    client.subscribe([TOPICS.fromStaticToServer, TOPICS.fromCarToServer, TOPICS.fromFrontToServer], () => {})
})

client.on('message', (topic, payload) => {
    // console.log("topic: ",topic)
    // console.log("payload: ",payload.toString())
    switch (topic) {
        case TOPICS.fromCarToServer:
            client.publish(TOPICS.fromServerToFrontCar, payload.toString())
            break
        case TOPICS.fromStaticToServer:
            client.publish(TOPICS.fromServerToFrontStatic, payload.toString())
            // client.publish(TOPICS.fromServerToWheels, payload.toString())
            break
        case TOPICS.fromFrontToServer:
            client.publish(TOPICS.fromServerToWheels, payload.toString())
            break
        default:
            throw Error("Unknown topic")
    }
})




