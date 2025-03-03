type GridResult = string[][];

interface Values {
  grid: GridResult;
  letter: string;
  letterExpiration: Date;
  secret: string;
}

// local state values
export const values: Values = {
  grid: [],
  letter: '',
  letterExpiration: new Date(),
  secret: '',
};

// reset letter and expiration; used for testing
export function resetLetter() {
  values.letter = '';
  values.letterExpiration.setSeconds(values.letterExpiration.getSeconds() - 5);
}

/**
 * Sets a letter in the grid and returns the grid with 20%
 * of the letters being the same as the letter.
 * @param letter the letter to set in the grid
 * @returns the grid with 20% of the letters being the same as the letter
 */
export function setLetter(letter: string) {
  // if the last letter hasn't expired, return the grid
  if (new Date() <= values.letterExpiration) {
    return values.grid;
  }

  // set the letter and expiration
  values.letter = letter;
  values.letterExpiration = new Date();
  values.letterExpiration.setSeconds(values.letterExpiration.getSeconds() + 4);

  // fill the grid with random letters
  return fillGrid();
}

/**
 * Calculates the secret based on the current grid and the current second.
 * @param secs the current second to use for the calculation
 * @returns the secret
 */
export function calculateSecret(
  secs: number = new Date().getSeconds()
): string {
  // get the last two digits of the current second
  const [c1, c2] = `0${secs}`.slice(-2).split('').map(Number);
  // get the two letters from the grid
  const needle = [values.grid[c1][c2], values.grid[c2][c1]];
  // calculate the secret
  return needle.map((n) => lessThan9(countOccurrences(n))).join('');
}

/**
 * Fills the grid with random letters and ensures that 20% of the letters
 * are the same as the letter if a letter is set.
 * @returns the grid of random letters
 */
export function fillGrid(): GridResult {
  // fill the grid with random letters
  values.grid = [...Array(10).keys()].map(() =>
    [...Array(10).keys()].map(randomLetter)
  );

  // ensure 20% of the letters are the choosen letter
  fix20(values.letter);

  // return the grid
  return values.grid;
}

/**
 * Returns a random letter from 'a' to 'z'.
 * @returns a random letter
 */
function randomLetter(): string {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

/**
 * Ensures that 20% of the grid is the same as the letter.
 * @param letter the letter to ensure 20% of the grid is the same as
 */
function fix20(letter: string) {
  // if no letter is set, return
  if (!letter) {
    return;
  }

  // get the count of the letter
  const count = countOccurrences(letter);
  // get the remaining count to reach
  const remaining = 20 - count;

  // if there are fewer than 20% of the letter, add more
  if (remaining > 0) {
    addLetters(letter, remaining);
  }

  // if there are more than 20% of the letter, remove some
  if (remaining < 0) {
    removeLetters(letter, Math.abs(remaining));
  }
}

/**
 * Replace letters in the grid with random letters.
 * @param letter the letter to replace
 * @param remaining the number of letters to replace
 */
function removeLetters(letter: string, remaining: number) {
  // get the occurrences of the letter
  const occurrences = getOccurrences(letter);

  // a count of replacements remaining
  let replacements = 0;

  // remove the remaining number of letters
  while (replacements < remaining) {
    // determine which occurrence to remove
    const toRemove = Math.floor(Math.random() * occurrences.length);

    // remove
    const [r, c] = occurrences.splice(toRemove, 1)[0];

    // replace with a random letter
    while (values.grid[r][c] === letter) {
      values.grid[r][c] = randomLetter();
    }

    // increment the count of replacements
    replacements++;
  }
}

/**
 * Adds letters to the grid.
 * @param letter the letter to add
 * @param remaining the number of letters to add
 */
function addLetters(letter: string, remaining: number) {
  // add the remaining number of letters
  [...Array(remaining).keys()].forEach(() => {
    // get a random cell
    let [r, c] = getRandomCell();
    // find a cell that is not the letter
    while (values.grid[r][c] === letter) {
      [r, c] = getRandomCell();
    }

    // set the letter
    values.grid[r][c] = letter;
  });
}

/**
 * Returns a random cell in the grid.
 * @returns a random cell
 */
function getRandomCell(): [number, number] {
  return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
}

/**
 * Returns the occurrences of a letter in the grid.
 * @param letter the letter to find
 * @returns the occurrences of the letter
 */
function getOccurrences(letter: string): [number, number][] {
  // initialize the result
  const result: [number, number][] = [];

  // find the occurrences
  values.grid.forEach((row, ri) =>
    row.forEach((cell, ci) => {
      if (cell === letter) {
        result.push([ri, ci]);
      }
    })
  );

  return result;
}

/**
 * Returns the count of occurrences of a value in the grid.
 * @param value the value to count
 * @returns the count of occurrences
 */
function countOccurrences(value: string): number {
  return values.grid.flat().filter((c) => c === value).length;
}

/**
 * Returns a number that is less than 9.
 * @param value the value to reduce
 * @returns a number that is less than 9
 */
function lessThan9(value: number): number {
  // if the value is less than or equal to 9, return it
  if (value <= 9) {
    return value;
  }

  // determine the largest divisor that is less than or equal to 9
  const divisor = Math.ceil(value / 9);

  // return the value divided by the divisor and rounded
  return Math.round(value / divisor);
}
