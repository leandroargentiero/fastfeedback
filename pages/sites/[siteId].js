import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  FormControl,
  FormLabel,
  Box,
  Textarea,
  Button
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { createFeedback, getSite } from '@/lib/db';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import DashboardShell from '@/components/DashboardShell';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);
  const { site } = await getSite(siteId);

  return {
    props: {
      initialFeedback: feedback,
      site
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();

  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString()
    }
  }));

  return {
    paths,
    fallback: true
  };
}

const SiteFeedback = ({ initialFeedback = [], site }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { site } = await getSite(router.query.siteId);

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      siteName: site.name,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending'
    };

    inputEl.current.value = '';
    const { error } = createFeedback(newFeedback);

    if (!error) {
      setAllFeedback([newFeedback, ...allFeedback]);
    }
  };

  return (
    <DashboardShell>
      <SiteFeedbackTableHeader siteName={site.name} />
      <Box display="flex" flexDirection="column" w="full">
        <Box as="form" onSubmit={onSubmit} mb={16}>
          <FormControl>
            <FormLabel htmlFor="email">Comment</FormLabel>
            <Textarea
              ref={inputEl}
              background="white"
              id="comment"
              mb={4}
              placeholder="Here is a sample placeholder"
            />
            <Button
              type="submit"
              isDisabled={router.isFallback}
              size="md"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.800', transform: 'scale(0.98)' }}
            >
              Add Comment
            </Button>
          </FormControl>
        </Box>
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.createdAt} {...feedback} />
        ))}
      </Box>
    </DashboardShell>
  );
};

export default SiteFeedback;
