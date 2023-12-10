
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
        subtitle.innerText = "- Crea Item";
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

                if (response.status === 404) throw new Error("Errore, risorsa non trovata")
                if (response.status >= 400 && response.status < 500) throw new Error("Errore lato Client")
                if (response.status >= 500 && response.status < 600) throw new Error("Errore lato Server")
                if (!response.ok) throw new Error("Errore nel reperimento dei dati")
                return response.json()
            }
            console.log(response)
        })
        .then(createdItem => {

            if (specificId) {
                showAlert("Item con id: " + createdItem._id + " modificato corettamente.")
            } else {
                showAlert("Item con id: " + createdItem._id + " creato con successo")
                form.reset()
            }
        })
}

const showAlert = (message, color = "success") => {
    const box = document.getElementById("alert-box")
    box.innerHTML = `<div class="alert alert-${color}" role="alert">${message}</div>`

    setTimeout(() => {
        alertBox.innerHTML = ""
    }, 3500)
}

const deleteItem = () => {
    const hasConfirmed = confirm("Sei sicuro di voler eliminare questo item?")
    if (hasConfirmed) {
        fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: token
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then(deletedItem => {
            showAlert ("Hai eliminato questo l'item " + deletedItem.name + "!")
            setTimeout(() => { window.location.assign("index.html") }, 2000)
        })
    }
}

