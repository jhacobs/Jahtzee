import { BehaviorSubject, combineLatest } from "rxjs";
import { take } from "rxjs/operators";
import { Dice } from "./dice";

export class Scoreboard {
  public one = new BehaviorSubject<number | undefined>(undefined);

  public two = new BehaviorSubject<number | undefined>(undefined);

  public three = new BehaviorSubject<number | undefined>(undefined);

  public four = new BehaviorSubject<number | undefined>(undefined);

  public five = new BehaviorSubject<number | undefined>(undefined);

  public six = new BehaviorSubject<number | undefined>(undefined);

  public threeOfAKind = new BehaviorSubject<number | undefined>(undefined);

  public fourOfAKind = new BehaviorSubject<number | undefined>(undefined);

  public fullHouse = new BehaviorSubject<number | undefined>(undefined);

  public smallStreet = new BehaviorSubject<number | undefined>(undefined);

  public bigStreet = new BehaviorSubject<number | undefined>(undefined);

  public yahtzee = new BehaviorSubject<number | undefined>(undefined);

  public chance = new BehaviorSubject<number | undefined>(undefined);

  public totalPoints = new BehaviorSubject<number>(0);

  public extraBonus = new BehaviorSubject<number | undefined>(undefined);

  public totalPartOne = new BehaviorSubject<number>(0);

  public totalPartTwo = new BehaviorSubject<number>(0);

  public grandTotal = new BehaviorSubject<number>(0);

  constructor() {
    // TODO: Unsubscribe observables
    combineLatest([this.one, this.two, this.three, this.four, this.five, this.six])
      .subscribe(([one, two, three, four, five, six]) => {
        this.totalPoints.next((one ?? 0) + (two ?? 0) + (three ?? 0) + (four ?? 0) + (five ?? 0) + (six ?? 0));

        if (this.totalPoints.value >= 63) {
          this.extraBonus.next(35);
        }
      });

    combineLatest([this.totalPoints, this.extraBonus])
      .subscribe(([totalPoints, extraBonus]) => {
        this.totalPartOne.next(totalPoints + (extraBonus || 0));
      });

    combineLatest([this.threeOfAKind, this.fourOfAKind, this.fullHouse, this.smallStreet, this.bigStreet, this.yahtzee, this.chance])
      .subscribe(([threeOfAKind, fourOfAKind, fullHouse, smallStreet, bigStreet, yahtzee, chance]) => {
        this.totalPartTwo.next(
          (threeOfAKind ?? 0)
          + (fourOfAKind ?? 0)
          + (fullHouse ?? 0)
          + (smallStreet ?? 0)
          + (bigStreet ?? 0)
          + (yahtzee ?? 0)
          + (chance ?? 0),
        );
      });

    combineLatest([this.totalPartOne, this.totalPartTwo]).subscribe(([totalPartOne, totalPartTwo]) => {
      this.grandTotal.next(totalPartOne + totalPartTwo);
    });
  }

