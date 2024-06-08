import Image from "next/image";
import amlanldrrmlogo from "@/images/amlanldrrmlogo.png";
import pnplogo from "@/images/pnplogo.png";
import bfplogo from "@/images/bfplogo.png";
import coastguardlogo from "@/images/coastguardlogo.png";
import ambulanceimg from "@/images/ambulanceimg.png"; // Importing the ambulance image

const emergencyServices = [
  {
    id: "amlandrrmo",
    logo: amlanldrrmlogo,
    name: "LDRRMO",
    width: 130,
    height: 120,
    numbers: ["09277397888", "09183771256"],
  },
  {
    id: "police",
    logo: pnplogo,
    name: "POLICE (PNP)",
    width: 100,
    height: 60,
    numbers: ["09176349162", "09985987503"],
  },
  {
    id: "fire",
    logo: bfplogo,
    name: "BFP",
    width: 130,
    height: 130,
    numbers: ["09178521591", "09198969974"],
  },
  {
    id: "coastguard",
    logo: coastguardlogo,
    name: "COAST GUARD",
    width: 120,
    height: 120,
    numbers: ["09300129076"],
  },
  {
    id: "ambulance1",
    logo: ambulanceimg,
    name: "AMBULANCE 1",
    width: 120,
    height: 120,
    numbers: ["09506547595", "0955777458"],
  },
  {
    id: "ambulance2",
    logo: ambulanceimg,
    name: "AMBULANCE 2",
    width: 120,
    height: 120,
    numbers: ["09506547601", "09533626203"],
  },
  {
    id: "ambulance3",
    logo: ambulanceimg,
    name: "AMBULANCE 3",
    width: 120,
    height: 120,
    numbers: ["09506547619", "09168303499"],
  },
];

export default function Page() {
  return (
    <div className="text-white space-y-4 items-center flex flex-col gap-1 place-items-center justify-start p-6 relative w-full h-fit ">
      <h1 className="text-2xl font-bold m-2">Amlan Emergency Hotlines</h1>
      {emergencyServices.map((service) => (
        <div
          key={service.id}
          className="bg-slate-700/20 rounded-2xl p-4 shadow-xl flex flex-row gap-4 items-center active:scale-95 transition-all duration-300"
        >
          <Image
            src={service.logo}
            alt={`${service.name} logo`}
            width={service.width}
            height={service.height}
          />
          <div className="flex flex-col text-2xl">
            <span>{service.name}</span>
            {service.numbers.map((number) => (
              <a
                key={number}
                href={`tel:${number}`}
                className="hover:underline"
              >
                {number}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
