# I Miss My Cafe

A web-based ambient cafe sound generator that recreates the cozy atmosphere of your favorite coffee shop. Perfect for working, studying, or relaxing at home.

## Features

- **Multiple Sound Channels**: Mix and match different ambient sounds
  - Coffee Machine - The comforting hum and hiss of espresso machines
  - Chatter - Gentle background conversation
  - Cups & Dishes - The clinking of cups and cutlery
  - Background Music - Soft instrumental music
  - Rain - Soothing rain sounds
  - Fireplace - Crackling fire ambience

- **Individual Volume Controls**: Customize each sound to your preference
- **Master Volume**: Control overall volume with a single slider
- **Preset Scenes**: Quick-load popular ambience combinations
  - Morning Rush - Busy cafe atmosphere
  - Quiet Afternoon - Calm and peaceful
  - Rainy Day - Rain mixed with cafe sounds
  - Cozy Evening - Fireplace and soft music

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **No Registration**: Start using immediately, no account needed

## Getting Started

### Option 1: Use Placeholder Sounds (Quick Start)

Simply open `index.html` in your web browser. The app will generate placeholder ambient sounds so you can test the functionality immediately.

### Option 2: Add Real Audio Files (Best Experience)

For the authentic cafe experience, add your own audio files:

1. Create the following audio files (MP3 format recommended):
   - `sounds/coffee-machine.mp3`
   - `sounds/chatter.mp3`
   - `sounds/dishes.mp3`
   - `sounds/background-music.mp3`
   - `sounds/rain.mp3`
   - `sounds/fireplace.mp3`

2. Open `index.html` in your web browser

3. Click the play button and adjust volumes to your liking

### Where to Find Audio Files

You can find free ambient sounds from:
- [Freesound.org](https://freesound.org) - Creative Commons audio library
- [YouTube Audio Library](https://www.youtube.com/audiolibrary) - Free music and sound effects
- [BBC Sound Effects](https://sound-effects.bbcrewind.co.uk/) - Free sound effects
- [Zapsplat](https://www.zapsplat.com/) - Free sound effects

Search for terms like:
- "cafe ambience"
- "coffee shop sounds"
- "espresso machine"
- "restaurant chatter"
- "dishes clinking"
- "rain sounds"
- "fireplace crackling"

**Important**: Make sure the audio files are loopable (seamless loops) for the best experience.

## Usage

1. **Play/Pause**: Click the circular play button to start or stop all sounds
2. **Adjust Individual Sounds**: Use the sliders for each sound type to find your perfect mix
3. **Master Volume**: Control overall volume with the master slider
4. **Try Presets**: Click preset buttons to quickly load popular sound combinations
5. **Create Your Own Mix**: Experiment with different volume combinations to create your ideal ambience

## Technical Details

- Built with vanilla JavaScript (no dependencies)
- Uses Web Audio API for high-quality audio mixing
- Responsive CSS Grid layout
- Modern browser required (Chrome, Firefox, Safari, Edge)

## Browser Compatibility

- Chrome 34+
- Firefox 25+
- Safari 9+
- Edge 12+

## Local Development

No build process required! Simply:

1. Clone or download this repository
2. Add audio files to the `sounds/` directory (optional)
3. Open `index.html` in your browser

## File Structure

```
imissmycafecover/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript for audio control
├── sounds/             # Audio files directory
│   ├── coffee-machine.mp3
│   ├── chatter.mp3
│   ├── dishes.mp3
│   ├── background-music.mp3
│   ├── rain.mp3
│   └── fireplace.mp3
└── README.md           # This file
```

## Customization

### Adding New Sounds

To add new sound types:

1. Edit `index.html` to add a new sound control section
2. Update `script.js` to include the new sound in the `soundSources` object
3. Add the audio file to the `sounds/` directory
4. Update presets if desired

### Changing Colors

Edit the gradient colors in `styles.css`:
- Background gradient: `.body` selector
- Button colors: `.play-button` and `.preset-btn` selectors
- Slider colors: `.volume-slider` selectors

## Tips for Best Experience

- Use headphones for immersive sound
- Start with a preset and adjust from there
- Loop audio files should be at least 2-3 minutes long
- Mix audio at different volumes for depth
- Adjust master volume to comfortable levels

## License

This project is open source and available for personal and commercial use.

## Credits

Inspired by [imissmycafe.com](https://imissmycafe.com) - bringing the cafe experience to remote workers everywhere.

## Support

For issues or suggestions, please open an issue on the repository.

---

Enjoy your virtual cafe experience!
