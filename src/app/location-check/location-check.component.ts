import { Component } from '@angular/core';
import { Move } from './Move';
import * as moment from 'moment';

@Component({
  templateUrl: 'location-check.component.html'
})
export class LocationCheckComponent {

  latitude: any;
  longitude: any;
  mapLink: string;
  mapLinkDescr: string;
  status: string;
  latestMove;
  moves = [];
  stopTrackingLoop = true;

  success = (position) => {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    this.status = '';
    this.mapLink = `https://www.openstreetmap.org/#map=18/${this.latitude}/${this.longitude}`;
    this.mapLinkDescr = `Latitude: ${this.latitude} °, Longitude: ${this.longitude} °`;
  };

  error = () => {
    this.status = 'Unable to retrieve your location';
  };

  geoFindMe() {
    if (!navigator.geolocation) {
      this.status = 'Geolocation is not supported by your browser';
    } else {
      status = 'Locating…';
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    }
  }

  addPosition = (position) => {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    if (this.latestMove) {
      const distance = this.measure(this.latitude, this.longitude, this.latestMove.latitude, this.latestMove.longitude);
      console.log('Distance: ' + distance);
      if (distance > 5) {
        let move = new Move();
        move.id = "uuid";
        move.moveTime = moment().locale('nl');
        move.latitude = this.latitude;
        move.longitude = this.longitude;
        this.moves.push(move);
        this.latestMove = move;
      }
    } else {
      let move = new Move();
      move.id = "uuid";
      move.moveTime = moment().locale('nl');
      move.latitude = this.latitude;
      move.longitude = this.longitude;
      this.moves.push(move);
      this.latestMove = move;
    }
  };

  measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    const R = 6378.137; // Radius of earth in KM
    const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    const dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d * 1000; // meters
  }

  startTracking() {
    this.stopTrackingLoop = false;
    navigator.geolocation.getCurrentPosition(this.addPosition, this.error);
    this.trackPosition();
  }

  trackPosition() {
    if (!this.stopTrackingLoop) {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(this.addPosition, this.error);
        this.trackPosition();
      }, 5 * 1000)
    }
  }

  stopTracking() {
    this.stopTrackingLoop = true;
  }

}
