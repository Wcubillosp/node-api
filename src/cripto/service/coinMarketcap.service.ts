import axios from "axios";

export class CoinMarketcapService {
  apiKey = "654a047a-7491-496d-8bd9-c9ecbe10acd8"; //traer del env
  api = "https://pro-api.coinmarketcap.com/v1/cryptocurrency";
  constructor() {}

  async getListingsLatest() {
    const apiUrl = `${this.api}/listings/latest`;

    const config = {
      headers: {
        "X-CMC_PRO_API_KEY": this.apiKey,
        Accept: "application/json",
      },
      params: {
        start: 1,
        limit: 99,
      },
    };

    try {
      const response = await axios.get(apiUrl, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
