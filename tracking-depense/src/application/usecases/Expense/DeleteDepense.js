class DeleteDepense {
  constructor(depenseRepository) {
    this.depenseRepository = depenseRepository;
  }

  async execute(id) {
    return await this.depenseRepository.delete(id);
  }
}

module.exports = DeleteDepense;
