(function (ext) {
	$.getScript('https://tonejs.github.io/build/Tone.js', start)

	function start() {
		var loaded = false;
		var sampler;
		var tempo = 120;
		var majorScale = [0, 2, 4, 5, 7, 9, 11];
		var minorScale = [0, 2, 3, 5, 7, 8, 10];
		var dorianScale = [0, 2, 3, 5, 7, 9, 10];
		var phrygianScale = [0, 1, 3, 5, 7, 8, 10];
		var lydianScale = [0, 2, 4, 6, 7, 9, 11];
		var isFirst = false;
		var lastTime = 0;
		var loop = false;
		var totalNotes = 0;
		var samplers = [];
		var maxMeasure = 0;
		var sched = [];
		var octave = 4;
		var globalRoot = 0;
		var globalKey = 'major'
		var scales = [majorScale, minorScale, dorianScale, phrygianScale, lydianScale];
		var noteDuration = '4n'
		var currentInst = "acoustic_grand_piano";
		var currentBeats = 0;
		var currentNote = null;
		var prevNote = null;

		var baseUrl = "https://qscacheri.github.io/Sound-Samples/MusyngKite/"

		var midiNotes = [
            'C0', 'Db0', 'D0', 'Eb0', 'E0', 'F0', 'Gb0', 'G0', 'Ab0', 'A0', 'Bb0', 'B0',
                      'C1', 'Db1', 'D1', 'Eb1', 'E1', 'F1', 'Gb1', 'G1', 'Ab1', 'A1', 'Bb1', 'B1',
                      'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2', 'Ab2', 'A2', 'Bb2', 'B2',
                      'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3',
                      'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
                      'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5'
        ];


		var instrumentList = [
  "accordion",
  "acoustic_bass",
  "acoustic_grand_piano",
  "acoustic_guitar_nylon",
  "acoustic_guitar_steel",
  "agogo",
  "alto_sax",
  "applause",
  "bagpipe",
  "banjo",
  "baritone_sax",
  "bassoon",
  "bird_tweet",
  "blown_bottle",
  "brass_section",
  "breath_noise",
  "bright_acoustic_piano",
  "celesta",
  "cello",
  "choir_aahs",
  "church_organ",
  "clarinet",
  "clavinet",
  "contrabass",
  "distortion_guitar",
  "drawbar_organ",
  "dulcimer",
  "electric_bass_finger",
  "electric_bass_pick",
  "electric_grand_piano",
  "electric_guitar_clean",
  "electric_guitar_jazz",
  "electric_guitar_muted",
  "electric_piano_1",
  "electric_piano_2",
  "english_horn",
  "fiddle",
  "flute",
  "french_horn",
  "fretless_bass",
  "fx_1_rain",
  "fx_2_soundtrack",
  "fx_3_crystal",
  "fx_4_atmosphere",
  "fx_5_brightness",
  "fx_6_goblins",
  "fx_7_echoes",
  "fx_8_scifi",
  "glockenspiel",
  "guitar_fret_noise",
  "guitar_harmonics",
  "gunshot",
  "harmonica",
  "harpsichord",
  "helicopter",
  "honkytonk_piano",
  "kalimba",
  "koto",
  "lead_1_square",
  "lead_2_sawtooth",
  "lead_3_calliope",
  "lead_4_chiff",
  "lead_5_charang",
  "lead_6_voice",
  "lead_7_fifths",
  "lead_8_bass__lead",
  "marimba",
  "melodic_tom",
  "music_box",
  "muted_trumpet",
  "oboe",
  "ocarina",
  "orchestra_hit",
  "orchestral_harp",
  "overdriven_guitar",
  "pad_1_new_age",
  "pad_2_warm",
  "pad_3_polysynth",
  "pad_4_choir",
  "pad_5_bowed",
  "pad_6_metallic",
  "pad_7_halo",
  "pad_8_sweep",
  "pan_flute",
  "percussive_organ",
  "piccolo",
  "pizzicato_strings",
  "recorder",
  "reed_organ",
  "reverse_cymbal",
  "rock_organ",
  "seashore",
  "shakuhachi",
  "shamisen",
  "shanai",
  "sitar",
  "slap_bass_1",
  "slap_bass_2",
  "soprano_sax",
  "steel_drums",
  "string_ensemble_1",
  "string_ensemble_2",
  "synth_bass_1",
  "synth_bass_2",
  "synth_brass_1",
  "synth_brass_2",
  "synth_choir",
  "synth_drum",
  "synth_strings_1",
  "synth_strings_2",
  "taiko_drum",
  "tango_accordion",
  "telephone_ring",
  "tenor_sax",
  "timpani",
  "tinkle_bell",
  "tremolo_strings",
  "trombone",
  "trumpet",
  "tuba",
  "tubular_bells",
  "vibraphone",
  "viola",
  "violin",
  "voice_oohs",
  "whistle",
  "woodblock",
  "xylophone"
];


		//        loadSamples();

		var inst2 = new Tone.Sampler({
			C4: 'https://qscacheri.github.io/Sound-Samples/MusyngKite/drum-kit/kick_1.wav',
			D4: 'https://qscacheri.github.io/Sound-Samples/MusyngKite/drum-kit/snare_1.wav',
			E4: 'https://qscacheri.github.io/Sound-Samples/MusyngKite/drum-kit/closed%20hh_1.wav',
			F4: 'https://qscacheri.github.io/Sound-Samples/MusyngKite/drum-kit/open%20hh_1.wav'


		});


		for (var i = 0; i < 5; i++) {
			samplers.push(new Tone.Sampler({

				"C0": baseUrl + instrumentList[i] + "-mp3/" + "C0.mp3",
				"Db0": baseUrl + instrumentList[i] + "-mp3/" + "Db0.mp3",
				"D0": baseUrl + instrumentList[i] + "-mp3/" + "D0.mp3",
				"Eb0": baseUrl + instrumentList[i] + "-mp3/" + "Eb0.mp3",
				"E0": baseUrl + instrumentList[i] + "-mp3/" + "E0.mp3",
				"F0": baseUrl + instrumentList[i] + "-mp3/" + "F0.mp3",
				"Gb0": baseUrl + instrumentList[i] + "-mp3/" + "Gb0.mp3",
				"G0": baseUrl + instrumentList[i] + "-mp3/" + "G0.mp3",
				"Ab0": baseUrl + instrumentList[i] + "-mp3/" + "Ab0.mp3",
				"A0": baseUrl + instrumentList[i] + "-mp3/" + "A0.mp3",
				"Bb0": baseUrl + instrumentList[i] + "-mp3/" + "Bb0.mp3",
				"B0": baseUrl + instrumentList[i] + "-mp3/" + "B0.mp3",

				"C1": baseUrl + instrumentList[i] + "-mp3/" + "C1.mp3",
				"Db1": baseUrl + instrumentList[i] + "-mp3/" + "Db1.mp3",
				"D1": baseUrl + instrumentList[i] + "-mp3/" + "D1.mp3",
				"Eb1": baseUrl + instrumentList[i] + "-mp3/" + "Eb1.mp3",
				"E1": baseUrl + instrumentList[i] + "-mp3/" + "E1.mp3",
				"F1": baseUrl + instrumentList[i] + "-mp3/" + "F1.mp3",
				"Gb1": baseUrl + instrumentList[i] + "-mp3/" + "Gb1.mp3",
				"G1": baseUrl + instrumentList[i] + "-mp3/" + "G1.mp3",
				"Ab1": baseUrl + instrumentList[i] + "-mp3/" + "Ab1.mp3",
				"A1": baseUrl + instrumentList[i] + "-mp3/" + "A1.mp3",
				"Bb1": baseUrl + instrumentList[i] + "-mp3/" + "Bb1.mp3",
				"B1": baseUrl + instrumentList[i] + "-mp3/" + "B1.mp3",

				"C2": baseUrl + instrumentList[i] + "-mp3/" + "C2.mp3",
				"Db2": baseUrl + instrumentList[i] + "-mp3/" + "Db2.mp3",
				"D2": baseUrl + instrumentList[i] + "-mp3/" + "D2.mp3",
				"Eb2": baseUrl + instrumentList[i] + "-mp3/" + "Eb2.mp3",
				"E2": baseUrl + instrumentList[i] + "-mp3/" + "E2.mp3",
				"F2": baseUrl + instrumentList[i] + "-mp3/" + "F2.mp3",
				"Gb2": baseUrl + instrumentList[i] + "-mp3/" + "Gb2.mp3",
				"G2": baseUrl + instrumentList[i] + "-mp3/" + "G2.mp3",
				"Ab2": baseUrl + instrumentList[i] + "-mp3/" + "Ab2.mp3",
				"A2": baseUrl + instrumentList[i] + "-mp3/" + "A2.mp3",
				"Bb2": baseUrl + instrumentList[i] + "-mp3/" + "Bb2.mp3",
				"B2": baseUrl + instrumentList[i] + "-mp3/" + "B2.mp3",

				"C3": baseUrl + instrumentList[i] + "-mp3/" + "C3.mp3",
				"Db3": baseUrl + instrumentList[i] + "-mp3/" + "Db3.mp3",
				"D3": baseUrl + instrumentList[i] + "-mp3/" + "D3.mp3",
				"Eb3": baseUrl + instrumentList[i] + "-mp3/" + "Eb3.mp3",
				"E3": baseUrl + instrumentList[i] + "-mp3/" + "E3.mp3",
				"F3": baseUrl + instrumentList[i] + "-mp3/" + "F3.mp3",
				"Gb3": baseUrl + instrumentList[i] + "-mp3/" + "Gb3.mp3",
				"G3": baseUrl + instrumentList[i] + "-mp3/" + "G3.mp3",
				"Ab3": baseUrl + instrumentList[i] + "-mp3/" + "Ab3.mp3",
				"A3": baseUrl + instrumentList[i] + "-mp3/" + "A3.mp3",
				"Bb3": baseUrl + instrumentList[i] + "-mp3/" + "Bb3.mp3",
				"B3": baseUrl + instrumentList[i] + "-mp3/" + "B3.mp3",

				"C4": baseUrl + instrumentList[i] + "-mp3/" + "C4.mp3",
				"Db4": baseUrl + instrumentList[i] + "-mp3/" + "Db4.mp3",
				"D4": baseUrl + instrumentList[i] + "-mp3/" + "D4.mp3",
				"Eb4": baseUrl + instrumentList[i] + "-mp3/" + "Eb4.mp3",
				"E4": baseUrl + instrumentList[i] + "-mp3/" + "E4.mp3",
				"F4": baseUrl + instrumentList[i] + "-mp3/" + "F4.mp3",
				"Gb4": baseUrl + instrumentList[i] + "-mp3/" + "Gb4.mp3",
				"G4": baseUrl + instrumentList[i] + "-mp3/" + "G4.mp3",
				"Ab4": baseUrl + instrumentList[i] + "-mp3/" + "Ab4.mp3",
				"A4": baseUrl + instrumentList[i] + "-mp3/" + "A4.mp3",
				"Bb4": baseUrl + instrumentList[i] + "-mp3/" + "Bb4.mp3",
				"B4": baseUrl + instrumentList[i] + "-mp3/" + "B4.mp3",

				//                "C5": baseUrl + instrumentList[i] + "-mp3/" + "C5.mp3",
				//                "Db5": baseUrl + instrumentList[i] + "-mp3/" + "Db5.mp3",
				//                "D5": baseUrl + instrumentList[i] + "-mp3/" + "D5.mp3",
				//                "Eb5": baseUrl + instrumentList[i] + "-mp3/" + "Eb5.mp3",
				//                "E5": baseUrl + instrumentList[i] + "-mp3/" + "E5.mp3",
				//                "F5": baseUrl + instrumentList[i] + "-mp3/" + "F5.mp3",
				//                "Gb5": baseUrl + instrumentList[i] + "-mp3/" + "Gb5.mp3",
				//                "G5": baseUrl + instrumentList[i] + "-mp3/" + "G5.mp3",
				//                "Ab5": baseUrl + instrumentList[i] + "-mp3/" + "Ab5.mp3",
				//                "A5": baseUrl + instrumentList[i] + "-mp3/" + "A5.mp3",
				//                "Bb5": baseUrl + instrumentList[i] + "-mp3/" + "Bb5.mp3",
				//                "B5": baseUrl + instrumentList[i] + "-mp3/" + "B5.mp3"


			}))
		}


		Tone.Buffer.on('load', function () {
			alert("Done!");
			loaded = true;
			console.log('...done');
			for (var i = 0; i < 50; i++) {
				samplers[i].sync();
				samplers[i].toMaster();
			}
		})

		Tone.Buffer.on('progress', function () {})

		Tone.Buffer.on('error', function () {})


		var notesAndNums = {

			60: 'C4',
			61: 'C#4',
			62: 'D4',
			63: 'D#4',
			64: 'E4',
			65: 'F4',
			66: 'F#4',
			67: 'G4',
			68: 'G#4',
			69: 'A4',
			70: 'A#4',
			71: 'B4',
			72: 'C5',
			73: 'C#5',
			74: 'D5',
			75: 'D#5',
			76: 'E5',
			77: 'F5',
			78: 'F#5',
			79: 'G5',
			80: 'G#5',
			81: 'A5',
			82: 'A#5',
			83: 'B5'
		};

		function noteToNum(note) {


			var noteNum = 0;

			if (note == "C")
				noteNum = 0;
			else if (note == "Db" || note == 'C#')
				noteNum = 1;
			else if (note == "D")
				noteNum = 2;
			else if (note == "Eb" || note == "D#")
				noteNum = 3;
			else if (note == "E")
				noteNum = 4;
			else if (note == "F")
				noteNum = 5;
			else if (note == "Gb" || note == 'F#')
				noteNum = 6;
			else if (note == "G")
				noteNum = 7;
			else if (note == "Ab" || note == "G#")
				noteNum = 8;
			else if (note == "A")
				noteNum = 9;
			else if (note == "Bb" || note == "A#")
				noteNum = 10;
			else if (note == "B")
				noteNum = 11;
			return noteNum;
		}

		function numToNote(note) {

			return notesAndNums[note];
		}

		function convertBeat(beats) {
			var m = 0;
			var b = 0;
			var s = 0;
			m = Math.floor(beats / 4);

			b = Math.floor(beats) - (m * 4);

			s = (beats % 1) * 4;
			return (m + ':' + b + ':' + s);
		}

		function findThird(root, q) {
			var mod;
			if (q == ("major")) {
				mod = 0;
			} else if (q == ("minor")) {
				mod = -1;
			} else if (q == ("diminished")) {
				mod = -1;
			} else if (q == ("augmented")) {
				mod = 0;
			}

			return (root + 4 + mod);
		}



		function findFifth(root, q) {
			var mod;
			if (q == ("major")) {
				mod = 0;
			} else if (q == ("minor")) {
				mod = 0;
			} else if (q == ("diminished")) {
				mod = -1;
			} else if (q == ("augmented")) {
				mod = 1;
			}

			return (root + mod + 7);
		}

		ext.playChord = function (r, q) {
			if (!isFirst) {
				clear();
				isFirst = true;
			}
			if (loaded) {
				var root = noteToNum(r);
				var notes = [];
				notes[0] = root + (12 * (octave + 1));
				notes[1] = findThird(root, q) + (12 * (octave + 1));
				notes[2] = findFifth(root, q) + (12 * (octave + 1));
				var noteAndTime;
				for (var i = 0; i < 3; i++) {

					noteAndTime = {
						note: Tone.Frequency(notes[i], "midi").toNote(),
						beats: lastTime,
						dur: noteDuration,
						inst: instrumentList.indexOf(currentInst)
					};

					sched.push(noteAndTime);
				}
				totalNotes += 3;
			} else alert("Not so fast eager McBeaver!");

		};

		ext.playChordForBeats = function (r, q, b) {
			if (!isFirst) {
				clear();
				isFirst = true;
			}
			if (loaded) {
				var root = noteToNum(r);
				var notes = [];
				notes[0] = root + (12 * (octave + 1));
				notes[1] = findThird(root, q) + (12 * (octave + 1));
				notes[2] = findFifth(root, q) + (12 * (octave + 1));
				var noteAndTime;

				for (var i = 0; i < 3; i++) {
					noteAndTime = {
						note: Tone.Frequency(notes[i], "midi").toNote(),
						beats: lastTime,
						dur: noteDuration,
						inst: instrumentList.indexOf(currentInst)
					};
					sched.push(noteAndTime);
				}
				lastTime += b;
				totalNotes += 3;
			} else alert("Not so fast eager McBeaver!");
		};


		// Cleanup function when the extension is unloaded
		ext._shutdown = function () {};
		// Status reporting code
		// Use this to report missing hardware, plugin or unsupported browser
		ext._getStatus = function () {
			return {
				status: 2,
				msg: 'asdf'
			};
		};



		ext.playNote = function (n) {
			if (!isFirst) {
				clear();
				isFirst = true;
			}
			if (loaded) {
				noteAndTime = {
					note: n + "" + octave,
					beats: lastTime,
					dur: noteDuration,
					inst: instrumentList.indexOf(currentInst)
				};


				sched.push(noteAndTime);
				totalNotes++;
			} else alert("Not so fast eager McBeaver!");
		};


		ext.playNoteForBeats = function (n, beats) {
			if (!isFirst) {
				clear();
				isFirst = true;
			}
			if (loaded) {
				noteAndTime = {
					note: n + "" + octave,
					beats: lastTime,
					dur: noteDuration,
					inst: instrumentList.indexOf(currentInst)
				};

				sched.push(noteAndTime);
				lastTime += (beats);
				totalNotes++;
			} else alert("Not so fast eager McBeaver!");

		};

		ext.playSequence = function (notes,beatsLasting) {
			var notesSplit = notes.split(' ');
			console.log(notesSplit);
			var noteAndTime;
			for (var i = 0; i < notesSplit.length; i++) {
				noteAndTime = {
					note: notesSplit[i] + octave,
					beats: lastTime,
					dur: noteDuration,
					inst: instrumentList.indexOf(currentInst)
				};
				sched.push(noteAndTime);
				lastTime+=beatsLasting;
				totalNotes++;
			}
		};

		function getScale() {
			if (globalKey == 'major') return 0;
			else if (globalKey == 'minor') return 1;
			else if (globalKey == 'dorian') return 2;
			else if (globalKey == 'phrygian') return 3;
			else if (globalKey == 'lydian') return 4;
		}

		ext.playDeg = function (n, beats) {

			if (!isFirst) {
				clear();
				isFirst = true;
			}

			var scaleNum = getScale();
			//            console.log('scalenum  == ' + scales[scaleNum]);

			var newNote = globalRoot + (scales[scaleNum][n - 1]);
			newNote = newNote + (12 * (octave + 1));
			newNote = Tone.Frequency(newNote, "midi").toNote()
			console.log('note  == ' + newNote);
			noteAndTime = {
				note: newNote,
				beats: lastTime,
				dur: noteDuration,
				inst: instrumentList.indexOf(currentInst)
			};

			sched.push(noteAndTime);
			lastTime += beats;
			totalNotes++;
		};

		ext.loopOn = function () {
			loop = true;
		};

		ext.loopOff = function () {
			loop = false;
			sched = [];
			Tone.Transport.loop = false;
			Tone.Transport.stop();
			Tone.Transport.cancel();
		};

		ext.setOctave = function (n) {
			octave = n;
		};

		ext.setDuration = function (v) {
			if (v === '1/2 note')
				noteDuration = '2n';
			else if (v === '1/4 note')
				noteDuration = '4n';
			else if (v === '1/8 note')
				noteDuration = '8n'
			else if (v === '1/16 note')
				noteDuration = '16n';

		};

		ext.newSound = function (s) {
			currentInst = s;
		}

		function clear() {
			totalNotes = 0;
			sched = [];
			lastTime = 0;
			Tone.Transport.stop();
			Tone.Transport.cancel();
		};

		ext.clearNotes = function () {
			totalNotes = 0;
			sched = [];
			lastTime = 0;
			Tone.Transport.stop();
			Tone.Transport.cancel();
		};

		ext.setRoot = function (r) {
			globalRoot = noteToNum(r);
			//            console.log('new root = ' + noteToNum(r));
		};



		ext.setScale = function (scale) {
			globalKey = scale;
		};

		ext.setTempo = function (t) {
			tempo = t;
		};

		ext.addBeat = function () {
			currentBeats++;
		};

		ext.setNote = function (n) {
			currentBeats++;
			var noteAndTime;
			if (currentNote != null) {
				noteAndTime = {
					note: currentNote + "" + octave,
					beats: lastTime,
					dur: noteDuration,
					inst: instrumentList.indexOf(currentInst)
				};
				console.log('play ' + currentNote + "for" + currentBeats + 'beats');
				console.log("note and time = " + noteAndTime.beats);
				sched.push(noteAndTime);
				lastTime += currentBeats;
				totalNotes++;
				currentNote = n;
				currentBeats = 0;
			} else {
				currentNote = n;
				console.log('first note');
			}

			console.log('beats: ' + currentBeats);
			console.log('note: ' + currentNote);


		};

		ext.speakerOut = function () {
			console.log('beats: ' + currentBeats);
			console.log('note: ' + currentNote);
			console.log('last time = ' + lastTime);

			var noteAndTime;
			if (currentNote != null) {
				noteAndTime = {
					note: currentNote + "" + octave,
					beats: lastTime,
					dur: noteDuration,
					inst: instrumentList.indexOf(currentInst)
				};

				sched.push(noteAndTime);
				lastTime += currentBeats;
				totalNotes++;
			}

			currentNote = null;
			currentBeats = 0;

			//            console.log("milli = " + Tone.TimeBase('1:4:0').toMilliseconds());
			isFirst = false;
			Tone.Transport.bpm.value = tempo;

			Tone.Transport.start();
			if (lastTime % 4 == 0) {
				maxMeasure = lastTime / 4;
			} else {
				maxMeasure = (Math.floor(lastTime / 4) + 1);
			}



			Tone.Transport.setLoopPoints(0, maxMeasure + 'm');
			if (loop == true) {
				Tone.Transport.loop = true;
			} else Tone.Transport.loop = false;


			var time;
			inst2.volume.value = -6;
			for (var i = 0; i < totalNotes; i++) {

				time = convertBeat(sched[i].beats)

				samplers[sched[i].inst].triggerAttackRelease(sched[i].note, sched[i].dur, time);
			}

			if (loop == false) {
				Tone.Transport.schedule(function (time) {
					totalNotes = 0;
					sched = [];
					lastTime = 0;
					Tone.Transport.stop();
					Tone.Transport.cancel();
				}, convertBeat(lastTime));
			};
		};

		// Block and block menu descriptions
		var descriptor = {
			blocks: [
                [' ', 'play note %s', 'playNote', 'C'],
                [' ', 'play note %s for %n beat(s)', 'playNoteForBeats', 'C', 1],
                [' ', 'play %s %m.qualities', 'playChord', 'C', 'major'],
                [' ', 'play chord %s %m.qualities for %n beat(s)', 'playChordForBeats', 'C', 'major', 1],
                [' ', 'set loop on', 'loopOn'],
                [' ', 'set loop off', 'loopOff'],
                [' ', 'set octave to %n', 'setOctave', 4],
                [' ', 'set duration %m.beatval ', 'setDuration', ''],
                [' ', 'load new sound %m.sounds', 'newSound', 'acoustic_grand_piano'],
                [' ', 'clear notes', 'clearNotes'],
                [' ', 'set scale root to %m.notes', 'setRoot', 'C'],
                [' ', 'set scale to %m.scales', 'setScale', 'major'],
                [' ', 'play the %n for %n beat(s)', 'playDeg', 1, 1],
                [' ', 'set tempo to %n bpm', 'setTempo', 120],
                [' ', '%m.notes', 'setNote', 'C'],
                [' ', '+', 'addBeat'],
				[' ', 'Play sequence %s with durations %n', 'playSequence'],

                [' ', '🔊speakers🔊', 'speakerOut']


            ],
			menus: {
				beatval: ['1/2 note', '1/4 note', '1/8 note', '1/16 note'],
				qualities: ['major', 'minor', 'diminished', 'augmented'],
				scales: ['major', 'minor', 'dorian', 'phrygian', 'lydian'],
				sounds: instrumentList,
				notes: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
			}
		};
		// Register the extension
		ScratchExtensions.register('Music Blocks', descriptor, ext);
	};
})({});
