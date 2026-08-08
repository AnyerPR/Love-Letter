import React, { useState } from 'react';
import { LoveLetterData } from '../../types';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2LetterContent } from './Step2LetterContent';
import { Step3Gallery } from './Step3Gallery';
import { Step4Videos } from './Step4Videos';
import { Step5Music } from './Step5Music';
import { Step6Quotes } from './Step6Quotes';
import { Step7Vouchers } from './Step7Vouchers';
import { Step8Timeline } from './Step8Timeline';
import { Step9Reasons } from './Step9Reasons';
import { Step10Theme } from './Step10Theme';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Eye,
  CheckCircle2,
  Wand2,
} from 'lucide-react';
import { INITIAL_DEFAULT_LETTER } from '../../data/presets';
import { soundFx } from '../../utils/audio';

interface BuilderWizardProps {
  data: LoveLetterData;
  onChange: (updated: LoveLetterData) => void;
  onFinish: () => void;
}

export const BuilderWizard: React.FC<BuilderWizardProps> = ({
  data,
  onChange,
  onFinish,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const stepTitles = [
    'Info Básica',
    'Carta',
    'Fotos',
    'Vídeos',
    'Música',
    'Frases',
    'Vales',
    'Fechas',
    'Razones',
    'Tema',
  ];

  const handleNext = () => {
    soundFx.playRomanticChime();
    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const loadExample = () => {
    soundFx.playRomanticChime();
    onChange(INITIAL_DEFAULT_LETTER);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            data={data.basicInfo}
            onChange={(basicInfo) => onChange({ ...data, basicInfo })}
          />
        );
      case 2:
        return (
          <Step2LetterContent
            data={data.letter}
            onChange={(letter) => onChange({ ...data, letter })}
          />
        );
      case 3:
        return (
          <Step3Gallery
            photos={data.gallery}
            onChange={(gallery) => onChange({ ...data, gallery })}
          />
        );
      case 4:
        return (
          <Step4Videos
            videos={data.videos}
            onChange={(videos) => onChange({ ...data, videos })}
          />
        );
      case 5:
        return (
          <Step5Music
            data={data.audio}
            onChange={(audio) => onChange({ ...data, audio })}
          />
        );
      case 6:
        return (
          <Step6Quotes
            quotes={data.quotes}
            onChange={(quotes) => onChange({ ...data, quotes })}
          />
        );
      case 7:
        return (
          <Step7Vouchers
            vouchers={data.vouchers}
            onChange={(vouchers) => onChange({ ...data, vouchers })}
          />
        );
      case 8:
        return (
          <Step8Timeline
            timeline={data.timeline}
            onChange={(timeline) => onChange({ ...data, timeline })}
          />
        );
      case 9:
        return (
          <Step9Reasons
            reasons={data.reasons}
            onChange={(reasons) => onChange({ ...data, reasons })}
          />
        );
      case 10:
        return (
          <Step10Theme
            theme={data.theme}
            onChange={(theme) => onChange({ ...data, theme })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 relative z-20 max-w-4xl mx-auto">
      {/* Top Banner Header */}
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-rose-500/20 rounded-3xl p-6 mb-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Constructor de Experiencias
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-elegant font-bold text-white">
              Crea tu Carta de Amor Digital
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadExample}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Cargar ejemplo ya rellenado para probar rápidamente"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Cargar Ejemplo</span>
            </button>

            <button
              onClick={onFinish}
              className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-md shadow-rose-500/30"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Presentación</span>
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-rose-300 mb-2">
            <span className="font-semibold">
              Paso {currentStep} de 10: {stepTitles[currentStep - 1]}
            </span>
            <span>{Math.round((currentStep / 10) * 100)}% Completado</span>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 10) * 100}%` }}
            />
          </div>

          {/* Step Pill Navigator */}
          <div className="flex items-center gap-1.5 overflow-x-auto mt-4 pb-1 scrollbar-none">
            {stepTitles.map((title, i) => {
              const stepNum = i + 1;
              const isCurrent = currentStep === stepNum;
              const isCompleted = currentStep > stepNum;

              return (
                <button
                  key={stepNum}
                  onClick={() => setCurrentStep(stepNum)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 flex items-center gap-1 transition-all ${
                    isCurrent
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 font-bold scale-105'
                      : isCompleted
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3 h-3 text-rose-300" />
                  ) : (
                    <span>{stepNum}.</span>
                  )}
                  <span>{title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Step Content Card */}
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-rose-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl mb-6">
        {renderStepContent()}
      </div>

      {/* Wizard Footer Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="px-5 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-40 text-xs font-semibold flex items-center gap-2 transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>

        <button
          onClick={handleNext}
          className="px-7 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:brightness-110 text-white text-sm font-semibold flex items-center gap-2 transition-all shadow-xl shadow-rose-500/30 cursor-pointer"
        >
          {currentStep === 10 ? (
            <>
              <span>¡Finalizar y Ver Carta!</span>
              <Heart className="w-4 h-4 fill-white text-white" />
            </>
          ) : (
            <>
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
