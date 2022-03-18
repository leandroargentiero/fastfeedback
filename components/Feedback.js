import { Heading, Box, Text, Divider } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

const Feedback = ({ author, text, createdAt }) => {
  return (
    <Box w="full" maxWidth="700px" borderRadius={4}>
      <Heading as="h3" size="sm" mb={0} color="gray.900">
        {author}
      </Heading>
      <Text color="gray.500" fontSize="xs" mb={4}>
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
      <Text color="gray.800">{text}</Text>
      <Divider borderColor="gray.200" my={5}></Divider>
    </Box>
  );
};

export default Feedback;
