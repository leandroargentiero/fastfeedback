import { useRef } from 'react';
import { useSWRConfig } from 'swr';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { deleteFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const RemoveFeedbackButton = ({ feedbackId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useSWRConfig();
  const cancelRef = useRef();
  const auth = useAuth();

  const onDeleteFeedback = async () => {
    try {
      await deleteFeedback(feedbackId);
      mutate([`/api/feedback/${feedbackId}`, auth.user.token]);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip label="Delete feedback">
        <IconButton
          onClick={onOpen}
          size="sm"
          icon={<DeleteIcon color="gray.600" />}
        />
      </Tooltip>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteFeedback} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RemoveFeedbackButton;
