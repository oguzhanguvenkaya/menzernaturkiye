"use client";

import { useActionState } from "react";
import { saveProductAction } from "@/app/admin/urunler/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2 } from "lucide-react";
import type { Product } from "@/db/schema";
import GalleryManager, { type SizeVariantInfo } from "./gallery-manager";

interface ProductFormProps {
  product?: Product;
  gallery?: string[];
  sizeVariants?: SizeVariantInfo[];
}

const MAIN_CATEGORIES = [
  { value: "DIŞ YÜZEY", label: "Araç Bakım (DIŞ YÜZEY)" },
  { value: "ENDÜSTRİYEL", label: "Endüstriyel" },
  { value: "MARİN", label: "Marin" },
  { value: "AKSESUAR", label: "Aksesuar" },
  { value: "MAKİNE-EKİPMAN", label: "Makine-Ekipman" },
];

export default function ProductForm({ product, gallery = [], sizeVariants = [] }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(saveProductAction, {
    success: false,
    error: "",
  });

  const cat = product?.category as any;
  const content = product?.content as any;
  const tf = product?.template_fields as any;

  return (
    <form action={formAction} className="space-y-8">
      {/* Hidden ID for edit mode */}
      {product?.id && <input type="hidden" name="id" value={product.id} />}

      {/* Error message */}
      {state.error && (
        <div className="bg-red-50 border border-[#af1d1f] p-4 text-sm text-[#af1d1f] font-medium">
          {state.error}
        </div>
      )}

      {/* Section: Temel Bilgiler */}
      <fieldset className="border border-gray-200 bg-white p-6">
        <legend className="text-sm font-black uppercase tracking-wider text-[#1d1d1d] px-2">
          Temel Bilgiler
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="sku"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              SKU *
            </Label>
            <Input
              id="sku"
              name="sku"
              required
              defaultValue={product?.sku || ""}
              placeholder="ornek: MZ-1000"
              className="rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="product_name"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Urun Adi *
            </Label>
            <Input
              id="product_name"
              name="product_name"
              required
              defaultValue={product?.product_name || ""}
              placeholder="Urun adini girin"
              className="rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="barcode"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Barkod
            </Label>
            <Input
              id="barcode"
              name="barcode"
              defaultValue={product?.barcode || ""}
              placeholder="Barkod numarasi"
              className="rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="brand"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Marka
            </Label>
            <Input
              id="brand"
              name="brand"
              defaultValue={product?.brand || "MENZERNA"}
              className="rounded-none"
            />
          </div>

        </div>
      </fieldset>

      {/* Section: Gorseller */}
      <fieldset className="border border-gray-200 bg-white p-6">
        <legend className="text-sm font-black uppercase tracking-wider text-[#1d1d1d] px-2">
          Gorseller
        </legend>
        <div className="mt-4">
          <GalleryManager images={gallery} sizeVariants={sizeVariants} />
        </div>
      </fieldset>

      {/* Section: Kategori */}
      <fieldset className="border border-gray-200 bg-white p-6">
        <legend className="text-sm font-black uppercase tracking-wider text-[#1d1d1d] px-2">
          Kategori
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="main_cat"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Ana Kategori *
            </Label>
            <select
              id="main_cat"
              name="main_cat"
              required
              defaultValue={cat?.main_cat || ""}
              className="flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Secin...</option>
              {MAIN_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="sub_cat"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Alt Kategori
            </Label>
            <Input
              id="sub_cat"
              name="sub_cat"
              defaultValue={cat?.sub_cat || ""}
              placeholder="Alt kategori"
              className="rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="sub_cat2"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Alt Kategori 2
            </Label>
            <Input
              id="sub_cat2"
              name="sub_cat2"
              defaultValue={cat?.sub_cat2 || ""}
              placeholder="Alt kategori 2"
              className="rounded-none"
            />
          </div>
        </div>
      </fieldset>

      {/* Section: Icerik */}
      <fieldset className="border border-gray-200 bg-white p-6">
        <legend className="text-sm font-black uppercase tracking-wider text-[#1d1d1d] px-2">
          Icerik
        </legend>
        <div className="space-y-4 mt-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="short_description"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Kisa Aciklama
            </Label>
            <Textarea
              id="short_description"
              name="short_description"
              defaultValue={content?.short_description || ""}
              rows={2}
              placeholder="Urunun kisa aciklamasi..."
              className="rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="full_description"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Detayli Aciklama
            </Label>
            <Textarea
              id="full_description"
              name="full_description"
              defaultValue={content?.full_description || ""}
              rows={5}
              placeholder="Urunun detayli aciklamasi..."
              className="rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="how_to_use"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Nasil Kullanilir
            </Label>
            <Textarea
              id="how_to_use"
              name="how_to_use"
              defaultValue={content?.how_to_use || ""}
              rows={3}
              placeholder="Kullanim talimatlari..."
              className="rounded-none"
            />
          </div>
        </div>
      </fieldset>

      {/* Section: Teknik Bilgiler */}
      <fieldset className="border border-gray-200 bg-white p-6">
        <legend className="text-sm font-black uppercase tracking-wider text-[#1d1d1d] px-2">
          Teknik Bilgiler
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="cut_level"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Kesme Seviyesi (0-10)
            </Label>
            <Input
              id="cut_level"
              name="cut_level"
              type="number"
              min={0}
              max={10}
              step={1}
              defaultValue={tf?.cut_level ?? ""}
              placeholder="0-10"
              className="rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="finish_level"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Cila Seviyesi (0-10)
            </Label>
            <Input
              id="finish_level"
              name="finish_level"
              type="number"
              min={0}
              max={10}
              step={1}
              defaultValue={tf?.finish_level ?? ""}
              placeholder="0-10"
              className="rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="volume_ml"
              className="text-xs font-bold uppercase tracking-wider text-gray-600"
            >
              Hacim (ml)
            </Label>
            <Input
              id="volume_ml"
              name="volume_ml"
              type="number"
              min={0}
              defaultValue={tf?.volume_ml ?? ""}
              placeholder="ml cinsinden"
              className="rounded-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <input
              id="silicone_free"
              name="silicone_free"
              type="checkbox"
              defaultChecked={tf?.silicone_free || false}
              className="h-4 w-4 border border-gray-300 accent-[#af1d1f]"
            />
            <Label
              htmlFor="silicone_free"
              className="text-xs font-bold uppercase tracking-wider text-gray-600 cursor-pointer"
            >
              Silikonsuz
            </Label>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <input
              id="filler_free"
              name="filler_free"
              type="checkbox"
              defaultChecked={tf?.filler_free || false}
              className="h-4 w-4 border border-gray-300 accent-[#af1d1f]"
            />
            <Label
              htmlFor="filler_free"
              className="text-xs font-bold uppercase tracking-wider text-gray-600 cursor-pointer"
            >
              Dolgu Maddesiz
            </Label>
          </div>
        </div>
      </fieldset>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 bg-[#af1d1f] hover:bg-red-700 disabled:opacity-50 text-white px-6 py-2.5 font-bold uppercase tracking-widest text-sm transition-colors"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {product ? "Guncelle" : "Kaydet"}
            </>
          )}
        </button>
        <a
          href="/admin/urunler"
          className="inline-flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 font-bold uppercase tracking-widest text-sm transition-colors"
        >
          Iptal
        </a>
      </div>
    </form>
  );
}
