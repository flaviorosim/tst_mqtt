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

const topic = 'Lumi';


client.on('connect', () => {
    console.log('Conectado');
    
    setInterval(() => {
        
        const lum = Math.random() * (490) + 10; // Simula em lux

        client.publish(topic, lum.toFixed(2).toString(), { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    }, 15000);
});
