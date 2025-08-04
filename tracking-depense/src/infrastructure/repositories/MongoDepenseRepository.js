const DepenseModel = require('../mongoose/DepenseModel');
const Depense = require('../../domain/Depense');
const DepenseRepository = require('../../domain/interfaces/DepenseRepository');
const { ObjectId } = require('mongodb');

class MongoDepenseRepository extends DepenseRepository {
    async ajouter(depense) {
          const saved = await DepenseModel.create({
          montant: depense.montant,
          categorie: depense.categorie,
          date: depense.date,
          description: depense.description
          });
        return new Depense(saved);
    }
   async lister() {
    const data = await DepenseModel.find();
    return data.map(d => new Depense(d));
   }
    async trouverParCritere(critere) {
      const found = await DepenseModel.findOne(critere);
      if (!found) return null;
      return new Depense(found);
   }
   async delete(id) {
      console.log("Suppression de l'ID :", id);
       if (!ObjectId.isValid(id)) {
        throw new Error('ID invalide');
      }
      return await DepenseModel.findByIdAndDelete(new ObjectId(id));
    }

  async update(id, updateData) {
    const result = await DepenseModel.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );
    if (!result) {
      throw new Error("Dépense non trouvée");
    }

    return new Depense(result);
  }
}
module.exports = MongoDepenseRepository;
