<template>
  <v-container fluid :class="{'pa-5':isMobile}">
    <v-layout align-center justify-center row>
      <v-card v-if="selected.length > 0">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click="dialog = true">
            <v-icon>add_shopping_cart</v-icon>
            <span style="margin-left: .5em;">Aggiungi Prodotto o Servizio</span>
          </v-btn>
        </v-card-title>
        <v-data-table :headers="selectedHeaders" :items="selected">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.number }}</td>

            <td class="text-xs-left">
              <v-text-field v-model="props.item.descrizione"></v-text-field>
            </td>
            <td class="text-xs-left">
              <v-text-field type="number" v-model.number="props.item.quantita"></v-text-field>
            </td>
            <td class="text-xs-left">{{ props.item.unitaDiMisura }}</td>
            <td class="text-xs-left">
              <v-text-field
                type="number"
                prefix="€"
                step="0.01"
                v-model.number="props.item.prezzoUnitario"
              ></v-text-field>
            </td>
            <td class="text-xs-center">
              <v-layout row wrap>
                <v-flex xs12 md6>
                  <v-select :items="['Sconto', 'Magg']"></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field suffix="%" v-model="props.item.scontoMaggVal"></v-text-field>
                </v-flex>
              </v-layout>
            </td>
            <td class="text-xs-left">{{ props.item.prezzoUnitario }}€</td>
            <td class="text-xs-left">
              <v-select value="22%" :items="codiceIVA"></v-select>
            </td>
            <td class="text-xs-left">
              <v-icon small>info</v-icon>
            </td>
            <td width="10%" class="text-xs-center">
              <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
              <v-icon small @click="deleteItem(props.item)">delete</v-icon>
            </td>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >La tua ricerca di "{{ search }}" non ha trovato risultati.</v-alert>
        </v-data-table>
      </v-card>

      <v-dialog v-model="dialog" width="80%" :fullscreen="isMobile">
        <v-btn
          v-show="selected.length == 0"
          slot="activator"
          color="success"
          dark
        >Aggiungi Prodotto o Servicio</v-btn>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Inserimento Prodotti e Servisi
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false" icon>
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-card>
              <v-card-title>Seleziona i prodotti o i servizi da inserire nel documento tra quelli già utilizzati oppure aggiungi un nuovo prodotto o servizio.
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Ricerca"
                  single-line
                  hide-details
                ></v-text-field>
                <v-dialog v-model="editDialog" max-width="800px">
                  <v-btn slot="activator" color="primary" dark>
                    <v-icon>person_add</v-icon>
                    <span style="margin-left: .5em;">Aggiungi Nuovo</span>
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.descrizione" label="Descrizione"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.codiceTipo" label="Codice Tipo"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.codiceValore" label="Codice Valore"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.prezzoUnitario"
                              label="Prezzo Unitario"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.unitaDiMisura"
                              label="Unità di Misura"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.codiceIVA" label="Codice IVA"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="products"
                :search="search"
                item-key="descrizione"
                v-model="selected"
                select-all
              >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
                  </td>
                  <td class="text-xs-left">{{ props.item.descrizione }}</td>
                  <td class="text-xs-left">{{ props.item.codiceTipo }}</td>
                  <td class="text-xs-left">{{ props.item.codiceValore }}</td>
                  <td class="text-xs-left">{{ props.item.prezzoUnitario }}</td>
                  <td class="text-xs-left">{{ props.item.unitaDiMisura }}</td>
                  <td class="text-xs-left">{{ props.item.codiceIVA }}</td>
                  <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                    <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                  </td>
                </template>
                <v-alert
                  slot="no-results"
                  :value="true"
                  color="error"
                  icon="warning"
                >La tua ricerca di "{{ search }}" non ha trovato risultati.</v-alert>
              </v-data-table>
            </v-card>
            <v-container v-if="selected.length > 0">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex
                      xs12
                      class="text-xs-center"
                    >Hai selezionato {{ selected.length }} prodotti o servizi da inserire in fattura, proseguire con la creazione?</v-flex>
                    <v-flex xs12 class="text-xs-center">
                      <v-btn dark color="success" @click="prosegui">Prosegui</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { EventBus } from "../event-bus.js";
import { store } from "../store.js";

