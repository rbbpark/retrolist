import { Request, Response } from "express";
import { GetDeviceInput, GetDevicesInput } from "../schema/device/";
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
  return res.send(devices);
};

export const getDeviceByIdHandler = async (
  req: Request<GetDeviceInput>,
  res: Response
) => {
  const { id } = req.params;
  const device = await getDeviceById(id);
  return res.send(device);
};
