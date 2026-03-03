"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProductAction } from "./actions";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export default function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`"${productName}" urununu silmek istediginize emin misiniz?`)) {
      return;
    }
    startTransition(() => {
      deleteProductAction(productId);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-red-200 bg-white hover:bg-red-50 text-[#e3000f] disabled:opacity-50 transition-colors"
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Trash2 className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
