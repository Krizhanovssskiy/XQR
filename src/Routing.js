import React           from "react";
import {Route, Switch} from "react-router-dom";

import Landing         from './_src/view/Landing';
import RedirectRoute   from "./_containers/RedirectRoute";
import PrivateRoute    from "./_containers/PrivateRoute";
import OwnPage         from "./components/OwnPage";
import AlienPage       from "./components/view/AlienPage/AlienPage";
import NewResetCode    from "./components/RegLog/NewResetCode";
import Login           from "./components/RegLog/Login/Login";
import Register        from "./components/RegLog/Register";

const Routing = () => (
        <Switch>
            <Route path="/" exact component={Landing}/>
            <Route path="/user" exact component={RedirectRoute}/>
            <PrivateRoute path="/user/:alias" exact componentItem={OwnPage} otherComponent={AlienPage}/>
            <Route path="/forgot-password" component={NewResetCode}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
);

export default Routing;
