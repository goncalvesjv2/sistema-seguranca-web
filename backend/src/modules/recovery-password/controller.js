import { requestReset, performReset } from './service.js';
import { forgotPasswordSchema, resetPasswordSchema } from './validation.js';

export const forgotPassword = async (req, res) => {
  try {
    forgotPasswordSchema.parse(req.body);

    const result = await requestReset(req.body.email);
    res.json({
      message: result.message,
      token: result.fakeToken // Retorna o token para testes
    });

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    resetPasswordSchema.parse(req.body);

    const result = await performReset(
      req.body.token,
      req.body.password
    );

    res.json(result);

  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message
    });
  }
};