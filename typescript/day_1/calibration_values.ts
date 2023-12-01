const INPUT_PATH = "input.txt";

class CalibrationValues {
  wordToNumber: Map<string, string>;

  constructor() {
    this.wordToNumber = new Map([
      ["one", "1"],
      ["two", "2"],
      ["three", "3"],
      ["four", "4"],
      ["five", "5"],
      ["six", "6"],
      ["seven", "7"],
      ["eight", "8"],
      ["nine", "9"],
    ]);
  }

  async readInput(): Promise<string> {
    const input = Bun.file(INPUT_PATH);
    const inputData = await input.text();

    return inputData;
  }

  async readInputByLines(): Promise<Array<string>> {
    const inputData = await this.readInput();
    return inputData.trim().split("\n");
  }

  async part_one(): Promise<number> {
    const values = await this.readInput();

    let firstValue: string | null = null;
    let lastValue: string | null = null;

    let sum = 0;

    /*
     * Extra solution going line by line instead of by char,
     * using two helper functions to get first and last number.
     *
     * for (let line of values) {
     *   let first = getFirstNumberChar(line);
     *   let last = getLastNumberChar(line);
     *   calibrationValues.push(parseInt(first + last));
     *   sum += parseInt(first + last);
     * }
     */

    for (let i = 0; i < values.length; i++) {
      let calibration = values[i];

      let num = parseInt(calibration);
      if (!isNaN(num) && num >= 0) {
        if (!firstValue) {
          firstValue = calibration;
        }
        lastValue = calibration;
      }

      if (calibration.charCodeAt(0) === 10) {
        if (firstValue && lastValue) {
          sum += parseInt(firstValue + lastValue);
        }

        firstValue = null;
        lastValue = null;
      }
    }

    return sum;
  }

  async part_two(): Promise<number> {
    /*
     * To make it work on O(n) time, I need to find a way to look for windows of 3 to 5 chars
     * matching the length of the keys in wordToNumber. Seems complicated
     * the easiest solution for now is replacing any word match to it's corresponding number
     * reading by lines instead of char by char
     */
    const lines = await this.readInputByLines();

    // let calibrationValues: Array<number> = [];

    let sum = 0;

    for (let line of lines) {
      let replaced = new Array(line.length);

      for (const [word, num] of this.wordToNumber) {
        for (const match of line.matchAll(new RegExp(word, "g"))) {
          if (match.index !== undefined && match.index >= 0) {
            replaced[match.index] = num;
          }
        }
      }

      for (let i = 0; i < line.length; i++) {
        let calibration = line[i];

        let num = parseInt(calibration);
        if (!isNaN(num) && num >= 0) {
          replaced[i] = calibration;
        }
      }

      replaced = replaced.filter((value) => value > 0);

      /*
      calibrationValues.push(
        parseInt(replaced[0] + replaced[replaced.length - 1]),
      );
      */
      sum += parseInt(replaced[0] + replaced[replaced.length - 1]);
    }

    // console.log(calibrationValues);

    return sum;
  }

  getFirstNumberChar(line: string): string {
    for (let char of line) {
      if (!isNaN(parseInt(char))) return char;
    }

    return "0";
  }

  getLastNumberChar(line: string): string {
    for (let i = line.length; i >= 0; i--) {
      if (!isNaN(parseInt(line[i]))) return line[i];
    }

    return "0";
  }
}

const calibrationValues = new CalibrationValues();
calibrationValues
  .part_one()
  .then((result) => console.log("Part One: ", result));
calibrationValues
  .part_two()
  .then((result) => console.log("Part Two: ", result));
