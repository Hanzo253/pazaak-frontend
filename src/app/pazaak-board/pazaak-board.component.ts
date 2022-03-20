import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interface/user';
import { UserService } from '../services/user.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-pazaak-board',
  templateUrl: './pazaak-board.component.html',
  styleUrls: ['./pazaak-board.component.css']
})
export class PazaakBoardComponent implements OnInit {

  gameStarted: boolean = false;
  playerRoundWins: number = 0;
  computerRoundWins: number = 0;

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

  userAuthToken: any = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoaWdoZ3JvdW5kQHlhaG9vLmNvbSIsImV4cCI6MTY0NzAxODQ1NCwiaWF0IjoxNjQ2OTgyNDU0fQ.m9xn_uqgCBMtCvZN86AGjRGgqh7po3MuWcRmprm-f9A"
  playerName: any;
  playerWins: number = 0;
  playerLosses: number = 0;
  
  updatedWins: any = {
    'wins' : `${this.playerWins}`
  };

  updatedLosses: any = {
    'losses' : `${this.playerLosses}`
  };

  match: any = {
    'result' : 'Victory',
    'matchDate' : '12-05-2022'
  }

  cardsGone: any;
  pazaakSong: any = new Audio();

  clickedCardOne: boolean = false;
  clickedCardTwo: boolean = false;
  clickedCardThree: boolean = false;
  clickedCardFour: boolean = false;

  matchDate: any = new Date();
  matchDay: any;
  matchMonth: any;
  matchYear: any;

  constructor(private elem : ElementRef, private router: Router, private userService: UserService, private matchService: MatchService) { }

  // random number generator
  randomizeNum(max: number) {
    return Math.floor(Math.random() * max);
  }

  // randomize color classes for random colors
  randomizeColorClass() {
    this.randomColorIndex = this.randomizeNum(this.colorClasses.length);
    return this.colorClasses[this.randomColorIndex];
  }

  // randomize the player card numbers
  randomizePlayerCardsNum() {
    this.randomPlayerCardNumIndex = this.randomizeNum(this.sideDeck.length);
    return this.sideDeck[this.randomPlayerCardNumIndex];
  }

  // randomize the computer card numbers
  randomizeComputerCardsNum() {
    this.randomComputerCardNumIndex = this.randomizeNum(this.sideDeck.length);
    return this.sideDeck[this.randomComputerCardNumIndex];
  }

  // generate a random number card and place it on the grid
  generateGivenCards(): void {
    if (this.playerGrid.length < 9) {
      setTimeout(() => {
        if (this.computerPazaakVal < 20) {
          if (this.randomComputerNum === NaN) {
            alert("No more cards, main deck has been reset. Press the End Turn button again to resume");
            this.mainDeck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10];
          }
          this.computerGrid.push(this.randomComputerNum);
          this.mainDeck.splice(this.randomComputerIndex, 1);
          this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
          setTimeout(() => {
            if (this.computerPazaakVal === 20) {
              alert("Computer auto stands. Keep pressing End Turn until the round is over.");
              this.computerAutoStands();
            }
          }, 500);
          this.computerMoves();
          this.checkComputerWin();
        }
        this.computerTurn = true;
        this.playerTurn = false;
      }, 500);
      if (this.playerPazaakVal > 20) {
            alert("Player busts. Computer wins the round!");
            this.restartRound();
            this.checkComputerRoundWins();
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
    }

    // if player grid is full
    if (this.playerGrid.length === 8) {
      setTimeout(() => {
        alert("Player wins the round!");
        this.playerGrid = [];
        this.computerGrid = [];
        this.startGame();
        this.checkPlayerRoundWins();
      }, 1500);
    }

    // if computer grid is full
    if (this.computerGrid.length === 8) {
      setTimeout(() => {
        alert("Computer wins the round!");
        this.playerGrid = [];
        this.computerGrid = [];
        this.startGame();
        this.checkComputerRoundWins();
      }, 500);
    }
  }

  // starts the game
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

