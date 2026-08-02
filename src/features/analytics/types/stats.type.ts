export interface ClicksPerDay {
  day: string;
  clicks: number;
}

export interface Stats {
  totalLinks: number;
  totalClicksToday: number;
  totalClicksYesterday: number;
  clicksPerDay: ClicksPerDay[] | null;
}
