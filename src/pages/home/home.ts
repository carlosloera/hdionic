import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;


@Component({

  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  Destination: any = '';
  MyLocation: any;
  map: any;
  directionsService=new google.maps.DirectionsService;
  directionsDisplay=new google.maps.DirectionsRenderer;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];
  start={ lat:24.041884, lng:-104.669834};
  destination={
    lat:24.036341,  lng: -104.651448
  };
  destination2={
    lat:24.033785, lng:-104.666402
  };
  display:boolean=true;
  display2:boolean=false;
  display3:boolean=false;
  constructor(public navCtrl: NavController,
              public des:AuthProvider,
              public alertCtrl:AlertController,
              public geolocation:Geolocation) {
               /* 
                des.getDestino().subscribe(data=>{
                  this.Destination={
                    lng:data.lng,
                    lat:data.lat
                  };
                  console.log("destino"+this.Destination); 
                }); 
                console.log("destino"+this.Destination);  
                */

              /*  
              des.getDestino().then(value=>{
                this.Destination=value;
              }).catch(error=>{
                this.alertCtrl.create({
                  title: "Error",
                  subTitle: "Ocurrio un error",
                  buttons: ["OK"]
                }).present();
              });
              console.log(this.Destination);  
              */
              
              
    }
    ionViewDidLoad(){
      this.initMap2();
    }
  
    initMap2() {
      
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat:24.042053, lng: -104.6646126}
       
      });
  
      this.directionsDisplay.setMap(this.map);
    }

    

    calculateAndDisplayRoute() {
      this.display=false;
      this.display2=true;
      this.directionsService.route({
        origin:this.start,
        destination:this.destination,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    calculateAndDisplayRoute2() {
      this.display2=false;
      this.display3=true;
      this.directionsService.route({
        origin:this.destination,
        destination:this.destination2,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
    /*
    loadMap(position){
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      console.log(latitude, longitude);
      // create a new map by passing HTMLElement
      let mapEle: HTMLElement = document.getElementById('map2');
      let panelEle: HTMLElement = document.getElementById('panel');
    
      // create LatLng object
      this.myLatLng = {lat: latitude, lng: longitude};
    
      // create map
      this.map = new google.maps.Map(mapEle, {
        center: this.myLatLng,
        zoom: 12
      });
    
      this.directionsDisplay.setMap(this.map);
      this.directionsDisplay.setPanel(panelEle);
    
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEle.classList.add('show-map');
        this.calculateRoute();
      });
    }
    private calculateRoute(){
      this.bounds.extend(this.myLatLng);
      
        this.waypoints.forEach(waypoint => {
          var point = new google.maps.LatLng(waypoint.location.lat, waypoint.location.lng);
          this.bounds.extend(point);
        });
      
        this.map.fitBounds(this.bounds);
      
        this.directionsService.route({
          origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
          destination: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
          waypoints: this.waypoints,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
          avoidTolls: true
        }, (response, status)=> {
          if(status === google.maps.DirectionsStatus.OK) {
            console.log(response);
            this.directionsDisplay.setDirections(response);
          }else{
            alert('Could not display directions due to: ' + status);
          }
        });  
      
    }


  calculateAndDisplayRoute() {
    
    
    let that = this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 24.035763, lng: -104.651428}
    });
    directionsDisplay.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var pos2 = {
          lat: 24.035763,
          lng: -104.651428
        };
        map.setCenter(pos);
        that.MyLocation = new google.maps.LatLng(pos);
        that.Destination = new google.maps.LatLng(pos2);

      }, function() {

      });
    } else {
      // Browser doesn't support Geolocation
    }

    directionsService.route({
    origin: this.MyLocation,
    destination: this.Destination,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}


calculateAndDisplayRoute2() {
  
  
  let that = this;
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 24.035763, lng: -104.651428}
  });
  directionsDisplay.setMap(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      
      var pos2 = {
        lat: 24.035763,
        lng: -104.651428
      };
      var pos3={
        lat:24.034306,
        lng:-104.669194
      }
      map.setCenter(pos2);
      that.MyLocation = new google.maps.LatLng(pos2);
      that.Destination = new google.maps.LatLng(pos3);

    }, function() {

    });
  } else {
    // Browser doesn't support Geolocation
  }

  directionsService.route({
  origin: this.MyLocation,
  destination: this.Destination,
  travelMode: 'DRIVING'
}, function(response, status) {
  if (status === 'OK') {
    directionsDisplay.setDirections(response);
  } else {
    window.alert('Directions request failed due to ' + status);
  }
});
}*/
}
