# Alphabet App

A small React + TypeScript + Vite app that shows the Swedish alphabet with images and audio for each letter.

## Features

- Grid of cards for each Swedish letter with image and name
- Plays pronunciation audio from external URLs
- Cards flip to reveal the letter face
- Simple panel navigation
- Loading animation component with gooey dots effect
- Highlights vowels with special styling

## Tech Stack

- React 19
- TypeScript
- Vite 7
- React Router
- ESLint

## Project Structure

```
src/
  App.tsx            - Main app layout and routes
  main.tsx           - Entry point
  components/        - React components
  data/             - Alphabet data JSON
  styles/           - CSS styles
  assets/           - Static assets
public/             - Public assets
  images-alphabet/  - Letter images
```

## Development

Requirements:

- Node.js (16+ recommended)
- npm

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Contributing

- Add new images to public/images-alphabet
- Update alphabet data in src/data/swedishAlphabet.json with new entries
- Follow ESLint rules and TypeScript types
- Keep components focused and reusable
- Maintain consistent styling

## License

No license specified
