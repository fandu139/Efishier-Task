# Efishery Task

Made with React Native

Tech Features:
1. React Native 0.67.1
2. React Navigation 
3. React Native Modal 
4. React Native uuid
5. Moment.js
6. Lodash
7. React Native Vector Icons
8. Stein js client

## Explanation UI
You can go to this link https://github.com/fandu139/Efishier-Task/blob/main/docs/EXPLANATION.md

## Setup Environment
First, setup your environment by following this guide on https://reactnative.dev/docs/environment-setup

## Clone Project
```
git clone
cd 
yarn install
```

## Structure

```
src
├── assets
│   ├── icon
│   └── image
├── helper
│   ├── string
│   └── navigation
├── navigation
├── screens
│   ├── AddData
│   ├── components
│   └── Filter
│   └── List
├── theme
├── uikit
│   └── Checkbox
│   └── EmptyContent
│   └── Icon
│   └── Spinner
```

## Testing
We have three kind of test: unit test, snapshot test and e2e testing.
For unit test and snapshot, we will use jest with react native testing library.
For e2e test we will use detox

Every unit test must be placed under corresponding feature you want to add test and create `__test__` folder.
Every component should have snapshot test.

## Icon & Image
We use icomoon for converting svg icon into `.ttf` so you don't need to use png file for icon.
Icomoon can be accessed here: https://icomoon.io/
