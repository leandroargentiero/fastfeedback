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
  const router = useRouter();
  const { siteId } = router.query;
  const siteName = site?.name;

  return (
    <>
      <Breadcrumb color="gray.600" fontSize="sm">
        <BreadcrumbItem>
          <NextLink href="/sites" passHref>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink isCurrentPage>{siteName || '-'}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex w="full" justifyContent="space-between" mb={7}>
        <Heading size="xl">{siteName || '-'}</Heading>
        {isSiteOwner ? (
          <EditSiteModal siteId={siteId} settings={site?.settings}>
            edit Site
          </EditSiteModal>
        ) : null}
      </Flex>
    </>
  );
};

export default SiteFeedbackTableHeader;
