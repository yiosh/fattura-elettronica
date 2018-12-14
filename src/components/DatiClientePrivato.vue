<template>
  <v-container fluid :class="{'pa-5':isMobile}" fill-height>
    <v-layout align-center justify-center row>
      <v-card v-if="clientSelected" width="100%">
        <v-card-title primary-title>
          <h3 class="headline mb-0">{{ clientSelected.cliente}}</h3>
        </v-card-title>
        <v-card-text>
          <p>Identificativo: {{ clientSelected.identificativo }}</p>
          <p>P.IVA: {{ clientSelected.partitaIVA }}</p>
          <p>C.F: {{ clientSelected.codiceFiscale }}</p>
          <p>{{ clientSelected.indirizzoSede }}</p>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="dialog = true" flat color="info">Modifica</v-btn>
        </v-card-actions>
      </v-card>

      <v-dialog v-model="dialog" width="80%" :fullscreen="isMobile">
        <v-btn
          v-show="clientSelected === null"
          slot="activator"
          color="success"
          dark
        >Inserire un Cliente</v-btn>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Inserimento Cliente Privato
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-card>
              <v-card-title>Seleziona il destinatario del documento tra quelli già utilizzati oppure aggiungi un nuovo cliente.
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
              <v-data-table :headers="headers" :items="clients" v-model="selected" :search="search">
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.cliente }}</td>
                  <td class="text-xs-left">{{ props.item.identificativo }}</td>
                  <td class="text-xs-left">{{ props.item.codiceFiscale }}</td>
                  <td class="text-xs-left">{{ props.item.partitaIVA }}</td>
                  <td class="text-xs-left">{{ props.item.indirizzoSede }}</td>
                  <td class="justify-center layout px-0">
                    <!-- <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                    <v-icon small @click="deleteItem(props.item)">delete</v-icon>-->
                    <v-btn @click="clientSelect(props.item)" color="success">Seleziona</v-btn>
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
    clientSelected: null,
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
      { text: "identificativo", value: "identificativo" },
      { text: "Codice Fiscale", value: "codiceFiscale" },
      { text: "P.IVA", value: "partitaIVA" },
      { text: "Indirizzo Sede", value: "indirizzoSede" },
      { text: "Azioni", value: "azioni", sortable: false, align: "center" }
    ],
    editedIndex: -1,
    editedItem: {
      cliente: "",
      identificativo: "",
      codiceFiscale: "",
      partitaIVA: "IT08054640720",
      indirizzoSede: "Via Giuseppe Fanelli"
    },
    defaultItem: {
      cliente: "",
      identificativo: "",
      codiceFiscale: "",
      partitaIVA: "",
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
          cliente: "La Spada Giuliana",
          identificativo: "giulianalaspada@legalmail.it",
          codiceFiscale: "LSPGLN71R71I119H",
          partitaIVA: "IT02110930746",
          indirizzoSede: "Via Mazzini"
        },
        {
          cliente: "Serio Martino",
          identificativo: "info@ristorantenausikaa.it",
          codiceFiscale: "SREMTN75C20E986Z",
          partitaIVA: "IT02070910738",
          indirizzoSede: "Via Arco Fumarola"
        },
        {
          cliente: "Agrobiotec Srl",
          identificativo: "agrobiotec@pec.it",
          codiceFiscale: "08054640720",
          partitaIVA: "IT08054640720",
          indirizzoSede: "Via Giuseppe Fanelli"
        }
      ];
    },

    clientSelect(value) {
      this.clientSelected = value;
      this.dialog = false;
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
