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
  const inputValue = this.value.trim().toLowerCase();
  const findRelatedCities = cities.filter((city) =>
    city.toLowerCase().startsWith(inputValue)
  );
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
      // ... (previous code remains the same)
  
      const firstChild = proposalList.querySelector("li:first-child");
      if (firstChild) {
        firstChild.focus(); // Set focus to the first child of proposalList
      }
  
      document.querySelectorAll('#proposalList li').forEach((li, index) => {
        li.setAttribute('tabindex', '0'); // Make each li focusable
        li.style.cursor = "pointer"; // Set the cursor style to "pointer" for all li elements
        li.addEventListener("click", function () {
          searchBar.value = li.textContent; // Set the value of searchBar to the selected city
          // proposalList.style.display = "none"; // Hide the proposalList
          searchBar.focus(); // Set focus back to searchBar
        });
  
        li.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            proposalList.style.display = "none"; // Hide the proposalList
            if (findRelatedCities.length > 0 && event.target.textContent !== "") {
              searchBar.value = event.target.textContent; // Set the value of searchBar to the selected city
              searchBar.focus(); // Set focus back to searchBar
            } else if (findRelatedCities.length === 0 && searchBar.value !== "") {
              searchBar.value = "";
              searchBar.focus(); // Set focus back to searchBar
            } 

            proposalList.scrollTop = li.offsetTop - proposalList.clientHeight / 2; // Scroll to the selected city
          } else if (event.key === "ArrowDown") {
            const nextIndex = (index + 1) % findRelatedCities.length;
            document.querySelectorAll('#proposalList li')[nextIndex].focus(); // Move focus to the next li
            searchBar.value = document.querySelectorAll('#proposalList li')[nextIndex].textContent;
            proposalList.scrollTop = document.querySelectorAll('#proposalList li')[nextIndex].offsetTop - proposalList.clientHeight / 2; // Scroll to the next city
          } else if (event.key === "ArrowUp") {
            const prevIndex = (index - 1 + findRelatedCities.length) % findRelatedCities.length;
            document.querySelectorAll('#proposalList li')[prevIndex].focus(); // Move focus to the previous li
            searchBar.value = document.querySelectorAll('#proposalList li')[prevIndex].textContent;
            proposalList.scrollTop = document.querySelectorAll('#proposalList li')[prevIndex].offsetTop - proposalList.clientHeight / 2; // Scroll to the previous city
          }
        });
      });
    }
  });
  
  
  document.addEventListener("click", function (e) {
    if (e.target !== searchBar &&  e.target !== proposalList ) { 
      console.log("click outside");
      searchBar.focus(); // Set focus back to searchBar
      searchBar.value="";
      proposalList.style.display = "none";
    }
  });
  
}

