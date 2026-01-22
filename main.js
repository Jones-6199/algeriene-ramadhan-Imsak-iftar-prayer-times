let cities = [
  { arabicName: "أدرار", name: "Adrar" },
  { arabicName: "الشلف", name: "Chlef" },
  { arabicName: "الأغواط", name: "Laghouat" },
  { arabicName: "أم البواقي", name: "Oum El Bouaghi" },
  { arabicName: "باتنة", name: "Batna" },
  { arabicName: "بجاية", name: "Bejaia" },
  { arabicName: "بسكرة", name: "Biskra" },
  { arabicName: "بشار", name: "Béchar" },
  { arabicName: "البليدة", name: "Blida" },
  { arabicName: "البويرة", name: "Bouira" },
  { arabicName: "تمنراست", name: "Tamanrasset" },
  { arabicName: "تبسة", name: "Tébessa" },
  { arabicName: "تلمسان", name: "Tlemcen" },
  { arabicName: "تيارت", name: "Tiaret" },
  { arabicName: "تيزي وزو", name: "Tizi Ouzou" },
  { arabicName: "الجزائر, العاصمة", name: "Algiers" },
  { arabicName: "الجلفة", name: "Djelfa" },
  { arabicName: "جيجل", name: "Jijel" },
  { arabicName: "سطيف", name: "Setif" },
  { arabicName: "سعيدة", name: "Saida" },
  { arabicName: "سكيكدة", name: "Skikda" },
  { arabicName: "سيدي بلعباس", name: "Sidi Bel Abbès" },
  { arabicName: "عنابة", name: "Annaba" },
  { arabicName: "قالمة", name: "Guelma" },
  { arabicName: "قسنطينة", name: "Constantine" },
  { arabicName: "المدية", name: "Médéa" },
  { arabicName: "مستغانم", name: "Mostaganem" },
  { arabicName: "المسيلة", name: "Msila" },
  { arabicName: "بوسعادة", name: "Bou Saada" },
  { arabicName: "سيدي عيسى", name: "Sidi Aïssa" },
  { arabicName: "معسكر", name: "Mascara" },
  { arabicName: "ورقلة", name: "Ouargla" },
  { arabicName: "وهران", name: "Oran" },
  { arabicName: "البيض", name: "El Bayadh" },
  { arabicName: "إليزي", name: "Illizi" },
  { arabicName: "برج بوعريريج", name: "Bordj Bou Arreridj" },
  { arabicName: "بومرداس", name: "Boumerdès" },
  { arabicName: "الطارف", name: "El Tarf" },
  { arabicName: "تندوف", name: "Tindouf" },
  { arabicName: "تيسمسيلت", name: "Tissemsilt" },
  { arabicName: "الوادي", name: "El Oued" },
  { arabicName: "خنشلة", name: "Khenchela" },
  { arabicName: "سوق أهراس", name: "Souk Ahras" },
  { arabicName: "تيبازة", name: "Tipaza" },
  { arabicName: "ميلة", name: "Mila" },
  { arabicName: "عين الدفلة", name: "Aïn Defla" },
  { arabicName: "النعامة", name: "Naama" },
  { arabicName: "عين تيموشنت", name: "Aïn Témouchent" },
  { arabicName: "غرداية", name: "Ghardaia" },
  { arabicName: "غليزان", name: "Relizane" },
  { arabicName: "البرج", name: "Bordj" },
  { arabicName: "تيميمون", name: "Timimoun" },
  { arabicName: "بني عباس", name: "Beni Abbes" },
  { arabicName: "السمارة", name: "El Hamel" },
  { arabicName: "القل", name: "Ouled Djellal" },
  { arabicName: "منيعة", name: "Meniaa" },
  { arabicName: "أفلو", name: "Aflou" },
  { arabicName: "جانات", name: "Djanet" },
  { arabicName: "عين صالح", name: "Ain Salah" },
  { arabicName: "غرداية", name: "Ghardaia" },
  { arabicName: "الغرارة", name: "In Salah" },
  { arabicName: "إيليزي", name: "Illizi" },
];

for (let city of cities) {
  const content = `

          <option> ${city.arabicName}  </option>
        
        `;
  document.getElementById("cities-selection").innerHTML += content;
}

document
  .getElementById("cities-selection")
  .addEventListener("change", function () {
    document.getElementById("wilaya-name").innerHTML = this.value;
    let cityName = "";
    for (let city of cities) {
      if (city.arabicName == this.value) {
        cityName = city.name;
      }
    }
    getPrayersTimingsOfCity(cityName);
    console.log(cityName);
  });

function getPrayersTimingsOfCity(cityName) {
  let param = {
    country: "DZ",
    city: cityName,
  };
  // Make a request for a user with a given ID
  axios
    .get("https://api.aladhan.com/v1/timingsByCity", {
      params: param,
    })
    .then(function (response) {
      const imsakPrayer = response.data.data.timings.Imsak;
      const fajrPrayer = response.data.data.timings.Fajr;
      const duhrPrayer = response.data.data.timings.Dhuhr;
      const asrPrayer = response.data.data.timings.Asr;
      const maghribPrayer = response.data.data.timings.Maghrib;
      const ishaPrayer = response.data.data.timings.Isha;

      document.getElementById("imsak-time").innerHTML = imsakPrayer;
      document.getElementById("fajr-time").innerHTML = fajrPrayer;
      document.getElementById("duhr-time").innerHTML = duhrPrayer;
      document.getElementById("asr-time").innerHTML = asrPrayer;
      document.getElementById("maghrib-time").innerHTML = maghribPrayer;
      document.getElementById("isha-time").innerHTML = ishaPrayer;

      const readableDate = response.data.data.date.readable;
      const weekDay = response.data.data.date.hijri.weekday.ar;

      const todayDate = weekDay + " " + readableDate;
      document.getElementById("today-date").innerHTML = todayDate;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getPrayersTimingsOfCity("Adrar");
