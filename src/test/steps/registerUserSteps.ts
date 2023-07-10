import { Given, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import RegisterPage from "../../pages/registerPage";
import Assert from "../../helper/wrapper/assert";
import * as data from "../../helper/util/test-data/registerUser.json";

let registerPage ;
let assert;

Given('I navigate to register page', async function () {
  registerPage=new RegisterPage(pageFixture.page);
  assert = new Assert(pageFixture.page);
   await registerPage.navigateToRegisterPage();
  });



  When('I create a new User', async function () {
    registerPage=new RegisterPage(pageFixture.page);

    const username=data.userName +Date.now().toString();
   await registerPage.registerUser(data.firstName,data.lastName,username,data.password,data.confirmPassword,"m")
   await pageFixture.page.waitForTimeout(2000);

  });



  Then('I confirm User Registration is success', async function () {
   await assert.assertURL("https://bookcart.azurewebsites.net/login");
  console.log("tout est bien")
  });