
const url = "https://striveschool-api.herokuapp.com/api/product/"
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczM2Y5MWZlMDMxZTAwMTliYTE4NmIiLCJpYXQiOjE3MDIwNTE3MjksImV4cCI6MTcwMzI2MTMyOX0.Y6BgjAvcG3z3nP8lu7nDDxUVsBSM7OarwxwF-IVDPWI"

const params = new URLSearchParams(window.location.search)
const id = params.get("specificId")

console.log("SPECIFIC ID: ", id)

