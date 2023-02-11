'use strict';

const urlPeople = 'https://swapi.dev/api/people';
const urlStarships = 'https://swapi.dev/api/starships';
const people = document.querySelector('.people');
const starships = document.querySelector('.starships');
const tablePeople = document.getElementById('result-table-people');
const tableStarships = document.getElementById('result-table-starships');
const previousBtnPeople = document.querySelector('.previous-btn-people');
const nextBtnPeople = document.querySelector('.next-btn-people');
const previousBtnStarships = document.querySelector('.previous-btn-starhips');
const nextBtnStarships = document.querySelector('.next-btn-starhips');
const tableHeadPeople = document.querySelector('.thead-people');
const tableBodyPeople = document.querySelector('.tbody-people');
const tableHeadStarships = document.querySelector('.thead-starships');
const tableBodyStarships = document.querySelector('.tbody-starships');

let nextUrlPeople = '';
let previousUrlPeople = '';
let nextUrlStarships = '';
let previousUrlStarships = '';

nextBtnPeople.style.visibility = 'hidden';
previousBtnPeople.style.visibility = 'hidden';
nextBtnStarships.style.visibility = 'hidden';
previousBtnStarships.style.visibility = 'hidden';

// FETCHING DATA
async function fetchDataFromApi(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

// FUNCTIONS

//print people
async function printPeople(url) {
  tableBodyPeople.innerHTML = '';
  const data = await fetchDataFromApi(url);
  const result = data.results;
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
        <td>${i + 1}</td>
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
  tableBodyStarships.innerHTML = '';
  const data = await fetchDataFromApi(url);
  const result = data.results;
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
          <th>People Capacity (crew + passengers)</th>
          <th>Class</th>
        </tr>
      `;
  for (let i = 0; i < result.length; i++) {
    tableBodyStarships.innerHTML += `
    <tr>
        <td>${i + 1}</td>
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

// LISTENERS
// people first page
people.addEventListener('click', async function (e) {
  e.preventDefault();
  tableBodyPeople.innerHTML = '';
  console.log(tableBodyPeople.innerHTML = '');
  await printPeople(urlPeople);
  nextBtnPeople.style.visibility = 'visible';
})
// next button people
nextBtnPeople.addEventListener('click', async function (e) {
  e.preventDefault();
  await printPeople(nextUrlPeople)
})
// previous button people
previousBtnPeople.addEventListener('click', async function (e) {
  e.preventDefault();
  await printPeople(previousUrlPeople)
})
// starships first page
starships.addEventListener('click', async function (e) {
  e.preventDefault();
  tableBodyStarships.innerHTML = '';
  console.log(tableBodyStarships.innerHTML);
  await printStarhips(urlStarships);
  nextBtnStarships.style.visibility = 'visible';
})
// next button starships
nextBtnStarships.addEventListener('click', async function (e) {
  e.preventDefault();
  await printStarhips(nextUrlStarships);
})
// previous button starships
previousBtnStarships.addEventListener('click', async function (e) {
  e.preventDefault();
  await printStarhips(previousUrlStarships);
})