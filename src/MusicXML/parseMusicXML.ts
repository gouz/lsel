import convert from "xml-js";
import type {
  MusicXMLFile,
  Score,
  Metronome,
  TimeSignature,
  PartContent,
  Part,
  Measure,
  XMLPartMeasure,
  XMLPartMeasureDirection,
} from "./types";

const parseMusicXML = (xml: string): Score => {
  const conv = convert.xml2js(xml.replace(/<!DOCTYPE(.*)>/g, ""), {
    compact: true,
  }) as MusicXMLFile;
  const name = conv["score-partwise"].work["work-title"]._text;
  let scoreParts = conv["score-partwise"]["part-list"]["score-part"];
  if (!Array.isArray(scoreParts)) scoreParts = [scoreParts];
  const parts: Part = {};
  scoreParts.forEach((part, _) => {
    const p: PartContent = {
      name: part["part-name"]._text,
      abbr: part["part-abbreviation"]._text,
      instruments: {},
      measures: {},
    };
    let scoreInstruments = part["score-instrument"];
    if (!Array.isArray(scoreInstruments)) scoreInstruments = [scoreInstruments];
    scoreInstruments.forEach((si, _) => {
      p.instruments[si._attributes.id] = {
        name: si["instrument-name"]?._text || "",
        sound: si["instrument-sound"]?._text || "",
        transpose: 0,
      };
    });
    let midiInstruments = part["midi-instrument"];
    if (!Array.isArray(midiInstruments)) midiInstruments = [midiInstruments];
    midiInstruments.forEach((mi, _) => {
      p.instruments[mi._attributes.id] = {
        ...p.instruments[mi._attributes.id],
        midi_port: Number(mi._attributes.port || 0),
        midi_channel: Number(mi["midi-channel"]?._text || 0),
        midi_program: Number(mi["midi-program"]?._text || 0),
        midi_volume: Number(mi.volume?._text || 0),
        midi_unpitched: Number(mi["midi-unpitched"]?._text || 0),
        midi_pan: Number(mi.pan?._text || 0),
      };
    });
    parts[part._attributes.id] = p;
  });
  const metronomes: Metronome = {};
  const timeSignatures: TimeSignature = {};
  let scorePartwiseParts = conv["score-partwise"].part;
  if (!Array.isArray(scorePartwiseParts))
    scorePartwiseParts = [scorePartwiseParts];
  let shiftMeasure = 0;
  scorePartwiseParts.forEach((p, _) => {
    const partId = p._attributes.id;
    let measures = p.measure;
    if (!Array.isArray(measures)) measures = [measures];
    let volume = 0;
    measures.forEach((m: XMLPartMeasure, _) => {
      let numMeasure = Number(m._attributes.number) - 1 + shiftMeasure;
      if (numMeasure < 0) {
        numMeasure = 0;
        shiftMeasure = 1;
      }
      const measure: Measure = {
        notes: [],
      };
      let direction:
        | XMLPartMeasureDirection
        | XMLPartMeasureDirection[]
        | undefined = m.direction;
      if (direction) {
        if (!Array.isArray(direction)) direction = [direction];
        [...direction].forEach((d, _) => {
          if (d["direction-type"]?.metronome)
            metronomes[numMeasure] = {
              unit: d["direction-type"].metronome["beat-unit"]._text,
              perMinute: Number(
                d["direction-type"].metronome["per-minute"]._text
              ),
            };
          if (d.sound?._attributes?.dynamics)
            volume = Number(d.sound._attributes.dynamics);
          if (d.sound?._attributes?.tempo) {
            if (metronomes[numMeasure])
              metronomes[numMeasure].perMinute = Number(
                d.sound._attributes.tempo
              );
            else
              metronomes[numMeasure] = {
                perMinute: Number(d.sound._attributes.tempo),
              };
          }
        });
      }
      if (m.attributes?.time) {
        timeSignatures[numMeasure] = {
          perMeasure: Number(m.attributes.time.beats?._text),
          unit: Number(m.attributes.time["beat-type"]?._text),
        };
      }
      if (m.attributes?.transpose?.chromatic) {
        let oct = 0;
        if (m.attributes.transpose["octave-change"])
          oct = Number(m.attributes.transpose["octave-change"]._text);

        parts[partId].instruments[`${partId}-I1`].transpose =
          Number(m.attributes.transpose.chromatic._text) + 12 * oct;
      }
      if (m.attributes?.divisions) {
        measure.divisions = Number(m.attributes.divisions._text);
      }
      if (m.attributes?.key?.fifths) {
        measure.signature = Number(m.attributes.key.fifths._text);
      }
      parts[partId].measures[numMeasure] = measure;
      let notes = m.note;
      if (!Array.isArray(notes)) notes = [notes];
      notes.forEach((n, _) => {
        let instrument = `${partId}-I1`;
        if (n.instrument) instrument = n.instrument._attributes.id;
        let note = "";
        if (n.pitch) note = `${n.pitch.step._text}${n.pitch.octave._text}`;
        if (n.unpitched)
          note = `${n.unpitched["display-step"]._text}${n.unpitched["display-octave"]._text}`;
        if (n._attributes?.dynamics) volume = Number(n._attributes.dynamics);
        parts[partId].measures[numMeasure].notes.push({
          note,
          duration: Number(n.duration?._text || 0),
          volume,
          accidental: n.accidental?._text || "",
          staff: Number(n.staff?._text || 1),
          instrument,
        });
      });
    });
  });
  return {
    name,
    parts,
    metronomes,
    timeSignatures,
  };
};

export default parseMusicXML;
