import React from "react";
import { DeviceFullView } from "@retrolist/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DeviceCardFull({ device }: { device: DeviceFullView }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{device.device_name}</CardTitle>
        <CardDescription>{device.brand}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>{device.release_date}</CardDescription>
        <CardDescription>{device.price_low}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
