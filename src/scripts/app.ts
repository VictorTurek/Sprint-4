
const apiUrl: string = "https://icanhazdadjoke.com/";

const requestOptions = {
    method: "GET",
    headers: {
        "Accept": "application/json", // Especifica el formato de respuesta que deseas (JSON en este caso)
    },
};

document.addEventListener("DOMContentLoaded", () => { // Al cargarse completamente la pagina, se ejecuta la funcion randomJoke()
    //console.log("La página se ha cargado completamente.");
    randomJoke();
});

function randomJoke() {
    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            const joke = data.joke;
            let randomJokes: HTMLElement | null = document.getElementById("randomJokes")!;
            randomJokes.innerText = joke;
            //console.log(joke);
        })
        .catch(error => {
            console.error("Error al obtener el chiste:", error); 
            let randomJokes: HTMLElement | null = document.getElementById("randomJokes")!;
            randomJokes.innerText = `Error al cargar el chiste. Detalles: ${error.message}`;
        });
}