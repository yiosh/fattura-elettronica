<template>
  <v-container fluid>
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
          <v-combobox
            v-model="tipoCliente[0]"
            :items="tipoCliente.selected == 'PA' ? ['FATTPA'] : ['FPR']"
            label="Sezionale"
          ></v-combobox>
          <v-layout row wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="progresivo" label="Progressivo" disabled></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-btn @click="dialog = false">Modifica Progressivo</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "DatiDocumento",
  props: {
    isMobile: Boolean
  },
  data() {
    return {
      menu: false,
      tipoCliente: { selected: "PA", options: ["PA", "Privato"] },
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
  }
};
</script>
