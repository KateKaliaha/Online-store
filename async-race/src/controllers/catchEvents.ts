import { renderApp } from '../views/renderApp';
import {
  deleteCar, updateGarage, createCar, getCar, updateCar
} from '../model/manageGarage';
import { generateAllRandomCars, generateRandomCars } from '../model/createRandomCar';
import {
  raceAllCars, startRace, stopRace, stopRaceAllCars
} from '../model/race';
import { addWinner, deleteWinner, updateWinners } from '../model/manageWinners';
import { renderUpdateWinners } from '../views/renderWinnersPage';

export let pageGarage = 1;
export let sortBy = 'id';
export let sortOrder = 'asc';
export let chooseCar: Record<string, string> = {};
let viewApp = 'garage';
export let pageWinners = 1;

export function listenEvent(): void {
  document.body.addEventListener('click', async (event) => {
    if ((event.target as HTMLButtonElement).classList.contains('remove-btn')) {
      const id = (event.target as HTMLButtonElement).id.split('remove-')[1];
      removeCar(id);
    }

    if ((event.target as HTMLButtonElement).classList.contains('create')) {
      createNewCar(document.querySelector('.create-input-text') as HTMLInputElement, document.querySelector('.create-input-color') as HTMLInputElement);
    }

    if ((event.target as HTMLButtonElement).classList.contains('select-btn')) {
      selectCar((event.target as HTMLButtonElement), document.querySelector('.update-input-text') as HTMLInputElement, document.querySelector('.update-input-color') as HTMLInputElement);
    }

    if ((event.target as HTMLButtonElement).classList.contains('update')) {
      updateSelectedCar();
    }

    if ((event.target as HTMLButtonElement).classList.contains('generate-cars')) {
      generateCars(event.target as HTMLButtonElement);
    }

    if ((event.target as HTMLButtonElement).classList.contains('next')) {
      switchNextPage();
    }

    if ((event.target as HTMLButtonElement).classList.contains('prev')) {
      switchPrevPage();
    }

    if ((event.target as HTMLButtonElement).classList.contains('start-btn')) {
      const id = (event.target as HTMLButtonElement).id.split('start-btn-')[1];
      startRace(id);
    }

    if ((event.target as HTMLButtonElement).classList.contains('finish-btn')) {
      const id = (event.target as HTMLButtonElement).id.split('finish-btn-')[1];
      stopRace(id);
    }

    if ((event.target as HTMLButtonElement).classList.contains('race')) {
      clickStartRace((event.target as HTMLButtonElement), document.getElementById('message') as HTMLDivElement);
    }

    if ((event.target as HTMLButtonElement).classList.contains('reset')) {
      clickStopRace(event.target as HTMLButtonElement);
    }

    if ((event.target as HTMLButtonElement).classList.contains('to-garage')) {
      switchPageApp('to-garage');
    }

    if ((event.target as HTMLButtonElement).classList.contains('to-winners')) {
      switchPageApp('to-winners');
    }

    if ((event.target as HTMLButtonElement).classList.contains('sort-wins')) {
      sort('sort-wins');
    }

    if ((event.target as HTMLButtonElement).classList.contains('sort-time')) {
      sort('sort-time');
    }
  });
}

async function removeCar(id: string): Promise<void> {
  await deleteCar(id);
  await updateGarage();
  await renderApp();
  await deleteWinner(id);
}

async function createNewCar(inputText: HTMLInputElement, inputColor: HTMLInputElement): Promise<void> {
  clearMessage(document.getElementById('message') as HTMLDivElement);
  const nameNewCar = inputText.value;
  const color = inputColor.value;
  await createCar({ name: nameNewCar, color });
  await updateGarage();
  await renderApp();
  inputText.value = '';
}

async function selectCar(selectButton: HTMLButtonElement, updateText: HTMLInputElement, updateColor: HTMLInputElement): Promise<void> {
  chooseCar = await getCar(selectButton.id.split('select-')[1]);
  updateText.value = chooseCar.name;
  updateColor.value = chooseCar.color;
}

async function updateSelectedCar(): Promise<void> {
  clearMessage(document.getElementById('message') as HTMLDivElement);
  await updateCar(chooseCar.id);
  await updateGarage();
  await renderApp();
  chooseCar = {};
}

async function generateCars(button: HTMLButtonElement): Promise<void> {
  clearMessage(document.getElementById('message') as HTMLDivElement);
  button.disabled = true;
  generateAllRandomCars(generateRandomCars());
  await updateGarage();
  await renderApp();
  button.disabled = false;
}

