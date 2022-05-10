const randomTrailCard = document.querySelector('#randomTrailCard')

const southWestUtah = [286932,
    272939,
    273226,
    273053,
    273407,
    285116,
    285295,
    285656,
    273506,
    273625,
    286946,
    283592,
    280524,
    275360,
    273775,
    275134,
    282438,
    608950,
    275133,
    287979,
    285021,
    286944,
    273405,
    285657,
    275362,
    275361,
    280293,
    285707,
    284097,
    272946,
    287976,
    280525,
    285655,
    275363,
    278202,
    605950,
    286914,
    593060,
    277714,
    279544]


const randomID = southWestUtah[Math.floor(Math.random()*southWestUtah.length)]

import {apiKey} from '../../config.js'

const getRandomTrail = () => {
    randomTrailCard.innerHTML = ''

let options = {
  method: 'GET',
  url: `https://trailapi-trailapi.p.rapidapi.com/trails/${randomID}`,
  headers: {
    'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com',
    'X-RapidAPI-Key': apiKey,
  }
}

axios.request(options).then(function (response) {
    response.data.data.forEach(elem => {

   
    let randomTrailCardhtml = `
    <div class="trailCard">
    <h2>${elem.name}</h2>
    <img class="trailCardImg" src="${elem.thumbnail}">
    <p>${elem.length} miles</p>
    <p>${elem.description}</p>
    <p>${elem.directions}</p>
    <p>${elem.city}, ${elem.region}, ${elem.country}</p>
    <p>Lat:${elem.lat}, Lon:${elem.lon}</p>
    <p>Difficulty: ${elem.difficulty}</p>
    </div>
    `
    randomTrailCard.innerHTML = randomTrailCardhtml
})
}).catch(function (error) {
	console.error("get random trail error", error);
});
}

getRandomTrail()