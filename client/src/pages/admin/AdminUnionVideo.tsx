import { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Video, Loader2 } from "lucide-react";
import { toast } from "sonner";
import "@/styles/admin.css";

const ACCEPT_VIDEO = "video/mp4,video/webm,video/quicktime";

export default function AdminUnionVideo() {
  const [videoPath, setVideoPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadPending, setUploadPending] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchVideo = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/union-video");
      const data = await res.json();
      setVideoPath(data?.path ?? null);
    } catch {
      setVideoPath(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideo();
  }, [fetchVideo]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
    } else {
      toast.error("Déposez une vidéo (MP4, WebM ou MOV)");
    }
  }, []);

  const onFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
    e.target.value = "";
  }, []);

  async function handleUpload() {
    if (!selectedFile) {
      toast.error("Sélectionnez une vidéo");
      return;
    }
    setUploadPending(true);
    try {
      const form = new FormData();
      form.append("video", selectedFile);
      const res = await fetch("/api/admin/union-video/upload", {
        method: "POST",
        credentials: "include",
        body: form,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.error || data?.message || (res.status === 401 ? "Session expirée. Reconnectez-vous." : "Erreur upload");
        throw new Error(msg);
      }
      const { path } = await res.json();
      setVideoPath(path);
      setSelectedFile(null);
      toast.success("Vidéo uploadée avec succès");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur upload");
    } finally {
      setUploadPending(false);
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Video className="w-8 h-8 text-[#523DCB]" />
            Vidéo section Union
          </h1>
          <p className="text-gray-300">
            Vidéo affichée dans la section « L&apos;union de deux forces » sur la page d&apos;accueil. Formats acceptés : MP4, WebM, MOV (max 100 Mo).
          </p>
        </div>

        <Card className="border border-gray-700 bg-gray-800/50">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
              Vidéo actuelle
            </CardTitle>
            <CardDescription className="text-gray-400">
              {videoPath ? "Une vidéo est configurée." : "Aucune vidéo. Uploadez-en une pour remplacer l'image par défaut."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#523DCB]" />
              </div>
            ) : videoPath ? (
              <div className="rounded-lg overflow-hidden bg-black aspect-video max-h-64">
                <video
                  src={videoPath}
                  controls
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/30 aspect-video flex items-center justify-center">
                <p className="text-gray-500">Image par défaut affichée (aucune vidéo)</p>
              </div>
            )}

            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver ? "border-[#523DCB] bg-[#523DCB]/10" : "border-gray-600 hover:border-gray-500"
              }`}
            >
              <input
                type="file"
                accept={ACCEPT_VIDEO}
                onChange={onFileInput}
                className="hidden"
                id="union-video-input"
              />
              <label htmlFor="union-video-input" className="cursor-pointer block">
                <Upload className="w-12 h-12 mx-auto text-gray-500 mb-3" />
                <p className="text-gray-400 mb-1">
                  Glissez une vidéo ici ou cliquez pour sélectionner
                </p>
                <p className="text-sm text-gray-500">MP4, WebM ou MOV, max 100 Mo</p>
              </label>
              {selectedFile && (
                <div className="mt-4 p-3 rounded bg-gray-700/50">
                  <p className="text-sm text-gray-300 truncate">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} Mo</p>
                  <Button
                    onClick={handleUpload}
                    disabled={uploadPending}
                    className="mt-3"
                    style={{ background: 'linear-gradient(to right, #6B1817, #523DCB)' }}
                  >
                    {uploadPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Uploader"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
