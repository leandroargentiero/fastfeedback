import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  VStack,
  useDisclosure,
  useToast,
  Switch
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

import { updateSite } from '@/lib/db';

const EditSiteModal = ({ siteId, settings, children }) => {
  const [formState, setFormState] = useState({});
  const initialRef = useRef();
  const toast = useToast();
  const { mutate } = useSWRConfig();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm();

  const onEditSite = async ({ icon, ratings, timestamp }) => {
    const newSettings = {
      'settings.icon': icon,
      'settings.ratings': ratings,
      'settings.timestamp': timestamp
    };

    try {
      await updateSite(siteId, newSettings);
      mutate(`/api/site/${siteId}`);
      onClose();
      toast({
        title: 'Success!',
        description: "We've updated your site",
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: 'Something went wrong.',
        description: "We've failed to updated your site",
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Button
        leftIcon={<SettingsIcon />}
        onClick={onOpen}
        _active={{ transform: 'scale(0.98)' }}
      >
        {children}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onEditSite)}>
          <ModalHeader>Edit Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormLabel htmlFor="timestamp" mb="0">
                  Show timestamp
                </FormLabel>
                <Switch
                  key={settings?.timestamp}
                  id="timestamp"
                  name="timestamp"
                  {...register('timestamp')}
                  colorScheme="green"
                  defaultChecked={settings?.timestamp}
                />
              </FormControl>

              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormLabel htmlFor="show-icon" mb="0">
                  Show icon
                </FormLabel>
                <Switch
                  key={settings?.icon}
                  id="icon"
                  name="icon"
                  {...register('icon')}
                  colorScheme="green"
                  defaultChecked={settings?.icon}
                />
              </FormControl>

              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormLabel htmlFor="show-ratings" mb="0">
                  Show ratings
                </FormLabel>
                <Switch
                  key={settings?.ratings}
                  id="ratings"
                  name="ratings"
                  {...register('ratings')}
                  colorScheme="green"
                  defaultChecked={settings?.ratings}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>

            <Button
              type="submit"
              isLoading={isSubmitting}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.800', transform: 'scale(0.98)' }}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSiteModal;
