'use strict';

const urlPeople = 'https://swapi.dev/api/people';
const urlStarships = 'https://swapi.dev/api/starships';
const logo = document.querySelector('.logo');
const people = document.querySelector('.people');
const starships = document.querySelector('.starships');
const tablePeople = document.getElementById('result-table-people');
const tableStarships = document.getElementById('result-table-starships');
const previousBtnPeople = document.querySelector('.previous-btn-people');
const nextBtnPeople = document.querySelector('.next-btn-people');
const previousBtnStarships = document.querySelector('.previous-btn-starhips');
const nextBtnStarships = document.querySelector('.next-btn-starhips');

const pageNumberPeople = document.querySelector('#page-num-people');
const pageNumberStarships = document.querySelector('#page-num-starships');

const tableHeadPeople = document.querySelector('.thead-people');
const tableBodyPeople = document.querySelector('.tbody-people');
const tableHeadStarships = document.querySelector('.thead-starships');
const tableBodyStarships = document.querySelector('.tbody-starships');

let nextUrlPeople = '';
let previousUrlPeople = '';
let nextUrlStarships = '';
let previousUrlStarships = '';

let peopleCounter = 0;
let starhipsCounter = 0;
let pageNumberPeopleCounter = 0;
let pageNumberStarshipsCounter = 0;

nextBtnPeople.style.visibility = 'hidden';
previousBtnPeople.style.visibility = 'hidden';
nextBtnStarships.style.visibility = 'hidden';
previousBtnStarships.style.visibility = 'hidden';
pageNumberPeople.style.visibility = 'hidden';
pageNumberStarships.style.visibility = 'hidden';

