import ActionLogger from './action-logger.service';
import ProviderService from '../services/provider.service';
import Service, {Inject} from '../services/service';


@Inject()
export default class LoggerService extends Service
{

  constructor(protected provider: ProviderService)
  {
    super();
  }


  action(name: string)
  {
    const actionLogger = this.provider.get<ActionLogger>(ActionLogger);
    actionLogger.options.action = name;

    return actionLogger;
  }
}
