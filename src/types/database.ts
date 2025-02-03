export interface Discipline {
    id: string;
    name: string;
    created_at: string;
  }
  
  export interface Professor {
    id: string;
    name: string;
    discipline_id: string;
    created_at: string;
  }
  
  export interface Schedule {
    id: string;
    day_of_week: number;
    start_time: string;
    discipline_id: string;
    professor_id: string;
    created_at: string;
  }