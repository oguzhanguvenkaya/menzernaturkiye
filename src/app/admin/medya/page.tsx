"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Copy, Trash2, ImagePlus, Info, CheckCheck } from "lucide-react";
import { toast } from "sonner";

interface UploadedFile {
  url: string;
  name: string;
}

export default function MedyaPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
  const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

  function validateFile(file: File): string | null {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Desteklenmeyen dosya formatı. Sadece JPG, PNG ve WebP kabul edilir.";
    }
    if (file.size > MAX_SIZE) {
      return "Dosya boyutu 10 MB'den büyük olamaz.";
    }
    return null;
  }

  async function uploadFile(file: File) {
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      return;
    }

    setUploading(true);
    setProgress(0);

    // Simulate progress since fetch doesn't support progress natively
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 150);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Yükleme başarısız oldu");
      }

      const data = await res.json();
      setProgress(100);

      setFiles((prev) => [{ url: data.url, name: file.name }, ...prev]);
      toast.success("Görsel başarıyla yüklendi");
    } catch (err) {
      clearInterval(progressInterval);
      toast.error(
        err instanceof Error ? err.message : "Yükleme sırasında bir hata oluştu"
      );
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 500);
    }
  }

  async function handleDelete(url: string) {
    try {
      const res = await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error("Silme işlemi başarısız oldu");
      }

      setFiles((prev) => prev.filter((f) => f.url !== url));
      toast.success("Görsel silindi");
    } catch {
      toast.error("Görsel silinirken bir hata oluştu");
    }
  }

  async function handleCopy(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      toast.success("URL panoya kopyalandı");
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {
      toast.error("Kopyalama başarısız oldu");
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    // Reset input so the same file can be selected again
    e.target.value = "";
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        uploadFile(file);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#002b3d] uppercase tracking-wider">
          Medya Yönetimi
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Görsel yükleyin ve URL'leri yönetin
        </p>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 p-4 mb-6 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Görseli yükleyin, URL&apos;yi kopyalayın ve ürün/sayfa düzenlerken
          ilgili alana yapıştırın.
        </p>
      </div>

      {/* Upload zone */}
      <div
        className={`relative border-2 border-dashed p-8 text-center transition-colors cursor-pointer mb-8 ${
          dragActive
            ? "border-[#e3000f] bg-red-50"
            : "border-gray-300 bg-gray-50 hover:border-[#e3000f] hover:bg-gray-100"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-[#002b3d] flex items-center justify-center">
            <ImagePlus className="w-7 h-7 text-white" />
          </div>

          <div>
            <p className="text-sm font-bold text-[#002b3d] uppercase tracking-wider">
              {dragActive
                ? "Dosyayı bırakın"
                : "Görsel yüklemek için tıklayın veya sürükleyin"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG veya WebP &middot; Maksimum 10 MB
            </p>
          </div>
        </div>

        {/* Upload progress */}
        {uploading && (
          <div className="mt-4 max-w-xs mx-auto">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span className="flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 animate-pulse" />
                Yükleniyor...
              </span>
              <span>%{progress}</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5">
              <div
                className="bg-[#e3000f] h-1.5 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Uploaded files list */}
      {files.length > 0 && (
        <div>
          <h2 className="text-sm font-black text-[#002b3d] uppercase tracking-wider mb-4">
            Yüklenen Görseller ({files.length})
          </h2>

          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.url}
                className="bg-white border border-gray-200 p-3 flex items-center gap-3"
              >
                {/* Thumbnail */}
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-16 h-16 object-cover shrink-0 bg-gray-100 border border-gray-200"
                />

                {/* URL field */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-600 mb-1 truncate">
                    {file.name}
                  </p>
                  <input
                    type="text"
                    readOnly
                    value={file.url}
                    className="w-full text-xs bg-gray-50 border border-gray-200 px-2 py-1.5 text-gray-700 font-mono truncate focus:outline-none focus:border-[#e3000f]"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleCopy(file.url)}
                    className="p-2 text-gray-500 hover:text-[#002b3d] hover:bg-gray-100 transition-colors"
                    title="URL'yi kopyala"
                  >
                    {copiedUrl === file.url ? (
                      <CheckCheck className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(file.url)}
                    className="p-2 text-gray-500 hover:text-[#e3000f] hover:bg-red-50 transition-colors"
                    title="Görseli sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {files.length === 0 && !uploading && (
        <div className="text-center py-12 text-gray-400">
          <Upload className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Henüz görsel yüklenmedi</p>
        </div>
      )}
    </div>
  );
}
