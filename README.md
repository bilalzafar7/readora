## Readora

Readora is a React Native app to search books using the Google Books API and browse results with infinite scrolling. Tap any book to open a details page featuring a clean image loader and rating display.

### Features
- Live search with 500ms debounce
- Infinite scroll pagination on results
- Book details view with cover, rating stars, and overview
- Robust error handling for API calls
- Consistent theming with react-native-paper
- Icons via react-native-vector-icons (MaterialCommunityIcons)

### Tech Stack
- React Native 0.84
- TypeScript
- react-native-paper
- react-native-vector-icons
- Jest + react-test-renderer

## Prerequisites
- Node >= 22.11 (see engines in package.json)
- Xcode (iOS) and/or Android Studio (Android)
- iOS: CocoaPods (installed via Homebrew or Ruby)

## Install
```bash
npm install
```

## iOS Setup
Install native pods:
```bash
npx pod-install
```
Alternatively (if you use Ruby bundler):
```bash
bundle install
bundle exec pod install
```

## Android Setup
Nothing special is required beyond the standard Android SDK setup. Vector icons are configured to package fonts via Gradle.

## Run
Start Metro:
```bash
npm start
```

In a separate terminal:
```bash
# Android
npm run android

# iOS
npm run ios
```

## Lint and Tests
```bash
npm run lint
npm test
```

## Configuration
- API: Uses Google Books public endpoint (no key required for basic queries).
  - Base URL: `https://www.googleapis.com/books/v1/volumes`
  - Code: [src/services/bookService.ts](file:///Users/geeksforce/readora/src/services/bookService.ts)
- Theming and constants:
  - Code: [src/constants/index.ts](file:///Users/geeksforce/readora/src/constants/index.ts)
- Types and interfaces:
  - Code: [src/types/interfaces.ts](file:///Users/geeksforce/readora/src/types/interfaces.ts)

## App Icons
- Source image: `/readora_icon.png`
- iOS icons are generated into the asset catalog:
  - Path: ios/readora/Images.xcassets/AppIcon.appiconset
  - Mapping: [Contents.json](file:///Users/geeksforce/readora/ios/readora/Images.xcassets/AppIcon.appiconset/Contents.json)
- Android launcher icons are placed under:
  - android/app/src/main/res/mipmap-*/ic_launcher.png
  - android/app/src/main/res/mipmap-*/ic_launcher_round.png

## Icons in UI
- The app uses MaterialCommunityIcons through react-native-paper’s custom icon configuration.
  - Adapter: [IconAdapter.tsx](file:///Users/geeksforce/readora/src/shared/components/IconAdapter.tsx)
  - Provider setup: [App.tsx](file:///Users/geeksforce/readora/App.tsx)
Ensure a clean rebuild after dependency changes so fonts are bundled.

## App Usage
- Search Screen: Type at least 2 characters to trigger results. Tap a result to open details.
  - Code: [SearchScreen.tsx](file:///Users/geeksforce/readora/src/screens/SearchScreen.tsx)
- Results Screen: Scroll to load more; automatically fetches the next page.
  - Code: [ResultsScreen.tsx](file:///Users/geeksforce/readora/src/screens/ResultsScreen.tsx)
- Details Screen: Displays book cover with an in-image loader and a retry icon on errors, rating stars, and overview text when available.
  - Code: [BookDetailsScreen.tsx](file:///Users/geeksforce/readora/src/screens/BookDetailsScreen.tsx)

## Troubleshooting
- Icons not showing:
  - Android: Do a clean rebuild so vector icon fonts are included in the APK.
  - iOS: Run `npx pod-install` and rebuild. Ensure the app uses the `IconAdapter` in the PaperProvider settings.
- Image not loading on details:
  - The overlay shows a spinner; if loading fails, tap the reload icon to retry.
- HTTP images blocked:
  - The app upgrades `http://` thumbnails to `https://`. If an image still fails, it will show a retry control.
