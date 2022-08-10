import { Promotion } from './Promotion'
import { fetch } from './http_client/fetch'

// TODO: What will it return when some error ocurr ?
class PromotionDataRequestor {
    private URL = 'http://www.mocky.io/v2/5bc3b9cc30000012007586b7';

    async requestAll(): Promise<Promotion[]> {
        const { data: promotions } = await fetch<Promotion[]>(this.URL);
        
        return promotions;
    }
}

export { PromotionDataRequestor };