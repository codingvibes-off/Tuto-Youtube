import { PaymentService } from './payment.service';
import { ChargeDto } from './dto/charge.dto';

// On instancie le service "à la main" (sans module Nest, sans base de données)
// car simulate() est une fonction pure : à entrée identique, sortie identique,
// aucun effet de bord. C'est exactement ce qui rend une méthode facile à
// tester unitairement.
describe('PaymentService - simulate', () => {
  let service: PaymentService;

  beforeEach(() => {
    // Le premier argument (prisma) n'est jamais utilisé par simulate(),
    // on peut donc passer `null` sans risque ici.
    service = new PaymentService(null as any);
  });

  function buildDto(overrides: Partial<ChargeDto> = {}): ChargeDto {
    return {
      cardholderName: 'Jean Dupont',
      cardNumber: '1234567890123456', // se termine par 6 (pair) -> accepté par défaut
      expiry: '12/30', // date future
      cvv: '123',
      ...overrides,
    };
  }

  it('refuse une carte dont la date d\'expiration est passée', () => {
    // Arrange
    const dto = buildDto({ expiry: '01/20' }); // janvier 2020 -> expirée

    // Act
    const result = service.simulate(dto);

    // Assert
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('EXPIRED_CARD');
  });

  it('refuse une carte dont le numéro se termine par un chiffre impair', () => {
    const dto = buildDto({ cardNumber: '1234567890123457' }); // se termine par 7

    const result = service.simulate(dto);

    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('CARD_DECLINED');
  });

  it('accepte le paiement quand la carte est valide et le numéro se termine par un chiffre pair', () => {
    const dto = buildDto({ cardNumber: '1234567890123458' }); // se termine par 8

    const result = service.simulate(dto);

    expect(result.success).toBe(true);
    expect(result.errorCode).toBeUndefined();
  });
});
