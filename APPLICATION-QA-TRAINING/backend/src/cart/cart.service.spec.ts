import { CartService } from './cart.service';

// summarize() est une méthode privée : TypeScript interdit d'y accéder
// depuis l'extérieur de la classe (service.summarize(...) ne compile pas).
// Le cast `as any` contourne cette vérification uniquement pour le test,
// sans changer la visibilité de la méthode dans le code de production.
describe('CartService - summarize (calcul du panier)', () => {
  let service: any;

  beforeEach(() => {
    // Le prisma n'est jamais utilisé par summarize(), un `null` suffit ici.
    service = new CartService(null as any);
  });

  it('retourne un sous-total à 0 et itemCount à 0 pour un panier vide', () => {
    // Arrange
    const items: { unitPrice: number; travelers: number }[] = [];

    // Act
    const result = service.summarize(items);

    // Assert
    expect(result.subtotal).toBe(0);
    expect(result.itemCount).toBe(0);
  });

  it('calcule le sous-total pour un seul article avec plusieurs voyageurs', () => {
    const items = [{ unitPrice: 150, travelers: 3 }];

    const result = service.summarize(items);

    expect(result.subtotal).toBe(450); // 150 * 3
    expect(result.itemCount).toBe(1);
  });

  it('additionne correctement plusieurs articles de prix et de voyageurs différents', () => {
    const items = [
      { unitPrice: 100, travelers: 2 }, // 200
      { unitPrice: 80, travelers: 1 }, // 80
      { unitPrice: 50, travelers: 4 }, // 200
    ];

    const result = service.summarize(items);

    expect(result.subtotal).toBe(480); // 200 + 80 + 200
    expect(result.itemCount).toBe(3);
  });
});
