/**
 * Task 10.1 — Auth validation unit tests
 *
 * Cobre: validação de formulários de login e registro.
 * Requirements: 11.1, 11.3, 11.4, 11.5
 */
import { validateLogin, validateRegister } from './auth-validation';

describe('validateLogin()', () => {
  it('[TC-F-01] deve retornar valid=true para inputs válidos', () => {
    const result = validateLogin({ email: 'dr@clinica.com', password: 'senha123' });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('[TC-F-02] deve retornar erro para e-mail vazio', () => {
    const result = validateLogin({ email: '', password: 'senha123' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe('E-mail é obrigatório');
  });

  it('[TC-F-03] deve retornar erro para e-mail com formato inválido', () => {
    const result = validateLogin({ email: 'not-an-email', password: 'senha123' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe('E-mail inválido');
  });

  it('[TC-F-04] deve retornar erro para senha vazia', () => {
    const result = validateLogin({ email: 'dr@clinica.com', password: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.password).toBe('Senha é obrigatória');
  });

  it('[TC-F-12] deve retornar todos os erros quando múltiplos campos são inválidos', () => {
    const result = validateLogin({ email: '', password: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
    expect(result.errors.password).toBeDefined();
  });

  it('deve ignorar espaços ao validar e-mail vazio', () => {
    const result = validateLogin({ email: '   ', password: 'senha123' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe('E-mail é obrigatório');
  });
});

describe('validateRegister()', () => {
  const VALID_INPUT = {
    name: 'Dr. Ana Silva',
    email: 'ana@clinica.com',
    password: 'Senha123',
  };

  it('[TC-F-05] deve retornar valid=true para inputs válidos', () => {
    const result = validateRegister(VALID_INPUT);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('[TC-F-06] deve retornar erro para nome vazio', () => {
    const result = validateRegister({ ...VALID_INPUT, name: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe('Nome é obrigatório');
  });

  it('[TC-F-11] deve retornar erro para e-mail vazio no registro', () => {
    const result = validateRegister({ ...VALID_INPUT, email: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe('E-mail é obrigatório');
  });

  it('deve retornar erro para e-mail inválido no registro', () => {
    const result = validateRegister({ ...VALID_INPUT, email: 'invalido' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe('E-mail inválido');
  });

  it('[TC-F-07] deve retornar erro para senha com menos de 8 caracteres', () => {
    const result = validateRegister({ ...VALID_INPUT, password: 'Ab1' });
    expect(result.valid).toBe(false);
    expect(result.errors.password).toContain('mínimo');
  });

  it('[TC-F-08] deve retornar erro para senha com apenas letras (sem números)', () => {
    const result = validateRegister({ ...VALID_INPUT, password: 'apenasletras' });
    expect(result.valid).toBe(false);
    expect(result.errors.password).toContain('letras e números');
  });

  it('deve retornar erro para senha vazia no registro', () => {
    const result = validateRegister({ ...VALID_INPUT, password: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.password).toBe('Senha é obrigatória');
  });

  it('deve aceitar senha com exatamente 8 caracteres contendo letras e números', () => {
    const result = validateRegister({ ...VALID_INPUT, password: 'Senha123' });
    expect(result.valid).toBe(true);
  });
});