async function switchNextPage(): Promise<void> {
  if (viewApp === 'garage') {
    clearMessage(document.getElementById('message') as HTMLDivElement);
    pageGarage += 1;
    await updateGarage();
    await renderApp();
  }

  if (viewApp === 'winners') {
    pageWinners += 1;
    await updateWinners();
    await renderUpdateWinners();
  }
}

async function switchPrevPage(): Promise<void> {
  if (viewApp === 'garage') {
    clearMessage(document.getElementById('message') as HTMLDivElement);
    pageGarage -= 1;
    await updateGarage();
    await renderApp();
  }

  if (viewApp === 'winners') {
    pageWinners -= 1;
    await updateWinners();
    await renderUpdateWinners();
  }
}

function changeDisableButtons(meaning: boolean): void {
  const updateBtn = document.querySelector('.update')as HTMLButtonElement;
  const createBtn = document.querySelector('.create')as HTMLButtonElement;
  const generateBtn = document.querySelector('.generate-cars')as HTMLButtonElement;

  if (meaning) {
    updateBtn.disabled = true;
    createBtn.disabled = true;
    generateBtn.disabled = true;
  } else {
    updateBtn.disabled = false;
    createBtn.disabled = false;
    generateBtn.disabled = false;
  }
}

async function clickStartRace(button: HTMLButtonElement, message: HTMLDivElement): Promise<void> {
  button.disabled = true;
  const buttonReset = document.querySelector('.reset') as HTMLButtonElement;
  (document.querySelector('.prev') as HTMLButtonElement).disabled = true;
  (document.querySelector('.next') as HTMLButtonElement).disabled = true;
  changeDisableButtons(true);
  buttonReset.classList.remove('push');
  buttonReset.disabled = false;
  const winner = await raceAllCars();

  if (!buttonReset.classList.contains('push')) {
    message.style.display = 'block';
    message.innerHTML = `${winner.win.name} went first (time: ${winner.time} sec)`;
    await addWinner(winner);
  }

  await updateGarage();
  changeDisableButtons(false);
}

async function clickStopRace(button: HTMLButtonElement): Promise<void> {
  button.classList.add('push');
  button.disabled = true;
  clearMessage(document.getElementById('message') as HTMLDivElement);
  await stopRaceAllCars();
  (document.querySelector('.race') as HTMLButtonElement).disabled = false;
  await updateGarage();
  changeDisableButtons(false);
}

async function switchPageApp(page: string): Promise<void> {
  const switchToGarageBtn = document.querySelector('.garage-view') as HTMLDivElement;
  const switchToWinnerPage = document.querySelector('.winners-view') as HTMLDivElement;
  const message = document.getElementById('message') as HTMLDivElement;

  if (page === 'to-garage') {
    viewApp = 'garage';
    await updateGarage();
    switchToGarageBtn.style.display = '';
    switchToWinnerPage.style.display = 'none';
    message.style.display = 'block';
    message.style.visibility = 'visible';
  }

  if (page === 'to-winners') {
    viewApp = 'winners';
    await updateWinners();
    switchToGarageBtn.style.display = 'none';
    switchToWinnerPage.style.display = 'block';
    message.style.display = 'none';
    message.style.visibility = 'hidden';
    renderUpdateWinners();
  }
}

async function sort(typeSort: string): Promise<void> {
  const sortWins = document.querySelector('.sort-wins') as HTMLButtonElement;
  const sortTime = document.querySelector('.sort-time') as HTMLButtonElement;

  if (typeSort === 'sort-wins') {
    sortTime.innerHTML = 'Best time,sec';
    sortTime.classList.add('ASC');

    if (sortWins.classList.contains('ASC')) {
      sortByAndOrder('Wins &#8593', 'wins', 'asc', sortWins);
    } else {
      sortByAndOrder('Wins &#8595', 'wins', 'desc', sortWins);
    }
  }

  if (typeSort === 'sort-time') {
    sortWins.innerHTML = 'Wins';
    sortWins.classList.add('ASC');

    if (sortTime.classList.contains('ASC')) {
      sortByAndOrder('Best time,sec &#8593', 'time', 'asc', sortTime);
    } else {
      sortByAndOrder('Best time,sec &#8595', 'time', 'desc', sortTime);
    }
  }
}

async function sortByAndOrder(text: string, typeSortBy: string, typeSortOrder: string, button: HTMLButtonElement): Promise<void> {
  button.innerHTML = text;
  sortBy = typeSortBy;
  sortOrder = typeSortOrder;
  await updateWinners();
  await renderUpdateWinners();
  button.classList.toggle('ASC');
}

function clearMessage(message: HTMLDivElement): void {
  message.style.display = 'none';
  message.innerHTML = '';
}
