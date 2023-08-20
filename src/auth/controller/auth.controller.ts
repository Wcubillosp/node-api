import { Request, Response, Router } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
  private readonly router: Router;

  constructor(private readonly authService: AuthService) {
    this.router = Router();
    this.router.post("/login", this.login.bind(this));
    this.router.post("/register", this.create.bind(this));
  }

  private async login(req: Request, res: Response) {
    try {
      const data = await this.authService.login(req.body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  private async create(req: Request, res: Response) {
    const data = await this.authService.register(req.body);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(500).send("Failed...");
    }
  }

  getRouter() {
    return this.router;
  }
}
