export async function login(data) {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        error: result.message || result.error || 'Erro no login'
      };
    }
    
    return result;

  } catch (error) {
    return {
      error: error.message
    };
  }
}

export async function register(data) {
  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      // ERROS ZOD
      if (result.errors) {
        return {
          error: result.errors.map((err) => err.message).join(', ')
        };
      }
      return {
        error: result.message || result.error || 'Erro no cadastro'
      };
    }
    return result;

  } catch (error) {
    return {
      error: error.message
    };
  }
}

export async function verify2FA(data) {
  try {
    const response = await fetch('http://localhost:3000/auth/verify-2fa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await response.json();

    return result;
  } catch (error) {
    return {
      error: error.message
    };
  }
}