  public calculateOne(dices: Dice[]): void {
    if (this.one.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.value$)).pipe(
      take(1),
    ).subscribe((dices) => {
      const oneDices = dices.filter((dice) => dice === 1);

      if (oneDices.length === 0) {
        this.one.next(0);
        return;
      }

      const value = oneDices.reduce((carry, current) => carry + current);

      this.one.next(value);
    });
  }

  public calculateTwo(dices: Dice[]): void {
    if (this.two.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.getValue())).pipe(
      take(1),
    ).subscribe((dices) => {
      const twoDices = dices.filter((dice) => dice === 2);

      if (twoDices.length === 0) {
        this.two.next(0);
        return;
      }

      const value = twoDices.reduce((carry, current) => carry + current);
      this.two.next(value);
    });
  }

  public calculateThree(dices: Dice[]): void {
    if (this.three.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.getValue())).pipe(
      take(1),
    ).subscribe((dices) => {
      const threeDices = dices.filter((dice) => dice === 3);

      if (threeDices.length === 0) {
        this.three.next(0);
        return;
      }

      const value = threeDices.reduce((carry, current) => carry + current);
      this.three.next(value);
    });
  }

  public calculateFour(dices: Dice[]): void {
    if (this.four.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.getValue())).pipe(
      take(1),
    ).subscribe((dices) => {
      const fourDices = dices.filter((dice) => dice === 4);

      if (fourDices.length === 0) {
        this.four.next(0);
        return;
      }

      const value = fourDices.reduce((carry, current) => carry + current);
      this.four.next(value);
    });
  }

  public calculateFive(dices: Dice[]): void {
    if (this.five.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.getValue())).pipe(
      take(1),
    ).subscribe((dices) => {
      const fiveDices = dices.filter((dice) => dice === 5);

      if (fiveDices.length === 0) {
        this.five.next(0);
        return;
      }

      const value = fiveDices.reduce((carry, current) => carry + current);
      this.five.next(value);
    });
  }

  public calculateSix(dices: Dice[]): void {
    if (this.six.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.getValue())).pipe(
      take(1),
    ).subscribe((dices) => {
      const sixDices = dices.filter((dice) => dice === 6);

      if (sixDices.length === 0) {
        this.six.next(0);
        return;
      }

      const value = dices.filter((dice) => dice === 6).reduce((carry, current) => carry + current);
      this.six.next(value);
    });
  }

  public calculateThreeOfAKind(dices: Dice[]): void {
    if (this.threeOfAKind.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.getValue())).pipe(
      take(1),
    ).subscribe((dices) => {
      dices.sort();

      for (let i = 0; i < dices.length; i++) {
        if (dices[i] === dices[i + 1] && dices[i + 1] === dices[i + 2]) {
          const value = dices.reduce((carry, current) => carry + current);
          this.threeOfAKind.next(value);

          return;
        }
      }

      this.threeOfAKind.next(0);
    });
  }

  public calculateFourOfAKind(dices: Dice[]): void {
    if (this.fourOfAKind.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.getValue())).pipe(
      take(1),
    ).subscribe((dices) => {
      dices.sort();

      for (let i = 0; i < dices.length; i++) {
        if (dices[i] === dices[i + 1] && dices[i] === dices[i + 2] && dices[i] === dices[i + 3]) {
          const value = dices.reduce((carry, current) => carry + current);
          this.fourOfAKind.next(value);

          return;
        }
      }

      this.fourOfAKind.next(0);
    });
  }

  public calculateFullHouse(dices: Dice[]): void {
    if (this.fullHouse.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.getValue())).pipe(
      take(1),
    ).subscribe((dices) => {
      dices.sort();

      for (let i = 0; i < dices.length; i++) {
        if (dices[i] === dices[i + 1] && dices[i] === dices[i + 2]) {
          const firstPart = dices[i];

          for (let i = 0; i < dices.length; i++) {
            if (dices[i] === dices[i + 1] && dices[i] !== firstPart) {
              this.fullHouse.next(25);
              return;
            }
          }
        }
      }

      this.fullHouse.next(0);
    });
  }

  public calculateSmallStreet(dices: Dice[]): void {
    if (this.smallStreet.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.getValue())).pipe(
      take(1),
    ).subscribe((dices) => {
      dices.sort();

      for (let i = 0; i < dices.length; i++) {
        if (dices[i] === 1) {
          if (dices[i + 1] === 2 || dices[i + 2] === 2) {
            if (dices[i + 2] === 3 || dices[i + 3] === 3) {
              if (dices[i + 3] === 4 || dices[i + 4] === 4) {
                this.smallStreet.next(30);
                return;
              }
            }
          }
        }

        if (dices[i] === 2) {
          if (dices[i + 1] === 3 || dices[i + 2] === 3) {
            if (dices[i + 2] === 4 || dices[i + 3] === 4) {
              if (dices[i + 3] === 5 || dices[i + 4] === 5) {
                this.smallStreet.next(30);
                return;
              }
            }
          }
        }

        if (dices[i] === 3) {
          if (dices[i + 1] === 4 || dices[i + 2] === 4) {
            if (dices[i + 2] === 5 || dices[i + 3] === 5) {
              if (dices[i + 3] === 6 || dices[i + 4] === 6) {
                this.smallStreet.next(30);
                return;
              }
            }
          }
        }
      }

      this.smallStreet.next(0);
    });
  }

  public calculateBigStreet(dices: Dice[]): void {
    if (this.bigStreet.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.getValue())).pipe(
      take(1),
    ).subscribe((dices) => {
      dices.sort();

      for (let i = 0; i < dices.length; i++) {
        if (dices[i] === 1) {
          if (dices[i + 1] === 2 && dices[i + 2] === 3 && dices[i + 3] === 4 && dices[i + 4] === 5) {
            this.bigStreet.next(40);
            return;
          }
        }

        if (dices[i] === 2) {
          if (dices[i + 1] === 3 && dices[i + 2] === 4 && dices[i + 3] === 5 && dices[i + 4] === 6) {
            this.bigStreet.next(40);
            return;
          }
        }
      }

      this.bigStreet.next(0);
    });
  }

  public calculateYahtzee(dices: Dice[]): void {
    if (this.yahtzee.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.getValue())).pipe(
      take(1),
    ).subscribe((dices) => {
      if (dices.every((dice) => dice === dices[0])) {
        this.yahtzee.next(50);
        return;
      }

      this.yahtzee.next(0);
    });
  }

  public calculateChance(dices: Dice[]): void {
    if (this.chance.value !== undefined) {
      return;
    }

    combineLatest(dices.map((dice) => dice.getValue())).pipe(
      take(1),
    ).subscribe((dices) => {
      const value = dices.reduce((carry, current) => carry + current);
      this.chance.next(value);
    });
  }
}
