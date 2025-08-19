import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { Investment, PortfolioMetrics } from '../../core/models/investment';

function randomId(): string { return Math.random().toString(36).slice(2, 10); }

const seedInvestments: Investment[] = [
  { id: randomId(), assetType: 'stock', symbol: 'AAPL', quantity: 10, purchasePrice: 180, datePurchased: '2024-01-05' },
  { id: randomId(), assetType: 'etf', symbol: 'VOO', quantity: 5, purchasePrice: 420, datePurchased: '2023-08-18' },
  { id: randomId(), assetType: 'crypto', symbol: 'BTC', quantity: 0.1, purchasePrice: 45000, datePurchased: '2022-12-01' }
];

function generateSeries(): PortfolioMetrics {
  const days = 30;
  const today = new Date();
  const perf = [] as PortfolioMetrics['performance'];
  const bench = [] as PortfolioMetrics['benchmark'];
  let pv = 100; let bv = 100;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    pv += (Math.random() - 0.45) * 1.5;
    bv += (Math.random() - 0.5) * 1.0;
    perf.push({ date: d.toISOString().slice(0, 10), value: Math.round(pv * 100) / 100 });
    bench.push({ date: d.toISOString().slice(0, 10), value: Math.round(bv * 100) / 100 });
  }
  const totals: Record<string, number> = {};
  for (const inv of seedInvestments) {
    totals[inv.assetType] = (totals[inv.assetType] ?? 0) + inv.quantity * inv.purchasePrice;
  }
  const sum = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
  const allocation = Object.entries(totals).map(([assetType, v]) => ({ assetType: assetType as Investment['assetType'], percent: Math.round((v / sum) * 1000) / 10 }));
  return { performance: perf, benchmark: bench, allocation };
}

let metricsCache: PortfolioMetrics | null = null;

export const mockDelayInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  if (req.url.startsWith('api/')) {
    // Simulate minimal API
    if (req.method === 'GET' && req.url === 'api/portfolio') {
      metricsCache ??= generateSeries();
      const body = { investments: seedInvestments, metrics: metricsCache };
      return of(new HttpResponse({ status: 200, body })).pipe(delay(300));
    }
    if (req.method === 'POST' && req.url === 'api/investments') {
      const created: Investment = { id: randomId(), ...req.body };
      seedInvestments.push(created);
      metricsCache = generateSeries();
      return of(new HttpResponse({ status: 201, body: created })).pipe(delay(300));
    }
    if (req.method === 'DELETE' && req.url.startsWith('api/investments/')) {
      const id = req.url.split('/').pop() as string;
      const idx = seedInvestments.findIndex(i => i.id === id);
      if (idx >= 0) seedInvestments.splice(idx, 1);
      metricsCache = generateSeries();
      return of(new HttpResponse({ status: 204 })).pipe(delay(200));
    }
  }
  return next(req);
};


