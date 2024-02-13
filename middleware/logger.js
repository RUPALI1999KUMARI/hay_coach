/* Logger middleware code here */
import winston from 'winston';

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

// Define log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Create a logger instance
const logger = createLogger({
  format: combine(
    label({ label: 'my-app' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

// Export logger middleware
export function loggerMiddleware(req, res, next) {
  logger.info(`[${req.method}] ${req.url}`);
  next();
};
