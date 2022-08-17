import { renderPageGarage } from './renderGarage';
import { renderViewWinners } from './renderWinnersPage';

export function renderAllBlocks(): void {
  (document.querySelector('body') as HTMLBodyElement).innerHTML = `
    <div class="page-btn-wrapper">
      <button class="to-garage">TO GARAGE</button>
      <button class="to-winners">TO WINNERS</button>
    </div>
    <div class="garage-view">${renderPageGarage()}</div>
    <div class="message" id="message"></div>
    <div class="winners-view">${renderViewWinners()}</div>


    <div class="page-switch-btn-wrapper">
      <button class="prev">PREV</button>
        <button class="next">NEXT</button>
    </div>`;
}

export async function renderApp(): Promise<void> {
  (document.querySelector('.garage-view') as HTMLBodyElement).innerHTML = `${renderPageGarage()}`;
}
