import { Car } from '../views/renderGarage';
import { page } from '../controllers/catchEvents';

export const getCars = async (page: number, limit = 7) => {
    const res = await fetch(`http://localhost:3000/garage?_limit=${limit}&_page=${page}`);

    return {allCars: await res.json(),
            countAllCars: res.headers.get('X-Total-Count')};
};


export let {allCars: cars, countAllCars: count} = await getCars(page);
cars.request = 0;
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
    const {allCars, countAllCars} = await getCars(page);
    cars = [...allCars];
    count = countAllCars;

    if (page * 7 < Number(count)) {
        (document.querySelector('.next') as HTMLButtonElement).disabled = false;
    } else {
        (document.querySelector('.next') as HTMLButtonElement).disabled = true;
    }

    if (page > 1) {
        (document.querySelector('.prev') as HTMLButtonElement).disabled = false;
    } else {
        (document.querySelector('.prev') as HTMLButtonElement).disabled = true;
    }
};

export async function createCar(body: {name:string, color:string}) {

    const res = await fetch('http://localhost:3000/garage/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

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

