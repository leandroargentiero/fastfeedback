import { useAuth } from '@/lib/auth';
import { Heading, Box, Text, Divider } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const Feedback = ({ author, text, createdAt }) => {
  const { user } = useAuth();
  const provider = user?.provider.slice(0, -4);

  return (
    <Box w="full" maxWidth="700px" borderRadius={4}>
      <Heading
        as="h3"
        size="sm"
        mb={0}
        color="gray.900"
        display="flex"
        alignItems="end"
      >
        <Box as="span" mr={1}>
          {author}
        </Box>
        {provider === 'github' ? <FaGithub /> : <FaGoogle />}
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
