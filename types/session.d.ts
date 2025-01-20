// session.d.ts
import 'express-session';

declare module 'express-session' {
    interface Session {
        user?: any; 
        returnTo?: string;
    }
}

declare global {
    namespace Express {
      interface Request {
        user?: string;
        pass?: string;
      }
    }
  }