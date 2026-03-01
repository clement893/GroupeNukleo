import { trpc } from '@/lib/trpc';
import { useIsAdminSession } from '@/hooks/useIsAdminSession';
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
import { Upload, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

export default function AdminProjectsImages() {
  const { isAdmin, isLoading: authLoading } = useIsAdminSession();
  const { data: images, isLoading, refetch } = trpc.projectsImages.listAdmin.useQuery(undefined, {
    enabled: isAdmin,
  });
  const deleteMutation = trpc.projectsImages.delete.useMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)) {
          toast.error(`${file.name}: Only image files are allowed`);
          continue;
        }

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`${file.name}: File size must be less than 10MB`);
          continue;
        }

        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/admin/projects-images/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        if (!response.ok) {
          const errorText = await response.text();
          let error;
          try {
            error = JSON.parse(errorText);
          } catch {
            error = { error: errorText || 'Upload failed' };
          }
          console.error('[Upload] Error response:', response.status, error);
          throw new Error(error.error || `Upload failed (${response.status})`);
        }

        const result = await response.json();
        toast.success(`${file.name} uploaded successfully`);
      }

      // Refresh the list
      await refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({ filename });
      toast.success('Image deleted successfully');
      await refetch();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete image');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 container mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Projects Images</h1>
          <p className="text-gray-400">
            Upload and manage images for the projects page
          </p>
        </div>

        {authLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : (
        <>
        <Card className="mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Upload Images</CardTitle>
            <CardDescription className="text-gray-400">
              Upload image files (JPG, PNG, GIF, WebP). Maximum file size: 10MB
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
                disabled={uploading}
              />
              <label htmlFor="image-upload">
                <Button
                  asChild
                  disabled={uploading}
                  className="cursor-pointer"
                >
                  <span>
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Select Images
                      </>
                    )}
                  </span>
                </Button>
              </label>
              <p className="text-sm text-muted-foreground">
                {images?.length || 0} images total
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Images Grid */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Uploaded Images</CardTitle>
            <CardDescription className="text-gray-400">
              All images are stored in <code className="text-xs bg-white/10 px-1 py-0.5 rounded text-gray-300">/projects/</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : !images || images.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No images uploaded yet</p>
                <p className="text-sm mt-2">Upload your first image to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {images && Array.isArray(images) ? images.map((image) => (
                  <div
                    key={image.name}
                    className="group relative border border-white/10 rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {/* Image Preview */}
                    <div className="aspect-square relative bg-white/5">
                      <img
                        src={`/projects/${image.name}`}
                        alt={image.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(image.name)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    
                    {/* Image Info */}
                    <div className="p-3">
                      <p className="text-sm font-medium text-white truncate mb-1" title={image.name}>
                        {image.name}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{formatFileSize(image.size)}</span>
                        <span>
                          {formatDistanceToNow(new Date(image.modified), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                )) : null}
              </div>
            )}
            </CardContent>
        </Card>
        </>
        )}
      </div>
    </AdminLayout>
  );
}

