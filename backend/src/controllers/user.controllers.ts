import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserServices } from "../services/user.services";
import env from "../utils/env";
import prisma from "../utils/prisma";

import { google } from "../utils/googleToken";
import { internalError, success } from "../utils/return/returns";
export const UserControllers = {
  oauthSignup: async (req: Request, res: Response) => {
    const error = req.params.error;
    if (error) {
      internalError(res);
      return;
    }

    const code = req.query.code;
    if (!code) {
      res.status(400).send("Authorization code missing");
      return;
    }

    try {
      const tokenData = await google(code as string);
      if (tokenData.error) {
        res
          .status(500)
          .send(`Error exchanging code for token: ${tokenData.error}`);
        return;
      }

      const jwtToken = tokenData.id_token;
      const accessToken = tokenData.access_token;
      // const { refresh_token } = tokenData;

      const decoded = jwt.decode(jwtToken) as JwtPayload;
      const { email, sub } = decoded;

      if (!email || !sub) {
        res.json({
          msg: "INvalid things",
        });
        return;
      }
      const user = await prisma.user.findFirst({
        where: {
          googleId: sub,
        },
      });

      if (user) {
        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.cookie("token", token, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });

        res.cookie("oauth_token", accessToken, {
          maxAge: 0.95 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.redirect(`${env.FRONTEND_URL}/dashboard`);
        return;
      }

      const newUser = await UserServices.createGoogleUser(
        email.split("@")[0],
        email,
        sub
      );

      const token = jwt.sign({ userId: newUser.id }, env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.cookie("oauth_token", accessToken, {
        maxAge: 0.95 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.redirect(`${env.FRONTEND_URL}/dashboard`);
    } catch (error) {
      res.status(500).send("Error exchanging code for token");
    }
  },

  logout: async (_: Request, res: Response) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      success(res, "Logout successful");
    } catch {
      internalError(res);
    }
  },

  verifyToken: (req: Request, res: Response) => {
    res.json({
      valid: true,
    });
  },
};
