import { DeviceCompactView } from "@retrolist/shared";
import Link from "next/link";
import Image from "next/image";

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
    <Link
      href={`/device/${device.id}`}
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
      <div className="flex flex-1 flex-col p-2">
        <h3 className="text-lg font-semibold">{device.device_name}</h3>
        <p className="text-sm text-gray-600">{device.brand}</p>
        <div className="mt-2 space-y-1 text-sm text-gray-500">
          <p>{device.form_factor}</p>
          <p>{device.screen_size_inches}" screen</p>
          <p>{formattedDate}</p>
          <p>
            ${device.price_low}
            {device.price_high ? ` - $${device.price_high}` : ""}
          </p>
        </div>
      </div>
    </Link>
  );
}
