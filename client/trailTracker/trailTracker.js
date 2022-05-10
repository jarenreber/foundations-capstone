let trailTrackerAdded = document.getElementById('trailTrackerAdded')
let nameAdd = document.getElementById('nameAdd')
let trailImgAdd = document.getElementById('trailImgAdd')
let lengthAdd = document.getElementById('lengthAdd')
let descriptionAdd = document.getElementById('descriptionAdd')
let directionsAdd = document.getElementById('directionsAdd')
let cityAdd = document.getElementById('cityAdd')
let regionAdd = document.getElementById('regionAdd')
let countryAdd = document.getElementById('countryAdd')
let latAdd = document.getElementById('latAdd')
let lonAdd = document.getElementById('lonAdd')
let difficultyAdd = document.getElementById('difficultyAdd')
let trailForm = document.querySelector('#trailForm')

const trailFormSubmit = e => {
    e.preventDefault()

let body = {
    trail_name: nameAdd.value,
    trail_img: trailImgAdd.value,
    trail_length: lengthAdd.value,
    trail_description: descriptionAdd.value,
    trail_directions: directionsAdd.value,
    trail_city: cityAdd.value,
    trail_region: regionAdd.value,
    trail_country: countryAdd.value,
    trail_latitude: latAdd.value,
    trail_longitude: lonAdd.value,
    trail_difficulty: difficultyAdd.value
}

axios.post('http://localhost:4004/save-trail', body)
.then( () => {
nameAdd.value = ''
trailImgAdd.value = ''
lengthAdd.value = ''
descriptionAdd.value = ''
directionsAdd.value = ''
cityAdd.value = ''
regionAdd.value = ''
countryAdd.value = ''
latAdd.value = ''
lonAdd.value = ''
difficultyAdd.value = ''
getTrails()
}).catch(err => console.log('error on adding trail', err))
}

const getTrails = () => {
    trailTrackerAdded.innerHTML = ''
    axios.get('http://localhost:4004/trail')
    .then(res => {
        res.data.forEach(elem => {
            let trailCard = `<div class="trailCard">
            <h2>${elem.trail_name}</h2>
            <img class="trailCardSearchImg" src="${elem.trail_img}">
            <p>API ID: ${elem.trail_id_api}</p>
            <p>${elem.trail_length} miles</p>
            <p>${elem.trail_description}</p>
            <p>${elem.trail_directions}</p>
            <p>${elem.trail_city}, ${elem.trail_region}, ${elem.trail_country}</p>
            <p>Lat: ${elem.trail_latitude}, Lon: ${elem.trail_longitude}</p>
            <p>${elem.trail_difficulty}</p>
            <button id="trailDeleteButton" onclick="deleteCard(${elem['trail_id']})">Delete</button>  
            </div>`
            trailTrackerAdded.innerHTML += trailCard
        })
    }).catch(err => console.log(err))
}

const deleteCard = id => {
    axios.delete(`http://localhost:4004/trail/${id}`)
    .then(() => getTrails())
    .catch(err => console.log('error on delete card', err))
}

getTrails()
trailForm.addEventListener('submit', trailFormSubmit)