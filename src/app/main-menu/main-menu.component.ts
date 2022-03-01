import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  bandPlaying: any;
  cantinaSong: any = new Audio();

  constructor() { }

  playBand(): void {
    this.bandPlaying = true;
    this.cantinaSong.src = "../../assets/music/cantina-song.mp3";
    this.cantinaSong.play();
    this.cantinaSong.loop = true;
  }

  playGame(): void {
    this.cantinaSong.pause();
    this.cantinaSong.currentTime = 0;
    this.bandPlaying = false;
  }

  matchHistory() {
    this.cantinaSong.pause();
    this.cantinaSong.currentTime = 0;
    this.bandPlaying = false;
  }

  ngOnInit(): void {
  }

}
