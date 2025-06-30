import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SubmitItem, PresignItem } from '@/types';
import { endpoints, handleAPI } from '@/apis';
import { EndpointsError, MediaError } from '@/constants';

/**
 * ==========================
 * 📌 @HOOK usePresignMedia
 * ==========================
 **/

const CreatePresign = async (presignItem: PresignItem) => {
  try {
    const response = await handleAPI(
      `${endpoints.presign}`,
      'POST',
      presignItem
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || MediaError.FAILED_PRESIGN_MEDIA
    );
  }
};

const usePresignMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (presignItem: PresignItem) => {
      return CreatePresign(presignItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaPresign'] });
    },
    onError: (error: any) => {
      console.error(error.message || MediaError.FAILED_PRESIGN_MEDIA);
    },
  });
};

/**
 * ========== END OF @HOOK usePresignMedia ==========
 */

const SubmitPresign = async (submitItem: SubmitItem, id: string) => {
  try {
    if (!endpoints.submit) {
      throw new Error(EndpointsError.MEDIA_SUBMIT_DEFINED);
    }

    const response = await handleAPI(
      `${endpoints.submit.replace(':id', id)}`,
      'POST',
      submitItem
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || MediaError.FAILED_SUBMIT_MEDIA
    );
  }
};

const useSubmitMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      submitItem,
      id,
    }: {
      submitItem: SubmitItem;
      id: string;
    }) => {
      return SubmitPresign(submitItem, id);
    },
    onSuccess: () => {
      // toast.success(MediaSuccess.SUBMITTED_MEDIA);
      queryClient.invalidateQueries({ queryKey: ['mediaSubmit'] });
    },
    onError: (error: any) => {
      console.error(error.message || MediaError.FAILED_SUBMIT_MEDIA);
    },
  });
};

const SubmitRichText = async (id: string) => {
  try {
    if (!endpoints.submitRichtext) {
      throw new Error(EndpointsError.MEDIA_SUBMIT_DEFINED);
    }

    const response = await handleAPI(
      `${endpoints.submitRichtext.replace(':id', id)}`,
      'POST'
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || MediaError.FAILED_SUBMIT_MEDIA
    );
  }
};

const useSubmitRichText = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      return SubmitRichText(id);
    },
    onSuccess: () => {
      // toast.success(MediaSuccess.SUBMITTED_MEDIA);
      queryClient.invalidateQueries({ queryKey: ['richtextSubmit'] });
    },
    onError: (error: any) => {
      console.error(error.message || MediaError.FAILED_SUBMIT_MEDIA);
    },
  });
};

/**
 * ========== END OF @HOOK usePresignMedia ==========
 */

export { usePresignMedia, useSubmitMedia, useSubmitRichText };
