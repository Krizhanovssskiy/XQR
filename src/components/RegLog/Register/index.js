import React from 'react';
import { Switch, Route,withRouter} from 'react-router-dom';

import RegisterRoute from '../../../_containers/RegisterRoute';
import Confirm from './ConfirmationReg';
import Alias from './Alias';
import Reg from './Register'
import MainLayout                   from '../../../_src/layouts/Main'


const Register = () => (
    <MainLayout>
      <Switch>
         <RegisterRoute path="/register/confirm" componentItem={Confirm} />
         <RegisterRoute path="/register/alias" componentItem={Alias} />
         <Route path="/" component={Reg} />
      </Switch>
    </MainLayout>
);

export default withRouter(Register);
