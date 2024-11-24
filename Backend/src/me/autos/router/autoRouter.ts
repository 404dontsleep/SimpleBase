import { Router } from "express";
import RouterModel from "../../models/router.model";
import PermissionModel from "../../models/permission.model";
import { findOrCreatePermission } from "../../middlewares/permission.middleware";

export default async function autoRouter(router: Router) {
  const root = await findOrCreatePermission("root", "Root permission");
  await findOrCreatePermission("guest", "Guest permission");
  await findOrCreatePermission("default", "Default permission");

  const routes = routerToJson(router);
  for (const route of routes) {
    await autoLoad(route, root._id);
  }
}

async function autoLoad(router: RouteDefinition, parent?: string) {
  const route = await RouterModel.findOne({
    path: router.path,
    method: router.method,
  });
  if (route) {
    router.children.forEach(async (child) => {
      await autoLoad(child, route.permission);
    });
  } else {
    const permission = await PermissionModel.create({
      name: `[${router.method}] ${router.path}`,
    });
    if (parent) {
      await PermissionModel.updateOne(
        { _id: parent },
        { $push: { children: permission._id } }
      );
    }
    console.log("Create permission", permission.name);
    const route = await RouterModel.create({
      path: router.path,
      method: router.method,
      permission: permission._id,
    });
    console.log("Create router", route.method, route.path);
    router.children.forEach(async (child) => {
      await autoLoad(child, permission._id);
    });
  }
}
interface RouteDefinition {
  path: string;
  method: string;
  children: RouteDefinition[];
}
function routerToJson(router: Router, basePath = ""): RouteDefinition[] {
  const result: RouteDefinition[] = [];

  (router.stack || []).forEach((layer: any) => {
    if (layer.route) {
      const path = basePath + layer.route.path;
      layer.route.stack.forEach((routeLayer: any) => {
        result.push({
          path,
          method: routeLayer.method.toUpperCase(),
          children: [],
        });
      });
    } else if (layer.name === "router" && layer.handle.stack) {
      const nestedBasePath =
        basePath +
        layer.regexp.source.replace("^\\", "").replace("\\/?(?=\\/|$)", "");
      result.push({
        path: nestedBasePath,
        method: "USE",
        children: routerToJson(layer.handle, nestedBasePath),
      });
    }
  });

  return result;
}
