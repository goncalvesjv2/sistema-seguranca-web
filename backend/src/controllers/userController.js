import { deleteAccountService, updateUserService } from '../services/userServices.js';

export async function deleteAccountController(req, res) {
  try {
    const userId = req.user.id;
    const result = await deleteAccountService(userId);
    return res.status(200).json(result);

  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message
    });
  }
}

export async function updateUserController(req, res) {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    const result = await updateUserService(
      userId,
      name,
      email
    );
    return res.status(200).json(result);

  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message
    });
  }
}