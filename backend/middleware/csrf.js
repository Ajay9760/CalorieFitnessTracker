const crypto = require('crypto');

const CSRF_COOKIE_NAME = 'csrfToken';
const CSRF_HEADER_NAME = 'x-csrf-token';

const createCsrfToken = () => crypto.randomBytes(32).toString('hex');

const getCookieOptions = () => ({
  httpOnly: false,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
});

const ensureCsrfToken = (req, res, next) => {
  if (!req.cookies[CSRF_COOKIE_NAME]) {
    const token = createCsrfToken();
    res.cookie(CSRF_COOKIE_NAME, token, getCookieOptions());
  }
  next();
};

const csrfProtection = (req, res, next) => {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  if (safeMethods.includes(req.method)) {
    return next();
  }

  const exemptPaths = ['/auth/login', '/auth/register'];
  if (exemptPaths.includes(req.path)) {
    return next();
  }

  const csrfCookie = req.cookies[CSRF_COOKIE_NAME];
  const csrfHeader = req.headers[CSRF_HEADER_NAME];
  const csrfHeaderValue = Array.isArray(csrfHeader) ? csrfHeader[0] : csrfHeader;

  if (!csrfCookie || !csrfHeaderValue || csrfCookie !== csrfHeaderValue) {
    return res.status(403).json({
      success: false,
      error: 'Invalid CSRF Token',
      message: 'CSRF token missing or invalid',
    });
  }

  return next();
};

module.exports = {
  CSRF_COOKIE_NAME,
  CSRF_HEADER_NAME,
  ensureCsrfToken,
  csrfProtection,
  createCsrfToken,
  getCookieOptions,
};
