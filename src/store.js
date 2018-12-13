export const store = {
  debug: true,
  state: {
    fattura: null
  },
  editDessertsAction(editedIndex, editedItem) {
    if (this.debug)
      console.log("editDessertsAction triggered with", editedItem);
    Object.assign(this.state.desserts[editedIndex], editedItem);
  },
  addDessertAction(editedItem) {
    if (this.debug) console.log("addDessertAction triggered with", editedItem);
    this.state.desserts.push(editedItem);
  }
};
