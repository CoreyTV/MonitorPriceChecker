import { By, Builder, Browser, WebDriver } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox";
import { appendFileSync, existsSync, readFileSync } from "node:fs";

/**
 * This is where you can adjust the settings
 */
const minutesBetweenFetches = 5;
const facebookSearchUrl = "https://www.facebook.com/marketplace/oklahoma/search?minPrice=3500&maxPrice=12000&daysSinceListed=1&sortBy=best_match&query=silverado%202500HD&exact=true";
const newlyMadeFirefoxProfileAlreadyLoggedInTo = "/home/coreytv/.mozilla/firefox/selenium"

async function fetchFirstMarketPlaceItem() {
  let driver: WebDriver;

  try {
    const options = new firefox.Options();
    options.addArguments("-headless");
    // uses profile to maintain cookies for logins so we don't need login steps
    options.addArguments("-profile", newlyMadeFirefoxProfileAlreadyLoggedInTo);

    driver = await new Builder()
      .forBrowser(Browser.FIREFOX)
      .setFirefoxOptions(options)
      .build();

    // go to webpage
    await driver.get(facebookSearchUrl);

    // get the inner text of the first market place item, using xpath
    const truck = await driver.findElement(By.xpath("//a[contains(@href, 'marketplace/item')]")).getAttribute("innerText");

    // randomly check to make sure it is still fetching
    if (Math.random() > 0.95) console.log(truck);

    let lastTruck = "";
    // fetch all our previous matches 
    if (existsSync("./truck.txt")) {
      lastTruck = readFileSync("./truck.txt", "utf8");
    }
    // add this match if we haven't seen it
    if (!lastTruck.includes(truck)) {
      const itemLink = await driver.findElement(By.xpath("//a[contains(@href, 'marketplace/item')]")).getAttribute("href");
      // market place description
      appendFileSync("./truck.txt", `\n${truck}`, "utf8")
      // facebook market place link
      appendFileSync("./truck.txt", `\n${itemLink}`, "utf8");
      console.log(truck);
      console.log(itemLink);
    }
  } catch (e) {
    console.log(e);
  } finally {
    await (driver as WebDriver).quit();
  }
}

fetchFirstMarketPlaceItem();
setInterval(
  async () => await fetchFirstMarketPlaceItem(),
  1000 * 60 * minutesBetweenFetches
);
