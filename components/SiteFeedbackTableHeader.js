import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from '@chakra-ui/react';
import EditSiteModal from './EditSiteModal';

const SiteFeedbackTableHeader = ({ site, isSiteOwner }) => {
  return (
    <>
      <Breadcrumb color="gray.600" fontSize="sm">
        <BreadcrumbItem>
          <NextLink href="/sites" passHref>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage>{site?.name || '-'}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex w="full" justifyContent="space-between" mb={7}>
        <Heading size="xl">{site?.name || '-'}</Heading>
        {isSiteOwner ? (
          <EditSiteModal siteId={site?.id} settings={site?.settings}>
            edit Site
          </EditSiteModal>
        ) : null}
      </Flex>
    </>
  );
};

export default SiteFeedbackTableHeader;
