import {renderApp} from '../views/renderApp';
import {deleteCar, updateGarage, createCar} from '../model/manageGarage';

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
    if ((event.target as HTMLButtonElement).classList.contains('create')){
        await createCar();
        await updateGarage();
        await renderApp();
    }
});
}
