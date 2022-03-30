import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  useToast
} from '@chakra-ui/react';

import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import Feedback from '@/components/Feedback';
import DashboardShell from '@/components/DashboardShell';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';

const SiteFeedback = () => {
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();
  const { siteId } = router.query;
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting }
  } = useForm();
  const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data: feedbackData, mutate: mutateFeedbackData } = useSWR(
    `/api/feedback/${siteId}`,
    fetcher
  );

  const onAddComment = async ({ comment }) => {
    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId,
      siteName: siteData.name,
      text: comment,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending'
    };

    try {
      resetField('comment');
      await createFeedback(newFeedback);
      mutateFeedbackData([newFeedback, ...feedbackData]);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Something went wrong.',
        description: "We've failed to add your comment",
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <DashboardShell>
      <SiteFeedbackTableHeader site={siteData} isSiteOwner={true} />
      <Box display="flex" flexDirection="column" w="full">
        <Box as="form" onSubmit={handleSubmit(onAddComment)} mb={16}>
          <FormControl isInvalid={errors.comment}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Textarea
              id="comment"
              background="white"
              placeholder="Leave your comment..."
              {...register('comment', {
                required: 'Comment is required.'
              })}
            />
            <FormErrorMessage>
              {errors.comment && errors.comment.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            isLoading={isSubmitting}
            isDisabled={router.isFallback}
            size="md"
            mt={4}
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800', transform: 'scale(0.98)' }}
          >
            Add Comment
          </Button>
        </Box>
        {feedbackData?.map((feedback) => (
          <Feedback
            key={feedback.createdAt}
            siteSettings={siteData?.settings}
            {...feedback}
          />
        ))}
      </Box>
    </DashboardShell>
  );
};

export default SiteFeedback;
