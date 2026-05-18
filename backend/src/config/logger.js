import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',

  format: winston.format.combine(
    winston.format.timestamp(),

    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),

  transports: [

    // Arquivo geral
    new winston.transports.File({
      filename: 'logs/combined.log'
    }),

    // Apenas erros
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    })
  ]
});


// Console durante desenvolvimento
if (process.env.NODE_ENV !== 'production') {

  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

export default logger;