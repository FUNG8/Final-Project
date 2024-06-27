import { Request, Response, Router } from "express";
import { PatientAuthService } from "../services/PatientAuthService";
import jwtSimple from "jwt-simple";
import dotenv from "dotenv";

dotenv.config();

export class PatientAuthController {
  router = Router();
  constructor(private authService: PatientAuthService) {
    this.router.post("/createPatient", this.createPatient);
    this.router.post("/patientLogin", this.login.bind(this));
  }

  createPatient = async (req: Request, res: Response) => {
    try {
      
      let {
        hkid,
        password,
        firstName,
        lastName,
        gender,
        blood,
        birth_date,
        phone_number,
        diagnosis_id,
        emergency_name,
        emergency_contact,
        
      } = req.body;
  
      let result = await this.authService.createPatients(
        hkid,
        password,
        firstName,
        lastName,
        gender,
        blood,
        birth_date,
        phone_number,
        diagnosis_id,
        emergency_name,
        emergency_contact
      );
  
      if (result) {
        res.json({ message: "register success" });
      } else {
        res.status(500).json({ message: "Internal Server Error! Register Failed." });
      }
    } catch (error) {
      console.error("Error creating patient:", error);
      res.status(500).json({ message: "Internal Server Error! Register Failed." });
    }
  };

  async login(req: Request, res: Response) {
    const hkidInput = req.body.hkidInput;
    const passwordInput = req.body.passwordInput;
    console.log("check 1", hkidInput, passwordInput);
    let result = await this.authService.login(hkidInput, passwordInput);

    if (result.verified) {
      const payload = { userId: result.userId, firstName: result.firstName, lastName:result.lastName  };
      console.log("check payload", payload);

      const jwtToken = jwtSimple.encode(payload, process.env.JWT_SECRET!);

      res.json({ message: "success login", token: jwtToken });
    } else {
      console.log("Error!!", result.reason);
      res.status(400).json({ message: "Username / Password wrong" });
    }
  }
}
