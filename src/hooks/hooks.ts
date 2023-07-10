import { pageFixture } from './pageFixture';
import {Before, After, BeforeAll, AfterAll, Status, AfterStep} from "@cucumber/cucumber";
import { chromium,Browser,Page, BrowserContext, firefox} from "@playwright/test";
import { invokeBrowser } from '../helper/browsers/browserManager';
import { getEnv } from '../helper/env/env';
import { createLogger } from 'winston';
import { options } from '../helper/util/logger';
const fs = require("fs-extra");

let browser:Browser;
let context:BrowserContext;
BeforeAll(async function(){
    getEnv();    
    browser= await invokeBrowser();

})
Before(async function({pickle}){
    const scenarioName= pickle.name +pickle.id;
    context = await browser.newContext({
        recordVideo:{
            dir:"test-results/Videos"
        },
    });
    const page = await context.newPage();
    pageFixture.page=page;
    pageFixture.logger=createLogger(options(scenarioName))
});

After(async function({pickle,result}){
    console.log(result?.status)
    let videoPath:string;
    let img: Buffer;
    //screenshoot
    if(result?.status==Status.FAILED){
         img= await pageFixture.page.screenshot({path:'./test-results/screenshoots/${pickle.name}.png',type:"png"})
        videoPath = await pageFixture.page.video().path();
        
    }
    
    await pageFixture.page.close();
    await context.close();

    if (result?.status == Status.FAILED) {

            await this.attach(
                img,"image/png"
                );
            await this.attach(
              fs.readFileSync(videoPath),
              'video/webm'
            ) ; 
        } 

})
AfterAll(async function(){
    await browser.close();
   // pageFixture.logger.close();
})