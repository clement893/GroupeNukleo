import { useState, useEffect, useCallback } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import "@/styles/admin.css";

const ACCEPT_PDF = "application/pdf,application/x-pdf,.pdf";

export default function AdminPressRelease() {
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadPending, setUploadPending] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchPdf = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/press-release");
      const data = await res.json();
      setPdfPath(data?.path ?? null);
    } catch {
      setPdfPath(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPdf();
  }, [fetchPdf]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    const isPdf = file && (file.type === "application/pdf" || file.type === "application/x-pdf" || /\.pdf$/i.test(file.name));
    if (isPdf) {
      setSelectedFile(file);
    } else {
      toast.error("Déposez un fichier PDF");
    }
  }, []);

  const onFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
    e.target.value = "";
  }, []);

  const getUploadTokenQuery = trpc.adminAuth.getUploadToken.useQuery(undefined, { enabled: false });

  async function handleUpload() {
    if (!selectedFile) {
      toast.error("Sélectionnez un PDF");
      return;
    }
    setUploadPending(true);
    try {
      const result = await getUploadTokenQuery.refetch();
      const token = result.data?.token;
      if (!token) throw new Error("Session expirée. Reconnectez-vous.");
      const form = new FormData();
      form.append("pdf", selectedFile);
      const res = await fetch("/api/admin/press-release/upload", {
        method: "POST",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.error || data?.message || (res.status === 401 ? "Session expirée. Reconnectez-vous." : "Erreur upload");
        throw new Error(msg);
      }
      const { path } = await res.json();
      setPdfPath(path);
      setSelectedFile(null);
      toast.success("Communiqué de presse uploadé avec succès");
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
            <FileText className="w-8 h-8 text-[#523DCB]" />
            Communiqué de presse
          </h1>
          <p className="text-gray-300">
            PDF affiché dans le bouton « Notre communiqué de presse » de la section « L&apos;union de deux forces ». Format accepté : PDF (max 20 Mo).
          </p>
        </div>

        <Card className="border border-gray-700 bg-gray-800/50">
          <CardHeader>
            <CardTitle className="text-white" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
              PDF actuel
            </CardTitle>
            <CardDescription className="text-gray-400">
              {pdfPath ? "Un communiqué de presse est configuré." : "Aucun PDF. Uploadez-en un pour activer le bouton sur la page d'accueil."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#523DCB]" />
              </div>
            ) : pdfPath ? (
              <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-700/50">
                <FileText className="w-10 h-10 text-[#523DCB] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-300 font-medium truncate">press-release.pdf</p>
                  <p className="text-sm text-gray-500">PDF configuré</p>
                </div>
                <a
                  href={pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#523DCB]/20 hover:bg-[#523DCB]/30 text-[#523DCB] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ouvrir
                </a>
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/30 aspect-video flex items-center justify-center">
                <p className="text-gray-500">Aucun PDF configuré</p>
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
                accept={ACCEPT_PDF}
                onChange={onFileInput}
                className="hidden"
                id="press-release-input"
              />
              <label htmlFor="press-release-input" className="cursor-pointer block">
                <Upload className="w-12 h-12 mx-auto text-gray-500 mb-3" />
                <p className="text-gray-400 mb-1">
                  Glissez un PDF ici ou cliquez pour sélectionner
                </p>
                <p className="text-sm text-gray-500">PDF uniquement, max 20 Mo</p>
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
