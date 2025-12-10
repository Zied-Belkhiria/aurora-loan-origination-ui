import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="layout">
      <nav class="topbar">
        <div class="brand">
          <span class="dot"></span>
          <span class="title">AuroraLoan</span>
        </div>
        <div class="links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/customers" routerLinkActive="active">Customers</a>
          <a routerLink="/accounts" routerLinkActive="active">Accounts</a>
          <a routerLink="/loans" routerLinkActive="active">Loans</a>
        </div>
      </nav>

      <main class="content">
        <router-outlet></router-outlet>
      </main>

      <footer class="footer">
        <span>AuroraLoan UI — demo for Spring + Oracle PL/SQL backend</span>
      </footer>
    </div>
  `,
  styles: [`
    .layout { min-height: 100vh; display: grid; grid-template-rows: auto 1fr auto; }
    .topbar {
      position: sticky; top: 0; z-index: 10;
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 22px;
      background: #0f172a; color: #fff;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .brand { display: flex; align-items: center; gap: 10px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: #38bdf8; display: inline-block; }
    .title { font-weight: 700; letter-spacing: 0.3px; }
    .links { display: flex; gap: 14px; }
    .links a {
      text-decoration: none; color: #cbd5e1;
      padding: 6px 10px; border-radius: 8px; font-size: 14px;
    }
    .links a.active, .links a:hover { color: #fff; background: rgba(255,255,255,0.08); }
    .content { padding: 22px; }
    .footer {
      padding: 14px 22px; font-size: 12px; color: #475569;
      background: #f1f5f9; border-top: 1px solid #e2e8f0;
    }
  `]
})
export class AppComponent {}
