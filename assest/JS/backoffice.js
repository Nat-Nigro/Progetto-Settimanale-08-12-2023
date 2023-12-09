
const params = new URLSearchParams(window.location.search);
const id = params.get("specificId");
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczM2Y5MWZlMDMxZTAwMTliYTE4NmIiLCJpYXQiOjE3MDIwNTE3MjksImV4cCI6MTcwMzI2MTMyOX0.Y6BgjAvcG3z3nP8lu7nDDxUVsBSM7OarwxwF-IVDPWI"


const url = id ? "https://striveschool-api.herokuapp.com/api/product/" + id : "https://striveschool-api.herokuapp.com/api/product/";
console.log("url: ", url)

const method = id ? "PUT" : "POST";
console.log("method: ", method)

window.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector("button[type='submit']")
    const deleteBtn = document.querySelector("button[type='button'].btn-danger")
    const subtitle = document.getElementById("subtitle")

    if (id) {
        subtitle.innerText = "- Modica Item";
        submitBtn.classList.remove("btn-primary");
        submitBtn.classList.add("btn-success");
        submitBtn.innerText = "Modifica";
        deleteBtn.classList.remove("d-none");

        fetch(url, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(({ name, description, price, brand, imageUrl }) => {
                document.getElementById("name").value = name
                document.getElementById("description").value = description
                document.getElementById("price").value = price
                document.getElementById("imageUrl").value = imageUrl
                document.getElementById("brand").value = brand
            })
    } else {
        subtitle.innerText = "-Crea Item";
    }
})

const handleSumbit = (event) => {
    event.preventDefault()
    const form = event.target

    const newItem = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        imageUrl: document.getElementById("imageUrl").value,
        brand: document.getElementById("brand").value
    }
}

fetch(url, {
    method: method,
    body: JSON.stringify(newItem),
    headers: {
        "Content-Type": "application/json",
        Authorization: token
    }
})
.then(response => {
    if (response.ok) {
        return response.json()
    }
})
.then()

