import React from "react";
import NoOpDetectionMethodDialog from "./dialogs/NoOpDetectionMethodDialog";
import Dot11Service from "../../../../../services/Dot11Service";
import {notify} from "react-notify-toast";
import StaticThresholdDetectionMethodDialog from "./dialogs/StaticThresholdDetectionMethodDialog";

function DetectionMethodDialogProxy(props) {

  const type = props.type;
  const monitoredNetworkId = props.monitoredNetworkId;
  const configuration = props.configuration;
  const onSubmit = props.onSubmit;

  if (type === null || type === "") {
    return null;
  }

  switch (type) {
    case "NOOP":
      return <NoOpDetectionMethodDialog onSubmit={onSubmit} configuration={configuration} />
    case "STATIC_THRESHOLD":
      return <StaticThresholdDetectionMethodDialog onSubmit={onSubmit}
                                                   monitoredNetworkId={monitoredNetworkId}
                                                   configuration={configuration} />
    default:
      return <span>Detection method type &quot;{type}&quot; not implemented.</span>
  }

}

export default DetectionMethodDialogProxy;