import { Flex, Link } from '@chakra-ui/react';

const FeedbackLink = ({ siteId }) => {
  return (
    <Flex justifyContent="space-between" mb={8} mt={1} w="full">
      <Link fontWeight="bold" fontSize="sm" href={`/sites/${siteId}`}>
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="blackAlpha.500" href="/">
        Powered by Fast Feedback
      </Link>
    </Flex>
  );
};

export default FeedbackLink;
