<template>
  <v-flex xs12 sm12 md12>
    <v-card width="100%" height="100%">
      <v-card-title primary-title>
        <div>
          <div class="headline">Prodotti Servisi</div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-layout align-center justify-center row>
            <v-dialog v-model="dialog" width="80%">
              <v-btn slot="activator" color="success" dark>Aggiungi Prodotto o Servicio</v-btn>

              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  primary-title
                >Inserimento Prodotti e Servisi
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
                                  <v-text-field
                                    v-model="editedItem.descrizione"
                                    label="Descrizione"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                  <v-text-field v-model="editedItem.codiceTipo" label="Codice Tipo"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                  <v-text-field
                                    v-model="editedItem.codiceValore"
                                    label="Codice Valore"
                                  ></v-text-field>
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
                            <v-btn dark color="success" @click="close">Prosegui</v-btn>
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
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    search: "",
    selected: [],
    dialog: false,
    editDialog: false,
    selectedClient: null,
    products: null,
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
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.products = [
        {
          descrizione: "Hosting Web e Mail ed assistenza",
          codiceTipo: "",
          codiceValore: "",
          prezzoUnitario: "364,00",
          unitaDiMisura: "€/NR",
          codiceIVA: "22%"
        },
        {
          descrizione: "Cassela di Posta Elettronica",
          codiceTipo: "",
          codiceValore: "",
          prezzoUnitario: "25,00",
          unitaDiMisura: "€/NR",
          codiceIVA: "22%"
        },
        {
          descrizione: "Licenza Mailbox",
          codiceTipo: "",
          codiceValore: "",
          prezzoUnitario: "225,00",
          unitaDiMisura: "€/NR",
          codiceIVA: "22%"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },

    deleteItem(item) {
      const index = this.products.indexOf(item);
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
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
