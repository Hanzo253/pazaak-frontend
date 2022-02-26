import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pazaak-board',
  templateUrl: './pazaak-board.component.html',
  styleUrls: ['./pazaak-board.component.css']
})
export class PazaakBoardComponent implements OnInit {

  mainDeck: Array<number> = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10];

  testDeck: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  randomIndex: any;
  randomNum: any;

  playerGrid: Array<number> = [];
  computerGrid: Array<number> = [];
  playerTurn: boolean = true;

  constructor() { }

  randomizeNum(max: number) {
    return Math.floor(Math.random() * max);
  }

  startGame(): void {
    this.randomIndex = this.randomizeNum(this.mainDeck.length);
    this.randomNum = this.mainDeck[this.randomIndex];
    this.playerGrid.push(this.randomNum);
    this.mainDeck.splice(this.randomIndex, 1);
    this.playerTurn = false;
  }

  endGame(): void {
    this.randomIndex = this.randomizeNum(this.mainDeck.length);
    this.randomNum = this.mainDeck[this.randomIndex];
    if (this.playerTurn) {
      this.playerGrid.push(this.randomNum);
      this.mainDeck.splice(this.randomIndex, 1);
      this.playerTurn = false;
    } else {
      this.computerGrid.push(this.randomNum);
      this.mainDeck.splice(this.randomIndex, 1);
      this.playerTurn = true;
    }
  }

  ngOnInit(): void {
  }

}
