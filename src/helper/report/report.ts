const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results",
  reportPath: "test-results/reports/",
  reportName:"playwright Automation Report",
  pageTitle:"BookCart App test Report",
  displayDuration:true,
  metadata: {
    browser: {
      name: "chrome",
      version: "114",
    },
    device: "aymen - pc",
    platform: {
      name: "Windows",
      version: "10",
    },
  },
  customData: {
    title: "Test info",
    data: [
      { label: "Project", value: "BookCart App" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "Smoke-1" },
      
    ],
  },
});