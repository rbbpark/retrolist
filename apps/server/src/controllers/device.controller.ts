import { Request, Response } from "express";
import { GetDeviceInput, GetDevicesInput } from "../schema/device.schema";
import { getDevices, getDeviceById } from "../services/device.service";

export const getDevicesHandler = async (req: Request, res: Response) => {
  const query = req.query as unknown as GetDevicesInput;
  const { page, page_size, detail, search, sort_by, order, filters } = query;
  const devices = await getDevices({
    page,
    page_size,
    detail,
    search,
    sort_by,
    order,
    filters,
  });
  console.log(devices);
  return res.send(devices);
};

export const getDeviceByIdHandler = async (
  req: Request<GetDeviceInput>,
  res: Response
) => {
  const { id } = req.params;
  const device = await getDeviceById(id);
  if (!device) {
    return res.status(404).send({ message: "Route not found" });
  }
  return res.send(device);
};
