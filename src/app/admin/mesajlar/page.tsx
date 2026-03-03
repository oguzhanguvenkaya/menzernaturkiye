import { getAllContactMessages } from "@/db/queries";
import type { ContactMessage } from "@/db/schema";
import { Trash2, Mail, MessageSquare } from "lucide-react";
import { deleteMessageAction } from "./actions";

export default async function AdminMesajlarPage() {
  const messages = await getAllContactMessages();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#002b3d] uppercase tracking-wider">
            Mesajlar
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {messages.length} iletişim mesajı
          </p>
        </div>
        <div className="w-10 h-10 bg-[#002b3d] flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white border border-gray-200 p-12 text-center">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Henuz mesaj bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <MessageCard key={msg.id} message={msg} />
          ))}
        </div>
      )}
    </div>
  );
}

function MessageCard({ message }: { message: ContactMessage }) {
  const truncatedMessage =
    message.message.length > 100
      ? message.message.slice(0, 100) + "..."
      : message.message;

  const formattedDate = message.createdAt
    ? new Date(message.createdAt).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="bg-white border border-gray-200 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-[#002b3d] text-sm uppercase tracking-wider">
              {message.name}
            </h3>
            <span className="text-xs text-gray-400">&middot;</span>
            <a
              href={`mailto:${message.email}`}
              className="text-xs text-[#e3000f] hover:underline"
            >
              {message.email}
            </a>
          </div>
          <p className="text-sm font-semibold text-[#002b3d] mb-1">
            {message.subject}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {truncatedMessage}
          </p>
          <p className="text-xs text-gray-400 mt-3">{formattedDate}</p>
        </div>
        <form
          action={async () => {
            "use server";
            await deleteMessageAction(message.id);
          }}
        >
          <button
            type="submit"
            className="p-2 text-gray-400 hover:text-[#e3000f] hover:bg-red-50 transition-colors"
            title="Mesaji sil"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
