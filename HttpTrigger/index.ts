import { AzureFunction, Context, HttpRequest, HttpRequestQuery } from "@azure/functions";
import getContainer from "../ioc/inversify.config";
import { COMMON_TYPES } from "../ioc/commonTypes";
import { Logger } from "../commonServices/logger";
import { ILogger } from "../commonServices/iLogger";
import { IFunctionService } from "./services/IFunctionService";
import { Container } from "inversify";

const httpTrigger: AzureFunction = async (ctx: Context, req: HttpRequest): Promise<any> => {    
    const container: Container = getContainer();
    const logger: Logger = container.get<ILogger>(COMMON_TYPES.ILogger) as Logger;
    logger.init(ctx, "1");

    const functionService: IFunctionService<HttpRequestQuery> =
        container.get<IFunctionService<HttpRequestQuery>>(COMMON_TYPES.IFunctionService);
    const response: {[pokemons: string]: string[]} = await functionService.processMessageAsync(req.query);
    ctx.res = {
        body: response,
        status: 200,
        headers: { "Content-Type": "application/json" },
    };
    return ctx.res;
};

export default httpTrigger;
