import { useAuth } from '../lib/auth';

export default function Index() {
  const auth = useAuth();

  console.log(auth);

  return auth.user ? (
    <div>
      <p>Email: {auth?.user?.email}</p>
      <button onClick={(e) => auth.signout()}>Sign Out</button>
    </div>
  ) : (
    <>
      <button onClick={(e) => auth.signinWithGitHub()}>
        Sign In With Github
      </button>
      <button onClick={(e) => auth.signinWithGoogle()}>
        Sign In With Google
      </button>
    </>
  );
}
