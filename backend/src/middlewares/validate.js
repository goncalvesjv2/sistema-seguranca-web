export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    // Validação falhou, retornar erros
    if (!result.success) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: result.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message
        }))
      });
    }

    // Dados validados, atualizar o corpo da requisição 
    req.body = result.data;

    next();
  };
};