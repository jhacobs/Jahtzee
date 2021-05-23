import { fromEvent, Subject } from "rxjs";
import {
  filter, switchMap, take, takeUntil,
} from "rxjs/operators";
import { Dice } from "./dice";
import { Scoreboard } from "./scoreboard";

export class Game {
  private stopGame = new Subject<boolean>();

  private dices: { [key: number]: Dice } = {};

  private totalRolls = 0;

  private scoreboard: Scoreboard = new Scoreboard();

  public start(): void {
    this.initDices();
    this.handleDiceRolls();
    this.scoreboard = new Scoreboard();
    this.handleScoreboardActions();
  }

  public stop(): void {
    this.stopGame.next(true);
  }

  private initDices(): void {
    for (let i = 0; i <= 5; i++) {
      const element = document.getElementById(`dice${i}`);
      const lockElement = document.getElementById(`dice${i}-lock`);

      if (!element || !lockElement) {
        continue;
      }

      const dice = new Dice(element, lockElement);

      dice.getValue().pipe(
        takeUntil(this.stopGame),
      ).subscribe((value) => this.setDiceValueInView(value, dice.getElement()));

      dice.locked().pipe(
        takeUntil(this.stopGame),
      ).subscribe((locked) => this.toggleDiceInView(dice, locked));

      fromEvent(dice.getElement(), "click").pipe(
        takeUntil(this.stopGame),
        switchMap(() => dice.locked().pipe(take(1))),
      ).subscribe((locked) => (locked ? dice.unlock() : dice.lock()));

      this.dices[i] = dice;
    }
  }

  private setDiceValueInView(value: number, element: HTMLElement): void {
    element.innerText = value.toString();
  }

  private handleDiceRolls(): void {
    const element = document.getElementById("roll-dices");

    if (!element) {
      return;
    }

    fromEvent(element, "click").pipe(
      takeUntil(this.stopGame),
    ).subscribe(() => {
      if (this.totalRolls > 2) {
        return;
      }

      this.totalRolls++;

      for (const index in this.dices) {
        this.dices[index].roll();
      }
    });
  }

  private toggleDiceInView(dice: Dice, locked: boolean): void {
    if (locked) {
      dice.getLockElement().style.display = "block";
    } else {
      dice.getLockElement().style.display = "none";
    }
  }

  private resetDices(): void {
    for (const dice of Object.values(this.dices)) {
      dice.reset();
      this.totalRolls = 0;
    }
  }

