"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Trash2, Loader2, ImageIcon } from "lucide-react";
import { savePageContentAction } from "@/app/admin/sayfalar/actions";
import type { PageContent } from "@/db/schema";

interface ImageSlotConfig {
  slug: string;
  section: string;
  label: string;
  accent: string;
}

interface ImageGroupConfig {
  title: string;
  description: string;
  slots: ImageSlotConfig[];
  columns?: number;
}

const IMAGE_GROUPS: ImageGroupConfig[] = [
  {
    title: "Anasayfa Gorselleri",
    description: "Ana sayfadaki hero banner, fabrika ve kategori kart gorsellerini yonetin.",
    columns: 2,
    slots: [
      { slug: "anasayfa", section: "hero-left", label: "Hero Sol (Endustriyel)", accent: "#af1d1f" },
      { slug: "anasayfa", section: "hero-right", label: "Hero Sag (Arac Cila)", accent: "#af1d1f" },
      { slug: "anasayfa", section: "factory", label: "Fabrika Gorseli", accent: "#1d1d1d" },
      { slug: "anasayfa", section: "cat-endustriyel", label: "Kategori: Endustriyel", accent: "#af1d1f" },
      { slug: "anasayfa", section: "cat-arac", label: "Kategori: Arac Bakim", accent: "#af1d1f" },
      { slug: "anasayfa", section: "cat-marin", label: "Kategori: Marin", accent: "#006b52" },
    ],
  },
  {
    title: "Kategori Sayfalari",
    description: "Kategori sayfalarinin ust kisimlarindaki arka plan gorsellerini yonetin.",
    columns: 3,
    slots: [
      { slug: "arac-bakim", section: "hero", label: "Arac Bakim", accent: "#af1d1f" },
      { slug: "endustriyel", section: "hero", label: "Endustriyel", accent: "#af1d1f" },
      { slug: "marin", section: "hero", label: "Marin", accent: "#006b52" },
    ],
  },
  {
    title: "Kurumsal Sayfalar",
    description: "Hakkimizda, Egitim ve SSS sayfalarinin banner gorsellerini yonetin.",
    columns: 3,
    slots: [
      { slug: "hakkimizda", section: "hero", label: "Hakkimizda", accent: "#af1d1f" },
      { slug: "egitim", section: "hero", label: "Egitim Programi", accent: "#af1d1f" },
      { slug: "sss", section: "hero", label: "SSS", accent: "#af1d1f" },
    ],
  },
];

interface HeroImageManagerProps {
  heroContents: PageContent[];
}

export function HeroImageManager({ heroContents }: HeroImageManagerProps) {
  return (
    <div className="space-y-10 mb-10">
      {IMAGE_GROUPS.map((group) => (
        <div key={group.title}>
          <h2 className="text-sm font-black text-[#1d1d1d] uppercase tracking-wider mb-1">
            {group.title}
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            {group.description}
          </p>
          <div className={`grid grid-cols-1 gap-4 ${
            group.columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
          }`}>
            {group.slots.map((slot) => {
              const existing = heroContents.find(
                (c) => c.slug === slot.slug && c.section === slot.section
              );
              return (
                <ImageCard
                  key={`${slot.slug}-${slot.section}`}
                  slot={slot}
                  content={existing}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ImageCard({
  slot,
  content,
}: {
  slot: ImageSlotConfig;
  content?: PageContent;
}) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(content?.image_url || "");
  const [saving, setSaving] = useState(false);
  const [contentId, setContentId] = useState(content?.id || "");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Upload basarisiz");
      const { url } = await res.json();
      setImageUrl(url);
      await saveToDb(url);
    } catch (e) {
      console.error(e);
      alert("Gorsel yuklenemedi");
    } finally {
      setUploading(false);
    }
  }

  async function saveToDb(url: string) {
    setSaving(true);
    try {
      const fd = new FormData();
      if (contentId) fd.append("id", contentId);
      fd.append("slug", slot.slug);
      fd.append("section", slot.section);
      fd.append("title", slot.label);
      fd.append("image_url", url);
      fd.append("order_index", "0");
      await savePageContentAction(fd);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    if (!imageUrl) return;
    setSaving(true);
    try {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl }),
        credentials: "include",
      });
      setImageUrl("");
      await saveToDb("");
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  }

  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="h-1" style={{ backgroundColor: slot.accent }} />
      <div className="p-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#1d1d1d] mb-3">
          {slot.label}
        </h3>

        {imageUrl ? (
          <div className="relative group">
            <div className="aspect-[16/7] relative bg-gray-100 overflow-hidden">
              <Image
                src={imageUrl}
                alt={slot.label}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading || saving}
                  className="bg-white text-[#1d1d1d] p-2 hover:bg-gray-100 transition-colors"
                  title="Degistir"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRemove}
                  disabled={uploading || saving}
                  className="bg-[#af1d1f] text-white p-2 hover:bg-red-700 transition-colors"
                  title="Kaldir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {(uploading || saving) && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className="aspect-[16/7] border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-gray-50"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            ) : (
              <>
                <ImageIcon className="w-8 h-8 text-gray-300" />
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  Gorsel Yukle
                </span>
              </>
            )}
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={onFileChange}
        />
      </div>
    </div>
  );
}
