async function getWeatherData(city: string): Promise<any> {
    const apiKey = "ba2e822e35590921e894b16fa293655d";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Dades meteorològiques:", data);
        return data;
    } catch (error) {
        console.error("Error al obtenir dades meteorològiques:", error);
        throw error;
    }
}

// Función para obtener el nombre del icono basado en la descripción del tiempo
function getWeatherIcon(description: string): string {
    switch (description.toLowerCase()) {
        case "clear sky":
            return "./img/weather/day.svg"; // Nombre del icono para cielo claro
        case "few clouds":
            return "./img/weather/few-clouds.svg"; // Nombre del icono para pocas nubes
        case "scattered clouds":
            return "./img/weather/cloudy.svg"; // Nombre del icono para cielo claro
        case "broken clouds":
            return "./img/weather/cloudy.svg"; // Nombre del icono para nubes dispersas, nublado o nubes rotas
        case "shower rain":
            return "./img/weather/rainy-1.svg"; // Nombre del icono para cielo claro
        case "rain":
            return "./img/weather/rainy-5.svg"; // Nombre del icono para lluvia o lluvia con chubascos
        case "thunderstorm":
            return "./img/weather/thunder.svg"; // Nombre del icono para tormenta eléctrica
        case "snow":
            return "./img/weather/snowy-5.svg"; // Nombre del icono para snow
        case "mist":
            return "./img/weather/cloudy.svg"; // Nombre del icono para mist
        default:
            return "./img/weather/weather_sunset.svg"; // Icono predeterminado para otros casos
    }
}

// Funció per mostrar les dades meteorològiques a la pantalla
function displayWeatherData(weatherData: any) {
    const weatherContainer = document.getElementById("weather-container");
    if (weatherContainer) {
        const iconPath = getWeatherIcon(weatherData.weather[0].description); // Llamar la función para obtener la ruta del icono
        weatherContainer.innerHTML = `
        <img src=${iconPath} alt="Icono del tiempo" id="weather-icon"> 
        ${Math.floor(weatherData.main.temp)} °C`;
    }
}

// Funció principal per obtenir i mostrar les dades meteorològiques
async function showWeatherData() {
    const city = "Barcelona"; // Pots canviar la ciutat segons la teva ubicació o preferència
    const weatherData = await getWeatherData(city);
    displayWeatherData(weatherData);
}

// Executa la funció de les dades meteorològiques al carregar la pàgina
document.addEventListener("DOMContentLoaded", showWeatherData);


type JOKE = {
    joke: string;
    score: number;
    date: string; // Canvia a string per emmagatzemar la data en format ISO
};
const reportAcudits: JOKE[] = [];


//Llamamos a la Api de Dad Jokes en esta URL.
const apiUrl: string = "https://icanhazdadjoke.com/";
//Llamamos a la Api de Chuck Norris Jokes en esta URL.
const chuckNorrisApiUrl = "https://api.chucknorris.io/jokes/random";

const requestOptions = {
    method: "GET",
    headers: {
        "Accept": "application/json", // Especifica el formato de respuesta que deseas (JSON en este caso)
    },
};

// Función para obtener una Dad Joke
function getDadJoke(): Promise<string> {
    return fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => data.joke);
}

// Función para obtener un Chuck Norris Joke
function getChuckNorrisJoke(): Promise<string> {
    return fetch(chuckNorrisApiUrl)
        .then(response => response.json())
        .then(data => data.value);
}

// Función para obtener alternativamente Dad Jokes y Chuck Norris Jokes
function getRandomJoke(): Promise<string> {
    const randomIndex = Math.random();
    const jokePromise = randomIndex < 0.5 ? getDadJoke() : getChuckNorrisJoke();
    return jokePromise.then(joke => {
        let randomJokes: HTMLElement | null = document.getElementById("randomJokes")!;
        randomJokes.innerText = joke;
        console.log(joke);
        return joke;
    }).catch(error => {
        console.error("Error al obtener la broma:", error);
        let randomJokes: HTMLElement | null = document.getElementById("randomJokes")!;
        randomJokes.innerText = `Error al cargar la broma. Detalles: ${error.message}`;
        throw error;
    });
}

document.addEventListener("DOMContentLoaded", () => { // Al cargarse completamente la pagina, se ejecuta la funcion randomJoke()
    //console.log("La página se ha cargado completamente.");
    getRandomJoke();
});

function nextJoke() {
    getData();
    getRandomJoke();
    changeBlobs()
}

function getData() {
    const options = document.getElementsByName("option") as NodeListOf<HTMLInputElement>;
    let choosenOption: string | null = null;
    let score: number;

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
        } else if (choosenOption === "option2") {
            score = 2
            console.log("El chiste no me ha hecho reir");
        } else if (choosenOption === "option3") {
            score = 3
            console.log("Me tronchooooo!");
        }
        generarFechaISO()

    } else {
        console.log("Ninguna opción seleccionada.");
    }

    uncheck();
}

function uncheck() {
    const options = document.getElementsByName("option") as NodeListOf<HTMLInputElement>;
    options.forEach(option => {
        option.checked = false;
    })
}

function generarFechaISO() {
    const fechaActual = new Date();
    const fechaISO = fechaActual.toISOString();

    console.log("Fecha en formato ISO:", fechaISO);
    //alert("Fecha en formato ISO: " + fechaISO);
    return fechaISO;
}

function changeBlobs() {
    const imageNames: string[] = ['1.svg', '2.svg', '3.svg', '4.svg', '5.svg', '6.svg', '7.svg', '8.svg', '9.svg', '10.svg', '11.svg', '12.svg', '13.svg', '14.svg', '15.svg', '16.svg', '17.svg', '18.svg'];

    // Generamos el blob de la izquierda.
    let randomIndexLeft: number = Math.floor(Math.random() * imageNames.length);
    const smallBlobLeft: HTMLElement | null = document.getElementById('small-blob-left');
    if (smallBlobLeft) {
        smallBlobLeft.style.backgroundImage = `url('../src/img/blob/${imageNames[randomIndexLeft]}')`;
    }

    // Generamos el blob de la derecha.
    let randomIndexRight: number = Math.floor(Math.random() * imageNames.length);
    const smallBlobRight: HTMLElement | null = document.getElementById('small-blob-right');
    if (smallBlobRight) {
        smallBlobRight.style.backgroundImage = `url('../src/img/blob/${imageNames[randomIndexRight]}')`;
    }

    // Generamos el blob central.
    let randomIndexCenter: number = Math.floor(Math.random() * imageNames.length);
    const smallBlobCenter: HTMLElement | null = document.getElementById('blob');
    if (smallBlobCenter) {
        smallBlobCenter.style.backgroundImage = `url('../src/img/blob/${imageNames[randomIndexCenter]}')`;
    }

}
