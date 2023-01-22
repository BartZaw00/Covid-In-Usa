const URL = "https://data.cdc.gov/resource/9mfq-cb36.json?$limit=60000&$order=submission_date"

const dateFilter = document.querySelector('[data-date-filter]');
const timePeriod = document.querySelector('[data-time-period]');

const dailyInfected = document.querySelector('[data-daily-infected]');
const dailyDeaths = document.querySelector('[data-daily-deaths]');
const infected = document.querySelector('[data-infected]');
const deaths = document.querySelector('[data-deaths]');

const stateName = document.querySelector('[data-state-name]');
const newCases = document.querySelector('[data-new-cases]');
const newDeaths = document.querySelector('[data-new-deaths]');


function API_CALL(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            dane = data;
            return dane;
        });
}

window.addEventListener('load', () => {
    API_CALL(URL);
    //showUsaData();
});