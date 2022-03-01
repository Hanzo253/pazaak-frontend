import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  bandPlaying: boolean = false;
  cantinaSong: any = new Audio();

  constructor() { }

  toggleShowBand() {
    this.bandPlaying = true;
    console.log(this.bandPlaying);
  }

  stopCantinaSong() {
    this.cantinaSong.pause();
    this.cantinaSong.currentTime = 0;
  }

  getBandPlaying() {
    return this.bandPlaying;
  }
}
