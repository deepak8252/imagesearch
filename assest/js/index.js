const acceskey = "AyyxNbJAGz0xMXxw4xtvfDSI1G-p8CCm5lBq0A3y7mY";
const formel = document.querySelector("form");
const inputel = document.getElementById("searchinput");
const searchresult = document.querySelector(".search-results");
const showmore = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchimages() {
    inputData = inputel.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${acceskey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        searchresult.innerHTML = "";
    }

    results.forEach(item => {
        const img_wrapper = document.createElement("div");
        img_wrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = item.urls.small;
        image.alt = item.alt_description;

        const anchor = document.createElement("a");
        anchor.href = item.links.html;
        anchor.target = "_blank";
        anchor.textContent = item.alt_description;

        img_wrapper.appendChild(image);
        img_wrapper.appendChild(anchor);

        searchresult.appendChild(img_wrapper); // Append img_wrapper to searchresult
    });

    page++;
    if (page > 1) {
        showmore.style.display = "block";
    }
}

formel.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchimages();
});

showmore.addEventListener("click", () => {
    searchimages();
});
