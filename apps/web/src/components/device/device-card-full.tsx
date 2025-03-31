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
import Image from "next/image";

export function DeviceCardFull({ device }: { device: DeviceFullView }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{device.device_name}</CardTitle>
        <CardDescription>{device.brand}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <Image
            src={`https://retrolist-images.s3.us-east-1.amazonaws.com/${device.image_id}.png`}
            width={150}
            height={150}
            quality={100}
            alt="Picture of the device"
            style={{ width: "auto", height: "150px", objectFit: "contain" }}
          />
        </div>

        <CardDescription>{device.release_date}</CardDescription>
        <CardDescription>{device.price_low}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
