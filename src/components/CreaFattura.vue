<template>
  <v-container fluid :class="{'pa-0':isMobile}">
    <v-layout row wrap>
      <v-toolbar dark>
        <v-toolbar-title>Creazione fattura</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-btn icon>
          <v-icon>close</v-icon>
        </v-btn>-->
      </v-toolbar>

      <v-card width="100%">
        <v-container :class="{'pa-0':isMobile}" class="grey lighten-3" fluid grid-list-lg>
          <v-layout v-if="isMobile" row wrap>
            <v-expansion-panel class="mt-2" :value="0" popout>
              <v-expansion-panel-content>
                <div slot="header">Dati Documento</div>
                <DatiDocumento :tipoCliente="tipoCliente"></DatiDocumento>
              </v-expansion-panel-content>

              <v-expansion-panel-content>
                <div slot="header">Dati Cliente</div>
                <keep-alive>
                  <DatiClientePA v-if="tipoCliente.selected === 'PA'" :isMobile="isMobile"></DatiClientePA>
                </keep-alive>
                <keep-alive>
                  <DatiClientePrivato
                    v-if="tipoCliente.selected === 'Privato'"
                    :isMobile="isMobile"
                  ></DatiClientePrivato>
                </keep-alive>
              </v-expansion-panel-content>

              <v-expansion-panel-content>
                <div slot="header">Prodotti Servizi</div>
                <ProdottiServizi :isMobile="isMobile"></ProdottiServizi>
              </v-expansion-panel-content>

              <v-expansion-panel-content>
                <div slot="header">Dati Pagamento</div>
                <DatiPagamento :isMobile="isMobile"></DatiPagamento>
              </v-expansion-panel-content>

              <v-expansion-panel-content>
                <div slot="header">Calcolo Fattura</div>
                <CalcoloFattura :isMobile="isMobile"></CalcoloFattura>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-flex v-if="isMobile">
              <v-btn block>Anulla</v-btn>
              <v-btn block dark>Anteprima</v-btn>
              <v-btn block dark>Stampa</v-btn>
              <v-btn block dark>Salva Bozza</v-btn>
              <v-btn block color="success">Invia</v-btn>
            </v-flex>
          </v-layout>

          <v-layout v-if="isMobile === false" row wrap>
            <v-flex xs12 sm6 md6>
              <v-card width="100%" height="100%">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Dati Documento</div>
                  </div>
                </v-card-title>
                <v-card-text>
                  <DatiDocumento :tipoCliente="tipoCliente"></DatiDocumento>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-card width="100%" height="100%">
                <v-card-title primary-title>
                  <div class="headline">Dati Cliente</div>
                </v-card-title>
                <v-card-text>
                  <keep-alive>
                    <DatiClientePA v-if="tipoCliente.selected === 'PA'" :isMobile="isMobile"></DatiClientePA>
                  </keep-alive>
                  <keep-alive>
                    <DatiClientePrivato
                      v-if="tipoCliente.selected === 'Privato'"
                      :isMobile="isMobile"
                    ></DatiClientePrivato>
                  </keep-alive>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 sm12 md12>
              <v-card width="100%" height="100%">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Prodotti Servizi</div>
                  </div>
                </v-card-title>
                <v-card-text>
                  <ProdottiServizi :isMobile="isMobile"></ProdottiServizi>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-card width="100%" height="100%">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Dati Pagamento</div>
                  </div>
                </v-card-title>
                <v-card-text>
                  <DatiPagamento :isMobile="isMobile"></DatiPagamento>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 sm6 md6>
              <v-card width="100%" height="100%">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Calcolo Fattura</div>
                  </div>
                </v-card-title>
                <v-card-text>
                  <CalcoloFattura :isMobile="isMobile"></CalcoloFattura>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-card-actions v-if="isMobile === false">
              <v-btn>Anulla</v-btn>
              <v-btn dark>Anteprima</v-btn>
              <v-btn dark>Stampa</v-btn>
              <v-btn dark>Salva Bozza</v-btn>
              <v-btn color="success">Invia</v-btn>
            </v-card-actions>
          </v-layout>
        </v-container>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import DatiDocumento from "./DatiDocumento";
import DatiClientePA from "./DatiClientePA";
import DatiClientePrivato from "./DatiClientePrivato";
import ProdottiServizi from "./ProdottiServizi";
import DatiPagamento from "./DatiPagamento";
import CalcoloFattura from "./CalcoloFattura";
export default {
  name: "CreaFattura",
  props: {
    isMobile: Boolean
  },
  components: {
    DatiDocumento,
    DatiClientePA,
    DatiClientePrivato,
    ProdottiServizi,
    DatiPagamento,
    CalcoloFattura
  },
  data: () => ({
    valid: false,
    name: "",
    tipoCliente: { selected: "PA", options: ["PA", "Privato"] },
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

@media only screen and (min-width: 768px) {
  .headline {
    font-size: 24px !important;
  }

  /* .container {
    padding: 16px;
  } */

  .v-expansion-panel {
    margin-top: 0;
  }
}
</style>
