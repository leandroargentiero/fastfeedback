import { useAuth } from '@/lib/auth';
import { Heading, Box, Text, Divider } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const Feedback = ({ author, text, createdAt, siteSettings }) => {
  const { user } = useAuth();
  const provider = user?.provider.slice(0, -4);

  const showProviderIcon = (providerName) => {
    switch (providerName) {
      case 'github':
        return <FaGithub />;
      case 'google':
        return <FaGoogle />;
      default:
        return null;
    }
  };

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
        {siteSettings?.icon && showProviderIcon(provider)}
      </Heading>
      {siteSettings?.timestamp && (
        <Text color="gray.500" fontSize="xs">
          {format(parseISO(createdAt), 'PPpp')}
        </Text>
      )}
      <Text color="gray.800" mt={4}>
        {text}
      </Text>
      <Divider borderColor="gray.200" my={5}></Divider>
    </Box>
  );
};

export default Feedback;
