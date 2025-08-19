import { Component, ElementRef, Input, OnChanges, SimpleChanges, effect } from '@angular/core';

@Component({
  selector: 'app-mini-chart',
  standalone: true,
  template: `
    <svg [attr.width]="width" [attr.height]="height" [attr.viewBox]="'0 0 ' + width + ' ' + height" preserveAspectRatio="none" class="chart">
      <defs>
        <linearGradient id="perf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#2563eb" stop-opacity="0.9" />
        </linearGradient>
        <linearGradient id="bench" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#f472b6" stop-opacity="0.8" />
        </linearGradient>
      </defs>
      <polyline [attr.points]="points" fill="none" stroke="url(#perf)" stroke-width="2.5" />
      <polyline [attr.points]="benchPoints" fill="none" stroke="url(#bench)" stroke-width="1.5" opacity="0.85" />
    </svg>
  `,
  styles: [`
    :host { display:block; width:100%; }
    .chart { width: 100%; height: 100%; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.25)); }
  `]
})
export class MiniChartComponent implements OnChanges {
  @Input() series: Array<{ date: string; value: number }> = [];
  @Input() benchmark: Array<{ date: string; value: number }> = [];
  @Input() width = 400;
  @Input() height = 120;

  points = '';
  benchPoints = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.points = this.buildPoints(this.series);
    this.benchPoints = this.buildPoints(this.benchmark);
  }

  private buildPoints(series: Array<{ date: string; value: number }>): string {
    if (!series?.length) return '';
    const min = Math.min(...series.map(s => s.value));
    const max = Math.max(...series.map(s => s.value));
    const span = Math.max(1, max - min);
    const stepX = this.width / Math.max(1, series.length - 1);
    return series.map((s, idx) => {
      const x = Math.round(idx * stepX);
      const y = Math.round(this.height - ((s.value - min) / span) * this.height);
      return `${x},${y}`;
    }).join(' ');
  }
}


