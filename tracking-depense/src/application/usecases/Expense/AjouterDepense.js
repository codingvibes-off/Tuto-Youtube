class AjouterDepense {
  constructor(depenseRepository) {
    this.depenseRepository = depenseRepository;
  }
  async execute(depense) {
     const existe = await this.depenseRepository.trouverParCritere({
      titre: depense.titre,
      montant: depense.montant,
      date: depense.date,
      utilisateurId: depense.utilisateurId
    });

    if (existe) {
      throw new Error("Cette dépense existe déjà.");
    }
    return await this.depenseRepository.ajouter(depense);
  }
}
module.exports = AjouterDepense;
