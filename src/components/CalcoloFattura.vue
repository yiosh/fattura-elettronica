<template>
  <v-container fluid :class="{'pa-5':isMobile}">
    <v-dialog v-model="dialog" width="40%" :fullscreen="isMobile">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Calcolatore Automatico</v-card-title>
        <v-card-text>
          <v-layout row wrap justify-center>
            <v-flex xs12 md1>
              <v-layout justify-center align-center row fill-height>
                <v-icon color="warning" x-large>info</v-icon>
              </v-layout>
            </v-flex>
            <v-flex xs12 md11>Disabilitando quest'opzione, puoi impostare manualmente i calcoli.
              <br>
              <br>Ricordiamo che una non corretta compilazione del documento potrebbe generare errori di invio o scarto da parte del Sistema di Interscambio (SDI).
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="anulla">Anulla</v-btn>
          <v-btn flat color="blue darken-1" @click="dialog = false">Ok, ho capito</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card flat width="100%">
      <v-card-text v-if="attivo">
        <v-layout row wrap justify-space-between>
          <v-flex xs12 md9>Importo Prodotti o Servizi:</v-flex>
          <v-flex xs12 md3 style="text-align: right">{{ (localState.importoServizi).toFixed(2) }}€</v-flex>

          <v-flex xs12 md9>Totale imponibile:</v-flex>
          <v-flex xs12 md3 style="text-align: right">{{ (localState.totaleImponibile).toFixed(2) }}€</v-flex>

          <v-flex xs12 md9>Totale Imposta</v-flex>
          <v-flex xs12 md3 style="text-align: right">{{ (localState.totaleImposta).toFixed(2) }}€</v-flex>

          <v-flex xs12 md9>Totale Documento:</v-flex>
          <v-flex xs12 md3 style="text-align: right">{{ (localState.totaleDocumento).toFixed(2) }}€</v-flex>

          <v-flex xs12 md9>
            <strong>Netto a Pagare:</strong>
          </v-flex>
          <v-flex xs12 md3 style="text-align: right">
            <strong>{{ nettoPagareFixed }}€</strong>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
      </v-card-text>

      <v-card-text v-if="attivo === false">
        <v-layout row wrap justify-space-between>
          <v-flex xs12 md9 style="padding: 0">Importo Prodotti o Servizi:</v-flex>
          <v-flex xs12 md3 style="padding: 0">
            <v-text-field suffix="€" v-model="localState.importoServizi" disabled></v-text-field>
          </v-flex>

          <v-flex xs12 md9 style="padding: 0">Totale imponibile:</v-flex>
          <v-flex xs12 md3 style="padding: 0">
            <v-text-field suffix="€" v-model="localState.totaleImponibile" disabled></v-text-field>
          </v-flex>

          <v-flex xs12 md9 style="padding: 0">Totale Imposta</v-flex>
          <v-flex xs12 md3 style="padding: 0">
            <v-text-field suffix="€" v-model="localState.totaleImposta" disabled></v-text-field>
          </v-flex>

          <v-flex xs12 md9 style="padding: 0">Totale Documento:</v-flex>
          <v-flex xs12 md3 style="padding: 0">
            <v-text-field suffix="€" v-model="localState.totaleDocumento"></v-text-field>
          </v-flex>

          <v-flex xs12 md9 style="padding: 0">
            <strong>Netto a Pagare:</strong>
          </v-flex>
          <v-flex xs12 md3 style="padding: 0">
            <strong>
              <v-text-field suffix="€" v-model="localState.nettoPagare"></v-text-field>
            </strong>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
      </v-card-text>

      <v-card-actions>
        <v-layout row wrap>
          <v-flex xs12>Calcolatore Automatico</v-flex>
          <v-flex xs12>
            <v-switch style="margin-top: 0;" label="Attivo" v-model="attivo"></v-switch>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { store } from "../store.js";

export default {
  props: {
    isMobile: Boolean
  },
  data() {
    return {
      attivo: true,
      dialog: false,
      localState: store.state.prodottiServizi
    };
  },
  watch: {
    attivo() {
      if (this.dialog === false && this.attivo === false) {
        this.dialog = true;
      }
    }
  },
  methods: {
    anulla() {
      this.dialog = false;
      this.attivo = true;
    }
  },
  computed: {
    nettoPagareFixed() {
      return this.localState.nettoPagare.toFixed(2);
    }
  }
};
</script>
