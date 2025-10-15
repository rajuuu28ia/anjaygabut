import { cookies } from 'next/headers';
import { db } from './db';
import { admins } from './db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export interface AdminSession {
  id: number;
  username: string;
}

export async function login(username: string, password: string): Promise<AdminSession | null> {
  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.username, username))
    .limit(1);

  if (!admin) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, admin.password);
  if (!isValidPassword) {
    return null;
  }

  const session: AdminSession = {
    id: admin.id,
    username: admin.username,
  };

  return session;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(sessionCookie.value, secret);
    
    // Validate payload has required properties
    if (
      typeof payload.id === 'number' &&
      typeof payload.username === 'string'
    ) {
      return {
        id: payload.id,
        username: payload.username
      };
    }
    
    return null;
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function createSessionToken(session: AdminSession): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + SESSION_MAX_AGE;

  const token = await new SignJWT({ 
    id: session.id, 
    username: session.username 
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .setNotBefore(iat)
    .sign(secret);

  return token;
}
