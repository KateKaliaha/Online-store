import { cars } from '../model/manageGarage';
import {Car} from '../views/renderGarage';

let request = 0;

// const a = {id: cars.id as string, request: 0};

async function startEngine(id:string) {
    const res = await fetch (`http://localhost:3000/engine?id=${id}&status=started`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return (await res.json());
}

async function stopEngine(id:string) {
    const res = await fetch (`http://localhost:3000/engine?id=${id}&status=stopped`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return (await res.json());
}

async function driveCar(id:string) {
    const res = await fetch (`http://localhost:3000/engine?id=${id}&status=drive`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch();

    if (res.status === 200) {
        return {...await res.json()};
    } else {
        return {'success':false};
    }
}

export async function startRace(id:string) {
    const startButton = document.getElementById(`start-btn-${id}`) as HTMLButtonElement;
    const finishButton = document.getElementById(`finish-btn-${id}`) as HTMLButtonElement;
    const car = document.getElementById(`image-car-${id}`) as HTMLDivElement;
    startButton.disabled = true;
    const {velocity, distance} = await startEngine(id);
    const timeRace = Math.round(distance / velocity);
    finishButton.disabled = false;

    animation(car, timeRace, id);

    const {success} = await driveCar(id);

    if (success === false) {
        window.cancelAnimationFrame(request );
    }

    return { id, success, timeRace};
}

export async function stopRace(id:string) {
    const startButton = document.getElementById(`start-btn-${id}`) as HTMLButtonElement;
    const finishButton = document.getElementById(`finish-btn-${id}`) as HTMLButtonElement;
    const car = document.getElementById(`image-car-${id}`) as HTMLDivElement;
    finishButton.disabled = true;

    if (request) {
        window.cancelAnimationFrame(request);
    }

    await stopEngine(id);
    car.style.transform = 'translateX(0px)';
    startButton.disabled = false;
}

export function animation(car:HTMLDivElement,duration:number, id:string) {

    // const car = document.getElementById(`image-car-${id}`) as HTMLDivElement;
    const flag = document.getElementById(`flag-${id}`) as HTMLDivElement;
    const endPoint = flag.offsetLeft- 25;
    let currentPositionCar: number = car.offsetLeft;
    const framesCount = duration / 1000 * 60;
    const movePerOneFrame = (endPoint - (car as HTMLElement).offsetLeft) / framesCount;
    let startTime = 0;

    function stepAnimation(timestamp:number) {
        if (!startTime) {
            startTime = timestamp;
        }

        const progress = timestamp - startTime;
        currentPositionCar += movePerOneFrame;
        car.style.transform = `translateX(${currentPositionCar}px)`;

        if (progress < duration) {
            request = window.requestAnimationFrame(stepAnimation);
        }
    }

    request = window.requestAnimationFrame(stepAnimation);

    return request;
}

export async function raceAllCars() {
    cars.map((car:Car) => {startRace((car.id).toString());});
}

