import { FileReader } from '../helpers';

const fileReader = new FileReader('input.txt');

class Scratchcards {
  async part_one(): Promise<number> {
    const lines: Array<string> = await fileReader.readLines();

    let pricesSum = 0;
    for (const line of lines) {
      const [card, scratchedNumbers] = line.split(' | ');
      const cardNumbers = card.split(': ')[1];

      const numberRegex = /[0-9]+/dg;
      const winningNumbers: Set<string> = new Set();
      for (const winningNumber of cardNumbers.matchAll(numberRegex)) {
        winningNumbers.add(winningNumber[0]);
      }

      let price = 0;
      for (const number of scratchedNumbers.matchAll(numberRegex)) {
        if (winningNumbers.has(number[0])) {
          if (price === 0) {
            price = 1;
          } else {
            price = price * 2;
          }
        }
      }

      pricesSum = pricesSum + price;
    }

    return pricesSum;
  }

  /* This solution is too slow, I need to find a way to optimize it. */
  async part_two(): Promise<number> {
    const lines: Array<string> = await fileReader.readLines();

    const cards: Array<number> = new Array(lines.length).fill(1);

    // cc = current card
    for (let cc = 0; cc < lines.length; cc++) {
      const [card, scratchedNumbers] = lines[cc].split(' | ');
      const cardNumbers = card.split(': ')[1];

      const numberRegex = /[0-9]+/dg;
      const winningNumbers: Set<string> = new Set();
      for (const winningNumber of cardNumbers.matchAll(numberRegex)) {
        winningNumbers.add(winningNumber[0]);
      }

      let cardsWon = 0;
      for (let copy = 1; copy <= cards[cc]; copy++) {
        for (const number of scratchedNumbers.matchAll(numberRegex)) {
          if (winningNumbers.has(number[0])) {
            cardsWon++;
          }
        }
        while (cardsWon > 0) {
          if (lines[cc + cardsWon].length) {
            cards[cc + cardsWon]++;
          }
          cardsWon--;
        }
      }
    }

    return cards.reduce((sum, cards) => (sum += cards), 0);
  }
}

const scratchcards = new Scratchcards();
scratchcards.part_one().then((result) => console.log('Part one: ', result));
scratchcards.part_two().then((result) => console.log('Part two: ', result));
