class Depense {
  constructor({ id, montant, categorie, date, description }) {
    if (!montant || typeof montant !== 'number') {
      throw new Error('Montant invalide');
    }
    if (!categorie || typeof categorie !== 'string') {
      throw new Error('Catégorie invalide');
    }
    if (!date || isNaN(Date.parse(date))) {
      throw new Error('Date invalide');
    }
    this.id = id || null;
    this.montant = montant;
    this.categorie = categorie;
    this.date = new Date(date);
    this.description = description || '';
  }
}

module.exports = Depense;
