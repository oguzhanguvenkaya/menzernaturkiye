"use client";

import { useState } from "react";
import type { MenzernaScrape } from "@/lib/types";

interface ApplicationStepsProps {
  processing?: MenzernaScrape["processing"];
  steps?: MenzernaScrape["steps"];
  howToUse?: string;
}

const stepColors: Record<number, string> = {
  1: "#af1d1f",
  2: "#eab308",
  3: "#22c55e",
  4: "#06b6d4",
};

function parseHowToUseSteps(howToUse: string): { number: number; text: string }[] {
  const lines = howToUse.split("\n").filter((l) => l.trim());
  const result: { number: number; text: string }[] = [];
  let stepNum = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^\d+[\.\)]\s/.test(trimmed)) {
      stepNum++;
      result.push({
        number: stepNum,
        text: trimmed.replace(/^\d+[\.\)]\s*/, ""),
      });
    } else if (result.length > 0) {
      // Append to previous step
      result[result.length - 1].text += " " + trimmed;
    } else {
      stepNum++;
      result.push({ number: stepNum, text: trimmed });
    }
  }

  return result;
}

export function ApplicationSteps({
  processing,
  steps,
  howToUse,
}: ApplicationStepsProps) {
  const [activeStep, setActiveStep] = useState(1);

  const hasProcessing =
    processing &&
    (processing.rotary?.start || processing.orbital);
  const hasSteps = steps && steps.length > 0;
  const hasHowToUse = !!howToUse;

  if (!hasProcessing && !hasSteps && !hasHowToUse) return null;

  const parsedSteps = hasHowToUse ? parseHowToUseSteps(howToUse!) : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {/* Left: Processing / Application info */}
      <div>
        <h3 className="font-black text-[#1d1d1d] uppercase tracking-widest text-sm mb-4">
          Uygulama
        </h3>

        {hasProcessing && (
          <div className="space-y-3">
            {processing!.rotary?.start && (
              <div className="flex items-start gap-3">
                <span className="text-[#af1d1f] font-black text-lg leading-none mt-0.5">
                  &rarr;
                </span>
                <div>
                  <span className="font-bold text-[#1d1d1d] text-sm">
                    Rotary:
                  </span>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Baslangic: {processing!.rotary!.start}
                  </p>
                  {processing!.rotary!.end && (
                    <p className="text-xs text-gray-600">
                      Bitis: {processing!.rotary!.end}
                    </p>
                  )}
                </div>
              </div>
            )}
            {processing!.orbital && (
              <div className="flex items-start gap-3">
                <span className="text-[#af1d1f] font-black text-lg leading-none mt-0.5">
                  &rarr;
                </span>
                <div>
                  <span className="font-bold text-[#1d1d1d] text-sm">
                    Orbital:
                  </span>
                  <p className="text-xs text-gray-600 mt-0.5">
                    {processing!.orbital}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {!hasProcessing && hasHowToUse && (
          <div className="space-y-2">
            {parsedSteps.map((step) => (
              <div
                key={step.number}
                className={`flex items-start gap-3 p-3 border border-gray-100 transition-colors cursor-pointer ${
                  activeStep === step.number
                    ? "bg-gray-50 border-l-4 border-l-[#af1d1f]"
                    : "border-l-4 border-l-transparent hover:bg-gray-50"
                }`}
                onClick={() => setActiveStep(step.number)}
              >
                <span className="flex items-center justify-center w-7 h-7 bg-[#1d1d1d] text-white text-xs font-black shrink-0">
                  {step.number}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: Steps */}
      {hasSteps && (
        <div>
          <h3 className="font-black text-[#1d1d1d] uppercase tracking-widest text-sm mb-4">
            Adimlar
          </h3>
          <div className="flex flex-wrap gap-2">
            {steps!.map((step) => {
              const color = stepColors[step.number] || "#6b7280";
              const isActive = step.isActive;
              const isHalf = step.isHalfActive;
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-16 h-8 flex items-center justify-center text-[10px] font-black uppercase tracking-wider border-2 ${
                      isActive
                        ? "text-white"
                        : isHalf
                        ? "bg-white"
                        : "bg-gray-100 text-gray-400 border-gray-300"
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: color, borderColor: color }
                        : isHalf
                        ? { borderColor: color, color }
                        : {}
                    }
                  >
                    Adim {step.number}
                  </div>
                  <span className="text-[9px] text-gray-500 font-bold text-center leading-tight">
                    {step.label_tr || step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
