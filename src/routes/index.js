import React from "react";
import Discover from "./Discover";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

initializeIcons();

export default function Routes() {
  // Here you'd return an array of routes
  return <Discover />;
}
