import React from 'react';
import { socialNetworksArray } from "../../../_helpers/socialNetworksArray";
import ItemList from "../../SocialNetwork/ItemList";

const SocialNetworkRout = ({clazz}) => {
  return (
    <ul className={`SocialNetwork__icon-list Route__SocialNetwork ${clazz}`}>
      {
        socialNetworksArray.map(({ iconId, userLink }, idx) => (
        <ItemList key={iconId} iconId={iconId} userLink={userLink} />
      ))
      }
    </ul>
  )
};
export default SocialNetworkRout;