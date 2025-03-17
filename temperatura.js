const mqtt = require('mqtt')
const protocol = 'mqtt'
const host = 'test.mosquitto.org'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `${protocol}://${host}:${port}`
const client = mqtt.connect(connectUrl, {
clientId,
clean: true,
})

const topic = 'Temp'
client.on('connect', () => {
    console.log('conectado')
    setInterval(()=>{

        const temp = (Math.random() *5 + 20).toFixed(2) // Simula em °C

        
        client.publish(topic, temp.toString(), { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    },20000)
})

