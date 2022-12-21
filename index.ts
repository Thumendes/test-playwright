import { firefox } from "playwright";

async function main() {
  const browser = await firefox.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://greensignal.com.br/");

  const title = await page.title();
  console.log(title);
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
