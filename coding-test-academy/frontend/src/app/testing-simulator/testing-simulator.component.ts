import {
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

export type SimulatorState = 'idle' | 'running' | 'success' | 'error' | 'end_0001';

export interface LogEntry {
  id: number;
  time: string;
  type: 'info' | 'action' | 'success' | 'error' | 'step';
  message: string;
  detail?: string;
  testCaseId?:string;
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
  @ViewChild('logContainer_nth_child_one') logContainer_nth_child_one!: ElementRef<HTMLDivElement>;
  @ViewChild('logContainer_nth_child_two') logContainer_nth_child_two!: ElementRef<HTMLDivElement>;
  @ViewChild('usernameInput') usernameInputRef!: ElementRef<HTMLInputElement>;
  wait_init = 100
  form: FormGroup;
  state: SimulatorState = 'idle';
  logsContainer: LogEntry[] = [];
  logsContainerNthChildOne: LogEntry[] = [];
  logsContainerNthChildTwo: LogEntry[] = [];
  progress = 0;
  currentStepIndex = -1;
  logIdCounter = 0;
  // Visual highlight states
  highlightUsername = false;
  highlightPassword = false;
  highlightSubmit = false;
  showCursor = false;
  endTestCase = "";
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

  private addLog(child: string, type: LogEntry['type'], message: string, detail?: string, testCaseId?:string): void {
    const now = new Date();
    const time = now.toTimeString().slice(0, 8) + '.' +
      String(now.getMilliseconds()).padStart(3, '0');

      if(child == "logContainer"){
         this.logsContainer.push({ id: this.logIdCounter++, time, type, message, detail, testCaseId });
      }
      if(child == "logContainer_nth_child_one"){
         this.logsContainerNthChildOne.push({ id: this.logIdCounter++, time, type, message, detail, testCaseId });
      }
      if(child == "logContainer_nth_child_two"){
         this.logsContainerNthChildTwo.push({ id: this.logIdCounter++, time, type, message, detail, testCaseId });
      }
   
    this.cdr.detectChanges();
    this.scrollLogsToBottom(child);
  }

  private scrollLogsToBottom(child:string): void {
    if(child = "logContainer"){
       setTimeout(() => {
      if (this.logContainer?.nativeElement) {
        this.logContainer.nativeElement.scrollTop =
          this.logContainer.nativeElement.scrollHeight;
      }
    }, 30)
    }

     if(child = "logContainer_nth_child_one"){
        setTimeout(() => {
      if (this.logContainer_nth_child_one?.nativeElement) {
        this.logContainer_nth_child_one.nativeElement.scrollTop =
          this.logContainer_nth_child_one.nativeElement.scrollHeight;
      }
    }, 30)
    }

     if(child = "logContainer_nth_child_two"){
        setTimeout(() => {
      if (this.logContainer_nth_child_two?.nativeElement) {
        this.logContainer_nth_child_two.nativeElement.scrollTop =
          this.logContainer_nth_child_two.nativeElement.scrollHeight;
      }
    }, 30)
    }
   
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

 
 /* async runTest(): Promise<void> {
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
  }*/
  private async runScenarioLogs(
    container: string,
    title: string,
    testId: string
  ): Promise<void> {

    this.addLog(container, 'step', title, 'testing-simulator.spec.ts', testId);
    await this.wait(this.wait_init);

    this.addLog(container, 'info', 'Executing test environment…');
    await this.wait(this.wait_init);

    this.addLog(container, 'info', 'Browser context ready', 'Chromium 122.0');
    await this.wait(this.wait_init);
  }

  async runTestCases(test_case_id:string): Promise<void> {
    //if (this.state === 'running') return;
    try {
      if(test_case_id == "0000"){
          this.currentStepIndex = 0;
          this.setProgress(5);
          await this.runScenarioLogs(
            'logContainer',
            'Scénarios connexion utilisateur 0001',
            '0000'
          );

          await this.runScenarioLogs(
            'logContainer_nth_child_one',
            'Scénarios connexion utilisateur avec un emoji 😎 0002',
            '0001'
          );

          await this.runScenarioLogs(
            'logContainer_nth_child_two',
            'Scénarios connexion utilisateur avec un mot de passe invalide 0003',
            '0002'
          );
      }
      await this.wait(300);
      if(test_case_id == "0001"){
          this.resetTest(test_case_id)
          // ── Step 1: Execution ──
          this.currentStepIndex = 1;
          this.aborted = false
          this.typingUsername = true;
          this.typingPassword = true;
          this.setProgress(18);
          this.addLog('logContainer','action', 'Scénarios connexion utilisateur 0001', 'STEP 1','0001');
          this.addLog('logContainer', 'info', 'Executing test environment…');
          this.addLog('logContainer', 'info', 'Browser context ready', 'Chromium 122.0');
          this.addLog('logContainer','step',"→ Running test case 0001" ,'→ Running test case 0001', 'testing-simulator.spec.ts');
           this.setProgress(32);
          this.addLog('logContainer','success', 'username ← "john.doe@example.com"', '18 chars typed');
          
          this.addLog('logContainer','success', 'password ← "Sup3rS3cur3!"', '18 chars typed');
          this.setProgress(80);
          await this.wait(200);
          await this.typeText('username', 'john.doe@example.com', 55);
          await this.wait(200);
          this.setProgress(100);
          await this.typeText('password', 'Sup3rS3cur3!', 70);
          this.state = 'success';
    
          this.addLog('logContainer','success', '✓ Success execution', '200 - OK');
          await this.wait(600);
          this.state = "success"
          this.highlightUsername = true;
          this.showCursor = true; 
          this.cdr.detectChanges();
          await this.wait(200);
          this.endTestCase = "end_0001"

          await this.wait(500);

          /* this.currentStepIndex = 1;
          this.setProgress(5);
          this.addLog('step', '→ Running test case 0001', 'testing-simulator.spec.ts');
          this.addLog('action', '00001 - Se connecter avec mot de passe valide', 'STEP 1','0001');
          await this.typeText('username', 'john.doe@example.com', 55);
          await this.wait(500);
          this.addLog('success', 'username ← "john.doe@example.com"', '18 chars typed');
          this.addLog('success', 'password ← "Sup3rS3cur3!"', '18 chars typed');
          
          await this.typeText('password', 'Sup3rS3cur3!', 70);
          this.state = 'success';
          this.addLog('success', '✓ Success execution', '200 - OK');*/
      }

      if(test_case_id == "0003"){
           /*await this.typeText('username', 'john.doe@example.com', 55);
      await this.wait(200);
      this.addLog('success', 'username ← "john.doe@example.com"', '18 chars typed');
      this.highlightUsername = false;
      this.showCursor = false;
      await this.wait(300);

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
      this.state = 'success';
      this.currentStepIndex = this.totalSteps;*/
      }
    

    } catch (e) {
      //this.addLog('error', '❌  Test failed — unexpected error');
      this.state = 'error';
    }

    this.cdr.detectChanges();
  }
  moreDetails(string:string){
    console.log("VOIR LES DETAILS")
  }
  resetTest(test_case_id:string): void {
    this.clearAllTimeouts();
    if(test_case_id == "0001"){
      this.logsContainer = [];
      this.highlightUsername = false;
      this.highlightPassword = false;
      this.usernameDisplayValue = '';
      this.passwordDisplayValue = '';
      this.form.reset();
      this.cdr.detectChanges();
    } else {
          this.aborted = false;
          this.state = 'idle';
          this.logsContainer = [];
          this.logsContainerNthChildOne = [];
          this.logsContainerNthChildTwo = [];
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