export default {
  props: {
    isMobile: Boolean
  },
  data: () => ({
    search: "",
    selected: store.state.prodottiServizi.selected,
    dialog: false,
    editDialog: false,
    codiceIVA: [
      "22%",
      "10%",
      "4%",
      "0% -- Articolo Generico",
      "0% - N1 - Escluso Art. 15 DPR 633/72",
      "0% - N1 - Legge 27 novembre 1989, n. 384",
      "0% - N2 - Escluso Art. 13 5C DPR 633/72",
      "0% - N2 - Fuori campo IVA Art. 2 DPR 633/72",
      "0% - N2 - Fuori campo IVA Art. 3 DPR 633/72",
      "0% - N2 - Fuori campo IVA Art. 4 DPR 633/72",
      "0% - N2 - Fuori campo IVA Art. 5 DPR 633/72",
      "0% - N2 - Fuori campo IVA Art. 7 DPR 633/72",
      "0% - N2 - FUORI CAMPO IVA D.p.r. 633/72",
      "0% - N2 - Regime dei minimi Art. 1 L. 244/2007",
      "0% - N2 - Regime forfettario Art. 1 L. 190/2014",
      "0% - N3 - NON IMPONIBILE ART .7 (provvigioni extra UE)",
      "0% - N3 - Non Imponibile Art. 41 DL 331/93",
      "0% - N3 - NON IMPONIBILE ART. 7 TER D.p.r. 633/72",
      "0% - N3 - Non Imponibile Art. 74 DPR 633/72",
      "0% - N3 - Non Imponibile Art. 8 DPR 633/72",
      "0% - N3 - Non Imponibile Art. 9 DPR 633/72",
      "0% - N4 - Esente Art. 10 DPR 633/72",
      "0% - N5 - Escluso Art. 74 DPR 633/72",
      "0% - N5 - Regime del margine Art. 36 41/95",
      "0% - N6 - Reverse charge Art. 17 DPR 633/72",
      "0% - N6 - Reverse charge Art. 74 DPR 633/72",
      "0% - N7 - Vendite a distanza Art. 40/41 DL 331/93"
    ],
    products: null,
    selectedHeaders: [
      { text: "Nr.", value: "number" },
      { text: "Descrizione", value: "descrizione" },
      { text: "Quantità", value: "quantita" },
      { text: "Unità di Misura", value: "unitaDiMisura" },
      { text: "Prezzo Unitario", value: "prezzoUnitario" },
      { text: "Sconto / Magg.", value: "scontoMagg" },
      { text: "Importo", value: "importo" },
      { text: "Codice IVA", value: "codiceIVA" },
      { text: "Info", value: "info" },
      { text: "Azioni", value: "azioni", sortable: false, align: "center" }
    ],
    headers: [
      {
        text: "Descrizione",
        value: "descrizione"
      },
      { text: "Codice Tipo", value: "codiceTipo" },
      { text: "Codice Valore", value: "codiceValore" },
      { text: "Prezzo Unitario", value: "prezzoUnitario" },
      { text: "Unità di Misura", value: "unitaDiMisura" },
      { text: "Codice IVA", value: "codiceIVA" },
      { text: "Azioni", value: "azioni", sortable: false, align: "center" }
    ],
    editedIndex: -1,
    editedItem: {
      descrizione: "",
      codiceTipo: "",
      codiceValore: "",
      prezzoUnitario: "",
      unitaDiMisura: "",
      codiceIVA: ""
    },
    defaultItem: {
      descrizione: "",
      codiceTipo: "",
      codiceValore: "",
      prezzoUnitario: "",
      unitaDiMisura: "",
      codiceIVA: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuovo Prodotto" : "Modifica Prodotto";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    selected(arr) {
      store.prodottiServiziChangedAction(arr);
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.products = [
        {
          number: 1,
          descrizione: "Hosting Web e Mail ed assistenza",
          quantita: 1.0,
          codiceTipo: "",
          codiceValore: "",
          scontoMagg: "",
          scontoMaggVal: "",
          prezzoUnitario: 364.0,
          unitaDiMisura: "€/NR",
          codiceIVA: "22%"
        },
        {
          number: 2,
          descrizione: "Cassela di Posta Elettronica",
          quantita: 1.0,
          codiceTipo: "",
          codiceValore: "",
          scontoMagg: "",
          scontoMaggVal: "",
          prezzoUnitario: 25.0,
          unitaDiMisura: "€/NR",
          codiceIVA: "22%"
        },
        {
          number: 3,
          descrizione: "Licenza Mailbox",
          quantita: 1.0,
          codiceTipo: "",
          codiceValore: "",
          scontoMagg: "",
          scontoMaggVal: "",
          prezzoUnitario: 225.0,
          unitaDiMisura: "€/NR",
          codiceIVA: "22%"
        }
      ];
    },

    prosegui() {
      store.calculateTotal();
      this.dialog = false;
      EventBus.$emit(
        "prodotti-updated",
        store.state.prodottiServizi.nettoPagare
      );
      console.log(store);
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },

    deleteItem(item) {
      const index = this.products.indexOf(item);
      confirm("Sei sicuro di voler eliminare questo prodotto?") &&
        store.prodottiServiziRemoveAction(index);
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
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
