import { getAllSettingsRows } from "@/db/queries";
import type { SiteSetting } from "@/db/schema";
import { Settings, Save } from "lucide-react";
import { saveSettingsAction } from "./actions";

const SETTING_LABELS: Record<string, string> = {
  phone: "Telefon",
  email: "E-posta",
  address: "Adres",
  working_hours: "Calisma Saatleri",
  facebook_url: "Facebook URL",
  instagram_url: "Instagram URL",
  linkedin_url: "LinkedIn URL",
  youtube_url: "YouTube URL",
};

const SETTING_KEYS = [
  "phone",
  "email",
  "address",
  "working_hours",
  "facebook_url",
  "instagram_url",
  "linkedin_url",
  "youtube_url",
];

export default async function AdminAyarlarPage() {
  const rows = await getAllSettingsRows();
  const settingsMap: Record<string, string> = {};
  for (const row of rows) {
    settingsMap[row.key] = row.value;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#1d1d1d] uppercase tracking-wider">
            Ayarlar
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Site genelinde kullanilan ayarlar
          </p>
        </div>
        <div className="w-10 h-10 bg-[#1d1d1d] flex items-center justify-center">
          <Settings className="w-5 h-5 text-white" />
        </div>
      </div>

      <form action={saveSettingsAction}>
        <div className="bg-white border border-gray-200">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-sm font-black text-[#1d1d1d] uppercase tracking-wider">
              Iletisim Bilgileri
            </h2>
          </div>
          <div className="p-5 space-y-4">
            {SETTING_KEYS.slice(0, 4).map((key) => (
              <SettingField
                key={key}
                name={key}
                label={SETTING_LABELS[key] || key}
                value={settingsMap[key] || ""}
              />
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 mt-6">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-sm font-black text-[#1d1d1d] uppercase tracking-wider">
              Sosyal Medya
            </h2>
          </div>
          <div className="p-5 space-y-4">
            {SETTING_KEYS.slice(4).map((key) => (
              <SettingField
                key={key}
                name={key}
                label={SETTING_LABELS[key] || key}
                value={settingsMap[key] || ""}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-[#af1d1f] hover:bg-red-700 text-white px-6 py-2.5 font-bold uppercase tracking-widest text-sm transition-colors inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}

function SettingField({
  name,
  label,
  value,
}: {
  name: string;
  label: string;
  value: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        defaultValue={value}
        className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#af1d1f] transition-colors bg-white"
        placeholder={label}
      />
    </div>
  );
}
