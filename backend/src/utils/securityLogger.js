import fs from 'fs';
import path from 'path';

const logsDirectory = path.resolve('src/logs');
const logFile = path.join(logsDirectory, 'security.log');

// Criar pastas logs
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

export function securityLogger(event, details) {
  const timestamp = new Date().toISOString();

  const logMessage =
    `[${timestamp}] ${event} - ${details}\n`;

  fs.appendFileSync(logFile, logMessage);
}