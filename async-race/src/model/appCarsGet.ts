import { renderApp } from '../views/renderApp';

export const getCars = async (page: number, limit = 10) => {
    const res = await fetch(`http://localhost:3000/garage?_limit=${limit}&_page=${page}`);

    return {allCars: await res.json(),
            countAllCars: res.headers.get('X-Total-Count')};
};

export let {allCars: cars, countAllCars: count} = await getCars(1);

export function listenEvent() {
    document.body.addEventListener('click', async (event) => {
        if ((event.target as HTMLButtonElement).classList.contains('remove-btn')) {
            const id = (event.target as HTMLButtonElement).id.split('remove-')[1];
            await deleteCar(id);
            await updateGarage();
            await renderApp();
            console.log(cars, count);
        }
    });
}

export async function deleteCar(id:string) {
    const res = await fetch (`http://localhost:3000/garage/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();

    if (data) {
        document.getElementById(`car-${id}`)?.remove();
    }
}

export const updateGarage = async () => {
    const {allCars, countAllCars} = await getCars(1);
    cars = [...allCars];
    count = countAllCars;
};
