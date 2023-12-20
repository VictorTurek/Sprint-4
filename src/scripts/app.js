"use strict";
//import { JOKE } from './types';
const apiUrl = "https://icanhazdadjoke.com/";
const requestOptions = {
    method: "GET",
    headers: {
        "Accept": "application/json", // Especifica el formato de respuesta que deseas (JSON en este caso)
    },
};
document.addEventListener("DOMContentLoaded", () => {
    //console.log("La página se ha cargado completamente.");
    randomJoke();
});
function randomJoke() {
    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
        const joke = data.joke;
        let randomJokes = document.getElementById("randomJokes");
        randomJokes.innerText = joke;
        console.log(joke);
        return joke;
    })
        .catch(error => {
        console.error("Error al obtener el chiste:", error);
        let randomJokes = document.getElementById("randomJokes");
        randomJokes.innerText = `Error al cargar el chiste. Detalles: ${error.message}`;
        throw error;
    });
}
function nextJoke() {
    getData();
    randomJoke();
}
function getData() {
    const options = document.getElementsByName("option");
    let choosenOption = null;
    let score;
    options.forEach(option => {
        if (option.checked) {
            choosenOption = option.value;
        }
    });
    if (choosenOption !== null) {
        //console.log(choosenOption);
        if (choosenOption === "option1") {
            score = 1;
            console.log("El chiste es de mal gusto");
        }
        else if (choosenOption === "option2") {
            score = 2;
            console.log("El chiste no me ha hecho reir");
        }
        else if (choosenOption === "option3") {
            score = 3;
            console.log("Me tronchooooo!");
        }
        generarFechaISO();
    }
    else {
        console.log("Ninguna opción seleccionada.");
    }
    uncheck();
}
function uncheck() {
    const options = document.getElementsByName("option");
    options.forEach(option => {
        option.checked = false;
    });
}
function generarFechaISO() {
    const fechaActual = new Date();
    const fechaISO = fechaActual.toISOString();
    console.log("Fecha en formato ISO:", fechaISO);
    //alert("Fecha en formato ISO: " + fechaISO);
    return fechaISO;
}
