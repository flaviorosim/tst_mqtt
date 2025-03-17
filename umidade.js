const mqtt = require('mqtt');
const protocol = 'mqtt';
const host = 'test.mosquitto.org'; 
const port = '1883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `${protocol}://${host}:${port}`;
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
});


const topic = 'Umidade';




client.on('connect', () => {
    console.log('Conectado');
    setInterval(() => {

        const humid = Math.random() * (40) + 30; // Simula em %

        client.publish(topic, humid.toFixed(2).toString(), { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    }, 20000); 
});


