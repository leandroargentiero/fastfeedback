import { useRef } from 'react';
import { useForm } from 'react-hook-form';

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
  FormErrorMessage
} from '@chakra-ui/react';
import { createSite } from '@/lib/db';

const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onCreateSite = (formData) => createSite(formData);

  return (
    <>
      <Button variant="solid" size="md" onClick={onOpen}>
        Add your first site
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.site}>
              <FormLabel htmlFor="site">Name</FormLabel>
              <Input
                id="site"
                placeholder="site"
                {...register('site', {
                  required: 'Site is required'
                })}
              />
              <FormErrorMessage>
                {errors.site && errors.site.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.url} mt={4}>
              <FormLabel htmlFor="url">Link</FormLabel>
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
              backgroundColor="#99FFFE"
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
