var getJSONData = function (url) {
    var result = {};
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
}


let array = "";
const btn = document.getElementById("btnBuscar");


btn.addEventListener("click", () => {
    let buscador = document.getElementById("inputBuscar").value;
    const PLANETAS_URL = "https://images-api.nasa.gov/search?q=" + buscador;
    

    getJSONData(PLANETAS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            array = resultObj.data.collection.items;
        
            imprimirTarjeta(array)
        }
        console.log(array)
    })
 })

 function imprimirTarjeta(array){
    let html = ""
    for (let i = 0; i < array.length; i++) {
        let nombre = array[i].data[0]
        let images = array[i].links[0]
        html += 
        `
        <div class="col">
            <div class="card"">
                <img src="`+images.href+`" class="card-img-top img-fluid" alt="...">
                <div class="card-body overflow-auto">
                    <h5 class="card-title">`+nombre.title+`</h5>
                    <p class="card-text">`+nombre.description+`</p>
                    <a href="#" class="btn btn-primary">`+nombre.date_created+`</a>
                </div>
            </div>
        </div>
        `
        document.getElementById("contenedor").innerHTML = html;
    }

 }