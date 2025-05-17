
export interface ChecklistItem {
  id: string;
  name: string;
  isPacked: boolean;
  quantity: number;
  notes?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface ChecklistCategory {
  id: string;
  name: string;
  items: ChecklistItem[];
}

export interface Checklist {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  categories: ChecklistCategory[];
  imageUrl?: string;
}

export interface TripTemplate {
  id: string;
  name: string;
  description: string;
  categories: {
    name: string;
    items: {
      name: string;
      quantity: number;
    }[];
  }[];
  imageUrl: string;
}
