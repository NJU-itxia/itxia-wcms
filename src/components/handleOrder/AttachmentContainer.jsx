import React from "react";

export default function(props) {
  const { originUrl, thumbnailUrl, fileName } = props;
  return (
    <div className="attachment">
      <a href={originUrl} target="_parent" className="attachment">
        <img src={thumbnailUrl} alt="非图片附件"></img>
      </a>
      <span>文件名：{fileName}</span>
    </div>
  );
}
