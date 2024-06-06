import Image from "next/image";
import amlanldrrmlogo from "@/images/amlanldrrmlogo.png";
import pnplogo from "@/images/pnplogo.png";
import bfplogo from "@/images/bfplogo.png";
import coastguardlogo from "@/images/coastguardlogo.png";

export default function Page() {
  return (
    <div className="text-white space-y-4 items-center flex flex-col gap-1 place-items-center justify-start p-6 relative w-full h-fit ">
      <h1 className="text-2xl font-bold m-2">Amlan Emergency Hotlines</h1>
      <a href="tel:09659074227" className="m-2">
        <button className="hover:bg-orange-600 py-2 px-4 flex flex-row items-start space-x-2 bg-orange-500 transform active:scale-95 transition-transform text-lg text-white font-bold text-center cursor-pointer rounded-3xl w-70 h-30">
          <Image
            src={amlanldrrmlogo}
            alt="AMLAN LDRRMO logo"
            width={120}
            height={120}
          />
          <div className="flex flex-col text-2xl">
            <span>AMLAN LDRRMO</span>
            <p>09659074227</p>
            <p>09659074227</p>
          </div>
        </button>
      </a>
      <a href="tel:09659074227" className="m-2">
        <button className="hover:bg-blue-950/65 py-2 px-4 flex flex-row items-start space-x-16 bg-blue-800/85 transform active:scale-95 transition-transform text-lg text-white font-bold text-center cursor-pointer rounded-3xl w-70 h-30">
          <Image src={pnplogo} alt="Police logo" width={100} height={90} />
          <div className="flex flex-col text-2xl">
            <span>POLICE (PNP)</span>
            <p>09659074227</p>
            <p>09659074227</p>
          </div>
        </button>
      </a>
      <a href="tel:09659074227" className="m-2">
        <button className="hover:bg-slate-600 py-1 px-4 flex flex-row items-start space-x-6 bg-slate-300/85 transform active:scale-95 transition-transform text-lg text-white font-bold text-center cursor-pointer rounded-3xl w-[350px] h-30">
          <Image
            src={bfplogo}
            alt="Bureau of Fire Protection logo"
            width={120}
            height={120}
          />
          <div className="flex flex-col text-2xl">
            <span>BUREAU OF FIRE PROTECTION</span>
            <p>09659074227</p>
            <p>09659074227</p>
          </div>
        </button>
      </a>
      <a href="tel:09659074227" className="m-2">
        <button className="hover:bg-red-600 py-2 px-4 flex flex-row items-start space-x-8 bg-red-500/85 transform active:scale-95 transition-transform text-lg text-white font-bold text-center cursor-pointer rounded-3xl w-70 h-30">
          <Image
            src={coastguardlogo}
            alt="Coast Guard logo"
            width={130}
            height={130}
          />
          <div className="flex flex-col text-2xl">
            <span>COAST GUARD</span>
            <p>09659074227</p>
            <p>09659074227</p>
          </div>
        </button>
      </a>
    </div>
  );
}
