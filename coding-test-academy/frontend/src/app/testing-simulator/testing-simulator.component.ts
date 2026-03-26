import {
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

export type SimulatorState = 'idle' | 'running' | 'success' | 'error';

export interface LogEntry {
  id: number;
  time: string;
  type: 'info' | 'action' | 'success' | 'error' | 'step';
  message: string;
  detail?: string;
}

interface TestStep {
  label: string;
  logType: LogEntry['type'];
  logMessage: string;
  logDetail?: string;
  action: () => Promise<void>;
}

@Component({
  selector: 'app-testing-simulator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './testing-simulator.component.html',
  styleUrls: ['./testing-simulator.component.css'],
})
export class TestingSimulatorComponent implements OnDestroy {
  @ViewChild('logContainer') logContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('usernameInput') usernameInputRef!: ElementRef<HTMLInputElement>;

  form: FormGroup;
  state: SimulatorState = 'idle';
  logs: LogEntry[] = [];
  progress = 0;
  currentStepIndex = -1;
  logIdCounter = 0;

  // Visual highlight states
  highlightUsername = false;
  highlightPassword = false;
  highlightSubmit = false;
  showCursor = false;

  // Typewriter state
  typingUsername = false;
  typingPassword = false;
  usernameDisplayValue = '';
  passwordDisplayValue = '';

  private timeouts: ReturnType<typeof setTimeout>[] = [];
  private aborted = false;

  readonly totalSteps = 7;

  readonly testSteps: TestStep[] = [];

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.clearAllTimeouts();
  }

  private clearAllTimeouts(): void {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
    this.aborted = true;
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      if (this.aborted) { resolve(); return; }
      const t = setTimeout(resolve, ms);
      this.timeouts.push(t);
    });
  }

  private addLog(type: LogEntry['type'], message: string, detail?: string): void {
    const now = new Date();
    const time = now.toTimeString().slice(0, 8) + '.' +
      String(now.getMilliseconds()).padStart(3, '0');
    this.logs.push({ id: this.logIdCounter++, time, type, message, detail });
    this.cdr.detectChanges();
    this.scrollLogsToBottom();
  }

  private scrollLogsToBottom(): void {
    setTimeout(() => {
      if (this.logContainer?.nativeElement) {
        this.logContainer.nativeElement.scrollTop =
          this.logContainer.nativeElement.scrollHeight;
      }
    }, 30);
  }

  private async typeText(
    field: 'username' | 'password',
    text: string,
    delayPerChar = 60
  ): Promise<void> {
    if (field === 'username') {
      this.typingUsername = true;
      this.usernameDisplayValue = '';
    } else {
      this.typingPassword = true;
      this.passwordDisplayValue = '';
    }

    for (let i = 0; i < text.length; i++) {
      if (this.aborted) break;
      await this.wait(delayPerChar + Math.random() * 40);
      if (field === 'username') {
        this.usernameDisplayValue += text[i];
        this.form.patchValue({ username: this.usernameDisplayValue });
      } else {
        this.passwordDisplayValue += text[i];
        this.form.patchValue({ password: this.passwordDisplayValue });
      }
      this.cdr.detectChanges();
    }

    if (field === 'username') this.typingUsername = false;
    else this.typingPassword = false;
  }

 
  async runTest(): Promise<void> {
    if (this.state === 'running') return;
    // Reset
    this.aborted = false;
    this.clearAllTimeouts();
    this.state = 'running';
    this.logs = [];
    this.progress = 0;
    this.currentStepIndex = -1;
    this.highlightUsername = false;
    this.highlightPassword = false;
    this.highlightSubmit = false;
    this.usernameDisplayValue = '';
    this.passwordDisplayValue = '';
    this.form.reset();
    this.cdr.detectChanges();

    try {
      await this.wait(300);

      // ── Step 1: Initialisation ──
      this.currentStepIndex = 0;
      this.setProgress(5);
      this.addLog('step', 'Scénarios connexion utilisateur', 'testing-simulator.spec.ts');
      await this.wait(400);
      this.addLog('info', 'Initializing test environment…');
      await this.wait(500);
      this.addLog('info', 'Browser context ready', 'Chromium 122.0');
      await this.wait(300);

      // ── Step 2: Navigate ──
      this.currentStepIndex = 1;
      this.setProgress(18);
      this.addLog('action', '00001 - Se connecter avec mot de passe valide', 'STEP 1');
      await this.wait(600);

      // ── Step 3: Focus username ──
      this.currentStepIndex = 2;
      this.setProgress(32);
      this.addLog('action', '00002 - Se connecter avec mot de passe invalide', 'STEP 2');
      this.highlightUsername = true;
      this.showCursor = true;
      this.cdr.detectChanges();
      await this.wait(500);

      // ── Step 4: Focus password ──
      this.currentStepIndex = 3;
      this.setProgress(32);
      this.addLog('action', '00003 - Se connecter avec une image avatar.png', 'STEP 3');
      this.highlightUsername = true;
      this.showCursor = true;
      this.cdr.detectChanges();
      await this.wait(500);


      // ── Step 4: Focus password ──
      this.currentStepIndex = 4;
      this.setProgress(32);
      this.addLog('action', '00003 - Se connecter avec un emoji 😎', 'STEP 4');
      this.highlightUsername = true;
      this.showCursor = true;
      this.cdr.detectChanges();
      await this.wait(500);
      this.currentStepIndex = this.totalSteps;

    } catch (e) {
      this.addLog('error', '❌  Test failed — unexpected error');
      this.state = 'error';
    }
    this.cdr.detectChanges();
  }
  async runTestCases(test_case_id:string): Promise<void> {
    if (this.state === 'running') return;

    // Reset
    this.aborted = false;
    this.clearAllTimeouts();
    this.state = 'running';
    this.logs = [];
    this.progress = 0;
    this.currentStepIndex = -1;
    this.highlightUsername = false;
    this.highlightPassword = false;
    this.highlightSubmit = false;
    this.usernameDisplayValue = '';
    this.passwordDisplayValue = '';
    this.form.reset();
    this.cdr.detectChanges();

    try {
      await this.wait(300);

      // ── Step 1: Initialisation ──
      this.currentStepIndex = 0;
      this.setProgress(5);
      this.addLog('step', 'Scénarios connexion utilisateur', 'testing-simulator.spec.ts');
      await this.wait(400);
      this.addLog('info', 'Initializing test environment…');
      await this.wait(500);
      this.addLog('info', 'Browser context ready', 'Chromium 122.0');
      await this.wait(300);

      // ── Step 2: Navigate ──
      this.currentStepIndex = 1;
      this.setProgress(18);
      this.addLog('action', '00001 - Se connecter avec mot de passe valide', 'STEP 1');
      await this.wait(600);
      //this.addLog('info', 'DOM content loaded', '142ms');
      await this.wait(200);

      // ── Step 3: Focus username ──
      this.currentStepIndex = 2;
      this.setProgress(32);
      this.addLog('action', '00002 - Se connecter avec mot de passe invalide', 'STEP 2');
      this.highlightUsername = true;
      this.showCursor = true;
      this.cdr.detectChanges();
      await this.wait(500);

       /*await this.typeText('username', 'john.doe@example.com', 55);
      await this.wait(200);
      this.addLog('success', 'username ← "john.doe@example.com"', '18 chars typed');
      this.highlightUsername = false;
      this.showCursor = false;
      await this.wait(300);*/

      // ── Step 4: Focus password ──
      this.currentStepIndex = 3;
      this.setProgress(32);
      this.addLog('action', '00003 - Se connecter avec une image avatar.png', 'STEP 3');
      this.highlightUsername = true;
      this.showCursor = true;
      this.cdr.detectChanges();
      await this.wait(500);


      // ── Step 4: Focus password ──
      this.currentStepIndex = 4;
      this.setProgress(32);
      this.addLog('action', '00003 - Se connecter avec un emoji 😎', 'STEP 4');
      this.highlightUsername = true;
      this.showCursor = true;
      this.cdr.detectChanges();
      await this.wait(500);

     /* await this.typeText('password', 'Sup3rS3cur3!', 70);
      await this.wait(200);
      this.addLog('success', 'password ← "••••••••••••"', '12 chars typed');
      this.highlightPassword = false;
      this.showCursor = false;
      await this.wait(300);

      this.addLog('success', '✅  Test passed — 5/5 assertions', 'Duration: 2.34s');
      this.state = 'success';*/
      this.currentStepIndex = this.totalSteps;

    } catch (e) {
      this.addLog('error', '❌  Test failed — unexpected error');
      this.state = 'error';
    }

    this.cdr.detectChanges();
  }
  resetTest(): void {
    this.clearAllTimeouts();
    this.aborted = false;
    this.state = 'idle';
    this.logs = [];
    this.progress = 0;
    this.currentStepIndex = -1;
    this.highlightUsername = false;
    this.highlightPassword = false;
    this.highlightSubmit = false;
    this.usernameDisplayValue = '';
    this.passwordDisplayValue = '';
    this.form.reset();
    this.cdr.detectChanges();
  }

  private setProgress(value: number): void {
    this.progress = value;
    this.cdr.detectChanges();
  }

  get stepLabels(): string[] {
    return [
      'Init',
      'Navigate',
      'Username',
      'Password',
      'Validate',
      'Submit',
      'Assert',
    ];
  }

  get runBtnLabel(): string {
    if (this.state === 'running') return 'Running…';
    if (this.state === 'success') return 'Run Again';
    if (this.state === 'error')   return 'Retry';
    return 'Run Test';
  }

  trackLog(_: number, log: LogEntry): number {
    return log.id;
  }
}