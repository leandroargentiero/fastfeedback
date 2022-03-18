import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FormControl, FormLabel, Box, Input, Button } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback
    }
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
    fallback: false
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending'
    };

    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  console.log(allFeedback);

  return (
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
          <Input id="comment" type="text" ref={inputEl} />
          <Button type="submit">Add Comment</Button>
        </FormControl>
      </Box>
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.createdAt} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
