import {renderApp} from '../views/renderApp';
import {deleteCar, updateGarage, createCar, getCar} from '../model/manageGarage';

export let chooseCar = {name: '', color: '', id: 0};

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
            await createCar();
            await updateGarage();
            await renderApp();
        }
    });

    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('select-btn')) {
            chooseCar = await getCar((event.target as HTMLButtonElement).id.split('select-')[1]);
            const updateText = document.querySelector('.update-input-text') as HTMLInputElement;
            updateText.value = chooseCar.name;
            const updateColor = document.querySelector('.update-input-color') as HTMLInputElement;
            updateColor.value = chooseCar.color;
            console.log( updateColor.value, updateText.value);
        }
    });
}
