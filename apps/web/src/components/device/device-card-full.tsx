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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";

interface DeviceCardFullProps {
  device: DeviceFullView;
  className?: string;
}

const getCompatibilityColor = (rating: number) => {
  if (rating >= 4) return "bg-green-500";
  if (rating >= 3) return "bg-yellow-500";
  if (rating >= 2) return "bg-orange-500";
  return "bg-red-500";
};

export function DeviceCardFull({ device, className }: DeviceCardFullProps) {
  const releaseDate = new Date(device.release_date);
  const formattedDate = releaseDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const formattedPrice = device.price_high
    ? `$${device.price_low} - $${device.price_high}`
    : `$${device.price_low}`;

  const compatibilityRatings = [
    { name: "GBC", rating: device.gbc },
    { name: "NES", rating: device.nes },
    { name: "Genesis", rating: device.genesis },
    { name: "GBA", rating: device.gba },
    { name: "SNES", rating: device.snes },
    { name: "PSX", rating: device.psx },
    { name: "NDS", rating: device.nds },
    { name: "N64", rating: device.n64 },
    { name: "Dreamcast", rating: device.dreamcast },
    { name: "PSP", rating: device.psp },
    { name: "Saturn", rating: device.saturn },
    { name: "NGC", rating: device.ngc },
    { name: "Wii", rating: device.wii },
    { name: "3DS", rating: device.n3ds },
    { name: "PS2", rating: device.ps2 },
    { name: "WiiU", rating: device.wiiu },
    { name: "Switch", rating: device.switch },
    { name: "PS3", rating: device.ps3 },
  ].filter(({ rating }) => rating > 0);

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
            <div className="flex flex-wrap gap-1">
              <TooltipProvider>
                {compatibilityRatings.map(({ name, rating }) => (
                  <Tooltip key={name}>
                    <TooltipTrigger asChild>
                      <Badge
                        variant="secondary"
                        className={`${getCompatibilityColor(rating)} text-white`}
                      >
                        {name}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Compatibility Rating: {rating}/5</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>

          {/* Control Features */}
          <div className="mt-2">
            <div className="mb-1 text-sm font-medium">Controls:</div>
            <div className="flex flex-wrap gap-1">
              {device.has_analogs && <Badge variant="secondary">Analog</Badge>}
              {device.has_dual_analogs && (
                <Badge variant="secondary">Dual Analog</Badge>
              )}
              {device.has_hall_analogs && (
                <Badge variant="secondary">Hall Effect</Badge>
              )}
              {device.has_l3_r3 && <Badge variant="secondary">L3/R3</Badge>}
              {device.has_l2_r2 && <Badge variant="secondary">L2/R2</Badge>}
              {device.has_analog_triggers && (
                <Badge variant="secondary">Analog Triggers</Badge>
              )}
              {device.has_shoulder_buttons && (
                <Badge variant="secondary">Shoulder Buttons</Badge>
              )}
            </div>
          </div>

          {/* Connectivity Features */}
          <div className="mt-2">
            <div className="mb-1 text-sm font-medium">Connectivity:</div>
            <div className="flex flex-wrap gap-1">
              {device.has_wifi && <Badge variant="secondary">Wi-Fi</Badge>}
              {device.has_bt && <Badge variant="secondary">Bluetooth</Badge>}
              {device.has_lte && <Badge variant="secondary">LTE</Badge>}
              {device.has_usb_otg && <Badge variant="secondary">USB OTG</Badge>}
              {device.has_thunderbolt && (
                <Badge variant="secondary">Thunderbolt</Badge>
              )}
              {device.has_video_output && (
                <Badge variant="secondary">Video Output</Badge>
              )}
              {device.has_audio_output && (
                <Badge variant="secondary">Audio Output</Badge>
              )}
              {device.has_rumble && <Badge variant="secondary">Rumble</Badge>}
            </div>
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
