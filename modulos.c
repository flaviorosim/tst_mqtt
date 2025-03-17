#include <emscripten/emscripten.h>
#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <complex.h>
#define PI 3.14159265358979323846


int main(){return 0;}

// Função para o cálculo da média do vetor
double calculate_average(double* val, int size) {
    if (size <= 0) {
        return 0; 
    }

    double sum = 0.0;
    for (int i = 0; i < size; i++) {
        sum += val[i];
    }

    return sum / size;
}

// Ajusta luminosidade do LED com base na luminosidade do ambiente
double led_control(double* lum, int size) {
   
    double avg = calculate_average(lum, size);

    // LED ajustado para respectiva faixa de luminosidade média do ambiente em lux
    if(avg >= 0 && avg <= 50) return 0.9;
    else if (avg > 10 && avg <= 50) return 0.7;
    else if (avg > 50 && avg <= 200) return 0.5;
    else if (avg > 200 && avg <= 300) return 0.3;
    else if (avg > 300 && avg <= 500) return 0.1;
    else return 0;

}

// Calcula o índice de calor com base nos vetores de temperatura e de umidade
double heat_index(double* temp, int size, double* humid, int sizeu) {
    double avgTemp = calculate_average(temp,size);
    double avgHumid = calculate_average(humid, sizeu);

    double tempF = avgTemp * 1.8 + 32; // Converte de °C para °F
    double hi = 0.5 * (tempF + 61 + ((tempF - 68) * 1.2) + (avgHumid * 0.094)); // Fórmula do índice de calor

    return (hi - 32) / 1.8; // retorna para °C
}

// Faz a transformada de Fourrier com base no sinal de audio introduzido
void calculate_fft(double complex *x, int n) {

    // Caso base da recursão
    if (n <= 1) {
        return;
    }

    
    double complex even[n/2];
    double complex odd[n/2];
    for (int i = 0; i < n/2; i++) {
        even[i] = x[i * 2];
        odd[i] = x[i * 2 + 1];
    }


    calculate_fft(even, n/2);
    calculate_fft(odd, n/2);

    for (int j = 0; j < n/2; j++) {
        double complex t = cexp(-2.0 * I * PI * j / n) * odd[j];
        x[j] = even[j] + t;
        x[j + n/2] = even[j] - t;
    }

}