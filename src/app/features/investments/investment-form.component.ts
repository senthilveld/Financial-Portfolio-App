import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { PortfolioStoreService } from '../../core/services/portfolio-store.service';
import { NumberOnlyDirective } from '../../shared/directives/number-only.directive';

@Component({
  selector: 'app-investment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, JsonPipe, NumberOnlyDirective],
  template: `
    <section class="card" style="max-width:720px; margin-inline:auto;">
      <h3>Add Investment</h3>
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <div class="grid" style="grid-template-columns: repeat(12, 1fr);">
          <label class="field" style="grid-column: span 6;">
            <span>Asset Type</span>
            <select formControlName="assetType" required>
              <option value="">Select</option>
              <option value="stock">Stock</option>
              <option value="bond">Bond</option>
              <option value="etf">ETF</option>
              <option value="crypto">Crypto</option>
              <option value="cash">Cash</option>
              <option value="other">Other</option>
            </select>
            <small class="error" *ngIf="submitted && form.controls['assetType'].errors">Required</small>
          </label>

          <label class="field" style="grid-column: span 6;">
            <span>Symbol</span>
            <input type="text" formControlName="symbol" placeholder="e.g., AAPL" required />
            <small class="error" *ngIf="submitted && form.controls['symbol'].errors">Required (2-10 uppercase letters/numbers)</small>
          </label>

          <label class="field" style="grid-column: span 6;">
            <span>Quantity</span>
            <input type="number" formControlName="quantity" numberOnly inputmode="decimal" step="any" required />
            <small class="error" *ngIf="submitted && form.controls['quantity'].errors">Must be greater than 0</small>
          </label>

          <label class="field" style="grid-column: span 6;">
            <span>Purchase Price</span>
            <input type="number" formControlName="purchasePrice" numberOnly inputmode="decimal" step="any" required />
            <small class="error" *ngIf="submitted && form.controls['purchasePrice'].errors">Must be >= 0</small>
          </label>

          <label class="field" style="grid-column: span 6;">
            <span>Date Purchased</span>
            <input type="date" formControlName="datePurchased" required />
            <small class="error" *ngIf="submitted && form.controls['datePurchased'].errors">Required</small>
          </label>
        </div>

        <div class="review" *ngIf="form.valid" style="margin-top:16px; padding:12px; border:1px dashed #1f2937; border-radius:8px;">
          <div style="opacity:.8; margin-bottom:6px;">Review</div>
          <code style="white-space: pre-wrap;">{{ form.value | json }}</code>
        </div>

        <div style="display:flex; gap:8px; margin-top:16px;">
          <button type="submit" class="btn">Submit</button>
          <button type="button" class="btn" (click)="reset()">Reset</button>
        </div>
      </form>
    </section>
  `,
  styles: [`
    .field { display:flex; flex-direction:column; gap:6px; margin-bottom:8px; }
    .field input, .field select { background:#0b1220; color:#e2e8f0; border:1px solid #1f2937; border-radius:8px; padding:8px; }
    .error { color:#fca5a5; }
    .btn { background:#2563eb; color:white; text-decoration:none; padding:6px 10px; border-radius:6px; border:0; cursor:pointer; }
  `]
})
export class InvestmentFormComponent {
  submitted = false;
  form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly store: PortfolioStoreService, private readonly router: Router) {
    this.form = this.fb.group({
      assetType: ['', Validators.required],
      symbol: ['', [Validators.required, Validators.pattern(/^[A-Z0-9\.]{2,10}$/)]],
      quantity: [null, [Validators.required, Validators.min(0.0000001)]],
      purchasePrice: [null, [Validators.required, Validators.min(0)]],
      datePurchased: ['', Validators.required]
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) return;
    const payload = this.form.getRawValue() as {
      assetType: 'stock'|'bond'|'etf'|'crypto'|'cash'|'other';
      symbol: string;
      quantity: number;
      purchasePrice: number;
      datePurchased: string;
    };
    this.store.addInvestment(payload).subscribe(() => {
      this.router.navigateByUrl('/investments');
    });
  }

  reset() {
    this.submitted = false;
    this.form.reset({ assetType: '', symbol: '', quantity: null, purchasePrice: null, datePurchased: '' });
  }
}


