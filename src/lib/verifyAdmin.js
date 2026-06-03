import jwt from 'jsonwebtoken';

export function verifyAdmin(request) {
  // Check Authorization header first (from client-side fetch)
  const authHeader = request.headers.get('authorization');
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7);
  }

  // Fall back to cookie (for direct browser navigation)
  if (!token) {
    token = request.cookies.get('admin_token')?.value;
  }

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch {
    return null;
  }
}