
import * as fs from 'fs';

export class TestData {
  static get data() {
    return JSON.parse(fs.readFileSync('../dataBuilder/test-data.json', 'utf-8'));
  }
}