import { Request, Response, Router } from "express";
import { DoctorAuthService } from "../services/DoctorAuthService";
import jwtSimple from "jwt-simple";
import dotenv from "dotenv";

dotenv.config();

export class DoctorAuthController {
  router = Router();
  constructor(private authService: DoctorAuthService) {
    // this.router.post("/drRegister", this.register);
    this.router.post("/drLogin", this.login.bind(this));
  }

  // register = async (req: Request, res: Response) => {
  //   let { usernameInput, passwordInput } = req.body;

  //   let result = await this.authService.register(usernameInput, passwordInput);

  //   if (result) {
  //     res.json({ message: "register success" });
  //   } else {
  //     res
  //       .status(500)
  //       .json({ message: "Internal Server Error! Register Failed." });
  //   }
  // };

  async login(req: Request, res: Response) {
    const usernameInput = req.body.usernameInput;
    const passwordInput = req.body.passwordInput;
    console.log("check 1", usernameInput, passwordInput);
    let result = await this.authService.login(usernameInput, passwordInput);

    if (result.verified) {
      const payload = { userId: result.userId, username: result.username };
      console.log("check payload", payload);

      const jwtToken = jwtSimple.encode(payload, process.env.JWT_SECRET!);

      res.json({ message: "success login", token: jwtToken });
    } else {
      console.log("Error!!", result.reason);
      res.status(400).json({ message: "Username / Password wrong" });
    }
  }
}
