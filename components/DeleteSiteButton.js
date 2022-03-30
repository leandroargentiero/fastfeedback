import { useRef } from 'react';
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
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { mutate } from 'swr';
import { DeleteIcon } from '@chakra-ui/icons';

import { deleteSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const DeleteSiteButton = ({ siteId }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const auth = useAuth();

  const onDeleteSite = async () => {
    try {
      await deleteSite(siteId);
      mutate(
        ['/api/sites', auth.user.token],
        async (data) => {
          return {
            sites: data.sites.filter((site) => site.id !== siteId)
          };
        },
        false
      );
      toast({
        title: 'Success!',
        description: "We've deleted your site",
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: 'Something went wrong.',
        description: "We've failed to delete your site",
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <Tooltip label="Delete site">
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
              Delete Site
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this site? You can't undo this
              action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteSite} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteSiteButton;
