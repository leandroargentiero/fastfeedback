import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
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
  Input,
  useDisclosure,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';

import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const AddSiteModal = ({ children }) => {
  const toast = useToast();
  const initialRef = useRef();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onCreateSite = async ({ name, url }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
      settings: {
        timestamp: true,
        icon: true,
        ratings: true
      }
    };

    try {
      const { id } = await createSite(newSite);
      mutate(
        ['/api/sites', auth.user.token],
        async (data) => ({ sites: [{ id, ...newSite }, ...data.sites] }),
        false
      );
      reset({ name: '', url: '' });
      onClose();
      toast({
        title: 'Success!',
        description: "We've added your site",
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        title: 'Something went wrong.',
        description: "We've failed to add your site",
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.800', transform: 'scale(0.98)' }}
      >
        {children}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                placeholder="name"
                {...register('name', {
                  required: 'Name is required'
                })}
                // ref={initialRef}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.url} mt={4}>
              <FormLabel htmlFor="url">Url</FormLabel>
              <Input
                id="url"
                placeholder="https://website.com"
                {...register('url', {
                  required: 'Url is required'
                })}
              />
              <FormErrorMessage>
                {errors.url && errors.url.message}
              </FormErrorMessage>
            </FormControl>
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
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
