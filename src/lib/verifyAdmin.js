import jwt from 'jsonwebtoken';

export function verifyAdmin(request) {
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}
