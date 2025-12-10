import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="page">
      <section class="hero">
        <div class="badge">Finance Demo</div>
        <h1>AuroraLoan</h1>
        <p>
          Angular frontend for the Loan Origination API.
          Demonstrates Spring Boot + JPA/Hibernate + Oracle PL/SQL risk evaluation.
        </p>
        <div class="cta">
          <a routerLink="/loans" class="primary">Try Loan Evaluation</a>
          <a routerLink="/customers" class="ghost">Create Customer</a>
        </div>
      </section>

      <div class="grid">
        <a class="card" routerLink="/customers">
          <h3>Customers</h3>
          <p>Create customers and fetch them by ID.</p>
        </a>
        <a class="card" routerLink="/accounts">
          <h3>Accounts</h3>
          <p>Open checking/savings accounts linked to customers.</p>
        </a>
        <a class="card" routerLink="/loans">
          <h3>Loans</h3>
          <p>Submit applications and view PL/SQL approval + risk score.</p>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .page { max-width: 1100px; margin: 0 auto; padding: 10px 6px; }
    .hero {
      background: linear-gradient(135deg, #0f172a, #111827);
      color: white; padding: 34px; border-radius: 18px;
      border: 1px solid rgba(255,255,255,0.06);
    }
    .badge {
      display: inline-block; font-size: 11px; letter-spacing: 0.5px;
      text-transform: uppercase; color: #0f172a;
      background: #38bdf8; padding: 4px 8px; border-radius: 999px;
      margin-bottom: 10px; font-weight: 700;
    }
    h1 { margin: 0 0 10px; font-size: 40px; }
    p { margin: 0; color: #cbd5e1; max-width: 780px; }
    .cta { margin-top: 18px; display: flex; gap: 10px; flex-wrap: wrap; }
    .primary, .ghost {
      text-decoration: none; padding: 10px 14px; border-radius: 10px;
      font-weight: 600; font-size: 14px;
    }
    .primary { background: #38bdf8; color: #0f172a; }
    .ghost { background: rgba(255,255,255,0.08); color: white; }
    .grid { display: grid; gap: 16px; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 18px; }
    .card {
      text-decoration: none; color: inherit; padding: 18px;
      border-radius: 14px; border: 1px solid #e5e7eb; background: white;
    }
    .card:hover { border-color: #94a3b8; transform: translateY(-1px); transition: 0.15s; }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
  `]
})
export class HomeComponent {}
