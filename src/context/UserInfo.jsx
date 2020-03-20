import React, { useState, useEffect } from "react";
import * as api from "../util/api";
import { Loading } from "COMPONENTS/loading/Loading";

const UserInfoContext = React.createContext(null);

/**
 * 提供当前登录用户信息的context.
 */
function UserInfoProvider(props) {
  const [whoami, setWhoami] = useState(null);
  const fetchWhoami = async () => {
    try {
      const data = await api.GET("/whoami");
      setWhoami(data);
    } catch (error) {
      setWhoami(null);
    }
  };
  useEffect(() => {
    fetchWhoami();
  }, []);

  if (!!!whoami) {
    return <Loading />;
  }
  const contextValue = { ...whoami, update: fetchWhoami };
  return (
    <UserInfoContext.Provider value={contextValue}>
      {props.children}
    </UserInfoContext.Provider>
  );
}

export { UserInfoContext, UserInfoProvider };
