
const url = "https://striveschool-api.herokuapp.com/api/product/"
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczM2Y5MWZlMDMxZTAwMTliYTE4NmIiLCJpYXQiOjE3MDIwNTE3MjksImV4cCI6MTcwMzI2MTMyOX0.Y6BgjAvcG3z3nP8lu7nDDxUVsBSM7OarwxwF-IVDPWI"

fetch(url, { headers: { Authorization: token } })

    .then(response => {
        if (response.ok) {
            return response.json()
        }
    })
    .then(arrResponseObj => {
        const item = document.getElementById("item");

        console.log(arrResponseObj)
        arrResponseObj.forEach(product => {
            
            const newContainer = document.createElement("div");
            newContainer.innerHTML = `
    <div class="card border border-dark h-100">
        <img src="${product.imageUrl}" class="card-img-top zoom" alt="...">
        <div class="card-body"> 
            <h5 class="card-title text-center">${product.name}</h5>
            <hr>
            <div>
                <a href="./details.html?specificId=${product._id}" class="btn btn-primary">Scopri di più</a>
                <hr>
                <a class="btn btn-warning" href="./backoffice.html?specificId=${product._id}">Modifica</a>
            </div>
        </div>
    </div>`

        
        item.appendChild(newContainer);
        });
    })
    .catch(error => console.log(error))
