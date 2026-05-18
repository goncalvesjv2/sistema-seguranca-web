import logger from '../config/logger.js';

const errorMiddleware = (err, req, res, next) => {

  logger.error(err.message);

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor'
  });
};

export default errorMiddleware;