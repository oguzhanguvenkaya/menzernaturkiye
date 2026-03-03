import { getAllPageContents } from "@/db/queries";
import { FileText } from "lucide-react";
import { SayfalarClient } from "./sayfalar-client";

export default async function AdminSayfalarPage() {
  const contents = await getAllPageContents();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#1d1d1d] uppercase tracking-wider">
            Sayfalar
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sayfa iceriklerini yonetin
          </p>
        </div>
        <div className="w-10 h-10 bg-[#1d1d1d] flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
      </div>

      <SayfalarClient contents={contents} />
    </div>
  );
}
