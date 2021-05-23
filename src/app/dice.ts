import { BehaviorSubject, Observable } from "rxjs";

export class Dice {
  public value$ = new BehaviorSubject<number>(0);

  private locked$ = new BehaviorSubject<boolean>(false);

  private element: HTMLElement;

  private lockElement: HTMLElement

  constructor(element: HTMLElement, lockElement: HTMLElement) {
    this.element = element;
    this.lockElement = lockElement;
  }

  public getValue(): Observable<number> {
    return this.value$.asObservable();
  }

  public roll(): number {
    if (this.locked$.value) {
      return 0;
    }

    const number = Math.floor(Math.random() * 6) + 1;

    this.value$.next(number);

    return number;
  }

  public reset(): void {
    this.value$.next(0);
  }

  public valid(): boolean {
    return this.value$.value !== 0;
  }

  public lock(): void {
    this.locked$.next(true);
  }

  public unlock(): void {
    this.locked$.next(false);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public getLockElement(): HTMLElement {
    return this.lockElement;
  }

  public locked(): Observable<boolean> {
    return this.locked$.asObservable();
  }
}
