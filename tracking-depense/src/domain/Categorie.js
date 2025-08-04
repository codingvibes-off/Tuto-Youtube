class Categorie { 
  constructor({ id, name,color, icon, userId }) {
    if (!name || typeof name !== 'string') {
      throw new Error('Catégorie invalide');
    }
    this.id = id || null;
    this.name = name;
    this.color = color;
    this.icon = icon;
    this.userId = userId;
  }
}

module.exports = Categorie;
