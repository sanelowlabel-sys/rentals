import { GearItem, PackageBundle, GautengDeliveryZone } from '../types';

import korgKaossilatorImg from '../assets/images/korg_kaossilator_1790128433007.jpg';
import korgKaossPadImg from '../assets/images/korg_kaoss_pad_1790128444314.jpg';
import korgVolcaFmImg from '../assets/images/korg_volca_fm_1790128455238.jpg';
import korgVolcaKeysImg from '../assets/images/korg_volca_keys_1790128466396.jpg';
import korgVolcaBassImg from '../assets/images/korg_volca_bass_1790128476378.jpg';
import dbboxTesterImg from '../assets/images/dbbox_tester_1790128488175.jpg';
import akaiMax49Img from '../assets/images/akai_max49_1790128501126.jpg';
import yamahaHs8Img from '../assets/images/yamaha_hs8_1790128512039.jpg';
import jblLsrMonitorImg from '../assets/images/jbl_lsr_monitor_1790128521609.jpg';
import pioneerDm50Img from '../assets/images/pioneer_dm50_1790128531585.jpg';
import behringerUphoriaImg from '../assets/images/behringer_uphoria_1790128541538.jpg';
import steinbergMidex8Img from '../assets/images/steinberg_midex8_1790128552071.jpg';
import hybridDjMixerImg from '../assets/images/hybrid_dj_mixer_1790128562818.jpg';
import standsTripodBundleImg from '../assets/images/stands_tripod_bundle_1790128574641.jpg';
import numarkNdxPlayersImg from '../assets/images/numark_ndx_players_1790128586753.jpg';
import pioneerCdj350Img from '../assets/images/pioneer_cdj350_1790128597243.jpg';

export const GAUTENG_ZONES: GautengDeliveryZone[] = [
  {
    id: 'sandton_rosebank',
    name: 'Sandton & Rosebank Core',
    area: 'Sandton, Rosebank, Hyde Park, Illovo, Morningside',
    dispatchTimeMins: '25 - 35 mins',
    deliveryFee: 250,
    isExpressEligible: true,
    popularLocations: ['Sandton Convention Centre', 'Gallagher Estate', 'Hyde Park Studios']
  },
  {
    id: 'jhb_central',
    name: 'Johannesburg Central & Urban',
    area: 'Braamfontein, Maboneng, Newtown, Marshalltown, Greenside',
    dispatchTimeMins: '30 - 45 mins',
    deliveryFee: 280,
    isExpressEligible: true,
    popularLocations: ['Constitution Hill', 'The Orbit Vault', 'Maboneng Arts Hub']
  },
  {
    id: 'randburg_north',
    name: 'Randburg & Fourways Corridor',
    area: 'Randburg, Ferndale, Fourways, Bryanston, Northriding',
    dispatchTimeMins: '30 - 40 mins',
    deliveryFee: 280,
    isExpressEligible: true,
    popularLocations: ['Montecasino', 'Ticketpro Dome Area', 'Bryanston Production Studios']
  },
  {
    id: 'midrand_waterfall',
    name: 'Midrand & Waterfall City',
    area: 'Waterfall City, Halfway House, Kyalami, Vorna Valley',
    dispatchTimeMins: '25 - 35 mins',
    deliveryFee: 300,
    isExpressEligible: true,
    popularLocations: ['Mall of Africa Studios', 'Kyalami Grand Prix Circuit', 'Waterfall Logistics']
  },
  {
    id: 'pretoria_east_central',
    name: 'Pretoria & Centurion Hub',
    area: 'Menlyn, Brooklyn, Hatfield, Centurion, Pretoria CBD',
    dispatchTimeMins: '45 - 55 mins',
    deliveryFee: 380,
    isExpressEligible: true,
    popularLocations: ['Time Square Arena Menlyn', 'State Theatre', 'Centurion Lake']
  },
  {
    id: 'soweto_south',
    name: 'Soweto & JHB South',
    area: 'Diepkloof, Orlando, Pimville, Glenvista, Mondeor',
    dispatchTimeMins: '45 - 55 mins',
    deliveryFee: 380,
    isExpressEligible: true,
    popularLocations: ['FNB Stadium Nasrec', 'Soweto Theatre', 'Walter Sisulu Square']
  },
  {
    id: 'east_rand_airport',
    name: 'East Rand & O.R. Tambo Area',
    area: 'Bedfordview, Edenvale, Kempton Park, Boksburg, Benoni',
    dispatchTimeMins: '35 - 45 mins',
    deliveryFee: 340,
    isExpressEligible: true,
    popularLocations: ['O.R. Tambo Airport Hub', 'Emperors Palace', 'Glendower']
  },
  {
    id: 'wynberg_depot_pickup',
    name: 'Free Studio Depot Collection (Wynberg / Sandton)',
    area: '5th Street, Wynberg (5 mins off M1 Grayston Dr)',
    dispatchTimeMins: 'Instant (Pre-packed)',
    deliveryFee: 0,
    isExpressEligible: true,
    popularLocations: ['Warehouse Dock 3 - Sound Check Station']
  }
];

