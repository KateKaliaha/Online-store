import { renderCar, renderNumberCarAndPage } from '../views/createCars';

const carsWrapper = document.querySelector('.cars-wrapper') as HTMLDivElement;
const countWrapper = document.querySelector('.count-wrapper') as HTMLDivElement;
const numberPage = 1;

export const getCars = async () => {
    const res = await fetch('http://localhost:3000/garage/');
    const data = await res.json();
    renderCar(data, carsWrapper);

    //Delete car
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach((btn) => btn.addEventListener('click', () => deleteCar(getIdCar(btn as Element) as string)));
};

export const getHead = async () => {
    const res = await fetch('http://localhost:3000/garage?_limit=10', {
        method: 'HEAD',
    });
    const numberCarInGarage = res.headers.get('X-Total-Count');
    renderNumberCarAndPage(numberCarInGarage as string, numberPage, countWrapper);
};

async function deleteCar(id:string) {
    const res = await fetch (`http://localhost:3000/garage/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();

    if (data) {
        document.getElementById(`${id}`)?.remove();
    }
}

function getIdCar(btn:Element) {
    const parent = btn.parentElement?.parentElement;
    const id = parent?.getAttribute('id');

    return id;
}
