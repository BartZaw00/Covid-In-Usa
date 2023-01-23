const URL = "https://data.cdc.gov/resource/9mfq-cb36.json?$limit=60000&$order=submission_date"

const map = document.getElementById("svg");
const states = document.getElementById("state").children;

const dateFilter = document.querySelector('[data-date-filter]');
const timePeriod = document.querySelector('[data-time-period]');

const dailyInfected = document.querySelector('[data-daily-infected]');
const dailyDeaths = document.querySelector('[data-daily-deaths]');
const infected = document.querySelector('[data-infected]');
const deaths = document.querySelector('[data-deaths]');

const tooltip = document.querySelector('[data-tooltip]');

const stateName = document.querySelector('[data-state-name]');
const newCases = document.querySelector('[data-new-cases]');
const newDeaths = document.querySelector('[data-new-deaths]');

let dataFromAPI;
let dateInAPI;
let dateValue;
let dateTyped;

let statePositionTop;
let statePositionLeft;

let sumTotCases = 0;
let sumTotDeaths = 0;
let sumNewCases = 0;
let sumNewDeaths = 0;


console.log(states[2])

async function API_CALL(url) {
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            dataFromAPI = data;
            showUsaData();
        });
}

function showUsaData() {
    sumTotCases = 0;
    sumTotDeaths = 0;
    sumNewCases = 0;
    sumNewDeaths = 0;
    dateTyped = new Date(dateValue);

    dataFromAPI.forEach((element) => {
        dateInAPI = new Date(element.submission_date);
        if (dateTyped.getYear() === dateInAPI.getYear()) {
            if (dateTyped.getMonth() == dateInAPI.getMonth()) {
                if (dateTyped.getDate() == dateInAPI.getDate()) {
                    changeSvgColor(element);
                    sumNewCases += Number(element.new_case);
                    sumNewDeaths += Number(element.new_death);
                    sumTotCases += Number(element.tot_cases);
                    sumTotDeaths += Number(element.tot_death);
                }
            }
        }
    });

    timePeriod.textContent = dateTyped.toDateString();
    dailyInfected.textContent = sumNewCases;
    dailyDeaths.textContent = sumNewDeaths;
    infected.textContent = sumTotCases;
    deaths.textContent = sumTotDeaths;
}

function showTooltipData(stateHovered) {
    let i = 0;
    for (i = 0; i < dataFromAPI.length; i++) {
        dateInAPI = new Date(dataFromAPI[i].submission_date);
        if (dateTyped.getYear() === dateInAPI.getYear())
            if (dateTyped.getMonth() == dateInAPI.getMonth())
                if (dateTyped.getDate() == dateInAPI.getDate())
                    if (stateHovered.toUpperCase() == dataFromAPI[i].state)
                        break;
    }


    newCases.textContent = Number(dataFromAPI[i].new_case);
    newDeaths.textContent = Number(dataFromAPI[i].new_death);
}

function changeSvgColor(elementFromApi) {
    for (i = 0; i <= 50; i++) {
        if (elementFromApi.state.toUpperCase() == states[i].id.toUpperCase()) {
            if (elementFromApi.new_case > 100001) {
                states[i].classList.toggle('map-fill-12');
            }
            else if (elementFromApi.new_case > 50001) {
                states[i].classList.toggle('map-fill-11');
            }
            else if (elementFromApi.new_case > 25001) {
                states[i].classList.toggle('map-fill-10');
            }
            else if (elementFromApi.new_case > 5001) {
                states[i].classList.toggle('map-fill-9');
            }
            else if (elementFromApi.new_case > 2001) {
                states[i].classList.toggle('map-fill-8');
            }
            else if (elementFromApi.new_case > 1201) {
                states[i].classList.toggle('map-fill-7');
            }
            else if (elementFromApi.new_case > 901) {
                states[i].classList.toggle('map-fill-6');
            }
            else if (elementFromApi.new_case > 601) {
                states[i].classList.toggle('map-fill-5');
            }
            else if (elementFromApi.new_case > 301) {
                states[i].classList.toggle('map-fill-4');
            }
            else if (elementFromApi.new_case > 101) {
                states[i].classList.toggle('map-fill-3');
            }
            else if (elementFromApi.new_case > 31) {
                states[i].classList.toggle('map-fill-2');
            }
            else if (elementFromApi.new_case >= 0) {
                states[i].classList.toggle('map-fill-1');
            }
            else {
                states[i].classList.toggle('map-fill-0');
            }
            break;
        }
    }
}


window.addEventListener('load', () => {
    API_CALL(URL);
    dateValue = dateFilter.value;
});


dateFilter.addEventListener("input", () => {
    dateValue = dateFilter.value;
    showUsaData();
});



map.addEventListener("mouseover", (event) => {
    if (event.target.id !== 'svg') {
        tooltip.style.top = (event.target.getBoundingClientRect().top - 20) + 'px';
        tooltip.style.left = (event.target.getBoundingClientRect().right + 20) + 'px';
        tooltip.classList.add('tooltip-display');
        stateName.textContent = event.target.getAttribute('name');
        showTooltipData(event.target.id);
    }
});



map.addEventListener('mouseout', () => {
    tooltip.classList.remove('tooltip-display');
})

