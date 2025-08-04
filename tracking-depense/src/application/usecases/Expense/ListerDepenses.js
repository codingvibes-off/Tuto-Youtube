class ListerDepenses {
  constructor(depenseRepository) {
    this.depenseRepository = depenseRepository;
  }
  async execute() {
    return await this.depenseRepository.lister();
  }
}

module.exports = ListerDepenses;
