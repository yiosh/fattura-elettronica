<template>
  <v-container fluid>
    <v-layout align-center justify-center row>
      <v-dialog v-model="dialog" width="80%" :fullscreen="isMobile">
        <v-btn slot="activator" color="success" dark>Inserire un Cliente</v-btn>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Inserimento PA Cliente
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-card>
              <v-card-title>Seleziona la PA destinataria del documento tra quelle già utilizzate oppure aggiungi una nuova PA tra i clienti.
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
                            <v-text-field v-model="editedItem.cliente" label="Cliente"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              v-model="editedItem.codiceUnivocoUfficio"
                              label="Codice Univoco Ufficio"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.codiceFiscale" label="Codice Fiscale"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.indirizzoSede" label="Indirizzo Sede"></v-text-field>
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
                :items="clients"
                v-model="selected"
                item-key="cliente"
                select-all
                :search="search"
              >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
                  </td>
                  <td class="text-xs-left">{{ props.item.cliente }}</td>
                  <td class="text-xs-left">{{ props.item.codiceUnivocoUfficio }}</td>
                  <td class="text-xs-left">{{ props.item.codiceFiscale }}</td>
                  <td class="text-xs-left">{{ props.item.indirizzoSede }}</td>
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
                >Your search for "{{ search }}" found no results.</v-alert>
              </v-data-table>
            </v-card>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    isMobile: Boolean
  },
  data: () => ({
    search: "",
    selected: [],
    dialog: false,
    editDialog: false,
    selectedClient: null,
    clients: null,
    headers: [
      {
        text: "Cliente",
        value: "cliente"
      },
      { text: "Codice Univoco Ufficio", value: "codiceUnivocoUfficio" },
      { text: "Codice Fiscale", value: "codiceFiscale" },
      { text: "Indirizzo Sede", value: "indirizzoSede" },
      { text: "Azioni", value: "azioni", sortable: false, align: "center" }
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
    initialize() {
      this.clients = [
        {
          cliente: "Comune di Bitetto",
          codiceUnivocoUfficio: "GE44p5",
          codiceFiscale: "00939820726",
          indirizzoSede: "Piazza Aldo Moro"
        },
        {
          cliente: "Comune di Bitetto - Settore 2",
          codiceUnivocoUfficio: "I7XFY2",
          codiceFiscale: "00939820726",
          indirizzoSede: "Piazza Aldo Moro"
        },
        {
          cliente: "Comune di Bitetto - Settore 3",
          codiceUnivocoUfficio: "KQG3LT",
          codiceFiscale: "00939820726",
          indirizzoSede: "Piazza Aldo Moro"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },

    deleteItem(item) {
      const index = this.clients.indexOf(item);
      confirm("Sei sicuro di voler eliminare questo client?") &&
        this.clients.splice(index, 1);
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
