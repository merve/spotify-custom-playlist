import { useRouter } from "next/router";
import { useEffect } from "react";

const Callback = () => {
  /*
  TODO: Need refactor. There is a problem reading the access_token parameter. for now it was solved like this.
  The problem is that the parameter has # before it. This is how the access_token from spotify is sent.
  It should be like this
    const {query} = useRouter();
    localStorage.setItem("spotify_token", query.access_token);
  */
  const router = useRouter();
  useEffect(() => {
    const now = new Date();
    let token = router.asPath;
    token = token.replace("/callback#access_token=", "");
    token = token.replace("&token_type=Bearer&expires_in=3600", "");
    localStorage.setItem("spotify_token", token);
    localStorage.setItem("tokenExpiresIn", "" + now.getTime());
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }, []);

  return <div>Redirecting...</div>;
};

export default Callback;