export const GEAR_INVENTORY: GearItem[] = [
  // 1. Korg Kaossilator
  {
    id: 'korg-kaossilator',
    name: 'Korg Kaossilator Dynamic Phrase Synthesizer',
    brand: 'Korg',
    model: 'Kaossilator Loop Recorder',
    category: 'synthesizers',
    categoryLabel: 'Synths & Samplers',
    image: korgKaossilatorImg,
    dailyRate: 250,
    weekendRate: 420,
    weeklyRate: 980,
    deposit: 900,
    inStock: true,
    stockCount: 5,
    featured: true,
    popular: true,
    tagline: 'Dynamic phrase synthesizer & realtime loop recorder with tactile touchpad',
    description: 'Intuitive touchpad synthesizer allowing producers and live performers to create musical phrases effortlessly by stroking or tapping the touch pad. Built-in phrase loop recorder lets you layer multiple phrases with unlimited overdubs to build hypnotic grooves on the fly.',
    specs: [
      '100 Diverse Sound Programs (Leads, Acoustic, Bass, Chords, SE, Drums)',
      'Built-in Phrase Loop Recorder with Layered Overdubbing',
      '31 Musical Scale and Key Settings for instant harmonic lock',
      'Dual RCA Audio Line Output and 3.5mm Headphone Jack',
      'Gate Arpeggiator with 50 customizable rhythmic patterns'
    ],
    includedAccessories: [
      'Protective padded travel pouch',
      'High-grade stereo RCA to 3.5mm audio lead',
      'Dedicated power supply unit + backup industrial AA batteries'
    ],
    powerRequirement: '9V DC adapter (supplied) or 4x AA batteries',
    idealFor: 'Live electronic performances, impromptu beatmaking jams, studio ear-candy fills'
  },

  // 2. Korg Kaoss Pad KP3
  {
    id: 'korg-kaoss-pad-kp3',
    name: 'Korg Kaoss Pad KP3 Dynamic Effects Processor & Sampler',
    brand: 'Korg',
    model: 'KP3 Performance Effects Unit',
    category: 'dj',
    categoryLabel: 'DJ FX & Samplers',
    image: korgKaossPadImg,
    dailyRate: 350,
    weekendRate: 590,
    weeklyRate: 1400,
    deposit: 1200,
    inStock: true,
    stockCount: 4,
    featured: true,
    popular: true,
    tagline: 'Legendary realtime X-Y dynamic effects processor & 4-bank phrase sampler',
    description: 'The global benchmark performance effects unit for DJs, electronic producers, and live sound sculptors. Features an illuminated red LED X-Y touchpad controlling 128 dynamic effects, 4 dedicated sample bank buttons, and USB MIDI synchronization for club and festival stages.',
    specs: [
      '128 Performance Effect Programs (Grain Shifters, Vinyl Breaks, Delays, Filters)',
      '4 Dedicated Sample Flash Buttons with instant loop playback',
      'Auto BPM Detection, Tap Tempo, and MIDI clock sync',
      'SD Memory Card slot for rapid sound library loading & saving',
      'Touchpad Mute & FX Release functions for seamless transitions'
    ],
    includedAccessories: [
      'Original Korg 12V DC power adapter',
      '2x Dual Gold-plated RCA audio cables',
      'High-speed SD Card pre-formatted with sample loops',
      'Custom foam-lined road flightcase'
    ],
    powerRequirement: '12V DC power adapter (included with SA plug)',
    idealFor: 'Amapiano & club DJ sets, live remixing, vocal looping, hardware synth FX chains'
  },

  // 3. Korg Volca FM
  {
    id: 'korg-volca-fm',
    name: 'Korg Volca FM 3-Voice Digital FM Synthesizer',
    brand: 'Korg',
    model: 'Volca FM (DX7 Compatible)',
    category: 'synthesizers',
    categoryLabel: 'Synthesizers & Keys',
    image: korgVolcaFmImg,
    dailyRate: 220,
    weekendRate: 370,
    weeklyRate: 850,
    deposit: 750,
    inStock: true,
    stockCount: 4,
    featured: false,
    popular: true,
    tagline: 'True 6-operator digital FM sound engine with full Yamaha DX7 patch compatibility',
    description: 'Compact 3-voice digital FM synthesizer that accurately reproduces the classic sound engine of the historic Yamaha DX7. Equipped with an intuitive interface that makes complex FM editing accessible, 16-step motion sequencer, and onboard chorus effect.',
    specs: [
      'True 6-Operator FM synthesis engine with 32 classic algorithms',
      'Full compatibility with Yamaha DX7 SYS-EX sound cartridge patches',
      '16-step sequencer with Motion Sequence parameter automation',
      'Built-in lush stereo Chorus effect processor',
      'Sync In/Out (3.5mm) and standard 5-pin DIN MIDI In'
    ],
    includedAccessories: [
      'Korg 9V DC low-noise power supply',
      '3.5mm stereo sync link cable',
      '3.5mm mini-jack to dual 1/4" studio breakout lead'
    ],
    powerRequirement: '9V DC adapter (supplied) or 6x AA batteries',
    idealFor: 'Lush 80s synth bells, metallic percussion, snappy FM basslines, techno polyrhythms'
  },

  // 4. Korg Volca Keys
  {
    id: 'korg-volca-keys',
    name: 'Korg Volca Keys Analogue Loop Synthesizer',
    brand: 'Korg',
    model: 'Volca Keys (Analog Tape Delay)',
    category: 'synthesizers',
    categoryLabel: 'Synthesizers & Keys',
    image: korgVolcaKeysImg,
    dailyRate: 220,
    weekendRate: 370,
    weeklyRate: 850,
    deposit: 750,
    inStock: true,
    stockCount: 4,
    featured: false,
    popular: false,
    tagline: 'Warm 3-voice true analogue polyphonic synth with vintage tape delay simulator',
    description: 'True analog polyphonic lead synthesizer featuring 3 voices, self-oscillating low-pass resonant filter, and a warm Space Tape Delay effect. Perfect for lush ambient drones, vintage chord stabs, and hypnotic arpeggiated sequences.',
    specs: [
      '3-Voice True Analog Architecture (Poly, Unison, Octave, Fifth, Unison-Ring)',
      'Legendary miniKORG700S-derived 12dB/oct Low-Pass Resonant Filter',
      'Built-in Space Tape Delay simulator for spatial echo trails',
      'Loop Sequencer with Motion Sequence & Active Step function',
      'Touch-sensitive multi-touch keyboard strip with portamento'
    ],
    includedAccessories: [
      'Dedicated 9V DC power supply',
      '3.5mm sync interconnect cable',
      'Studio mini-jack to 1/4" balanced patch lead'
    ],
    powerRequirement: '9V DC adapter (included) or 6x AA batteries',
    idealFor: 'Warm analog pads, sci-fi sweeps, polyphonic chord stabs, ambient electronic tracks'
  },

  // 5. Korg Volca Bass
  {
    id: 'korg-volca-bass',
    name: 'Korg Volca Bass Analogue Bass Machine',
    brand: 'Korg',
    model: 'Volca Bass (3-Oscillator)',
    category: 'synthesizers',
    categoryLabel: 'Synthesizers & Keys',
    image: korgVolcaBassImg,
    dailyRate: 220,
    weekendRate: 370,
    weeklyRate: 850,
    deposit: 750,
    inStock: true,
    stockCount: 5,
    featured: false,
    popular: true,
    tagline: 'Monstrous 3-oscillator pure analogue bass synthesizer with razor-sharp filter',
    description: 'Analog bass synthesizer engineered with three individual analog oscillators capable of detuned unison for gargantuan sub-bass or distinct 3-part melodies. Features Electribe-style step sequencing with Slide functions for authentic acid bass glides.',
    specs: [
      '3 Independent Analog Oscillators (Sawtooth and Square waveforms)',
      '12dB/oct resonant analog filter with dedicated peak resonance control',
      'Electribe-style 16-step sequencer with Active Step and Slide accents',
      'LFO with Triangle/Square shapes routable to Amp, Pitch, or Filter Cutoff',
      'Analog Sync In/Out for tight synchronization with other Volca units'
    ],
    includedAccessories: [
      'Dedicated 9V DC low-noise power supply',
      'Stereo patch breakout cable',
      '3.5mm sync clock cord'
    ],
    powerRequirement: '9V DC adapter (included) or 6x AA batteries',
    idealFor: 'Acid house basslines, heavy sub-bass foundation, punchy electro riffs'
  },

  // 6. DBBox
  {
    id: 'dbbox-audio-tester',
    name: 'DBBox Studio DI Box & Audio Cable Signal Tester',
    brand: 'CTP Systems',
    model: 'DBBox Multi-Format Diagnostic Tool',
    category: 'interfaces',
    categoryLabel: 'Interfaces & Signal Tools',
    image: dbboxTesterImg,
    dailyRate: 180,
    weekendRate: 300,
    weeklyRate: 700,
    deposit: 600,
    inStock: true,
    stockCount: 6,
    featured: false,
    popular: false,
    tagline: 'Handheld studio DI box, precision tone generator & multi-cable diagnostic tester',
    description: 'The sound engineer and audio technician’s must-have diagnostic tool. Features an onboard tone oscillator (pink noise, 1kHz, 400Hz), 48V phantom power tester with voltage readout, built-in monitor speaker, active balanced DI box, and instant continuity testing for XLR, 1/4" TRS, and RCA lines.',
    specs: [
      'Cable Continuity Tester: XLR 3-Pin, 1/4" (6.35mm) TRS Jack, 3.5mm, RCA Phono',
      'Signal Generator: Calibrated Sine Wave (100Hz, 400Hz, 1kHz, 10kHz) and Pink Noise',
      'Microphone Input Preamp with Phantom Power LED indicator and speaker monitor',
      'Active Balanced DI Box with stepped output level attenuator',
      'Built-in speaker and 3.5mm headphone amplifier for audio line snooping'
    ],
    includedAccessories: [
      'Shock-absorbing protective rubber holster',
      'Set of calibrated test probes and patch adapters',
      'Industrial 9V long-life alkaline batteries installed',
      'Heavy-duty nylon zippered travel case'
    ],
    powerRequirement: 'Internal 9V battery or external DC supply',
    idealFor: 'Studio troubleshooting, live PA line-checks, testing venue multicores, festival dock checks'
  },

  // 7. Akai Max 49
  {
    id: 'akai-max-49',
    name: 'Akai Max 49 USB/MIDI/CV Controller',
    brand: 'Akai Professional',
    model: 'Max 49 (Touch Faders & CV/Gate)',
    category: 'synthesizers',
    categoryLabel: 'Synths & Samplers',
    image: akaiMax49Img,
    dailyRate: 320,
    weekendRate: 540,
    weeklyRate: 1250,
    deposit: 1100,
    inStock: true,
    stockCount: 3,
    featured: true,
    popular: true,
    tagline: '49 semi-weighted keys with revolutionary LED touch faders and analog CV/Gate',
    description: 'Flagship production controller featuring 49 semi-weighted keys with aftertouch, 12 backlit genuine MPC pads with classic Note Repeat, 8 revolutionary illuminated touch faders for dynamic parameter control, and built-in analog CV/Gate outputs to control modern and vintage modular gear.',
    specs: [
      '49 Semi-weighted keys with Aftertouch for expressive playing',
      '8 Backlit LED Touch Faders for continuous MIDI CC and CV control',
      '12 Real MPC Pads across 4 banks (48 assignable pads total)',
      'Analog CV & Gate outputs (1V/Oct) to drive modular and vintage synths',
      'Built-in 32-step arpeggiator and step sequencer'
    ],
    includedAccessories: [
      'Padded heavy-duty gig transport bag',
      'Gold-plated shielded USB-B cable',
      'External power adapter for standalone hardware operation',
      'M-Audio universal sustain pedal with polarity switch'
    ],
    powerRequirement: 'USB Bus-Powered or 12V DC adapter (supplied)',
    idealFor: 'DAW music production, controlling analog synthesizers, expressive live keyboard performance'
  },

  // 8. Yamaha HS8 (x1)
  {
    id: 'yamaha-hs8-single',
    name: 'Yamaha HS8 8-Inch 120W Active Studio Reference Monitor (x1)',
    brand: 'Yamaha',
    model: 'HS8 Active Reference (Single Unit)',
    category: 'monitors',
    categoryLabel: 'Studio Monitors',
    image: yamahaHs8Img,
    dailyRate: 260,
    weekendRate: 440,
    weeklyRate: 1050,
    deposit: 950,
    inStock: true,
    stockCount: 6,
    featured: true,
    popular: true,
    tagline: '8-inch 120W bi-amplified active studio reference monitor with iconic white cone',
    description: 'The modern successor to the legendary NS-10 studio standard. Houses an 8" white cone woofer and 1" dome tweeter powered by a high-efficiency 120W bi-amp system. Delivers exceptionally accurate, honest frequency response down to 38Hz for surgical low-end evaluation.',
    specs: [
      '120W Bi-Amp Amplification (75W Low Frequency + 45W High Frequency)',
      '8-inch cone woofer and 1-inch high-performance dome tweeter',
      'Wide frequency response: 38Hz to 30kHz',
      'Room Control and High Trim acoustic response switches',
      'Balanced XLR and 1/4" TRS phone jack inputs'
    ],
    includedAccessories: [
      'Auralex high-density acoustic foam isolation decoupling wedge',
      'Balanced XLR-to-TRS Mogami studio audio cable',
      'Heavy-duty IEC power cable'
    ],
    powerRequirement: '220V - 240V SA 3-pin plug (Surge-protected)',
    idealFor: 'Amapiano log drum mixing, sub-bass tuning, mastering reference, DJ monitoring'
  },

  // 9. JBL LSR 305/308 Studio Monitor (x1)
  {
    id: 'jbl-lsr-monitor-single',
    name: 'JBL LSR 305/308 Powered Studio Monitor (x1)',
    brand: 'JBL Professional',
    model: 'LSR 3-Series Powered Monitor',
    category: 'monitors',
    categoryLabel: 'Studio Monitors',
    image: jblLsrMonitorImg,
    dailyRate: 240,
    weekendRate: 400,
    weeklyRate: 950,
    deposit: 850,
    inStock: true,
    stockCount: 5,
    featured: false,
    popular: true,
    tagline: 'Powered studio monitor featuring patented Image Control Waveguide for broad sweet spot',
    description: 'Equipped with JBL’s patented Image Control Waveguide originally developed for the flagship M2 Master Reference Monitor. Provides breathtaking stereo imaging, pristine high-frequency detail, and punchy, tight bass reproduction in any room.',
    specs: [
      'Patented Image Control Waveguide ensures expansive sweet spot and neutral off-axis response',
      'Dual integrated Class-D power amplifiers with ample dynamic headroom',
      'Long-throw woofer and damped woven-composite Neodymium tweeter',
      'Selectable Input Sensitivity (+4dBu / -10dBV) and HF/LF Trim switches',
      'Balanced XLR and 1/4" TRS inputs'
    ],
    includedAccessories: [
      'Dense acoustic decoupling isolation pad',
      'Balanced Mogami TRS-to-XLR studio patch lead',
      'IEC power cord with surge protection'
    ],
    powerRequirement: '220V - 240V SA 3-pin plug',
    idealFor: 'Music production, vocal tracking control rooms, video post-production editing'
  },

  // 10. Pioneer DM-50
  {
    id: 'pioneer-dm-50-pair',
    name: 'Pioneer DM-50 5-Inch Desktop Active Monitor Speaker Pair',
    brand: 'Pioneer DJ',
    model: 'DM-50 Active Desktop Pair (L + R)',
    category: 'monitors',
    categoryLabel: 'Studio Monitors',
    image: pioneerDm50Img,
    dailyRate: 290,
    weekendRate: 490,
    weeklyRate: 1150,
    deposit: 1000,
    inStock: true,
    stockCount: 6,
    featured: true,
    popular: true,
    tagline: '5-inch active monitor pair with instant one-touch DJ / Production DSP sound modes',
    description: 'Versatile 5-inch desktop monitor pair engineered specifically for creators who both DJ and produce music. A rear switch activates DSP tuning: flip to DJ mode for punchy, energizing bass, or Production mode for flat, honest acoustic reference.',
    specs: [
      'Two-way bass reflex active monitor speakers (Complete Matched Pair)',
      '5-inch fiberglass woofers with front-firing bass reflex ducts with Grooves',
      '3/4-inch soft dome tweeters with DECO convex diffusers for wide 3D stereo sound',
      'Switchable DSP Sound Mode: DJ Mode / Production Mode',
      'Multiple inputs: RCA, 3.5mm stereo mini-jack, and 1/4" TRS inputs'
    ],
    includedAccessories: [
      'Speaker interconnect link cable (2m)',
      'Pair of angled desktop foam isolation bases',
      '3.5mm to dual RCA audio breakout lead',
      'Power supply cable'
    ],
    powerRequirement: '220V - 240V SA 3-pin plug',
    idealFor: 'Bedroom DJ setups, home recording workstations, podcast broadcast suites'
  },

  // 11. Behringer U-Phoria Audio Interface
  {
    id: 'behringer-uphoria-interface',
    name: 'Behringer U-Phoria 24-Bit/192kHz USB Audio Interface',
    brand: 'Behringer',
    model: 'U-Phoria HD Series (MIDAS Preamps)',
    category: 'interfaces',
    categoryLabel: 'Interfaces & Signal Tools',
    image: behringerUphoriaImg,
    dailyRate: 190,
    weekendRate: 320,
    weeklyRate: 750,
    deposit: 700,
    inStock: true,
    stockCount: 7,
    featured: false,
    popular: true,
    tagline: 'Audiophile 24-bit/192kHz USB audio interface equipped with world-renowned MIDAS preamps',
    description: 'High-resolution 24-bit/192kHz USB audio interface featuring world-class MIDAS-designed microphone preamplifiers with switchable +48V phantom power. Provides direct zero-latency hardware monitoring for pristine vocal tracking and instrument recording on Mac or PC.',
    specs: [
      '2x4 USB 2.0 Audio/MIDI Interface with 24-Bit/192 kHz audiophile resolution',
      '2 State-of-the-art MIDAS-designed mic preamplifiers with +48V phantom power',
      'Combo XLR/TRS inputs for microphones, guitars, and synthesizers',
      'Zero-latency Direct Monitoring switch with Mix Balance control',
      'Dedicated high-output headphone amplifier with independent level control'
    ],
    includedAccessories: [
      'Shielded high-speed USB cable with ferrite choke',
      '2x Balanced 1/4" TRS-to-XLR studio patch cables',
      'Protective neoprene transport sleeve'
    ],
    powerRequirement: 'USB Bus-Powered or external 5V adapter',
    idealFor: 'Vocal tracking in home studios, mobile laptop recording, podcast recording sessions'
  },

  // 12. Steinberg Midex 8
  {
    id: 'steinberg-midex-8',
    name: 'Steinberg Midex 8 8x8 USB Hardware MIDI Interface',
    brand: 'Steinberg',
    model: 'Midex 8 (Linear Time Base)',
    category: 'interfaces',
    categoryLabel: 'Interfaces & Signal Tools',
    image: steinbergMidex8Img,
    dailyRate: 250,
    weekendRate: 420,
    weeklyRate: 990,
    deposit: 900,
    inStock: true,
    stockCount: 3,
    featured: false,
    popular: false,
    tagline: 'Studio-grade 8x8 hardware MIDI interface with sub-millisecond Linear Time Base timing',
    description: 'Professional 8-In / 8-Out rackmount hardware MIDI interface delivering 128 discrete MIDI channels. Features Steinberg’s proprietary Linear Time Base (LTB) protocol that completely eliminates MIDI timing jitter and slop when controlling expansive multi-synth hardware rigs.',
    specs: [
      '8 Independent MIDI Inputs and 8 Independent MIDI Outputs (128 discrete channels)',
      'Linear Time Base (LTB) architecture delivers sample-accurate sub-millisecond timing',
      'Individual front-panel LED activity indicators for every input and output port',
      'High-speed USB connection to DAW software (Cubase, Ableton, FL Studio, Logic)',
      'Standard 19-inch 1U rugged all-metal rackmount chassis'
    ],
    includedAccessories: [
      'Rackmount ears kit installed',
      'High-speed shielded USB connection cable',
      'Set of 8x 5-pin DIN heavy-duty MIDI patch cables (3m each)',
      'Dedicated AC power adapter'
    ],
    powerRequirement: 'USB powered or external 9V DC supply',
    idealFor: 'Multi-hardware synth setups, electronic live sequencers, vintage drum machine rigs'
  },

  // 13. Hybrid DJ Mixer
  {
    id: 'hybrid-dj-mixer-4ch',
    name: 'Hybrid 4-Channel Club Performance DJ Mixer',
    brand: 'Hybrid',
    model: '4-Channel Performance Club Mixer',
    category: 'dj',
    categoryLabel: 'DJ Decks & Mixers',
    image: hybridDjMixerImg,
    dailyRate: 320,
    weekendRate: 540,
    weeklyRate: 1250,
    deposit: 1100,
    inStock: true,
    stockCount: 4,
    featured: true,
    popular: true,
    tagline: 'Rugged 4-channel club and performance DJ mixer with balanced XLR master outputs',
    description: 'Built for demanding club nights, mobile sound setups, and private events. Features 4 multi-source channels, 3-band rotary EQ with full frequency kill, smooth replaceable crossfader, dedicated DJ mic channel with talkover, and balanced XLR master outputs.',
    specs: [
      '4 Channels with switchable Phono / Line inputs for CDJs, media players, and turntables',
      'Balanced XLR and unbalanced RCA Master outputs + dedicated Booth monitor output',
      '3-Band EQ per channel (-26dB to +12dB) with responsive channel gain meters',
      'Dedicated DJ Microphone input with 2-band EQ and automatic talkover function',
      '10-segment dual stereo LED VU meters and smooth replaceable crossfader'
    ],
    includedAccessories: [
      'Heavy-duty aluminium road flightcase',
      'Pair of 5m balanced XLR-to-XLR master signal cables',
      'Dual gold-plated RCA patch leads',
      'IEC locking power cable'
    ],
    powerRequirement: '220V - 240V SA 3-pin plug (Surge-protected)',
    idealFor: 'Gauteng house parties, club DJ booths, festival secondary stages, wedding DJ setups'
  },

  // 14. Keyboard and Tripod (x3 bundles)
  {
    id: 'stands-hardware-bundle',
    name: 'Keyboard and Tripod Stands (x3 Complete Bundles)',
    brand: 'SoundKing / K&M Hardware',
    model: 'Heavy-Duty Double-X & Tripod Bundles (Pack of 3)',
    category: 'hardware',
    categoryLabel: 'Stands & Hardware Bundles',
    image: standsTripodBundleImg,
    dailyRate: 280,
    weekendRate: 470,
    weeklyRate: 1100,
    deposit: 900,
    inStock: true,
    stockCount: 5,
    featured: false,
    popular: true,
    tagline: '3 complete sets of heavy-duty double-X keyboard stands & tripod speaker stands',
    description: 'Commercial hardware bundle containing 3 heavy-duty double-braced X-frame keyboard/synth stands and 3 heavy steel tripod speaker stands with locking safety pins. Engineered to safely hold heavy 88-key stage pianos, synthesizer rigs, and PA speaker cabinets.',
    specs: [
      'Includes 3x Double-X Heavy-Duty Keyboard Stands + 3x Steel Tripod Speaker Stands',
      'Reinforced double-braced steel construction supports up to 60kg per stand',
      'Quick-pull ergonomic clutch mechanism with multiple secure height positions',
      'Tripod speaker stands feature locking safety pins and 35mm universal mounting poles',
      'Non-slip grooved rubber end caps to prevent slippage on smooth stage surfaces'
    ],
    includedAccessories: [
      '3x Heavy-duty zippered nylon stand carry bags with shoulder straps',
      '6x Steel safety locking pins and tether chains',
      'Velcro stage cable routing ties'
    ],
    powerRequirement: 'Passive mechanical stage hardware (No power required)',
    idealFor: 'Live band performances, church conferences, multi-synth studio setups, DJ speaker mounting'
  },

  // 15. Numark NDX500/NDX200 (x2)
  {
    id: 'numark-ndx-pair',
    name: 'Numark NDX500 / NDX200 Dual USB/CD Media Players (Pair)',
    brand: 'Numark',
    model: 'NDX500/NDX200 Media Player Pair (x2)',
    category: 'dj',
    categoryLabel: 'DJ Decks & Mixers',
    image: numarkNdxPlayersImg,
    dailyRate: 380,
    weekendRate: 640,
    weeklyRate: 1500,
    deposit: 1300,
    inStock: true,
    stockCount: 4,
    featured: true,
    popular: true,
    tagline: 'Pair of dual USB and CD media players with touch-sensitive scratch wheels',
    description: 'Matched pair of versatile tabletop DJ media players capable of mixing from USB flash drives, audio CDs, and MP3 CDs, or acting as USB MIDI controllers with DJ software. Equipped with large touch-sensitive jog wheels, Anti-Shock buffer protection, and seamless looping.',
    specs: [
      'Pair of 2x Tabletop Digital Media Players for dual-deck mixing',
      'Plays audio CDs, CD-Rs, MP3 CDs, and tracks directly from USB thumb drives',
      'Large touch-sensitive jog wheels for scratch and pitch bend control',
      '3 Hot Cues, seamless loop with stutter start, and adjustable pitch range (±4, 8, 16%)',
      'Anti-Shock buffered skip-protection technology for reliable club playback'
    ],
    includedAccessories: [
      'Twin-compartment padded road flightcase',
      '2x Stereo RCA-to-RCA audio patch cables',
      '2x IEC power supply cords',
      '2x USB controller cables for laptop DJ software'
    ],
    powerRequirement: '220V - 240V SA 3-pin plug',
    idealFor: 'CD and USB DJs, mobile DJ gigs, backup club players, private birthday events'
  },

  // 16. Pioneer CDJ-350
  {
    id: 'pioneer-cdj-350-deck',
    name: 'Pioneer CDJ-350 Multi-Format Digital Rekordbox DJ Deck',
    brand: 'Pioneer DJ',
    model: 'CDJ-350 Rekordbox Digital Player',
    category: 'dj',
    categoryLabel: 'DJ Decks & Mixers',
    image: pioneerCdj350Img,
    dailyRate: 360,
    weekendRate: 600,
    weeklyRate: 1400,
    deposit: 1200,
    inStock: true,
    stockCount: 5,
    featured: true,
    popular: true,
    tagline: 'Multi-format digital rekordbox DJ deck with BPM lock and beat loop divide',
    description: 'The beloved Pioneer workhorse digital deck that bridges CD, USB, and computer DJing. Features full rekordbox music management support, BPM Lock for master tempo matching, and Beat Loop Divide for creating instant live rolls and remixes.',
    specs: [
      'Multi-Format Playback: USB flash drives, CD, CD-R/RW, AAC, AIFF, MP3, WAV files',
      'BPM Lock function allows matching tempo with a single button press',
      'Display shows beat position, playback progress, and song information',
      'Beat Loop Divide chops rhythm loops into 1/2, 1/4, and 1/8 beat rolls',
      'Operates as a high-fidelity USB audio interface and MIDI controller'
    ],
    includedAccessories: [
      'Original Pioneer road flightcase',
      'AudioQuest gold-plated stereo RCA audio lead',
      'Locking IEC power cord',
      'Pre-formatted 32GB Rekordbox USB drive'
    ],
    powerRequirement: '220V - 240V SA 3-pin plug',
    idealFor: 'Rekordbox prepared DJ sets, Gauteng club performances, bar gigs, private events'
  }
];

