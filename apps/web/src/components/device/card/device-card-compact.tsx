import { DeviceCompactView } from "@retrolist/shared";
import Link from "next/link";
import Image from "next/image";

interface DeviceCardCompactProps {
  device: DeviceCompactView;
}

export function DeviceCardCompact({ device }: DeviceCardCompactProps) {
  return (
    <Link
      href={`/devices/${device.id}`}
      className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
    >
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
      <div className="flex flex-1 flex-col">
        <h3 className="text-lg font-semibold">{device.device_name}</h3>
        <p className="text-sm text-gray-600">{device.brand}</p>
        <p className="text-sm text-gray-500">
          {device.form_factor} • {device.screen_size_inches}" • $
          {device.price_low}
          {device.price_high ? ` - $${device.price_high}` : ""}
        </p>
      </div>
    </Link>
  );
}
