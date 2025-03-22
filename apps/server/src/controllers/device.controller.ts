import { Request, Response } from "express";
import { GetDevicesInput } from "../schema/device.schema";
import { getDevices } from "../services/device.service";

export const getDevicesHandler = async (req: Request, res: Response) => {
  const query = req.query as unknown as GetDevicesInput;
  const { page, page_size, search, sort_by, order } = query;
  console.log(query);
  const devices = await getDevices({ page, page_size, search, sort_by, order });
  return res.send(devices);
};
