import { arrayAllWinners, countWinners } from '../model/manageWinners';
import { pageWinners } from '../controllers/catchEvents';
import { renderImageCar } from './renderGarage';

export function renderViewWinners(): string {
  const numberCarAndPagesInWinners = `<div class="number-winners">Winners (${countWinners})</div>
                                      <div class="number-page-winners">Page #${pageWinners}</div>
                                      <div class="winners-wrapper">${renderTableWinners()}</div>`;

  return numberCarAndPagesInWinners;
}

function renderTableWinners(): string {
  const tableWinners = `
                        <table class="table-winners">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Car</th>
                                <th>Name</th>
                                <th class="sort-wins ASC">Wins</th>
                                <th class="sort-time ASC">Best time, sec</th>
                            </tr>
                            </thead>
                            <tbody class="body-table">
                        ${renderWinners(countListPage(pageWinners))}
                        </tbody>
                        </table>
                        `;

  return tableWinners;
}

export function renderWinners(page: number): string {
  const winners = `${arrayAllWinners.map((winner, index) => ` <tr>
            <th>${page + index + 1}</th>
            <th>${renderImageCar(winner.car.color, '30')}</th>
            <th class="name-winner">${winner.car.name}</th>
            <th>${winner.wins}</th>
            <th>${winner.time}</th>
        </tr>`).join('')}`;

  return winners;
}

export async function renderUpdateWinners(): Promise<void> {
  (document.querySelector('.number-winners') as HTMLDivElement).innerHTML = `Winners (${countWinners})`;
  (document.querySelector('.number-page-winners') as HTMLDivElement).innerHTML = `Page #${pageWinners}`;
  (document.querySelector('.body-table') as HTMLBodyElement).innerHTML = `${renderWinners(countListPage(pageWinners))}`;
}

function countListPage(page: number): number {
  const limitNumberCarsOnPage = 10;

  return (page - 1) * limitNumberCarsOnPage;
}
