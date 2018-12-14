<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" enable-resize-watcher fixed app dark>
      <v-toolbar flat class="transparent">
        <v-list dense>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://aryma.condivision.biz/fl_config/aryma.condivision.biz/img/logo.png">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Aryma</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.title" @click="console.log('clicked')">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app flat>
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>Fatturazione Elettronica Aryma</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <CreaFattura :isMobile="isMobile"/>
    </v-content>
  </v-app>
</template>

<script>
import CreaFattura from "./components/CreaFattura";
import axios from "axios";
import { store } from "./store.js";

export default {
  name: "App",
  components: {
    CreaFattura
  },
  data() {
    return {
      isMobile: null,
      drawer: false,
      clipped: false,
      items: [{ title: "Crea fattura", icon: "dashboard" }]
    };
  },
  methods: {
    initialize() {
      axios
        .get(
          "https://demo.condivision.cloud/fl_api/v2.0/?get_document&token=1&id=1"
        )
        .then(function(response) {
          // handle success
          store.state.fattura = response.data.dati;
          console.log(store.state);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
      // this.desserts = store.state.desserts;
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    isMobileDevice() {
      console.log(navigator.userAgent);
      if (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("Mobile") !== -1
      ) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
      console.log(this.isMobile);
    }
  },
  created() {
    this.initialize();
    this.isMobileDevice();
  }
};
</script>

<style>
.v-toolbar {
  border-bottom: 1px solid #424242;
}

.theme--dark.v-navigation-drawer {
  background-color: #545c64;
}

.headline {
  font-size: 20px !important;
}

@media only screen and (min-width: 768px) {
  .headline {
    font-size: 24px !important;
  }
}
</style>
