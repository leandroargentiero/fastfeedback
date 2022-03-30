import NextLink from 'next/link';
import { Box, Link } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

import { Table, Tr, Th, Td } from './Table';
import DeleteSiteButton from './DeleteSiteButton';

const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => {
          return (
            <Box as="tr" key={site.url}>
              <Td fontWeight="medium">
                <NextLink href={`/sites/${site.id}`} passHref>
                  <Link>{site.name}</Link>
                </NextLink>
              </Td>
              <Td>
                <Link href={`${site.url}`} target="_blank">
                  {site.url}
                </Link>
              </Td>
              <Td>
                <NextLink href={`/feedback/${site.id}`} passHref>
                  <Link color="blue.500">View Feedback</Link>
                </NextLink>
              </Td>
              <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
              <Td>
                <DeleteSiteButton siteId={site.id} />
              </Td>
            </Box>
          );
        })}
      </tbody>
    </Table>
  );
};

export default SiteTable;
