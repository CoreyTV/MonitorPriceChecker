import { By, Builder, Browser, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { exec } from "node:child_process";
async function firstTest(targetPrice: number, alertCommand: string) {
  let driver: WebDriver;

  try {
    const screen = {
      width: 1920,
      height: 1080,
    };
    const options = new chrome.Options();
    options.addArguments("--headless=new");
    options.setPageLoadStrategy("eager");
    options.windowSize(screen);
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(options)
      .build();
    // await driver.manage().setTimeouts({ implicit: 2000 });
    await driver.get(
      "https://www.dell.com/en-us/shop/alienware-34-curved-qd-oled-gaming-monitor-aw3423dwf/apd/210-bfrp/monitors-monitor-accessories"
    );
    const dellPriceTag = await driver
      .findElement(By.xpath("//div[@class='ps-dell-price ps-simplified']"))
      .getAttribute("innerText");
    // console.log(
    //   `${dellPriceTag} at "https://www.dell.com/en-us/shop/alienware-34-curved-qd-oled-gaming-monitor-aw3423dwf/apd/210-bfrp/monitors-monitor-accessories"`
    // );

    await driver.get(
      "https://www.bestbuy.com/site/alienware-aw3423dwf-34-quantum-dot-oled-curved-ultrawide-gaming-monitor-165hz-amd-freesync-premium-pro-vesa-hdmiusb-dark-side-of-the-moon/6536990.p?skuId=6536990"
    );
    const bestBuyPricesTag = await driver
      .findElement(
        By.xpath(
          "//div[@data-testid='customer-price']/span[@aria-hidden='true']"
        )
      )
      .getAttribute("innerText");
    // console.log(
    //   `${bestBuyPricesTag} at "https://www.bestbuy.com/site/alienware-aw3423dwf-34-quantum-dot-oled-curved-ultrawide-gaming-monitor-165hz-amd-freesync-premium-pro-vesa-hdmiusb-dark-side-of-the-moon/6536990.p?skuId=6536990"`
    // );

    if (
      Number(bestBuyPricesTag.match(/\d+/g)[0]) <= targetPrice ||
      Number(dellPriceTag.match(/\d+/g)[0]) <= targetPrice
    ) {
      setInterval(() => {
        exec(alertCommand);
      }, 1000 * 10);
      console.log(
        `${dellPriceTag} at "https://www.dell.com/en-us/shop/alienware-34-curved-qd-oled-gaming-monitor-aw3423dwf/apd/210-bfrp/monitors-monitor-accessories"`
      );
      console.log(
        `${bestBuyPricesTag} at "https://www.bestbuy.com/site/alienware-aw3423dwf-34-quantum-dot-oled-curved-ultrawide-gaming-monitor-165hz-amd-freesync-premium-pro-vesa-hdmiusb-dark-side-of-the-moon/6536990.p?skuId=6536990"`
      );
    }
  } catch (e) {
    console.log(e);
  } finally {
    await (driver as WebDriver).quit();
  }
}

const minutesBeforeRunning = 30;
const alertIfBelowInDollars = 900;

const alertCommandForYourOS = `notify-send "On Sale"`; //this will run in your terminal if below alertIfBelowInDollars price

//this is likely apples command - osascript -e 'tell app "Finder" to display dialog "On Sale"'
//this is linux's alert command - notify-send "On Sale"
//this is windows alert command = msg %username% On Sale

firstTest(alertIfBelowInDollars, alertCommandForYourOS);
setInterval(
  async () => await firstTest(alertIfBelowInDollars, alertCommandForYourOS),
  1000 * 60 * minutesBeforeRunning
);
