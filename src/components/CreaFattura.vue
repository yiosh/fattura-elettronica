<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-toolbar dark>
        <v-toolbar-title>Creazione fattura</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card class="main-card" width="100%">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <DatiDocumento></DatiDocumento>
            <DatiCliente></DatiCliente>
            <ProdottiServizi></ProdottiServizi>
            <DatiPagamento></DatiPagamento>
            <CalcoloFattura></CalcoloFattura>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn>Anulla</v-btn>
            <v-btn dark>Anteprima</v-btn>
            <v-btn dark>Stampa</v-btn>
            <v-btn dark>Salva Bozza</v-btn>
            <v-btn color="success">Invia</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import DatiDocumento from "./DatiDocumento";
import DatiCliente from "./DatiCliente";
import ProdottiServizi from "./ProdottiServizi";
import DatiPagamento from "./DatiPagamento";
import CalcoloFattura from "./CalcoloFattura";
export default {
  name: "CreaFattura",
  components: {
    DatiDocumento,
    DatiCliente,
    ProdottiServizi,
    DatiPagamento,
    CalcoloFattura
  },
  data: () => ({
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 12
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 6
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 6
      }
    ],
    length: 3,
    window: 0
  })
};
</script>

<style scoped>
.main-card {
  border-radius: 0;
  background-color: #eee;
}
</style>
