# Starfield

A TypeScript library for creating beautiful star field animations using HTML5 Canvas. Perfect for space-themed websites, loading screens, or interactive backgrounds.

## Features

✨ **Beautiful Animations**: Smooth star field with parallax effect
🚀 **Hyperspace Mode**: Press spacebar to enter hyperspace with dramatic visual effects
⏸ **Interactive Controls**: Pause/resume with Escape key
🖱 **Mouse Interaction**: Stars respond to mouse movement (optional)
🎨 **Customizable**: Configure colors, speed, density, and more
📦 **React Component**: Easy integration with React applications

## Installation

```bash
npm install starfield-next
# or
pnpm add starfield-next
# or
yarn add starfield-next
```

## Usage

### Basic Usage

```javascript
import { Starfield } from 'starfield-next';

// Get your canvas element
const canvas = document.getElementById('starfield-canvas');

// Create starfield instance
const starfield = new Starfield(canvas, {
  amount: 1000,          // Number of stars
  speed: 2,              // Animation speed
  color: '#f1e7c0',      // Star color
  backgroundColor: '#20232d', // Background color
  useMouse: true         // Enable mouse interaction
});

// Start the animation
starfield.start();

// Stop the animation
// starfield.stop();
```

### React Component

```jsx
import { Starfield } from 'starfield-next/react';

function MyComponent() {
  return (
    <Starfield
      options={{
        amount: 1500,
        speed: 3,
        color: '#ffffff',
        backgroundColor: '#000000',
        useMouse: true
      }}
      style={{ width: '100%', height: '100vh' }}
    />
  );
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `amount` | number | 2000 | Number of stars to display |
| `speed` | number | 2 | Animation speed (higher = faster) |
| `color` | string/Color | '#f1e7c0' | Star color (CSS color string) |
| `backgroundColor` | string/Color | '#20232d' | Background color |
| `opacity` | number | 0.8 | Background opacity (0-1) |
| `spread` | number | 256 | Star spread/density |
| `fps` | number | 30 | Animation frames per second |
| `useMouse` | boolean | false | Enable mouse interaction |
| `useArrowKeys` | boolean | false | Enable arrow key navigation |
| `showDebug` | boolean | false | Show debug information |
| `color_ratio` | number | 5 | Color variation ratio |

## Keyboard Controls

- **Escape**: Toggle pause/resume
- **Space**: Enter/Exit hyperspace mode
- **Arrow Keys**: Navigation (when `useArrowKeys` is enabled)

## Development

### Prerequisites

- Node.js 22+
- pnpm (recommended)

### Setup

```bash
pnpm install
```

### Scripts

- `pnpm build`: Build the library
- `pnpm test`: Run tests
- `pnpm storybook`: Start Storybook development server
- `pnpm lint`: Run ESLint
- `pnpm lint:fix`: Fix ESLint issues

### Running Tests

```bash
pnpm test
```

### Storybook

```bash
pnpm storybook
```

Then open http://localhost:6006 to see the component in action.

## Examples

### Fullscreen Starfield

```jsx
import { Starfield } from 'starfield-next/react';

function FullscreenStarfield() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
      <Starfield 
        options={{ amount: 3000, speed: 4 }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
```

### Custom Colors

```javascript
const starfield = new Starfield(canvas, {
  color: '#4fc3f7',           // Light blue stars
  backgroundColor: '#0d47a1', // Dark blue background
  amount: 2500
});
```

## Browser Support

The library uses modern JavaScript features and requires browsers that support:
- ES6 Modules
- HTML5 Canvas
- CSS Variables

## License

ISC © Jury Giannelli

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Credits

Created by [Jury Giannelli](https://github.com/iX315)

## Changelog

See the [releases page](https://github.com/iX315/starfield/releases) for version history.
