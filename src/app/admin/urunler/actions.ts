"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductBySku,
} from "@/db/queries";

export async function deleteProductAction(id: string) {
  await deleteProduct(id);
  revalidatePath("/admin/urunler");
  revalidatePath("/urunler");
}

export async function saveProductAction(
  _prevState: { success: boolean; error: string },
  formData: FormData
) {
  const id = formData.get("id") as string | null;

  const sku = formData.get("sku") as string;
  const product_name = formData.get("product_name") as string;
  const barcode = (formData.get("barcode") as string) || null;
  const brand = (formData.get("brand") as string) || "MENZERNA";

  // Kategori (JSONB)
  const main_cat = formData.get("main_cat") as string;
  const sub_cat = (formData.get("sub_cat") as string) || "";
  const sub_cat2 = (formData.get("sub_cat2") as string) || undefined;
  const category = {
    main_cat,
    sub_cat,
    ...(sub_cat2 ? { sub_cat2 } : {}),
  };

  // Content — MERGE with existing data to preserve gallery, menzerna_scrape, downloads etc.
  const short_description =
    (formData.get("short_description") as string) || undefined;
  const full_description =
    (formData.get("full_description") as string) || undefined;
  const how_to_use = (formData.get("how_to_use") as string) || undefined;

  const existingProduct = id ? await getProductById(id) : null;
  const existingContent: Record<string, unknown> =
    (existingProduct?.content as Record<string, unknown>) || {};

  // Parse gallery from form (if provided by GalleryManager)
  const galleryJson = formData.get("gallery_json") as string | null;
  let gallery: string[] | undefined;
  if (galleryJson) {
    try {
      gallery = JSON.parse(galleryJson);
    } catch {
      // keep existing
    }
  }

  // Parse recommended products (optimised_for)
  const recommendedJson = formData.get("recommended_products_json") as string | null;
  let optimisedFor: { name: string; name_tr: string; sku: string }[] | undefined;
  if (recommendedJson) {
    try {
      optimisedFor = JSON.parse(recommendedJson);
    } catch {
      // keep existing
    }
  }

  // Merge menzerna_scrape with optimised_for
  const existingScrape =
    (existingContent.menzerna_scrape as Record<string, unknown>) || {};
  const updatedScrape =
    optimisedFor !== undefined
      ? { ...existingScrape, optimised_for: optimisedFor }
      : existingScrape;

  const content = {
    ...existingContent,
    ...(short_description !== undefined ? { short_description } : {}),
    ...(full_description !== undefined ? { full_description } : {}),
    ...(how_to_use !== undefined ? { how_to_use } : {}),
    ...(gallery !== undefined ? { gallery } : {}),
    ...(Object.keys(updatedScrape).length > 0
      ? { menzerna_scrape: updatedScrape }
      : {}),
  };

  // image_url — first image from gallery, or explicit field
  const explicitImageUrl = formData.get("image_url") as string | null;
  const image_url = explicitImageUrl || (gallery && gallery.length > 0 ? gallery[0] : null);

  // Template fields (JSONB)
  const cut_level = formData.get("cut_level")
    ? Number(formData.get("cut_level"))
    : undefined;
  const finish_level = formData.get("finish_level")
    ? Number(formData.get("finish_level"))
    : undefined;
  const volume_ml = formData.get("volume_ml")
    ? Number(formData.get("volume_ml"))
    : undefined;
  const silicone_free = formData.get("silicone_free") === "on";
  const filler_free = formData.get("filler_free") === "on";
  // Merge with existing template_fields to preserve fields not in the form
  const existingTemplateFields: Record<string, unknown> =
    (existingProduct?.template_fields as Record<string, unknown>) || {};

  const template_fields = {
    ...existingTemplateFields,
    ...(cut_level !== undefined ? { cut_level } : {}),
    ...(finish_level !== undefined ? { finish_level } : {}),
    ...(volume_ml !== undefined ? { volume_ml } : {}),
    silicone_free,
    filler_free,
  };

  if (!sku || !product_name || !main_cat) {
    return {
      success: false,
      error: "SKU, Urun Adi ve Ana Kategori zorunlu alanlardir.",
    };
  }

  try {
    if (id) {
      await updateProduct(id, {
        sku,
        product_name,
        barcode,
        brand,
        image_url,
        category,
        content,
        template_fields,
      });
    } else {
      await createProduct({
        sku,
        product_name,
        barcode,
        brand,
        image_url,
        category,
        content,
        template_fields,
      });
    }

    // Handle variant image assignments
    const variantImagesJson = formData.get("variant_images_json") as string | null;
    if (variantImagesJson) {
      try {
        const variantImages: Record<string, string> = JSON.parse(variantImagesJson);
        for (const [variantSku, imgUrl] of Object.entries(variantImages)) {
          const variantProduct = await getProductBySku(variantSku);
          if (variantProduct) {
            await updateProduct(variantProduct.id, { image_url: imgUrl });
            revalidatePath(`/urunler/${variantSku}`);
          }
        }
      } catch {
        // ignore parse errors for variant images
      }
    }
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Kaydetme sirasinda bir hata olustu.",
    };
  }

  revalidatePath("/admin/urunler");
  revalidatePath("/urunler");
  revalidatePath(`/urunler/${sku}`);
  revalidatePath("/arac-bakim");
  revalidatePath("/endustriyel");
  revalidatePath("/marin");
  redirect("/admin/urunler");
}
