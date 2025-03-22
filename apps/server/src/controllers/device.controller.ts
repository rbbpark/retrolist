import { Request, Response } from "express";
import { GetDevicesInput } from "../schema/device.schema";
import { getDevices } from "../services/device.service";

export const getDevicesHandler = async (req: Request, res: Response) => {
  const query = req.query as unknown as GetDevicesInput["query"];
  const { page, page_size } = query;
  const devices = await getDevices({ page, page_size });
  return res.send(devices);
};
