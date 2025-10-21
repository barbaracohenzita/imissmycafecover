// Audio context and sound management
class CafeAmbience {
    constructor() {
        this.isPlaying = false;
        this.audioContext = null;
        this.sounds = {};
        this.gainNodes = {};
        this.masterGainNode = null;

        // Sound sources - these can be replaced with actual audio file URLs
        this.soundSources = {
            coffee: 'sounds/coffee-machine.mp3',
            chatter: 'sounds/chatter.mp3',
            dishes: 'sounds/dishes.mp3',
            music: 'sounds/background-music.mp3',
            rain: 'sounds/rain.mp3',
            fireplace: 'sounds/fireplace.mp3'
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createAudioContext();
    }

    createAudioContext() {
        // Create audio context on user interaction (browser requirement)
        const createContext = () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.masterGainNode = this.audioContext.createGain();
                this.masterGainNode.connect(this.audioContext.destination);
                this.masterGainNode.gain.value = 0.7; // Default master volume
            }
        };

        document.addEventListener('click', createContext, { once: true });
    }

    setupEventListeners() {
        // Play/Pause button
        const playPauseBtn = document.getElementById('playPauseBtn');
        playPauseBtn.addEventListener('click', () => this.togglePlayPause());

        // Master volume
        const masterVolume = document.getElementById('masterVolume');
        masterVolume.addEventListener('input', (e) => this.updateMasterVolume(e.target.value));

        // Individual sound volume sliders
        const volumeSliders = document.querySelectorAll('.sound-control .volume-slider');
        volumeSliders.forEach(slider => {
            slider.addEventListener('input', (e) => {
                const soundId = e.target.id.replace('Volume', '');
                const value = e.target.value;
                this.updateVolume(soundId, value);
                // Update display value
                const valueDisplay = e.target.nextElementSibling;
                if (valueDisplay && valueDisplay.classList.contains('volume-value')) {
                    valueDisplay.textContent = `${value}%`;
                }
            });
        });

        // Master volume display update
        masterVolume.addEventListener('input', (e) => {
            const valueDisplay = document.querySelector('.master-volume .volume-value');
            if (valueDisplay) {
                valueDisplay.textContent = `${e.target.value}%`;
            }
        });

        // Preset buttons
        const presetBtns = document.querySelectorAll('.preset-btn');
        presetBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.target.dataset.preset;
                this.loadPreset(preset);
            });
        });
    }

    async togglePlayPause() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGainNode = this.audioContext.createGain();
            this.masterGainNode.connect(this.audioContext.destination);
            this.masterGainNode.gain.value = document.getElementById('masterVolume').value / 100;
        }

        if (this.isPlaying) {
            this.pause();
        } else {
            await this.play();
        }
    }

    async play() {
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');

        try {
            // Resume audio context if suspended
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            // Load and play all sounds if not already loaded
            if (Object.keys(this.sounds).length === 0) {
                await this.loadSounds();
            }

            // Start all sound sources
            Object.keys(this.sounds).forEach(soundId => {
                if (!this.sounds[soundId].source || !this.sounds[soundId].source.context) {
                    this.createAndStartSource(soundId);
                }
            });

            this.isPlaying = true;
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        } catch (error) {
            console.warn('Audio playback uses generated tones. Add audio files to the sounds/ folder for real cafe sounds.');
            // Fallback: create simple oscillator tones as placeholders
            this.createPlaceholderSounds();
            this.isPlaying = true;
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        }
    }

    pause() {
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');

        if (this.audioContext) {
            this.audioContext.suspend();
        }

        this.isPlaying = false;
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }

    async loadSounds() {
        // Try to load real audio files, fall back to placeholder if not available
        const soundKeys = Object.keys(this.soundSources);

        for (const soundId of soundKeys) {
            try {
                const response = await fetch(this.soundSources[soundId]);
                if (!response.ok) throw new Error('Audio file not found');

                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

                this.sounds[soundId] = { buffer: audioBuffer };
                this.createGainNode(soundId);
            } catch (error) {
                console.log(`Could not load ${soundId} audio file, using placeholder`);
            }
        }

        // If no sounds loaded, throw error to trigger placeholder sounds
        if (Object.keys(this.sounds).length === 0) {
            throw new Error('No audio files available');
        }
    }

    createGainNode(soundId) {
        const gainNode = this.audioContext.createGain();
        gainNode.connect(this.masterGainNode);

        // Set initial volume from slider
        const slider = document.getElementById(`${soundId}Volume`);
        if (slider) {
            gainNode.gain.value = slider.value / 100;
        }

        this.gainNodes[soundId] = gainNode;
    }

    createAndStartSource(soundId) {
        if (!this.sounds[soundId] || !this.sounds[soundId].buffer) return;

        const source = this.audioContext.createBufferSource();
        source.buffer = this.sounds[soundId].buffer;
        source.loop = true;
        source.connect(this.gainNodes[soundId]);
        source.start(0);

        this.sounds[soundId].source = source;
    }

    createPlaceholderSounds() {
        // Create simple oscillator-based placeholder sounds
        const soundConfigs = {
            coffee: { type: 'brown', frequency: 150 },
            chatter: { type: 'pink', frequency: 300 },
            dishes: { type: 'white', frequency: 800 },
            music: { type: 'sine', frequency: 220 },
            rain: { type: 'white', frequency: 500 },
            fireplace: { type: 'brown', frequency: 100 }
        };

        Object.keys(soundConfigs).forEach(soundId => {
            this.createPlaceholderSound(soundId, soundConfigs[soundId]);
        });
    }

    createPlaceholderSound(soundId, config) {
        // Create a simple noise generator as placeholder
        const gainNode = this.audioContext.createGain();
        gainNode.connect(this.masterGainNode);

        const slider = document.getElementById(`${soundId}Volume`);
        gainNode.gain.value = slider ? slider.value / 100 : 0.5;

        this.gainNodes[soundId] = gainNode;

        // Create white/pink/brown noise using buffer
        const bufferSize = 2 * this.audioContext.sampleRate;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        if (config.type === 'white') {
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
        } else if (config.type === 'pink') {
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                output[i] *= 0.11;
                b6 = white * 0.115926;
            }
        } else { // brown noise
            let lastOut = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                output[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = output[i];
                output[i] *= 3.5;
            }
        }

        const noise = this.audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        noise.connect(gainNode);
        noise.start(0);

        this.sounds[soundId] = { source: noise, buffer: noiseBuffer };
    }

    updateMasterVolume(value) {
        if (this.masterGainNode) {
            this.masterGainNode.gain.value = value / 100;
        }
    }

    updateVolume(soundId, value) {
        if (this.gainNodes[soundId]) {
            this.gainNodes[soundId].gain.value = value / 100;
        }
    }

    loadPreset(presetName) {
        const presets = {
            morning: {
                coffee: 70,
                chatter: 60,
                dishes: 50,
                music: 30,
                rain: 0,
                fireplace: 0
            },
            afternoon: {
                coffee: 40,
                chatter: 30,
                dishes: 25,
                music: 40,
                rain: 0,
                fireplace: 0
            },
            rainy: {
                coffee: 50,
                chatter: 35,
                dishes: 30,
                music: 45,
                rain: 60,
                fireplace: 0
            },
            cozy: {
                coffee: 30,
                chatter: 20,
                dishes: 15,
                music: 50,
                rain: 0,
                fireplace: 65
            }
        };

        const preset = presets[presetName];
        if (!preset) return;

        Object.keys(preset).forEach(soundId => {
            const slider = document.getElementById(`${soundId}Volume`);
            if (slider) {
                slider.value = preset[soundId];
                // Trigger input event to update volume and display
                slider.dispatchEvent(new Event('input'));
            }
        });
    }
}

// Initialize the cafe ambience when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CafeAmbience();
});
