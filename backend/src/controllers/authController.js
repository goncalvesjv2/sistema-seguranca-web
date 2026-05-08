import { registerService, loginService } from '../services/authService.js';

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