class UpdateDepense {
      constructor(depenseRepository) {
    this.depenseRepository = depenseRepository;
  }

  async execute(id,body) {
    return await this.depenseRepository.update(id,body);
  }
}

module.exports = UpdateDepense;
