import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="125" cy="125" r="125" /> 
    <rect x="0" y="275" rx="10" ry="10" width="280" height="30" /> 
    <rect x="0" y="320" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="430" rx="10" ry="10" width="100" height="30" /> 
    <rect x="126" y="419" rx="25" ry="25" width="150" height="45" />
  </ContentLoader>
)

export default Skeleton;