  private handleScoreboardActions(): void {
    const one = document.getElementById("scoreboard-one");
    const two = document.getElementById("scoreboard-two");
    const three = document.getElementById("scoreboard-three");
    const four = document.getElementById("scoreboard-four");
    const five = document.getElementById("scoreboard-five");
    const six = document.getElementById("scoreboard-six");
    const threeOfAKind = document.getElementById("scoreboard-three-of-a-kind");
    const fourOfAKind = document.getElementById("scoreboard-four-of-a-kind");
    const fullhouse = document.getElementById("scoreboard-fullhouse");
    const smallStreet = document.getElementById("scoreboard-small-street");
    const bigStreet = document.getElementById("scoreboard-big-street");
    const yahtzee = document.getElementById("scoreboard-yahtzee");
    const chance = document.getElementById("scoreboard-chance");
    const totalPoints = document.getElementById("scoreboard-total-points");
    const extraBonus = document.getElementById("scoreboard-extra-bonus");
    const total1 = document.getElementById("scoreboard-total-1");
    const total2 = document.getElementById("scoreboard-total-2");
    const grandTotal = document.getElementById("scoreboard-grand-total");

    if (one) {
      fromEvent(one, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateOne(Object.values(this.dices));
      });

      this.scoreboard.one.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const oneValue = document.querySelector("#scoreboard-one .value");

        if (oneValue) {
          oneValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (two) {
      fromEvent(two, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateTwo(Object.values(this.dices));
      });

      this.scoreboard.two.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const twoValue = document.querySelector("#scoreboard-two .value");

        if (twoValue) {
          twoValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (three) {
      fromEvent(three, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateThree(Object.values(this.dices));
      });

      this.scoreboard.three.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const threeValue = document.querySelector("#scoreboard-three .value");

        if (threeValue) {
          threeValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (four) {
      fromEvent(four, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateFour(Object.values(this.dices));
      });

      this.scoreboard.four.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const fourValue = document.querySelector("#scoreboard-four .value");

        if (fourValue) {
          fourValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (five) {
      fromEvent(five, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateFive(Object.values(this.dices));
      });

      this.scoreboard.five.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const fiveValue = document.querySelector("#scoreboard-five .value");

        if (fiveValue) {
          fiveValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (six) {
      fromEvent(six, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateSix(Object.values(this.dices));
      });

      this.scoreboard.six.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const sixValue = document.querySelector("#scoreboard-six .value");

        if (sixValue) {
          sixValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (threeOfAKind) {
      fromEvent(threeOfAKind, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateThreeOfAKind(Object.values(this.dices));
      });

      this.scoreboard.threeOfAKind.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const threeOfAKindValue = document.querySelector("#scoreboard-three-of-a-kind .value");

        if (threeOfAKindValue) {
          threeOfAKindValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (fourOfAKind) {
      fromEvent(fourOfAKind, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateFourOfAKind(Object.values(this.dices));
      });

      this.scoreboard.fourOfAKind.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const fourOfAKindValue = document.querySelector("#scoreboard-four-of-a-kind .value");

        if (fourOfAKindValue) {
          fourOfAKindValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (fullhouse) {
      fromEvent(fullhouse, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateFullHouse(Object.values(this.dices));
      });

      this.scoreboard.fullHouse.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const fullHouseValue = document.querySelector("#scoreboard-fullhouse .value");

        if (fullHouseValue) {
          fullHouseValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (smallStreet) {
      fromEvent(smallStreet, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateSmallStreet(Object.values(this.dices));
      });

      this.scoreboard.smallStreet.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const smallStreetValue = document.querySelector("#scoreboard-small-street .value");

        if (smallStreetValue) {
          smallStreetValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (bigStreet) {
      fromEvent(bigStreet, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateBigStreet(Object.values(this.dices));
      });

      this.scoreboard.bigStreet.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const bigStreetValue = document.querySelector("#scoreboard-big-street .value");

        if (bigStreetValue) {
          bigStreetValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (yahtzee) {
      fromEvent(yahtzee, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateYahtzee(Object.values(this.dices));
      });

      this.scoreboard.yahtzee.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const yahtzeeValue = document.querySelector("#scoreboard-yahtzee .value");

        if (yahtzeeValue) {
          yahtzeeValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (chance) {
      fromEvent(chance, "click").pipe(
        takeUntil(this.stopGame),
        filter(() => this.totalRolls === 3),
      ).subscribe(() => {
        this.scoreboard.calculateChance(Object.values(this.dices));
      });

      this.scoreboard.chance.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const chanceValue = document.querySelector("#scoreboard-chance .value");

        if (chanceValue) {
          chanceValue.innerHTML = value.toString();
        }

        this.resetDices();
      });
    }

    if (totalPoints) {
      this.scoreboard.totalPoints.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const totalPointsValue = document.querySelector("#scoreboard-total-points .value");

        if (totalPointsValue) {
          totalPointsValue.innerHTML = value.toString();
        }
      });
    }

    if (extraBonus) {
      this.scoreboard.extraBonus.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const extraBonusValue = document.querySelector("#scoreboard-extra-bonus .value");

        if (extraBonusValue) {
          extraBonusValue.innerHTML = value.toString();
        }
      });
    }

    if (total1) {
      this.scoreboard.totalPartOne.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const total1Value = document.querySelector("#scoreboard-total-1 .value");

        if (total1Value) {
          total1Value.innerHTML = value.toString();
        }
      });
    }

    if (total2) {
      this.scoreboard.totalPartTwo.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        console.log(value);
        if (value === undefined) {
          return;
        }

        const total2Value = document.querySelector("#scoreboard-total-2 .value");

        if (total2Value) {
          total2Value.innerHTML = value.toString();
        }
      });
    }

    if (grandTotal) {
      this.scoreboard.grandTotal.pipe(
        takeUntil(this.stopGame),
        filter((value) => value !== undefined),
      ).subscribe((value) => {
        if (value === undefined) {
          return;
        }

        const grandTotalValue = document.querySelector("#scoreboard-grand-total .value");

        if (grandTotalValue) {
          grandTotalValue.innerHTML = value.toString();
        }
      });
    }
  }
}
