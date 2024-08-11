# MonitorPriceChecker


## Requirements

https://nodejs.org/en/learn/getting-started/how-to-install-nodejs

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

## Installation and Usage

First clone this project with "git clone https://github.com/CoreyTV/MonitorPriceChecker.git"

cd to the directory "cd MonitorPriceChecker"

"npm i"

you may need to alter the variable alertCommandForYourOS in CheckPrice.ts

to run the program run "npm run build"

## Customization

minutesBeforeRunning - will set how often it will recheck the prices in minutes
alertIfBelowInDollars - Will notify you if the price is below this number. Is set to $800 by default
alertCommandForYourOS - Will run this command to notify you, it will be ran in your operating system's terminal
