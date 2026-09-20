const fs = require('fs')
const path = require('path')

const summaryPath = path.join(__dirname, 'coverage', 'coverage-summary.json')
const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'))
const requiredFiles = [
  path.resolve(__dirname, '..', 'src', 'stores', 'language.js'),
  path.resolve(__dirname, '..', 'src', 'plugins', 'Theme', 'ThemeStore.js')
]
const metrics = ['branches', 'functions', 'lines', 'statements']
const nonEmptyMetrics = ['functions', 'lines', 'statements']

for (const requiredFile of requiredFiles) {
  const coverage = summary[requiredFile]

  if (!coverage) {
    throw new Error(`Coverage report omitted required file: ${requiredFile}`)
  }

  for (const metric of metrics) {
    if (nonEmptyMetrics.includes(metric) && coverage[metric].total === 0) {
      throw new Error(`Coverage report has no ${metric} for: ${requiredFile}`)
    }

    if (coverage[metric].pct < 100) {
      throw new Error(`${metric} coverage is below 100% for: ${requiredFile}`)
    }
  }
}

console.log(`Verified non-empty coverage for ${requiredFiles.length} production files.`)
