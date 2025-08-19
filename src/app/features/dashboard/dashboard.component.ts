import { Component, OnInit, computed } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { PortfolioStoreService } from '../../core/services/portfolio-store.service';
import { MiniChartComponent } from '../../shared/components/mini-chart.component';
import { CurrencyCompactPipe } from '../../shared/pipes/currency-compact.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, MiniChartComponent, CurrencyCompactPipe, CurrencyPipe],
  template: `
    <div class="grid">
      <section class="card" style="grid-column: span 12; background: radial-gradient(1200px 300px at 20% -20%, rgba(37,99,235,0.15), transparent 60%), radial-gradient(900px 250px at 80% -30%, rgba(244,114,182,0.12), transparent 60%);">
        <h3>Portfolio Performance</h3>
        <app-mini-chart
          [series]="store.metrics()?.performance ?? []"
          [benchmark]="store.metrics()?.benchmark ?? []"
          [height]="220"
        ></app-mini-chart>
      </section>

      <section class="card" style="grid-column: span 6; background: linear-gradient(180deg, rgba(2,6,23,0.2), rgba(2,6,23,0.05));">
        <h3>Asset Allocation</h3>
        <div *ngIf="store.metrics()?.allocation as alloc">
          <div *ngFor="let a of alloc" style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
            <div style="width:120px; text-transform:capitalize;">{{a.assetType}}</div>
            <div style="flex:1; background:#0b1220; border:1px solid #1f2937; border-radius:999px; overflow:hidden; height:12px;">
              <div [style.width.%]="a.percent" style="background: linear-gradient(90deg, #60a5fa, #2563eb); height:100%; box-shadow: inset 0 0 6px rgba(255,255,255,0.2);"></div>
            </div>
            <div style="width:60px; text-align:right;">{{a.percent}}%</div>
          </div>
        </div>
      </section>

      <section class="card" style="grid-column: span 6; background: linear-gradient(180deg, rgba(2,6,23,0.2), rgba(2,6,23,0.05));">
        <h3>Key Metrics</h3>
        <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:8px;">
          <div>
            <div style="opacity:.7">Positions</div>
            <div style="font-size:20px;">{{store.investments().length}}</div>
          </div>
          <div>
            <div style="opacity:.7">Est. Value</div>
            <div style="font-size:24px; font-weight:600; color:#93c5fd;">{{ estimatedValue() | currency }}</div>
            <div style="opacity:.75; font-size:12px;">({{ estimatedValue() | currencyCompact }})</div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  constructor(public readonly store: PortfolioStoreService) {}

  ngOnInit(): void {
    this.store.loadInitial();
  }

  estimatedValue = computed(() => {
    return this.store.investments().reduce((sum, i) => sum + i.quantity * i.purchasePrice, 0);
  });
}


