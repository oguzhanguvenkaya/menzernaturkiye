"use client";

import { useState, useRef } from "react";
import type { PageContent } from "@/db/schema";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";
import { savePageContentAction, deletePageContentAction } from "./actions";

interface SayfalarClientProps {
  contents: PageContent[];
}

type EditingItem = {
  id: string;
  slug: string;
  section: string;
  title: string;
  body: string;
  image_url: string;
  order_index: number;
} | null;

export function SayfalarClient({ contents }: SayfalarClientProps) {
  const [editing, setEditing] = useState<EditingItem>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Group contents by slug
  const grouped: Record<string, PageContent[]> = {};
  for (const item of contents) {
    if (!grouped[item.slug]) {
      grouped[item.slug] = [];
    }
    grouped[item.slug].push(item);
  }

  function handleEdit(item: PageContent) {
    setEditing({
      id: item.id,
      slug: item.slug,
      section: item.section,
      title: item.title || "",
      body: item.body || "",
      image_url: item.image_url || "",
      order_index: item.order_index || 0,
    });
    // Scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleNew() {
    setEditing({
      id: "",
      slug: "",
      section: "",
      title: "",
      body: "",
      image_url: "",
      order_index: 0,
    });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleCancel() {
    setEditing(null);
  }

  return (
    <>
      {/* Action bar */}
      <div className="mb-4">
        <button
          onClick={handleNew}
          className="bg-[#e3000f] hover:bg-red-700 text-white px-4 py-2.5 font-bold uppercase tracking-widest text-xs transition-colors inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Yeni Icerik Ekle
        </button>
      </div>

      {/* Table */}
      {Object.keys(grouped).length === 0 ? (
        <div className="bg-white border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">Henuz sayfa icerigi bulunmuyor.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#002b3d] text-white">
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">
                  Sayfa
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">
                  Bolum
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">
                  Baslik
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider">
                  Sira
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider">
                  Islemler
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(grouped).map(([slug, items]) =>
                items.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      {idx === 0 ? (
                        <span className="font-bold text-[#002b3d] text-xs uppercase tracking-wider">
                          {slug}
                        </span>
                      ) : (
                        <span className="text-gray-300 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{item.section}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.title
                        ? item.title.length > 40
                          ? item.title.slice(0, 40) + "..."
                          : item.title
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {item.order_index ?? 0}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 text-gray-400 hover:text-[#002b3d] hover:bg-gray-100 transition-colors"
                          title="Duzenle"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <form
                          action={async () => {
                            await deletePageContentAction(item.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="p-1.5 text-gray-400 hover:text-[#e3000f] hover:bg-red-50 transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Inline edit / create form */}
      {editing !== null && (
        <div className="mt-8" id="edit-form">
          <form ref={formRef} action={savePageContentAction}>
            <div className="bg-white border border-gray-200">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-black text-[#002b3d] uppercase tracking-wider">
                  {editing.id ? "Icerigi Duzenle" : "Yeni Icerik"}
                </h2>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Hidden ID for updates */}
                {editing.id && (
                  <input type="hidden" name="id" value={editing.id} />
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                      Sayfa (slug)
                    </label>
                    <input
                      name="slug"
                      type="text"
                      defaultValue={editing.slug}
                      required
                      className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#e3000f] transition-colors bg-white"
                      placeholder="orn: hakkimizda"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                      Bolum (section)
                    </label>
                    <input
                      name="section"
                      type="text"
                      defaultValue={editing.section}
                      required
                      className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#e3000f] transition-colors bg-white"
                      placeholder="orn: hero"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Baslik
                  </label>
                  <input
                    name="title"
                    type="text"
                    defaultValue={editing.title}
                    className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#e3000f] transition-colors bg-white"
                    placeholder="Icerik basligi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                    Icerik
                  </label>
                  <textarea
                    name="body"
                    defaultValue={editing.body}
                    rows={5}
                    className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#e3000f] transition-colors bg-white resize-y"
                    placeholder="Sayfa icerigi..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                      Gorsel URL
                    </label>
                    <input
                      name="image_url"
                      type="text"
                      defaultValue={editing.image_url}
                      className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#e3000f] transition-colors bg-white"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                      Sira
                    </label>
                    <input
                      name="order_index"
                      type="number"
                      defaultValue={editing.order_index}
                      className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-[#e3000f] transition-colors bg-white"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-gray-100 flex items-center gap-3">
                <button
                  type="submit"
                  className="bg-[#e3000f] hover:bg-red-700 text-white px-6 py-2.5 font-bold uppercase tracking-widest text-xs transition-colors inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editing.id ? "Guncelle" : "Kaydet"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-2.5 font-bold uppercase tracking-widest text-xs transition-colors"
                >
                  Iptal
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