export const CURATED_PACKAGES: PackageBundle[] = [
  {
    id: 'electronic-live-synth-lab',
    name: 'The Electronic Live Synth & Sampler Lab',
    badge: 'Electronic & Beatmaker Pick',
    tagline: 'Hands-on sound design rig with Kaoss FX, Volca synths, and Akai controller',
    description: 'The ultimate tactile electronic production and live jamming setup. Combines the Korg Kaossilator, Korg Kaoss Pad KP3 sampler/FX, Korg Volca Keys analog synth, and Akai Max 49 touch fader controller with all link cables and flightcases.',
    image: korgKaossPadImg,
    dailyRate: 980,
    weekendRate: 1680,
    regularValue: 1140,
    savings: 160,
    targetAudience: 'Electronic Producers, Beatmakers, Live Jam Performers, Sound Designers',
    includedItems: [
      '1x Korg Kaoss Pad KP3 Dynamic Effects Processor & Sampler',
      '1x Korg Kaossilator Dynamic Phrase Synthesizer',
      '1x Korg Volca Keys Analogue Loop Synthesizer with Tape Delay',
      '1x Akai Max 49 USB/MIDI/CV Controller with LED Touch Faders',
      'Complete Audio & Sync Interconnect Cable Loom',
      'Gauteng Load-Shedding Surge Protected Powerboard'
    ],
    features: ['Instant Live Looping & FX', 'Analog Polyphonic Warmth', 'Touch Fader Modulation', 'Includes Road Cases']
  },
  {
    id: 'gauteng-club-dj-station',
    name: 'The Gauteng Club & Event DJ Deck Station',
    badge: 'Most Popular for Gigs',
    tagline: 'Complete 3-deck mixing station with Pioneer CDJ, Numark media players & Hybrid mixer',
    description: 'A complete multi-format DJ booth setup ready for private parties, club nights, and lounge events. Featuring the Pioneer CDJ-350, a pair of Numark NDX dual USB/CD players, and the rugged Hybrid 4-channel performance club mixer with balanced XLR master outputs.',
    image: pioneerCdj350Img,
    dailyRate: 920,
    weekendRate: 1580,
    regularValue: 1060,
    savings: 140,
    targetAudience: 'Club DJs, Mobile Event DJs, Party Hosts in Sandton & Pretoria',
    includedItems: [
      '1x Pioneer CDJ-350 Multi-Format Rekordbox Deck',
      '2x Numark NDX500/NDX200 Dual USB/CD Media Players (Pair)',
      '1x Hybrid 4-Channel Club Performance DJ Mixer',
      'Mogami Gold Studio 5m Balanced XLR Master Output Leads',
      'Heavy-Duty Road Flightcases with Cable Loom',
      'Surge Protected 4-Way Power Distribution Board'
    ],
    features: ['USB & CD Multi-Format Playback', 'Rekordbox BPM Lock', '4-Channel Club Mixing with XLR Out', 'Pre-tested Equipment']
  },
  {
    id: 'studio-monitoring-interface-suite',
    name: 'The Studio Monitoring & Tracking Suite',
    badge: 'Recording & Mixing Pick',
    tagline: 'Precision reference monitors, MIDAS preamp interface & heavy stand hardware',
    description: 'Equip your studio or hotel room with surgical acoustic clarity and pristine audio capture. Includes the Yamaha HS8 8-inch active reference monitor (or Pioneer DM-50 active pair), Behringer U-Phoria 24-bit/192kHz interface with MIDAS preamps, and heavy double-X hardware stands.',
    image: pioneerDm50Img,
    dailyRate: 680,
    weekendRate: 1150,
    regularValue: 790,
    savings: 110,
    targetAudience: 'Vocalists, Mixing Engineers, Beatmakers, Content Creators',
    includedItems: [
      '1x Pioneer DM-50 5-Inch Active Monitor Pair (or Yamaha HS8 8" Reference)',
      '1x Behringer U-Phoria 24-Bit/192kHz USB Audio Interface with MIDAS Preamps',
      '1x Heavy-Duty Double-X Stand & Hardware Setup',
      'Acoustic Decoupling Foam Isolation Pads',
      'Balanced Mogami XLR & TRS Interconnect Cables',
      'Surge-Protected Studio Distribution Board'
    ],
    features: ['DSP DJ/Production Sound Modes', '24-Bit/192kHz High Definition Audio', 'Direct Zero-Latency Monitoring', 'Mogami Studio Cables']
  },
  {
    id: 'hardware-synth-sequencing-suite',
    name: 'The Hardware Synth Sequencing & Diagnostic Rig',
    badge: 'Hardware Lab Pick',
    tagline: 'Steinberg 8x8 MIDI interface, Korg Volca FM, Volca Bass & DBBox audio tester',
    description: 'The definitive sonic laboratory for hardware synth enthusiasts who need rock-solid MIDI sequencing and deep analog sound. Combines the Steinberg Midex 8 8x8 LTB interface, Korg Volca FM, Korg Volca Bass, and DBBox audio signal tester.',
    image: steinbergMidex8Img,
    dailyRate: 750,
    weekendRate: 1280,
    regularValue: 870,
    savings: 120,
    targetAudience: 'Hardware Electronic Artists, Sound Engineers, Synth Collectors',
    includedItems: [
      '1x Steinberg Midex 8 8x8 USB Hardware MIDI Interface (Linear Time Base)',
      '1x Korg Volca FM 3-Voice Digital FM Synthesizer (DX7 Compatible)',
      '1x Korg Volca Bass 3-Oscillator Analogue Bass Machine',
      '1x DBBox Studio DI Box & Audio Cable Signal Tester',
      '8x 5-Pin DIN Heavy-Duty MIDI Cables + Audio Patch Leads',
      'Dedicated AC Power Supplies and Flight Bags'
    ],
    features: ['128 Discrete MIDI Channels', 'Sub-Millisecond LTB Timing', 'DX7 Patch Compatibility', 'Built-in Audio Cable Diagnostics']
  }
];

