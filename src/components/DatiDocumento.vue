<template>
  <v-container fluid :class="{'pa-5':isMobile}">
    <v-form v-model="valid">
      <v-layout row wrap>
        <v-flex xs12 sm6 md6>
          <v-combobox
            v-model="tipoCliente.selected"
            :items="tipoCliente.options"
            label="Tipo Cliente"
          ></v-combobox>
          <v-combobox
            v-model="tipoDocumento.selected"
            :items="tipoDocumento.options"
            label="Tipo Documento"
          ></v-combobox>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="date"
              label="Data Documento"
              append-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-select
            :items="tipoCliente.selected == 'PA' ? ['FATTPA'] : ['FPR']"
            :value="tipoCliente.selected == 'PA' ? 'FATTPA' : 'FPR'"
            label="Standard"
          ></v-select>
          <v-layout row wrap>
            <v-flex xs12 sm4 md4>
              <v-text-field v-model="progresivo" label="Progressivo" :disabled="progresivoActive"></v-text-field>
            </v-flex>
            <v-flex xs12 sm8 md6>
              <v-dialog v-model="dialog" width="500">
                <v-btn slot="activator">Modifica Progressivo</v-btn>

                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                  >Numerazione Progressiva Fattura</v-card-title>

                  <v-card-text>
                    <v-layout row wrap justify-center>
                      <v-flex xs12 md2>
                        <v-layout justify-center align-center row fill-height>
                          <v-icon color="warning" x-large>info</v-icon>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 md10>
                        Stai disabilitando la numerazione progressiva automatica.
                        Ti ricordiamo che il numero del documento deve essere univoco, progressivo e deve seguire l'ordine cronologico senza interruzioni per periodo di imposta.
                      </v-flex>
                    </v-layout>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false">Annulla</v-btn>
                    <v-btn color="primary" flat @click="activateProgressivo">Ok, gestici numerazione</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 md5>
              <v-dialog v-model="dialogEsigibilita" width="50%">
                <v-btn slot="activator" color="primary" dark>Esigibilità IVA</v-btn>

                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Esigibilità'IVA</v-card-title>

                  <v-card-text>Attraverso questa sezione puoi indicare il regime di esigibilità dell'IVA (differita o immediata) o la modalità di versamento dell'imposta (scissione dei pagamenti).
                    <v-layout row wrap>
                      <v-spacer></v-spacer>
                      <v-flex>
                        <v-layout justify-center align-center row fill-height>
                          <v-switch style="margin-bottom: 0;" label="Attivo" v-model="attivo"></v-switch>
                        </v-layout>
                      </v-flex>
                      <v-flex>
                        <v-layout justify-center align-center row fill-height>
                          <v-select
                            v-if="attivo"
                            :items="['IVA ad esegibilità immediata', 'IVA ad esegibilità differita', 'Scissione dei pagamenti']"
                            value="IVA ad esegibilità immediata"
                          ></v-select>
                        </v-layout>
                      </v-flex>
                      <v-spacer></v-spacer>
                    </v-layout>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialogEsigibilita = false">Anulla</v-btn>
                    <v-btn color="primary" flat @click="dialogEsigibilita = false">Salva</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
            <v-flex xs12 sm6 md7>
              <v-switch style="margin-bottom: 0;" label="Attivo" v-model="attivo"></v-switch>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "DatiDocumento",
  props: {
    isMobile: Boolean,
    tipoCliente: Object
  },
  data() {
    return {
      attivo: true,
      menu: false,
      dialog: false,
      dialogEsigibilita: false,
      progresivoActive: true,
      progresivo: 4,
      tipoDocumento: {
        selected: "Fattura",
        options: [
          "Fattura",
          "Acconto/anticipo su fattura",
          "Acconto/anticipo su parcella",
          "Nota di credito",
          "Nota di debito",
          "Parcela"
        ]
      },
      date: new Date().toISOString().substr(0, 10),
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
      ]
    };
  },
  methods: {
    activateProgressivo() {
      this.progresivoActive = false;
      this.dialog = false;
    }
  }
};
</script>
