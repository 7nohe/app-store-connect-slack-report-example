import { WebClient } from '@slack/web-api';
import { createClient, SalesReportFrequency } from '@7nohe/app-store-connect-api-client';
import dayjs from 'dayjs';

// Change here
const SKU = '<YOUR-SKU>';
const SLACK_CHANNEL = '<YOUR-SLACK-CHANNEL>';

const appStoreConnectClinet = createClient({
  apiKey: process.env.API_KEY!,
  issuerId: process.env.ISSUER_ID!,
  privateKey: Buffer.from(process.env.PRIVATE_KEY!, 'base64'),
});
const token = process.env.SLACK_TOKEN;
const slackClient = new WebClient(token);

const today = dayjs();
const sevenDaysBeforeToday = today.subtract(7, 'days');
const startOfLastWeek = sevenDaysBeforeToday.startOf('week');
const endOfLastWeek = sevenDaysBeforeToday.endOf('week');
const reportDate = startOfLastWeek.format('YYYY-MM-DD');


const salesReports = await appStoreConnectClinet.getSalesReports({
  vendorNumber: process.env.VENDOR_NUMBER!,
  reportDate,
  frequency: SalesReportFrequency.Weekly
})

// Available product type identifiers are here: https://help.apple.com/app-store-connect/#/dev63c6f4502
const units = salesReports.find(report => report['Product Type Identifier'] === '1F' && report['SKU'] === SKU)?.['Units'];

const text = `
  [Weekly Sales Report(${startOfLastWeek.format('YYYY-MM-DD')}〜${endOfLastWeek.format('YYYY-MM-DD')})]
  Units: *${units}*
  `;

const response = await slackClient.chat.postMessage({ channel: SLACK_CHANNEL, text });

if (response.ok) {
  console.log('Message sent successfully!')
}

