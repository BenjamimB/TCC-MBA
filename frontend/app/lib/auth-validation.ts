export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

export function validateLogin(input: LoginInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.email.trim()) {
    errors.email = 'E-mail é obrigatório';
  } else if (!EMAIL_REGEX.test(input.email)) {
    errors.email = 'E-mail inválido';
  }

  if (!input.password) {
    errors.password = 'Senha é obrigatória';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateRegister(input: RegisterInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.name.trim()) {
    errors.name = 'Nome é obrigatório';
  }

  if (!input.email.trim()) {
    errors.email = 'E-mail é obrigatório';
  } else if (!EMAIL_REGEX.test(input.email)) {
    errors.email = 'E-mail inválido';
  }

  if (!input.password) {
    errors.password = 'Senha é obrigatória';
  } else if (input.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`;
  } else if (!PASSWORD_REGEX.test(input.password)) {
    errors.password = 'Senha deve conter letras e números';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
