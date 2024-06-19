export type TimelineNote = {
  instrument: string;
  note: string;
  duration: number;
  volume: number;
};

export type Timeline = Record<number, TimelineNote[]>;
