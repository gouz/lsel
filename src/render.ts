import { Instrument } from "./MusicXML/types";

export const renderInstrument = (instrument: Instrument, abbr: string) =>
  `
    <div class="instrument">
        <h2>${instrument.name} (${abbr})</h2>
        <button id="${instrument.id}" title="${instrument.name}" data-midi-channel="${instrument.midi_channel}" data-midi-pan="${instrument.midi_pan}" data-midi-port="${instrument.midi_port}" data-midi-program="${instrument.midi_program}" data-midi-unpitched="${instrument.midi_unpitched}" data-midi-volume="${instrument.midi_volume}" data-sound="${instrument.sound}"></button>
    </div>
  `;
