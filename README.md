# LanguageApp
---
## Contents

- [Project Vision](#project-vision)
- [Technical Information](#technical-information)
  - [Technologies Used](#technologies-used)
  - [Voice Production](#voice-production)
  - [Tests](#tests)
  - [Libraries](#libraries)
- [How to Use the Application](#how-to-use-the-application)
- [Contributors](#contributors)

---

## Project Vision

Our vision for LanguageApp is to provide language learners with a fun and motivating way to get started with learning a new language through gamified elements. The learning environment of LanguageApp is specifically designed for beginners in language learning. Its game-like world and features help users progress in their language studies according to their own level.

---

## Technical Information

### Technologies Used

- **Framework**: Next.js 13.5
- **Programming Language**: JavaScript
- **Styling**: SCSS
- **Database**: MongoDB
- **Testing**: Robot Framework, Vitest, Playwright

### Voice Production

LanguageApp uses the [Mimic3](https://github.com/MycroftAI/mimic3)An open-source privacy-focused neural Text to Speech engine.

### About the Application

- Safety
  - Due to application being hosted in Metropolia eCloud it is only accessible to users connected to the Metropolia network. The application is also protected by a firewall.
[More about application safety in finnish](https://github.com/tuulikoo/LanguageApp/blob/main/LanguageApp%20-%20turvallisuus.pdf)


### Tests

We prioritize the quality and reliability of our application. To ensure its robustness, we employ a combination of testing tools:

- **Robot Framework**: An open-source automation framework that validates not only the application's functionality but also its overall behavior. More details at [Robot Framework](https://robotframework.org/).

- **Vitest**: A modern test runner for JavaScript. It's optimized for speed and developer experience. More details at [Vitest](https://vitest.dev/).

- **Playwright**: Provides a set of APIs to automate Chromium, Firefox, and WebKit browsers. With Playwright, we can simulate user actions and ensure that our application works seamlessly across different browsers. More details at [Playwright](https://playwright.dev/).

---
## Libraries

### Core Libraries
- **Next.js**: Our primary framework for building the application.
- **MUI**: Used for designing our UI components.
- **ViTest & Playwright**: Our main testing tools to ensure code quality and functionality.

### Other Libraries
We utilize a range of other libraries for various purposes, from styling to state management. For a complete list of dependencies, please refer to our [package.json](/package.json) file.

---
## How to Use the Application

The application is available at [langapp.xyz](http://langapp.xyz). Please note that in order to use the application, you must be connected to the Metropolia network.

---
## Contributors


- [Joonas Jouttijärvi](https://github.com/joonasjouttijarvi)
- [Tuuli Kivisaari](https://github.com/tuulikoo)
- [Irinja Romjalis](https://github.com/iromjalis)
- [Noriin Dorato](https://github.com/noriind)





