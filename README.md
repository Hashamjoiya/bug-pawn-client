# BugPawnClient

Demo Angular Client to test BugPawn Rails Project API

## Requirements

```bash
NodeJS >= 12.xx.xx
Yarn >= 1.22.xx  # can be installed using `npm i -g yarn`, if not already
```
**NOTE:** The Rails Backend must be running in order to test/run this project, backend project [BugPawn](https://github.com/Hashamjoiya/BugPawn.git)

## Getting Started

1. clone the repository, `git clone https://github.com/Hashamjoiya/bug-pawn-client.git`
2. `cd bug-pawn-client`
3. `yarn install`
4. `yarn start`, this will spin up angular dev server on port `4200`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Structure

Angular is divided into modules and services, can be found under the `src/app`. Each module then contains its own underlying views/components etc.
