import {renderApp} from '../views/renderApp';
import {deleteCar, updateGarage, createCar, getCar,  updateCar} from '../model/manageGarage';
import { generateRandomCars } from '../model/createRandomCar';

export let chooseCar = {name: '', color: '', id: 0};
const amountAddCarsToPage = 100;

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
            await updateCar(chooseCar.id.toString());
            await updateGarage();
            await renderApp();
            chooseCar = {name: '', color: '', id: 0};
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('generate-cars')) {
            const newCars = generateRandomCars(amountAddCarsToPage);
            console.log(newCars.map( async (car) => console.log (car)));
            await Promise.all(newCars.map( async (car) => await createCar(car)));
            await updateGarage();
            await renderApp();
        }
    });
}
