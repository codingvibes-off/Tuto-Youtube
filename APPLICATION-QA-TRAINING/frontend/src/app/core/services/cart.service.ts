import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { CartItem, CartSummary } from '../models/models';

// Codes promo de démonstration (pas de vrai moteur de règles côté back).
const PROMO_CODES: Record<string, number> = {
  VOYAGO10: 10,
  BIENVENUE15: 15,
};

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>([]);
  readonly promoCode = signal<string | null>(null);

  // BUG_CONNU #4 (voir BUGS_CONNUS.md — bug de régression) : le montant de la
  // réduction est figé au moment où le code promo est appliqué (calculé une
  // seule fois sur le sous-total du moment), au lieu d'être recalculé à
  // chaque changement du panier. Si l'utilisateur modifie le nombre de
  // voyageurs APRÈS avoir appliqué un code, le sous-total évolue mais la
  // réduction affichée reste celle d'origine : le total ne correspond plus
  // aux "-10%"/"-15%" annoncés. Rien ne casse visiblement tant qu'on
  // n'enchaîne pas ces deux actions dans cet ordre précis — c'est typiquement
  // le genre de régression qu'un test manuel ponctuel ne détecte pas, mais
  // qu'un test de non-régression automatisé (Playwright) attraperait.
  private readonly frozenDiscount = signal<number>(0);

  readonly subtotal = computed(() => this.items().reduce((sum, item) => sum + item.unitPrice * item.travelers, 0));

  readonly discountAmount = computed(() => (this.promoCode() ? this.frozenDiscount() : 0));

  readonly total = computed(() => Math.max(0, this.subtotal() - this.discountAmount()));

  constructor(private readonly http: HttpClient) {}

  refresh() {
    return this.http.get<CartSummary>('/api/cart').pipe(tap((res) => this.items.set(res.items)));
  }

  add(payload: { type: 'FLIGHT' | 'HOTEL'; refId: number; travelers: number; startDate: string; endDate?: string }) {
    return this.http
      .post<CartSummary>('/api/cart/items', payload)
      .pipe(tap((res) => this.items.set(res.items)));
  }

  updateTravelers(itemId: number, travelers: number) {
    return this.http
      .patch<CartSummary>(`/api/cart/items/${itemId}`, { travelers })
      .pipe(tap((res) => this.items.set(res.items)));
    // NB : la mise à jour ci-dessus rafraîchit bien `items` (donc `subtotal`
    // se recalcule automatiquement via le `computed`), mais `frozenDiscount`
    // n'est jamais retouché ici -> c'est exactement le point de rupture du
    // BUG_CONNU #4 décrit plus haut.
  }

  remove(itemId: number) {
    return this.http.delete<CartSummary>(`/api/cart/items/${itemId}`).pipe(tap((res) => this.items.set(res.items)));
  }

  clearLocal() {
    this.items.set([]);
    this.promoCode.set(null);
    this.frozenDiscount.set(0);
  }

  applyPromoCode(code: string): boolean {
    const percent = PROMO_CODES[code.trim().toUpperCase()];
    if (!percent) {
      return false;
    }
    this.promoCode.set(code.trim().toUpperCase());
    this.frozenDiscount.set(this.subtotal() * (percent / 100));
    return true;
  }

  removePromoCode() {
    this.promoCode.set(null);
    this.frozenDiscount.set(0);
  }
}
