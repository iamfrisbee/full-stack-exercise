import { expect } from 'chai';
import { calculateSecret, fillGrid, resetLetter, setLetter, values } from '../calculations.js';

describe('Calculations', () => {
  beforeEach(() => {
    resetLetter();
    fillGrid();
  });

  describe('setLetter', () => {
    it('should set the values.letter and values.letterExpiration', () => {
      const grid = values.grid;
      const updatedGrid = setLetter('a');
      expect(values.letter).to.equal('a');
      expect(values.letterExpiration).to.be.a('Date');
      expect(updatedGrid).not.to.deep.equal(grid);
    });

    it('should return the prior grid value if called within 4 seconds', () => {
      setLetter('a');
      const grid = values.grid;
      setLetter('b');
      expect(grid).to.deep.equal(values.grid);
    });
  });

  describe('fillGrid', () => {
    it('should return a 10 rows of 10 lowercase letters', () => {
      const result = fillGrid();
      expect(result).to.have.lengthOf(10);
      result.forEach((row) => {
        expect(row).to.have.lengthOf(10);
        row.forEach((cell) => {
          expect(cell).to.match(/[a-z]/);
        });
      });
    });

    it('should return a different grid each time', () => {
      const result1 = fillGrid();
      const result2 = fillGrid();
      expect(result1).to.not.deep.equal(result2);
    });

    it('should store the last grid in lastGrid', () => {
      const result = fillGrid();
      expect(result).to.deep.equal(values.grid);
    });

    it('should set the values.letter to 20 occurrences', () => {
      setLetter('a');
      const result = fillGrid();
      const count = result.flat().filter((cell) => cell === 'a').length;
      expect(count).to.equal(20);
    });
  });

  describe('calculateSecret', () => {
    it('should return a number based on the current time', () => {
      const result = calculateSecret();
      expect(+result).to.be.a('number');
      expect(+result).to.be.within(0, 99);
      expect(result).to.have.lengthOf(2);
    });
  });
});
