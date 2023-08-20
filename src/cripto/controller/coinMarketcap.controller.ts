import { Request, Response, Router } from "express";
import { CoinMarketcapService } from "../service/coinMarketcap.service";

export class CoinMarketcapController {
  private readonly router: Router;

  constructor(private readonly userService: CoinMarketcapService) {
    this.router = Router();
    this.router.get("/getListingsLatest", this.getListingsLatest.bind(this));
  }

  private async getListingsLatest(_req: Request, res: Response) {
    try {
      const data = await this.userService.getListingsLatest();
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  getRouter() {
    return this.router;
  }
}
