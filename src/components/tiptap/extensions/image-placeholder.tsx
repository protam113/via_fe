'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  NODE_HANDLES_SELECTED_STYLE_CLASSNAME,
  isValidUrl,
} from '@/lib/tiptap-utils';
import {
  type CommandProps,
  Node,
  type NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  mergeAttributes,
} from '@tiptap/react';
import { Image, Link, Upload, Loader2, X } from 'lucide-react';
import { type FormEvent, useState, useRef } from 'react';
import { cn } from '@/utils/helpers/utils';
import { usePresignMedia, useSubmitMedia } from '@/hooks/media/useMedia';
import { ImagePlaceholderOptions } from '@/types/props.type';
import { UploadState } from '@/types/types.types';
import { SubmitItem } from '@/types/types';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imagePlaceholder: {
      /**
       * Inserts an image placeholder
       */
      insertImagePlaceholder: () => ReturnType;
    };
  }
}

export const ImagePlaceholder = Node.create<ImagePlaceholderOptions>({
  name: 'image-placeholder',

  addOptions() {
    return {
      HTMLAttributes: {},
      onUpload: () => {},
      onError: () => {},
    };
  },

  group: 'block',

  parseHTML() {
    return [{ tag: `div[data-type="${this.name}"]` }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImagePlaceholderComponent, {
      className: NODE_HANDLES_SELECTED_STYLE_CLASSNAME,
    });
  },

  addCommands() {
    return {
      insertImagePlaceholder: () => (props: CommandProps) => {
        return props.commands.insertContent({
          type: 'image-placeholder',
        });
      },
    };
  },
});

function ImagePlaceholderComponent(props: NodeViewProps) {
  const { editor, extension, selected } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [url, setUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [urlError, setUrlError] = useState(false);
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
        type: 'image',
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
            type: 'image',
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
              // Insert image into editor
              editor
                .chain()
                .focus()
                .setImage({
                  src: data?.url || uploadState.previewUrl!,
                  alt: altText || uploadState.file?.name,
                })
                .run();

              // Clean up and close
              if (uploadState.previewUrl) {
                URL.revokeObjectURL(uploadState.previewUrl);
              }
              resetUploadState();
              setIsExpanded(false);
              setAltText('');
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

  const handleInsertEmbed = (e: FormEvent) => {
    e.preventDefault();
    const valid = isValidUrl(url);
    if (!valid) {
      setUrlError(true);
      return;
    }
    if (url) {
      editor.chain().focus().setImage({ src: url, alt: altText }).run();
      setIsExpanded(false);
      setUrl('');
      setAltText('');
    }
  };

  const handleClose = () => {
    if (uploadState.previewUrl) {
      URL.revokeObjectURL(uploadState.previewUrl);
    }
    resetUploadState();
    setIsExpanded(false);
    setUrl('');
    setAltText('');
  };

  return (
    <NodeViewWrapper className="w-full">
      <div className="relative">
        {!isExpanded ? (
          <div
            onClick={() => setIsExpanded(true)}
            className={cn(
              'group relative flex cursor-pointer flex-col items-center gap-4 rounded-lg border-2 border-dashed p-8 transition-all hover:bg-accent',
              selected && 'border-primary bg-primary/5',
              isDragActive && 'border-primary bg-primary/5',
              uploadState.error && 'border-destructive bg-destructive/5'
            )}
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
          </div>
        ) : (
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add Image</h3>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={(v: any) => setActiveTab(v)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </TabsTrigger>
                <TabsTrigger value="url">
                  <Link className="mr-2 h-4 w-4" />
                  URL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload">
                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={cn(
                    'my-4 rounded-lg border-2 border-dashed p-8 text-center transition-colors',
                    isDragActive && 'border-primary bg-primary/10',
                    uploadState.error && 'border-destructive bg-destructive/10'
                  )}
                >
                  {uploadState.previewUrl ? (
                    <div className="space-y-4">
                      <img
                        src={uploadState.previewUrl}
                        alt="Preview"
                        className="mx-auto max-h-[200px] rounded-lg object-cover"
                      />
                      <div className="space-y-2">
                        <Input
                          value={altText}
                          onChange={(e) => setAltText(e.target.value)}
                          placeholder="Alt text (optional)"
                          disabled={uploadState.uploading}
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={handleRemove}
                            disabled={uploadState.uploading}
                          >
                            Remove
                          </Button>
                          <Button
                            onClick={handleUpload}
                            disabled={
                              uploadState.uploading || !uploadState.uploadUrl
                            }
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
                        className="flex cursor-pointer flex-col items-center gap-4"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <div>
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
                    <p className="mt-2 text-sm text-destructive">
                      {uploadState.error}
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="url">
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Input
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (urlError) setUrlError(false);
                      }}
                      placeholder="Enter image URL..."
                    />
                    {urlError && (
                      <p className="text-xs text-destructive">
                        Please enter a valid URL
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      placeholder="Alt text (optional)"
                    />
                  </div>
                  <Button
                    onClick={handleInsertEmbed}
                    className="w-full"
                    disabled={!url}
                  >
                    Add Image
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}
