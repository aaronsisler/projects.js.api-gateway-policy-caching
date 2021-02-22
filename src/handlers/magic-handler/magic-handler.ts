import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
} from "aws-lambda";
import { HealthService } from "../../services/health-service";
import { HandlerResponse } from "../../models/handler-response";
import { Health } from "../../models/health";
import { responseBodyBuilder } from "../../utils/response-body-builder";

const magic: APIGatewayProxyHandler = (
  _event: APIGatewayProxyEvent,
  _context: Context,
  callback: Callback<APIGatewayProxyResult>
) => {
  console.log("Event: " + new Date().toTimeString());
  console.log(_event);
  console.log(_event.requestContext.authorizer.principalId);
  const healthStatus: Health = new HealthService().getHealth();
  const response: HandlerResponse = responseBodyBuilder({
    statusCode: 200,
    body: healthStatus,
  });

  callback(null, response);
};

export { magic };
