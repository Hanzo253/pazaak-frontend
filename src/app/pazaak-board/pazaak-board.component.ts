import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pazaak-board',
  templateUrl: './pazaak-board.component.html',
  styleUrls: ['./pazaak-board.component.css']
})
export class PazaakBoardComponent implements OnInit {

  gameStarted: boolean = false;

  playerPazaakVal: number = 0; 
  computerPazaakVal: number = 0; 

  mainDeck: Array<number> = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10];

  sideDeck: Array<number> = [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -6, 6];

  playerHand: Array<number> = [];
  computerHand: Array<number> = [];

  colorClasses: Array<string> = ["positive", "negative", "hybrid"];
  cardOneColor: string = this.randomizeColorClass(); 
  cardTwoColor: string = this.randomizeColorClass(); 
  cardThreeColor: string = this.randomizeColorClass(); 
  cardFourColor: string = this.randomizeColorClass();
  cardColor: any;

  randomPlayerIndex: any;
  randomPlayerNum: any;
  randomComputerIndex: any;
  randomComputerNum: any;
  randomColorIndex: number = this.randomizeNum(this.colorClasses.length);
  randomPlayerCardNumIndex: number = this.randomizeNum(this.sideDeck.length);
  randomComputerCardNumIndex: number = this.randomizeNum(this.sideDeck.length);
  randomCardNum: any;

  playerGrid: Array<number> = [];
  computerGrid: Array<number> = [];
  playerTurn: boolean = false;
  computerTurn: boolean = false;

  cardsGone: any;

  constructor() { }

  randomizeNum(max: number) {
    return Math.floor(Math.random() * max);
  }

  randomizeColorClass() {
    this.randomColorIndex = this.randomizeNum(this.colorClasses.length);
    return this.colorClasses[this.randomColorIndex];
  }

  randomizePlayerCardsNum() {
    this.randomPlayerCardNumIndex = this.randomizeNum(this.sideDeck.length);
    return this.sideDeck[this.randomPlayerCardNumIndex];
  }

  randomizeComputerCardsNum() {
    this.randomComputerCardNumIndex = this.randomizeNum(this.sideDeck.length);
    return this.sideDeck[this.randomComputerCardNumIndex];
  }

  startGame(): void {
    this.randomPlayerIndex = this.randomizeNum(this.mainDeck.length);
    this.randomPlayerNum = this.mainDeck[this.randomPlayerIndex];
    this.playerGrid.push(this.randomPlayerNum);
    this.mainDeck.splice(this.randomPlayerIndex, 1);
    this.playerPazaakVal = this.playerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
    this.playerTurn = true;
    this.computerTurn = false;
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
      setTimeout(() => {
        this.computerGrid.push(this.randomComputerNum);
        this.mainDeck.splice(this.randomComputerIndex, 1);
        this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
        this.computerTurn = true;
        this.playerTurn = false;
      }, 500);
      setTimeout(() => {
        this.playerGrid.push(this.randomPlayerNum);
        this.mainDeck.splice(this.randomPlayerIndex, 1);
        this.playerPazaakVal = this.playerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
        this.playerTurn = true;
        this.computerTurn = false;
      }, 1500);
      // this.computerGrid.push(this.randomComputerNum);
      // this.mainDeck.splice(this.randomComputerIndex, 1);
      // this.playerGrid.push(this.randomPlayerNum);
      // this.mainDeck.splice(this.randomPlayerIndex, 1);
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

  // positiveNegativeTest() {
  //   this.cardOneColor = this.randomizeColorClass();
  //   console.log(this.cardOneColor);
  // }

  ngOnInit(): void {
    this.cardOneColor = this.randomizeColorClass(); 
    this.cardTwoColor = this.randomizeColorClass(); 
    this.cardThreeColor = this.randomizeColorClass(); 
    this.cardFourColor = this.randomizeColorClass();

    for (let i = 0; i < 4; i++) {
      this.playerHand.push(this.randomizePlayerCardsNum());
      this.computerHand.push(this.randomizePlayerCardsNum());
    }

    console.log(this.playerHand);

    // this.cardsGone = true;
  }

}
