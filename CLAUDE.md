# CLAUDE.md - AI Assistant Development Guide

## Project Overview

**I Miss My Cafe** is a web-based ambient cafe sound generator that recreates the cozy atmosphere of a coffee shop. It's a single-page application built with vanilla JavaScript, HTML, and CSS with no build tools or dependencies.

### Purpose
- Provide ambient cafe sounds for remote workers, students, and anyone who misses the cafe atmosphere
- Mix multiple sound channels (coffee machine, chatter, dishes, music, rain, fireplace)
- Offer preset scenes for quick ambience setup
- Work entirely in the browser with Web Audio API

### Key Features
- 6 individual sound channels with volume controls
- Master volume control
- 4 preset scenes (Morning Rush, Quiet Afternoon, Rainy Day, Cozy Evening)
- Fallback to generated placeholder sounds when audio files are unavailable
- Fully responsive design
- No build process or dependencies

---

## Codebase Structure

```
imissmycafecover/
├── index.html          # Main HTML file (single-page application)
├── styles.css          # All styles (dark cafe aesthetic theme)
├── script.js           # Audio management and UI logic
├── sounds/             # Audio files directory (currently empty)
│   └── .gitkeep
├── README.md           # User-facing documentation
└── CLAUDE.md          # This file - AI assistant guide
```

### File Purposes

**index.html (110 lines)**
- Single-page application structure
- Contains all UI elements: play button, volume sliders, preset buttons
- No external dependencies
- Semantic HTML with accessibility in mind
- References: script.js, styles.css

