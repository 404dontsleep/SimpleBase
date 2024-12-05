import { Router } from "express";
import findAll from "./permission.findAll";
import deletePermission from "./permission.delete";
import createPermission from "./permission.create";
import updatePermission from "./permission.update";

const AdminPermissionRouter = Router();

AdminPermissionRouter.post("/findAll", findAll);
AdminPermissionRouter.post("/delete", deletePermission);
AdminPermissionRouter.post("/create", createPermission);
AdminPermissionRouter.post("/update", updatePermission);

export default AdminPermissionRouter;
