const latInput = document.querySelector("#latitude");
const lonInput = document.querySelector("#longitude");
const trailSearchForm = document.querySelector("#trailSearchForm");
const trailCardSearch = document.querySelector("#trailSearch");

const addTrailFromSearch = trail => {
  axios
    .post(`http://localhost:4004/save-trail-api`, trail)
    .then(() => {
      alert("Trail Added");
    })
    .catch((err) => console.log("error on add trail from search", err));
};

import {apiKey} from '../../config.js'

const handleSubmit = (e) => {
  e.preventDefault();

  if (latInput.value == "" || lonInput.value == "") {
    alert("You must enter a latitude and longitude.");
    return;
  }

  const options = {
    method: "GET",
    url: "https://trailapi-trailapi.p.rapidapi.com/trails/explore/",
    params: { lat: `${latInput.value}`, lon: `${lonInput.value}` },
    headers: {
      "X-RapidAPI-Host": "trailapi-trailapi.p.rapidapi.com",
      "X-RapidAPI-Key": apiKey,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      response.data.data.forEach((elem, index) => {
        let trailCardSearchHTML = `
        <div class="trailSearchCard">
        <h2>${elem.name}</h2>
        <img class="trailCardSearchImg" src="${elem.thumbnail}">
        <p>${elem.id}</p>
        <p>${elem.length} miles</p>
        <p>${elem.description}</p>
        <p>${elem.directions}</p>
        <p>${elem.city}, ${elem.region}, ${elem.country}</p>
        <p>Lat: ${elem.lat}, Lon: ${elem.lon}</p>
        <p>${elem.difficulty}</p>
        <button class="addTrailFromSearchButton" id="b-${index}">Add Trail</button>
        </div>`;
        trailCardSearch.innerHTML += trailCardSearchHTML;
      });
      let buttons = document.querySelectorAll(`.addTrailFromSearchButton`);
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", (e) => {
         addTrailFromSearch(
          response.data.data[i]
          );
        });
      }
    })
    .catch(function (error) {
      console.error(error);
    });
};

trailSearchForm.addEventListener("submit", handleSubmit);

//+e.target.id.replace(/\D/g, "")