// FETCHING DATA
async function fetchDataFromApi(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

// FUNCTIONS

//print people
async function printPeople(url) {
  const data = await fetchDataFromApi(url);
  console.log(data);
  const result = data.results;
  tableBodyPeople.innerHTML = '';
  console.log(result);
  nextUrlPeople = data.next;
  previousUrlPeople = data.previous;

  tableHeadPeople.innerHTML = `
      <tr>
          <th>#</th>
          <th>Name</th>
          <th>Height (cm)</th>
          <th>Mass (kg)</th>
          <th>Gender</th>
          <th>Birth Year</th>
          <th>Appearances</th>
        </tr>
      `;
  for (let i = 0; i < result.length; i++) {
    tableBodyPeople.innerHTML += `
    <tr>
        <td>${peopleCounter + i + 1}</td>
        <td>${result[i].name}</td>
        <td>${result[i].height}</td>
        <td>${result[i].mass}</td>
        <td>${result[i].gender}</td>
        <td>${result[i].birth_year}</td>
        <td>${result[i].films.length}</td>
      </tr>
    `;
  };
  if (nextUrlPeople) nextBtnPeople.style.visibility = 'visible';
  else nextBtnPeople.style.visibility = 'hidden';
  if (previousUrlPeople) previousBtnPeople.style.visibility = 'visible';
  else previousBtnPeople.style.visibility = 'hidden';
};

//print starhips / first page
async function printStarhips(url) {
  const data = await fetchDataFromApi(url);
  const result = data.results;
  tableBodyStarships.innerHTML = '';
  // console.log(result);
  nextUrlStarships = data.next;
  previousUrlStarships = data.previous;

  tableHeadStarships.innerHTML = `
      <tr>
          <th>#</th>
          <th>Name</th>
          <th>Model</th>
          <th>Manufacturer</th>
          <th>Cost (credits)</th>
          <th>People Capacity</th>
          <th>Class</th>
        </tr>
      `;
  for (let i = 0; i < result.length; i++) {
    tableBodyStarships.innerHTML += `
    <tr>
        <td>${starhipsCounter + i + 1}</td>
        <td>${result[i].name}</td>
        <td>${result[i].model}</td>
        <td>${result[i].manufacturer}</td>
        <td>${result[i].cost_in_credits}</td>
        <td>${Number(result[i].passengers
      .replaceAll('n/a', '0')
      .replaceAll('-', '')
      .replaceAll(',', '')) + Number(result[i].crew
        .replaceAll('n/a', '0')
        .replaceAll('-', '')
        .replaceAll(',', ''))}</td>
        <td>${result[i].starship_class}</td>
      </tr>
    `;
  };
  if (nextUrlStarships) nextBtnStarships.style.visibility = 'visible';
  else nextBtnStarships.style.visibility = 'hidden';
  if (previousUrlStarships) previousBtnStarships.style.visibility = 'visible';
  else previousBtnStarships.style.visibility = 'hidden';
};

// reset homepage function
function restartHomePage() {
  tableHeadPeople.innerHTML = '';
  tableBodyPeople.innerHTML = '';
  tableHeadStarships.innerHTML = '';
  tableBodyStarships.innerHTML = ''
  nextBtnPeople.style.visibility = 'hidden';
  previousBtnPeople.style.visibility = 'hidden';
  nextBtnStarships.style.visibility = 'hidden';
  previousBtnStarships.style.visibility = 'hidden';
  pageNumberPeople.style.visibility = 'hidden';
  pageNumberStarships.style.visibility = 'hidden';
};

// LISTENERS
// people first page
people.addEventListener('click', async function (e) {
  e.preventDefault();
  peopleCounter = 0;
  tableBodyPeople.innerHTML = '';
  console.log(tableBodyPeople.innerHTML = '');
  await printPeople(urlPeople);
  nextBtnPeople.style.visibility = 'visible';
  pageNumberPeople.style.visibility = 'visible';
  if (previousUrlPeople === null) pageNumberPeople.innerHTML = 'Page 1';
});
// next button people
nextBtnPeople.addEventListener('click', async function (e) {
  e.preventDefault();
  if (nextUrlPeople) {
    // console.log(nextUrlPeople.charAt(nextUrlPeople.length - 1));
    peopleCounter = Number(nextUrlPeople[nextUrlPeople.length - 1] * 10 - 10);
  } else {
    peopleCounter = Number(previousUrlPeople[previousUrlPeople.length - 1] * 10 - 10);
  }
  if (nextUrlPeople) pageNumberPeople.innerHTML = `Page ${nextUrlPeople.charAt(nextUrlPeople.length - 1)}`;
  await printPeople(nextUrlPeople);
});
// previous button people
previousBtnPeople.addEventListener('click', async function (e) {
  e.preventDefault();
  if (previousUrlPeople) {
    peopleCounter = Number(previousUrlPeople[previousUrlPeople.length - 1] * 10 - 10);
  } else {
    peopleCounter = 0;
  }
  if (previousUrlPeople) pageNumberPeople.innerHTML = `Page ${previousUrlPeople.charAt(previousUrlPeople.length - 1)}`;
  await printPeople(previousUrlPeople);
});
// starships first page
starships.addEventListener('click', async function (e) {
  e.preventDefault();
  starhipsCounter = 0;
  tableBodyStarships.innerHTML = '';
  console.log(tableBodyStarships.innerHTML);
  await printStarhips(urlStarships);
  nextBtnStarships.style.visibility = 'visible';
  pageNumberStarships.style.visibility = 'visible';
  if (previousUrlStarships === null) pageNumberStarships.innerHTML = 'Page 1';
});
// next button starships
nextBtnStarships.addEventListener('click', async function (e) {
  e.preventDefault();
  if (nextUrlStarships) {
    starhipsCounter = Number(nextUrlStarships[nextUrlStarships.length - 1] * 10 - 10);
  } else {
    starhipsCounter = Number(previousUrlStarships[previousUrlStarships.length - 1] * 10 - 10);
  }
  if (nextUrlStarships) pageNumberStarships.innerHTML = `Page ${nextUrlStarships.charAt(nextUrlStarships.length - 1)}`;
  await printStarhips(nextUrlStarships);
});
// previous button starships
previousBtnStarships.addEventListener('click', async function (e) {
  e.preventDefault();
  if (previousUrlStarships) {
    starhipsCounter = Number(previousUrlStarships[previousUrlStarships.length - 1] * 10 - 10);
  } else {
    starhipsCounter = 0;
  }
  if (previousUrlStarships) pageNumberStarships.innerHTML = `Page ${previousUrlStarships.charAt(previousUrlStarships.length - 1)}`;
  await printStarhips(previousUrlStarships);
});
// restart homepage
logo.addEventListener('click', function (e) {
  e.preventDefault();
  restartHomePage();
});