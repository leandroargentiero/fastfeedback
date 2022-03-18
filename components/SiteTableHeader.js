import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

const SiteTableHeader = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color="gray.600" fontSize="sm">
            Sites
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex w="full" justifyContent="space-between" mb={7}>
        <Heading size="xl">My sites</Heading>
        <AddSiteModal>+ add site</AddSiteModal>
      </Flex>
    </>
  );
};

export default SiteTableHeader;
