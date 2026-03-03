"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FileText } from "lucide-react";

interface ProductTabsProps {
  fullDescription?: string;
  whenToUse?: string;
  targetSurface?: string;
  howToUse?: string;
  faq?: { question: string; answer: string }[];
}

export function ProductTabs({
  fullDescription,
  whenToUse,
  targetSurface,
  howToUse,
  faq,
}: ProductTabsProps) {
  return (
    <Tabs defaultValue="aciklama" className="w-full">
      <TabsList className="w-full justify-start rounded-none bg-transparent border-b border-gray-200 h-auto p-0 gap-0">
        <TabsTrigger
          value="aciklama"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#af1d1f] data-[state=active]:bg-transparent data-[state=active]:text-[#af1d1f] data-[state=active]:shadow-none px-5 py-3 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-[#1d1d1d] transition-colors"
        >
          Açıklama
        </TabsTrigger>
        <TabsTrigger
          value="uygulama"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#af1d1f] data-[state=active]:bg-transparent data-[state=active]:text-[#af1d1f] data-[state=active]:shadow-none px-5 py-3 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-[#1d1d1d] transition-colors"
        >
          Uygulama Adımları
        </TabsTrigger>
        <TabsTrigger
          value="dokuman"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#af1d1f] data-[state=active]:bg-transparent data-[state=active]:text-[#af1d1f] data-[state=active]:shadow-none px-5 py-3 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-[#1d1d1d] transition-colors"
        >
          Dokümanlar
        </TabsTrigger>
        {faq && faq.length > 0 && (
          <TabsTrigger
            value="sss"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#af1d1f] data-[state=active]:bg-transparent data-[state=active]:text-[#af1d1f] data-[state=active]:shadow-none px-5 py-3 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-[#1d1d1d] transition-colors"
          >
            SSS
          </TabsTrigger>
        )}
      </TabsList>

      {/* Açıklama */}
      <TabsContent value="aciklama" className="mt-6">
        <div className="space-y-6">
          {fullDescription && (
            <div>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {fullDescription}
              </p>
            </div>
          )}
          {whenToUse && (
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-[#1d1d1d] mb-2">
                Ne Zaman Kullanılır
              </h4>
              <p className="text-gray-600 leading-relaxed">{whenToUse}</p>
            </div>
          )}
          {targetSurface && (
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-[#1d1d1d] mb-2">
                Uygulanacak Yüzeyler
              </h4>
              <p className="text-gray-600 leading-relaxed">{targetSurface}</p>
            </div>
          )}
          {!fullDescription && !whenToUse && !targetSurface && (
            <p className="text-gray-400 italic">Açıklama henüz eklenmemiş.</p>
          )}
        </div>
      </TabsContent>

      {/* Uygulama Adımları */}
      <TabsContent value="uygulama" className="mt-6">
        {howToUse ? (
          <div className="space-y-4">
            {howToUse.split(/\n+/).map((step, idx) => {
              const trimmed = step.trim();
              if (!trimmed) return null;
              const isNumbered = /^\d+[\.\)]\s/.test(trimmed);
              return isNumbered ? (
                <div key={idx} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 bg-[#af1d1f] text-white text-xs font-black flex items-center justify-center">
                    {trimmed.match(/^(\d+)/)?.[1]}
                  </span>
                  <p className="text-gray-600 leading-relaxed pt-0.5">
                    {trimmed.replace(/^\d+[\.\)]\s*/, "")}
                  </p>
                </div>
              ) : (
                <p key={idx} className="text-gray-600 leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 italic">Uygulama adımları henüz eklenmemiş.</p>
        )}
      </TabsContent>

      {/* Dokümanlar */}
      <TabsContent value="dokuman" className="mt-6">
        <div className="border border-dashed border-gray-300 p-8 flex flex-col items-center gap-3 text-center">
          <FileText className="w-8 h-8 text-gray-300" />
          <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
            Teknik Veri Sayfaları
          </p>
          <p className="text-xs text-gray-400">
            TDS dokümanları yakında eklenecek.
          </p>
        </div>
      </TabsContent>

      {/* SSS */}
      {faq && faq.length > 0 && (
        <TabsContent value="sss" className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="text-sm font-bold text-[#1d1d1d] uppercase tracking-wide py-4 hover:no-underline hover:text-[#af1d1f] text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      )}
    </Tabs>
  );
}
