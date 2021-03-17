import ActionLogger from './action-logger.service';
import ProviderService from '../services/provider.service';
import Service from '../services/service';
export default class LoggerService extends Service {
    protected provider: ProviderService;
    constructor(provider: ProviderService);
    action(name: string): ActionLogger;
}
