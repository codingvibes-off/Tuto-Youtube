import fs from 'fs';
import path from 'path';

export type LocatorStrategy = 'role' | 'label' | 'placeholder' | 'text' | 'testid' | 'css';

export interface ElementLocator {
  strategy: LocatorStrategy;
  role?: string;
  name?: string;
  level?: number;
  css?: string;
  scope?: string;
  first?: boolean;
  exact?: boolean;
  fallbackReason?: string;
}

export interface PageElement {
  name: string;
  type: string;
  locator: ElementLocator;
}

export interface JourneyPage {
  id: string;
  name: string;
  url: string;
  title: string;
  elements: PageElement[];
}

export type JourneyAction =
  | 'goto'
  | 'click'
  | 'dblclick'
  | 'fill'
  | 'clear'
  | 'check'
  | 'uncheck'
  | 'selectOption'
  | 'hover'
  | 'press'
  | 'upload'
  | 'waitFor'
  | 'expectVisible'
  | 'expectHidden'
  | 'expectText'
  | 'expectUrl'
  | 'expectTitle'
  | 'screenshot';

export const SUPPORTED_ACTIONS: JourneyAction[] = [
  'goto', 'click', 'dblclick', 'fill', 'clear', 'check', 'uncheck', 'selectOption',
  'hover', 'press', 'upload', 'waitFor', 'expectVisible', 'expectHidden', 'expectText',
  'expectUrl', 'expectTitle', 'screenshot'
];

export interface JourneyStep {
  id: number;
  action: JourneyAction;
  page?: string;
  element?: string;
  value?: string;
}

export interface Journey {
  id: string;
  name: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  tags: string[];
  preconditions: string[];
  steps: JourneyStep[];
  expectedResult: Record<string, string>;
}

export interface ParcoursFile {
  metadata: {
    site: string;
    generatedAt: string;
    generator: string;
    version: string;
  };
  pages: JourneyPage[];
  journeys: Journey[];
}

const JOURNEY_FILE = path.resolve(
  __dirname,
  '../.claude/skills/test-playwright-generator/rootless/parcours.json'
);

let cache: ParcoursFile | null = null;

export function loadJourneys(): ParcoursFile {
  if (cache) return cache;

  const content = fs.readFileSync(JOURNEY_FILE, 'utf-8');
  const data = JSON.parse(content) as ParcoursFile;

  validateJourneys(data);

  cache = data;
  return data;
}

export function validateJourneys(data: ParcoursFile): void {
  const seenIds = new Set<string>();

  for (const journey of data.journeys) {
    if (!journey.id) {
      throw new Error('Journey missing required "id" field');
    }
    if (seenIds.has(journey.id)) {
      throw new Error(`Duplicate journey id detected: "${journey.id}"`);
    }
    seenIds.add(journey.id);

    for (const step of journey.steps) {
      if (!SUPPORTED_ACTIONS.includes(step.action)) {
        throw new Error(
          `Journey "${journey.id}" step ${step.id} uses unsupported action "${step.action}"`
        );
      }
    }
  }
}

export function getJourneyById(id: string): Journey | undefined {
  return loadJourneys().journeys.find((j) => j.id === id);
}

export function getJourneysByTag(tag: string): Journey[] {
  return loadJourneys().journeys.filter((j) => j.tags.includes(tag));
}

export function getJourneysByPriority(priority: Journey['priority']): Journey[] {
  return loadJourneys().journeys.filter((j) => j.priority === priority);
}
