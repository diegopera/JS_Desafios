console.log('Se cargo bien el archivo JS');
let suma = 'Sumar';
let resta = 'Restar';
let multi = 'Multiplicar';
let divi = 'Dividir';
let resultado;
let numberOne = parseInt(prompt('Ingresa el primer número de la operación'));
console.log(numberOne);
if (isNaN(numberOne)) {
    alert('Pone un número mostro')
    process.exit(1);
}
let numberTwo = parseInt(prompt('Ingresa el segundo número de la operación'));
console.log(numberTwo);
if (isNaN(numberTwo)) {
    alert('Pone un número mostro');
    process.exit(1);
}
let operacion = prompt('Que operación queres hacer? Sumar, Restar, Multiplicar o Dividir?');

if ((operacion == 'Sumar') || (operacion == 'sumar')) {
    resultado = numberOne + numberTwo;
    alert('El resultado de la Suma del primero mas el segundo es de: ' + resultado);
    for(let i= numberOne; i<= resultado; i++) {
        alert("Contemos desde " + numberOne + " y hasta " + resultado + " yendo de uno en uno: " + i)
    }
}
else if ((operacion == 'Restar') || (operacion == 'restar')) {
    resultado = numberOne - numberTwo;
    alert('El resultado de la Resta del primero menos el segundo es de: ' + resultado);
}
else if ((operacion == 'Multiplicar') || (operacion == 'multiplicar')) {
    resultado = numberOne * numberTwo;
    alert('El resultado de Multiplicar el primero por el segundo es de: ' + resultado);
    for(let i= numberOne; i<= resultado; i+= numberOne) {
        alert("Podemos hacer sumas consecutivas desde " + numberOne + " y hasta " + resultado + " : " + i)
    }
}
else if (((operacion == 'Dividir') || (operacion == 'dividir')) && (numberTwo != 0)) {
    resultado = numberOne / numberTwo;
    alert('El resultado de Dividir el primero dividido el segundo es de: ' + resultado)
}
else if (numberTwo == 0) {
    alert('No se puede dividir por Cero!')
}
else {
    alert('Elegí una opción Valida entre Sumar, Restar, Multiplicar o Dividir')
}