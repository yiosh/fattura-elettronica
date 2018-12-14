<template>
  <v-container fluid>
    <v-layout align-center justify-center row>
      <v-dialog v-model="dialog" width="80%" :fullscreen="isMobile">
        <v-btn slot="activator" color="success" dark>Inserire Dati pagamento</v-btn>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Inserimento Dati Pagamento
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" icon>
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>

          <v-stepper v-model="e6" vertical>
            <v-stepper-step editable :complete="e6 > 1" step="1">Pagamento
              <!-- <small>Summarize if needed</small> -->
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-card flat>
                <v-container grid-list-xl>
                  <v-layout row wrap>
                    <v-flex xs12 md4>
                      <v-form v-model="valid">
                        <v-text-field
                          v-model="ripartizioneRate[0].beneficiario"
                          :counter="200"
                          label="Beneficiario"
                        ></v-text-field>
                        <v-select
                          v-model="ripartizioneRate[0].condizioniDiPagamento"
                          required
                          :items="['Pagamento a rate', 'Pagamento completo', 'Anticipo']"
                          label="Condizioni di Pagamento"
                        ></v-select>
                        <v-select
                          v-model="ripartizioneRate[0].metodoDiPagamento"
                          required
                          :items="[
                                  'Assegno',
                                  'Assegno circolare',
                                  'Bonifico',
                                  'Bonifico 30 60 90 GG FM DF',
                                  'Bonifico 30 GG DF',
                                  'Bonifico 30 GG FM DF',
                                  'Bonifico 30 60 90 120 GG FM DF',
                                  'Bonifico 60 90 GG DF',
                                  'Bonifico 60 90 120 GG FM DF',
                                  'Bonifico 30 60 90 GG FM DF',
                                  'Carta di Credito',
                                  'Contanti',
                                  'RIBA',
                                  'RIBA 30 60 90 GG FM DF',
                                  'RIBA 30 GG DF',
                                  'RIBA 30 GG FM DF',
                                  'RIBA 60 90 GG 120 FM DF',
                                  'RIBA 60 GG DF',
                                  'RIBA 60 GG FM DF'
                                ]"
                          label="Metodo di Pagamento"
                        ></v-select>
                      </v-form>
                    </v-flex>
                    <v-flex
                      v-if="ripartizioneRate[0].beneficiario !== '' && ripartizioneRate[0].condizioniDiPagamento !== '' && ripartizioneRate[0].metodoDiPagamento !== ''"
                      xs12
                      md8
                    >
                      <v-data-table
                        :headers="headers"
                        :items="ripartizioneRate"
                        class="elevation-1"
                      >
                        <template slot="items" slot-scope="props">
                          <td class="text-xs-right">{{ props.item.numeroRata }}</td>
                          <td class="text-xs-right">
                            <CalendarMenu :date="props.item.dataScadenza"></CalendarMenu>
                          </td>
                          <td class="text-xs-right">
                            <v-text-field
                              type="number"
                              step="0.01"
                              v-model="props.item.importo"
                              prefix="€"
                            ></v-text-field>
                          </td>
                        </template>

                        <template slot="footer">
                          <td :colspan="headers.length">
                            <v-layout align-center justify-end row>
                              <strong>Totale: {{ (ripartizioneRate[0].importo).toFixed(2) }}€</strong>
                            </v-layout>
                          </td>
                        </template>
                      </v-data-table>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
              <v-btn color="primary" @click="e6 = 2">Prosegui</v-btn>
              <v-btn flat>Anulla</v-btn>
            </v-stepper-content>

            <v-stepper-step editable :complete="e6 > 2" step="2">Altri Dati</v-stepper-step>

            <v-stepper-content step="2">
              <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
              <v-btn color="primary" @click="e6 = 3">Prosegui</v-btn>
              <v-btn flat>Anulla</v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import CalendarMenu from "./CalendarMenu";
export default {
  components: {
    CalendarMenu
  },
  data: () => ({
    props: {
      isMobile: Boolean
    },
    e6: 1,
    valid: false,
    modal: false,
    menu: false,
    snackColor: "",
    snackText: "",
    max25chars: v => v.length <= 25 || "Input too long!",
    pagination: {},
    search: "",
    dialog: false,
    editDialog: false,
    selectedClient: null,
    ripartizioneRate: null,
    headers: [
      {
        text: "Numero Rata",
        value: "numeroRata"
      },
      { text: "Data scadenza", value: "dataScadenza" },
      { text: "Importo", value: "importo" }
    ],
    editedIndex: -1,
    editedItem: {
      cliente: "",
      codiceUnivocoUfficio: "",
      codiceFiscale: "",
      indirizzoSede: ""
    },
    defaultItem: {
      cliente: "",
      codiceUnivocoUfficio: "",
      codiceFiscale: "",
      indirizzoSede: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    importoFixed(importo) {
      return importo.toFixed(2);
    },
    initialize() {
      this.ripartizioneRate = [
        {
          numeroRata: 1,
          beneficiario: "",
          condizioniDiPagamento: "",
          metodoDiPagamento: "",
          dataScadenza: new Date().toISOString().substr(0, 10),
          importo: 400.5
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.editDialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.clients[this.editedIndex], this.editedItem);
      } else {
        this.clients.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
