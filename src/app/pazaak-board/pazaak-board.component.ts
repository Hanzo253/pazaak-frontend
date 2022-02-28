import { Component, OnInit, ElementRef } from '@angular/core';

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

  sideDeck: Array<number> = [1, 2, 3, 4, 5, 6];
  // sideDeck: Array<number> = [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -6, 6];

  playerHand: Array<number> = [];
  computerHand: Array<number> = [];

  playerStand: boolean = false;
  computerStand: boolean = false;

  colorClasses: Array<string> = ["positive", "negative"];
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
  randomComputerHandIndex: number = this.randomizeNum(this.computerHand.length);
  randomCardNum: any;

  playerGrid: Array<number> = [];
  computerGrid: Array<number> = [];
  playerTurn: boolean = false;
  computerTurn: boolean = false;

  cardsGone: any;

  constructor(private elem : ElementRef) { }

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

  generateGivenCards(): void {
    if (this.playerGrid.length < 9) {
      // if (this.playerPazaakVal > 20)
      setTimeout(() => {
        if (this.computerPazaakVal < 20) {
          if (this.randomComputerNum === NaN) {
            alert("No more cards, main deck has been reset. Press the End Turn button again to resume");
            this.mainDeck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10];
          }
          this.computerGrid.push(this.randomComputerNum);
          this.mainDeck.splice(this.randomComputerIndex, 1);
          this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
          // if (this.computerPazaakVal > 20) {
          //   setTimeout(() => {
          //     alert("Player Wins!")
          //     this.restartRound();
          //   }, 500);
          // } else if (this.computerPazaakVal === 20) {
          //   setTimeout(() => {
          //     alert("Computer Wins!")
          //     this.restartRound();
          //   }, 500);
          // }
          this.checkComputerWin();
        }
        this.computerTurn = true;
        this.playerTurn = false;
      }, 500);
      if (this.playerPazaakVal > 20) {
            // alert("Your value is over 20. Sorry, you lose! Decrease it with a negative card next time.");
            alert("Computer Wins! 2");
            this.restartRound();
      } else {
        if (this.playerStand === false) {
          setTimeout(() => {
            if (this.playerPazaakVal < 20) {
              if (this.randomPlayerNum === NaN) {
                alert("No more cards, main deck has been reset. Press the End Turn button again to resume");
                this.mainDeck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10];
              }
              this.playerGrid.push(this.randomPlayerNum);
              this.mainDeck.splice(this.randomPlayerIndex, 1);
              this.playerPazaakVal = this.playerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
              this.checkPlayerWin();
            }
            this.playerTurn = true;
            this.computerTurn = false;
          }, 1500);
        }
      }
      this.checkPlayerWin();
    } else {
      if (this.playerGrid.length === 9) {
        alert("Player wins!");
        this.playerGrid = [];
        this.computerGrid = [];
        this.startGame();
      }
    }
  }

  startGame(): void {
    this.restartRound();
    this.randomPlayerIndex = this.randomizeNum(this.mainDeck.length);
    this.randomPlayerNum = this.mainDeck[this.randomPlayerIndex];
    if (this.randomPlayerNum === NaN) {
      alert("No more cards, main deck has been reset. Press the End Turn button again to resume");
      this.mainDeck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10];
    } else {
      this.playerGrid.push(this.randomPlayerNum);
      this.mainDeck.splice(this.randomPlayerIndex, 1);
      this.playerPazaakVal = this.playerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
      this.gameStarted = true;
      this.playerTurn = true;
      this.computerTurn = false;
    }
  }

  endTurn(): void {
    this.randomPlayerIndex = this.randomizeNum(this.mainDeck.length);
    this.randomPlayerNum = this.mainDeck[this.randomPlayerIndex];
    this.randomComputerIndex = this.randomizeNum(this.mainDeck.length);
    this.randomComputerNum = this.mainDeck[this.randomComputerIndex];
    
    if (this.mainDeck.length === 0) {
      alert("No more cards, main deck has been reset. Press the End Turn button again to resume");
      this.mainDeck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10];
    } else {
      this.generateGivenCards();
    }
    console.log(this.mainDeck);
  }

  playerStands(): void {
    this.playerStand = true;
    this.playerTurn = false;
    alert("Player stands. Keep pressing End Turn until the round is over.");
    this.checkPlayerWinWithStand();
    // if (this.playerPazaakVal < this.computerPazaakVal && this.computerPazaakVal <= 20) {
    //   alert("Computer wins!");
    //   this.restartGame();
    // } else if (this.playerPazaakVal > this.computerPazaakVal && this.playerPazaakVal <= 20) {
    //   alert("Player wins!");
    //   this.restartGame();
    // } else if (this.playerPazaakVal > 20) {
    //   alert("Player loses!");
    //   this.restartGame();
    // }
  }

  playerAutoStands(): void {
    this.playerStand = true;
    this.playerTurn = false;
  }

  computerAutoStands(): void {
    this.computerStand = true;
    this.computerTurn = false;
  }

  restartRound() {
    this.playerGrid = [];
    this.computerGrid = [];
    this.playerPazaakVal = 0;
    this.computerPazaakVal = 0;
    this.playerStand = false;
  }

  checkComputerWin(): void {
    if (this.computerPazaakVal > 20) {
      setTimeout(() => {
        alert("Player Wins! 1");
        this.restartRound();
      }, 500);
    } else if (this.computerPazaakVal === 20 && this.playerPazaakVal === 20) {
      setTimeout(() => {
        alert("Draw! Starting new round wth no win given....");
        this.restartRound();
        this.startGame();
      }, 500);
    } else if (this.computerPazaakVal === 20) {
      setTimeout(() => {
        if (this.computerStand === false) {
          alert("Computer auto stands. Keep pressing End Turn until the round is over.");
          this.computerAutoStands();
        }
      }, 500);
    }
  }

  checkPlayerWin(): void {
    if (this.playerPazaakVal === 20) {
      setTimeout(() => {
        if (this.playerStand === false) {
          alert("Player auto stands. Keep pressing End Turn until the round is over.");
          this.playerAutoStands();
        }
        // this.restartRound();
        // this.startGame();
      }, 500);
    } else if (this.computerPazaakVal === 20 && this.playerPazaakVal === 20) {
      setTimeout(() => {
        alert("Draw! Starting new round wth no win given....");
        this.restartRound();
        this.startGame();
      }, 500)
    }
  }

  checkPlayerWinWithStand(): void {
    if (this.playerPazaakVal > 20 && this.playerStand) {
      setTimeout(() => {
        alert("Player busts.");
        this.restartRound();
        this.startGame();
      }, 500);
    } else if (this.playerPazaakVal < 20 && this.playerPazaakVal < this.computerPazaakVal && this.playerStand) {
      setTimeout(() => {
        alert("Computer Wins!");
        this.restartRound();
        this.startGame();
      }, 500);
    }
  }

  checkCardColors(): void {
    switch (this.cardOneColor) {
      case "positive":
        this.playerHand[0] = Math.abs(this.playerHand[0]);
        break;
      case "negative":
        this.playerHand[0] = this.playerHand[0] * -1;
        break;
    }

    switch (this.cardTwoColor) {
      case "positive":
        this.playerHand[1] = Math.abs(this.playerHand[1]);
        break;
      case "negative":
        this.playerHand[1] = this.playerHand[1] * -1;
        break;
    }

    switch (this.cardThreeColor) {
      case "positive":
        this.playerHand[2] = Math.abs(this.playerHand[2]);
        break;
      case "negative":
        this.playerHand[2] = this.playerHand[2] * -1;
        break;
    }

    switch (this.cardFourColor) {
      case "positive":
        this.playerHand[3] = Math.abs(this.playerHand[3]);
        break;
      case "negative":
        this.playerHand[3] = this.playerHand[3] * -1;
        break;
    }
  }

  addCardToGridPlayer(cardNum: number): void {
    if (this.gameStarted) {
      this.playerGrid.push(cardNum);
      this.playerPazaakVal = this.playerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
      this.checkPlayerWin();
    }
  }

  addCardToGridComputer(cardNum: number): void {
    if (this.gameStarted) {
      this.computerGrid.push(cardNum);
      this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
      this.checkComputerWin();
    }
  }

  ngOnInit(): void {
    this.cardOneColor = this.randomizeColorClass(); 
    this.cardTwoColor = this.randomizeColorClass(); 
    this.cardThreeColor = this.randomizeColorClass(); 
    this.cardFourColor = this.randomizeColorClass();

    for (let i = 0; i < 4; i++) {
      this.playerHand.push(this.randomizePlayerCardsNum());
      this.computerHand.push(this.randomizePlayerCardsNum());
    }

    this.checkCardColors();

    console.log(this.playerHand);
  }

}
