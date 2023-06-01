import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ApiRoutes from "../../../../../../util/ApiRoutes";
import Routes from "../../../../../../util/ApiRoutes";
import LoadingSpinner from "../../../../../misc/LoadingSpinner";
import AuthenticationManagementService from "../../../../../../services/AuthenticationManagementService";
import EventActionsService from "../../../../../../services/EventActionsService";
import ActionDetailsProxy from "./details/ActionDetailsProxy";
import moment from "moment";

const authenticationMgmtService = new AuthenticationManagementService();
const eventActionsService = new EventActionsService();

function ActionDetailsPage() {

  const { organizationId } = useParams();
  const { actionId } = useParams();

  const [organization, setOrganization] = useState(null);
  const [action, setAction] = useState(null);

  useEffect(() => {
    authenticationMgmtService.findOrganization(organizationId, setOrganization);
    eventActionsService.findActionOfOrganization(organizationId, actionId, setAction)
  }, [organizationId, actionId])

  if (!organization || !action) {
    return <LoadingSpinner />
  }

  return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-10">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href={ApiRoutes.SYSTEM.AUTHENTICATION.MANAGEMENT.INDEX}>Authentication &amp; Authorization</a>
                </li>
                <li className="breadcrumb-item">Organizations</li>
                <li className="breadcrumb-item">
                  <a href={ApiRoutes.SYSTEM.AUTHENTICATION.MANAGEMENT.ORGANIZATIONS.DETAILS(organization.id)}>
                    {organization.name}
                  </a>
                </li>
                <li className="breadcrumb-item">Actions</li>
                <li className="breadcrumb-item active" aria-current="page">{action.name}</li>
              </ol>
            </nav>
          </div>

          <div className="col-md-2">
            <a className="btn btn-primary float-end"
               href={Routes.SYSTEM.AUTHENTICATION.MANAGEMENT.ORGANIZATIONS.DETAILS(organizationId)}>
              Back
            </a>
          </div>

          <div className="col-md-12">
            <h1>Event Action &quot;{action.name}&quot;</h1>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h3>Description</h3>

                    <p className="mb-0">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h3>Details</h3>

                    <dl>
                      <dt>Type</dt>
                      <dd title={action.action_type}>{action.action_type_human_readable}</dd>
                      <dt>Created at</dt>
                      <dd title={moment(action.created_at).format()}>{moment(action.created_at).fromNow()}</dd>
                      <dt>Updated at</dt>
                      <dd title={moment(action.updated_at).format()}>{moment(action.updated_at).fromNow()}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h3>Configuration</h3>

                    <ActionDetailsProxy action={action} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
  )

}

export default ActionDetailsPage;