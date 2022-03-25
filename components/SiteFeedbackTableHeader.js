import NextLink from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from '@chakra-ui/react';

const SiteFeedbackTableHeader = ({ siteName }) => {
  return (
    <>
      <Breadcrumb color="gray.600" fontSize="sm">
        <BreadcrumbItem>
          <NextLink href="/feedback" passHref>
            <BreadcrumbLink>Feedback</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage>{siteName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex w="full" justifyContent="space-between" mb={7}>
        <Heading size="xl">{siteName}</Heading>
      </Flex>
    </>
  );
};

export default SiteFeedbackTableHeader;
