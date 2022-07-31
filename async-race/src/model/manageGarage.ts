import { Car } from '../views/renderGarage';

export const getCars = async (page: number, limit = 10) => {
    const res = await fetch(`http://localhost:3000/garage?_limit=${limit}&_page=${page}`);

    return {allCars: await res.json(),
            countAllCars: res.headers.get('X-Total-Count')};
};

export let {allCars: cars, countAllCars: count} = await getCars(1);

export const getCar = async (id:string) => {
    const res:Car = await (await fetch(`http://localhost:3000/garage/${id}`)).json();

    return res;
};

export async function deleteCar(id:string) {
    const res = await fetch (`http://localhost:3000/garage/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();

    return data;
}

export const updateGarage = async () => {
    const {allCars, countAllCars} = await getCars(1);
    cars = [...allCars];
    count = countAllCars;
};

export async function createCar() {
    const inputText = document.querySelector('.create-input-text') as HTMLInputElement;
    const title = inputText.value;
    const inputColor = document.querySelector('.create-input-color') as HTMLInputElement;
    const color = inputColor.value;
    const res = await fetch('http://localhost:3000/garage/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:title, color})
    });
    inputText.value = '';

    return await res.json();
}

export async function updateCar(id:string) {
    const inputText = document.querySelector('.update-input-text') as HTMLInputElement;
    const title = inputText.value;
    const inputColor = document.querySelector('.update-input-color') as HTMLInputElement;
    const color = inputColor.value;
    const res = await fetch(`http://localhost:3000/garage/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:title, color})
    });
    inputText.value = '';
    inputColor.value = '#45BAB8';

    return await res.json();
}

