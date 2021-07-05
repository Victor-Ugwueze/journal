import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthHelper {
  static hashPassword(password: string) {
    return bycrpt.hashSync(password, 10);
  }

  static passwordMatch(password: string, hashPassword: string) {
    return bycrpt.compareSync(password, hashPassword);
  }


  static generateToken(userId: number, email: string) {
    const secret: string = process.env.JWT_SECRET || '';
    return jwt.sign({
      userId,
      email,
    }, 
    secret, 
    {
      expiresIn: '48h',
    });
  }
}

export default AuthHelper;
