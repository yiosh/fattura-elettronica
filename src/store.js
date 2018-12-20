export const store = {
  debug: true,
  state: {
    fattura: null,
    prodottiServizi: {
      importoServizi: 0,
      totaleImponibile: 0,
      totaleImposta: 0,
      totaleDocumento: 0,
      nettoPagare: 0,
      selected: []
    }
  },
  calculateTotal() {
    this.state.prodottiServizi.totaleDocumento =
      this.state.prodottiServizi.importoServizi +
      this.state.prodottiServizi.totaleImposta;

    this.state.prodottiServizi.nettoPagare = this.state.prodottiServizi.totaleDocumento;
  },
  prodottiServiziRemoveAction(editedIndex) {
    if (this.debug)
      console.log("editDessertsAction triggered with", editedIndex);
    this.state.prodottiServizi.selected.splice(editedIndex, 1);
    // Object.assign(this.state.desserts[editedIndex], editedItem);
  },
  prodottiServiziChangedAction(arr) {
    if (this.debug)
      console.log("prodottiServiziChangedAction triggered with", arr);
    this.state.prodottiServizi.importoServizi = 0;
    this.state.prodottiServizi.totaleImponibile = 0;
    this.state.prodottiServizi.totaleImposta = 0;
    this.state.prodottiServizi.selected = arr;

    this.state.prodottiServizi.selected.forEach(element => {
      this.state.prodottiServizi.importoServizi += Number(
        element.prezzoUnitario
      );
      this.state.prodottiServizi.totaleImponibile = this.state.prodottiServizi.importoServizi;
      const codiceVal = element.codiceIVA.replace("%", "");
      this.state.prodottiServizi.totaleImposta +=
        (Number(element.prezzoUnitario) * Number(codiceVal)) / 100;
    });
  }
  // addProdottiAction(element) {
  //   if (this.debug) console.log("addProdottiAction triggered with", element);
  //   this.state.selected.push(element);
  // }
};
