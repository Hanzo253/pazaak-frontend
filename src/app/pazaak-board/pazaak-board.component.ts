import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pazaak-board',
  templateUrl: './pazaak-board.component.html',
  styleUrls: ['./pazaak-board.component.css']
})
export class PazaakBoardComponent implements OnInit {

  mainDeck: Array<number> = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10];

  testDeck: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  randomPlayerIndex: any;
  randomPlayerNum: any;
  randomComputerIndex: any;
  randomComputerNum: any;

  playerGrid: Array<number> = [];
  computerGrid: Array<number> = [];
  playerTurn: boolean = true;

  constructor() { }

  randomizeNum(max: number) {
    return Math.floor(Math.random() * max);
  }

  startGame(): void {
    this.randomPlayerIndex = this.randomizeNum(this.mainDeck.length);
    this.randomPlayerNum = this.mainDeck[this.randomPlayerIndex];
    this.playerGrid.push(this.randomPlayerNum);
    this.mainDeck.splice(this.randomPlayerIndex, 1);
    this.playerTurn = false;
  }

  endTurn(): void {
    this.randomPlayerIndex = this.randomizeNum(this.mainDeck.length);
    this.randomPlayerNum = this.mainDeck[this.randomPlayerIndex];
    this.randomComputerIndex = this.randomizeNum(this.mainDeck.length);
    this.randomComputerNum = this.mainDeck[this.randomComputerIndex];
    // if (this.playerTurn) {
    //   this.playerGrid.push(this.randomNum);
    //   this.mainDeck.splice(this.randomIndex, 1);
    //   this.playerTurn = false;
    // } else {
    //   this.computerGrid.push(this.randomNum);
    //   this.mainDeck.splice(this.randomIndex, 1);
    //   this.playerTurn = true;
    //   this.playerGrid.push(this.randomNum);
    //   this.mainDeck.splice(this.randomIndex, 1);
    // }
    if (this.playerGrid.length < 9) {
      this.computerGrid.push(this.randomComputerNum);
      this.mainDeck.splice(this.randomComputerIndex, 1);
      this.playerGrid.push(this.randomPlayerNum);
      this.mainDeck.splice(this.randomPlayerIndex, 1);
    } else {
      if (this.playerGrid.length === 9) {
        alert("Player wins!");
        this.playerGrid = [];
        this.computerGrid = [];
        this.startGame();
      }
    }
    
    if (this.mainDeck.length === 0) {
      alert("No more cards, main deck has been reset.");
      this.mainDeck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10];
    }
    
  }

  ngOnInit(): void {
  }

}
