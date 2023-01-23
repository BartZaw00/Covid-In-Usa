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


async function API_CALL(url) {
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            dataFromAPI = data;
            showUsaData();
        });
}

function showUsaData() {
    sumNewCases = 0;
    sumNewDeaths = 0;
    sumTotCases = 0;
    sumTotDeaths = 0;

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
    let noData = true;
    for (i = 0; i < dataFromAPI.length; i++) {
        dateInAPI = new Date(dataFromAPI[i].submission_date);
        if (dateTyped.getYear() === dateInAPI.getYear())
            if (dateTyped.getMonth() == dateInAPI.getMonth())
                if (dateTyped.getDate() == dateInAPI.getDate())
                    if (stateHovered.toUpperCase() == dataFromAPI[i].state) {
                        noData = false;
                        break;
                    }
    }

    if (noData) {
        newCases.textContent = 0;
        newDeaths.textContent = 0;
    }

    else {
        newCases.textContent = Number(dataFromAPI[i].new_case);
        newDeaths.textContent = Number(dataFromAPI[i].new_death);
    }
}

function changeSvgColor(elementFromApi) {
    for (i = 0; i <= 50; i++) {
        if (elementFromApi.state.toUpperCase() == states[i].id.toUpperCase()) {
            if (elementFromApi.new_case > 100000) {
                states[i].style.fill = 'rgb(90, 10, 10)';
            }
            else if (elementFromApi.new_case > 50000) {
                states[i].style.fill = 'rgb(110, 10, 10)';
            }
            else if (elementFromApi.new_case > 25000) {
                states[i].style.fill = 'rgb(130, 20, 20)';
            }
            else if (elementFromApi.new_case > 5000) {
                states[i].style.fill = 'rgb(150, 30, 30)';
            }
            else if (elementFromApi.new_case > 2000) {
                states[i].style.fill = 'rgb(170, 40, 40)';
            }
            else if (elementFromApi.new_case > 1200) {
                states[i].style.fill = 'rgb(200, 50, 50)';
            }
            else if (elementFromApi.new_case > 900) {
                states[i].style.fill = 'rgb(230, 80, 80)';
            }
            else if (elementFromApi.new_case > 600) {
                states[i].style.fill = 'rgb(245, 105, 105)';
            }
            else if (elementFromApi.new_case > 300) {
                states[i].style.fill = 'rgb(255, 130, 130)';
            }
            else if (elementFromApi.new_case > 50) {
                states[i].style.fill = 'rgb(255, 160, 160)';
            }
            else if (elementFromApi.new_case > 0) {
                states[i].style.fill = 'rgb(255, 180, 180)';
            }
            else {
                states[i].style.fill = 'grey';
            }
            break;
        }
    }
}


window.addEventListener('load', () => {
    dateValue = dateFilter.value;
    API_CALL(URL);
});


dateFilter.addEventListener("input", () => {
    dateValue = dateFilter.value;
    for (i = 0; i <= 50; i++)
        states[i].style.fill = 'grey';
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

