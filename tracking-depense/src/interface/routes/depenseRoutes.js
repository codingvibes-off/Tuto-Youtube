const express = require('express');
const router = express.Router();

const MongoDepenseRepository = require('../../infrastructure/repositories/MongoDepenseRepository');
const AjouterDepense = require('../../application/usecases/AjouterDepense');
const ListerDepenses = require('../../application/usecases/ListerDepenses');
const DeleteDepense = require('../../application/usecases/DeleteDepense');
const UpdateDepense = require('../../application/usecases/UpdateDepense');

const depenseRepo = new MongoDepenseRepository();

router.post('/', async (req, res) => {
  try {
    const usecase = new AjouterDepense(depenseRepo);
    const result = await usecase.execute(req.body);
    res.status(201).json(result, "Les dépenses ont bien été ajouté");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  console.log(req.params.id)
  try {
     const usecase = new DeleteDepense(depenseRepo)
     const result = await usecase.execute(req.params.id)
    if (result) {
      res.status(200).json({ message: 'Dépense supprimée' });
    } else {
      res.status(404).json({ message: 'Dépense non trouvée' });
    }
   
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/', async (req, res) => {
  try {
    const usecase = new ListerDepenses(depenseRepo);
    const result = await usecase.execute();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put('/:id', async (req, res) => {
   try {
     const usecase = new UpdateDepense(depenseRepo)
     console.log(req.body)
     const result = await usecase.execute(req.params.id, req.body)
    if (result) {
      res.status(200).json({ message: 'Dépense modifiée' });
    } else {
      res.status(404).json({ message: 'Dépense non trouvée' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