  // ends the player's turn
  endTurn(): void {
    this.randomPlayerIndex = this.randomizeNum(this.mainDeck.length);
    this.randomPlayerNum = this.mainDeck[this.randomPlayerIndex];
    this.randomComputerIndex = this.randomizeNum(this.mainDeck.length);
    this.randomComputerNum = this.mainDeck[this.randomComputerIndex];
    
    if (this.gameStarted === false) {
      alert("Game has not started. Please start the game before using this button.");
    } else {
      if (this.mainDeck.length === 0) {
        alert("No more cards, main deck has been reset. Press the End Turn button again to resume");
        this.mainDeck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10];
      } else {
        this.generateGivenCards();
      }
    }
    // console.log(this.mainDeck);
  }

  // player stand button function
  playerStands(): void {
    if (this.gameStarted === false) {
      alert("Game has not started. Please start the game before using this button.");
    } else {
      this.playerStand = true;
      this.playerTurn = false;
      alert("Player stands. Keep pressing End Turn until the round is over.");
      this.checkPlayerWinWithStand();
    }
  }

  // player automatically stands without pressing the button
  playerAutoStands(): void {
    this.playerStand = true;
    this.playerTurn = false;
  }

  // computer automatically stands when needed
  computerAutoStands(): void {
    this.computerStand = true;
    this.computerTurn = false;
  }

  // quit the game and return to main menu
  quitGame(): void {
    alert("Quitting game and retuning to main menu...");
    this.pazaakSong.pause();
    this.pazaakSong.currentTime = 0;
    this.router.navigate(['mainmenu']);
  }

  // restarts a round of the game
  restartRound(): void {
    this.playerGrid = [];
    this.computerGrid = [];
    this.playerPazaakVal = 0;
    this.computerPazaakVal = 0;
    this.playerStand = false;
  }

  // restarts the whole game including the round wins
  restartGame(): void {
    this.restartRound();
    this.clickedCardOne = false;
    this.clickedCardTwo = false;
    this.clickedCardThree = false;
    this.clickedCardFour = false;
    this.playerRoundWins = 0;
    this.computerRoundWins = 0;
    this.playerHand = [];
    this.computerHand = [];
    for (let i = 0; i < 4; i++) {
      this.playerHand.push(this.randomizePlayerCardsNum());
      this.computerHand.push(this.randomizeComputerCardsNum());
    }

    this.checkCardColors();

    console.log(this.playerHand);
    console.log(this.computerHand);
  }

  // checks if the computer has won three rounds
  checkComputerRoundWins(): void {
    if (this.computerRoundWins === 2) {
      this.computerRoundWins++;
      setTimeout(() => {
        this.playerLosses++;
        console.log(this.playerLosses);
        this.updatedLosses = {
          'losses' : `${this.playerLosses}`
        };
        this.updateLoss(this.updatedLosses, this.userAuthToken);
        this.match = {
          'result' : 'Defeat',
          'matchDate' : `${this.getCurrentDate()}`
        }
        this.createMatch(this.match, this.userAuthToken);
        alert("Computer has won all three rounds. Therefore, Computer has won the game!");
        this.restartGame();

      }, 1000);
    } else {
      this.computerRoundWins++;
      console.log("computerRoundWins: ", this.computerRoundWins);
    }
  }

  // checks if the player has won three rounds
  checkPlayerRoundWins(): void {
    if (this.playerRoundWins === 2) {
      this.playerRoundWins++;
      setTimeout(() => {
        this.playerWins++;
        console.log(this.playerWins);
        this.updatedWins = {
          'wins' : `${this.playerLosses}`
        };
        this.updateWin(this.updatedWins, this.userAuthToken);
        this.match = {
          'result' : 'Victory',
          'matchDate' : `${this.getCurrentDate()}`
        }
        this.createMatch(this.match, this.userAuthToken);
        alert("Player has won all three rounds. Therefore, Player has won the game!");
        this.restartGame();
      }, 1000);
    } else {
      this.playerRoundWins++;
      console.log("playerRoundWins: ", this.playerRoundWins);
    }
  }

  // checks if the computer has won the round
  checkComputerWin(): void {
    if (this.computerPazaakVal > 20) {
      setTimeout(() => {
        this.computerAutoStands();
        alert("Computer busts. Player wins the round!");
        this.restartRound();
        this.checkPlayerRoundWins();
      }, 500);
    } else if (this.computerPazaakVal === 20) {
      setTimeout(() => {
        if (this.computerStand === false) {
          alert("Computer auto stands. Keep pressing End Turn until the round is over.");
          this.computerAutoStands();
        }

        if (this.playerStand && this.computerStand && this.playerPazaakVal < this.computerPazaakVal) {
          alert("Computer wins the round!");
          this.restartRound();
          this.checkComputerRoundWins();
        }
      }, 500);
    }

    if (this.computerPazaakVal === 20 && this.playerPazaakVal === 20 && this.computerStand && this.playerStand) {
      setTimeout(() => {
        alert("Draw! Starting new round wth no win given....");
        this.restartRound();
        this.startGame();
      }, 500);
    }
  }

  // checks if the player has won the round
  checkPlayerWin(): void {
    if (this.playerPazaakVal === 20) {
      setTimeout(() => {
        if (this.playerStand === false) {
          alert("Player auto stands. Keep pressing End Turn until the round is over.");
          this.playerAutoStands();
        }
        
        if (this.computerPazaakVal === 20 && this.playerPazaakVal === 20) {
          setTimeout(() => {
            alert("Draw! Starting new round wth no win given....");
            this.restartRound();
            this.startGame();
          }, 500)
        }
      }, 500);
    }
  }

  // checks if the player wins while standing
  checkPlayerWinWithStand(): void {
    if (this.playerPazaakVal > 20 && this.playerStand) {
      setTimeout(() => {
        alert("Player busts. Computer wins the round!");
        this.restartRound();
        this.startGame();
        this.checkComputerRoundWins();
      }, 500);
    } else if (this.playerPazaakVal < 20 && this.playerPazaakVal < this.computerPazaakVal && this.playerStand) {
      setTimeout(() => {
        alert("Computer wins the round!");
        this.restartRound();
        this.startGame();
        this.checkComputerRoundWins();
      }, 500);
    } else if (this.computerPazaakVal === 20 && this.playerPazaakVal === 20 && this.playerStand && this.computerStand) {
      setTimeout(() => {
        alert("Draw! Starting new round wth no win given....");
        this.restartRound();
        this.startGame();
      }, 500)
    }
  }

  // checks the card colors to make sure that the numbers'sign aligns with their color
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

  // function that add a card from the player's hand to the grid
  addCardToGridPlayer(cardNum: number): void {
    if (this.gameStarted) {
      switch (cardNum) {
        case this.playerHand[0]:
          this.clickedCardOne = true;
          break;
        case this.playerHand[1]:
          this.clickedCardTwo = true;
          break;
        case this.playerHand[2]:
          this.clickedCardThree = true;
          break;
        case this.playerHand[3]:
          this.clickedCardFour = true;
          break;
      }
      this.playerGrid.push(cardNum);
      this.playerPazaakVal = this.playerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
      this.checkPlayerWin();
    } else {
      alert("Game has not started yet. Please start the game before playing the card.")
    }
  }

  // computer makes a move based on its pazaak value
  computerMoves(): void {
    this.randomComputerHandIndex = this.randomizeNum(this.computerHand.length);
    if (this.computerHand.length !== 0) {
      switch (this.computerPazaakVal) {
        case 14:
          console.log(this.computerHand);
          for (let i = 0; i < this.computerHand.length; i++) {
            if (this.computerHand[i] === 6) {
              setTimeout(() => {
                if (this.computerPazaakVal !== 20) {
                  this.computerGrid.push(this.computerHand[i]);
                  this.computerHand.pop();
                  this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
                  this.checkComputerWin();
                } else {
                  this.checkComputerWin();
                }
              }, 500);
            }
          }
          break;
        case 15:
          console.log(this.computerHand);
          for (let i = 0; i < this.computerHand.length; i++) {
            if (this.computerHand[i] === 5) {
              setTimeout(() => {
                if (this.computerPazaakVal !== 20) {
                  this.computerGrid.push(this.computerHand[i]);
                  this.computerHand.pop();
                  this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
                  this.checkComputerWin();
                } else {
                  this.checkComputerWin();
                }
              }, 500);
              // this.computerGrid.push(this.computerHand[this.randomComputerHandIndex]);
              // this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
            }
          }
          break;
        case 16:
          console.log(this.computerHand);
          for (let i = 0; i < this.computerHand.length; i++) {
            if (this.computerHand[i] === 4) {
              setTimeout(() => {
                if (this.computerPazaakVal !== 20) {
                  this.computerGrid.push(this.computerHand[i]);
                  this.computerHand.pop();
                  this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
                  this.checkComputerWin();
                } else {
                  this.checkComputerWin();
                }
              }, 500);
            }
          }
          break;
        case 17:
          console.log(this.computerHand);
          for (let i = 0; i < this.computerHand.length; i++) {
            if (this.computerHand[i] === 3) {
              setTimeout(() => {
                if (this.computerPazaakVal !== 20) {
                  this.computerGrid.push(this.computerHand[i]);
                  this.computerHand.pop();
                  this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
                  this.checkComputerWin();
                } else {
                  this.checkComputerWin();
                }
              }, 500);
            } else {
              this.computerAutoStands();
            }
          }
          break;
        case 18:
          console.log(this.computerHand);
          for (let i = 0; i < this.computerHand.length; i++) {
            if (this.computerHand[i] === 2) {
              setTimeout(() => {
                if (this.computerPazaakVal !== 20) {
                  this.computerGrid.push(this.computerHand[i]);
                  this.computerHand.pop();
                  this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
                  this.checkComputerWin();
                } else {
                  this.checkComputerWin();
                }
              }, 500);
            } else {
              this.computerAutoStands();
            }
          }
          break;
        case 19:
          console.log(this.computerHand);
          for (let i = 0; i < this.computerHand.length; i++) {
            if (this.computerHand[i] === 1) {
              setTimeout(() => {
                if (this.computerPazaakVal !== 20) {
                  this.computerGrid.push(this.computerHand[i]);
                  this.computerHand.pop();
                  this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
                  this.checkComputerWin();
                } else {
                  this.checkComputerWin();
                }
              }, 500);
            } else {
              this.computerAutoStands();
            }
          }
          break;
        case 21:
          console.log(this.computerHand);
          for (let i = 0; i < this.computerHand.length; i++) {
            if (this.computerHand[i] === -1) {
              setTimeout(() => {
                if (this.computerPazaakVal !== 20) {
                  this.computerGrid.push(this.computerHand[i]);
                  this.computerHand.pop();
                  this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
                  this.checkComputerWin();
                } else {
                  this.checkComputerWin();
                }
              }, 500);
            } else {
              this.computerAutoStands();
            }
          }
          break;
        case 22:
          console.log(this.computerHand);
          for (let i = 0; i < this.computerHand.length; i++) {
            if (this.computerHand[i] === -2) {
              setTimeout(() => {
                if (this.computerPazaakVal !== 20) {
                  this.computerGrid.push(this.computerHand[i]);
                  this.computerHand.pop();
                  this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
                  this.checkComputerWin();
                } else {
                  this.checkComputerWin();
                }
              }, 500);
            } else {
              this.computerAutoStands();
            }
          }
          break;
        case 23:
          console.log(this.computerHand);
          for (let i = 0; i < this.computerHand.length; i++) {
            if (this.computerHand[i] === -3) {
              setTimeout(() => {
                if (this.computerPazaakVal !== 20) {
                  this.computerGrid.push(this.computerHand[i]);
                  this.computerHand.pop();
                  this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
                  this.checkComputerWin();
                } else {
                  this.checkComputerWin();
                }
              }, 500);
            } else {
              this.computerAutoStands();
            }
          }
          break;
        case 24:
          console.log(this.computerHand);
          for (let i = 0; i < this.computerHand.length; i++) {
            if (this.computerHand[i] === -4) {
              setTimeout(() => {
                if (this.computerPazaakVal !== 20) {
                  this.computerGrid.push(this.computerHand[i]);
                  this.computerHand.pop();
                  this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
                  this.checkComputerWin();
                } else {
                  this.checkComputerWin();
                }
              }, 500);
            } else {
              this.computerAutoStands();
            }
          }
          break;
        case 25:
          console.log(this.computerHand);
          for (let i = 0; i < this.computerHand.length; i++) {
            if (this.computerHand[i] === -5) {
              setTimeout(() => {
                if (this.computerPazaakVal !== 20) {
                  this.computerGrid.push(this.computerHand[i]);
                  this.computerHand.pop();
                  this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
                  this.checkComputerWin();
                } else {
                  this.checkComputerWin();
                }
              }, 500);
            } else {
              this.computerAutoStands();
            }
          }
          break;
        case 26:
          console.log(this.computerHand);
          for (let i = 0; i < this.computerHand.length; i++) {
            if (this.computerHand[i] === -6) {
              setTimeout(() => {
                if (this.computerPazaakVal !== 20) {
                  this.computerGrid.push(this.computerHand[i]);
                  this.computerHand.pop();
                  this.computerPazaakVal = this.computerGrid.reduce((valTotal, cardNum) => valTotal + cardNum, 0);
                  this.checkComputerWin();
                } else {
                  this.checkComputerWin();
                }
              }, 500);
            } else {
              this.computerAutoStands();
            }
          }
          break;
      }
    }
  }

  // get current date
  getCurrentDate() {
    this.matchDay = String(this.matchDate.getDate()).padStart(2, '0');
    this.matchMonth = String(this.matchDate.getMonth() + 1).padStart(2, '0');
    this.matchYear = this.matchDate.getFullYear();
    this.matchDate = this.matchMonth + '/' + this.matchDay + '/' + this.matchYear;
    return this.matchDate;
    
  }

  // checks the JWT and gets the user
  getLoggedInUser(authToken: any): void {
    this.userService.getLoggedInUser(authToken).subscribe(
      (response) => {
        console.log(response);
        this.playerName = response.userName;
        this.playerWins = response.wins;
        this.playerLosses = response.losses;
      }
    );
  }

  // updates wins value in data base
  updateWin(wins: any, authToken: any): void {
    this.userService.updateWins(wins, authToken).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  // updates losses value in data base
  updateLoss(losses: any, authToken: any): void {
    this.userService.updateLosses(losses, authToken).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  createMatch(match: any, authToken: any) {
    this.matchService.createMatch(match, authToken).subscribe(
      (response) => console.log(response)
    );
  }

  getAllMatches(authToken: any) {
    this.matchService.getAllMatches(authToken).subscribe(
      (response) => console.log(response)
    );
  }

  ngOnInit(): void {
    this.getLoggedInUser(this.userAuthToken);
    // this.createMatch(this.match, this.userAuthToken);

    // this.getCurrentDate();

    // set color of cards
    this.cardOneColor = this.randomizeColorClass(); 
    this.cardTwoColor = this.randomizeColorClass(); 
    this.cardThreeColor = this.randomizeColorClass(); 
    this.cardFourColor = this.randomizeColorClass();

    for (let i = 0; i < 4; i++) {
      this.playerHand.push(this.randomizePlayerCardsNum());
      this.computerHand.push(this.randomizePlayerCardsNum());
    }

    // check numbers to set their signs based on the color of their cards 
    this.checkCardColors();

    // console.log(this.playerHand);
    // console.log(this.computerHand);

    // plays the pazaak song
    this.pazaakSong.src = "../../assets/music/pazaak.mp3";
    this.pazaakSong.play();
    this.pazaakSong.loop = true;

  }

}
