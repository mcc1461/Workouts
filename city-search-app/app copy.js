const cities = [
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkâri",
  "Hatay",
  "Isparta",
  "İçel (Mersin)",
  "İstanbul",
  "İzmir",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırklareli",
  "Kırşehir",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Kahramanmaraş",
  "Mardin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Şanlıurfa",
  "Uşak",
  "Van",
  "Yozgat",
  "Zonguldak",
  "Aksaray",
  "Bayburt",
  "Karaman",
  "Kırıkkale",
  "Batman",
  "Şırnak",
  "Bartın",
  "Ardahan",
  "Iğdır",
  "Yalova",
  "Karabük",
  "Kilis",
  "Osmaniye",
  "Düzce",
];

const searchBar = document.getElementById("searchBar");
const proposalList = document.getElementById("proposalList");
proposalList.style.display = "none";
searchBar.focus(); // Set focus to searchBar when the page loads



searchBar.addEventListener("input", function () {
  // "this" keyword needs to be used instead of "searchBar" because "this" refers to the element that the event listener is attached to
  const inputValue = this.value.toLowerCase();
  // "startsWith" method is used to check if the city name starts with the input value. If it does, it returns "true", otherwise "false
  const findRelatedCities = cities.filter((city) =>
    city.toLowerCase().startsWith(inputValue)
  );
  // "renderProposal function" is called to render the proposal list according to the input value of the search bar and the related cities in the array "cities". It's called when the input event is triggered by the user via the search bar entering a value. It's called with the parameter "findRelatedCities" which is the filtered array of cities. 
  renderProposal(findRelatedCities);
  return findRelatedCities;
});


function renderProposal(findRelatedCities) {
  const proposalCityListEmpty = 
`<li style="color: white; background-color: #e16470; font-size: 1.3rem; font-style: italic; font-weight: bold ">İlgili şehir bulunamadı...</li>`;
  const proposalCityListEmpty2 = 
`<li style="color: white; background-color: #e16470; font-size: 1.3rem; font-style: italic; font-weight: bold ">Lütfen bir şehir adı giriniz...</li>`;
  if (searchBar.value.startsWith(" ")) {
    proposalList.innerHTML = proposalCityListEmpty2;
    proposalList.style.display = "block";
    return;
  }
  if (findRelatedCities.length === 0 && searchBar.value !== "") {
    console.log(findRelatedCities.length);
    console.log(findRelatedCities);
    proposalList.innerHTML = proposalCityListEmpty;
    proposalList.style.display = "block";
    return;
  }
  const proposalCityList = findRelatedCities.map((city) => `<li>${city}</li>`);
  console.log(proposalCityList);
  // "join" provide to convert array to string otherwise commas will be added between elements of array
  proposalList.innerHTML = proposalCityList.join("");
  const proposalItems = document.querySelectorAll("#proposalList li");
  proposalItems.forEach((item) => {
    item.addEventListener("click", function () {
      console.log(item.textContent);
      // proposalList.innerText = item.textContent;
      searchBar.value = item.textContent;
      proposalList.style.display = "none";
    });
  });
  
  if (searchBar.value === "") {
    proposalList.style.display = "none";
  } else 
    proposalList.style.display = "block";
     
  
  if  (searchBar.value !=="" && findRelatedCities.length > 0) {
    proposalList.style.display = "block";
    // Clear the search bar after 5 seconds
  } else {
    proposalList.style.display = "none";
  }
  
  document.addEventListener("keyup", function (e) {
    if (e.key === "Escape") {
      searchBar.value = "";
      proposalList.style.display = "none";
      searchBar.focus(); // Set focus back to searchBar
    } else if (e.key === "Enter" && searchBar.value !== "" && findRelatedCities.length > 0) {
      // Handle Enter key press
      const selectedCity = proposalList.querySelector("li:focus");
      if (selectedCity) {
        searchBar.value = selectedCity.textContent;
        searchBar.focus(); // Set focus back to searchBar
      } else {
        searchBar.focus(); // Set focus back to searchBar
      }
      proposalList.style.display = "none"; // Hide the proposalList
    }
  });
  
  document.addEventListener("click", function (e) {
    if (!searchBar.contains(e.target) && !proposalList.contains(e.target)) {
      searchBar.focus(); // Focus on the input search part
      searchBar.value = ""; // Clear the input search value
      proposalList.style.display = "none"; // Hide the proposal list
    }
  });
  
  // Handle scrolling behavior
  proposalList.addEventListener("scroll", function () {
    const selectedCity = proposalList.querySelector("li:focus");
    if (selectedCity) {
      const visibleHeight = proposalList.clientHeight;
      const middleScrollPosition = selectedCity.offsetTop - (visibleHeight / 2) + (selectedCity.clientHeight / 2);
      proposalList.scrollTop = Math.min(Math.max(0, middleScrollPosition), proposalList.scrollHeight - visibleHeight);
    }
  });
  
  // Handle focus and keydown events for li elements
  document.querySelectorAll('#proposalList li').forEach((li, index) => {
    li.setAttribute('tabindex', '0'); // Make each li focusable
    li.style.cursor = "pointer"; // Set the cursor style to "pointer" for all li elements
  
    li.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        searchBar.value = li.textContent; // Set the value of searchBar to the selected city
        searchBar.focus(); // Set focus back to searchBar
        proposalList.style.display = "none"; // Hide the proposalList
      } else if (event.key === "ArrowDown") {
        const nextIndex = (index + 1) % findRelatedCities.length;
        document.querySelectorAll('#proposalList li')[nextIndex].focus(); // Move focus to the next li
      } else if (event.key === "ArrowUp") {
        const prevIndex = (index - 1 + findRelatedCities.length) % findRelatedCities.length;
        document.querySelectorAll('#proposalList li')[prevIndex].focus(); // Move focus to the previous li
      }
    });
  });
  
  
  
  
}

