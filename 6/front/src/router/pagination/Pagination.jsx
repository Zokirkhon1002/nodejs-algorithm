import React from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import SeeMore from "../../components/see-more/SeeMore";
import WithButtons from "../../components/with-buttons/WithButtons";

const Pagination = () => {
  const {
    location: { pathname },
    push,
  } = useHistory();

  if (pathname === "/pagination/with-buttons") {
    push("/pagination/with-buttons/1");
  }

  return (
    <div>
      <Link to="/pagination/see-more">See more </Link>
      <Link to="/pagination/with-buttons/1">with buttons</Link>

      <Switch>
        <Route path="/pagination/see-more" component={SeeMore} />
        <Route
          path="/pagination/with-buttons/:pageNumber"
          component={WithButtons}
        />
      </Switch>
    </div>
  );
};

export default Pagination;
