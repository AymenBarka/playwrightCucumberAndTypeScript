import{When,Then} from "@cucumber/cucumber"
import { chromium,Browser,Page, expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";


  When('user search for a {string}', async function (book) {
    pageFixture.logger.info("searching for a book Name " + book)

    await pageFixture.page.locator("input[type='search']").type(book);
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.locator("mat-option[role='option'] span").click();
  });



  When('user add the book to the cart', async function () {
    await pageFixture.page.locator("//button[@color='primary']").click();

  });



  Then('the cart badge should get updated', async function () {
    const badgeCount = await pageFixture.page.locator("#mat-badge-content-0").textContent();
    expect(Number(badgeCount)).toBeGreaterThan(0);
  });
