

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczM2Y5MWZlMDMxZTAwMTliYTE4NmIiLCJpYXQiOjE3MDIwNTE3MjksImV4cCI6MTcwMzI2MTMyOX0.Y6BgjAvcG3z3nP8lu7nDDxUVsBSM7OarwxwF-IVDPWI";

const params = new URLSearchParams(window.location.search);
const id = params.get("specificId");
const url = "https://striveschool-api.herokuapp.com/api/product/" + id;

console.log("SPECIFIC ID: ", id);


    fetch(url, { headers: { Authorization: token } })
    .then(response => {
        if (response.ok) {
            return response.json()
        }
    })
    .then(arrResponseObj => {
        const { brand, description, imageUrl, name, price, _id } = arrResponseObj

        const fullItem = document.getElementById("fullItem")
        fullItem.innerHTML = `
        <div class="card mb-3 border border-black">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${imageUrl}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title display-4 p-3 text-white">${name}</h5>
                    <p class="card-text display-5 p-3">${description}</p>
                    <p class="card-text px-3 display-4"><small class="text-body-secondary">Prezzo: ${price} $</small></p>
                    <a href="./index.html" class="btn btn-success ms-3 mt-5">Torna in HOME</a>
                    </div>
                </div>
            </div>
        </div>
        `
    })
    .catch(error => console.log(error))
