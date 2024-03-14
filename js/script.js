let country;
const apiKey = "ea79c7de9e70611142a01799cc03d507";
let weather;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    country = data;

    row = document.createElement("div");
    row.className = "row mx-0";
    country.forEach((countryObj) => {
      const col = document.createElement("div");
      col.className =
        "col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12";
      row.append(col);
      const card = document.createElement("div");
      card.className = "card";
      col.append(card);
      card.innerHTML = `<h5>${countryObj.name.common}</h5>`;
      card.innerHTML += `<img src="${countryObj.flags.png}" alt="Flag of ${countryObj.name.common}">`;
      let capital = countryObj.capital;
      card.innerHTML += `<h6>${capital}</h6>`;
      let region = countryObj.region;
      card.innerHTML += `<h6>${region}</h6>`;
      const btn = document.createElement("button");
      btn.innerText = "Click for weather";
      btn.className = "view_btn";
      card.append(btn);
      const [lat, long] = countryObj.latlng;
      console.log("Latitude:", lat, "Longitude:", long);
      btn.addEventListener("click", (event) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`)
          .then((res) => res.json())
          .then((data) => {
            weather=data;
            console.log(weather);
            const countryname=weather.city.name
            const temperature = data.list[0].main.temp;
            const humidity = data.list[0].main.humidity;
            const clouds = data.list[0].weather[0].main;
            alert(`Temperature: ${temperature}\nCity: ${countryname}\nsky:${clouds}\nHumidity:${humidity}`);
          });
      });
    });

    document.body.append(row);
  });
