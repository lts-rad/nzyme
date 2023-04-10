import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Routes from "../../../../util/ApiRoutes";
import AuthenticationManagementService from "../../../../services/AuthenticationManagementService";
import LoadingSpinner from "../../../misc/LoadingSpinner";

const authenticationManagementService = new AuthenticationManagementService();

function OrganizationDetailsPage() {

  const { organizationId } = useParams();

  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    authenticationManagementService.findOrganization(organizationId, setOrganization);
  }, [organizationId])

  if (!organization) {
    return <LoadingSpinner />
  }

  return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-9">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href={Routes.SYSTEM.AUTHENTICATION.MANAGEMENT.INDEX}>Authentication &amp; Authorization</a>
                </li>
                <li className="breadcrumb-item">Organizations</li>
                <li className="breadcrumb-item active" aria-current="page">{organization.name}</li>
              </ol>
            </nav>
          </div>

          <div className="col-md-3">
            <span className="float-end">
              <a className="btn btn-secondary" href={Routes.SYSTEM.AUTHENTICATION.MANAGEMENT.INDEX}>Back</a>{' '}
              <a className="btn btn-primary" href={Routes.SYSTEM.AUTHENTICATION.MANAGEMENT.ORGANIZATIONS.EDIT(organization.id)}>
                Edit Organization
              </a>
            </span>
          </div>

          <div className="col-md-12">
            <h1>Organization &quot;{organization.name}&quot;</h1>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3>Description</h3>

                <p className="mb-0">
                  {organization.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
  )

}

export default OrganizationDetailsPage;