import { Browser, firefox } from "playwright";
import express from "express";
import cors from "cors";
import morgan from "morgan";

let browser: Browser | undefined;

async function getPageTitle(url: string) {
  if (!browser) browser = await firefox.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto(url);
  const title = await page.title();
  await page.close();
  return title;
}

async function main() {
  const app = express();
  app.use(cors());
  app.use(morgan("dev"));

  app.get("/", async (req, res) => {
    const title = await getPageTitle("https://www.google.com");

    res.send(`O título da página é: ${title}`);
  });

  app.listen(3000, () => {
    console.log("🔥 Server running on port 3000");
  });
}

main().catch(console.error);
