import JWT from 'jsonwebtoken';
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req?.cookies?.['token'];
    // console.log({ req: req?.cookies });
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'user is not Authenticated',
      });
    }
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        status: false,
        message: 'invalid token',
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log({ error });
  }
};
