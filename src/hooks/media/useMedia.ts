import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitItem, PresignItem } from '@/types';
import { toast } from 'sonner';
import { endpoints, handleAPI } from '@/apis';

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
    console.error('Error presign media:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to  presign media'
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
      toast.success(' Presign successfully!');
      queryClient.invalidateQueries({ queryKey: ['mediaPresign'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to presign media.');
    },
  });
};

/**
 * ========== END OF @HOOK usePresignMedia ==========
 */

const SubmitPresign = async (submitItem: SubmitItem, id: string) => {
  try {
    if (!endpoints.submit) {
      throw new Error('Submit endpoint is not defined.');
    }

    const response = await handleAPI(
      `${endpoints.submit.replace(':id', id)}`,
      'POST',
      submitItem
    );
    return response.data;
  } catch (error: any) {
    console.error('Error submit media:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to submit media');
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
      toast.success(' Submit successfully!');
      queryClient.invalidateQueries({ queryKey: ['mediaSubmit'] });
    },
    onError: (error: any) => {
      console.error(error.message || 'Failed to submit media.');
    },
  });
};

/**
 * ========== END OF @HOOK usePresignMedia ==========
 */

export { usePresignMedia, useSubmitMedia };
