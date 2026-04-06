export async function sendEmail(alert: any) {
  console.log(`[EMAIL ALERT] To: ${process.env.ALERT_EMAIL_TO}, From: ${process.env.ALERT_EMAIL_FROM}`);
  console.log(`[EMAIL ALERT] Subject: ${alert.severity.toUpperCase()} Anomaly Alert: ${alert.parameter}`);
  console.log(`[EMAIL ALERT] Message: ${alert.message}`);
}

export async function sendSlack(alert: any) {
  if (!process.env.SLACK_WEBHOOK_URL) return;
  console.log(`[SLACK ALERT] Sending to webhook: ${process.env.SLACK_WEBHOOK_URL}`);
  console.log(`[SLACK ALERT] Message: ${alert.message}`);
}

export async function dispatch(alert: any) {
  if (alert.severity === 'high' || alert.severity === 'critical') {
    await sendEmail(alert);
    await sendSlack(alert);
  }
}
