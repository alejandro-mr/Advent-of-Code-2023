import { FileReader } from '../helpers';

const fileReader = new FileReader('input.txt');

class CubeConundrum {
  async part_one(): Promise<number> {
    const values: Array<string> = await fileReader.readLines();

    const maxCubesPerColor: Map<string, number> = new Map([
      ['red', 12],
      ['green', 13],
      ['blue', 14],
    ]);

    let games: Array<number> = [];

    game: for (let line of values) {
      const gameInfo = line.split(':');
      const gameId = parseInt(gameInfo[0].split('Game ')[1]);
      const plays = gameInfo[1].trim().split(';');

      for (let play of plays) {
        const cubes = play.trim().split(',');
        for (let cube of cubes) {
          const cubeInfo = cube.trim().split(' ');
          const color = cubeInfo[1];
          const amount = parseInt(cubeInfo[0]);

          if (isNaN(amount)) continue game;
          if (!maxCubesPerColor.has(color)) continue game;

          const max = maxCubesPerColor.get(color) || 0;
          if (max < amount) continue game;
        }
      }

      games = [...games, gameId];
    }

    return games.reduce((sum, id) => (sum += id), 0);
  }

  async part_two(): Promise<number> {
    const values = await fileReader.readLines();

    let powerSum = 0;

    for (let line of values) {
      const gameInfo = line.split(':');
      const gameId = parseInt(gameInfo[0].split('Game ')[1]);
      const plays = gameInfo[1].trim().split(';');

      const minCubes: Map<string, number> = new Map([
        ['red', 0],
        ['green', 0],
        ['blue', 0],
      ]);

      for (let play of plays) {
        const cubes = play.trim().split(',');
        for (let cube of cubes) {
          const cubeInfo = cube.trim().split(' ');
          const color = cubeInfo[1];
          const amount = parseInt(cubeInfo[0]);

          if (!minCubes.has(color)) return -1;

          const biggest = minCubes.get(color) || 0;
          minCubes.set(color, biggest > amount ? biggest : amount);
        }
      }

      powerSum += Array.from(minCubes.values()).reduce((power, value) => (power = power * value), 1);
    }

    return powerSum;
  }
}

const cubeConundrum = new CubeConundrum();
cubeConundrum.part_one().then((result) => console.log('Part One: ', result));
cubeConundrum.part_two().then((result) => console.log('Part Two: ', result));
