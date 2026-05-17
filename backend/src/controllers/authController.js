import { registerService, loginService } from '../services/authService.js';
import { verify2FAService } from '../services/verify2FAService.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await registerService(name, email, password);

    res.status(201).json({
      message: 'Usuário cadastrado'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    res.status(200).json(result);

  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Erro interno' });
  }
};

export const verify2FA = async (req, res) => {
  try {
    const { code, tempToken } = req.body;
    const result = await verify2FAService(tempToken, code);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Erro interno' });
  }
}