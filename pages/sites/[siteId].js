import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FormControl, FormLabel, Box, Input, Button } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { createFeedback, getSite } from '@/lib/db';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import DashboardShell from '@/components/DashboardShell';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback
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

const SiteFeedback = ({ initialFeedback = [] }) => {
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
      <Box
        display="flex"
        flexDirection="column"
        w="full"
        maxWidth="600px"
        margin="0 auto"
      >
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={5}>
            <FormLabel htmlFor="email">Comment</FormLabel>
            <Input
              background="white"
              id="comment"
              mb={4}
              placeholder="Leave a comment"
              ref={inputEl}
              type="text"
            />
            <Button type="submit" isDisabled={router.isFallback}>
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
