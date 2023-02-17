const expressWinston = require("express-winston");
const winston = require("winston");
const { transports, format } = require("winston");

export const loggerMiddleware = expressWinston.logger({
  transports: [
    new transports.File({
      level: "warn",
      filename: "src/logs/warnlogs.log",
    }),
    new transports.File({
      level: "error",
      filename: "src/logs/errorlogs.log",
    }),
  ],
  format: winston.format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint()
  ),
  statusLevels: true,
});
