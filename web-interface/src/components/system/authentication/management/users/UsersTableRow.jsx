import React from "react";
import ApiRoutes from "../../../../../util/ApiRoutes";
import moment from "moment";

function UsersTableRow(props) {

  const user = props.user;

  return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          {user.role ? user.role : <span className="text-warning">No Role</span>}
        </td>
        <td title={user.last_activity ? moment(user.last_activity).format() : "None"}>
          {user.last_activity ? moment(user.last_activity).fromNow() : "None"}
        </td>
        <td>
          <a href={ApiRoutes.SYSTEM.AUTHENTICATION.MANAGEMENT.USERS.DETAILS(
              user.organization_id,
              user.tenant_id,
              user.id)}>
            Details
          </a>
        </td>
      </tr>
  )

}

export default UsersTableRow;
