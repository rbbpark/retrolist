import { fetchDeviceById } from "@/lib/data";
import { Device } from "@retrolist/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { BackButton } from "@/components/layout/back-button";
import { CompatibilityBadges } from "@/components/device/badge/compatibility-badges";
import { ControlBadges } from "@/components/device/badge/control-badges";
import { ConnectivityBadges } from "@/components/device/badge/connectivity-badges";

export default async function Page({ params }: { params: { id: string } }) {
  const device: Device = await fetchDeviceById(params.id);

  return (
    <div className="container mx-auto space-y-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton />
        <Badge variant="secondary" className="text-2xl">
          {device.brand}
        </Badge>
        <h1 className="text-4xl font-bold">{device.device_name}</h1>
      </div>

      {/* About Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-row justify-center gap-16">
            <div className="flex justify-center">
              <Image
                src={`https://retrolist-images.s3.us-east-1.amazonaws.com/${device.image_id}.png`}
                width={300}
                height={300}
                quality={100}
                alt="Picture of the device"
                style={{
                  width: "300px",
                  maxHeight: "300px",
                  objectFit: "contain",
                  height: "auto",
                }}
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <div className="space-y-2">
                <Label>Form Factor</Label>
                <Badge variant="secondary" className="text-lg">
                  {device.form_factor}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label>Release Date</Label>
                <Badge variant="secondary" className="text-lg">
                  {new Date(device.release_date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label>Price Range</Label>
                <Badge variant="secondary" className="text-lg">
                  ${device.price_low}
                  {device.price_high && ` - $${device.price_high}`}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emulation Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle>Emulation Capabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
            {device.emulation_desc && (
              <div className="mt-4">
                <h3 className="mb-2 font-semibold">Additional Notes</h3>
                <p>{`"${device.emulation_desc}"`}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* System Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>System Specifications</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="mb-2 font-semibold">Operating System</h3>
            <p>{device.os_raw}</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Storage</h3>
            <p>{device.storage_raw}</p>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Controls</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="mb-2 font-semibold">Input Methods</h3>
            <div className="my-2">
              <ControlBadges
                hasAnalogs={device.has_analogs}
                hasDualAnalogs={device.has_dual_analogs}
                hasHallAnalogs={device.has_hall_analogs}
                hasL3R3={device.has_l3_r3}
                hasL2R2={device.has_l2_r2}
                hasAnalogTriggers={device.has_analog_triggers}
                hasShoulderButtons={device.has_shoulder_buttons}
                hasRumble={device.has_rumble ?? false}
              />
            </div>
            <p>D-Pad: {device.dpad_raw}</p>
            <p>Face Buttons: {device.face_buttons}</p>
            {device.analogs_raw && <p>Analog Controls: {device.analogs_raw}</p>}
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Additional Controls</h3>
            {device.shoulder_buttons_raw && (
              <p>Shoulder Buttons: {device.shoulder_buttons_raw}</p>
            )}
            {device.extra_buttons_raw && (
              <p>Extra Buttons: {device.extra_buttons_raw}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Display Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Display</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="mb-2 font-semibold">Screen</h3>
            <p>
              {device.screen_size_inches}" {device.screen_type}
            </p>
            <p>Resolution: {device.resolution}</p>
            <p>PPI: {device.ppi}</p>
            {device.aspect_ratio && <p>Aspect Ratio: {device.aspect_ratio}</p>}
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Additional Display Features</h3>
            {device.screen_lens && <p>Screen Lens: {device.screen_lens}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Hardware Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Hardware</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="mb-2 font-semibold">Processor</h3>
            {device.chipset && <p>Chipset: {device.chipset}</p>}
            {device.cpu_model && <p>CPU: {device.cpu_model}</p>}
            {device.cpu_cores && <p>Cores: {device.cpu_cores}</p>}
            {device.cpu_threads && <p>Threads: {device.cpu_threads}</p>}
            {device.cpu_clock && <p>Clock Speed: {device.cpu_clock}</p>}
            {device.cpu_arch && <p>Architecture: {device.cpu_arch}</p>}
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Graphics & Memory</h3>
            {device.gpu_model && <p>GPU: {device.gpu_model}</p>}
            {device.gpu_cores && <p>GPU Cores: {device.gpu_cores}</p>}
            {device.gpu_clock && <p>GPU Clock: {device.gpu_clock}</p>}
            {device.ram_gb && <p>RAM: {device.ram_gb}GB</p>}
          </div>
        </CardContent>
      </Card>

      {/* Connectivity */}
      <Card>
        <CardHeader>
          <CardTitle>Connectivity</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Available Connections</h3>
            <div className="my-2">
              <ConnectivityBadges
                hasWifi={device.has_wifi}
                hasBt={device.has_bt}
                hasLte={device.has_lte}
                hasUsbOtg={device.has_usb_otg}
                hasThunderbolt={device.has_thunderbolt}
                hasVideoOutput={device.has_video_output ?? false}
                hasAudioOutput={device.has_audio_output}
                hasDualExternalSD={device.has_dual_external_sd}
              />
            </div>
            <h3 className="font-semibold">Notes</h3>
            {device.connectivity_raw && <p>{`"${device.connectivity_raw}"`}</p>}
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Additional Connectivity</h3>
            {device.charge_port_raw && (
              <p className="mt-2">Charging Port: {device.charge_port_raw}</p>
            )}
            {device.video_output_raw && (
              <p className="mt-2">Video Output: {device.video_output_raw}</p>
            )}
            {device.audio_output_raw && (
              <p className="mt-2">Audio Output: {device.audio_output_raw}</p>
            )}
            {device.speaker_raw && (
              <p className="mt-2">Speakers: {device.speaker_raw}</p>
            )}
            {device.sensors_raw && (
              <p className="mt-2">Sensors: {device.sensors_raw}</p>
            )}
            {device.volume_desc && (
              <p className="mt-2">Volume Controls: {device.volume_desc}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Physical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Physical Specifications</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="mb-2 font-semibold">Dimensions & Weight</h3>
            {device.dimensions_mm && <p>Dimensions: {device.dimensions_mm}</p>}
            {device.weight_g && <p>Weight: {device.weight_g}g</p>}
            <p>Material: {device.shell_material}</p>
            <p>Colors: {device.color_options}</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Battery & Cooling</h3>
            <p>Battery: {device.battery_capacity}</p>
            {device.has_cooling && <p>Cooling: {device.cooling_raw}</p>}
          </div>
        </CardContent>
      </Card>
      {/* Reviews */}
      {device.reviews && (
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {device.reviews.split(" ").map((url, index) => {
                // Extract video ID from YouTube URL
                const videoId = url.split("v=")[1];
                if (!videoId) return null;

                return (
                  <div key={index} className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`Review video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
