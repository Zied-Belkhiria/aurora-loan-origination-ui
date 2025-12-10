import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccountApi } from '../../core/api/account.api';
import { AccountResponse } from '../../core/models/account.model';

@Component({
  standalone: true,
  selector: 'app-accounts',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="page">
      <div class="head">
        <a routerLink="/" class="back">← Home</a>
        <h2>Accounts</h2>
        <span class="sub">Open checking/savings accounts for customers</span>
      </div>

      <div class="two">
        <section class="panel">
          <h3>Create account</h3>
          <form [formGroup]="createForm" (ngSubmit)="create()">
            <label>Customer ID</label>
            <input type="number" formControlName="customerId" />

            <label>Type</label>
            <select formControlName="type">
              <option value="CHECKING">CHECKING</option>
              <option value="SAVINGS">SAVINGS</option>
            </select>

            <label>Initial balance</label>
            <input type="number" formControlName="initialBalance" />

            <button [disabled]="createForm.invalid || loadingCreate">
              {{ loadingCreate ? 'Creating...' : 'Create' }}
            </button>
          </form>

          <div class="result" *ngIf="created">
            <div class="tag ok">Created</div>
            <pre>{{ created | json }}</pre>
          </div>
        </section>

        <section class="panel">
          <h3>Fetch account</h3>
          <form [formGroup]="getForm" (ngSubmit)="get()">
            <label>Account ID</label>
            <input type="number" formControlName="id" />

            <button [disabled]="getForm.invalid || loadingGet">
              {{ loadingGet ? 'Loading...' : 'Fetch' }}
            </button>
          </form>

          <div class="result" *ngIf="found">
            <div class="tag info">Found</div>
            <pre>{{ found | json }}</pre>
          </div>
        </section>
      </div>

      <div class="error" *ngIf="error">{{ error }}</div>
    </div>
  `,
  styles: [`
    .page { max-width: 1100px; margin: 0 auto; }
    .head { margin-bottom: 14px; }
    .back { text-decoration: none; color: #334155; font-size: 13px; }
    h2 { margin: 6px 0 2px; }
    .sub { color: #64748b; font-size: 13px; }
    .two { display: grid; gap: 16px; grid-template-columns: 1fr 1fr; }
    .panel { background: white; border: 1px solid #e5e7eb; border-radius: 14px; padding: 18px; }
    form { display: grid; gap: 8px; }
    label { font-size: 12px; color: #475569; margin-top: 6px; }
    input, select { padding: 10px 12px; border-radius: 10px; border: 1px solid #e5e7eb; }
    button { margin-top: 8px; padding: 10px 12px; border-radius: 10px; border: 0; background: #0f172a; color: white; cursor: pointer; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
    .result { margin-top: 12px; }
    pre { background: #0b1020; color: #e2e8f0; padding: 12px; border-radius: 10px; overflow: auto; }
    .tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.3px;
           text-transform: uppercase; padding: 3px 8px; border-radius: 999px; margin-bottom: 6px; }
    .ok { background: #dcfce7; color: #166534; }
    .info { background: #e0f2fe; color: #075985; }
    .error { margin-top: 12px; color: #b91c1c; }
    @media (max-width: 900px) { .two { grid-template-columns: 1fr; } }
  `]
})
export class AccountsComponent {
  loadingCreate = false;
  loadingGet = false;
  error = '';

  created: AccountResponse | null = null;
  found: AccountResponse | null = null;

  createForm = this.fb.group({
    customerId: [null as number | null, [Validators.required, Validators.min(1)]],
    type: ['CHECKING', [Validators.required]],
    initialBalance: [0, [Validators.required, Validators.min(0)]],
  });

  getForm = this.fb.group({
    id: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  constructor(private fb: FormBuilder, private api: AccountApi) {}

  create() {
    this.error = '';
    this.created = null;

    if (this.createForm.invalid) return;

    this.loadingCreate = true;
    this.api.create(this.createForm.getRawValue() as any).subscribe({
      next: res => {
        this.created = res;
        this.loadingCreate = false;
      },
      error: err => {
        this.error = err?.error?.message ?? 'Failed to create account';
        this.loadingCreate = false;
      }
    });
  }

  get() {
    this.error = '';
    this.found = null;

    const id = this.getForm.value.id!;
    this.loadingGet = true;

    this.api.get(id).subscribe({
      next: res => {
        this.found = res;
        this.loadingGet = false;
      },
      error: err => {
        this.error = err?.error?.message ?? 'Account not found';
        this.loadingGet = false;
      }
    });
  }
}
