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

let dateInAPI = '';
let dataFromAPI;
let topElementPosition = '';
let leftElementPosition = '';
let dateValue;
let dateTyped;

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

window.addEventListener('load', () => {
    API_CALL(URL);
    dateValue = dateFilter.value;
});


dateFilter.addEventListener("input", () => {
    dateValue = dateFilter.value;
    showUsaData();
});


