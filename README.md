# MonitorPriceChecker

This program is currently setup to check the price of the Alienware AW3423DWF 34 Monitor on dell.com and bestbuy.com and notify you when it is on sale

## Requirements

https://nodejs.org/en/learn/getting-started/how-to-install-nodejs

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

## Installation and Usage

First clone this project with `git clone https://github.com/CoreyTV/MonitorPriceChecker.git`

cd to the directory `cd MonitorPriceChecker`

install the packages with `npm i`

you may need to alter the variable `alertCommandForYourOS` in `CheckPrice.ts`

to run the program run `npm run build`

## Customization

`minutesBeforeRunning` - will set how often it will recheck the prices in minutes the default value is 30 minutes

`alertIfBelowInDollars` - Will notify you if the price is below this number. Is set to $800 by default

`alertCommandForYourOS` - Will run this command to notify you, it will be ran in your operating system's terminal the default value is `notify-send "On Sale"`

if you are on windows this command will be `msg %username% On Sale`

if you are on MacOS the command will probably be `osascript -e 'tell app "Finder" to display dialog "On Sale"'`
