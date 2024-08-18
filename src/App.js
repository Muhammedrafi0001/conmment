
import { useEffect, useState } from 'react';

import Signin from './googleSignin/Signin';
import Logout from './googleSignin/Logout';
import CommentList from './Comment/CommentList';

function App() {
  const [user, setUser] = useState(null)
  const [googleSignin, setGoogleSignin] = useState(null)

  useEffect(() => {
    setUser(localStorage.getItem("user"))
  }, [])
  return (
    <div className="container ">
      {user?.displayName
        ? <Logout user={user} setUser={setUser} /> :
        < Signin user={user} setUser={setUser} setGoogleSignin={setGoogleSignin} />}
      <div className="custom_commentList shadow p-3 border  rounded" style={{ marginTop: "20px" }} >
        <CommentList user={user} googleSignin={googleSignin} />
      </div>
    </div>
  );
}
export default App;
