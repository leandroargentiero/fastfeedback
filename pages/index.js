import Head from 'next/head';
import { Button, Text, Heading, Code } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

export default function Index() {
  const auth = useAuth();

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <main>
        <Heading>Fast Feedback</Heading>
        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        {auth.user ? (
          <Button onClick={(e) => auth.signout()} size="sm">
            Sign Out
          </Button>
        ) : (
          <Button onClick={(e) => auth.signinWithGitHub()} size="sm">
            Sign in with Github
          </Button>
        )}
      </main>
    </div>
  );
}
