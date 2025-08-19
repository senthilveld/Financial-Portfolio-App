import { Injectable, computed, effect, signal } from '@angular/core';
import { Investment, PortfolioMetrics } from '../models/investment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface PortfolioState {
  investments: Investment[];
  metrics: PortfolioMetrics | null;
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PortfolioStoreService {
  private readonly state = signal<PortfolioState>({ investments: [], metrics: null, loading: false });

  readonly investments = computed(() => this.state().investments);
  readonly metrics = computed(() => this.state().metrics);
  readonly loading = computed(() => this.state().loading);

  constructor(private readonly http: HttpClient) {
    // Log effects for dev visibility
    effect(() => {
      void this.state();
    });
  }

  loadInitial(): void {
    this.setLoading(true);
    this.http.get<{ investments: Investment[]; metrics: PortfolioMetrics }>('api/portfolio')
      .pipe(
        tap(() => this.setLoading(true)),
      )
      .subscribe({
        next: (data) => {
          this.state.update((s) => ({ ...s, investments: data.investments, metrics: data.metrics, loading: false }));
        },
        error: () => this.setLoading(false)
      });
  }

  addInvestment(newInvestment: Omit<Investment, 'id'>): Observable<Investment> {
    this.setLoading(true);
    return this.http.post<Investment>('api/investments', newInvestment).pipe(
      tap((created) => {
        this.state.update((s) => ({ ...s, investments: [...s.investments, created], loading: false }));
      })
    );
  }

  removeInvestment(id: string): Observable<void> {
    this.setLoading(true);
    return this.http.delete<void>(`api/investments/${id}`).pipe(
      tap(() => {
        this.state.update((s) => ({ ...s, investments: s.investments.filter(i => i.id !== id), loading: false }));
      })
    );
  }

  private setLoading(value: boolean): void {
    this.state.update((s) => ({ ...s, loading: value }));
  }
}


