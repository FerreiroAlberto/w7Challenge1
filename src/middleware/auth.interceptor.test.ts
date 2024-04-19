import { Request, Response, NextFunction } from 'express';
import { Auth } from '../services/auth.services';
import { AuthInterceptor } from './auth.interceptor';

describe('Given an instance of the class AuthInterceptor', () => {
  const interceptor = new AuthInterceptor();
  Auth.verifyJwt = jest.fn().mockReturnValue({ id: '123' });
  test('Then it should be instance of the class', () => {
    expect(interceptor).toBeInstanceOf(AuthInterceptor);
  });

  describe('When the authentication method i used', () => {
    const req = {
      body: {},
      get: jest.fn().mockReturnValue('Bearer Token'),
    } as unknown as Request;
    const res = { json: jest.fn(), status: jest.fn() } as unknown as Response;
    const next = jest.fn();
    test('Then it should call next without parameters', () => {
      interceptor.authentication(req, res, next);
      expect(Auth.verifyJwt).toHaveBeenCalled();
      expect(req.body.payload).toEqual({ id: '123' });
      expect(next).toHaveBeenCalledWith();
    });
  });

  describe('When we use the authentication and the token is malformed', () => {
    test('Then it should call next with error', () => {
      const req = {
        body: {},
        get: jest.fn().mockReturnValue('myToken'),
      } as unknown as Request;
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      } as unknown as Response;
      const next = jest.fn();
      req.get = jest.fn().mockReturnValue('myToken');
      interceptor.authentication(req, res, next);
      expect(next).toHaveBeenCalledWith({
        message: 'Token invalid',
        status: 498,
        title: 'Token expired/invalid',
      });
    });
  });
});

// Faltarían las dos situaciones de error. El primero cambiando el mockReturnValue de Bearer Token a algo diferente.
