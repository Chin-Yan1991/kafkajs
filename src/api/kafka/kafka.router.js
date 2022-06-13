import { routeMatrixInterface } from "../routeMatrix";
import CONSTANTS from "../../helper/constant";
import res from "../../helper/response";

import { subscribeSchema, onlineUserSchema } from "./pushApi.schema";
import { subscribe, fetchOnlineUser } from "./pushApi.controllers";

const pushApiRouteMatrix = {
    Group: "/kafka",
    Description: "Server Sent Event endpoint",
    Routes: [
        {
            method: "GET",
            path: "/subscribe",
            schema: subscribeSchema,
            controller: subscribe,
            userRolePermission: [CONSTANTS.PERMISSION.EVERYONE],
            protection: CONSTANTS.PROTECTION.UNPROTECTED,
            description: "subscribe data stream",
            sampleResponse: res.success("Server Sent Event Subscribed Successfully", {})
        },{
            method: "GET",
            path: "/onlineUser",
            schema: onlineUserSchema,
            controller: fetchOnlineUser,
            userRolePermission: [CONSTANTS.PERMISSION.EVERYONE],
            protection: CONSTANTS.PROTECTION.UNPROTECTED,
            description: "fetch all online user",
            sampleResponse: res.success("Fetch Online Users Successfully", {})
        },
    ]
}

module.exports = pushApiRouteMatrix;
