export type ScoreInstrument = {
  _attributes: {
    id: string;
  };
  "instrument-name"?: {
    _text: string;
  };
  "instrument-sound"?: {
    _text: string;
  };
};

export type MidiInstrument = {
  _attributes: {
    id: string;
    port?: string;
  };
  "midi-channel"?: {
    _text: string;
  };
  "midi-program"?: {
    _text: string;
  };
  "midi-unpitched"?: {
    _text: string;
  };
  volume?: {
    _text: string;
  };
  pan?: {
    _text: string;
  };
};

export type XMLScorePart = {
  _attributes: {
    id: string;
  };
  "part-name": {
    _text: string;
  };
  "part-abbreviation": {
    _text: string;
  };
  "score-instrument": ScoreInstrument[] | ScoreInstrument;
  "midi-instrument": MidiInstrument[] | MidiInstrument;
};

export type XMLPartMeasureNote = {
  _attributes?: {
    dynamics?: string;
  };
  rest?: {
    _attributes?: {
      measure?: string;
    };
  };
  duration: {
    _text: string;
  };
  pitch?: {
    step: {
      _text: string;
    };
    octave: {
      _text: string;
    };
  };
  unpitched?: {
    "display-step": {
      _text: string;
    };
    "display-octave": {
      _text: string;
    };
  };
  instrument?: {
    _attributes: {
      id: string;
    };
  };
  accidental?: {
    _text: string;
  };
  staff?: {
    _text: string;
  };
};

export type XMLPartMeasureDirection = {
  "direction-type"?: {
    metronome?: {
      "beat-unit": {
        _text: string;
      };
      "per-minute": {
        _text: string;
      };
    };
  };
  sound?: {
    _attributes?: {
      dynamics: string;
      tempo: string;
    };
  };
  wedge?: {
    _attributes?: {
      type: string;
    };
  };
};

export type XMLPartMeasure = {
  _attributes: {
    number: string;
  };
  attributes?: {
    time?: {
      beats?: {
        _text: string;
      };
      "beat-type"?: {
        _text: string;
      };
    };
    transpose?: {
      chromatic?: {
        _text: string;
      };
      "octave-change"?: {
        _text: string;
      };
    };
    divisions?: {
      _text: string;
    };
    key?: {
      fifths: {
        _text: string;
      };
    };
  };
  note: XMLPartMeasureNote[] | XMLPartMeasureNote;
  direction?: XMLPartMeasureDirection[] | XMLPartMeasureDirection;
};

export type XMLPart = {
  _attributes: {
    id: string;
  };
  measure: XMLPartMeasure[] | XMLPartMeasure;
};

export type MusicXMLFile = {
  "score-partwise": {
    work: {
      "work-title": {
        _text: string;
      };
    };
    "part-list": {
      "score-part": XMLScorePart[] | XMLScorePart;
    };
    part: XMLPart[] | XMLPart;
  };
};

export type MeasureNote = {
  note: string;
  duration: number;
  volume: number;
  accidental: string;
  staff: number;
  instrument: string;
};

export type Measure = {
  tempo?: string;
  time?: string;
  divisions?: number;
  signature?: number;
  notes: MeasureNote[];
};

export type Instrument = {
  [id: string]: {
    name?: string;
    sound?: string;
    midi_port?: number;
    midi_channel?: number;
    midi_program?: number;
    midi_unpitched?: number;
    midi_volume?: number;
    midi_pan?: number;
    transpose: number;
    midi?: string;
    real?: string;
  };
};

export type PartContent = {
  name: string;
  abbr: string;
  instruments: Instrument;
  measures: { [id: string]: Measure };
};

export type Part = {
  [id: string]: PartContent;
};

export type Metronome = {
  [num: number]: {
    unit?: string;
    perMinute: number;
  };
};

export type TimeSignature = {
  [num: number]: {
    perMeasure: number;
    unit: number;
  };
};

export type Score = {
  name: string;
  parts: Part;
  metronomes: Metronome;
  timeSignatures: TimeSignature;
};
