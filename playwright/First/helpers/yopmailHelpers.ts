import { Page, Locator } from '@playwright/test';

export class YopmailHelper {
  constructor(private page: Page) {
  }
  private get frame() {
    return this.page.frameLocator('#ifmail');
  }
  async open() {
    await this.page.goto('https://yopmail.com/fr/');
    await this.page.getByRole("button", { name: "Consent" }).click();
  }
  async setEmail(email: string) {
    await this.page.locator('#login').fill(email);
    await this.page.locator('button[title="Vérifier les mails @yopmail.com"]').click();
  }
  async openFirstEmail() {
    await this.frame.locator('#mail').waitFor();
  }
  async getCode(): Promise<string> {
    const text = await this.frame.locator('#mail').innerText();
    const code = text?.match(/\d{6}/)?.[0];
    if (!code) throw new Error('Code introuvable');
    return code;
  }

}