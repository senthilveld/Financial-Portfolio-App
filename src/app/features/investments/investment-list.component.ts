import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioStoreService } from '../../core/services/portfolio-store.service';

@Component({
  selector: 'app-investment-list',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, CurrencyPipe, RouterLink],
  template: `
    <section class="card">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
        <h3 style="flex:1; margin:0;">Investments</h3>
        <a routerLink="/investments/new" class="btn">Add</a>
      </div>

      <div *ngIf="!store.investments().length" style="opacity:.8">No investments yet. Add your first one.</div>

      <div class="table" *ngIf="store.investments().length">
        <div class="thead">
          <div>Type</div>
          <div>Symbol</div>
          <div>Qty</div>
          <div>Purchase Price</div>
          <div>Date</div>
          <div></div>
        </div>
        <div class="row" *ngFor="let inv of store.investments()">
          <div style="text-transform:capitalize;">{{inv.assetType}}</div>
          <div>{{inv.symbol}}</div>
          <div>{{inv.quantity}}</div>
          <div>{{inv.purchasePrice | currency}}</div>
          <div>{{inv.datePurchased | date:'mediumDate'}}</div>
          <div><button class="btn danger" (click)="remove(inv.id)">Remove</button></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .table { display:grid; gap:8px; }
    .thead, .row { display:grid; grid-template-columns: 1.2fr 1fr .6fr 1fr 1fr .6fr; gap:8px; align-items:center; }
    .thead { font-weight:600; opacity:.8; }
    .btn { background:#2563eb; color:white; text-decoration:none; padding:6px 10px; border-radius:6px; border:0; cursor:pointer; }
    .btn.danger { background:#b91c1c; }
  `]
})
export class InvestmentListComponent implements OnInit {
  constructor(public readonly store: PortfolioStoreService) {}

  ngOnInit(): void {
    if (!this.store.investments().length) this.store.loadInitial();
  }

  remove(id: string) {
    this.store.removeInvestment(id).subscribe();
  }
}


