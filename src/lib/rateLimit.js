const attempts = new Map();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minute lockout

function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

export function checkRateLimit(request) {
  const ip = getClientIP(request);
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS, lockedUntil: 0 });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  // Reset if window expired
  if (now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS, lockedUntil: 0 });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  // Check if currently locked out
  if (record.lockedUntil > now) {
    const remainingMs = record.lockedUntil - now;
    return {
      allowed: false,
      retryAfterMs: remainingMs,
      message: `Too many failed attempts. Try again in ${Math.ceil(remainingMs / 60000)} minute(s).`,
    };
  }

  // Increment count
  record.count += 1;

  if (record.count > MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
    return {
      allowed: false,
      retryAfterMs: LOCKOUT_MS,
      message: `Too many failed attempts. Try again in 15 minutes.`,
    };
  }

  return {
    allowed: true,
    remaining: MAX_ATTEMPTS - record.count,
  };
}

export function clearRateLimit(request) {
  const ip = getClientIP(request);
  attempts.delete(ip);
}

// Cleanup old entries periodically (runs on access, lazy cleanup)
export function cleanupRateLimit() {
  const now = Date.now();
  for (const [ip, record] of attempts.entries()) {
    if (now > record.resetAt && now > record.lockedUntil) {
      attempts.delete(ip);
    }
  }
}