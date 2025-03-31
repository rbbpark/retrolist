import { DeviceCompactView } from "@retrolist/shared";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DeviceCardCompactProps {
  device: DeviceCompactView;
}

export function DeviceCardCompact({ device }: DeviceCardCompactProps) {
  const releaseDate = new Date(device.release_date);
  const formattedDate = releaseDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <Link href={`/device/${device.id}`}>
      <Card className="hover:bg-accent transition-colors">
        <CardHeader className="space-y-0">
          <div className="space-y-0.5">
            <h3 className="text-lg leading-none font-semibold">
              {device.device_name}
            </h3>
            <p className="text-muted-foreground text-sm">{device.brand}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center pb-4">
            <Image
              src={`https://retrolist-images.s3.us-east-1.amazonaws.com/${device.image_id}.png`}
              height={150}
              width={150}
              className="rounded-md object-contain"
              alt="Picture of the device"
              style={{
                height: "150px",
                width: "150px",
                objectFit: "contain",
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">{device.form_factor}</Badge>
            <Badge variant="secondary">{device.screen_size_inches}"</Badge>
            <Badge variant="secondary">{formattedDate}</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-lg font-semibold">
            ${device.price_low}
            {device.price_high ? ` - $${device.price_high}` : ""}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
