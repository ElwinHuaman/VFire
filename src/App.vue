<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="twelve columns">
          <!-- <form> -->            
            <h5 class="docs-header">{{device}}</h5>
            <p>If you would like to borrow a device from the RIC, please fill out the form below. Once you return the device, write the date
returned and feel free to check out another device. Please treat the device kindly, so that we can all enjoy them</p>
            <div class="row">
              <div class="six columns">
                <label>Names</label>
                <input class="u-full-width" type="text" v-model="name" placeholder="E.g. Elwin Huaman...">
                <label>Date</label>                
                <input class="u-full-width" type="date" v-model="date"/>
                <label for="exampleRecipientInput">Reason for Borrow</label>
                <select class="u-full-width" v-model="selected">
                  <option disabled value="">Please select one</option>
                  <option value="Borrow">I am Borrowing(Borrow)</option>
                  <option value="Return">I am Returning(Return)</option>
                  <option value="Request">I will Borrow(Request)</option>
                </select>
                <label for="exampleMessage">Comments</label>
                <textarea class="u-full-width" v-model="comments" placeholder="Why I need the Device?…"></textarea>
              </div>             
              <div class="six columns">
                <label>Your Location</label>            
                <div id="myMap">
                  <button @click="getLocation()">See my Location</button>
                  <label >{{errorMessage}}</label>
                </div>
              </div>
            </div>                        
            <label class="example-send-yourself-copy">
              <input type="checkbox" id="checkbox" v-model="checked">
              <span class="label-body">I have read and agree to the Terms</span>
            </label>
            <input class="button-primary" @click="submitBorrow()" type="submit" value="Submit">
          <!-- </form> -->
        </div>
      </div>
    </div>    
    <div>
      <label for="exampleEmailInput">Name:</label>
      <input type="text" v-model="name"/>
      <label>Last Name</label>
      <input type="text" v-model="date"/>
      <button @click="submitBorrow()">Borrow</button>
    </div>
    <div>
      <ul>
        <li v-for="personName of names" 
        v-bind:key="personName['.key']">{{personName.name}} {{personName.lastName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import GoogleMapsLoader from 'google-maps';
import './css/skeleton.css';
import { namesRef } from './firebase';
export default {
  data () {
    return {
      device: 'Camera',
      name: '',
      date: '',
      selected: '',
      checked: '',
      comments: '',
      errorMessage: '',
      currentLocation: {lat:0, lng:0}
    }
  },
  mounted: function() {    
  },
//FIREBASE CONNECTION
  firebase: {
    names: namesRef
  },
//METHODS OF THE PAGE
  methods: {
    submitBorrow(){
      namesRef.push({name: this.name, lastName: this.lastName, edit: false})
    },
    getLocation(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.showMap,this.showError);
      } else {
        this.errorMessage = "Geolocation is not supported by this browser";
      }
    },
    showMap(position){
      this.currentLocation = {lat: position.coords.latitude, lng:position.coords.longitude};      
      var map = new google.maps.Map(document.getElementById('myMap'), {
            center: this.currentLocation,
            scrollwheel: false,
            zoom: 15
            });
      var marker = new google.maps.Marker({position:this.currentLocation});
      marker.setMap(map);
    },
    showError(error){
      switch(error.code){
        case error.PERMISSION_DENIED:
          this.errorMessage = "User denied the request for Geolocation."
          break;
        case error.POSITION_UNAVAILABLE:
          this.errorMessage = "Location information is unavailable"
          break;
        case error.TIMEOUT:
          this.errorMessage = "The Request to get user location time out."
          break;
        case error.UNKNOWN_ERROR:
          this.errorMessage = "An unknown error ocurred."
          break;
      }
    }
  }
}
</script>
<style scoped>
#myMap {
    height:300px;
    width: 100%;
   }
</style>
<style>

</style>
