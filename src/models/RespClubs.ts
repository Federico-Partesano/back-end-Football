export interface Club {
  id: number;
  name: string;
  league: number | null;
}

export interface IRespClubs {
  count: number;
  count_total: number;
  page: number;
  page_total: number;
  items_per_page: number;
  items: Club[];
}
