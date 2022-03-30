import Head from 'next/head';
import { Box, Button, Flex, Text, Link, Heading } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { getAllFeedback, getSite } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';
import LoginButtons from '@/components/LoginButtons';
import { LogoIcon } from '@/components/CustomIcons';

const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);
  const { site } = await getSite(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
      site
    },
    revalidate: 1
  };
}

const Home = ({ allFeedback = [], site = {} }) => {
  const auth = useAuth();

  return (
    <>
      <Box bg="gray.100" py={16} px={4}>
        <Flex
          as="main"
          direction="column"
          maxW="700px"
          alignItems="start"
          margin="0 auto"
        >
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/sites"
              }
            `
              }}
            />
          </Head>

          <LogoIcon color="black" w={12} h={12} mb={4} />
          <Heading fontSize="3xl" mb={2}>
            Welcome to Fast Feedback
          </Heading>
          <Text fontSize="md" mb={8}>
            This version of{' '}
            <Text as="span" fontWeight="bold" display="inline">
              Fast Feedback
            </Text>{' '}
            was built by{' '}
            <Link
              href="https://github.com/leandroargentiero"
              isExternal
              textDecoration="underline"
            >
              Leandro Argentiero
            </Link>{' '}
            as part of React 2025. It's an easy solution for adding comments or
            reviews to a static site. It's still a work in progress, but you can
            try it out by leaving a comment below or logging in and create a
            feedback embed for your own website.
          </Text>
          {auth.user ? (
            <Button
              as="a"
              href="/sites"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              maxW="200px"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <LoginButtons />
          )}
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
        px={4}
      >
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            settings={site?.settings}
            isLast={index === allFeedback.length - 1}
            {...feedback}
          />
        ))}
      </Box>
    </>
  );
};

export default Home;