**styles.css (308 lines)**
- Dark theme with warm coffee/cafe color palette
- CSS custom properties for coffee tones (#d4a574, #b88a5a, #c89b66)
- Responsive grid layout
- Mobile-first media queries (@media max-width: 768px)
- Glassmorphism effects (backdrop-filter, rgba backgrounds)

**script.js (331 lines)**
- Single class: `CafeAmbience`
- Web Audio API integration
- Sound management and mixing
- UI event handling
- Preset system
- Fallback noise generation

**sounds/ directory**
- Expected audio files (6 total):
  - coffee-machine.mp3
  - chatter.mp3
  - dishes.mp3
  - background-music.mp3
  - rain.mp3
  - fireplace.mp3
- Currently contains only .gitkeep (no actual audio files)
- App generates placeholder sounds if files are missing

---

## Technology Stack

### Core Technologies
- **HTML5**: Semantic markup, audio integration
- **CSS3**: Grid, Flexbox, gradients, transforms, backdrop-filter
- **Vanilla JavaScript (ES6+)**: Classes, async/await, arrow functions
- **Web Audio API**: Audio context, gain nodes, buffer sources

### Browser APIs Used
1. **Web Audio API**
   - `AudioContext` / `webkitAudioContext`
   - `GainNode` for volume control
   - `AudioBufferSourceNode` for playback
   - `createBuffer()` for noise generation

2. **Fetch API**
   - Loading audio files from sounds/ directory
   - Error handling for missing files

3. **DOM APIs**
   - Event listeners (click, input)
   - Query selectors
   - Class manipulation

### No Dependencies
- No npm, webpack, or build tools
- No frameworks (React, Vue, etc.)
- No libraries (jQuery, etc.)
- Pure browser-native code

---

## Architecture and Design Patterns

### Class-Based Architecture

**CafeAmbience Class** (script.js:2-325)
- Single responsibility: Manage all audio and UI interactions
- Instantiated once on DOMContentLoaded
- Encapsulates all state and behavior

```javascript
class CafeAmbience {
    constructor() {
        this.isPlaying = false;           // Playback state
        this.audioContext = null;         // Web Audio context
        this.sounds = {};                 // Audio buffers/sources
        this.gainNodes = {};              // Per-sound volume controls
        this.masterGainNode = null;       // Master volume control
        this.soundSources = {...};        // File paths mapping
    }
}
```

### Audio Architecture

**Signal Flow**
```
Audio Files → BufferSource → GainNode → MasterGainNode → AudioContext.destination
                              (per-sound)   (global)         (speakers)
```

**Node Graph Structure**
- Each sound has its own GainNode for individual volume control
- All GainNodes connect to a single MasterGainNode
- MasterGainNode connects to AudioContext destination (speakers)
- Allows independent and global volume control

### Key Design Patterns

1. **Lazy Initialization**
   - AudioContext created on first user interaction (browser requirement)
   - Sounds loaded only when play button is clicked
   - Prevents autoplay policy violations

2. **Graceful Degradation**
   - Tries to load real audio files first
   - Falls back to generated noise if files missing
   - Never blocks user interaction

3. **Event-Driven Architecture**
   - UI events trigger audio changes
   - Slider inputs update volumes in real-time
   - Presets dispatch input events to sliders

4. **State Management**
   - Simple boolean flag for play/pause state
   - Audio state maintained in Web Audio graph
   - UI state reflected in DOM classes

---

## Development Workflows

### Local Development

**Starting the App**
```bash
# Option 1: Direct file access
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux

# Option 2: Simple HTTP server (recommended for testing audio files)
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

**No Build Process**
- Edit files directly
- Refresh browser to see changes
- No compilation or transpilation needed
- No package.json or node_modules

### Git Workflow

**Current Branch**
- Development branch: `claude/claude-md-mi6ezoy3hrlkdgcy-01Y6sh82oB9syZmpf13dGL3K`
- Always develop on this branch
- Push to this branch when complete

**Commit History**
```
bae109d - Redesign with warm cafe aesthetic - dark theme with coffee tones
95234ea - Create I Miss My Cafe clone - ambient cafe sound web app
```

**Commit Message Style**
- Descriptive, present tense
- Focus on the "what" and "why"
- Examples: "Add rain sound control", "Fix volume slider styling"

### Testing Approach

**Manual Testing Required**
- No automated tests currently
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test responsive design at different screen sizes
- Test with and without audio files present

**Key Test Scenarios**
1. Play/pause functionality
2. Volume controls (individual and master)
3. Preset buttons
4. Audio fallback when files missing
5. Mobile responsiveness
6. Browser audio policy compliance

---

## Key Conventions

### Code Style

**JavaScript**
- ES6+ class syntax
- Camelcase for variables and methods
- Async/await for asynchronous operations
- Arrow functions for callbacks
- Template literals for strings
- Descriptive variable names

**CSS**
- BEM-like naming (e.g., `.sound-control`, `.sound-header`)
- Mobile-first approach
- Logical property grouping in selectors
- Comments for major sections

**HTML**
- Semantic elements (header, main, footer)
- Descriptive IDs and classes
- SVG for icons (inline)
- Data attributes for configuration (data-sound, data-preset)

### Naming Conventions

**IDs**
- Descriptive, camelCase
- Examples: `playPauseBtn`, `masterVolume`, `coffeeVolume`

**Classes**
- Kebab-case
- Component-based naming
- Examples: `.play-button`, `.sound-control`, `.preset-btn`

**JavaScript Variables**
- CamelCase for most variables
- Uppercase for constants (if any added)
- Descriptive names over short abbreviations

### File Organization

**HTML Structure**
1. Header (title, subtitle)
2. Master controls (play button, master volume)
3. Sound controls (6 individual sound sliders)
4. Presets section
5. Footer (informational text)

**CSS Structure**
1. Reset/base styles
2. Layout (container, grid)
3. Typography
4. Components (buttons, sliders)
5. Media queries

**JavaScript Structure**
1. Class definition
2. Constructor and initialization
3. Event setup
4. Audio methods
5. UI update methods
6. Preset methods
7. Initialization code

---

## Audio System Details

### Web Audio API Usage

**AudioContext Setup** (script.js:28-40)
- Created on user interaction (browser requirement)
- Single context for entire application
- Supports both standard and webkit prefixed versions

**Sound Loading Process** (script.js:147-170)
1. Fetch audio file from sounds/ directory
2. Convert response to ArrayBuffer
3. Decode audio data to AudioBuffer
4. Store in this.sounds object
5. Create associated GainNode
6. Fall back to placeholder if any step fails

**Playback System** (script.js:185-195)
- Uses BufferSourceNode for each sound
- Loop enabled for continuous playback
- Connected through gain nodes for volume control
- Sources recreated if stopped (BufferSource is one-shot)

### Placeholder Sound Generation

**When Activated** (script.js:197-263)
- Triggered when audio files can't be loaded
- Creates noise-based sounds as substitutes
- Uses algorithmic noise generation (white, pink, brown)

**Noise Types**
- **White Noise**: Random values, full frequency spectrum (dishes, rain)
- **Pink Noise**: 1/f noise, more natural sounding (chatter)
- **Brown Noise**: 1/f² noise, deeper rumble (coffee, fireplace)
- **Sine Waves**: Pure tone for music placeholder

**Frequency Mapping** (script.js:199-206)
```javascript
coffee: { type: 'brown', frequency: 150 }      // Low rumble
chatter: { type: 'pink', frequency: 300 }      // Mid-range chatter
dishes: { type: 'white', frequency: 800 }      // High clinks
music: { type: 'sine', frequency: 220 }        // Musical tone
rain: { type: 'white', frequency: 500 }        // White noise
fireplace: { type: 'brown', frequency: 100 }   // Deep crackle
```

### Volume Control System

**Two-Level Volume** (script.js:265-275)
1. **Individual Volume**: Each sound has its own GainNode (0-100%)
2. **Master Volume**: Single GainNode affects all sounds (0-100%)

**Volume Calculation**
```
Final Volume = (Individual Volume / 100) * (Master Volume / 100)
```

**UI Synchronization** (script.js:52-72)
- Slider input events update both audio and display
- Real-time updates without clicking play
- Percentage display next to each slider

### Preset System

**Presets Defined** (script.js:277-311)
```javascript
morning: {coffee: 70, chatter: 60, dishes: 50, music: 30, rain: 0, fireplace: 0}
afternoon: {coffee: 40, chatter: 30, dishes: 25, music: 40, rain: 0, fireplace: 0}
rainy: {coffee: 50, chatter: 35, dishes: 30, music: 45, rain: 60, fireplace: 0}
cozy: {coffee: 30, chatter: 20, dishes: 15, music: 50, rain: 0, fireplace: 65}
```

**Preset Loading** (script.js:316-324)
1. Get preset configuration object
2. Update each slider value
3. Dispatch 'input' event to trigger volume update
4. Updates both audio and UI display

---

## UI/UX Patterns

### Design System

**Color Palette**
```css
Primary (Coffee Gold): #d4a574
Secondary (Coffee Brown): #b88a5a
Tertiary (Coffee Light): #c89b66
Background Dark: #1a1a1a - #2d2420
Text Light: #e8e6e3
Text Muted: #a89f96
Text Subtle: #7a7269
```

**Typography**
- System font stack: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue
- Base size: 16px (implicit)
- Heading (h1): 2.8rem (2rem on mobile)
- Subtitle: 1.05rem
- Labels: 0.95rem, uppercase, letter-spacing

**Spacing System**
- Small: 10-12px
- Medium: 18-24px
- Large: 28-35px
- Extra Large: 40-50px

### Component Patterns

**Play Button** (styles.css:69-103)
- Circular, 70px diameter
- Gradient background (coffee tones)
- SVG icon swap on play/pause
- Hover: scale(1.08), enhanced shadow
- Active: scale(0.98) for tactile feedback

**Volume Sliders** (styles.css:162-216)
- Custom styled range inputs
- Coffee-gold gradient thumb
- Hover: scale(1.15) on thumb
- Percentage display updates in real-time
- Works on both -webkit and -moz browsers

**Sound Control Cards** (styles.css:128-161)
- Semi-transparent dark background
- Coffee-tone border (subtle)
- Hover: translateY(-3px), enhanced border, shadow
- Contains emoji icon, title, slider, percentage

**Preset Buttons** (styles.css:241-264)
- Grid layout, responsive columns
- Dark background with coffee border
- Hover: gradient fill, color inversion, lift effect
- Emoji prefix for visual identity

### Responsive Design

**Breakpoint: 768px** (styles.css:286-307)

**Mobile Changes**
- Reduced container padding (50px → 25px)
- Smaller heading (2.8rem → 2rem)
- Master controls: column layout instead of row
- Sound controls: single column grid
- Preset buttons: single column grid

**Mobile-First Approach**
- Base styles work on small screens
- Enhancements for larger screens
- Touch-friendly button sizes
- Flexible layouts with CSS Grid

### Accessibility Considerations

**Current Implementation**
- Semantic HTML elements
- Label elements for inputs
- Visual feedback on interactions
- Keyboard accessible controls (native inputs/buttons)

**Areas for Improvement**
- ARIA labels for sliders
- Screen reader announcements for presets
- Focus indicators for keyboard navigation
- Reduced motion support

---

## Common Tasks and Operations

### Adding a New Sound

**1. Update HTML** (index.html)
```html
<div class="sound-control">
    <div class="sound-header">
        <span class="sound-icon">🎹</span>
        <h3>Piano</h3>
    </div>
    <input type="range" class="volume-slider" id="pianoVolume"
           min="0" max="100" value="0" data-sound="piano">
    <span class="volume-value">0%</span>
</div>
```

**2. Update JavaScript** (script.js:11-18)
```javascript
this.soundSources = {
    // ... existing sounds
    piano: 'sounds/piano.mp3'  // Add new sound
};
```

**3. Add Audio File**
- Place piano.mp3 in sounds/ directory
- Ensure it's a loopable audio file
- MP3 format recommended for compatibility

**4. Update Presets** (optional, script.js:278-311)
```javascript
morning: {
    // ... existing volumes
    piano: 20  // Add to preset
}
```

### Modifying Color Scheme

**1. Background Gradient** (styles.css:7-20)
```css
body {
    background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
    /* Update radial gradients too */
}
```

**2. Primary Accent Color** (styles.css)
- Search for: #d4a574 (current coffee gold)
- Replace with your color across:
  - h1 gradient
  - Button backgrounds
  - Slider thumbs
  - Border colors
  - Text colors

**3. Container Background** (styles.css:22-33)
```css
.container {
    background: rgba(YOUR_R, YOUR_G, YOUR_B, 0.85);
}
```

### Adjusting Default Volumes

**1. HTML Slider Values** (index.html)
```html
<input type="range" id="coffeeVolume" value="50">  <!-- Change default -->
```

**2. Volume Display Text** (index.html)
```html
<span class="volume-value">50%</span>  <!-- Match slider value -->
```

**3. Master Volume Default** (script.js:35, 89)
```javascript
this.masterGainNode.gain.value = 0.7;  // 0.0 to 1.0 (70%)
```

### Debugging Audio Issues

**1. Check AudioContext State**
```javascript
console.log(this.audioContext.state);  // Should be "running"
```

**2. Verify Audio Files Load**
- Open browser DevTools → Network tab
- Click play button
- Check for 404 errors on sounds/*.mp3

**3. Test Gain Node Values**
```javascript
console.log(this.masterGainNode.gain.value);
console.log(this.gainNodes.coffee.gain.value);
```

**4. Browser Autoplay Policy**
- AudioContext must be created/resumed on user gesture
- Check console for autoplay warnings
- Code already handles this properly (script.js:29-40)

### Adding New Presets

**1. Define Preset** (script.js:278-311)
```javascript
const presets = {
    // ... existing presets
    custom: {
        coffee: 60,
        chatter: 40,
        dishes: 20,
        music: 50,
        rain: 30,
        fireplace: 0
    }
};
```

**2. Add Preset Button** (index.html:90-98)
```html
<button class="preset-btn" data-preset="custom">✨ Custom Name</button>
```

**3. Style** (optional)
- Preset buttons automatically inherit styles
- Add custom emoji for visual identity

---

## Testing and Debugging

### Browser Testing Checklist

**Functionality Tests**
- [ ] Play button starts/stops audio
- [ ] Master volume affects all sounds
- [ ] Individual volumes work independently
- [ ] Preset buttons load correct volumes
- [ ] Audio fallback works (without files)
- [ ] Volume displays update in real-time

**Browser Compatibility Tests**
- [ ] Chrome 34+ (Web Audio API support)
- [ ] Firefox 25+
- [ ] Safari 9+
- [ ] Edge 12+
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**Responsive Design Tests**
- [ ] Desktop (1920px+)
- [ ] Laptop (1366px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)
- [ ] Large mobile (414px)

### Common Issues and Solutions

**Issue: No sound plays**
- Check browser autoplay policy compliance
- Verify AudioContext state is "running"
- Check if gain values are > 0
- Verify audio files exist and are accessible
- Check browser console for errors

**Issue: Audio files 404**
- Verify files are in sounds/ directory
- Check file names match exactly (case-sensitive)
- Ensure web server is running (for local files)
- Check CORS if serving from different domain

**Issue: Choppy or glitchy audio**
- Check if audio files are too large
- Verify system resources available
- Test in different browser
- Check if other tabs are using audio

**Issue: Sliders don't update audio**
- Verify AudioContext is created
- Check event listeners are attached
- Verify gainNodes exist for each sound
- Check console for JavaScript errors

### Debug Mode

**Add Debug Logging**
```javascript
// In relevant methods, add:
console.log('Sound loaded:', soundId, this.sounds[soundId]);
console.log('Volume updated:', soundId, value);
console.log('Preset loaded:', presetName, preset);
```

**Inspect Audio Graph**
```javascript
// In browser console:
window.cafeAmbience = new CafeAmbience();  // Make accessible
console.log(window.cafeAmbience.sounds);
console.log(window.cafeAmbience.gainNodes);
```

---

## Project Context

### Inspiration
- Inspired by [imissmycafe.com](https://imissmycafe.com)
- Addresses remote worker needs during pandemic/post-pandemic era
- Recreates social atmosphere of cafes for focus and productivity

### Use Cases
- Remote work background ambience
- Study sessions requiring cafe atmosphere
- Relaxation and meditation
- Podcast/video background audio
- Creative work inspiration

### Design Philosophy
- Simplicity over features
- No barriers to entry (no login, no installation)
- Privacy-first (no tracking, no data collection)
- Accessible and free
- Works offline (once loaded)

---

## AI Assistant Guidelines

### When Making Changes

**Always Consider**
1. **Browser Compatibility**: Test Web Audio API features
2. **Mobile Experience**: Check responsive layouts
3. **Audio Policy**: Maintain user-gesture requirement
4. **Fallback Behavior**: Preserve placeholder sound generation
5. **Performance**: Avoid blocking main thread
6. **Accessibility**: Maintain semantic HTML

### Best Practices

**DO**
- Test changes in multiple browsers
- Preserve the simple, no-build architecture
- Maintain the warm, cafe aesthetic theme
- Keep code readable and well-commented
- Update this CLAUDE.md file when adding features

**DON'T**
- Add build tools or dependencies without discussion
- Break the audio fallback system
- Remove responsive design features
- Add tracking or analytics without consent
- Ignore browser autoplay policies

### Code Review Checklist

Before committing changes:
- [ ] Code follows existing style conventions
- [ ] No console.log statements left in production code
- [ ] Responsive design tested at multiple breakpoints
- [ ] Audio functionality tested with and without files
- [ ] No new dependencies added
- [ ] Comments added for complex logic
- [ ] CLAUDE.md updated if architecture changed

---

## Future Enhancement Ideas

### Potential Features
- Custom sound upload functionality
- Save/load user presets in localStorage
- Visual audio analyzer/equalizer
- Timer/pomodoro integration
- Dark/light theme toggle
- Keyboard shortcuts for controls
- Sound fade in/out transitions
- Spatial audio effects
- Sleep timer functionality

### Technical Improvements
- Service Worker for offline support
- Audio compression optimization
- Lazy loading for audio files
- Better error handling UI
- Accessibility improvements (ARIA labels)
- Performance monitoring
- Unit tests for audio logic

### Maintenance Tasks
- Add LICENSE file
- Create CONTRIBUTING.md
- Add issue templates
- Set up GitHub Pages deployment
- Add social preview image
- Create demo video/GIF

---

## Contact and Support

**Repository**: barbaracohenzita/imissmycafecover
**Current Branch**: claude/claude-md-mi6ezoy3hrlkdgcy-01Y6sh82oB9syZmpf13dGL3K

For issues or questions:
1. Check this CLAUDE.md for guidance
2. Review README.md for user documentation
3. Inspect browser console for errors
4. Create GitHub issue with detailed information

---

## Version History

### Current State (2025-11-19)
- Dark cafe aesthetic theme implemented
- 6 sound channels with individual controls
- 4 preset scenes
- Fallback placeholder sound generation
- Fully responsive design
- No external dependencies

### Recent Changes
- `bae109d`: Redesign with warm cafe aesthetic - dark theme with coffee tones
- `95234ea`: Create I Miss My Cafe clone - ambient cafe sound web app

---

**Last Updated**: 2025-11-19
**Document Version**: 1.0.0
**AI Assistant**: This document is maintained for AI assistants working on this project. Keep it updated as the codebase evolves.
