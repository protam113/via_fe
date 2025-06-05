'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image, Loader2, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { usePresignMedia, useSubmitMedia } from '@/hooks/media/useMedia';
import { UploadState } from '@/types/types.types';
import { SubmitItem } from '@/types/types';
import { ImageUploadPreviewProps } from '@/types/props.type';

export default function ImageUploadPreview({
  onImageUploaded,
  type = 'image',
}: ImageUploadPreviewProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [submitItem, setSubmitItem] = useState<SubmitItem | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>({
    id: null,
    uploadUrl: null,
    previewUrl: null,
    file: null,
    uploading: false,
    error: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // API hooks
  const { mutate: presignMedia } = usePresignMedia();
  const { mutate: submitMedia } = useSubmitMedia();

  const resetUploadState = () => {
    setUploadState({
      id: null,
      uploadUrl: null,
      previewUrl: null,
      file: null,
      uploading: false,
      error: null,
    });
    setSubmitItem(null);
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadState((prev) => ({
        ...prev,
        error: 'Please select a valid image file',
      }));
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    setUploadState((prev) => ({
      ...prev,
      file,
      previewUrl,
      error: null,
    }));

    // Start presign process
    presignMedia(
      {
        name: file.name,
        type: type,
      },
      {
        onSuccess: (data) => {
          setUploadState((prev) => ({
            ...prev,
            id: data.id,
            uploadUrl: data.upload_url,
          }));

          setSubmitItem({
            name: file.name,
            type: type,
          });
        },
        onError: (error) => {
          setUploadState((prev) => ({
            ...prev,
            error: 'Failed to prepare upload. Please try again.',
          }));
          console.error('Presign error:', error);
        },
      }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadState.file || !uploadState.uploadUrl || !uploadState.id) {
      setUploadState((prev) => ({
        ...prev,
        error:
          'Missing required upload data. Please try selecting the file again.',
      }));
      return;
    }

    setUploadState((prev) => ({ ...prev, uploading: true, error: null }));

    try {
      // Upload file to presigned URL
      const uploadResponse = await fetch(uploadState.uploadUrl, {
        method: 'PUT',
        body: uploadState.file,
        headers: {
          'Content-Type': uploadState.file.type,
        },
      });

      if (uploadResponse.status === 201 || uploadResponse.status === 200) {
        submitMedia(
          {
            id: uploadState.id!,
            submitItem: submitItem!,
          },
          {
            onSuccess: (data) => {
              // Log the upload ID to console as requested
              console.log('Upload ID:', uploadState.id);

              // Call optional callback
              if (onImageUploaded) {
                onImageUploaded(
                  data?.url || uploadState.previewUrl!,
                  uploadState.id!
                );
              }

              // Clean up and reset
              if (uploadState.previewUrl) {
                URL.revokeObjectURL(uploadState.previewUrl);
              }
              resetUploadState();
            },
            onError: (error) => {
              console.error('Submit media error:', error);
              setUploadState((prev) => ({
                ...prev,
                uploading: false,
                error: `Failed to confirm upload: ${
                  error?.message || 'Unknown error'
                }`,
              }));
            },
          }
        );
      } else {
        const errorText = await uploadResponse
          .text()
          .catch(() => 'Unknown error');
        throw new Error(
          `Upload failed with status: ${uploadResponse.status}. ${errorText}`
        );
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadState((prev) => ({
        ...prev,
        uploading: false,
        error: `Upload failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      }));
    }
  };

  const handleRemove = () => {
    if (uploadState.previewUrl) {
      URL.revokeObjectURL(uploadState.previewUrl);
    }
    resetUploadState();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            'group relative flex cursor-pointer flex-col items-center gap-4 rounded-none border-2 border-dashed p-8 transition-all hover:bg-accent',
            isDragActive && 'border-primary bg-primary/5',
            uploadState.error && 'border-destructive bg-destructive/5'
          )}
        >
          {uploadState.previewUrl ? (
            <div className="w-full space-y-4">
              <div className="relative">
                <img
                  src={uploadState.previewUrl}
                  alt="Preview"
                  className="mx-auto max-h-[400px] w-full object-contain rounded-none"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-none"
                  onClick={handleRemove}
                  disabled={uploadState.uploading}
                >
                  <X className="h-4 w-4 text-white" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={handleRemove}
                    disabled={uploadState.uploading}
                    className="rounded-none"
                  >
                    Remove
                  </Button>
                  <Button
                    onClick={handleUpload}
                    disabled={uploadState.uploading || !uploadState.uploadUrl}
                    className="rounded-none"
                  >
                    {uploadState.uploading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {uploadState.uploading ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex cursor-pointer flex-col items-center gap-4 w-full"
              >
                <div className="rounded-full bg-background p-4 shadow-sm transition-colors group-hover:bg-accent">
                  <Image className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
              </label>
            </>
          )}

          {uploadState.error && (
            <div className="w-full">
              <p className="text-sm text-destructive text-center">
                {uploadState.error}
              </p>
            </div>
          )}
        </div>

        {uploadState.id && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-none">
            <p className="text-sm text-green-700">
              Upload ID:{' '}
              <code className="font-mono bg-green-100 px-1 rounded-none">
                {uploadState.id}
              </code>
            </p>
            <p className="text-xs text-green-600 mt-1">
              ID will be logged to console when upload completes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
