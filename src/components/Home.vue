<template>
  <v-layout text-xs-center wrap>
    <v-flex xs12>
      <v-dialog v-model="dialog" max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Account"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.number" label="Number"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.iva" label="P. iva"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.sede" label="Sede"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.sede2" label="Sede2"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.mail" label="Mail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.cellphone" label="Cellphone"></v-text-field>
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
      <v-card>
        <v-card-title class="table-card-title">Clients
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          item-key="name"
          class="elevation-1"
          :search="search"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-left">
                <div class="account-cell">
                  <v-layout>
                    <v-flex xs4 md3 align-self-center>
                      <v-icon>account_circle</v-icon>
                    </v-flex>
                    <v-flex xs8 md9 align-self-center>{{ props.item.name }}</v-flex>
                  </v-layout>
                </div>
              </td>
              <td class="text-xs-left ragione-cell">
                <div class="data-cell">
                  <v-layout>
                    <strong>{{ props.item.number }}</strong>
                    <span class="address">{{ props.item.address }}</span>
                  </v-layout>
                  P. iva {{ props.item.iva }}
                  <br>
                  <v-chip
                    v-for="chip in props.item.chips"
                    label
                    small
                    text-color="white"
                    :color="chip.color"
                    :key="chip.text"
                  >{{ chip.text }}</v-chip>
                </div>
              </td>
              <td class="text-xs-left">
                <v-layout>
                  <v-flex xs12 md12>{{ props.item.sede }}</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12 md12>{{ props.item.sede2}}</v-flex>
                </v-layout>
              </td>
              <td class="text-xs-left">
                <v-layout v-if="props.item.mail">
                  <v-flex xs2 md2 align-self-center>
                    <v-icon>mail_outline</v-icon>
                  </v-flex>
                  <v-flex xs10 md10 align-self-center>{{ props.item.mail }}</v-flex>
                </v-layout>
                <v-layout v-if="props.item.mail2">
                  <v-flex xs2 md2 align-self-center>
                    <v-icon color="green">mail_outline</v-icon>
                  </v-flex>
                  <v-flex xs10 md10 align-self-center>{{ props.item.mail2 }}</v-flex>
                </v-layout>
                <v-layout v-if="props.item.phone">
                  <v-flex xs2 md2 align-self-center>
                    <v-icon>phone</v-icon>
                  </v-flex>
                  <v-flex xs10 md10 align-self-center>{{ props.item.phone }}</v-flex>
                </v-layout>
                <v-layout v-if="props.item.cellphone">
                  <v-flex xs2 md2 align-self-center>
                    <v-icon>smartphone</v-icon>
                  </v-flex>
                  <v-flex xs10 md10 align-self-center>{{ props.item.cellphone }}</v-flex>
                </v-layout>
              </td>
              <td class="text-xs-left">
                <v-layout>
                  <v-flex xs4 md4 align-self-center>
                    <v-btn @click="editItem(props.item)" fab dark small color="info">
                      <v-icon dark>border_color</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xs4 md4 align-self-center>
                    <v-btn fab dark small color="success">
                      <v-icon dark>send</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xs4 md4 align-self-center></v-flex>
                </v-layout>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { store } from '../store.js'

export default {
  data: () => ({
    search: '',
    dialog: false,
    editedIndex: -1,
    editedItem: {
      value: null,
      name: '',
      number: null,
      address: '',
      iva: '',
      chips: [
        {
          text: '',
          color: ''
        },
        {
          text: '',
          color: ''
        }
      ],
      sede: '',
      sede2: '',
      mail: '',
      cellphone: ''
    },
    defaultItem: {
      value: null,
      name: '',
      number: null,
      address: '',
      iva: '',
      chips: [
        {
          text: '',
          color: ''
        },
        {
          text: '',
          color: ''
        }
      ],
      sede: '',
      sede2: '',
      mail: '',
      cellphone: ''
    },
    headers: [
      { text: 'Account', value: 'name' },
      { text: 'Ragione Sociale', value: 'number' },
      { text: 'Sede Legale/ Sede Operativa', value: 'sede' },
      { text: 'Contatti', value: 'mail' },
      { text: 'Recenti | Meno recenti', value: 'name', sortable: false }
    ],
    desserts: []
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.desserts = store.state.desserts
    },
    editItem(item) {
      console.log('clicked')
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save() {
      if (this.editedIndex > -1) {
        store.editDessertsAction(this.editedIndex, this.editedItem)
      } else {
        store.addDessertAction(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>
.account-cell {
  display: flex;
  align-items: center;
}

.data-cell {
  padding: 5px 0;
}

.address {
  margin: 0 3px;
}
.table-card-title {
  margin: 0 1em;
}
</style>
