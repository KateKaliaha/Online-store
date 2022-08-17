import { pageGarage } from '../controllers/catchEvents';

const LIMIT_NUMBER_CARS_ON_PAGE = 7;

export interface Car {
  color: string,
  id?: number,
  name: string,
  request?: number
}

export const getCars = async (page: number, limit = LIMIT_NUMBER_CARS_ON_PAGE): Promise<{allCars: Car[], countAllCars: number}> => {
  const res = await fetch(`http://localhost:3000/garage?_limit=${limit}&_page=${page}`);

  return {
    allCars: await res.json(),
    countAllCars: +(res.headers.get('X-Total-Count') as string)
  };
};

export let { allCars: cars, countAllCars: count } = await getCars(pageGarage);

export const getCar = async (id: string): Promise< Record<string, string>> => {
  const res = await fetch(`http://localhost:3000/garage/${id}`);

  return await res.json();
};

export async function deleteCar(id: string): Promise< Record<string, string>> {
  const res = await fetch(`http://localhost:3000/garage/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();

  return data;
}

export const updateGarage = async (): Promise<void> => {
  const { allCars, countAllCars } = await getCars(pageGarage);
  cars = [...allCars];
  count = countAllCars;

  if (pageGarage * LIMIT_NUMBER_CARS_ON_PAGE < Number(count)) {
    (document.querySelector('.next') as HTMLButtonElement).disabled = false;
  } else {
    (document.querySelector('.next') as HTMLButtonElement).disabled = true;
  }

  if (pageGarage > 1) {
    (document.querySelector('.prev') as HTMLButtonElement).disabled = false;
  } else {
    (document.querySelector('.prev') as HTMLButtonElement).disabled = true;
  }
};

export async function createCar(body: {name: string, color: string}): Promise< Record<string, string>> {
  const res = await fetch('http://localhost:3000/garage/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return await res.json();
}

export async function updateCar(id: string): Promise< Record<string, string>> {
  const inputText = document.querySelector('.update-input-text') as HTMLInputElement;
  const title = inputText.value;
  const inputColor = document.querySelector('.update-input-color') as HTMLInputElement;
  const color = inputColor.value;
  const res = await fetch(`http://localhost:3000/garage/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: title, color })
  });
  inputText.value = '';
  inputColor.value = '#45BAB8';

  return await res.json();
}
