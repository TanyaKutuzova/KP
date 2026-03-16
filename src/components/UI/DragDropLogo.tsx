import React, { useCallback, useState } from 'react';

interface DragDropLogoProps {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
}

export const DragDropLogo: React.FC<DragDropLogoProps> = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange((e.target?.result as string) ?? null);
      };
      reader.readAsDataURL(file);
    },
    [onChange],
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-2 text-xs text-slate-300">
      <span>Логотип компании</span>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center text-[11px] transition-all ${
          isDragging
            ? 'border-indigo-400 bg-indigo-500/10'
            : 'border-slate-700 hover:border-indigo-400 hover:bg-slate-900/70'
        }`}
        onClick={() => {
          const input = document.getElementById('logo-input') as HTMLInputElement | null;
          input?.click();
        }}
      >
        {value ? (
          <img src={value} alt="Логотип" className="h-14 w-auto object-contain" />
        ) : (
          <>
            <span className="font-medium text-slate-100">Перетащите логотип сюда</span>
            <span className="text-slate-400">или кликните, чтобы выбрать файл</span>
          </>
        )}
      </div>
      <input
        id="logo-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {value && (
        <button
          type="button"
          className="self-start text-[11px] text-slate-400 hover:text-red-400"
          onClick={() => onChange(null)}
        >
          Удалить логотип
        </button>
      )}
    </div>
  );
};

