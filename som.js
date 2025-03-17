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

const topic = 'Som';


client.on('connect', () => {
    console.log('Conectado');
    
    setInterval(() => {
        
        let samples = [];
        let sampleRate = 2048; // Taxa de amostragem
        let f = 440;
        let d = 0.01;
        for (let i = 0; i < sampleRate * d; i++) {
            let sample = Math.sin(2 * Math.PI * f * i / sampleRate);
            samples.push(sample);
        }
        const audioData = new Float64Array(samples)

        client.publish(topic, Buffer.from(audioData.buffer).toString('base64'), { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    }, 21000);
});
