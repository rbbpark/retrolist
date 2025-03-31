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
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { CompatibilityBadges } from "./compatibility-badges";
import { ControlBadges } from "./control-badges";
import { ConnectivityBadges } from "./connectivity-badges";

interface DeviceCardFullProps {
  device: DeviceFullView;
  className?: string;
}

export function DeviceCardFull({ device, className }: DeviceCardFullProps) {
  const releaseDate = new Date(device.release_date);
  const formattedDate = releaseDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const formattedPrice = device.price_high
    ? `$${device.price_low} - $${device.price_high}`
    : `$${device.price_low}`;

  return (
    <Card className={`w-[350px] ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-start gap-2">
          <CardDescription>{device.brand}</CardDescription>
          <CardTitle>
            <Link href={`/device/${device.id}`} className="hover:underline">
              {device.device_name}
            </Link>
          </CardTitle>
        </div>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-center">
          <Image
            src={`https://retrolist-images.s3.us-east-1.amazonaws.com/${device.image_id}.png`}
            width={150}
            height={150}
            quality={100}
            alt="Picture of the device"
            style={{ width: "auto", height: "150px", objectFit: "contain" }}
          />
        </div>

        <div className="ml-2 space-y-1">
          <div className="text-sm">
            <div>
              <span className="font-medium">Form Factor:</span>{" "}
              {device.form_factor}
            </div>
            <div>
              <span className="font-medium">Screen:</span>{" "}
              {device.screen_size_inches}" ({device.resolution})
            </div>
            <div>
              <span className="font-medium">Aspect Ratio:</span>{" "}
              {device.aspect_ratio}
            </div>
            <div>
              <span className="font-medium">Material:</span>{" "}
              {device.shell_material}
            </div>
          </div>

          {/* Emulation */}
          <div className="mt-2">
            <div className="mb-1 text-sm font-medium">Emulation:</div>
            <CompatibilityBadges
              gbc={device.gbc}
              nes={device.nes}
              genesis={device.genesis}
              gba={device.gba}
              snes={device.snes}
              psx={device.psx}
              nds={device.nds}
              n64={device.n64}
              dreamcast={device.dreamcast}
              psp={device.psp}
              saturn={device.saturn}
              ngc={device.ngc}
              wii={device.wii}
              n3ds={device.n3ds}
              ps2={device.ps2}
              wiiu={device.wiiu}
              switch={device.switch}
              ps3={device.ps3}
            />
          </div>

          {/* Control Features */}
          <div className="mt-2">
            <div className="mb-1 text-sm font-medium">Controls:</div>
            <ControlBadges
              hasAnalogs={device.has_analogs}
              hasDualAnalogs={device.has_dual_analogs}
              hasHallAnalogs={device.has_hall_analogs}
              hasL3R3={device.has_l3_r3}
              hasL2R2={device.has_l2_r2}
              hasAnalogTriggers={device.has_analog_triggers}
              hasShoulderButtons={device.has_shoulder_buttons}
            />
          </div>

          {/* Connectivity Features */}
          <div className="mt-2">
            <div className="mb-1 text-sm font-medium">Connectivity:</div>
            <ConnectivityBadges
              hasWifi={device.has_wifi}
              hasBt={device.has_bt}
              hasLte={device.has_lte}
              hasUsbOtg={device.has_usb_otg}
              hasThunderbolt={device.has_thunderbolt}
              hasVideoOutput={device.has_video_output ?? undefined}
              hasAudioOutput={device.has_audio_output}
              hasRumble={device.has_rumble ?? undefined}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <CardDescription className="text-lg font-semibold">
          {formattedPrice}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
