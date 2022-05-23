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

let time=0
const direction = ['up', 'down', 'left', 'right']

function getRandomFromArray(array=[]){
    return array[Math.floor(Math.random()*array.length)]
}


client.on('connect', () => {
    setInterval(()=>{
        time+=1
        client.publish(TOPICS.fromFrontToServer,`${getRandomFromArray(direction)}`)
    },1000)
})