export const FREQUENT_QUESTIONS = [
  {
    q: 'Do you rent equipment outside of Gauteng?',
    a: 'No. Gear Rent Gauteng strictly operates within the Gauteng province (Greater Johannesburg, Pretoria, Centurion, Midrand, Sandton, East Rand, West Rand, and Soweto). This territorial focus guarantees rapid 30 to 55-minute dispatch, same-day delivery, and immediate on-call technical replacement if anything requires assistance on set.'
  },
  {
    q: 'What verification documents are required to hire gear?',
    a: 'For security and insurance compliance under South African rental standards, first-time individual renters provide: (1) A valid South African Green Barcoded ID or Smart ID Card (or valid Passport for international producers), (2) Proof of residential address not older than 3 months (utility bill or bank statement), and (3) A refundable security deposit via card or EFT. Registered South African production companies, broadcasters, and agencies qualify for immediate zero-deposit rental accounts.'
  },
  {
    q: 'How does the refundable security deposit work?',
    a: 'Each gear item has a listed refundable security deposit. When you return the equipment at the end of your rental period and our technicians complete the standard 15-minute functional check at our Wynberg depot or on collection, your deposit is released back into your South African bank account within 12 to 24 hours via EFT.'
  },
  {
    q: 'What about load shedding and power surges in Gauteng?',
    a: 'All our rental equipment is dispatched in heavy-duty flightcases with high-grade surge-protected distribution powerboards. We also offer optional portable LiFePO4 Pure Sine Wave battery backup / UPS power packs that keep your DJ setup or studio session running continuously through stage cuts without a single click or dropout.'
  },
  {
    q: 'Can gear be delivered directly to my venue or recording studio?',
    a: 'Yes! Our dedicated, secure gear logistics vans deliver directly to your studio, club, hotel, or private venue anywhere in Gauteng. Our delivery technician will unpack, test signal paths with you, and ensure you are 100% operational before leaving. Alternatively, you can collect for free from our central Wynberg depot (5 minutes off the M1 Grayston Drive, Sandton).'
  },
  {
    q: 'What are the weekend rental terms?',
    a: 'Our Weekend Special gives you massive value: Pick up or have gear delivered on Friday afternoon (from 14:00), use it all Friday night, Saturday, and Sunday, and return Monday morning before 11:00 AM — while only paying for 1.5 days instead of 3 full days!'
  }
];

