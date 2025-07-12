"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export type MediaFile = {
  type: string;
  filename: string;
  url: string; // inicialmente vazio
  data: string; // base64
  caption?: string; // legenda opcional
};

interface MediaUploadProps {
  onMediaSelected: (media: MediaFile | null) => void;
  accept?: string;
  maxSizeMB?: number;
}

export function MediaUpload({ onMediaSelected, accept = "image/*,video/*", maxSizeMB = 5 }: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Data, setBase64Data] = useState<string>("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    if (!file) {
      setPreviewUrl(null);
      setBase64Data("");
      onMediaSelected(null);
      return;
    }
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      alert("Apenas imagens ou vídeos são permitidos.");
      setPreviewUrl(null);
      setBase64Data("");
      onMediaSelected(null);
      e.target.value = "";
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`Arquivo muito grande. Máximo permitido: ${maxSizeMB}MB.`);
      setPreviewUrl(null);
      setBase64Data("");
      onMediaSelected(null);
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result?.toString().split(",")[1] || "";
      const dataUrl = reader.result?.toString() || null;
      setPreviewUrl(dataUrl);
      setBase64Data(base64);
      onMediaSelected({
        type: file.type,
        filename: file.name,
        url: "",
        data: base64,
        caption: caption || undefined,
      });
    };
    reader.onerror = () => {
      alert("Erro ao ler o arquivo.");
      setPreviewUrl(null);
      setBase64Data("");
      onMediaSelected(null);
    };
    reader.readAsDataURL(file);
  }

  function handleCaptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCaption(e.target.value);
    // Atualiza o objeto media se já houver arquivo selecionado
    if (inputRef.current && inputRef.current.files && inputRef.current.files[0]) {
      const file = inputRef.current.files[0];
      onMediaSelected({
        type: file.type,
        filename: file.name,
        url: "",
        data: base64Data, // sempre envia o último base64 válido
        caption: e.target.value || undefined,
      });
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button type="button" onClick={() => inputRef.current?.click()} className="w-fit">
        Escolher arquivo
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      {selectedFile && (
        <span className="text-xs text-muted-foreground mt-1">
          {selectedFile.name} ({selectedFile.type})
        </span>
      )}
      {previewUrl && selectedFile && selectedFile.type.startsWith("image/") && (
        <img src={previewUrl} alt="Preview" className="mt-2 max-h-40 rounded border" />
      )}
      {previewUrl && selectedFile && selectedFile.type.startsWith("video/") && (
        <video src={previewUrl} controls className="mt-2 max-h-40 rounded border" />
      )}
      <input
        type="text"
        placeholder="Legenda (opcional)"
        value={caption}
        onChange={handleCaptionChange}
        className="block mt-1 px-2 py-1 border rounded text-sm"
      />
    </div>
  );
} 