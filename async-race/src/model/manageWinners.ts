import { sortBy, sortOrder, pageWinners} from '../controllers/catchEvents';
import { Car } from '../views/renderGarage';
import { getCar } from './manageGarage';
import { WinCar } from './race';

interface Winners {
    id: number,
    time: number,
    wins: string,
    car: {
        color: string,
        id: number,
        name: string,
    }
}

export let arrayAllWinners:Winners[] = [{car: {name: 'Tesla', color: '#3232c3', id: 1}, id: 1, time: 2.69, wins: '2'}];
export let countWinners:string;

export async function addWinner({ win, time} : { win: Car, time:number}) {
    const winnerStatus = await getWinnerStatus((win.id as number).toString());
    const errorWinnerStatus = 404;

    if (winnerStatus === errorWinnerStatus) {
        await createWinner ({
            id:(win.id as number),
            wins:'1',
            time:time
        });
    } else {
        const winner:WinCar = await getWinner((win.id as number).toString());
        await updateWinner((win.id as number).toString(), {
            id: winner.id,
            wins: (+winner.wins + 1).toString(),
            time: time < winner.time ? time : winner.time
        });
    }
}

async function getWinnerStatus(id:string) {
    const res = await fetch(`http://localhost:3000/winners/${id}`);

    return res.status;
}

async function getWinner(id:string) {
    const res = await fetch(`http://localhost:3000/winners/${id}`);

    return await res.json();
}

async function updateWinner(id:string, body:WinCar) {
    const updateWinner = await fetch(`http://localhost:3000/winners/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    return updateWinner;
}

async function createWinner(body:WinCar) {
    const createWinner = await fetch('http://localhost:3000/winners/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    return createWinner;
}

export const getWinners = async (page: number, sort='id', order='asc'): Promise<{winners:Winners[], countAllWinners:string}> => {
    const res = await fetch(`http://localhost:3000/winners?_page=${page}&_limit=10&_sort=${sort}&_order=${order}`);

    const winnerCars = await res.json();

    return {winners: await Promise.all(winnerCars.map(async (winner: WinCar) => ({...winner, car: await getCar((winner.id).toString())}))),
     countAllWinners: (res.headers.get('X-Total-Count') as string)};
};

export async function updateWinners() {
        const {winners, countAllWinners} : {winners:Winners[], countAllWinners:string} = await getWinners(pageWinners, sortBy, sortOrder);
        arrayAllWinners = winners;
        countWinners = countAllWinners;
        const limitNumberWinnersOnPage = 10;

        if (+pageWinners * limitNumberWinnersOnPage < Number(countWinners)) {
            (document.querySelector('.next') as HTMLButtonElement).disabled = false;
        } else {
            (document.querySelector('.next') as HTMLButtonElement).disabled = true;
        }

        if (+pageWinners > 1) {
            (document.querySelector('.prev') as HTMLButtonElement).disabled = false;
        } else {
            (document.querySelector('.prev') as HTMLButtonElement).disabled = true;
        }
}

export async function deleteWinner(id:string) {
    const res = await fetch(`http://localhost:3000/winners/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();

    return data;
}