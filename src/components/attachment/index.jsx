import React from "react";
import * as config from "../../config";
import "./index.css";
const { host, protocol } = config.default.network.api;

export default function(props) {
  const { md5, mimetype } = props.data;
  if (/image/.test(mimetype)) {
    const imageUrl = `${protocol}://${host}/upload/${md5}?thumbnail`;
    return (
      <img src={imageUrl} alt="无法显示图片" className="itxia-attachment" />
    );
  } else {
    return <span>非图片附件</span>;
  }
}


