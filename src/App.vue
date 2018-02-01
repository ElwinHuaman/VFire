<template>
  <div id="app">
    <div>
      <label>Name:</label>
      <input type="text" v-model="name"/>
      <label>Last Name</label>
      <input type="text" v-model="lastName"/>
      <input type="text" v-model="currentLocation.lat"/>
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
import { namesRef } from './firebase';
export default {
  data () {
    return {
      currentLocation: {lat:0, lng:0},
      name: 'Elwin',
      lastName: 'Huaman',
      lat2: navigator.geolocation.getCurrentPosition((position) => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        })
    }
  },
//FIREBASE CONNECTION
  firebase: {
    names: namesRef
  },
//METHODS OF THE PAGE
  methods: {
    submitBorrow(){
      namesRef.push({name: this.name, lastName: this.lastName, edit: false})
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
input[type=text], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=submit] {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

input[type=submit]:hover {
    background-color: #45a049;
}

div{
    size: 20px;
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
}
</style>