export const CUSTOMER_TESTIMONIALS = [
  {
    name: 'Kabelo "Kabz" M.',
    role: 'Amapiano Producer & DJ',
    location: 'Soweto / Sandton',
    quote: 'We had a live session at a Sandton venue and needed a Pioneer CDJ-350 and the Kaoss Pad KP3 for live transitions. Gear Rent delivered everything in pristine flightcases with all cables in 40 minutes flat. Absolute lifesavers.',
    rating: 5
  },
  {
    name: 'Sarah Van Der Merwe',
    role: 'Music Producer & Sound Designer',
    location: 'Rosebank, Johannesburg',
    quote: 'Renting the Korg Volca collection and Steinberg Midex 8 for our 3-day synth camp was effortless. The gear was spotless, calibrated, and the Akai Max 49 touch faders worked like a dream with Ableton. EFT deposit refunded the next morning.',
    rating: 5
  },
  {
    name: 'Thabo Dlamini',
    role: 'Live Event Technical Lead',
    location: 'Menlyn, Pretoria',
    quote: 'The Pioneer DM-50 monitors, Behringer interface, and DBBox tester saved our audio checkout on event day at Time Square Menlyn. Clean sound, zero noise, and transparent pricing in Rands with no surprise charges.',
    rating: 5
  }
];
