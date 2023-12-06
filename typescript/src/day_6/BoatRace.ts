import { FileReader } from '../helpers';
const fileReader = new FileReader('input.txt');

class BoatRace {
  async part_one(): Promise<number> {
    const lines = await fileReader.readLines();

    // Mapping race data
    const numberRegex = /[0-9]+/dg;
    const raceRecord: Map<number, number> = new Map();
    const times = [...lines[0].matchAll(numberRegex)].map((num) => parseInt(num[0]));
    const distances = [...lines[1].matchAll(numberRegex)].map((num) => parseInt(num[0]));

    for (const time of times) {
      raceRecord.set(time, distances.shift() || 0);
    }

    let winningMargin = 1;
    for (const time of times) {
      let speed = 0;
      let timeToTravel = time;

      let wins = 0;
      while (timeToTravel > 0) {
        speed += 1;
        timeToTravel -= 1;

        const distance = speed * timeToTravel;

        const record = raceRecord.get(time);
        if (record) {
          if (distance > record) wins += 1;
        }
      }

      if (wins > 0) {
        winningMargin = winningMargin * wins;
      }
    }

    return winningMargin;
  }

  async part_two(): Promise<number> {
    const lines = await fileReader.readLines();

    const numberRegex = /[0-9]+/dg;
    let time: string | number = '';
    let record: string | number = '';

    for (const match of lines[0].matchAll(numberRegex)) {
      time += match[0];
    }
    for (const match of lines[1].matchAll(numberRegex)) {
      record += match[0];
    }

    time = parseInt(time);
    record = parseInt(record);

    let winningMargin = 1;

    let speed = 0;
    let timeToTravel = time;
    let wins = 0;

    while (timeToTravel > 0) {
      speed += 1;
      timeToTravel -= 1;

      const distance = speed * timeToTravel;

      if (record > 0) {
        if (distance > record) wins += 1;
      }
    }

    if (wins > 0) {
      winningMargin = winningMargin * wins;
    }

    return winningMargin;
  }
}

const solutions = new BoatRace();
solutions.part_one().then((result) => console.log('Part one: ', result));
solutions.part_two().then((result) => console.log('Part two: ', result));
