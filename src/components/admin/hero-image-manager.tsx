"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Trash2, Loader2, ImageIcon } from "lucide-react";
import { savePageContentAction } from "@/app/admin/sayfalar/actions";
import type { PageContent } from "@/db/schema";

interface CategoryHeroConfig {
  slug: string;
  label: string;
  accent: string;
}

const CATEGORIES: CategoryHeroConfig[] = [
  { slug: "arac-bakim", label: "Arac Bakim", accent: "#af1d1f" },
  { slug: "endustriyel", label: "Endustriyel", accent: "#af1d1f" },
  { slug: "marin", label: "Marin", accent: "#006b52" },
];

interface HeroImageManagerProps {
  heroContents: PageContent[];
}

export function HeroImageManager({ heroContents }: HeroImageManagerProps) {
  return (
    <div className="mb-10">
      <h2 className="text-sm font-black text-[#1d1d1d] uppercase tracking-wider mb-4">
        Kategori Hero Gorselleri
      </h2>
      <p className="text-xs text-gray-500 mb-6">
        Kategori sayfalarinin ust kisimlarindaki arka plan gorsellerini buradan yonetin.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const existing = heroContents.find(
            (c) => c.slug === cat.slug && c.section === "hero"
          );
          return (
            <HeroCard key={cat.slug} category={cat} content={existing} />
          );
        })}
      </div>
    </div>
  );
}

function HeroCard({
  category,
  content,
}: {
  category: CategoryHeroConfig;
  content?: PageContent;
}) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(content?.image_url || "");
  const [saving, setSaving] = useState(false);
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
      // Auto-save to DB
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
      if (content?.id) fd.append("id", content.id);
      fd.append("slug", category.slug);
      fd.append("section", "hero");
      fd.append("title", category.label + " Hero");
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
      // Delete from blob
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl }),
        credentials: "include",
      });
      setImageUrl("");
      // Save empty to DB
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
      <div
        className="h-1"
        style={{ backgroundColor: category.accent }}
      />
      <div className="p-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#1d1d1d] mb-3">
          {category.label}
        </h3>

        {imageUrl ? (
          <div className="relative group">
            <div className="aspect-[16/7] relative bg-gray-100 overflow-hidden">
              <Image
                src={imageUrl}
                alt={category.label}
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
