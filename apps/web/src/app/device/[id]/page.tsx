import { fetchDeviceById } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetchDeviceById(params.id);
  console.log(response);
  return <p>Device</p>;
}
