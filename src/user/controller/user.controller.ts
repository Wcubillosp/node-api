import { Request, Response, Router } from "express";
import { UserService } from "../service/user.service";

export class UserController {
  private readonly router: Router;

  constructor(private readonly userService: UserService) {
    this.router = Router();
    this.router.get("/profile", this.profile.bind(this));
    this.router.put("/profile", this.profileEdit.bind(this));
    // this.router.put("/profilePhoto", this.profileEditPhoto.bind(this));
  }

  private async profile(req: Request, res: Response) {
    try {
      const data = await this.userService.profile(req.user.userId);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  private async profileEdit(req: Request, res: Response) {
    try {
      const data = await this.userService.profileEdit(
        req.user.userId,
        req.body
      );
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // private async profileEditPhoto(req: Request, res: Response) {
  //   try {
  //     const data = await this.userService.profileEditPhoto(
  //       req.user.userId,
  //       req.body
  //     );
  //     return res.status(200).json({ data });
  //   } catch (error) {
  //     return res.status(400).json({ error: error.message });
  //   }
  // }

  getRouter() {
    return this.router;
  }
}
