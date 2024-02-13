import axios from 'axios';
import { TokenInfo } from 'packages/constants/tokenList';
import { AssetBalance, Chain } from 'packages/types';
import { ETH } from './eth';
import { coin, setCryptoCoins } from 'lib/store/coin';

export class Web3 {
  static ETH = ETH;

  static async checkAddress(chain: Chain, address: string): Promise<boolean> {
    switch (chain) {
      case Chain.ETH:
        return ETH.checkAddress(address);
      default:
        return false;
    }
  }

  static async getAssetBalance(chain: Chain, address: string): Promise<AssetBalance> {
    switch (chain) {
      case Chain.ETH:
        return ETH.getAssetBalance(address);
      default:
        return {};
    }
  }

  static async getTransactionList(chain: Chain, address: string): Promise<any[]> {
    switch (chain) {
      case Chain.ETH:
        return await ETH.getAssetTransactions(address);
    }
    return [];
  }

  static async getTransactionDetail(token: TokenInfo, hash: string): Promise<any> {
    switch (token.chain) {
      case Chain.ETH:
        return null;
    }
    return null;
  }

  static async updateCryptoPrice(
    ids: string[],
    currency?: string,
    include_market_cap: boolean = false,
    include_24hr_vol: boolean = false,
    include_24hr_change: boolean = true,
    include_last_updated_at: boolean = true,
  ): Promise<any> {
    if (!ids || ids.length === 0) {
      return;
    }

    const idsString = ids.join(',');
    currency = currency || 'usd';
    const include_market_cap_string = include_market_cap ? 'true' : 'false';
    const include_24hr_vol_string = include_24hr_vol ? 'true' : 'false';
    const include_24hr_change_string = include_24hr_change ? 'true' : 'false';
    const include_last_updated_at_string = include_last_updated_at ? 'true' : 'false';

    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsString}&vs_currencies=${currency}&include_market_cap=${include_market_cap_string}&include_24hr_vol=${include_24hr_vol_string}&include_24hr_change=${include_24hr_change_string}&include_last_updated_at=${include_last_updated_at_string}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`;
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        let coins: coin[] = [];
        ids.forEach((idElement: string) => {
          coins.push({
            ids: idElement,
            price: response.data[idElement].usd,
            usdMarketCap: response.data[idElement].usd_market_cap,
            usd24hVol: response.data[idElement].usd_24h_vol,
            usd24hChange: parseFloat(response.data[idElement].usd_24h_change).toFixed(2),
            lastUpdatedAt: response.data[idElement].last_updated_at,
          });
        });
        setCryptoCoins({
          cryptoCoins: coins,
        });
      }

      return response;
    } catch (err) {
      throw new Error('do not update crypto price: ' + err);
    }
  }
}
