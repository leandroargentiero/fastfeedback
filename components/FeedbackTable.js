import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Code,
  IconButton,
  Switch,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { Table, Tr, Th, Td } from './Table';
import RemoveFeedbackButton from './RemoveFeedbackButton';

const FeedbackTable = ({ allFeedback }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Status</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {allFeedback.map((feedback) => {
          return (
            <Box as="tr" key={feedback.id}>
              <Td fontWeight="medium">{feedback.author}</Td>
              <Td>{feedback.text}</Td>
              <Td>
                <Code>/</Code>
              </Td>
              <Td>
                <Switch
                  size="md"
                  colorScheme="green"
                  defaultIsChecked={feedback.status === 'active'}
                />
              </Td>
              <Td>
                <RemoveFeedbackButton feedbackId={feedback.id} />
              </Td>
            </Box>
          );
        })}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
