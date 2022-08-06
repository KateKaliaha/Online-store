import {renderApp} from '../views/renderApp';
import {deleteCar, updateGarage, createCar, getCar,  updateCar} from '../model/manageGarage';
import { generateRandomCars } from '../model/createRandomCar';
import { raceAllCars, startRace, stopRace, stopRaceAllCars} from '../model/race';
import { addWinner, updateWinners } from '../model/manageWinners';
import { renderUpdateWinners } from '../views/renderWinnersPage';

export let page = 1;
export let sortBy = 'id';
export let sortOrder = 'asc';
export let chooseCar: Record<string, string> = {};
let viewApp = 'garage';
const amountAddCarsToPage = 100;
export let pageWinners = 1;

export function listenEvent() {
    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('remove-btn')) {
            const id = (event.target as HTMLButtonElement).id.split('remove-')[1];
            await deleteCar(id);
            await updateGarage();
            await renderApp();
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('create')) {
            const inputText = document.querySelector('.create-input-text') as HTMLInputElement;
            const title = inputText.value;
            const inputColor = document.querySelector('.create-input-color') as HTMLInputElement;
            const color = inputColor.value;
            await createCar({name:title, color});
            await updateGarage();
            await renderApp();
            inputText.value = '';
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('select-btn')) {
            chooseCar = await getCar((event.target as HTMLButtonElement).id.split('select-')[1]);
            const updateText = document.querySelector('.update-input-text') as HTMLInputElement;
            updateText.value = chooseCar.name;
            const updateColor = document.querySelector('.update-input-color') as HTMLInputElement;
            updateColor.value = chooseCar.color;
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('update')) {
            await updateCar(chooseCar.id);
            await updateGarage();
            await renderApp();
            chooseCar = {};
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('generate-cars')) {
            const newCars = generateRandomCars(amountAddCarsToPage);
            await Promise.all(newCars.map( async (car) => await createCar(car)));
            await updateGarage();
            await renderApp();
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('next')) {
            if (viewApp === 'garage') {
                page = page + 1;
                await updateGarage();
                await renderApp();
            }
        
            if (viewApp === 'winners') {
                pageWinners = pageWinners + 1;
                await updateWinners();
                await renderUpdateWinners();
            }
        }

        if ((event.target as HTMLButtonElement).classList.contains('prev')) {
            if (viewApp === 'garage') {
            page = page - 1;
            await updateGarage();
            await renderApp();
        }

        if (viewApp === 'winners') {
            pageWinners = pageWinners - 1;
            await updateWinners();
            await renderUpdateWinners();
        }
    }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('start-btn')) {
            const id = (event.target as HTMLButtonElement).id.split('start-btn-')[1];
            startRace(id);
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('finish-btn')) {
            const id = (event.target as HTMLButtonElement).id.split('finish-btn-')[1];
            stopRace(id);
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('race')) {
            (event.target as HTMLButtonElement).disabled = true;
            (document.querySelector('.reset') as HTMLButtonElement).classList.remove('push');
            (document.querySelector('.reset') as HTMLButtonElement).disabled = false;
            const winner = await raceAllCars();

            if (!(document.querySelector('.reset') as HTMLButtonElement).classList.contains('push')) {
                const message = document.getElementById('message') as HTMLDivElement;
                message.style.display = 'block';
                message.innerHTML = `${winner.win.name} went first (time: ${winner.time} sec)`;
            }

            await addWinner(winner);
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('reset')) {
            (event.target as HTMLButtonElement).classList.add('push');
            (event.target as HTMLButtonElement).disabled = true;
            const message = document.getElementById('message') as HTMLDivElement;
            message.innerHTML ='';
            message.style.display = 'none';
            await stopRaceAllCars();
            (document.querySelector('.race') as HTMLButtonElement).disabled = false;
            message.innerHTML = '';
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('to-garage')) {
            viewApp = 'garage';
            await updateGarage();
            (document.querySelector('.garage-view') as HTMLDivElement).style.display = '';
            (document.querySelector('.winners-view') as HTMLDivElement).style.display = 'none';
            const message = document.getElementById('message') as HTMLDivElement;
            message.style.display = 'block';
            console.log(viewApp, page);
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('to-winners')) {
            viewApp = 'winners';
            await updateWinners();
            (document.querySelector('.garage-view') as HTMLDivElement).style.display = 'none';
            (document.querySelector('.winners-view') as HTMLDivElement).style.display = 'block';
            const message = document.getElementById('message') as HTMLDivElement;
            message.style.display = 'none';
            renderUpdateWinners();
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('sort-wins')) {
            const sortWins = document.querySelector('.sort-wins') as HTMLButtonElement;
            const sortTime = document.querySelector('.sort-time') as HTMLButtonElement;
            sortTime.innerHTML = 'Best time,sec';
            sortTime.classList.add('ASC');
            if(sortWins.classList.contains('ASC')) {
                sortWins.innerHTML = 'Wins &#8593';
                sortBy = 'wins';
                sortOrder = 'asc';
                await updateWinners();
                await renderUpdateWinners();
                sortWins.classList.toggle('ASC');
            } else {
                sortWins.innerHTML = 'Wins &#8595';
                sortBy = 'wins';
                sortOrder = 'desc';
                await updateWinners();
                await renderUpdateWinners();
                sortWins.classList.toggle('ASC');
            }
        }

        if ((event.target as HTMLButtonElement).classList.contains('sort-time')) {
            const sortWins = document.querySelector('.sort-wins') as HTMLButtonElement;
            sortWins.innerHTML = 'Wins';
            sortWins.classList.add('ASC');
            const sortTime = document.querySelector('.sort-time') as HTMLButtonElement;
            if(sortTime.classList.contains('ASC')) {
                sortTime.innerHTML = 'Best time,sec &#8593';
                sortBy = 'time';
                sortOrder = 'asc';
                await updateWinners();
                await renderUpdateWinners();
                sortTime.classList.toggle('ASC');
            } else {
                sortTime.innerHTML = 'Best time,sec &#8595';
                sortBy = 'time';
                sortOrder = 'desc';
                await updateWinners();
                await renderUpdateWinners();
                sortTime.classList.toggle('ASC');
            }
        }
    });
}

