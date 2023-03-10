const puppeteer = require("puppeteer");

const resortName = "Encore Resort at Reunion";
const url =
  "https://www.google.com/travel/hotels/Encore%20Resort%20at%20Reunion/entity/CgsI49_HlPO-p773ARAB/reviews?q=Encore%20Resort%20at%20Reunion&g2lb=2502548%2C2503771%2C2503781%2C4258168%2C4270442%2C4284970%2C4291517%2C4306835%2C4308226%2C4429192%2C4515404%2C4597339%2C4731329%2C4757164%2C4778035%2C4814050%2C4850738%2C4861688%2C4864715%2C4874190%2C4886082%2C4886480%2C4893075%2C4902277%2C4906023%2C4920132%2C4924070%2C4926165%2C4926489%2C4936396%2C4955104%2C4955321%2C4964966%2C4965636%2C4965727%2C4965990%2C4966974%2C4969275%2C4972345%2C47064364&hl=en-IN&gl=in&ssta=1&rp=EOPfx5Tzvqe-9wEQ49_HlPO-p773ATgCQABIAcABAg&ictx=1&sa=X&ved=0CAAQ5JsGahcKEwjYqYb_udD9AhUAAAAAHQAAAAAQAw&utm_campaign=sharing&utm_medium=link&utm_source=htls&ts=CAESABpJCisSJzIlMHg4OGRkNzk2NWVmNjNiODFkOjB4Zjc3YzlkZjczMjkxZWZlMxoAEhoSFAoHCOcPEAMYExIHCOcPEAMYFRgCMgIQACoJCgU6A0lOUhoA";

console.info(
  "\n==============================\nscript running on node version",
  process.version,
  "\nwe are getting data of ",
  resortName,
  "\n=============================="
);

const fetchData = async () => {
  try {
    console.log("\n trying to launch puppeteer ", new Date().toISOString());
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true
    });
    console.log(
      "\n puppeteer launched sucessfully and brouser open new page",
      new Date().toISOString()
    );
    const page = await browser.newPage();
    console.log("\n brouser open new page and go to url", new Date().toISOString());
    await page.goto(`${url}`);
    console.log("\n page open sucessfully", new Date().toISOString());

    let total = await page.waitForSelector(".P2NYOe.GFm7je.sSHqwe");
    let allOver = await page.waitForSelector(".FBsWCd");
    let totalReview = await page.evaluate((total) => total.textContent, total);
    let allOverReview = await page.evaluate(
      (allOver) => allOver.textContent,
      allOver
    );
    if (totalReview && allOverReview) {
      let googleTotalReview = parseInt(totalReview.replace(",", ""));
      let googleAllOverReview = parseFloat(
        parseFloat(allOverReview).toFixed(1)
      );
      console.info(
        "\n\n==============================\nTotal Review---",
        googleTotalReview,
        "\nAllover Review --",
        googleAllOverReview,
        "\n=============================="
      );
    }
    browser.close();

    process.exit();
  } catch (error) {
    console.error("\nerror ---", error);
    process.exit();
  }
};
fetchData();
