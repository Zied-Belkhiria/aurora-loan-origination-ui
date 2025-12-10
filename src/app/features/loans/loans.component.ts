import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoanApi } from '../../core/api/loan.api';
import { LoanResponse } from '../../core/models/loan.model';

@Component({
  standalone: true,
  selector: 'app-loans',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="page">
      <div class="head">
        <a routerLink="/" class="back">← Home</a>
        <h2>Loans</h2>
        <span class="sub">Submit applications and view PL/SQL risk evaluation</span>
      </div>

      <div class="two">
        <section class="panel">
          <h3>Create & evaluate loan</h3>
          <form [formGroup]="createForm" (ngSubmit)="create()">
            <label>Customer ID</label>
            <input type="number" formControlName="customerId" />

            <label>Amount</label>
            <input type="number" formControlName="amount" />

            <label>Term (months)</label>
            <input type="number" formControlName="termMonths" />

            <label>Annual rate (%)</label>
            <input type="number" formControlName="annualRate" step="0.01" />

            <button [disabled]="createForm.invalid || loadingCreate">
              {{ loadingCreate ? 'Evaluating...' : 'Submit loan' }}
            </button>
          </form>

          <div class="result" *ngIf="created">
            <div class="row">
              <span class="tag ok" *ngIf="created.status === 'APPROVED'">Approved</span>
              <span class="tag bad" *ngIf="created.status === 'REJECTED'">Rejected</span>
              <span class="tag info" *ngIf="created.status === 'PENDING'">Pending</span>
              <span class="muted">Risk score: {{ created.riskScore ?? '-' }}</span>
              <span class="muted">Installment: {{ created.monthlyInstallment ?? '-' }}</span>
            </div>
            <pre>{{ created | json }}</pre>
          </div>
        </section>

        <section class="panel">
          <h3>Fetch loan</h3>
          <form [formGroup]="getForm" (ngSubmit)="get()">
            <label>Loan ID</label>
            <input type="number" formControlName="id" />

            <button [disabled]="getForm.invalid || loadingGet">
              {{ loadingGet ? 'Loading...' : 'Fetch' }}
            </button>
          </form>

          <div class="result" *ngIf="found">
            <div class="row">
              <span class="tag ok" *ngIf="found.status === 'APPROVED'">Approved</span>
              <span class="tag bad" *ngIf="found.status === 'REJECTED'">Rejected</span>
              <span class="tag info" *ngIf="found.status === 'PENDING'">Pending</span>
              <span class="muted">Risk score: {{ found.riskScore ?? '-' }}</span>
              <span class="muted">Installment: {{ found.monthlyInstallment ?? '-' }}</span>
            </div>
            <pre>{{ found | json }}</pre>
          </div>
        </section>
      </div>

      <div class="hint">
        <strong>Tip:</strong> Create a customer + account first to see how balances can influence the risk score.
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
    input { padding: 10px 12px; border-radius: 10px; border: 1px solid #e5e7eb; }
    button { margin-top: 8px; padding: 10px 12px; border-radius: 10px; border: 0; background: #0f172a; color: white; cursor: pointer; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
    .result { margin-top: 12px; }
    pre { background: #0b1020; color: #e2e8f0; padding: 12px; border-radius: 10px; overflow: auto; }
    .row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 6px; }
    .muted { font-size: 12px; color: #64748b; }
    .tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.3px;
           text-transform: uppercase; padding: 3px 8px; border-radius: 999px; }
    .ok { background: #dcfce7; color: #166534; }
    .bad { background: #fee2e2; color: #991b1b; }
    .info { background: #e0f2fe; color: #075985; }
    .hint { margin-top: 12px; font-size: 12px; color: #334155; background: #f1f5f9; border: 1px solid #e2e8f0;
            padding: 10px 12px; border-radius: 10px; }
    .error { margin-top: 12px; color: #b91c1c; }
    @media (max-width: 900px) { .two { grid-template-columns: 1fr; } }
  `]
})
export class LoansComponent {
  loadingCreate = false;
  loadingGet = false;
  error = '';

  created: LoanResponse | null = null;
  found: LoanResponse | null = null;

  createForm = this.fb.group({
    customerId: [null as number | null, [Validators.required, Validators.min(1)]],
    amount: [20000, [Validators.required, Validators.min(100)]],
    termMonths: [36, [Validators.required, Validators.min(6)]],
    annualRate: [7.5, [Validators.required, Validators.min(0)]],
  });

  getForm = this.fb.group({
    id: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  constructor(private fb: FormBuilder, private api: LoanApi) {}

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
        this.error = err?.error?.message ?? 'Failed to create loan';
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
        this.error = err?.error?.message ?? 'Loan not found';
        this.loadingGet = false;
      }
    });
  }
}
